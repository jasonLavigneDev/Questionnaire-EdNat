import React from 'react';
import { CSVLink } from 'react-csv';
import i18n from 'meteor/universe:i18n';
import { Button, Paper } from '@mui/material';

export default function AnswerListDisplay({ finalArray }) {
  const csvArray = [];

  finalArray.map((question) => {
    let key = question.questionTitle;
    question.responses.map((response) => {
      if (response.response instanceof Array) {
        response.response = response.response.join(' - ');
      }
      const index = csvArray.findIndex((answer) => answer.index === response.index);
      if (index === -1) {
        if (response.response) {
          let newObj = { index: response.index };
          newObj[key] = response.response;
          csvArray.push(newObj);
        }
      } else {
        if (csvArray[index]['index'] === response.index) {
          if (response.response) {
            csvArray[index][key] = response.response;
          }
        }
      }
    });
  });

  csvArray.forEach((obj) => delete obj.index);
  finalArray.forEach((resp) => delete resp.index);

  return (
    <>
      <div className="flex center m-15">
        <CSVLink data={csvArray} filename={'my-file.csv'} target="_blank" className="center txtdeco-no">
          <Button variant="contained">{i18n.__('component.answerListDisplay.download')}</Button>
        </CSVLink>
      </div>
      {finalArray.map((question) => (
        <div className="flex center pad-10">
          <Paper className="flex column wd-50pct pad-20 mb-2">
            <h2>{question.questionTitle}</h2>
            {question.responses.map((response, index) => (
              <ul>
                <li>
                  <b>
                    Réponse #{index + 1} ({i18n.__('component.answerListDisplay.answerAt')}: {response.createdAt})
                  </b>
                  : {response.response}
                </li>
              </ul>
            ))}
          </Paper>
        </div>
      ))}
    </>
  );
}
