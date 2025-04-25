import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizState"; 
import "../styles/ResultPage.css";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedAnswers } = useContext(QuizContext);

  const { score, total, answers = selectedAnswers } = location.state || {};

  const correctAnswers = answers.filter((answer) => answer.isCorrect);
  const incorrectAnswers = answers.filter((answer) => !answer.isCorrect);

  return (
    <div className="result-container">
      <h1>Rezultatele tale</h1>
      <p>
        Scor final: {score} din {total}
      </p>

      <div className="correct-answers">
        <h3>Întrebările corecte:</h3>
        <ul>
          {correctAnswers.length === 0 && <li>Nu ai răspunsuri corecte.</li>}
          {correctAnswers.map((answer, index) => (
            <li key={index}>
              {answer.question} - Răspuns corect: {answer.selected}
            </li>
          ))}
        </ul>
        <p>Număr corecte: {correctAnswers.length}</p>
      </div>

      <div className="incorrect-answers">
        <h3>Întrebările greșite:</h3>
        <ul>
          {incorrectAnswers.length === 0 && <li>Nu ai răspunsuri greșite.</li>}
          {incorrectAnswers.map((answer, index) => (
            <li key={index}>
              {answer.question} - Răspuns greșit: {answer.selected}, Corect: {answer.correct}
            </li>
          ))}
        </ul>
        <p>Număr greșite: {incorrectAnswers.length}</p>
      </div>

      <button onClick={() => navigate("/")} className="back-to-home">
        Începe un nou quiz
      </button>
    </div>
  );
};

export default ResultPage;