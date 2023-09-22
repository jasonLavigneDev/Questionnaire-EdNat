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
        <div key={question._id} style={{ display: 'flex', justifyContent: 'center', padding: 5 }}>
          <Paper sx={{ display: 'flex', flexDirection: 'column', width: '50%', padding: 5 }}>
            <h2>{question.questionTitle}</h2>
            <div>{generateChart(question)}</div>
          </Paper>
        </div>
      ))}
    </>
  );
}
