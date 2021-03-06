import {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigationActionProps,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { makeCurrentUserPageRoute } from "../../user/CurrentUserPage";
import {
  DiscoverPageIcon,
  HomePageIcon,
  ProfilePageIcon,
  SearchPageIcon,
} from "./PageIcons";

export const BOTTOM_NAVIGATION_BAR_HEIGHT = 56;

const useStylesBottomNavigation = makeStyles((theme) => ({
  root: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    maxWidth: "100%",
    zIndex: theme.zIndex.appBar,
    marginRight: theme.spacing(2),
    color: theme.palette.action.active,
  },
}));

const useStylesBottomNavigationAction = makeStyles((theme) => ({
  root: {
    color: theme.palette.action.active,
  },
  wrapper: {
    color: theme.palette.action.active,
  },
  selected: {
    color: theme.palette.action.active,
  },
}));

export default () => {
  const classesBottomNavigation = useStylesBottomNavigation();
  const classesBottomNavigationAction = useStylesBottomNavigationAction();

  const history = useHistory();
  const location = useLocation();

  const navigationActions: BottomNavigationActionProps[] = [
    {
      value: "/home",
      icon: <HomePageIcon />,
      label: "Home",
      onClick: () => {
        history.push("/home");
      },
    },
    {
      value: "/discover",
      label: "Discover",
      icon: <DiscoverPageIcon />,
      onClick: () => {
        history.push("/discover");
      },
    },
    {
      value: "/search",
      label: "Search",
      icon: <SearchPageIcon />,
      onClick: () => {
        history.push("/search");
      },
    },
    {
      value: makeCurrentUserPageRoute(),
      label: "Profile",
      icon: <ProfilePageIcon />,
      onClick: () => {
        history.push(makeCurrentUserPageRoute());
      },
    },
  ];

  return (
    <BottomNavigation
      value={location.pathname}
      showLabels
      classes={classesBottomNavigation}
    >
      {navigationActions.map(({ value, label, icon, onClick }) => (
        <BottomNavigationAction
          classes={classesBottomNavigationAction}
          key={value}
          value={value}
          label={label}
          icon={icon}
          onClick={onClick}
        />
      ))}
    </BottomNavigation>
  );
};
