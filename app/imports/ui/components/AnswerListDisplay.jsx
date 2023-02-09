import React from 'react';
import { CSVLink } from 'react-csv';

export default function AnswerListDisplay({ finalArray }) {
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
      <CSVLink data={finalArray} filename={'my-file.csv'} className="btn btn-primary" target="_blank">
        Download me
      </CSVLink>
      ;
    </>
  );
}
