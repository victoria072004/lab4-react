import React, { useState, useEffect, useCallback, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizState";
import "../styles/QuizPage.css";

const QuizPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    questions,
    setQuestions,
    handleAnswer,
    saveHistory,
    setSelectedAnswers,
    setScore,
  } = useContext(QuizContext);

  const { name, questions: quizQuestions = [], timer = 0 } = state || {};

  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timer);
  const [_localAnswers, setLocalAnswers] = useState([]);

  useEffect(() => {
    if (quizQuestions.length === 0) {
      return;
    }
    setQuestions(quizQuestions);
    setSelectedAnswers([]);
    setScore(0);
    setLocalAnswers([]);
  }, [quizQuestions, setQuestions, setSelectedAnswers, setScore]);

  const handleAnswerClick = useCallback(
    (selected) => {
      const current = questions[index];
      if (!current) {
        return;
      }
      handleAnswer(selected, current);

      const newAnswer = {
        question: current.question,
        selected,
        correct: current.correct,
        category: current.category,
        difficulty: current.difficulty,
        isCorrect: selected === current.correct,
      };

      setLocalAnswers((prev) => {
        const updatedAnswers = [...prev, newAnswer];
        if (index < questions.length - 1) {
          setIndex(index + 1);
          setTimeLeft(timer);
        } else {
          const score = updatedAnswers.filter((answer) => answer.isCorrect).length;
          const resultData = {
            name,
            score,
            total: questions.length,
            answers: updatedAnswers,
            date: new Date().toLocaleString(),
          };

          saveHistory(name, score, questions.length, updatedAnswers);
          setSelectedAnswers(updatedAnswers);
          navigate("/result", { state: resultData });
        }
        return updatedAnswers;
      });
    },
    [
      index,
      questions,
      timer,
      name,
      navigate,
      handleAnswer,
      saveHistory,
      setSelectedAnswers,
    ]
  );

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleAnswerClick(null);
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, index, timer, handleAnswerClick]);

  if (questions.length === 0) {
    return <div className="centered">Nu sunt întrebări disponibile.</div>;
  }

  const current = questions[index];
  if (!current) {
    return <div className="centered">Eroare: Întrebare invalidă.</div>;
  }

  return (
    <div className="quiz-container">
      <div className="question-card">
        <p className="question-meta">
          Întrebarea {index + 1}: {current.category} - {current.difficulty}
        </p>
        <h2 className="question-text">{current.question}</h2>

        <div className="options">
          {current.options?.map((option, i) => (
            <button
              key={i}
              className="option-btn"
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {timer > 0 && <p className="timer">Timp rămas: {timeLeft} secunde</p>}
      </div>
    </div>
  );
};

export default QuizPage;