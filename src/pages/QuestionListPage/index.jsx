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
    <div>
      <div className="centered content question-list">
        <header>
          <h1>Questions</h1>
        </header>

        <div className="grid">
          {questionsfull.map((q, idx)=>{
            return (<div className="question" key={idx}>
                    <span> {q.resource.question} </span>
                    <span> {q.resource.author.id} </span>
                    </div>)
          })}
        </div>

      </div>
    </div>
  );
}
