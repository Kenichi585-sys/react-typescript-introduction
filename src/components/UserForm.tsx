import { useState } from "react";
import type {
  MentorRoleErrors,
  MentorRoleFields,
  NewMentor,
  NewStudent,
  NewUser,
  StudentRoleErrors,
  StudentRoleFields,
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

export const UserForm = ({ onSubmit, onCancel }: Props) => {
  const [role, setRole] = useState<"student" | "mentor">("student");
  const [commonFields, setCommonFields] = useState<CommonFields>({
    name: "",
    email: "",
    age: null,
    postCode: "",
    phone: "",
    url: "",
  });
  const [roleFields, setRoleFields] = useState<
    StudentRoleFields | MentorRoleFields
  >({ studyMinutes: 0, taskCode: 0, studyLangs: [], score: 0 });
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [studyLangs, setStudyLangs] = useState<string[]>([]);
  const [useLangs, setUseLangs] = useState<string[]>([]);
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
      age: commonFields.age === null ? "年齢を入力してください" : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((newError) => newError !== "")) {
      return;
    }

    if (role === "student") {
      const studentRoleFields = roleFields as StudentRoleFields;

      const newRoleErrors: StudentRoleErrors = {
        studyMinutes:
          studentRoleFields.studyMinutes === 0
            ? "勉強時間を入力してください"
            : "",
        taskCode:
          studentRoleFields.taskCode === 0 ? "課題番号を入力してください" : "",
        studyLangs: "",
        score:
          studentRoleFields.score === 0
            ? "ハピネススコアを入力してください"
            : "",
      };

      setRoleErrors(newRoleErrors);

      if (Object.values(newRoleErrors).some((error) => error !== "")) {
        return;
      }

      const newUser: NewStudent = {
        role,
        ...commonFields,
        age: commonFields.age as number,
        hobbies,
        ...studentRoleFields,
        studyLangs,
      };
      onSubmit(newUser);
    } else {
      const mentorRoleFields = roleFields as MentorRoleFields;

      const newRoleErrors: MentorRoleErrors = {
        experienceDays:
          mentorRoleFields.experienceDays === 0
            ? "実務経験月数を入力してください"
            : "",
        useLangs: "",
        availableStartCode:
          mentorRoleFields.availableStartCode === 0
            ? "担当できる課題番号（初め）を入力してください"
            : "",
        availableEndCode:
          mentorRoleFields.availableEndCode === 0
            ? "担当できる課題番号（終わり）を入力してください"
            : "",
      };

      setRoleErrors(newRoleErrors);

      if (Object.values(newRoleErrors).some((error) => error !== "")) {
        return;
      }

      const newUser: NewMentor = {
        role,
        ...commonFields,
        age: commonFields.age as number,
        hobbies,
        ...mentorRoleFields,
        useLangs,
      };
      onSubmit(newUser);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => {
            setRole("student");
            setRoleFields({
              studyMinutes: 0,
              taskCode: 0,
              studyLangs: [],
              score: 0,
            });
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
          onClick={() => {
            setRole("mentor");
            setRoleFields({
              experienceDays: 0,
              useLangs: [],
              availableStartCode: 0,
              availableEndCode: 0,
            });
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
      <div>
        <label>
          名前
          <input
            type="text"
            placeholder="例：山田太郎"
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
          {errors.name !== "" && <p>{errors.name}</p>}
        </label>
        <label>
          メールアドレス
          <input
            type="text"
            placeholder="例：a@gmail.com"
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
          {errors.email !== "" && <p>{errors.email}</p>}
        </label>
        <label>
          年齢
          <input
            type="number"
            placeholder="例：30"
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
          {errors.age !== "" && <p>{errors.age}</p>}
        </label>
        <label>
          郵便番号
          <input
            type="text"
            placeholder="例：000-0000"
            onChange={(e) =>
              setCommonFields({
                ...commonFields,
                postCode: e.target.value,
              })
            }
          />
        </label>
        <label>
          電話番号
          <input
            type="text"
            placeholder="例：08012345678"
            onChange={(e) =>
              setCommonFields({
                ...commonFields,
                phone: e.target.value,
              })
            }
          />
        </label>
        <label>
          趣味
          {hobbies.map((hobby, index) => (
            <div key={index}>
              <input
                type="text"
                value={hobby}
                placeholder="旅行"
                onChange={(e) =>
                  setHobbies(
                    hobbies.map((hobby, i) =>
                      i === index ? e.target.value : hobby,
                    ),
                  )
                }
              ></input>
              <button
                onClick={() =>
                  setHobbies(hobbies.filter((_, i) => i !== index))
                }
              >
                削除
              </button>
            </div>
          ))}
          <button onClick={() => setHobbies([...hobbies, ""])}>+追加</button>
        </label>

        <label>
          URL
          <input
            type="text"
            placeholder="例：https://xxx.com"
            onChange={(e) =>
              setCommonFields({
                ...commonFields,
                url: e.target.value,
              })
            }
          />
        </label>
      </div>
      {role === "student" && (
        <div>
          <label>
            勉強時間
            <input
              type="number"
              placeholder="例：100"
              onChange={(e) => {
                setRoleFields({
                  ...(roleFields as StudentRoleFields),
                  studyMinutes: Number(e.target.value),
                });
                setRoleErrors({
                  ...(roleErrors as StudentRoleErrors),
                  studyMinutes: "",
                });
              }}
            />
            {(roleErrors as StudentRoleErrors).studyMinutes !== "" && (
              <p>{(roleErrors as StudentRoleErrors).studyMinutes}</p>
            )}
          </label>

          <label>
            課題番号
            <input
              type="number"
              placeholder="例：101"
              onChange={(e) => {
                setRoleFields({
                  ...(roleFields as StudentRoleFields),
                  taskCode: Number(e.target.value),
                });
                setRoleErrors({
                  ...(roleErrors as StudentRoleErrors),
                  taskCode: "",
                });
              }}
            />
            {(roleErrors as StudentRoleErrors).taskCode !== "" && (
              <p>{(roleErrors as StudentRoleErrors).taskCode}</p>
            )}
          </label>

          <label>
            ハピネススコア
            <input
              type="number"
              placeholder="例：70"
              onChange={(e) => {
                setRoleFields({
                  ...(roleFields as StudentRoleFields),
                  score: Number(e.target.value),
                });
                setRoleErrors({
                  ...(roleErrors as StudentRoleErrors),
                  score: "",
                });
              }}
            />
            {(roleErrors as StudentRoleErrors).score !== "" && (
              <p>{(roleErrors as StudentRoleErrors).score}</p>
            )}
          </label>
        </div>
      )}
      {role === "mentor" && (
        <div>
          <label>
            実務経験月数
            <input
              type="number"
              placeholder="例：1000"
              onChange={(e) => {
                setRoleFields({
                  ...(roleFields as MentorRoleFields),
                  experienceDays: Number(e.target.value),
                });
                setRoleErrors({
                  ...(roleErrors as MentorRoleErrors),
                  experienceDays: "",
                });
              }}
            />
            {(roleErrors as MentorRoleErrors).experienceDays !== "" && (
              <p>{(roleErrors as MentorRoleErrors).experienceDays}</p>
            )}
          </label>
          <label>
            現場で使っている言語
            {useLangs.map((useLang, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Next.js"
                  value={useLang}
                  onChange={(e) =>
                    setUseLangs(
                      useLangs.map((useLang, i) =>
                        i === index ? e.target.value : useLang,
                      ),
                    )
                  }
                />
                <button
                  onClick={() =>
                    setUseLangs(useLangs.filter((_, i) => i !== index))
                  }
                >
                  削除
                </button>
              </div>
            ))}
            <button onClick={() => setUseLangs([...useLangs, ""])}>
              +追加
            </button>
          </label>
          <label>
            担当できる課題番号初め
            <input
              type="number"
              placeholder="101"
              onChange={(e) => {
                setRoleFields({
                  ...(roleFields as MentorRoleFields),
                  availableStartCode: Number(e.target.value),
                });
                setRoleErrors({
                  ...(roleErrors as MentorRoleErrors),
                  availableStartCode: "",
                });
              }}
            />
            {(roleErrors as MentorRoleErrors).availableStartCode !== "" && (
              <p>{(roleErrors as MentorRoleErrors).availableStartCode}</p>
            )}
          </label>
          <label>
            担当できる課題番号終わり
            <input
              type="number"
              placeholder="201"
              onChange={(e) => {
                setRoleFields({
                  ...(roleFields as MentorRoleFields),
                  availableEndCode: Number(e.target.value),
                });
                setRoleErrors({
                  ...(roleErrors as MentorRoleErrors),
                  availableEndCode: "",
                });
              }}
            />
            {(roleErrors as MentorRoleErrors).availableEndCode !== "" && (
              <p>{(roleErrors as MentorRoleErrors).availableEndCode}</p>
            )}
          </label>
        </div>
      )}
      <button onClick={handleSubmit}>送信</button>
      <button onClick={onCancel}>キャンセル</button>
    </>
  );
};
