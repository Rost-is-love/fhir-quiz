import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@nanostores/react";
import classNames from "classnames";
import axios from "axios";
import "../../App.scss";
import { user } from "../../store/user";

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
  const currentUser = useStore(user);
  const [question, setQuestion] = useState({});
  const [author, setAuthor] = useState({});
  const [userResponse, setUserResponse] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [like, setLike] = useState({});
  const params = useParams();
  const questionId = params.id;

  // Question
  // QuestionResponse
  // User as author
  // Like

  // params
  // questionId
  // currentUser.id
  useEffect(() => {
    async function fetchData() {


      if (Object.keys(question).length == 0) {
      const questionData = await axios.get(
        `https://fhirquiz.edge.aidbox.app/Question/${questionId}`
      );
      setQuestion(questionData.data);
      };

      if (Object.keys(author).length == 0) {
      const authorData = await axios.get(
        `https://fhirquiz.edge.aidbox.app/User/${question.author.id}`
      );
      setAuthor(authorData.data);
      };

      if (userResponse.length == 0) {
      const responseData = await axios.get(
        `https://fhirquiz.edge.aidbox.app/QuestionResponse?.user.id=${currentUser.id}&.question.id=${question.id}&_sort=createdAt`
      );
      setUserResponse(responseData.data[0].response);
      };

      if (Object.keys(like).length == 0) {
      const likeData = await axios.get(
        `https://fhirquiz.edge.aidbox.app/Like?.user.id=${currentUser.id}&.question.id=${question.id}`
      );
      setLike(likeData.data);
      };

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
          <div className="mt-10 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-600">
            <a
              href={`#/question/question-${
                Number(questionId.split("-")[1]) + 1
              }`}
              className="p-3 flex items-center rounded-xl text-2xl font-medium justify-center w-full bg-transparent hover:text-white duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current mr-5"
              >
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
              </svg>
              Next Question
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
