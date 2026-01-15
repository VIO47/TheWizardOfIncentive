import { Button } from "@mui/material";
import QuestionText from "./questions/question_text";
import QuestionRadio from "./questions/question_radio";
import QuestionCheckbox from "./questions/question_checkbox";
import type { Answer, GenericQuestion } from "./questions/type";
export default function WizardSteps({
  onComplete,
  extraGuidance,
  setAnswer,
  questions,
}: {
  onComplete: () => void;
  extraGuidance: boolean;
  setAnswer: (questionId: number, answer: Answer) => void;
  questions: GenericQuestion[];
}) {
  function handleNext() {
    // Logic to handle moving to the next step
  }
  function handleBack() {
    // Logic to handle moving to the previous step
  }

  function handleFinish() {
    onComplete();
  }
  function setTextAnswer(questionId: number, answer: string) {
    // Logic to set the answer for a specific question
    setAnswer(questionId, answer);
  }
  function setRadioAnswer(questionId: number, answer: string) {
    // Logic to set the answer for a specific question
    setAnswer(questionId, answer);
  }
  function setCheckboxAnswer(questionId: number, answer: string[]) {
    // Logic to set the answer for a specific question
    setAnswer(questionId, answer);
  }
  return (
    <div className="wizard-steps">
      {questions.map((question) =>
        ((question) => {
          switch (question.type) {
            case "text":
              return (
                <QuestionText
                  key={question.id}
                  question={question}
                  useExtra={extraGuidance}
                  onAnswerChange={setTextAnswer}
                />
              );
            case "radio":
              return (
                <QuestionRadio
                  key={question.id}
                  question={question}
                  useExtra={extraGuidance}
                  onAnswerChange={setRadioAnswer}
                />
              );
            case "checkbox":
              return (
                <QuestionCheckbox
                  key={question.id}
                  question={question}
                  useExtra={extraGuidance}
                  onAnswerChange={setCheckboxAnswer}
                />
              );
            default:
              return null;
          }
        })(question as GenericQuestion)
      )}
      <Button onClick={handleBack}>Back</Button>
      <Button variant="contained" onClick={handleNext}>
        Next
      </Button>
      <Button variant="contained" onClick={handleFinish}>
        Finish
      </Button>
    </div>
  );
}
