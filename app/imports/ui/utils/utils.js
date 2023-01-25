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
