import { useMemo, useState } from "react";
import WizardWelcome from "./WizardWelcome";
import WizardSteps from "./WizardSteps";
import WizardSummary from "./WizardSummary";
import type { Answer, GenericQuestion } from "./questions/type";
import questionList from "./questions/content.json";

export default function Wizard() {
  const [step, setStep] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const version = useQueryParam("ver");

  const extraGuidance = useMemo(() => {
    return version == "dr";
  }, [version]);

  function useQueryParam(name: string) {
    return new URLSearchParams(window.location.search).get(name);
  }

  const [questions, setQuestions] = useState(() =>
    questionList.map(
      (q) =>
        ({
          ...q,
          answer: undefined as Answer | undefined,
        }) as GenericQuestion
    )
  );

  function onComplete() {
    setIsDone(true);
  }

  function start() {
    setStep(1);
  }

  function setAnswer(questionId: number, answer: Answer) {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== questionId) return q;
        // Ensure answer type matches question type
        if (q.type === "text" && typeof answer === "string") {
          return { ...q, answer };
        }
        if (q.type === "radio" && typeof answer === "string") {
          return { ...q, answer };
        }
        if (q.type === "checkbox" && Array.isArray(answer)) {
          return { ...q, answer };
        }
        // fallback: do not update if types mismatch
        return q;
      })
    );
  }

  return (
    <div className="wizard-app">
      {isDone ? (
        <WizardSummary questions={questions} />
      ) : step === 0 ? (
        <WizardWelcome startWizard={start} />
      ) : (
        <WizardSteps
          step={step}
          setStep={setStep}
          onComplete={onComplete}
          extraGuidance={extraGuidance}
          questions={questions}
          setAnswer={setAnswer}
        />
      )}
    </div>
  );
}
