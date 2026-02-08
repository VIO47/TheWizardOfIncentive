import type { GenericQuestion } from "./questions/type";
import "@style/wizard-summary.scss";
export default function WizardSummary({
  questions,
  experimentId,
}: {
  questions: GenericQuestion[];
  experimentId: string | undefined;
}) {
  const answeredQuestions = questions.filter((q) => q.answer != null);
  const formLink = `https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=TVJuCSlpMECM04q0LeCIe085J_5RDp9GtrZ6J5VKIFtUMlAzSktYQ0dPNTNBT0w1UTMzRFRDOTI1Ni4u&r5e57cbd0c1c14a4493c33cf6e7213f9a=${experimentId}`;
  return (
    <div className="wizard-summary">
      <h3>
        Thank you for participating in the study! Your answer ID is{" "}
        {experimentId}
      </h3>
      <p>
        Please fill in <a href={formLink}>this form</a> to complete your
        participation.
      </p>
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
    </div>
  );
}
