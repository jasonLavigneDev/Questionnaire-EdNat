import { Paper } from '@mui/material';
import React from 'react';
import StatsBar from './StatsBar';
import StatsPie from './StatsPie';

export default function GenerateChart({ statArray }) {
  function generateChart(question) {
    switch (question.questionType) {
      case 'radioButtonInput':
      case 'selectInput':
      case 'numberInput':
      case 'textInput':
      case 'textArea':
      case 'textInput':
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
        <div className="flex center pad-10">
          <Paper className="flex column wd-50pct pad-10">
            <h2>{question.questionTitle}</h2>
            <div>{generateChart(question)}</div>
          </Paper>
        </div>
      ))}
    </>
  );
}
