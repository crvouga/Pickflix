import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import { AvatarGroup } from "@material-ui/lab";
import * as R from "ramda";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { IList } from "./redux/entities";
import * as queryConfigs from "./redux/query-configs";
import ListItemSkeleton from "../common/components/ListItemSkeleton";

export default () => {
  const dispatch = useDispatch();

  const query = useSelector(selectors.query.queryState(listRequest));
  const lists = useSelector(selectors.lists.lists);

  useEffect(() => {
    dispatch(actions.lists.getLists({ attempts: 5, timeout: 1.5 * 1000 }));
  }, [listRequest, dispatch]);

  const onClickList = (list: IList) => () => {
    dispatch(actions.router.push({ pathname: `/list/${list.id}` }));
  };

  return (
    <React.Fragment>
      <List>
        {query.isPending && [1, 2, 3, 4, 5].map((n) => <ListItemSkeleton />)}
        {lists.map((list) => (
          <ListItem key={list.id} button divider onClick={onClickList(list)}>
            <Box marginX={1}>
              <AvatarGroup>
                {R.take(1, list.listItems || []).map((listItem) => (
                  <Avatar
                    key={listItem?.id}
                    variant="square"
                    src={makeTMDbImageURL(3, listItem?.tmdbData)}
                  >
                    <MovieIcon />
                  </Avatar>
                ))}
              </AvatarGroup>
            </Box>
            <ListItemText
              primary={list?.title}
              secondary={`${list?.listItemCount || 0} items`}
            />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};
