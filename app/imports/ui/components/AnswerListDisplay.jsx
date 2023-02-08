import React from 'react';

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
                  {response.userName} (répondu le: {response.createdAt}){' '}
                </b>
                : {response.response}
              </li>
            </ul>
          ))}
        </div>
      ))}
    </>
  );
}
