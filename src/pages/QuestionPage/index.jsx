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
  selectedElement,
  questionData
) => {
  const questionResponse = await axios.put(
    `https://fhirquiz.edge.aidbox.app/QuestionResponse/${currentUserId}_${questionId}`,
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

  [...options].forEach((option) => {
    option.classList.remove("text-green-500", "text-red-500");
    option.classList.add("text-white");
  });
  const selectedOption = document.getElementById(selectedElement);
  selectedOption.classList.remove("text-white");

  const neededValueAndTip = questionData.options.find(
    (valueAndTip) => valueAndTip.value.trim() === userResponse.trim()
  );
  const { tip } = neededValueAndTip;
  if (tip) {
    document.querySelector(".tip-text").innerHTML = tip;
    document.querySelector(".tip-place").style.display = "block";
  } else {
    document.querySelector(".tip-place").style.display = "none";
  }

  if (userResponse.trim().toLowerCase() === rightAnswer.trim().toLowerCase()) {
    selectedOption.classList.add("text-green-500");
  } else {
    selectedOption.classList.add("text-red-500");
  }
};

const removeLike = async (likeId) => {
  await axios.delete(`https://fhirquiz.edge.aidbox.app/Like/${likeId}`);
};

const getNextQuestion = (currentQuestion, allQuestions) => {
  const currentQuestionIdx = allQuestions.findIndex(
    (item) => item.id === currentQuestion.id
  );

  const nextQuestionInx =
    currentQuestionIdx + 1 === allQuestions.length ? 0 : currentQuestionIdx + 1;

  return allQuestions[nextQuestionInx].id;
};

export default function QuestionPage() {
  const currentUser = useStore(user);
  const [questionData, setQuestionData] = useState(null);
  const [nextQuestion, setNextQuestion] = useState(null);
  const [userResponse, setUserResponse] = useState("");
  const [like, setLike] = useState(false);
  const [selectedElement, setSelectedElement] = useState("");
  const params = useParams();

  const questionId = params.id;
  console.log(like, "clickLike");
  console.log(questionData, "questionDataquestionData");

  useEffect(() => {
    setQuestionData(null);
    setLike(false);
    async function fetchData() {
      const currentQuestion = await axios.get(
        `https://fhirquiz.edge.aidbox.app/$query/question-data?currentUserId=${currentUser.id}&questionId=${questionId}`
      );

      setQuestionData(currentQuestion.data?.data[0]?.resource);
      if (currentQuestion.data?.data[0]?.resource?.like?.id) {
        setLike(true);
      }

      const allQuestions = await axios.get(
        `https://fhirquiz.edge.aidbox.app/$query/questions`
      );

      const nextQeust = getNextQuestion(
        currentQuestion.data?.data[0]?.resource,
        allQuestions.data.data
      );
      setNextQuestion(nextQeust);
    }

    if (currentUser) {
      fetchData();
    }
  }, [questionId, currentUser]);

  const addLike = async () => {
    const res = await axios.post(`https://fhirquiz.edge.aidbox.app/Like`, {
      user: {
        resourceType: "User",
        id: currentUser.id,
      },
      question: {
        resourceType: "Question",
        id: questionData.id,
      },
    });

    const likeId = res.data.id;
    const newState = { ...questionData, like: { id: likeId } };

    setQuestionData(newState);
  };

  const likeStyles = classNames({
    "mt-6": true,
    "hover:cursor-pointer": true,
    "text-white": !like,
    "text-pink-600": like,
  });

  if (questionData) {
    return (
      <div className="w-full z-50">
        <h1 className="tracking-wide text-5xl mt-7 mb-7 leading-normal font-semibold ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
            Question #{questionId}
          </span>
          <span className="text-xl ml-2 pb-1 text-white">
            by {questionData?.user?.name?.formatted}
          </span>
        </h1>

        <p className="text-white text-xl tracking-wide text-left mb-10">
          {questionData.question}
        </p>

        <div className="flex gap-4 flex-col mb-7">
          {questionData.options?.map(({ value }, i) => {
            return (
              <div
                className="flex items-center mb-1 hover:cursor-pointer"
                key={i}
              >
                <input
                  id={`default-radio-${i + 1}`}
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 accent-pink-500"
                  onClick={() => {
                    document.querySelector(".tip-place").style.display = "none";
                    const options =
                      document.getElementsByClassName("option-text");
                    [...options].forEach((option) => {
                      option.classList.remove("text-green-500", "text-red-500");
                      option.classList.add("text-white");
                    });
                    setUserResponse(value);
                    setSelectedElement(`label-radio-${i + 1}`);
                  }}
                ></input>
                <label
                  id={`label-radio-${i + 1}`}
                  for={`default-radio-${i + 1}`}
                  className="option-text ml-2 text-l text-left font-medium text-white"
                >
                  {value}
                </label>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between pb-10">
          <button
            className="px-6 mr-7 flex items-center rounded-xl text-2xl font-medium justify-center bg-gradient-to-r from-yellow-400 to-pink-600 hover:from-pink-600 hover:to-yellow-400 hover:duration-500"
            onClick={() =>
              submitResponse(
                userResponse,
                questionData.answer,
                questionData.id,
                currentUser.id,
                selectedElement,
                questionData
              )
            }
          >
            Submit
          </button>
          <div
            className={likeStyles}
            onClick={() => {
              if (questionData.like?.id) {
                removeLike(questionData.like?.id);
              } else {
                addLike(currentUser.id, questionData.id);
              }

              if (like) {
                setLike(false);
              } else {
                setLike(true);
              }
            }}
          >
            <svg
              version="1.1"
              id="Filled_Icons"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 24 24"
              className="w-10 h-10 fill-current mr-5"
            >
              <g>
                <path d="M23,10v10c0,1.66-1.34,3-3,3H6V11h2c1.66,0,3-1.24,3-2.9V1h2.1C14.76,1,16,2.34,16,4v6H23z M1,23h3V11H1V23z" />
              </g>
            </svg>
          </div>
        </div>
        <div className="tip-place" style={{ display: "none" }}>
          <h3 className="text-lg font-semibold mb-2">Tip:</h3>
          <p className="tip-text"></p>
        </div>

        {nextQuestion && (
          <div className="pt-10">
            <div className="rounded-xl bg-gradient-to-r from-yellow-400 to-pink-600 hover:from-pink-600 hover:to-yellow-400 hover:duration-500">
              <a
                href={`#/question/${nextQuestion}`}
                className="p-3 flex items-center rounded-xl text-2xl font-medium justify-center w-full bg-transparent hover:text-white duration-500"
              >
                <svg
                  className="w-10 h-10 fill-current mr-5"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <g>
                    <path d="M8.245 4.695a.75.75 0 00-.05 1.06l1.36 1.495H4.75a.75.75 0 000 1.5h4.805l-1.36 1.495a.75.75 0 001.11 1.01l2.5-2.75a.75.75 0 000-1.01l-2.5-2.75a.75.75 0 00-1.06-.05z" />

                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1116 0A8 8 0 010 8zm8-6.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"
                      clip-rule="evenodd"
                    />
                  </g>
                </svg>
                Next Question
              </a>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="w-full z-50">
        <h1 className=" tracking-wide text-5xl mt-7 mb-7 leading-normal font-semibold ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
            Question #{questionId}
          </span>
        </h1>
        Loading...
      </div>
    );
  }
}
