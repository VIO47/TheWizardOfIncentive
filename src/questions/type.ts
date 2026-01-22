const QUESTION_TYPE = {
  TEXT: "text",
  CHECKBOX: "checkbox",
  RADIO: "radio",
} as const;

type QuestionType = typeof QUESTION_TYPE[keyof typeof QUESTION_TYPE];

type AnswerMap = {
  [QUESTION_TYPE.TEXT]: string;
  [QUESTION_TYPE.RADIO]: string;
  [QUESTION_TYPE.CHECKBOX]: string[];
};

type Answer = AnswerMap[keyof AnswerMap];

type BaseQuestion<TType extends QuestionType> = {
  id: number;
  type: TType;
  step: number;
  text: string;
  extra?: string;
  showCondition?: ShowCondition;
  onAnswerChange: (questionId: number, answer: AnswerMap[TType]) => void;
  other?: boolean;
  answer?: AnswerMap[TType];
};

type ShowCondition = {
  questionId: number;
  answer: string | string[];
};

type QuestionTextProps = BaseQuestion<typeof QUESTION_TYPE.TEXT> & {
  rows?: number;
};

type QuestionRadioProps = BaseQuestion<typeof QUESTION_TYPE.RADIO> & {
  options: string[];
};

type QuestionCheckboxProps = BaseQuestion<typeof QUESTION_TYPE.CHECKBOX> & {
  options: string[];
};

type GenericQuestion =
  | QuestionTextProps
  | QuestionRadioProps
  | QuestionCheckboxProps;

  type StoredAnswer = {
  questionId: number;
  answer: string | string[];
};

type ExperimentResult = {
  experimentId: string;
  experimentType: "descriptive" | "prescriptive" | "none";
  timestamp: string;
  answers: StoredAnswer[];
};


export type { GenericQuestion, QuestionTextProps, QuestionRadioProps, QuestionCheckboxProps, Answer, BaseQuestion, StoredAnswer, ExperimentResult };

export { QUESTION_TYPE };

