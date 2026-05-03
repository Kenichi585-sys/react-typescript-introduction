import type { Mentor, Student, User } from "../types";
import { getAvailableMentors, getAvailableStudents } from "../utils";

type Props = {
  users: User[];
};

const isMentor = (user: User): user is Mentor => {
  return user.role === "mentor";
};

const isStudent = (user: User): user is Student => {
  return user.role === "student";
};

export const UserTable = (props: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名前</th>
          <th>ロール</th>
          <th>メールアドレス</th>
          <th>年齢</th>
          <th>郵便番号</th>
          <th>電話番号</th>
          <th>趣味（リスト）</th>
          <th>URL</th>
          <th>勉強時間</th>
          <th>課題番号</th>
          <th>勉強中の言語</th>
          <th>ハピネススコア</th>
          <th>対応可能なメンター</th>
          <th>実務経験月数</th>
          <th>現場で使っている言語</th>
          <th>担当できる課題番号初め</th>
          <th>担当できる課題番号終わり</th>
          <th>対応可能な生徒</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.role}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>{user.postCode}</td>
            <td>{user.phone}</td>
            <td>{user.hobbies.join(", ")}</td>
            <td>{user.url}</td>
            <td>{user.role === "student" ? user.studyMinutes : ""}</td>
            <td>{user.role === "student" ? user.taskCode : ""}</td>
            <td>{user.role === "student" ? user.studyLangs.join(", ") : ""}</td>
            <td>{user.role === "student" ? user.score : ""}</td>
            <td>
              {user.role === "student"
                ? getAvailableMentors(user, props.users.filter(isMentor)).join(
                    ", ",
                  )
                : ""}
            </td>
            <td>{user.role === "mentor" ? user.experienceDays : ""}</td>
            <td>{user.role === "mentor" ? user.useLangs.join(", ") : ""}</td>
            <td>{user.role === "mentor" ? user.availableStartCode : ""}</td>
            <td>{user.role === "mentor" ? user.availableEndCode : ""}</td>
            <td>
              {user.role === "mentor"
                ? getAvailableStudents(
                    props.users.filter(isStudent),
                    user,
                  ).join(", ")
                : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
