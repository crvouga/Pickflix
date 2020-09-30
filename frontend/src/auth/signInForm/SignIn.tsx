import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import React from "react";
import { useDispatch } from "react-redux";
import form from "./redux";
import { SignInMethod, Step } from "./redux/types";
import { GoogleIcon } from "./socialLoginIcons";

export default () => {
  const dispatch = useDispatch();

  const handleSignInWithGoogle = () => {
    dispatch(form.actions.submit({ signInMethod: SignInMethod.Google }));
  };

  const handleSignInWithPassword = () => {
    dispatch(form.actions.setStep(Step.email));
  };

  return (
    <Box p={2} paddingBottom={4}>
      <Box marginBottom={2}>
        <Avatar style={{ margin: "auto ", width: "100px", height: "100px" }} />
      </Box>
      <List>
        <ListItem divider button onClick={handleSignInWithGoogle}>
          <ListItemIcon>
            <GoogleIcon />
          </ListItemIcon>
          <ListItemText primary="Sign in with Google" />
        </ListItem>
        <ListItem divider button onClick={handleSignInWithPassword}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Sign in with email" />
        </ListItem>
      </List>
    </Box>
  );
};