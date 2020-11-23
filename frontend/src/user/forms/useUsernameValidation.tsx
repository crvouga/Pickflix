import { CircularProgress, TextField, TextFieldProps } from "@material-ui/core";
import React from "react";
import { useDebounce } from "use-debounce/lib";
import { useQueryUsers } from "../query";
//copyed from server
const USERNAME_REGEXP = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

const isValidUsername = (username: string) =>
  USERNAME_REGEXP.test(username) && username.length > 0;

export default (username: string) => {
  const [debouncedUsername] = useDebounce(username, 1000 / 3);

  const query = useQueryUsers({
    username: debouncedUsername,
  });

  const usersWithUsername = query.data ?? [];

  const isError =
    (usersWithUsername.length > 0 || !isValidUsername(username)) &&
    username.length !== 0;

  const helperText =
    usersWithUsername.length > 0
      ? "Username is already being used"
      : !isValidUsername(username) && username.length !== 0
      ? "Username is not valid"
      : "";

  return {
    isError,
    helperText,
    isLoading: query.status === "loading",
  };
};
