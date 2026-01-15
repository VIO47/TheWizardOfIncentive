import { type ChangeEvent, useState } from "react";
import type { QuestionCheckboxProps } from "./type";
import "@style/question.scss";

export default function QuestionCheckbox({
  question,
  useExtra,
  onAnswerChange,
}: {
  question: QuestionCheckboxProps;
  useExtra?: boolean;
  onAnswerChange: (questionId: number, answer: string[]) => void;
}) {
  const [answer, setAnswer] = useState<string[]>([]);

  function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    const next = e.target.checked
      ? [...answer, value]
      : answer.filter((a) => a !== value);

    setAnswer(next);
    onAnswerChange(question.id, next);
  }

  function handleOtherChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const checked = e.target.checked;

    let next: string[];
    if (checked) {
      next = [...answer, value];
    } else {
      next = answer.filter((a) => a !== value);
    }
    setAnswer(next);
    onAnswerChange(question.id, next);
  }
  const [showOtherInput, setShowOtherInput] = useState(false);

  return (
    <div className="question question-checkbox">
      <h4 className="question__text">{question.text}</h4>
      {useExtra && question.extra && (
        <p className="question__extra"> {question.extra} </p>
      )}
      <div className="question-options">
        {question.options?.map((option: string, index: number) => (
          <label key={index}>
            <input
              type="checkbox"
              value={option}
              checked={answer.includes(option)}
              onChange={handleCheckbox}
            />
            {option}
          </label>
        ))}
        {question.other && (
          <label>
            <input
              type="checkbox"
              name={`question-${question.id}`}
              value="other"
              onChange={(e) => {
                handleCheckbox(e);
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
          value={answer.includes("other") ? answer : ""}
          onChange={(e) => {
            handleOtherChange(e);
          }}
        />
      )}
    </div>
  );
}
