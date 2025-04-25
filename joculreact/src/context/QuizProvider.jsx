import React, { useState, useEffect } from "react";
import { QuizContext } from './QuizState';

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
      console.log("Istoric încărcat la inițializare:", savedHistory);
      setHistory(savedHistory);
    } catch (error) {
      console.error("Eroare la încărcarea istoricului din localStorage:", error);
      setHistory([]);
    }
  }, []);

  const handleAnswer = (selectedOption, currentQuestion) => {
    const correct = selectedOption === currentQuestion.correct;
    setSelectedAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: currentQuestion.correct,
        category: currentQuestion.category,
        difficulty: currentQuestion.difficulty,
        isCorrect: correct,
      },
    ]);
    if (correct) setScore((s) => s + 1);
  };

  const saveHistory = (name, score, total, answers) => {
    try {
      const newEntry = {
        name,
        score,
        total,
        date: new Date().toLocaleString(),
        answers,
      };

      let updatedHistory = [...history];

      const existingIndex = updatedHistory.findIndex(
        (entry) => entry.name === name
      );

      if (existingIndex !== -1) {
        if (updatedHistory[existingIndex].score < score) {
          updatedHistory[existingIndex] = newEntry;
          console.log(`Scor actualizat pentru ${name}: ${score}/${total}`);
        } else {
          console.log(
            `Scorul existent pentru ${name} (${updatedHistory[existingIndex].score}) este mai mare.`
          );
          return;
        }
      } else {
        updatedHistory = [newEntry, ...updatedHistory].slice(0, 10);
        console.log(`Intrare nouă pentru ${name}: ${score}/${total}`);
      }

      setHistory(updatedHistory);
      localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
      console.log("Istoric salvat:", updatedHistory);
    } catch (error) {
      console.error("Eroare la salvarea istoricului:", error);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        setQuestions,
        score,
        setScore,
        selectedAnswers,
        setSelectedAnswers,
        handleAnswer,
        history,
        setHistory,
        saveHistory,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};