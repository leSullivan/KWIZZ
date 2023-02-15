import missing from "../../assets/missing.png";
import "./question.css"

interface QuestionProps {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
  type: string;
  gameFinished: boolean;
  checkAnswered: boolean;
  toggleSelected: (id: string, answer: string) => void;
}

export default function Question(props: QuestionProps) {
  const answers = props.answers.map((answer) => {
    let className = "answer--default";

    if (props.gameFinished) {
      if (props.selectedAnswer === answer) {
        if (props.selectedAnswer === props.correctAnswer) {
          className = "answer--correct";
        } else {
          className = "answer--incorrect";
        }
      } else if (props.correctAnswer === answer) {
        className = "answer--correct";
      } else {
        className = "answer--translucent";
      }
    } else if (props.selectedAnswer === answer) {
      className = "answer--selected";
    }

    return (
      <div
        className={className}
        key={answer}
        onClick={(e) => props.toggleSelected(props.id, answer)}
      >
        {answer}
      </div>
    );
  });

  
  return (
    <section className="question">
      <div className='question--title'>
        <h4>{props.question}</h4>
        {props.selectedAnswer === null && props.checkAnswered && <img src={missing} alt="missing" className="missing-answered" />}
      </div>
      <div className="answers">{answers}</div>
    </section>
  );
}
