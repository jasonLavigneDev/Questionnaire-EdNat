// Build the configuration depending of the environnement
// When using prerelease branches, we don't want changelog to be generated
// See https://github.com/semantic-release/changelog/issues/51#issuecomment-682609394

// Gitlab reference name
const branch = process.env.CI_COMMIT_REF_NAME;
const gitAssets = [];

// Configure your branches names
const stableBranch = 'main';

// Assign a branch name to produce a `beta` prerelease tag
const betaBranch = 'testing';

// Assign a branch name to produce a `alpha` prerelease tag
const alphaBranch = undefined;

// Assign a branch name to produce a `dev` prerelease tag
const devBranch = undefined;

// Configure semantic-release plugins
const breakingKeywords = [
  "BREAKING CHANGE",
  "BREAKING-CHANGE",
  "BREAKING CHANGES",
  "BREAKING-CHANGES"
];
const changelogFile = 'doc/CHANGELOG.md';

// Configure `conventionalcommits`
// See:
// - https://github.com/conventional-changelog/conventional-changelog/issues/838
// - https://github.com/conventional-changelog/conventional-changelog/issues/317
// - https://github.com/conventional-changelog/conventional-changelog/pull/421
const commitTypes = [
  { type: "feat",     section: "Features",                 hidden: false },
  { type: "fix",      section: "Bug Fixes",                hidden: false },
  { type: "docs",     section: "Documentation",            hidden: false },
  { type: "test",     section: "Tests",                    hidden: false },
  { type: "perf",     section: "Performance Improvements", hidden: false },
  { type: "revert",   section: "Reverts",                  hidden: false },
  { type: "refactor", section: "Code Refactoring",         hidden: false },
  { type: "style",    section: "Styles",                   hidden: false },
  { type: "build",    section: "Build System",             hidden: false },
  { type: "ci",       section: "Continuous Integration",   hidden: false },
  { type: "chore",    section: "Maintenance",              hidden: true  },
];
// Group commit by type and sort the sections according to `commitTypes` sorting
const commitGroups = commitTypes.map((e) => { return e.section; });
function commitGroupsSortFn(a, b) {
  return commitGroups.indexOf(a.title) - commitGroups.indexOf(b.title);
};

const releaseRules = [
  { breaking: true,     release: 'major' },
  // { type: 'build',      release: 'patch'},
  // { type: 'chore',      release: 'patch'},
  // { type: 'ci',         release: 'patch'},
  { type: 'docs',       release: 'patch' },
  { type: 'feat',       release: 'minor' },
  { type: 'fix',        release: 'patch' },
  { type: 'perf',       release: 'patch' },
  { type: 'refactor',   release: 'patch' },
  { type: 'revert',     release: 'patch' },
  { type: 'style',      release: 'patch' },
  { type: 'test',       release: 'patch' },
];

const semanticBranches = [stableBranch];

if (betaBranch) {
  semanticBranches.push({
    name: betaBranch,
    prerelease: true
  });
}

if (alphaBranch) {
  semanticBranches.push({
    name: alphaBranch,
    prerelease: true
  });
}

if (devBranch) {
  semanticBranches.push({
    name: devBranch,
    prerelease: true
  });
}

const config = {
  branches: semanticBranches,
  /* eslint no-template-curly-in-string: "off" */
  tagFormat: 'release/${version}',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        parserOpts:
        {
          noteKeywords: breakingKeywords,
        },
        releaseRules: releaseRules,
        presetConfig:
        {
          types: commitTypes,
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        parserOpts:
        {
          noteKeywords: breakingKeywords,
        },
        writerOpts:
        {
          commitGroupsSort: commitGroupsSortFn,
        },
        presetConfig:
        {
          types: commitTypes,
          commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/-/commit/{{hash}}',
          compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/-/compare/{{previousTag}}...{{currentTag}}',
          issueUrlFormat: '{{host}}/{{owner}}/{{repository}}/-/issues/{{id}}',
        },
      },
    ],
  ],
};

if (
  !Array.isArray(config.branches) ||
  config.branches.some((it) => it === branch || (it.name === branch && !it.prerelease))
) {
  // Generate changelog for release branch
  config.plugins.push([
    '@semantic-release/changelog',
    {
      changelogFile: changelogFile,
      changelogTitle: '# Changelog',
    },
  ]);
  gitAssets.push(changelogFile);
}

// We need to update package*.json
// Make sure to modify pkgRoot and gitAssets lines for your needs
config.plugins.push(
  [
    '@semantic-release/npm',
    {
      npmPublish: false,
      tarballDir: 'dist',
      pkgRoot: 'app',
    },
  ]
);
gitAssets.push('app/package*.json');

// Commit changes and create release on Gitlab
config.plugins.push(
  [
    '@semantic-release/git',
    {
      assets: gitAssets,
      message: 'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}',
    },
  ],
  '@semantic-release/gitlab',
);

module.exports = config;
