import "../../App.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

function suggestQuestion(e, setSuggested) {
  const suggestion = document.getElementById("suggestion_form").innerText;

  axios
    .post(`https://fhirquiz.edge.aidbox.app/QuestionSuggestion`, {
      suggestion: suggestion,
    })
    .then((res) => {
      console.log(res.data.entry);
      setSuggested(true);
    });
}

export default function QuestionSuggestionPage() {
  const [suggested, setSuggested] = useState(false);

  if (suggested) {
    return (
      <div>
        <h1 className="text-5xl mt-7 mb-7 leading-normal font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
          Suggest a question
        </h1>

        <div className="text-center text-white">Some description</div>

        <div className="text-center text-white">Suggested</div>

        <div className="m-auto w-40">
          <div
            className="flex mt-4 p-1 gap-x-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-600"
            onClick={(e) => suggestQuestion(e, setSuggested)}
          >
            <a className="p-2 flex items-center rounded-xl text-xl font-medium justify-center w-full bg-transparent hover:text-white duration-500">
              Suggest another question
            </a>
          </div>
        </div>
      </div>
    );
  } else {
      return (
          <div>
              <h1 className=" tracking-wide text-5xl mt-7 mb-7 leading-normal font-semibold ">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
                      Suggest question
                  </span>
              </h1>

              <div className="leading-6 text-white tracking-wide mb-7">
                  Here you can create and submit your question.

                  After submitting this question will be sent to review and published.

                  Don't forget to provide the correct answer to you question, please.
                  You also can add several answer options and explanations of the correct answer. You can even provide the link to the corresponding page of fhir specification or discussion in fhir chat.

                  We are looking forward  to receiving your questions!
              </div>

              <div>
                  <textarea className="outline-0 rounded-2xl text-black w-2/3 p-4 mt-4" placeholder="Your suggestion..." />

                  <div className="w-40">
                      <div className="cursor-pointer flex mt-4 p-1 gap-x-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-600" onClick={(e) => suggestQuestion(e, setSuggested)}>
                          <a className="tracking-wide p-2 flex rounded-xl text-xl font-medium justify-center w-full bg-transparent hover:text-white duration-500">
                              Submit
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}
