import * as R from "ramda";
import {
  call,
  cancelled,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import backendAPI from "../../backendAPI";
import actions from "./actions";
import * as selectors from "./selectors";
import axios from "axios";

const fetchSearch = async (config) => {
  if (config.params.query === "") {
    return { results: [] };
  }
  const response = await backendAPI.get("/api/tmdb/search/multi", config);
  return response.data;
};

function* fetchSaga(config) {
  const text = yield select(selectors.text);
  const currentPage = yield select(selectors.currentPage);
  yield put(actions.setStatus("loading"));
  const response = yield call(fetchSearch, {
    ...config,
    params: {
      page: currentPage + 1,
      query: encodeURI(text),
    },
  });
  yield put(actions.setStatus("success"));
  const responses = yield select(selectors.responses);
  yield put(actions.setResponses(R.append(response, responses)));
}

export default function* () {
  yield takeLatest(actions.setText, function* () {
    yield put(actions.setStatus("loading"));
    yield delay(1000 / 5);

    const cancelSource = axios.CancelToken.source();
    try {
      yield put(actions.setResponses([]));
      yield* fetchSaga({ cancelToken: cancelSource.token });
    } finally {
      if (yield cancelled()) {
        yield call(() => cancelSource.cancel());
      }
    }
  });

  yield takeLeading(actions.fetch, function* () {
    yield* fetchSaga();
  });

  yield takeEvery(actions.chose, function* (action) {
    const result = action.payload;
    const recentlySearched = yield select(selectors.recentlySearched);
    const newRecentlySearched = R.pipe(
      R.append(result),
      R.uniqBy(R.prop("id")),
      R.take(100)
    )(recentlySearched);

    yield put(actions.setRecentlySearched(newRecentlySearched));
  });
}
