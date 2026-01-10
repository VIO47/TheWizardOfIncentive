import { useState } from "react";
import WizardWelcome from "./WizardWelcome";
import WizardSteps from "./WizardSteps";
import WizardSummary from "./WizardSummary";

export default function Wizard() {
  const [step, setStep] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [extraGuidance, setExtraGuidance] = useState(false);

  function onComplete() {
    setIsDone(true);
  }

  function start() {
    setStep(1);
  }
  return (
    <div className="wizard-app">
      {isDone ? (
        <WizardSummary />
      ) : step === 0 ? (
        <WizardWelcome
          setExtraGuidance={setExtraGuidance}
          startWizard={start}
        />
      ) : (
        <WizardSteps onComplete={onComplete} extraGuidance={extraGuidance} />
      )}
    </div>
  );
}
