import { useStore } from "@nanostores/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../App.scss";
import { user } from "../../store/user";
import { Question } from "./Question";
import { NextQuestion } from "./NextQuestion";

const getNextQuestion = (currentQuestion, allQuestions, userId) => {
  const notAnsweredQuestions = allQuestions.filter((question) => {
    const currentUserRes = question.q_resps?.find(
      (res) => res?.user?.id === userId
    );

    return currentUserRes &&
      currentUserRes?.response.trim() === question.q_answer.trim()
      ? false
      : true;
  });

  const missNextQuestion =
    (notAnsweredQuestions.length === 1 &&
      notAnsweredQuestions[0].q_id === currentQuestion.id) ||
    notAnsweredQuestions.length === 0;

  if (missNextQuestion) {
    return false;
  }

  const currentQuestionIdx = notAnsweredQuestions.findIndex(
    (item) => item.q_id === currentQuestion.id
  );

  const nextQuestionInx =
    currentQuestionIdx + 1 === notAnsweredQuestions.length
      ? 0
      : currentQuestionIdx + 1;

  return notAnsweredQuestions[nextQuestionInx].q_id;
};

export default function QuestionPage() {
  const currentUser = useStore(user);
  const [questionData, setQuestionData] = useState(null);
  const [nextQuestion, setNextQuestion] = useState(null);
  const params = useParams();
  const questionId = params.id;

  useEffect(() => {
    setQuestionData(null);
    async function fetchData() {
      const currentQuestion = await axios.get(
        `https://fhirquiz.edge.aidbox.app/$query/question-data?currentUserId=${currentUser.id}&questionId=${questionId}`
      );
      const allQuestions = await axios.get(
        `https://fhirquiz.edge.aidbox.app/$query/questions`
      );

      const nextQeust = getNextQuestion(
        currentQuestion.data?.data[0]?.resource,
        allQuestions.data.data,
        currentUser.id
      );

      setQuestionData(currentQuestion.data?.data[0]?.resource);
      setNextQuestion(nextQeust);
    }
    if (currentUser) {
      fetchData();
    }
  }, [questionId, currentUser, nextQuestion]);

  if (questionData) {
    return (
      <div className="w-full z-50">
        <Question
          setQuestionData={setQuestionData}
          questionData={questionData}
          currentUser={currentUser}
        />
        <NextQuestion nextQuestion={nextQuestion} />
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
            to save your progress
          </>
        )}
      </div>
    );
  }
}
