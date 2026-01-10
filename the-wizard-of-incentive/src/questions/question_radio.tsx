import type { QuestionRadioProps } from "./type.ts";
import { useState } from "react";
import "@style/question.scss";

export default function QuestionRadio({
  props,
  useExtra,
}: {
  props: QuestionRadioProps;
  useExtra?: boolean;
}) {
  const { question } = props;
  const [answer, setAnswer] = useState<string>("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(e.target.value);
    question.onAnswerChange(question.id, e.target.value);
  }

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
      </div>
    </div>
  );
}
