import React from 'react';
import { i18n } from 'meteor/universe:i18n';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export default function StatsDisplay({ statArray }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

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
  const generateChartData = (question) => {
    const colors = [];
    for (let i = 0; i < question.stat.length; i++) {
      const color = generateColor();
      colors.push(color);
    }
    const chartData = {
      labels: question.stat.map((stat) => stat.answer),
      datasets: [
        {
          label: i18n.__('component.statsDisplay.numberOfAnswers'),
          data: question.stat.map((stat) => stat.count),
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

  return (
    <>
      {statArray.map((question) => (
        <>
          <h2>{question.questionTitle}</h2>
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
              {question.stat.map((stat) => (
                <p>
                  {stat.answer}: {(stat.count / getAllCountStat(question.stat)) * 100}%
                </p>
              ))}
            </div>
            <Pie data={generateChartData(question)} />
          </div>
        </>
      ))}
      ;
    </>
  );
}
