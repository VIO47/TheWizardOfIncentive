import type { QuestionRadioProps } from "./type.ts";
import { useState } from "react";
import "@style/question.scss";

export default function QuestionRadio({
  question,
  useExtra,
  onAnswerChange,
}: {
  question: QuestionRadioProps;
  useExtra?: boolean;
  onAnswerChange: (questionId: number, answer: string) => void;
}) {
  const [answer, setAnswer] = useState<string>("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(e.target.value);
    onAnswerChange(question.id, e.target.value);
  }
  const [showOtherInput, setShowOtherInput] = useState(false);

  return (
    <div className="question question-radio">
      <h4 className="question__text">{question.text}</h4>
      {useExtra && question.extra && (
        <p className="question__extra"> {question.extra} </p>
      )}
      <div className="question-options">
        {question.options?.map((option: string, index: number) => (
          <label key={index}>
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={answer === option}
              onChange={handleChange}
            />
            {option}
          </label>
        ))}
        {question.other && (
          <label>
            <input
              type="radio"
              name={`question-${question.id}`}
              value="other"
              checked={answer === "other"}
              onChange={(e) => {
                handleChange(e);
                setShowOtherInput(e.target.value === "other");
              }}
            />
            {"Other"}
          </label>
        )}
      </div>
      {showOtherInput && (
        <input
          type="text"
          value={answer === "other" ? answer : ""}
          onChange={(e) => {
            setAnswer(e.target.value);
            question.onAnswerChange(question.id, e.target.value);
          }}
        />
      )}
    </div>
  );
}
