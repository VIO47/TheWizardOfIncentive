import type { GenericQuestion } from "./questions/type";

export default function WizardSummary({
  questions,
}: {
  questions: GenericQuestion[];
}) {
  const answeredQuestions = questions.filter((q) => q.answer != null);
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
                  <>
                    <span key={index}>{ans}</span>
                    <span>
                      {index < question.answer!.length - 1 ? ", " : ""}
                    </span>
                  </>
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
