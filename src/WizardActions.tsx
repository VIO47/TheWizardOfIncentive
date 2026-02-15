import { setDoc, doc, getDoc } from "firebase/firestore";
import { db, experimentsCollection } from "./firestore";

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

  const x = await setDoc(doc(experimentsCollection, experimentId), payload)
    .then(() => console.log("Write resolved"))
    .catch((err) => console.error("Write error", err));
  const snap = await getDoc(doc(db, "experiments", experimentId));
  console.log("Exists?", snap.exists());
  return x;
}
export { saveExperimentResult };
