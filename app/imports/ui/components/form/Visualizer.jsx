import React, { useContext, useEffect, useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { Pagination, Paper } from '@mui/material';
import { ComponentBuilder } from '../ComponentBuilder';
import SubmitAnswerForm from './SubmitAnswerForm';
import GenerateComponent from './GenerateComponent';
import { UserContext } from '../../contexts/UserContext';
import { useSelector } from 'react-redux';
import ModalRgpd from '../system/ModalRgpd';
import { FormNoAvailable } from './FormNoAvailable';

import { expirationDateIsPassed, generateColor } from '../../utils/utils';

export const Visualizer = ({ answerMode = false }) => {
  const [componentToEdit] = useState({});
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [componentsByPage, setComponentsByPage] = useState([]);
  const { user } = useContext(UserContext);
  const form = useSelector((state) => state.form);

  const preCalculateComponentsByPage = (components) => {
    let compoforpage = [];
    components.map((component, index) => {
      if (component.type === 'pageBreak' || index === components.length - 1) {
        if (index === components.length - 1 && component.type !== 'pageBreak') {
          compoforpage.push(component);
        }

        const copy = componentsByPage;
        copy.push(compoforpage);

        setComponentsByPage(copy);
        compoforpage = [];
      } else {
        compoforpage.push(component);
      }
    });
  };

  useEffect(() => {
    setPages(form.components.filter((component) => component.type == 'pageBreak').length + 1);
    preCalculateComponentsByPage(form.components);
  }, [form]);

  if (!form.isActive && answerMode) return <FormNoAvailable message={i18n.__('component.visualizer.formNotActive')} />;
  if (!user && !form.isPublic) return <FormNoAvailable message={i18n.__('component.visualizer.connect')} />;
  if (answerMode && expirationDateIsPassed(form))
    return <FormNoAvailable message={i18n.__('component.visualizer.expired')} />;

  const handlePage = (event, value) => {
    setPage(value);
  };

  const genComponent = (currentComponent) => (
    <div
      key={currentComponent.id}
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5vh',
        marginBottom: '2vh',
      }}
    >
      <GenerateComponent currentComponent={currentComponent} />
      {componentToEdit && componentToEdit.id === currentComponent.id && <ComponentBuilder />}
    </div>
  );

  const genCategory = (category) => {
    const light = true;
    // category est un tableau qui contient soit des composants à générer (object) soit des catégories déjà générées (array)
    return (
      <Paper
        sx={{
          paddingRight: '15px',
          paddingLeft: '15px',
          // backgroundColor: 'lightsteelblue',
          backgroundColor: generateColor(light),
        }}
      >
        {category.map((currentComponent) =>
          Array.isArray(currentComponent) ? currentComponent : genComponent(currentComponent),
        )}
      </Paper>
    );
  };

  const genQuestionnaire = (componentsToGenerate, path = 0) => {
    let questionnaire = []; // Rendu final du questionnaire
    let currentCategory = []; // Catégorie en cours de construction
    let subcategoryEndIndex = -1; // Index du composant de fin d'une sous catégorie
    // componentsToGenerate.forEach((currentComponent, currentIndex) => {
    for (let currentIndex = 0; currentIndex < componentsToGenerate.length; currentIndex++) {
      const currentComponent = componentsToGenerate[currentIndex];
      // Le composant a déjà pu être traité dans une sous catégorie
      if (currentIndex > subcategoryEndIndex) {
        if (currentComponent.type === 'sectionStart') {
          // Début de catégorie
          if (currentCategory.length) {
            // Catégorie déjà en cours donc début d'une sous-catégorie (appel récursif)
            const resultQuestionnaire = genQuestionnaire(componentsToGenerate.slice(currentIndex), path + 1);
            currentCategory.push(resultQuestionnaire.questionnaire); // Appel récursif avec un tableau de composants de la sous catégorie
            subcategoryEndIndex = currentIndex + resultQuestionnaire.subcategoryEndIndex; // Récupère l'index de l'avant dernier composant de type fin de section
          } else {
            // Commencement d'une nouvelle catégorie
            currentCategory.push(currentComponent);
          }
        } else if (currentComponent.type === 'sectionEnd') {
          // Fin de catégorie
          if (currentCategory.length) {
            // Fin venant cloturer une catégorie en cours
            currentCategory.push(currentComponent);
            questionnaire.push(genCategory(currentCategory));
            if (path === 0) {
              // Catégorie simple donc pas besoin de sortir de la boucle for
              subcategoryEndIndex = currentIndex;
              currentCategory = [];
            } else {
              // Sous catégorie donc on sort par un return
              return { questionnaire, subcategoryEndIndex: currentIndex };
            }
          } else {
            // Fin solitaire sans début correspondant => on l'ignore
            // questionnaire.push(genComponent(currentComponent));
          }
        } else if (currentCategory.length) {
          // Composant normal avec catégorie en cours
          currentCategory.push(currentComponent);
        } else {
          // Composant normal hors catégorie
          questionnaire.push(genComponent(currentComponent));
        }
      }
      if (currentIndex > subcategoryEndIndex) {
        // Permet de ne pas traiter 2 fois un même composant
        subcategoryEndIndex = currentIndex;
      }
    }
    if (currentCategory.length) {
      // Après parcours des composants, il reste une catégorie commencée mais non générée (absence de fin)
      // On l'ajoute pour un meilleur rendu
      const endSection = {
        id: 'temp',
        title: 'Fin ajoutée coté client',
        type: 'sectionEnd',
      };
      currentCategory.push(endSection);
      questionnaire.push(genCategory(currentCategory));
    }
    return { questionnaire, subcategoryEndIndex };
  };

  return (
    <div>
      {answerMode && <ModalRgpd answerMode={answerMode} />}
      {<h3 style={{ textAlign: 'center' }}>{form.title}</h3>}
      {<h4 style={{ textAlign: 'center' }}>{form.description}</h4>}
      {form.firstName && (
        <h4 style={{ textAlign: 'center' }}>
          {i18n.__('component.visualizer.createdBy')} {form.firstName} {form.lastName}
        </h4>
      )}
      <div style={{ width: '59vw', margin: 'auto' }}>
        {componentsByPage && componentsByPage[page - 1]
          ? genQuestionnaire(componentsByPage[page - 1]).questionnaire
          : null}
        {pages > 1 ? (
          <div style={{ display: 'flex', placeContent: 'center' }}>
            <Pagination count={pages} page={page} onChange={handlePage} />
          </div>
        ) : null}
      </div>
      {answerMode && <SubmitAnswerForm />}
    </div>
  );
};
