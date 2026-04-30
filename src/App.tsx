import { UserTable } from "./components/UserTable";
import { USER_LIST } from "./data";

export const App = () => {
  return (
    <div>
      <UserTable users={USER_LIST} />
    </div>
  );
};
