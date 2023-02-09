import { v4 as uuidv4 } from 'uuid';

export const isDuplicate = (allOpts, newOption) => {
  return allOpts.includes(newOption);
};

export const createComponentObject = (title, type, choices = [], answerRequired) => {
  const component = {
    id: uuidv4(),
    title: title,
    type: type,
    choices: choices,
    answerRequired: answerRequired,
  };
  return component;
};

export const isEmptyComponent = (component) => {
  return Object.keys(component).length === 0;
};

export const hasNotAnswers = (form) => {
  if (!form.formAnswers || form.formAnswers.length === 0) return true; // formAnswers peut etre initialisé a tableau vide pour retirer la 1ere condition !?
  return false;
};

export const hasAlreadyRespond = (user, form) => {
  if (hasNotAnswers(form)) return false;
  const { formAnswers } = form;
  return !!formAnswers.find((answer) => answer.userId === user.username);
};

export const copyUrlToClipBoard = (id) => {
  const url = `http://localhost:3060/visualizer/${id}`;
  console.log('url copy to ClipBoard', url);
  return navigator.clipboard.writeText(url);
};
