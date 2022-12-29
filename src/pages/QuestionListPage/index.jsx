import "../../App.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function QuestionListPage() {
  const [questionsfull, setQuestion] = useState([]);
  useEffect(() => {
    console.log("Page opened; Json fetch here");
    if (questionsfull.length == 0) {
      axios.get(`https://fhirquiz.edge.aidbox.app/$query/questions`).then((res) => {
        setQuestion(res.data.data);
        //console.log(questionsfull);
      });
    }
  });

  return (
    <div className="question-list">
      <div className="">
        <div className="w-full z-50">
          <h1 className=" tracking-wide text-5xl mt-7 mb-7 leading-normal font-semibold ">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
              Questions
            </span>
          </h1>
        </div>
      </div>

      <div>
        <div className="content">
          <div className="grid">
            {questionsfull.map((q, idx) => {
              return (
                <a key={idx} href={"#/question/" + q.resource_data.question.id}>
                  <div className="question" title={q.resource_data.question.resource.question}>
                    <span className="name text-transparent bg-white bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-600">
                      {q.resource_data.question.resource.question.length > 50
                       ? q.resource_data.question.resource.question.substring(0, 50) + "..."
                       : q.resource_data.question.resource.question}
                    </span>
                    <span className="italic mr-5" style={{"min-width": "200px"}}>by {q.resource_data.user.resource.name.formatted} </span>
                    <div className="flex items-center">
                      <div className="text-center"> {q.likecount} votes</div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
