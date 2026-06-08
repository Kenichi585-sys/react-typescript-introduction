import { useState } from "react";
import type {
  MentorRoleErrors,
  MentorRoleFields,
  NewMentor,
  NewStudent,
  NewUser,
  StudentRoleErrors,
  StudentRoleFields,
  UserRole,
} from "../types";

type Props = {
  onSubmit: (newUser: NewUser) => void;
  onCancel: () => void;
};

type CommonFields = {
  name: string;
  email: string;
  age: number | null;
  postCode: string;
  phone: string;
  url: string;
};

type ListFieldItem = {
  id: string;
  value: string;
};

const createListFieldItem = (value = ""): ListFieldItem => ({
  id: crypto.randomUUID(),
  value,
});

const toListFieldValues = (items: ListFieldItem[]): string[] =>
  items.map((item) => item.value);

const FieldError = ({ message }: { message: string }) => (
  <p className="field-error">{message || "\u00A0"}</p>
);

const getAgeError = (age: number | null): string => {
  if (age === null) {
    return "年齢を入力してください";
  }
  if (age < 0) {
    return "0以上の数を入力してください";
  }
  return "";
};

const getPositiveNumberError = (
  value: number,
  emptyMessage: string,
): string => {
  if (value === 0) {
    return emptyMessage;
  }
  if (value < 0) {
    return "0以上の数を入力してください";
  }
  return "";
};

