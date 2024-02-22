import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { generateColor } from '../utils/utils';

export default function StatsPie({ question }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const getAllCountStat = (stats) => {
    let cpt = 0;
    stats.map((stat) => {
      cpt += stat.count;
    });
    return cpt;
  };

  const generateChartData = (stat) => {
    const colors = [];
    const light = true;
    for (let i = 0; i < stat.length; i++) {
      const color = generateColor(light);
      colors.push(color);
    }

    const chartData = {
      labels: stat.map((oneStat) =>
        oneStat.answer === undefined ? i18n.__('component.answerListDisplay.emptyAnswer') : oneStat.answer,
      ),
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

  // Permet de générer les graph en bar
  const choicesStats = {};

  question.questionChoices.forEach((key) => (choicesStats[key] = 0));
  question.stat.forEach((element) => {
    element.answer === undefined
      ? choicesStats[i18n.__('component.answerListDisplay.emptyAnswer')]++
      : choicesStats[element.answer]++;
  });
  // ********************************

  const displayAnswer = (answer) => {
    console.log(answer);
    if (answer === undefined) return i18n.__('component.answerListDisplay.emptyAnswer');
    if (answer instanceof Array) return answer.join(' - ');
    return answer;
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
        {question.stat.map((oneStat) => (
          <div key={oneStat.answer}>
            {displayAnswer(oneStat.answer)}: {((oneStat.count / getAllCountStat(question.stat)) * 100).toFixed(2)}%,
          </div>
        ))}
      </div>
      <div>
        <Pie data={generateChartData(question.stat)} />
      </div>
    </div>
  );
}
