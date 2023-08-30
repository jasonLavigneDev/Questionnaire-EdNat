import React, { useContext, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import i18n from 'meteor/universe:i18n';
import { Paper } from '@mui/material';
import { ComponentBuilder } from '../ComponentBuilder';
import SubmitAnswerForm from './SubmitAnswerForm';
import GenerateComponent from './GenerateComponent';
import { UserContext } from '../../contexts/UserContext';
import { useSelector } from 'react-redux';
import ModalRgpd from '../system/ModalRgpd';
import { FormNoAvailable } from './FormNoAvailable';

import { generateColor } from '../../utils/utils';

export const Visualizer = ({ answerMode = false }) => {
  const [componentToEdit] = useState({});
  const { user } = useContext(UserContext);
  const form = useSelector((state) => state.form);

  const ownerForm = useTracker(() => {
    if (form) {
      return Meteor.users.findOne({ _id: form.owner });
    }
    return null;
  });

  if (!form.isActive && answerMode) return <FormNoAvailable message={i18n.__('component.visualizer.formNotActive')} />;
  if (!user && !form.isPublic) return <FormNoAvailable message={i18n.__('component.visualizer.connect')} />;

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
    // category est un tableau qui contient soit des composants à générer (object) soit des catégories déjà générées (array)
    return (
      <Paper
        sx={{
          paddingRight: '15px',
          paddingLeft: '15px',
          // backgroundColor: 'lightsteelblue',
          backgroundColor: generateColor((light = true)),
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

    console.log('componentsToGenerate.length path ', componentsToGenerate.length, path);

    // componentsToGenerate.forEach((currentComponent, currentIndex) => {
    for (let currentIndex = 0; currentIndex < componentsToGenerate.length; currentIndex++) {
      const currentComponent = componentsToGenerate[currentIndex];
      // Le composant a déjà pu être traité dans une sous catégorie
      if (currentIndex > subcategoryEndIndex) {
        console.log(`Path (${path}) : Entré avec le numéro ${currentIndex} ${currentComponent.title}`);
        if (currentComponent.type === 'sectionStart') {
          // Début de catégorie
          if (currentCategory.length) {
            // Catégorie déjà en cours donc début d'une sous-catégorie (appel récursif)
            console.log(`Path (${path}) : Avant récur currentIndex ${currentIndex}`);
            const resultQuestionnaire = genQuestionnaire(componentsToGenerate.slice(currentIndex), path + 1);
            currentCategory.push(resultQuestionnaire.questionnaire); // Appel récursif avec un tableau de composants de la sous catégorie
            subcategoryEndIndex = currentIndex + resultQuestionnaire.subcategoryEndIndex; // Récupère l'index de l'avant dernier composant de type fin de section
            console.log(`Path (${path}) : Fin récur subcategoryEndIndex ${subcategoryEndIndex}`);
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
              console.log('Fin de Catégorie simple ', currentIndex);
              subcategoryEndIndex = currentIndex;
              currentCategory = [];
            } else {
              // Sous catégorie donc on sort par un return
              console.log('Fin de sous catégorie ', currentIndex);
              return { questionnaire, subcategoryEndIndex: currentIndex };
            }
          } else {
            // Fin solitaire sans début correspondant => on l'ignore
            console.log("Fin solitaire sans début correspondant => on l'ignore");
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
        console.log('Traitement index', currentIndex);
        subcategoryEndIndex = currentIndex;
      }
      console.log(`Path (${path}) : Sortie avec le numéro ${currentIndex} ${currentComponent.title}`);
    }
    if (currentCategory.length) {
      // Après parcours des composants, il reste une catégorie commencée mais non générée (absence de fin)
      // On l'ajoute pour un meilleur rendu
      console.log("Catégorie résiduelle (sans fin) => ajout d'une fin");
      endSection = {
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
      {ownerForm && (
        <h4 style={{ textAlign: 'center' }}>
          {i18n.__('component.visualizer.createdBy')} {ownerForm.firstName} {ownerForm.lastName} ({ownerForm.username})
        </h4>
      )}
      <div style={{ width: '59vw', margin: 'auto' }}>{genQuestionnaire(form.components).questionnaire}</div>
      {answerMode && <SubmitAnswerForm />}
    </div>
  );
};
