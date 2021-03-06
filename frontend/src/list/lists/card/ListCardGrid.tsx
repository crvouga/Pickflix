import { Grid, GridProps } from "@material-ui/core";
import React from "react";
import NothingHere from "../../../common/components/NothingHere";
import { InfiniteScrollBottom } from "../../../common/infinite-scroll";
import WithAuthentication from "../../../user/auth/WithAuthentication";
import {
  AutoListAggergation,
  doesIncludeUserId,
  GetAutoListParams,
  GetListsParams,
  ListAggergation,
  useQueryAutoLists,
  useQueryLists,
} from "../../query";
import AutoListCard from "./AutoListCard";
import ListCard from "./ListCard";
import ListCardCallToAction from "./ListCardCallToAction";
import ListCardSkeleton from "./ListCardSkeleton";

export const ListCardGridEmpty = () => {
  return <NothingHere />;
};

const DEFAULT_ITEM_PROPS: GridProps = {
  xs: 12,
  sm: 6,
};

export const ListCardGridSkeleton = ({
  count,
  ItemProps = DEFAULT_ITEM_PROPS,
}: {
  ItemProps?: GridProps;
  count: number;
}) => {
  return (
    <Grid container spacing={1}>
      {[...Array(count)].map((_, index) => (
        <Grid key={index} item {...ItemProps}>
          <ListCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

export const ListCardGrid = ({
  lists,
  ItemProps = DEFAULT_ITEM_PROPS,
}: {
  ItemProps?: GridProps;
  lists: ListAggergation[];
}) => {
  return (
    <Grid container spacing={1}>
      {lists.map((list) => (
        <Grid key={list.list.id} item {...ItemProps}>
          <ListCard list={list} />
        </Grid>
      ))}
    </Grid>
  );
};

export const AutoListCardGrid = ({
  autoLists,
  ItemProps = DEFAULT_ITEM_PROPS,
}: {
  autoLists: AutoListAggergation[];
  ItemProps?: GridProps;
}) => {
  return (
    <Grid container spacing={1}>
      {autoLists.map((autoList) => (
        <Grid key={autoList.autoList.id} item {...ItemProps}>
          <AutoListCard autoList={autoList} />
        </Grid>
      ))}
    </Grid>
  );
};

/* 



*/

export const AutoListCardGridContainer = ({
  count,
  ItemProps,
  ...params
}: GetAutoListParams & { ItemProps?: GridProps; count: number }) => {
  const query = useQueryAutoLists(params);

  if (query.data === undefined) {
    return <ListCardGridSkeleton ItemProps={ItemProps} count={count} />;
  }

  const autoLists = query.data;

  if (autoLists.length === 0) {
    return <ListCardGridEmpty />;
  }

  return <AutoListCardGrid autoLists={autoLists} ItemProps={ItemProps} />;
};

export const ListCardGridContainer = ({
  count,
  ItemProps,
  limit,
  renderOverLimit,
  GetListParams,
}: {
  GetListParams: GetListsParams;
  ItemProps?: GridProps;
  limit?: number;
  count: number;
  renderOverLimit?: () => React.ReactNode;
}) => {
  const query = useQueryLists(GetListParams);

  if (query.data === undefined) {
    return <ListCardGridSkeleton ItemProps={ItemProps} count={count} />;
  }

  const lists = query.data.flatMap((page) => page.results);

  if (lists.length === 0) {
    return (
      <WithAuthentication
        renderAuthenticated={(currentUser) =>
          doesIncludeUserId(currentUser.user.id, GetListParams) ? (
            <ListCardCallToAction />
          ) : (
            <ListCardGridEmpty />
          )
        }
        renderDefault={() => <ListCardGridEmpty />}
      />
    );
  }

  if (limit) {
    const sliced = lists.slice(0, limit);
    return (
      <React.Fragment>
        <ListCardGrid lists={sliced} ItemProps={ItemProps} />
        {renderOverLimit && lists.length > sliced.length && renderOverLimit()}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ListCardGrid lists={lists} ItemProps={ItemProps} />
      <InfiniteScrollBottom {...query} />
    </React.Fragment>
  );
};
