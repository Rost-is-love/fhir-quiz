import "../../App.scss";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function QuestionListPage() {
  const [questionsfull, setQuestion] = useState([]);
  useEffect(() => {
    console.log("Page opened; Json fetch here")
    axios.get(`https://fhirquiz.edge.aidbox.app/Question`)
      .then(res => {
        setQuestion(res.data.entry);
        console.log(typeof(questionsfull));
        console.log(questionsfull);
      })
  });

  return (
    <div className="first question-list">
      <div className="first__container">
        <div className="w-full p-6 lg:max-w-md z-50">
          <h1 className="text-3xl mb-7 font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
            A long time ago in a galaxy far, far away....
          </h1>

        </div>

      </div>

      <div>
        <div className="centered content">
          <header>
            <h1>Questions</h1>
          </header>

          <div className="grid">
            {questionsfull.map((q, idx)=>{
              return (<div className="question" key={idx}>
                        <span className="counter"> {idx} </span>
                        <span className="name"> {q.resource.question} </span>
                      </div>)
            })}
          </div>

        </div>
      </div>

    </div>
  );
}
