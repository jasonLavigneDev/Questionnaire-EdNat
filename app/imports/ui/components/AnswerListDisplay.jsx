import React from 'react';
import { CSVLink } from 'react-csv';

export default function AnswerListDisplay({ finalArray }) {
  const csvArray = [];

  finalArray.map((question) => {
    let key = question.questionTitle;
    question.responses.map((response) => {
      const index = csvArray.findIndex((answer) => answer.user === response.userName);
      if (index === -1) {
        let newObj = { user: response.userName };
        newObj[key] = response.response[0];
        csvArray.push(newObj);
      } else {
        if (csvArray[index]['user'] === response.userName) {
          csvArray[index][key] = response.response[0];
        }
      }
    });
  });

  csvArray.forEach((obj) => delete obj.user);

  return (
    <>
      {finalArray.map((question) => (
        <div>
          <h2>{question.questionTitle}</h2>
          {question.responses.map((response) => (
            <ul>
              <li>
                <b>
                  {response.userName} (répondu le: {response.createdAt})
                </b>
                : {response.response}
              </li>
            </ul>
          ))}
        </div>
      ))}
      <CSVLink data={csvArray} filename={'my-file.csv'} className="btn btn-primary" target="_blank">
        Download me
      </CSVLink>
      ;
    </>
  );
}
