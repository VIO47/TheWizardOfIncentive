import { Switch, FormControlLabel, Button } from "@mui/material";
import WizardImg from "./assets/wizard.png";
import "@style/wizard-welcome.scss";
export default function WizardWelcome({
  setExtraGuidance,
  startWizard,
}: {
  setExtraGuidance: (value: boolean) => void;
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
          This interactive wizard will guide you through a series of questions
          to help you understand and optimize your incentive structures.
        </p>
        <div>
          <p>
            Are you new to this? Then the tool can provide extra guidance to
            help you get started.
          </p>

          <FormControlLabel
            control={
              <Switch onChange={(e) => setExtraGuidance(e.target.checked)} />
            }
            label="I want your help!"
          />
          <p>Ready to begin?</p>
          <Button variant="contained" onClick={startWizard}>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}
