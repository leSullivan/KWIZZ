import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../components/game/Question";
import { nanoid } from "nanoid";
import logo from "../assets/logo.svg";
import "./gamescreen.css";

type OpentdbAPI = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type QuestionProps = {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
  type: string;
  toggleSelected: (id: string, answer: string) => void;
};

export default function GameScreen() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Array<QuestionProps> | null>();
  const [gameFinished, setGameFinished] = useState({
    checkAnswered: false,
    finished: false,
  });
  const [score, setScore] = useState(0);
  const [gameSettings, setGameSettings] = useState({
    questionAmount: 5,
  });

  const navigate = useNavigate();

  async function fetchQuestions() {
    setLoading(true);
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${gameSettings.questionAmount}`
    );
    const data = await res.json();
    console.log(data);
    if (data.response_code !== 0) {
      return;
    }
    const updatedQuestions: Array<QuestionProps> = data.results.map(
      (question: OpentdbAPI) => {
        const parser = new DOMParser();
        const answers = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];

        const decodedAnswers = answers.map((answer) => {
          const decodedAnswer = parser.parseFromString(
            `<!doctype html><body>${answer}`,
            "text/html"
          ).body.textContent;
          return decodedAnswer;
        });

        const decodedQuestion = parser.parseFromString(
          `<!doctype html><body>${question.question}`,
          "text/html"
        ).body.textContent;

        return {
          id: nanoid(),
          question: decodedQuestion,
          answers: decodedAnswers.sort(() => Math.random() - 0.5),
          correctAnswer: question.correct_answer,
          type: question.type,
          selectedAnswer: null,
        };
      }
    );
    setQuestions(updatedQuestions);
    setLoading(false);
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  function toggleSelected(id: string, answer: string) {
    if (!questions || gameFinished.finished) {
      return;
    }
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        question.selectedAnswer = answer;
      }
      return question;
    });
    setQuestions(updatedQuestions);
  }

  function checkAnswers() {
    if (!questions) {
      return;
    }
    const allAnswered = questions.every(
      (question) => question.selectedAnswer != null
    );
    if (!allAnswered) {
      setGameFinished((prev) => ({
        ...prev,
        checkAnswered: true,
      }));
      return;
    }
    questions.forEach((question) => {
      if (question.correctAnswer === question.selectedAnswer) {
        setScore((score) => score + 1);
      }
    });
    setGameFinished((prev) => ({
      ...prev,
      finished: true,
    }));
  }

  function restartGame() {
    setScore(0);
    setGameFinished({ checkAnswered: false, finished: false });
    fetchQuestions();
  }

  const questionComponents = questions
    ? questions.map((question) => {
        return (
          <Question
            key={question.id}
            id={question.id}
            question={question.question}
            answers={question.answers}
            correctAnswer={question.correctAnswer}
            selectedAnswer={question.selectedAnswer}
            type={question.type}
            gameFinished={gameFinished.finished}
            checkAnswered={gameFinished.checkAnswered}
            toggleSelected={toggleSelected}
          />
        );
      })
    : console.log("no questions");

  return loading ? (
    <img src={logo} alt='logo' className="loading--logo"/>
  ) : (
    <section className="game--screen">
      <h1>Game Screen</h1>
      <div className="questions">
        <>{questionComponents}</>
      </div>
      {gameFinished.finished && (
        <p className="score">
          Score: {score}/{gameSettings.questionAmount}
        </p>
      )}
      {gameFinished.finished ? (
        <div className="restart--options">
          <button onClick={restartGame} className="gameButton">
            Start new Round
          </button>
          <button onClick={() => navigate("/")} className="gameButton">
            Change Settings
          </button>
        </div>
      ) : (
        <button onClick={checkAnswers} className="gameButton">
          Check Answers
        </button>
      )}
    </section>
  );
}
