import { useState } from "react";
import type { GenericQuestion } from "./questions/type";
import { debounce, TextField, Button } from "@mui/material";
import { saveExperimentResult } from "./WizardActions";
import "@style/wizard-summary.scss";
import CelebrationIcon from "@mui/icons-material/Celebration";

export default function WizardSummary({
  questions,
  extraGuidance,
}: {
  questions: GenericQuestion[];
  extraGuidance: boolean;
}) {
  const answeredQuestions = questions.filter((q) => q.answer != null);
  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [finished, setFinished] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
    debounce(() => {}, 500)();
  }

  function handleFinish() {
    saveExperimentResult(
      extraGuidance ? "prescriptive" : "descriptive",
      questions.map((q) => ({ id: q.id, answer: q.answer })),
      description
    );
    setFinished(true);
  }

  return (
    <div className="wizard-summary">
      <h3>Summary of your answers</h3>

      <div>
        {answeredQuestions.map((question) => (
          <div key={question.id}>
            <b>{question.text}</b>

            {Array.isArray(question.answer) && (
              <p>
                {question.answer.map((ans, index) => (
                  <span key={index}>
                    {ans}
                    {index < question.answer!.length - 1 && ", "}
                  </span>
                ))}
              </p>
            )}

            {typeof question.answer === "string" && <p>{question.answer}</p>}
          </div>
        ))}
      </div>

      {showDescription ? (
        <>
          <hr />

          {finished ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div>
                <h3>Thank you for completing the study!</h3>
                <p>Your responses have been recorded anonymously.</p>
              </div>

              <CelebrationIcon fontSize="large" style={{ color: "#4caf50" }} />
            </div>
          ) : (
            <div>
              <h3>
                Now write a description of the incentive structure you have
                designed.
              </h3>

              <TextField
                hiddenLabel
                value={description}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={6}
              />

              <Button
                variant="contained"
                onClick={handleFinish}
                style={{ marginTop: "10px" }}
              >
                Finish
              </Button>
            </div>
          )}
        </>
      ) : (
        <Button variant="contained" onClick={() => setShowDescription(true)}>
          Next
        </Button>
      )}
    </div>
  );
}
