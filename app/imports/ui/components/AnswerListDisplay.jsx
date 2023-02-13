import React from 'react';
import { CSVLink } from 'react-csv';

export default function AnswerListDisplay({ finalArray }) {
  const csvArray = [];

  finalArray.map((questionObj) => {
    questionObj.responses?.map((res) => {
      var obj = {};
      var key = questionObj.questionTitle;

      obj[key] = res.response;
      csvArray.push(obj);
    });
  });

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
