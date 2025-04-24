import React, { useState, useEffect } from "react";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setHistory(storedHistory);
  }, []);

  const handleDelete = (index) => {
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    
    localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
    
    setHistory(updatedHistory);
  };

  return (
    <div className="history-container">
      <h2>Istoricul scorurilor</h2>
      {history.length === 0 ? (
        <p>Nu există scoruri salvate în istoric.</p>
      ) : (
        <ul>
          {history.map((score, index) => (
            <li key={index} className="score-item">
              <p>{score.name} - {score.score}/{score.total} - {score.date}</p>
              <button onClick={() => handleDelete(index)} className="delete-btn">
                Șterge
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPage;
