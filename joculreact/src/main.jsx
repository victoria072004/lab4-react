import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QuizProvider } from "./context/QuizProvider";
import "./index.css";
import "./assets/theme.css";
import "./styles/QuizPage.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);