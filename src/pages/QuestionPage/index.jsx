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

  [...options].forEach((option) => {
    option.classList.remove("text-green-500", "text-red-500");
    option.classList.add("text-white");
  });
  const selectedOption = document.getElementById(selectedElement);
  selectedOption.classList.remove("text-white");

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
    const res = await axios.put(`https://fhirquiz.edge.aidbox.app/Like/${questionData.id}_${currentUser.id}`, {
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

        <div className="flex justify-between">
          <div>
            <button
              className="px-8 px-4 mr-7 flex items-center rounded-xl text-2xl font-medium justify-center bg-gradient-to-r from-yellow-400 to-pink-600 hover:from-pink-600 hover:to-yellow-400 hover:duration-500"
              style={{padding: "8px 24px 8px 24px"}}
              onClick={() =>
                submitResponse(
                  userResponse,
                  questionData.answer,
                  questionData.id,
                  currentUser.id,
                  selectedElement)}>
              Submit
            </button>
          </div>

          {like ?

           <div
             className="cursor-pointer flex items-center"
             onClick={() => {removeLike(questionData.like?.id);
                             setLike(false);}}>
             liked
             <svg height="32px" width="32px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 388.219 388.219" >
               <path style={{fill: "#FF793B"}} d="M160.109,182.619c0.8,6.8-6,11.6-12,8c-22-12.8-32.8-36.4-47.2-56.8c-23.2,36.8-40.8,72.4-40.8,110.4
  c0,77.2,54.8,136,132,136s136-58.8,136-136c0-96.8-101.2-113.6-100-236C187.309,37.019,148.909,101.419,160.109,182.619z"/>
               <path style={{fill: "#C6490F"}} d="M192.109,388.219c-81.2,0-140-60.4-140-144c0-42,20.4-80,42-114.8c1.6-2.4,4-3.6,6.4-3.6
  c2.8,0,5.2,1.2,6.8,3.2c3.6,4.8,6.8,10,10,15.2c10,15.6,19.6,30.4,34.8,39.2l0,0c-11.6-82.8,27.6-151.2,71.2-182
  c2.4-1.6,5.6-2,8.4-0.4c2.8,1.2,4.4,4,4.4,7.2c-0.8,62,26.4,96,52.4,128.4c23.6,29.2,47.6,59.2,47.6,107.6
  C336.109,326.219,274.109,388.219,192.109,388.219z M101.309,148.619c-18,29.6-33.2,61.6-33.2,95.6c0,74,52,128,124,128
  c72.8,0,128-55.2,128-128c0-42.8-20.4-68-44-97.6c-24.4-30.4-51.6-64.4-55.6-122c-34.4,31.2-62,88.4-52.4,156.8l0,0
  c0.8,6.4-2,12.4-7.2,15.6c-5.2,3.2-11.6,3.2-16.8,0c-18.4-10.8-29.2-28-40-44.4C102.909,151.419,102.109,150.219,101.309,148.619z"
               />

               <path style={{fill: "#FF793B"}} d="M278.109,304.219c14-21.6,22-47.6,22-76"/>
               <path style={{fill: "#C6490F"}} d="M278.109,312.219c-1.6,0-3.2-0.4-4.4-1.2c-3.6-2.4-4.8-7.2-2.4-11.2c13.6-20.8,20.8-45.6,20.8-71.6
  c0-4.4,3.6-8,8-8s8,3.6,8,8c0,29.2-8,56.8-23.2,80.4C283.309,311.019,280.909,312.219,278.109,312.219z"/>
               <path style={{fill: "#FF793B"}} d="M253.709,332.219c2.8-2.4,6-5.2,8.4-8"/>
               <path style={{fill: "#C6490F"}} d="M253.709,340.219c-2.4,0-4.4-0.8-6-2.8c-2.8-3.2-2.4-8.4,0.8-11.2c2.4-2.4,5.6-4.8,7.6-7.2
  c2.8-3.2,8-3.6,11.2-0.8c3.2,2.8,3.6,8,0.8,11.2c-2.8,3.2-6.4,6.4-9.2,8.8C257.309,339.419,255.709,340.219,253.709,340.219z"/>
             </svg>
           </div>
           :
           <div className="cursor-pointer flex items-center"
                onClick={() => {addLike(currentUser.id, questionData.id);
                                setLike(true);}}>
             like
             <svg fill="#fff" height="32px" width="32px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 388.055 388.055">
               <g>
                 <g>
                   <g>
                     <path d="M288.428,136.455c-26-32.4-53.2-66.4-52.4-128.4c0-3.2-1.6-5.6-4.4-7.2c-2.8-1.2-6-1.2-8.4,0.4
        c-43.6,31.2-82.4,99.6-71.2,182.8c-15.2-8.8-24.4-23.6-34.8-39.2c-3.2-5.2-6.4-10.4-10-15.2c-1.6-2-4-3.6-6.8-3.2
        c-2.8,0-5.2,1.6-6.4,3.6c-20.8,32.4-42,71.6-42,114c0,83.6,58.8,144,140,144c82,0,144-62,144-144
        C336.028,195.655,312.028,165.655,288.428,136.455z M192.028,372.055c-72,0-124-54-124-128c0-34,15.6-66.8,33.2-95.2
        c0.8,1.6,2,2.8,2.8,4.4c10.8,16.8,21.6,33.6,40,44.4c5.2,3.2,11.6,3.2,16.8,0c5.2-3.2,8-9.2,7.2-15.6
        c-9.6-68.4,18-126,52.4-157.2c4,57.6,31.2,91.6,55.6,122c23.6,29.2,44,54.4,44,97.2
        C320.028,316.855,264.828,372.055,192.028,372.055z"/>
                     <path d="M300.028,220.055c-4.4,0-8,3.6-8,8c0,26.4-6.8,50.4-20.8,71.6c-2.4,3.6-1.2,8.8,2.4,11.2c1.2,0.8,2.8,1.2,4.4,1.2
        c2.8,0,5.2-1.2,6.8-3.6c15.2-24,23.2-50.8,23.2-80.4C308.028,223.655,304.428,220.055,300.028,220.055z"/>
                     <path d="M267.228,318.055c-3.2-2.8-8.4-2.4-11.2,0.8c-2,2.4-4.8,4.8-7.6,7.2c-3.2,2.8-3.6,8-0.8,11.2c1.6,2,4,2.8,6,2.8
        s3.6-0.8,5.2-2c3.2-2.8,6.4-5.6,9.2-8.8C270.828,326.055,270.428,320.855,267.228,318.055z"/>
                   </g>
                 </g>
               </g>
             </svg>
           </div>



          }


        </div>

        {nextQuestion && (
          <div className="mt-20 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-600 hover:from-pink-600 hover:to-yellow-400 hover:duration-500">
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
        {currentUser ? (
          "Loading..."
        ) : (
          <>
            Please{" "}
            <a href="/" className="underline text-cyan-500">
              LogIn
            </a>{" "}
            to see the question
          </>
        )}
      </div>
    );
  }
}
