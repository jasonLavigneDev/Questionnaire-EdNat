export const getPaperStyle = (currentComponent) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 1,
    border: '1px black solid',
    backgroundColor:
      currentComponent.type === 'sectionStart'
        ? 'LightSkyBlue'
        : currentComponent.type === 'sectionEnd'
        ? 'SpringGreen'
        : currentComponent.type === 'separator'
        ? 'orange'
        : '',
  };
};
