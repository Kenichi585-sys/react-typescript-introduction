import type { Mentor, Student } from "./types";

export const getAvailableMentors = (
  student: Student,
  mentors: Mentor[],
): string[] => {
  return mentors
    .filter(
      (mentor) =>
        mentor.availableStartCode <= student.taskCode &&
        student.taskCode <= mentor.availableEndCode,
    )
    .map((mentor) => mentor.name);
};

export const getAvailableStudents = (
  students: Student[],
  mentor: Mentor,
): string[] => {
  return students
    .filter(
      (student) =>
        mentor.availableStartCode <= student.taskCode &&
        student.taskCode <= mentor.availableEndCode,
    )
    .map((student) => student.name);
};
