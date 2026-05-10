export type BaseUser = {
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

export type NewStudent = Omit<Student, "id">;
export type NewMentor = Omit<Mentor, "id">;
export type NewUser = NewStudent | NewMentor;

export type StudentRoleFields = Omit<NewStudent, keyof BaseUser>;
export type MentorRoleFields = Omit<NewMentor, keyof BaseUser>;

export type FilterKey = "hobbies" | "studyLangs" | "useLangs";
