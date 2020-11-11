import {
  Box,
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { partition, take, whereEq } from "ramda";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import { MovieCredits } from "../../tmdb/types";
import CreditsListCard from "./CreditsListCard";
import CreditsDialog from "./CreditsDialog";
import useBoolean from "../../common/hooks/useBoolean";

export default ({ credits }: { credits: MovieCredits }) => {
  const { cast, crew } = credits;
  const [directors, restOfCrew] = partition(whereEq({ job: "Director" }), crew);
  const topCredits = take(10, [...directors, ...cast, ...restOfCrew]);

  const isOpen = useBoolean(false);

  return (
    <React.Fragment>
      <CreditsDialog
        credits={credits}
        open={isOpen.value}
        onClose={isOpen.setFalse}
      />
      <List disablePadding>
        <ListItem button onClick={isOpen.setTrue}>
          <ListItemText
            primaryTypographyProps={{
              variant: "h6",
              style: { fontWeight: "bold" },
            }}
            primary="Cast & Crew"
          />
          <ListItemSecondaryAction style={{ pointerEvents: "none" }}>
            <Button>See All</Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <HorizontalScroll paddingLeft={2}>
        {topCredits.map((credit) => (
          <Box width="150px" key={credit.creditId} marginRight={1}>
            <CreditsListCard credit={credit} />
          </Box>
        ))}

        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={isOpen.setTrue}
        >
          See All
        </Button>
        <Box height="100%" width="auto" marginRight={2} />
      </HorizontalScroll>
    </React.Fragment>
  );
};
