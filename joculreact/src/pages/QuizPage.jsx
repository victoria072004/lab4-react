import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/QuizPage.css";

const QuizPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { name, questions = [], timer = 0 } = state || {};

  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timer);

  const handleAnswer = useCallback((selected) => {
    const current = questions[index];
    const isCorrect = selected === current.correct;

    const answerObj = {
      question: current.question,
      selected,
      correct: current.correct,
      category: current.category,
      difficulty: current.difficulty,
      isCorrect,
    };

    const existing = JSON.parse(localStorage.getItem("quizHistory")) || [];

    const existingPlayerIndex = existing.findIndex(
      (record) => record.name === name
    );

    if (existingPlayerIndex !== -1) {
      if (existing[existingPlayerIndex].score < isCorrect ? 1 : 0) {
        existing[existingPlayerIndex] = { ...answerObj }; 
      }
    } else {
      existing.push({ ...answerObj });
    }

    if (existing.length > 10) existing.shift();

    localStorage.setItem("quizHistory", JSON.stringify(existing));

    if (index < questions.length - 1) {
      setIndex(index + 1);
      setTimeLeft(timer); 
    } else {
      const score = existing.filter((a) => a.isCorrect).length;

      const resultData = {
        name,
        score,
        total: questions.length,
        answers: existing,
        date: new Date().toLocaleString(),
      };

      navigate("/result", { state: resultData });
    }
  }, [index, questions, timer, name, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleAnswer(null); 
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, index, timer, questions.length, handleAnswer]);

  if (questions.length === 0) {
    return <div className="centered">Nu sunt întrebări disponibile.</div>;
  }

  const current = questions[index];

  return (
    <div className="quiz-container">
      <div className="question-card">
        <p className="question-meta">
          Întrebarea {index + 1}: {current.category} - {current.difficulty}
        </p>
        <h2 className="question-text">{current.question}</h2>

        <div className="options">
          {current.options?.map((option, i) => (
            <button key={i} className="option-btn" onClick={() => handleAnswer(option)}>
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
