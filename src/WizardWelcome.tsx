import { Button } from "@mui/material";
import WizardImg from "./assets/wizard.png";
import "@style/wizard-welcome.scss";
export default function WizardWelcome({
  startWizard,
}: {
  startWizard: () => void;
}) {
  return (
    <div className="wizard-welcome">
      <div className="wizard-welcome__icon">
        <img src={WizardImg} alt="Wizard Icon" />
      </div>
      <div className="wizard-welcome__text">
        <h3>Welcome to The Wizard of Incentive!</h3>
        <p>
          Designing monetary incentives for crowdsourcing tasks can involve many
          decisions, often without clear guidelines or reference points. This
          tool is intended to support you during this process by making the key
          elements of incentive design more visible and easier to reflect on.
        </p>
        <p>
          By guiding you through a series of structured questions, the tool
          helps you think through how and why you compensate workers, whether
          you are designing an incentive scheme from scratch or reviewing an
          existing one.
        </p>
        <div>
          <p>Ready to begin?</p>
          <Button variant="contained" onClick={startWizard}>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}
