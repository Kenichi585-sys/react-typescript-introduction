import { useState } from "react";
import type {
  MentorRoleFields,
  NewMentor,
  NewStudent,
  NewUser,
  StudentRoleFields,
} from "../types";

type Props = {
  onSubmit: (newUser: NewUser) => void;
  onCancel: () => void;
};

export const UserForm = ({ onSubmit, onCancel }: Props) => {
  const [role, setRole] = useState<"student" | "mentor">("student");
  const [commonFields, setCommonFields] = useState({
    name: "",
    email: "",
    age: 0,
    postCode: "",
    phone: "",
    hobbies: [],
    url: "",
  });
  const [roleFields, setRoleFields] = useState<
    StudentRoleFields | MentorRoleFields
  >({ studyMinutes: 0, taskCode: 0, studyLangs: [], score: 0 });
  const [hobbiesInput, setHobbiesInput] = useState("");
  const [studyLangsInput, setStudyLangsInput] = useState("");
  const [useLangsInput, setUseLangsInput] = useState("");

  const handleSubmit = () => {
    if (role === "student") {
      const newUser: NewStudent = {
        role,
        ...commonFields,
        hobbies: hobbiesInput.split(","),
        ...(roleFields as StudentRoleFields),
        studyLangs: studyLangsInput.split(","),
      };
      onSubmit(newUser);
    } else {
      const newUser: NewMentor = {
        role,
        ...commonFields,
        hobbies: hobbiesInput.split(","),
        ...(roleFields as MentorRoleFields),
        useLangs: useLangsInput.split(","),
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
            onChange={(e) =>
              setCommonFields({
                ...commonFields,
                name: e.target.value,
              })
            }
          />
        </label>
        <label>
          メールアドレス
          <input
            type="text"
            placeholder="例：a@gmail.com"
            onChange={(e) =>
              setCommonFields({
                ...commonFields,
                email: e.target.value,
              })
            }
          />
        </label>
        <label>
          年齢
          <input
            type="number"
            placeholder="例：30"
            onChange={(e) =>
              setCommonFields({
                ...commonFields,
                age: Number(e.target.value),
              })
            }
          />
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
          <input
            type="text"
            placeholder="例：旅行 サッカー"
            onChange={(e) => setHobbiesInput(e.target.value)}
          />
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
              onChange={(e) =>
                setRoleFields({
                  ...roleFields,
                  studyMinutes: Number(e.target.value),
                })
              }
            />
          </label>
          <label>
            課題番号
            <input
              type="number"
              placeholder="例：101"
              onChange={(e) =>
                setRoleFields({
                  ...roleFields,
                  taskCode: Number(e.target.value),
                })
              }
            />
          </label>
          <label>
            勉強中の言語
            <input
              type="text"
              placeholder="Rails JavaScript"
              onChange={(e) => {
                setStudyLangsInput(e.target.value);
              }}
            />
          </label>
          <label>
            ハピネススコア
            <input
              type="number"
              placeholder="例：70"
              onChange={(e) =>
                setRoleFields({
                  ...roleFields,
                  score: Number(e.target.value),
                })
              }
            />
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
              onChange={(e) =>
                setRoleFields({
                  ...roleFields,
                  experienceDays: Number(e.target.value),
                })
              }
            />
          </label>
          <label>
            現場で使っている言語
            <input
              type="text"
              placeholder="Next.js Golang"
              onChange={(e) => {
                setUseLangsInput(e.target.value);
              }}
            />
          </label>
          <label>
            担当できる課題番号初め
            <input
              type="number"
              placeholder="101"
              onChange={(e) =>
                setRoleFields({
                  ...roleFields,
                  availableStartCode: Number(e.target.value),
                })
              }
            />
          </label>
          <label>
            担当できる課題番号終わり
            <input
              type="number"
              placeholder="201"
              onChange={(e) =>
                setRoleFields({
                  ...roleFields,
                  availableEndCode: Number(e.target.value),
                })
              }
            />
          </label>
        </div>
      )}
      <button onClick={handleSubmit}>送信</button>
      <button onClick={onCancel}>キャンセル</button>
    </>
  );
};
