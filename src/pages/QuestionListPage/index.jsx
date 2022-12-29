import "../../App.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function QuestionListPage() {
  const [questionsfull, setQuestion] = useState([]);
  useEffect(() => {
    console.log("Page opened; Json fetch here")
    if (questionsfull.length == 0)
    {axios.get(`https://fhirquiz.edge.aidbox.app/Question`)
     .then(res => {
       setQuestion(res.data.entry);
       console.log(typeof(questionsfull));
       console.log(questionsfull);
     })
    }
  });

  return (
    <div className="question-list">
      <div className="">
        <div className="w-full p-6 lg:max-w-md z-50">
          <h1 className="text-3xl mb-7 font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
            Pick your poison
          </h1>
        </div>
      </div>

      <div>
        <div className="centered content">

          <div className="grid">
            {questionsfull.map((q, idx)=>{
              return (<a href={"question/" + q.resource.id}>
                        <div className="question" key={idx} title={q.resource.question}>
                          <div>
                            <div className="arrow-up bg-gradient-to-r from-yellow-400 to-pink-600"> </div>
                            <div className="text-center"> {idx} </div>
                            <div className="arrow-down"> </div>
                          </div>
                          <span className="name ml-5">
                            {(q.resource.question.length > 50) ?
                             q.resource.question.substring(0, 50) + "..." :
                             q.resource.question}
                          </span>
                          <span className="italic mr-5"> by the best Author </span>

                        </div>
                      </a>)
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
