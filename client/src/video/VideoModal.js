import {
  Box,
  ButtonBase,
  Dialog,
  makeStyles,
  Paper,
  Slide,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import modal from "../common/redux/modal";
import player from "./redux/player";
import VideoPage from "./VideoPage";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "100%",
    backgroundColor: theme.palette.background.default,
  },

  fab: {
    borderRadius: "50%",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
    pointerEvents: "all",
  },

  fabContainer: {
    position: "fixed",
    top: "auto",
    bottom: 0,
    width: "100%",
    textAlign: "center",
    pointerEvents: "none",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default () => {
  const classes = useStyles();
  const isOpen = useSelector(modal.selectors.isOpen("video"));
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(player.actions.pause());
    dispatch(modal.actions.close("video"));
  };
  const location = useLocation();
  useEffect(() => {
    handleClose();
  }, [location.pathname]);

  return (
    <Dialog
      TransitionComponent={Transition}
      PaperProps={{ classes: { root: classes.paper } }}
      onClose={handleClose}
      open={isOpen}
      keepMounted
      fullScreen
    >
      <VideoPage />
      <div className={classes.fabContainer}>
        <ButtonBase onClick={handleClose} className={classes.fab}>
          <CloseIcon />
        </ButtonBase>
      </div>
    </Dialog>
  );
};
