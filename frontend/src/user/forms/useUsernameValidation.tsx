import { useDebounce } from "use-debounce/lib";
import { useQueryUsers } from "../query";
//copyed from server
const USERNAME_REGEXP = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

export const isValidUsername = (username: string) =>
  USERNAME_REGEXP.test(username) && username.length > 0;

export const useIsUsernameTaken = (username: string) => {
  const [debouncedUsername] = useDebounce(username, 1000 / 3);
  const query = useQueryUsers({
    username: debouncedUsername,
  });
  const usersWithUsername = query.data ?? [];
  const isLoading = query.status === "loading";
  const isTaken = usersWithUsername.length > 0;
  return {
    isTaken,
    isLoading,
  };
};
