import { Box } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import LoadingBox from "../common/components/LoadingBox";
import AutoListCard from "../lists/auto-lists/AutoListCard";
import {
  AutoListAggergation,
  getUsersAutoLists,
  queryKeys,
} from "../lists/query";
import { User } from "./query";

export default ({
  user,
  onClick,
}: {
  onClick?: (list: AutoListAggergation) => void;
  user: User;
}) => {
  const handleClick = (list: AutoListAggergation) => {
    if (onClick) {
      onClick(list);
    }
  };

  const query = useQuery(
    queryKeys.userAutoLists({ username: user.username }),
    () => getUsersAutoLists({ username: user.username })
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <LoadingBox />;
  }

  const autoListsByKey = query.data;

  return (
    <React.Fragment>
      {Object.entries(autoListsByKey).map(([autoListKey, autoList]) => (
        <Box
          key={autoListKey}
          paddingY={1}
          onClick={() => handleClick(autoList)}
        >
          <AutoListCard autoList={autoList} />
        </Box>
      ))}
    </React.Fragment>
  );
};
