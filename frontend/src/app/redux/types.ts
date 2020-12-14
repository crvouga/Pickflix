import { DiscoverActiveTags } from "../../discover/redux/discover-active-tags";
import { DiscoverPageUiState } from "../../discover/redux/discover-page-ui";
import { DiscoverTagsState } from "../../discover/redux/discover-tags";
import { PageHistoryState } from "../../home/page-history/page-history";
import { CreateListWithListItemsFormState } from "../../list/forms/create-list-with-list-items-form/create-list-with-list-items-form";
import { EditListFormState } from "../../list/forms/edit-list-form/edit-list-form";
import { RemoveListItemsFormState } from "../../list/forms/remove-list-items-form/remove-list-items-form";
import { ToggleFormState } from "../../list/forms/toggle-form/toggle-list-item-form";
import { VideoState } from "../../media/video/redux/video";
import { moviePageUi } from "../../movie/redux/movie-page-ui";
import { PersonPageUiState } from "../../person/redux/person-page-ui";
import { DeleteReviewFormState } from "../../review/form/delete-review/delete-review-form";
import { ReviewFormState } from "../../review/form/edit-create-review/review-form";
import { ReviewVoteStatesState } from "../../review/form/vote/review-vote-states";
import { SearchState } from "../../search/redux/search";
import { EditUserFormState } from "../../user/forms/edit-user-form/edit-user-form";
import { UserPageUiState } from "../../user/redux/user-page-ui";
import { ModalState } from "../modals/redux/modal";
import { SnackbarState } from "../snackbar/redux/snackbar";

export type AppState = {
  discoverPageUi: DiscoverPageUiState;
  reviewVoteStates: ReviewVoteStatesState;
  userPageUi: UserPageUiState;
  modal: ModalState;
  editUserForm: EditUserFormState;
  toggleForm: ToggleFormState;
  removeListItemsForm: RemoveListItemsFormState;
  deleteReviewForm: DeleteReviewFormState;
  reviewForm: ReviewFormState;
  editListForm: EditListFormState;
  createListWithListItemsForm: CreateListWithListItemsFormState;
  video: VideoState;
  pageHistory: PageHistoryState;
  snackbar: SnackbarState;
  search: SearchState;
  personPageUi: PersonPageUiState;
  moviePageUi: moviePageUi;
  discoverActiveTags: DiscoverActiveTags;
  discoverTags: DiscoverTagsState;
};
