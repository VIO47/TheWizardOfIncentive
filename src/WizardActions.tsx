import { db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

async function saveExperimentResult(
  experimentType: "descriptive" | "prescriptive",
  questions: { id: number; answer?: string | string[] }[],
  startTime: Date,
) {
  const experimentRunId = uuidv4();
  const experimentId = uuidv4();
  const payload = {
    experimentId,
    experimentType,
    startTime,
    endTime: new Date(),
    answers: questions.map((q) => ({
      questionId: q.id,
      answer: q.answer || "",
    })),
  };

  console.log("Saving experiment result:", payload);
  await setDoc(doc(db, "experiments", experimentRunId), payload);
  return experimentId;
}
export { saveExperimentResult };
