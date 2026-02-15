import { db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";

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

  try {
    await setDoc(doc(db, "experiments", experimentId), payload);
    console.log("Done saving experiment result:", payload);
  } catch (e) {
    console.error(e);
  }
}
export { saveExperimentResult };
