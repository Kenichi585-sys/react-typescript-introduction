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

  const toggleSortOrder = (current: SortOrder): SortOrder => {
    return current === "asc" ? "desc" : "asc";
  };

  const switchTab = (nextTab: Tab) => {
    setTab(nextTab);
    setSortKey(null);
    setFilterKey(null);
    setFilterWord("");
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
    const user = { ...newUser, id: crypto.randomUUID() };
    setUserList([...userList, user]);
    setIsFormOpen(false);
  };

  return (
    <div className="app">
      <div className="toolbar">
        <div className="toolbar-row">
          <span className="toolbar-label">表示</span>
          <div className="toolbar-actions">
            <button
              type="button"
              className={`btn ${tab === "all" ? "btn-active" : ""}`}
              onClick={() => switchTab("all")}
            >
              全員
            </button>
            <button
              type="button"
              className={`btn ${tab === "student" ? "btn-active" : ""}`}
              onClick={() => switchTab("student")}
            >
              生徒のみ
            </button>
            <button
              type="button"
              className={`btn ${tab === "mentor" ? "btn-active" : ""}`}
              onClick={() => switchTab("mentor")}
            >
              メンターのみ
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsFormOpen(true)}
            >
              新規作成
            </button>
          </div>
        </div>
        {(tab === "student" || tab === "mentor") && (
          <div className="toolbar-row">
            <span className="toolbar-label">並び替え</span>
            <div className="toolbar-actions">
              {tab === "student" && (
                <>
                  <button
                    type="button"
                    className={`btn ${sortKey === "studyMinutes" ? "btn-active" : ""}`}
                    onClick={() => setSortKey("studyMinutes")}
                  >
                    勉強時間
                  </button>
                  <button
                    type="button"
                    className={`btn ${sortKey === "score" ? "btn-active" : ""}`}
                    onClick={() => setSortKey("score")}
                  >
                    ハピネススコア
                  </button>
                </>
              )}
              {tab === "mentor" && (
                <button
                  type="button"
                  className={`btn ${sortKey === "experienceDays" ? "btn-active" : ""}`}
                  onClick={() => setSortKey("experienceDays")}
                >
                  実務経験月数
                </button>
              )}
              {sortKey !== null && (
                <button
                  type="button"
                  className="btn"
                  onClick={() => setSortOrder(toggleSortOrder(sortOrder))}
                >
                  {sortOrder === "asc" ? "降順" : "昇順"}
                </button>
              )}
            </div>
          </div>
        )}
        <div className="toolbar-row">
          <span className="toolbar-label">絞り込み</span>
          <div className="toolbar-actions">
            <button
              type="button"
              className={`btn ${filterKey === "hobbies" ? "btn-active" : ""}`}
              onClick={() => {
                setFilterKey("hobbies");
                setFilterWord("");
              }}
            >
              趣味
            </button>
            {tab === "student" && (
              <button
                type="button"
                className={`btn ${filterKey === "studyLangs" ? "btn-active" : ""}`}
                onClick={() => {
                  setFilterKey("studyLangs");
                  setFilterWord("");
                }}
              >
                勉強中の言語
              </button>
            )}
            {tab === "mentor" && (
              <button
                type="button"
                className={`btn ${filterKey === "useLangs" ? "btn-active" : ""}`}
                onClick={() => {
                  setFilterKey("useLangs");
                  setFilterWord("");
                }}
              >
                現場言語
              </button>
            )}
            {filterKey !== null && (
              <>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="キーワードを入力"
                  value={filterWord}
                  onChange={(e) => setFilterWord(e.target.value)}
                />
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setFilterKey(null);
                    setFilterWord("");
                  }}
                >
                  解除
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {isFormOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <UserForm
              onSubmit={handleAddUser}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="table-wrap">
        <UserTable users={result} />
      </div>
    </div>
  );
};
