import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
export default function StatsBar({ question }) {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const choicesStats = {};

  question.questionChoices.forEach((key) => (choicesStats[key] = 0));
  question.stat.forEach((element) => {
    if (element.answer) {
      element.answer.forEach((response) => {
        choicesStats[response]++;
      });
    }
  });

  let keys = Object.keys(choicesStats);
  let values = Object.values(choicesStats);

  function generateColor() {
    const r = Math.random() * 200 + 50;
    const g = Math.random() * 200 + 50;
    const b = Math.random() * 200 + 50;

    return `rgba(${r},${g},${b}, 1)`;
  }

  const colors = [];
  for (let i = 0; i < keys.length; i++) {
    const color = generateColor();
    colors.push(color);
  }

  const data = {
    labels: keys,
    datasets: [
      {
        data: values,
        backgroundColor: colors.map((col) => col),
      },
    ],
  };

  const getAllCountStat = (stats) => {
    let cpt = 0;
    stats.map((stat) => {
      cpt += stat.count;
    });
    return cpt;
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '35vh',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {keys.map((key) => (
          <p>
            {key}: {((choicesStats[key] / getAllCountStat(question.stat)) * 100).toFixed(2)}%
          </p>
        ))}
      </div>
      <Bar options={options} data={data} />
    </div>
  );
}
