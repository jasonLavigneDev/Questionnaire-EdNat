import { v4 as uuidv4 } from 'uuid';

export const isDuplicate = (allOpts, newOption) => {
  return allOpts.includes(newOption);
};

export const createComponentObject = (title, type, choices = []) => {
  const obj = {
    id: uuidv4(),
    title: title,
    type: type,
    choices: choices,
  };
  return obj;
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

export const hasAlreadyRespond = (user, form) => {
  if (!form.formAnswers || form.formAnswers.length === 0) {
    return false;
  } else {
    const { formAnswers } = form;
    return !!formAnswers.find((answer) => answer.userId === user.username);
  }
};
