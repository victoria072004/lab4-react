import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultPage.css";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, total, answers } = location.state || {};

  const correctAnswers = answers.filter((answer) => answer.isCorrect);
  const incorrectAnswers = answers.filter((answer) => !answer.isCorrect);

  return (
    <div className="result-container">
      <h1>Rezultatele tale</h1>
      <p>
        Scor final: {score} din {total}
      </p>

      {}
      <div className="correct-answers">
        <h3>Întrebările corecte:</h3>
        <ul>
          {correctAnswers.map((answer, index) => (
            <li key={index}>
              {answer.question} - Răspuns corect: {answer.selected}
            </li>
          ))}
        </ul>
        <p>Număr corecte: {correctAnswers.length}</p>
      </div>

      {}
      <div className="incorrect-answers">
        <h3>Întrebările greșite:</h3>
        <ul>
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
