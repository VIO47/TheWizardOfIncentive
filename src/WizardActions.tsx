import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

async function saveExperimentResult(
  experimentType: "descriptive" | "prescriptive",
  questions: { id: number; answer?: string | string[] }[],
  startTime: Date,
) {
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

  try {
    await addDoc(collection(db, "experiments"), payload);
  } catch (e) {
    console.error(e);
  }

  return experimentId;
}
export { saveExperimentResult };
