import type { GenericQuestion } from "./questions/type";

export default function WizardSummary({
  questions,
}: {
  questions: GenericQuestion[];
}) {
  return (
    <div className="wizard-summary">
      <h2>Summary of your answers</h2>
      <div>
        {questions.map((question) => (
          <b>
            {question.text}: {JSON.stringify(question.answer)}
          </b>
        ))}
      </div>
    </div>
  );
}
