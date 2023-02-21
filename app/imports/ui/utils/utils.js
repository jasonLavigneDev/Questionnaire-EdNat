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
  return !!formAnswers.find((answer) => answer.userId === user.username);
};

export const copyUrlToClipBoard = (id) => {
  const url = `http://localhost:3060/visualizer/${id}`;
  return navigator.clipboard.writeText(url);
};
