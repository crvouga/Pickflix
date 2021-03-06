import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";

export const YoutubeStatusAlertLoading = () => {
  return (
    <Alert severity="warning">
      <AlertTitle>Loading...</AlertTitle>
      Trying to get video from Youtube.
    </Alert>
  );
};

export const YoutubeStatusAlertError = () => {
  return (
    <Alert severity="warning">
      <AlertTitle>Video unavailable</AlertTitle>
      Youtube told me there has been too much video requests. 🙄
    </Alert>
  );
};
