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
        <input
          type="text"
          onChange={(e) =>
            setCommonFields({
              ...commonFields,
              name: e.target.value,
            })
          }
        />
        <input
          type="text"
          onChange={(e) =>
            setCommonFields({
              ...commonFields,
              email: e.target.value,
            })
          }
        />
        <input
          type="number"
          onChange={(e) =>
            setCommonFields({
              ...commonFields,
              age: Number(e.target.value),
            })
          }
        />
        <input
          type="text"
          onChange={(e) =>
            setCommonFields({
              ...commonFields,
              postCode: e.target.value,
            })
          }
        />
        <input
          type="text"
          onChange={(e) =>
            setCommonFields({
              ...commonFields,
              phone: e.target.value,
            })
          }
        />
        <input type="text" onChange={(e) => setHobbiesInput(e.target.value)} />
        <input
          type="text"
          onChange={(e) =>
            setCommonFields({
              ...commonFields,
              url: e.target.value,
            })
          }
        />
      </div>
      {role === "student" && (
        <div>
          <input
            type="number"
            onChange={(e) =>
              setRoleFields({
                ...roleFields,
                studyMinutes: Number(e.target.value),
              })
            }
          />
          <input
            type="number"
            onChange={(e) =>
              setRoleFields({
                ...roleFields,
                taskCode: Number(e.target.value),
              })
            }
          />
          <input
            type="text"
            onChange={(e) => {
              setStudyLangsInput(e.target.value);
            }}
          />
          <input
            type="number"
            onChange={(e) =>
              setRoleFields({
                ...roleFields,
                score: Number(e.target.value),
              })
            }
          />
        </div>
      )}
      {role === "mentor" && (
        <div>
          <input
            type="number"
            onChange={(e) =>
              setRoleFields({
                ...roleFields,
                experienceDays: Number(e.target.value),
              })
            }
          />
          <input
            type="number"
            onChange={(e) => {
              setUseLangsInput(e.target.value);
            }}
          />
          <input
            type="number"
            onChange={(e) =>
              setRoleFields({
                ...roleFields,
                availableStartCode: Number(e.target.value),
              })
            }
          />
          <input
            type="number"
            onChange={(e) =>
              setRoleFields({
                ...roleFields,
                availableEndCode: Number(e.target.value),
              })
            }
          />
        </div>
      )}
    </>
  );
};
