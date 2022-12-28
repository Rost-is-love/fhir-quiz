import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import axios from "axios";
import "../../App.scss";

const submitResponse = async (
  userResponse,
  rightAnswer,
  questionId,
  currentUserId,
  selectedElement
) => {
  const questionResponse = await axios.post(
    "https://fhirquiz.edge.aidbox.app/QuestionResponse",
    {
      user: {
        resourceType: "User",
        id: currentUserId,
      },
      question: {
        resourceType: "Question",
        id: questionId,
      },
      response: userResponse,
    }
  );

  const options = document.getElementsByClassName("option-text");
  console.log(options, "options");
  [...options].forEach((option) => {
    option.classList.remove("text-green-500", "text-red-500");
    option.classList.add("text-white");
  });
  const selectedOption = document.getElementById(selectedElement);
  selectedOption.classList.remove("text-white");
  console.log(selectedOption, "selectedOption");
  if (userResponse.trim().toLowerCase() === rightAnswer.trim().toLowerCase()) {
    selectedOption.classList.add("text-green-500");
  } else {
    selectedOption.classList.add("text-red-500");
  }
  console.log(questionResponse, "QuestionResponse");
};

const removeLike = async (likeId) => {
  await axios.delete(`https://fhirquiz.edge.aidbox.app/Like/${likeId}`);
};

const addLike = async (userId, questionId) => {
  await axios.post(`https://fhirquiz.edge.aidbox.app/Like`, {
    user: {
      resourceType: "User",
      id: userId,
    },
    question: {
      resourceType: "Question",
      id: questionId,
    },
  });
};

export default function QuestionPage() {
  const [question, setQuestion] = useState({});
  const [author, setAuthor] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [userResponse, setUserResponse] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [like, setLike] = useState({});
  const params = useParams();
  const questionId = params.id;

  useEffect(() => {
    async function fetchData() {
      const questionData = await axios.get(
        `https://fhirquiz.edge.aidbox.app/Question/${questionId}`
      );
      setQuestion(questionData.data);

      const authorData = await axios.get(
        `https://fhirquiz.edge.aidbox.app/User/${question.author.id}`
      );
      setAuthor(authorData.data);

      const currentUserData = await axios.get(
        "https://fhirquiz.edge.aidbox.app/auth/userinfo"
      );
      setCurrentUser(currentUserData.data);

      const responseData = await axios.get(
        `https://fhirquiz.edge.aidbox.app/QuestionResponse?.user.id=${currentUser.id}&.question.id=${question.id}&_sort=createdAt`
      );
      setUserResponse(responseData.data[0].response);

      const likeData = await axios.get(
        `https://fhirquiz.edge.aidbox.app/Like?.user.id=${currentUser.id}&.question.id=${question.id}`
      );
      setLike(likeData.data);
    }
    fetchData();
  });

  const likeStyles = classNames({
    "mt-6": true,
    "hover:cursor-pointer": true,
    "text-white": !like.question,
    "ext-pink-600": like.question,
  });

  return (
    <div className="first">
      <div className="first__container question-container">
        <section>
          <div className="mb-10 flex justify-between">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
              Question #{questionId.split("-")[1]}
            </h1>
            <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
              Author: {author.title}
            </h2>
          </div>
          <div
            className="
            max-w-3xl
            p-6
            bg-transparent
            border-4
            border-gray-300
            rounded-lg"
          >
            <h2 className="text-white text-2xl font-semibold mb-10 whitespace-pre">
              {question.question}
            </h2>
            <div className="flex gap-4 flex-col mb-7">
              {question.options?.map(({ value }, i) => {
                return (
                  <div className="flex items-center mb-1">
                    <input
                      id={`default-radio-${i + 1}`}
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 accent-pink-500"
                      onClick={() => {
                        setUserResponse(value);
                        setSelectedElement(`label-radio-${i + 1}`);
                      }}
                    ></input>
                    <label
                      id={`label-radio-${i + 1}`}
                      for={`default-radio-${i + 1}`}
                      className="option-text ml-2 text-xl font-medium text-white"
                    >
                      {value}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between">
              <button
                className="p-6 mr-7 flex items-center rounded-xl text-2xl font-medium justify-center w-1/2 bg-gradient-to-r from-yellow-400 to-pink-600 hover:text-white duration-500"
                onClick={() =>
                  submitResponse(
                    userResponse,
                    question.answer,
                    question.id,
                    currentUser.id,
                    selectedElement
                  )
                }
              >
                Submit
              </button>
              <div
                className={likeStyles}
                onClick={() => {
                  if (like.question) {
                    removeLike(like.id);
                    setLike({});
                  } else {
                    addLike(currentUser.id, question.id);
                  }
                }}
              >
                <svg
                  fill="#000000"
                  version="1.1"
                  id="Filled_Icons"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 24 24"
                  enable-background="new 0 0 24 24"
                  className="w-10 h-10 fill-current mr-5"
                >
                  <g id="Like-Filled">
                    <path d="M23,10v10c0,1.66-1.34,3-3,3H6V11h2c1.66,0,3-1.24,3-2.9V1h2.1C14.76,1,16,2.34,16,4v6H23z M1,23h3V11H1V23z" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
