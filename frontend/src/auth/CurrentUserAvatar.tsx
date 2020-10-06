import { Avatar, AvatarProps } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "../redux";
import { Skeleton } from "@material-ui/lab";

type Props = AvatarProps & {
  backgroundColor?: string;
};

export default (props: Props) => {
  const { backgroundColor = "white", ...AvatarProps } = props;

  const user = useSelector(selectors.auth.user);
  const authStatus = useSelector(selectors.auth.authStatus);

  switch (authStatus) {
    case "loading":
      return (
        <Skeleton>
          <Avatar {...AvatarProps} />
        </Skeleton>
      );

    case "signedIn":
      return (
        <Avatar
          style={{ backgroundColor }}
          src={user?.photoURL || ""}
          {...AvatarProps}
        />
      );

    case "signedOut":
      return <Avatar {...AvatarProps} />;
  }
};
