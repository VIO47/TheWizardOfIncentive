import { debounce, TextField } from "@mui/material";
import type { QuestionTextProps } from "./type";
import { useState } from "react";
import "@style/question.scss";

export default function QuestionText({
  question,
  useExtra,
}: QuestionTextProps & { useExtra?: boolean }) {
  const [answer, setAnswer] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(e.target.value);
    debounce(() => {
      question.onAnswerChange(question.id, e.target.value);
    }, 500)();
  }

  return (
    <div className="question question-text">
      <h4 className="question__text">{question.text}</h4>
      {useExtra && question.extra && (
        <p className="question__extra"> {question.extra} </p>
      )}
      <TextField
        hiddenLabel
        value={answer}
        onChange={handleChange}
        variant="outlined"
        size="small"
        fullWidth
        multiline
        rows={question.rows || 3}
      />
    </div>
  );
}
