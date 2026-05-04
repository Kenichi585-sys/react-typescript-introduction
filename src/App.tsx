import { useState } from "react";
import { UserTable } from "./components/UserTable";
import { USER_LIST } from "./data";
import {
  type Mentor,
  type NewUser,
  type SortKey,
  type SortOrder,
  type Student,
  type Tab,
  type User,
} from "./types";
import { UserForm } from "./components/UserForm";

export const App = () => {
  const [tab, setTab] = useState<Tab>("all");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [userList, setUserList] = useState<User[]>(USER_LIST);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  const handleAddUser = (newUser: NewUser) => {
    if (newUser.role === "student") {
      const id = userList.length + 1;
      const student: Student = { ...newUser, id };
      setUserList([...userList, student]);
      setIsFormOpen(false);
    } else if (newUser.role === "mentor") {
      const id = userList.length + 1;
      const mentor: Mentor = { ...newUser, id };
      setUserList([...userList, mentor]);
      setIsFormOpen(false);
    }
  };

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
        <button onClick={() => setIsFormOpen(true)}>新規作成</button>
        {isFormOpen && (
          <UserForm
            onSubmit={handleAddUser}
            onCancel={() => setIsFormOpen(false)}
          />
        )}
      </div>
      <div>
        <UserTable users={filteredUsers} />
      </div>
    </div>
  );
};
