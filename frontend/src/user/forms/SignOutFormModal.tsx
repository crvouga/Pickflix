import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React from "react";
import useModal from "../../app/modals/useModal";
import { ZoomIn } from "../../common/components/TransitionComponents";
import { signOut } from "../auth/query/mutations";

export default () => {
  const { isOpen, close } = useModal("SignOutForm");

  return (
    <Dialog TransitionComponent={ZoomIn} open={isOpen} onClose={close}>
      <DialogTitle>Sign out?</DialogTitle>
      <DialogActions>
        <Button size="large" onClick={close}>
          Cancel
        </Button>
        <Button
          size="large"
          onClick={() => {
            signOut();
            close();
          }}
        >
          Sign Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};
