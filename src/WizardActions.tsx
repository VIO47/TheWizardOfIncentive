import { db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

async function saveExperimentResult(
  experimentType: "descriptive" | "prescriptive",
  questions: { id: number; answer?: string | string[] }[]
) {
  const experimentRunId = uuidv4();
  const experimentId = uuidv4();
  const payload = {
    experimentId,
    experimentType,
    timestamp: new Date().toISOString(),
    answers: questions
      .filter((q) => q.answer !== undefined)
      .map((q) => ({
        questionId: q.id,
        answer: q.answer,
      })),
  };

  await setDoc(doc(db, "experiments", experimentRunId), payload);
}
export { saveExperimentResult };
