import { setDoc, doc } from "firebase/firestore";
import { experimentsCollection } from "./firestore";

async function saveExperimentResult(
  experimentId: string,
  experimentType: "descriptive" | "prescriptive",
  questions: { id: number; answer?: string | string[] }[],
  startTime: Date,
) {
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

  return await setDoc(doc(experimentsCollection, experimentId), payload);
}
export { saveExperimentResult };
