import { debounce, InputAdornment, OutlinedInput } from "@mui/material";
import type { QuestionMoneyProps } from "./type";
import { useState } from "react";
import "@style/question.scss";

export default function QuestionMoney({
  question,
  useExtra,
  onAnswerChange,
}: {
  question: QuestionMoneyProps;
  useExtra?: boolean;
  onAnswerChange: (questionId: number, answer: string) => void;
}) {
  const [answer, setAnswer] = useState<string>(question.answer || "");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(e.target.value);
    debounce(() => {
      onAnswerChange(question.id, e.target.value);
    }, 500)();
  }

  return (
    <div className="question question-money">
      <h4 className="question__text">{question.text}</h4>
      {useExtra && question.extra && (
        <p className="question__extra"> {question.extra} </p>
      )}
      <OutlinedInput
        id="standard-adornment-amount"
        startAdornment={<InputAdornment position="start">€</InputAdornment>}
        value={answer}
        onChange={handleChange}
        type="number"
        size="small"
      />
    </div>
  );
}
