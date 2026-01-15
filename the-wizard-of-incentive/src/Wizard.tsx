import { useState } from "react";
import WizardWelcome from "./WizardWelcome";
import WizardSteps from "./WizardSteps";
import WizardSummary from "./WizardSummary";
import type { Answer, GenericQuestion } from "./questions/type";
import questionList from "./questions/dr_content.json";

export default function Wizard() {
  const [step, setStep] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const extraGuidance = false;

  const [questions, setQuestions] = useState(() =>
    questionList.map(
      (q) =>
        ({
          ...q,
          answer: undefined as Answer | undefined,
        } as GenericQuestion)
    )
  );

  function onComplete() {
    setIsDone(true);
  }

  function start() {
    setStep(1);
  }

  function setAnswer(questionId: number, answer: Answer) {
    questions.find((q) => q.id === questionId)!.answer = answer;
    setQuestions([...questions]);
  }
  return (
    <div className="wizard-app">
      {isDone ? (
        <WizardSummary questions={questions} />
      ) : step === 0 ? (
        <WizardWelcome startWizard={start} />
      ) : (
        <WizardSteps
          onComplete={onComplete}
          extraGuidance={extraGuidance}
          questions={questions}
          setAnswer={setAnswer}
        />
      )}
    </div>
  );
}
