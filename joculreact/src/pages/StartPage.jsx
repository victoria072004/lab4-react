import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../questions.json"; 
import "../styles/StartPage.css"; 

const StartPage = () => {
  const [name, setName] = useState("");
  const [randomOrder, setRandomOrder] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState(0);
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz", {
      state: {
        name,
        questions: randomOrder ? shuffle(questions) : questions,
        timer: timePerQuestion,
      },
    });
  };

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="start-page">
      <div className="start-container">
        <h1 className="start-title">Începe Quiz-ul</h1>
        
        <div className="input-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Introdu numele"
            className="start-input"
          />
        </div>

        <div className="input-group">
          <label className="start-label">
            Ordine aleatorie?
            <input
              type="checkbox"
              checked={randomOrder}
              onChange={() => setRandomOrder((prev) => !prev)}
              className="start-checkbox"
            />
          </label>
        </div>

        <div className="input-group">
          <input
            type="number"
            value={timePerQuestion}
            onChange={(e) => setTimePerQuestion(Number(e.target.value))}
            placeholder="Timp pe întrebare (0 pentru nelimitat)"
            className="start-input"
          />
        </div>

        <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
      </div>
    </div>
  );
};

export default StartPage;
