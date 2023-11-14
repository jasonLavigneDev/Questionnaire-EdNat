export const getPaperStyle = (currentComponent) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 1,
    border: '1px solid rgba(0,0,0,0.2)',
    '&:hover': {
      boxShadow: '5px 5px 10px rgba(0,0,0,0.3)',
      backgroundColor: 'rgba(21,101,192,0.1)',
    },
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