export const UserForm = ({ onSubmit, onCancel }: Props) => {
  const [role, setRole] = useState<UserRole>("student");
  const [commonFields, setCommonFields] = useState<CommonFields>({
    name: "",
    email: "",
    age: null,
    postCode: "",
    phone: "",
    url: "",
  });
  const [studentFields, setStudentFields] = useState<StudentRoleFields>({
    studyMinutes: 0,
    taskCode: 0,
    studyLangs: [],
    score: 0,
  });
  const [mentorFields, setMentorFields] = useState<MentorRoleFields>({
    experienceDays: 0,
    useLangs: [],
    availableStartCode: 0,
    availableEndCode: 0,
  });
  const [hobbies, setHobbies] = useState<ListFieldItem[]>([]);
  const [studyLangs, setStudyLangs] = useState<ListFieldItem[]>([]);
  const [useLangs, setUseLangs] = useState<ListFieldItem[]>([]);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [roleErrors, setRoleErrors] = useState<
    StudentRoleErrors | MentorRoleErrors
  >({ studyMinutes: "", taskCode: "", studyLangs: "", score: "" });

  const handleSubmit = () => {
    const newErrors = {
      name: commonFields.name === "" ? "名前を入力してください" : "",
      email: commonFields.email === "" ? "Eメールを入力してください" : "",
      age: getAgeError(commonFields.age),
    };

    const newRoleErrors: StudentRoleErrors | MentorRoleErrors =
      role === "student"
        ? {
            studyMinutes: getPositiveNumberError(
              studentFields.studyMinutes,
              "勉強時間を入力してください",
            ),
            taskCode: getPositiveNumberError(
              studentFields.taskCode,
              "課題番号を入力してください",
            ),
            studyLangs:
              studyLangs.length === 0 ||
              !studyLangs.some((item) => item.value !== "")
                ? "勉強中の言語を入力してください"
                : "",
            score: getPositiveNumberError(
              studentFields.score,
              "ハピネススコアを入力してください",
            ),
          }
        : {
            experienceDays: getPositiveNumberError(
              mentorFields.experienceDays,
              "実務経験月数を入力してください",
            ),
            useLangs:
              useLangs.length === 0 ||
              !useLangs.some((item) => item.value !== "")
                ? "現場で使っている言語を入力してください"
                : "",
            availableStartCode: getPositiveNumberError(
              mentorFields.availableStartCode,
              "担当できる課題番号（初め）を入力してください",
            ),
            availableEndCode: getPositiveNumberError(
              mentorFields.availableEndCode,
              "担当できる課題番号（終わり）を入力してください",
            ),
          };

    setErrors(newErrors);
    setRoleErrors(newRoleErrors);

    const hasErrors =
      Object.values(newErrors).some((error) => error !== "") ||
      Object.values(newRoleErrors).some((error) => error !== "");

    if (hasErrors) {
      return;
    }

    if (role === "student") {
      const newUser: NewStudent = {
        role,
        ...commonFields,
        age: commonFields.age as number,
        hobbies: toListFieldValues(hobbies),
        ...studentFields,
        studyLangs: toListFieldValues(studyLangs),
      };
      onSubmit(newUser);
    } else {
      const newUser: NewMentor = {
        role,
        ...commonFields,
        age: commonFields.age as number,
        hobbies: toListFieldValues(hobbies),
        ...mentorFields,
        useLangs: toListFieldValues(useLangs),
      };
      onSubmit(newUser);
    }
  };

  const studentRoleErrors = roleErrors as StudentRoleErrors;
  const mentorRoleErrors = roleErrors as MentorRoleErrors;

  return (
    <div className="form-panel">
      <div className="form-header">
        <h2>新規ユーザー作成</h2>
        <div className="role-toggle">
          <button
            type="button"
            className={`btn ${role === "student" ? "btn-active" : ""}`}
            onClick={() => {
              setRole("student");
              setRoleErrors({
                studyMinutes: "",
                taskCode: "",
                studyLangs: "",
                score: "",
              });
            }}
          >
            生徒
          </button>
          <button
            type="button"
            className={`btn ${role === "mentor" ? "btn-active" : ""}`}
            onClick={() => {
              setRole("mentor");
              setRoleErrors({
                experienceDays: "",
                useLangs: "",
                availableStartCode: "",
                availableEndCode: "",
              });
            }}
          >
            メンター
          </button>
        </div>
      </div>

      <div className="form-body">
        <section className="form-section">
          <h3>基本情報（必須）</h3>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">名前</label>
              <input
                id="name"
                type="text"
                placeholder="例：山田太郎"
                value={commonFields.name}
                onChange={(e) => {
                  setCommonFields({
                    ...commonFields,
                    name: e.target.value,
                  });
                  setErrors({
                    ...errors,
                    name: "",
                  });
                }}
              />
              <FieldError message={errors.name} />
            </div>
            <div className="form-field">
              <label htmlFor="email">メールアドレス</label>
              <input
                id="email"
                type="text"
                placeholder="例：a@gmail.com"
                value={commonFields.email}
                onChange={(e) => {
                  setCommonFields({
                    ...commonFields,
                    email: e.target.value,
                  });
                  setErrors({
                    ...errors,
                    email: "",
                  });
                }}
              />
              <FieldError message={errors.email} />
            </div>
            <div className="form-field">
              <label htmlFor="age">年齢</label>
              <input
                id="age"
                type="number"
                placeholder="例：30"
                value={commonFields.age ?? ""}
                onChange={(e) => {
                  setCommonFields({
                    ...commonFields,
                    age: e.target.value === "" ? null : Number(e.target.value),
                  });
                  setErrors({
                    ...errors,
                    age: "",
                  });
                }}
              />
              <FieldError message={errors.age} />
            </div>
          </div>
        </section>

        <details className="form-optional">
          <summary>任意項目（郵便番号・電話・趣味・URL）</summary>
          <div className="form-optional-body">
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="postCode">郵便番号</label>
                <input
                  id="postCode"
                  type="text"
                  placeholder="例：000-0000"
                  value={commonFields.postCode}
                  onChange={(e) =>
                    setCommonFields({
                      ...commonFields,
                      postCode: e.target.value,
                    })
                  }
                />
                <FieldError message="" />
              </div>
              <div className="form-field">
                <label htmlFor="phone">電話番号</label>
                <input
                  id="phone"
                  type="text"
                  placeholder="例：08012345678"
                  value={commonFields.phone}
                  onChange={(e) =>
                    setCommonFields({
                      ...commonFields,
                      phone: e.target.value,
                    })
                  }
                />
                <FieldError message="" />
              </div>
              <div className="form-field form-field-full">
                <label>趣味</label>
                <div className="list-field-rows">
                  {hobbies.map((hobby) => (
                    <div key={hobby.id} className="list-field-row">
                      <input
                        type="text"
                        value={hobby.value}
                        placeholder="旅行"
                        onChange={(e) =>
                          setHobbies(
                            hobbies.map((item) =>
                              item.id === hobby.id
                                ? { ...item, value: e.target.value }
                                : item,
                            ),
                          )
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() =>
                          setHobbies(
                            hobbies.filter((item) => item.id !== hobby.id),
                          )
                        }
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() =>
                      setHobbies([...hobbies, createListFieldItem()])
                    }
                  >
                    + 追加
                  </button>
                </div>
                <FieldError message="" />
              </div>
              <div className="form-field form-field-full">
                <label htmlFor="url">URL</label>
                <input
                  id="url"
                  type="text"
                  placeholder="例：https://xxx.com"
                  value={commonFields.url}
                  onChange={(e) =>
                    setCommonFields({
                      ...commonFields,
                      url: e.target.value,
                    })
                  }
                />
                <FieldError message="" />
              </div>
            </div>
          </div>
        </details>

        {role === "student" && (
          <section className="form-section">
            <h3>生徒情報（必須）</h3>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="studyMinutes">勉強時間</label>
                <input
                  id="studyMinutes"
                  type="number"
                  placeholder="例：100"
                  value={
                    studentFields.studyMinutes === 0
                      ? ""
                      : studentFields.studyMinutes
                  }
                  onChange={(e) => {
                    setStudentFields({
                      ...studentFields,
                      studyMinutes: Number(e.target.value),
                    });
                    setRoleErrors({
                      ...studentRoleErrors,
                      studyMinutes: "",
                    });
                  }}
                />
                <FieldError message={studentRoleErrors.studyMinutes} />
              </div>
              <div className="form-field">
                <label htmlFor="taskCode">課題番号</label>
                <input
                  id="taskCode"
                  type="number"
                  placeholder="例：101"
                  value={
                    studentFields.taskCode === 0 ? "" : studentFields.taskCode
                  }
                  onChange={(e) => {
                    setStudentFields({
                      ...studentFields,
                      taskCode: Number(e.target.value),
                    });
                    setRoleErrors({
                      ...studentRoleErrors,
                      taskCode: "",
                    });
                  }}
                />
                <FieldError message={studentRoleErrors.taskCode} />
              </div>
              <div className="form-field">
                <label htmlFor="score">ハピネススコア</label>
                <input
                  id="score"
                  type="number"
                  placeholder="例：70"
                  value={studentFields.score === 0 ? "" : studentFields.score}
                  onChange={(e) => {
                    setStudentFields({
                      ...studentFields,
                      score: Number(e.target.value),
                    });
                    setRoleErrors({
                      ...studentRoleErrors,
                      score: "",
                    });
                  }}
                />
                <FieldError message={studentRoleErrors.score} />
              </div>
              <div className="form-field form-field-full">
                <label>勉強中の言語</label>
                <div className="list-field-rows">
                  {studyLangs.map((studyLang) => (
                    <div key={studyLang.id} className="list-field-row">
                      <input
                        type="text"
                        placeholder="Rails"
                        value={studyLang.value}
                        onChange={(e) => {
                          setStudyLangs(
                            studyLangs.map((item) =>
                              item.id === studyLang.id
                                ? { ...item, value: e.target.value }
                                : item,
                            ),
                          );
                          setRoleErrors({
                            ...studentRoleErrors,
                            studyLangs: "",
                          });
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() =>
                          setStudyLangs(
                            studyLangs.filter(
                              (item) => item.id !== studyLang.id,
                            ),
                          )
                        }
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() =>
                      setStudyLangs([...studyLangs, createListFieldItem()])
                    }
                  >
                    + 追加
                  </button>
                </div>
                <FieldError message={studentRoleErrors.studyLangs} />
              </div>
            </div>
          </section>
        )}

        {role === "mentor" && (
          <section className="form-section">
            <h3>メンター情報（必須）</h3>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="experienceDays">実務経験月数</label>
                <input
                  id="experienceDays"
                  type="number"
                  placeholder="例：1000"
                  value={
                    mentorFields.experienceDays === 0
                      ? ""
                      : mentorFields.experienceDays
                  }
                  onChange={(e) => {
                    setMentorFields({
                      ...mentorFields,
                      experienceDays: Number(e.target.value),
                    });
                    setRoleErrors({
                      ...mentorRoleErrors,
                      experienceDays: "",
                    });
                  }}
                />
                <FieldError message={mentorRoleErrors.experienceDays} />
              </div>
              <div className="form-field">
                <label htmlFor="availableStartCode">担当課題（初め）</label>
                <input
                  id="availableStartCode"
                  type="number"
                  placeholder="101"
                  value={
                    mentorFields.availableStartCode === 0
                      ? ""
                      : mentorFields.availableStartCode
                  }
                  onChange={(e) => {
                    setMentorFields({
                      ...mentorFields,
                      availableStartCode: Number(e.target.value),
                    });
                    setRoleErrors({
                      ...mentorRoleErrors,
                      availableStartCode: "",
                    });
                  }}
                />
                <FieldError message={mentorRoleErrors.availableStartCode} />
              </div>
              <div className="form-field">
                <label htmlFor="availableEndCode">担当課題（終わり）</label>
                <input
                  id="availableEndCode"
                  type="number"
                  placeholder="201"
                  value={
                    mentorFields.availableEndCode === 0
                      ? ""
                      : mentorFields.availableEndCode
                  }
                  onChange={(e) => {
                    setMentorFields({
                      ...mentorFields,
                      availableEndCode: Number(e.target.value),
                    });
                    setRoleErrors({
                      ...mentorRoleErrors,
                      availableEndCode: "",
                    });
                  }}
                />
                <FieldError message={mentorRoleErrors.availableEndCode} />
              </div>
              <div className="form-field form-field-full">
                <label>現場で使っている言語</label>
                <div className="list-field-rows">
                  {useLangs.map((useLang) => (
                    <div key={useLang.id} className="list-field-row">
                      <input
                        type="text"
                        placeholder="Next.js"
                        value={useLang.value}
                        onChange={(e) => {
                          setUseLangs(
                            useLangs.map((item) =>
                              item.id === useLang.id
                                ? { ...item, value: e.target.value }
                                : item,
                            ),
                          );
                          setRoleErrors({
                            ...mentorRoleErrors,
                            useLangs: "",
                          });
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() =>
                          setUseLangs(
                            useLangs.filter((item) => item.id !== useLang.id),
                          )
                        }
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() =>
                      setUseLangs([...useLangs, createListFieldItem()])
                    }
                  >
                    + 追加
                  </button>
                </div>
                <FieldError message={mentorRoleErrors.useLangs} />
              </div>
            </div>
          </section>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="btn" onClick={onCancel}>
          キャンセル
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          送信
        </button>
      </div>
    </div>
  );
};
