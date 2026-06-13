import { useState } from "react";
import { Toolbar } from "./components/Toolbar";
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

  const switchTab = (nextTab: Tab) => {
    setTab(nextTab);
    setSortKey(null);
    setFilterKey(null);
    setFilterWord("");
  };

  const handleToggleSortOrder = () => {
    setSortOrder((current) => (current === "asc" ? "desc" : "asc"));
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
      <Toolbar
        tab={tab}
        sortKey={sortKey}
        sortOrder={sortOrder}
        filterKey={filterKey}
        filterWord={filterWord}
        onTabChange={switchTab}
        onSortKeyChange={setSortKey}
        onToggleSortOrder={handleToggleSortOrder}
        onFilterKeySelect={(key) => {
          setFilterKey(key);
          setFilterWord("");
        }}
        onFilterWordChange={setFilterWord}
        onClearFilter={() => {
          setFilterKey(null);
          setFilterWord("");
        }}
        onOpenForm={() => setIsFormOpen(true)}
      />

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
