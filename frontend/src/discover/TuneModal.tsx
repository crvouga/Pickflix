import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Hidden,
  Divider,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { descend, head, sort, sortBy, thunkify } from "ramda";
import React from "react";
import { useQuery } from "react-query";
import useModal from "../app/modals/useModal";
import HorizontalScroll from "../common/components/HorizontalScroll";
import LoadingBox from "../common/components/LoadingBox";
import {
  ResponsiveDialog,
  DoneButton,
} from "../common/components/ResponsiveDialog";
import BaseTag from "./BaseTag";
import { getMovieCertifications, queryKeys } from "./query";
import {
  getDecades,
  SortByKey,
  sortByKeys,
  sortByKeyToName,
  TagType,
  yearRangeToName,
} from "./query/types";
import useDiscoverState from "./redux/useDiscoverState";
const ReleaseYearRangeSection = () => {
  const discoverTuneModal = useModal("DiscoverTune");
  const { activateTag } = useDiscoverState();

  const handleClick = (decade: [number, number]) => {
    activateTag({
      type: TagType.releaseYearRange,
      id: decade.toString(),
      range: decade,
    });

    discoverTuneModal.close();
  };

  return (
    <React.Fragment>
      <Box p={2} paddingBottom={1}>
        <Typography variant="h6">Decades</Typography>
      </Box>

      <HorizontalScroll paddingX={2}>
        {sort(descend(head), getDecades()).map((decade) => (
          <Box key={decade.toString()} marginRight={1} marginBottom={1}>
            <BaseTag
              clickable
              variant="outlined"
              label={yearRangeToName(decade)}
              onClick={thunkify(handleClick)(decade)}
            />
          </Box>
        ))}
      </HorizontalScroll>
    </React.Fragment>
  );
};

const SortBySection = () => {
  const discoverTuneModal = useModal("DiscoverTune");
  const { activateTag } = useDiscoverState();

  const handleClick = (sortBy: SortByKey) => {
    activateTag({
      type: TagType.sortBy,
      id: sortBy,
      sortBy,
    });
    discoverTuneModal.close();
  };

  return (
    <React.Fragment>
      <Box p={2} paddingBottom={1}>
        <Typography variant="h6">Sort By</Typography>
      </Box>
      <HorizontalScroll paddingX={2}>
        {sortByKeys.map((sortBy) => (
          <Box key={sortBy} marginRight={1} marginBottom={1}>
            <BaseTag
              clickable
              variant="outlined"
              label={sortByKeyToName(sortBy)}
              onClick={thunkify(handleClick)(sortBy)}
            />
          </Box>
        ))}
      </HorizontalScroll>
    </React.Fragment>
  );
};

const CertificationSection = () => {
  const discoverTuneModal = useModal("DiscoverTune");
  const { activateTag } = useDiscoverState();

  const handleClick = (certification: string) => {
    activateTag({
      type: TagType.certification,
      id: certification,
      certification,
      certificationCountry: "US",
    });
    discoverTuneModal.close();
  };

  const query = useQuery(queryKeys.certifications(), () =>
    getMovieCertifications()
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <LoadingBox />;
  }

  const certificationsUS = sortBy((_) => _.order, query.data.certifications.US);

  return (
    <React.Fragment>
      <Box p={2} paddingBottom={1}>
        <Typography variant="h6">Rating</Typography>
      </Box>
      <HorizontalScroll paddingX={2}>
        {certificationsUS.map((certification) => (
          <Box key={certification.certification} marginRight={1}>
            <BaseTag
              onClick={thunkify(handleClick)(certification.certification)}
              variant="outlined"
              clickable
              label={certification.certification}
            />
          </Box>
        ))}
      </HorizontalScroll>
    </React.Fragment>
  );
};

export default () => {
  const { isOpen, close } = useModal("DiscoverTune");

  return (
    <ResponsiveDialog open={isOpen} onClose={close} showDoneButton>
      <Box paddingBottom={2}>
        <ReleaseYearRangeSection />
        <SortBySection />
        <CertificationSection />
      </Box>
    </ResponsiveDialog>
  );
};
