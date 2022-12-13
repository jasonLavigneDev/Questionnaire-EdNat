export const isDuplicate = (allOpts, newOption) => {
  return allOpts.includes(newOption);
};

export const createComponentObject = (title, type, choices = []) => {
  const obj = {
    title: title,
    type: type,
    choices: choices,
  };
  return obj;
};
