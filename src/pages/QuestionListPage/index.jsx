import "../../App.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { user } from "../../store/user";
import { useStore } from "@nanostores/react";

export default function QuestionListPage() {
  const [questionsfull, setQuestion] = useState([]);
  const currentUser = useStore(user);
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
                <div key={idx} className="question" title={q.resource_data.question.resource.question}>

                  {currentUser?.id == q?.resource_data?.q_resp?.resource?.user?.id && currentUser?.id.length > 0 ?

                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"> </g>
                  <g id="SVGRepo_iconCarrier">
                  <path d="M4.91988 12.257C4.2856 12.257 3.65131 12.5199 3.19988 13.0342C2.79417 13.4913 2.59417 14.0799 2.63417 14.6913C2.67417 15.3027 2.94846 15.857 3.4056 16.2627L7.51417 19.8684C7.93131 20.2342 8.46846 20.4399 9.02274 20.4399C9.0856 20.4399 9.14846 20.4399 9.21131 20.4342C9.82846 20.3827 10.4056 20.0799 10.7942 19.5999L20.857 7.27986C21.657 6.30272 21.5085 4.85701 20.5313 4.05701C20.057 3.67415 19.4627 3.49129 18.857 3.55415C18.2513 3.61701 17.7027 3.90844 17.3142 4.38272L8.74846 14.8627L6.42274 12.8227C5.99417 12.4456 5.45131 12.257 4.91988 12.257Z" fill="url(#paint0_linear)"></path> <path d="M9.02279 20.0284C8.56565 20.0284 8.12565 19.8627 7.78279 19.5598L3.67422 15.9541C2.89708 15.2684 2.81708 14.0798 3.50279 13.3027C4.18851 12.5255 5.37708 12.4455 6.15422 13.1313L8.79994 15.4513L17.6285 4.63983C18.2856 3.83412 19.4685 3.71983 20.2742 4.37126C21.0799 5.0284 21.1942 6.21126 20.5428 7.01697L10.4742 19.337C10.1542 19.7313 9.67993 19.977 9.17708 20.0227C9.12565 20.0227 9.07422 20.0284 9.02279 20.0284Z" fill="url(#paint1_linear)"></path> <path opacity="0.75" d="M9.02279 20.0284C8.56565 20.0284 8.12565 19.8627 7.78279 19.5598L3.67422 15.9541C2.89708 15.2684 2.81708 14.0798 3.50279 13.3027C4.18851 12.5255 5.37708 12.4455 6.15422 13.1313L8.79994 15.4513L17.6285 4.63983C18.2856 3.83412 19.4685 3.71983 20.2742 4.37126C21.0799 5.0284 21.1942 6.21126 20.5428 7.01697L10.4742 19.337C10.1542 19.7313 9.67993 19.977 9.17708 20.0227C9.12565 20.0227 9.07422 20.0284 9.02279 20.0284Z" fill="url(#paint2_radial)"></path> <path opacity="0.5" d="M9.02279 20.0284C8.56565 20.0284 8.12565 19.8627 7.78279 19.5598L3.67422 15.9541C2.89708 15.2684 2.81708 14.0798 3.50279 13.3027C4.18851 12.5255 5.37708 12.4455 6.15422 13.1313L8.79994 15.4513L17.6285 4.63983C18.2856 3.83412 19.4685 3.71983 20.2742 4.37126C21.0799 5.0284 21.1942 6.21126 20.5428 7.01697L10.4742 19.337C10.1542 19.7313 9.67993 19.977 9.17708 20.0227C9.12565 20.0227 9.07422 20.0284 9.02279 20.0284Z" fill="url(#paint3_radial)"></path> <defs> <linearGradient id="paint0_linear" x1="15.825" y1="-13.9667" x2="9.82533" y2="23.9171" gradientUnits="userSpaceOnUse"> <stop stop-color="#00CC00"></stop> <stop offset="0.1878" stop-color="#06C102"></stop> <stop offset="0.5185" stop-color="#17A306"></stop> <stop offset="0.9507" stop-color="#33740C"></stop> <stop offset="1" stop-color="#366E0D"></stop> </linearGradient> <linearGradient id="paint1_linear" x1="15.2501" y1="0.625426" x2="7.43443" y2="23.6215" gradientUnits="userSpaceOnUse"> <stop offset="0.2544" stop-color="#90D856"></stop> <stop offset="0.736" stop-color="#00CC00"></stop> <stop offset="0.7716" stop-color="#0BCD07"></stop> <stop offset="0.8342" stop-color="#29CF18"></stop> <stop offset="0.9166" stop-color="#59D335"></stop> <stop offset="1" stop-color="#90D856"></stop> </linearGradient> <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.452 8.95803) rotate(116.129) scale(8.35776 4.28316)"> <stop stop-color="#FBE07A" stop-opacity="0.75"></stop> <stop offset="0.0803394" stop-color="#FBE387" stop-opacity="0.6897"></stop> <stop offset="0.5173" stop-color="#FDF2C7" stop-opacity="0.362"></stop> <stop offset="0.8357" stop-color="#FFFBF0" stop-opacity="0.1233"></stop> <stop offset="1" stop-color="white" stop-opacity="0"></stop> </radialGradient> <radialGradient id="paint3_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11.6442 17.0245) rotate(155.316) scale(9.80163 4.14906)"> <stop stop-color="#440063" stop-opacity="0.25"></stop> <stop offset="1" stop-color="#420061" stop-opacity="0"></stop> </radialGradient> </defs> </g></svg>
                   :
                   <div className="w-5 h-5 mr-3"></div>}

                  <a className="name text-transparent bg-white bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-600" href={"#/question/" + q.resource_data.question.id}>
                    <span>
                      {q.resource_data.question.resource.question.length > 50
                       ? q.resource_data.question.resource.question.substring(0, 50) + "..."
                       : q.resource_data.question.resource.question}
                    </span>
                  </a>
                  <span className="author italic mr-5">by {q.resource_data.user.resource.name.formatted} </span>


                  <div className="flex items-center">
                    <div className="text-center"> {q.likecount} votes</div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
    </div>
  );
}
