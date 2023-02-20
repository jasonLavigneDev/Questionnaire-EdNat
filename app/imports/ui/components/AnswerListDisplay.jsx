import React from 'react';
import { CSVLink } from 'react-csv';
import i18n from 'meteor/universe:i18n';
import { Button, Paper } from '@mui/material';

export default function AnswerListDisplay({ finalArray }) {
  const csvArray = [];

  finalArray.map((question) => {
    let key = question.questionTitle;
    question.responses.map((response) => {
      const index = csvArray.findIndex((answer) => answer.user === response.userName);
      if (index === -1) {
        if (response.response) {
          let newObj = { user: response.userName };
          newObj[key] = response.response;
          csvArray.push(newObj);
        }
      } else {
        if (csvArray[index]['user'] === response.userName) {
          if (response.response) {
            csvArray[index][key] = response.response;
          }
        }
      }
    });
  });

  csvArray.forEach((obj) => delete obj.user);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', margin: 15 }}>
        <CSVLink
          data={csvArray}
          filename={'my-file.csv'}
          target="_blank"
          style={{ textDecoration: 'none', justifyContent: 'center' }}
        >
          <Button variant="contained">{i18n.__('component.answerListDisplay.download')}</Button>
        </CSVLink>
      </div>
      {finalArray.map((question) => (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 5 }}>
          <Paper sx={{ display: 'flex', flexDirection: 'column', width: '50%', padding: 5 }}>
            <h2>{question.questionTitle}</h2>
            {question.responses.map((response) => (
              <ul>
                <li>
                  <b>
                    {response.userName} ({i18n.__('component.answerListDisplay.answerAt')}: {response.createdAt})
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
