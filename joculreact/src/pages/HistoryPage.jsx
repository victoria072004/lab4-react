import React, { useContext } from "react";
import { QuizContext } from "../context/QuizState"; 
import "../styles/HistoryPage.css";

const History = () => {
  const { history, setHistory } = useContext(QuizContext);


  const handleDelete = (index) => {
    console.log("handleDelete apelat pentru index:", index);
    try {
      const updatedHistory = history.filter((_, i) => i !== index);
      setHistory(updatedHistory);
      localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
      console.log("Istoric salvat în localStorage:", updatedHistory);
    } catch (error) {
      console.error("Eroare la ștergerea intrării din istoric:", error);
    }
  };

  return (
    <div className="history-container">
      <h2>Istoricul scorurilor</h2>
      <ul className="history-list">
        {history.length === 0 && <li>Nu există scoruri salvate.</li>}
        {history.map((entry, index) => (
          <li key={index} className="history-item">
            <span>
              {entry.name || "Anonim"} - {entry.score}/{entry.total} (
              {entry.date || "Data necunoscută"})
            </span>
            <button
              className="delete-btn"
              onClick={() => {
                console.log("Buton Șterge apăsat pentru index:", index);
                handleDelete(index);
              }}
            >
              Șterge
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;