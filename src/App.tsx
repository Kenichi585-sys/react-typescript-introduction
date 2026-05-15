import { useState } from "react";
import { UserTable } from "./components/UserTable";
import { USER_LIST } from "./data";
import {
  type FilterKey,
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
  const [filterKey, setFilterKey] = useState<FilterKey | null>(null);
  const [filterWord, setFilterWord] = useState<string>("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    age: "",
  });

  const toggleSortOrder = (current: SortOrder): SortOrder => {
    return current === "asc" ? "desc" : "asc";
  };

  let result: User[] = userList;
  if (tab === "student") {
    result = userList.filter(
      (user): user is Student => user.role === "student",
    );
  } else if (tab === "mentor") {
    result = userList.filter((user): user is Mentor => user.role === "mentor");
  }

  if (sortKey !== null) {
    result = [...result].sort((a, b) =>
      sortOrder === "asc"
        ? (a as any)[sortKey] - (b as any)[sortKey]
        : (b as any)[sortKey] - (a as any)[sortKey],
    );
  }

  if (filterWord !== "") {
    if (filterKey === "hobbies") {
      result = result.filter((user) =>
        user.hobbies.some((hobby) =>
          hobby.toLowerCase().includes(filterWord.toLowerCase()),
        ),
      );
    } else if (filterKey === "studyLangs") {
      result = result.filter((user) => {
        if (user.role !== "student") return false;
        return user.studyLangs.some((lang) =>
          lang.toLowerCase().includes(filterWord.toLowerCase()),
        );
      });
    } else if (filterKey === "useLangs") {
      result = result.filter((user) => {
        if (user.role !== "mentor") return false;
        return user.useLangs.some((lang) =>
          lang.toLowerCase().includes(filterWord.toLowerCase()),
        );
      });
    }
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
        {sortKey !== null && (
          <button onClick={() => setSortOrder(toggleSortOrder(sortOrder))}>
            {sortOrder === "asc" ? "降順に切り替え" : "昇順に切り替え"}
          </button>
        )}
      </div>
      <div>
        <button onClick={() => setFilterKey("hobbies")}>
          「趣味」でフィルター
        </button>
        {tab === "student" && (
          <button onClick={() => setFilterKey("studyLangs")}>
            「勉強中の言語」でフィルター
          </button>
        )}
        {tab === "mentor" && (
          <button onClick={() => setFilterKey("useLangs")}>
            「現場で使っている言語」でフィルター
          </button>
        )}
        {filterKey !== null && (
          <>
            <input
              type="text"
              onChange={(e) => setFilterWord(e.target.value)}
            />
            <button
              onClick={() => {
                setFilterKey(null);
                setFilterWord("");
              }}
            >
              キャンセル
            </button>
          </>
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
        <UserTable users={result} />
      </div>
    </div>
  );
};
