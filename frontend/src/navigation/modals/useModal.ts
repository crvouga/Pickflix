import { useHistory, useLocation } from "react-router";

export type ModalName =
  | "AddListItem"
  | "AddList"
  | "ReviewForm"
  | "DiscoverSort"
  | "DiscoverSearch"
  | "DiscoverTune"
  | "Search"
  | "Account";

export default (modalName: ModalName) => {
  const history = useHistory();
  const location = useLocation<{ [key in ModalName]: boolean }>();

  const isOpen = location?.state?.[modalName] || false;

  const open = () => {
    history.push({
      state: {
        [modalName]: true,
      },
    });
  };

  const close = () => {
    history.replace({
      state: {
        [modalName]: false,
      },
    });
  };

  return {
    isOpen,
    open,
    close,
  };
};
