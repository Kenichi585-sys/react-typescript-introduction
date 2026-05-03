type BaseUser = {
  id: number;
  name: string;
  role: "student" | "mentor";
  email: string;
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
};

export type Student = BaseUser & {
  role: "student";
  studyMinutes: number;
  taskCode: number;
  studyLangs: string[];
  score: number;
};

export type Mentor = BaseUser & {
  role: "mentor";
  experienceDays: number;
  useLangs: string[];
  availableStartCode: number;
  availableEndCode: number;
};

export type User = Student | Mentor;

export type Tab = "all" | "student" | "mentor";

export type StudentSortKey = "studyMinutes" | "score";
export type MentorSortKey = "experienceDays";
export type SortKey = StudentSortKey | MentorSortKey;

export type SortOrder = "asc" | "desc";
