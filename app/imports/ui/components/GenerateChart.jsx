import React from 'react';
import StatsBar from './StatsBar';
import StatsPie from './StatsPie';

export default function GenerateChart({ statArray }) {
  console.log('statArray', statArray);
  function generateChart(question) {
    switch (question.questionType) {
      case 'radioButtonInput':
      case 'selectInput':
      case 'numberInput':
      case 'textInput':
      case 'textArea':
      case 'dateInput':
        return <StatsPie question={question} />;
      case 'checkboxInput':
        return <StatsBar question={question} />;
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
