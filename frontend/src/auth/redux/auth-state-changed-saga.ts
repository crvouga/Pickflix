import { User } from "firebase";
import { eventChannel } from "redux-saga";
import { put, select, takeEvery } from "redux-saga/effects";
import { actions, selectors } from "../../redux";
import firebase from "../firebase";
import { AuthStatus } from "./types";

const authStateChannel = eventChannel<User | false>((emit) => {
  return firebase.auth().onAuthStateChanged((user) => {
    emit(user || false);
  });
});

function* authStateChangedSaga(newCurrentUser: User | false) {
  const previousAuthStatus: AuthStatus = yield select(
    selectors.auth.authStatus
  );
  const perviousCurrentUser: User | undefined = yield select(
    selectors.auth.user
  );

  if (newCurrentUser) {
    yield put(actions.auth.setUser(newCurrentUser));
    yield put(actions.auth.setAuthStatus("signedIn"));
  } else {
    yield put(actions.auth.setUser(undefined));
    yield put(actions.auth.setAuthStatus("signedOut"));
  }

  const currentAuthStatus: AuthStatus = yield select(selectors.auth.authStatus);
  const currentUser: User | undefined = yield select(selectors.auth.user);

  const didSignedIn =
    previousAuthStatus !== "signedIn" &&
    currentAuthStatus === "signedIn" &&
    currentUser;

  const didSwapSignIn =
    perviousCurrentUser &&
    currentUser &&
    perviousCurrentUser.uid !== currentUser.uid;

  if (didSignedIn || didSwapSignIn) {
    yield put(actions.auth.signedIn());
  }

  const didSignOut =
    previousAuthStatus === "signedIn" && currentAuthStatus === "signedOut";

  if (didSignOut) {
    yield put(actions.auth.signedOut());
  }
}

export default function* () {
  yield takeEvery(authStateChannel, authStateChangedSaga);
}
