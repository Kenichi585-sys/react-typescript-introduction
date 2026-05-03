import { useState } from "react";
import { UserTable } from "./components/UserTable";
import { USER_LIST } from "./data";
import {
  type Mentor,
  type SortKey,
  type SortOrder,
  type Student,
  type Tab,
  type User,
} from "./types";

export const App = () => {
  const [tab, setTab] = useState<Tab>("all");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const toggleSortOrder = (current: SortOrder): SortOrder => {
    return current === "asc" ? "desc" : "asc";
  };
  let filteredUsers: User[];
  let students: Student[] = [];
  let mentors: Mentor[] = [];

  if (tab === "all") {
    filteredUsers = USER_LIST;
  } else if (tab === "student") {
    students = USER_LIST.filter(
      (user): user is Student => user.role === "student",
    );
    if (sortKey !== null) {
      students = [...students].sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortKey] - b[sortKey];
        } else {
          return b[sortKey] - a[sortKey];
        }
      });
    }
    filteredUsers = students;
  } else if (tab === "mentor") {
    mentors = USER_LIST.filter(
      (user): user is Mentor => user.role === "mentor",
    );
    if (sortKey !== null) {
      mentors = [...mentors].sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortKey] - b[sortKey];
        } else {
          return b[sortKey] - a[sortKey];
        }
      });
    }
    filteredUsers = mentors;
  }
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setTab("all");
            setSortKey(null);
          }}
        >
          全員
        </button>
        <button
          onClick={() => {
            setTab("student");
            setSortKey(null);
          }}
        >
          生徒のみ
        </button>
        <button
          onClick={() => {
            setTab("mentor");
            setSortKey(null);
          }}
        >
          メンターのみ
        </button>
      </div>
      <div>
        {tab === "student" && (
          <button onClick={() => setSortKey("studyMinutes")}>勉強時間</button>
        )}
        {tab === "student" && (
          <button onClick={() => setSortKey("score")}>ハピネススコア順</button>
        )}
        {tab === "mentor" && (
          <button onClick={() => setSortKey("experienceDays")}>
            実務経験月数
          </button>
        )}
        {tab !== "all" && sortKey !== null && (
          <button onClick={() => setSortOrder(toggleSortOrder(sortOrder))}>
            {sortOrder === "asc" ? "降順に切り替え" : "昇順に切り替え"}
          </button>
        )}
      </div>
      <div>
        <UserTable users={filteredUsers} />
      </div>
    </div>
  );
};
