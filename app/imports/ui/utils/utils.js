export const isDuplicate = (allOpts, newOption) => {
  return allOpts.includes(newOption);
};

export const hasNotAnswers = (form) => {
  if (!form.formAnswers || form.formAnswers.length === 0) return true; // formAnswers peut etre initialisé a tableau vide pour retirer la 1ere condition !?
  return false;
};

export const isFormActive = (form) => {
  return form.active;
};

export const toggleActiveForm = async (form) => {
  form.active = !form.active;
  await Meteor.callAsync('forms.toggleActive', form._id, form.active);
};

export const hasAlreadyRespond = (user, form) => {
  if (hasNotAnswers(form)) return false;
  const { formAnswers } = form;
  return !!formAnswers.find((answer) => answer.userId === user._id);
};

export const expirationDateIsPassed = (form) => {
  return form.expirationDate < new Date();
};

export const copyUrlToClipBoard = (id) => {
  const url = `${Meteor.absoluteUrl()}visualizer/${id}`;
  return navigator.clipboard.writeText(url);
};

export const generateColor = (light = false, dark = false) => {
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;
  if (dark) {
    r = Math.random() * 200;
    g = Math.random() * 200;
    b = Math.random() * 200;
  } else if (light) {
    r = Math.random() * 200 + 50;
    g = Math.random() * 200 + 50;
    b = Math.random() * 200 + 50;
  }

  return `rgba(${r},${g},${b}, 1)`;
};

export const checkIntegrityOfForm = (form) => {
  if (form.components.length === 0) return false;

  let isValid = false;

  isValid = form.components.some(
    (component) =>
      component.type !== 'sectionStart' && component.type !== 'sectionEnd' && component.type !== 'separator',
  );

  return isValid;
};
