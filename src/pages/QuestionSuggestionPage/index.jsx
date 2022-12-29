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
        <h1 className="text-5xl mt-7 mb-7 leading-normal font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
          Suggest a question
        </h1>

        <div className="text-center text-white">Some description</div>

        <div>
          <div className="bg-gradient-to-r from-yellow-400/25 to-pink-600/25 rounded-3xl text-white w-1/2 m-auto p-4 mt-4">
            <div
              className="opacity-100 outline-0"
              contenteditable="true"
              id="suggestion_form"
            >
              lll
            </div>
          </div>

          <div className="m-auto w-40">
            <div
              className="flex mt-4 p-1 gap-x-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-600"
              onClick={(e) => suggestQuestion(e, setSuggested)}
            >
              <a className="p-2 flex items-center rounded-xl text-xl font-medium justify-center w-full bg-transparent hover:text-white duration-500">
                Submit
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // <div className="cursor-pointer bg-gradient-to-r from-yellow-400/25 to-pink-600/25 rounded-3xl text-white w-1/2 m-auto p-4 mt-4 border border-yellow-400">
  //     Submit
  // </div>
  // return (
  //   <div className="first">
  //     <div className="first__container">
  //       <div className="w-full p-6 z-50">
  //         <h1 className="text-5xl mb-7 font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
  //           Suggest a question
  //         </h1>
  //         <p className="text-center mb-7 text-xl text-white">
  //           Quiz and FHIR modeling knowledge base!
  //         </p>
  //         <textarea>
  //         </textarea>
  //       </div>
  //     </div>
  //   </div>
  // );
}
