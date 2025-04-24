import React, { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswer = (selectedOption) => {
    const current = questions[selectedAnswers.length];
    const correct = selectedOption === current.correct;

    setSelectedAnswers((prev) => [
      ...prev,
      {
        question: current.question,
        selected: selectedOption,
        correct: current.correct,
        isCorrect: correct,
      },
    ]);

    if (correct) setScore((s) => s + 1);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        setQuestions,
        score,
        setScore,
        selectedAnswers,
        handleAnswer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
