import React from 'react';
import TestBar from './TestBar';
import TestPie from './TestPie';

export default function GenerateChart({ statArray }) {
  console.log('statArray', statArray);
  function generateChart(question) {
    switch (question.questionType) {
      case 'radioButtonInput':
      case 'selectInput':
        return <TestPie stat={question.stat} />;
      case 'checkboxInput':
        return <TestBar question={question} />;
      default:
        return <p>Default value</p>;
    }
  }

  return (
    <>
      {statArray.map((question) => (
        <>
          <h2>{question.questionTitle}</h2>
          {generateChart(question)}
        </>
      ))}
    </>
  );
}
