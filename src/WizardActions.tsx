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

  setDoc(doc(db, "experiments", experimentId), payload)
    .then(() => console.log("Write resolved"))
    .catch((err) => console.error("Write error", err));
}
export { saveExperimentResult };
