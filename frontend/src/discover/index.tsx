import { Box, Fab, useTheme } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../redux";
import DiscoverResults from "./DiscoverResults";
import SearchModal from "./SearchModal";
import DiscoverTags from "./DiscoverTags";
import { ModalName } from "../redux/router/types";
import NavigationBarTopLevel from "../common/NavigationBarTopLevel";

export default () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(actions.router.open({ name: ModalName.DiscoverSearch }));
  };

  return (
    <React.Fragment>
      <NavigationBarTopLevel />
      <Box position="sticky" top={56} zIndex={theme.zIndex.appBar}>
        <DiscoverTags />
      </Box>
      <DiscoverResults />
      <SearchModal />
      <Box position="fixed" bottom="64px" right="12px">
        <Fab onClick={handleClickOpen} color="primary">
          <SearchIcon color="action" />
        </Fab>
      </Box>
    </React.Fragment>
  );
};
