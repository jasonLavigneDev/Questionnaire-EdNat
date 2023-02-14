import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export default function StatsPie({ question }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  console.log('question', question);

  const getAllCountStat = (stats) => {
    let cpt = 0;
    stats.map((stat) => {
      cpt += stat.count;
    });
    return cpt;
  };

  function generateColor() {
    const r = Math.random() * 200 + 50;
    const g = Math.random() * 200 + 50;
    const b = Math.random() * 200 + 50;

    return `rgba(${r},${g},${b}, 1)`;
  }

  const generateChartData = (stat) => {
    const colors = [];
    for (let i = 0; i < stat.length; i++) {
      const color = generateColor();
      colors.push(color);
    }

    const chartData = {
      labels: stat.map((oneStat) => oneStat.answer),
      datasets: [
        {
          label: 'Nombre de réponses: ',
          data: stat.map((oneStat) => oneStat.count),
          backgroundColor: colors.map((col) => col),
          borderWidth: 1,
        },
      ],

      options: {
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    };

    return chartData;
  };

  const choicesStats = {};

  question.questionChoices.forEach((key) => (choicesStats[key] = 0));
  question.stat.forEach((element) => {
    choicesStats[element.answer]++;
  });

  return (
    <div
      style={{
        display: 'flex',
        height: '35vh',
        width: '50vw',
        justifyContent: 'space-between',
        marginLeft: '4vw',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {question.stat.map((oneStat) => (
          <p>
            {oneStat.answer}: {((oneStat.count / getAllCountStat(question.stat)) * 100).toFixed(2)}%
          </p>
        ))}
      </div>
      <Pie data={generateChartData(question.stat)} />
    </div>
  );
}