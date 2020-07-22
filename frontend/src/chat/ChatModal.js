import {
  ButtonBase,
  Dialog,
  makeStyles,
  Slide,
  Container,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import modal from "../common/redux/modal";
import Input from "./Input";
import MessageList from "./MessageList";
import RefsContext from "./RefsContext";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    top: theme.spacing(1),
    left: theme.spacing(1),
    borderRadius: "50%",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    width: "100%",
    height: "100vh",
    position: "relative",
  },
  messageListContainer: {
    positon: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflowY: "scroll",
  },
  inputContainer: {
    position: "absolute",
    left: 0,
    top: "auto",
    bottom: 0,
    width: "100%",
    textAlign: "center",
  },
  gutter: {
    height: "86px",
  },
  paper: {
    backgroundColor: theme.palette.background.default,
  },
}));

const TransitionComponent = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const preventDefault = (e) => e.preventDefault();

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const isOpen = useSelector(modal.selectors.isOpen("chat"));
  const dispatch = useDispatch();
  const handleClose = () => {
    if (isOpen) {
      dispatch(modal.actions.close("chat"));
    }
  };
  useEffect(() => {
    return history.listen(handleClose);
  }, []);

  const messageListBottomRef = useRef();
  const inputRef = useRef();
  const refs = {
    messageListBottom: messageListBottomRef,
    input: inputRef,
  };

  useEffect(() => {
    if (refs.input.current) {
      if (isOpen) {
        refs.messageListBottom.current.scrollIntoView();
      } else {
        refs.input.current.blur();
      }
    }
  }, [refs.input.current, isOpen]);

  return (
    <RefsContext.Provider value={refs}>
      <Dialog
        fullScreen
        open={isOpen}
        keepMounted
        onClose={handleClose}
        PaperProps={{ classes: { root: classes.paper } }}
        TransitionComponent={TransitionComponent}
      >
        <Container disableGutters maxWidth="xs">
          <div
            /* prevent input blurring */
            onClick={preventDefault}
            onTouchStart={preventDefault}
            onMouseDown={preventDefault}
            className={classes.root}
          >
            <div className={classes.messageListContainer}>
              <MessageList />
              <div className={classes.gutter} />
            </div>
            <div className={classes.inputContainer}>
              <Input />
            </div>
          </div>

          <ButtonBase onClick={handleClose} className={classes.fab}>
            <CloseIcon />
          </ButtonBase>
        </Container>
      </Dialog>
    </RefsContext.Provider>
  );
};