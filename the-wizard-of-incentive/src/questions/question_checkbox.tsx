import { type ChangeEvent, useState } from "react";
import type { QuestionCheckboxProps } from "./type";
import "@style/question.scss";

export default function QuestionCheckbox({
  props,
  useExtra,
}: {
  props: QuestionCheckboxProps;
  useExtra?: boolean;
}) {
  const { question } = props;
  const [answer, setAnswer] = useState<string[]>([]);

  function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    const next = e.target.checked
      ? [...answer, value]
      : answer.filter((a) => a !== value);

    setAnswer(next);
    question.onAnswerChange(question.id, next);
  }

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
      </div>
    </div>
  );
}
