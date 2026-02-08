import { Button } from "@mui/material";
import QuestionText from "./questions/question_text";
import QuestionRadio from "./questions/question_radio";
import QuestionCheckbox from "./questions/question_checkbox";
import QuestionMoney from "./questions/question_money";
import type { Answer, GenericQuestion } from "./questions/type";
import { useMemo } from "react";
export default function WizardSteps({
  step,
  setStep,
  onComplete,
  extraGuidance,
  setAnswer,
  questions,
}: {
  step: number;
  setStep: (step: number) => void;
  onComplete: () => void;
  extraGuidance: boolean;
  setAnswer: (questionId: number, answer: Answer) => void;
  questions: GenericQuestion[];
}) {
  function handleNext() {
    navigate(1);
  }
  function handleBack() {
    navigate(-1);
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
  function setMoneyAnswer(questionId: number, answer: string) {
    // Logic to set the answer for a specific question
    setAnswer(questionId, answer);
  }

  function isQuestionVisible(
    question: GenericQuestion,
    allQuestions: GenericQuestion[],
  ): boolean {
    if (!question.showCondition) return true;

    const { questionId, answer } = question.showCondition;

    const sourceQuestion = allQuestions.find((q) => q.id === questionId);

    if (!sourceQuestion || sourceQuestion.answer == null) {
      return false;
    }

    const given = sourceQuestion.answer;

    if (Array.isArray(given)) {
      return given.some((a) =>
        Array.isArray(answer) ? answer.includes(a) : a === answer,
      );
    }

    return Array.isArray(answer) ? answer.includes(given) : given === answer;
  }

  const questionsForCurrentStep = useMemo(() => {
    return questions
      .filter((q) => q.step === step)
      .filter((q) => isQuestionVisible(q, questions));
  }, [step, questions]);

  const isLastStep = useMemo(() => {
    const steps = questions.map((q) => q.step);
    const maxWizardStep = Math.max(...steps);
    return step === maxWizardStep;
  }, [step, questions]);

  function navigate(direction: 1 | -1) {
    const steps = questions.map((q) => q.step);
    const maxWizardStep = Math.max(...steps);

    let s = step + direction;

    while (true) {
      if (s > maxWizardStep) {
        return;
      }

      const hasVisibleQuestions = questions.some(
        (q) => q.step === s && isQuestionVisible(q, questions),
      );

      if (hasVisibleQuestions) {
        setStep(s);
        return;
      }

      s += direction;
    }
  }

  const disableNext = useMemo(() => {
    return questionsForCurrentStep.some((q) => q.answer == null);
  }, [questionsForCurrentStep]);

  return (
    <div className="wizard-steps">
      {questionsForCurrentStep.map((question) =>
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
            case "money":
              return (
                <QuestionMoney
                  key={question.id}
                  question={question}
                  useExtra={extraGuidance}
                  onAnswerChange={setMoneyAnswer}
                />
              );
            default:
              return null;
          }
        })(question as GenericQuestion),
      )}
      <div className="wizard-app__controls">
        {step > 1 && <Button onClick={handleBack}>Back</Button>}
        {isLastStep ? (
          <Button variant="contained" onClick={handleFinish}>
            Finish
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={disableNext}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
