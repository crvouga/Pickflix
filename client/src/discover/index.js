import { Box, Chip, Paper } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatFab from "../chat/Fab";
import HorizontalScroll from "../common/components/HorizontalScroll";
import discover from "./redux/discover";

export default () => {
  const chips = useSelector(discover.selectors.chips);
  const suggestions = useSelector(discover.selectors.suggestions);
  const dispatch = useDispatch();
  const handleChipClick = (chip) => () => {
    dispatch(discover.actions.setChips(R.union([chip], chips)));
  };
  return (
    <div>
      <Box component={Paper} position="sticky" top={0}>
        <HorizontalScroll paddingLeft={2} paddingY={2}>
          {chips.map((chip) => (
            <Box marginRight={1} key={chip.id}>
              <Chip label={discover.selectors.toLabel(chip)} />
            </Box>
          ))}
          {suggestions.map((chip) => (
            <Box marginRight={1} key={chip.id} onClick={handleChipClick(chip)}>
              <Chip
                label={discover.selectors.toLabel(chip)}
                variant="outlined"
              />
            </Box>
          ))}
        </HorizontalScroll>
        <ChatFab />
      </Box>
    </div>
  );
};
