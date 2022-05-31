import { put, takeEvery } from "redux-saga/effects";
import { select } from "redux-saga/effects";
import * as types from "../constants";
import * as actions from "../actions/action";
import { addDataApi } from "../fetchAPIs/add";
import { deleteDataApi } from "../fetchAPIs/delete";
import { updataDataApi } from "../fetchAPIs/update";
import { paginationDataApi } from "../fetchAPIs/pagination";
import { searchPaginationDataApi } from "../fetchAPIs/searchPagination";

function* paginationApi(action) {
  try {
    const activeData = yield paginationDataApi(action.payload);
    if(action.payload === 1 && activeData.posts === 0) {
      yield put(
        actions.paginationSuccess({
          listData: activeData.data,
          totalPage: 1,
          activePage: 1,
        })
      );
    }else {
      yield put(
        actions.paginationSuccess({
          listData: activeData.data,
          totalPage: activeData.totalPage,
          activePage: activeData.actiPage,
        })
      );
    }
    
  } catch (error) {
    yield put(actions.paginationFailure({ errorMessage: error.message }));
  }
}

function* addApi(action) {
  try {
    const res = yield addDataApi(action.payload);
    let nameAdd = action.payload.name;
    let textSearch = yield select((state) => state.itemReducer.textSearch);

    yield put(actions.addSuccess());
    if (textSearch !== "") {
      if (nameAdd.includes(textSearch)) {
        yield put(
          actions.searchRequest({
            activePage: res.totalPage,
            textSearch: textSearch,
          })
        );
      } else {
        console.log("da vao day");
        yield put(
          actions.searchSuccess({
            activePage: 1,
            totalPage: 1,
            listData: [res.data],
            textSearch: textSearch
          })
        );
      }
    } else {
      yield put(actions.paginationRequest({ activePage: res.totalPage }));
    }
  } catch (error) {
    yield put(actions.addFailure({ errorMessage: error.message }));
  }
}

function* deleteApi(action) {
  try {
    yield deleteDataApi(action.payload);
    let data = yield select((state) => state.itemReducer.listData);
    let activePage = yield select((state) => state.itemReducer.activePage);
    let totalPage = yield select((state) => state.itemReducer.totalPage);
    let textSearch = yield select((state) => state.itemReducer.textSearch);

    yield put(actions.deleteSuccess());

    if (textSearch !== "") {
      if (data.length > 1 && totalPage >= 1) {
        yield put(
          actions.searchRequest({
            activePage: activePage,
            textSearch: textSearch,
          })
        );
      }else{
        if (data.length === 1 && totalPage === 1) {
          console.log("da vao delete 1");
          yield put(
            actions.searchSuccess({
              activePage: 1,
              totalPage: 1,
              textSearch: textSearch
            })
          );
        }else{
          
          yield put(
            actions.searchRequest({
              activePage : activePage - 1,
              textSearch: textSearch,
            })
          );
        }
      }
      
    } else {
      if (data.length > 1 && totalPage >= 1) {
        yield put(actions.paginationRequest({ activePage: activePage }));
      }else{
        if (data.length === 1 && totalPage === 1) {
          console.log("da vao delete");
          yield put(actions.paginationSuccess({ activePage: 1, totalPage: 1}));
        }else{
          activePage = activePage - 1;
          yield put(actions.paginationRequest({ activePage: activePage }));
        }
      }
      
    }
  } catch (error) {
    yield put(actions.deleteFailure({ errorMessage: error.message }));
  }
}

function* updateApi(action) {
  try {
    const res = yield updataDataApi(action.payload);
    let nameUpdate = action.payload.name;
    let activePage = yield select((state) => state.itemReducer.activePage);
    let textSearch = yield select((state) => state.itemReducer.textSearch);

    yield put(actions.updateSuccess());

    if (textSearch !== "") {
      if (nameUpdate.includes(textSearch)) {
        yield put(
          actions.searchRequest({
            activePage: res.activePage,
            textSearch: textSearch,
          })
        );
      } else {
        yield put(
          actions.searchSuccess({
            activePage: 1,
            totalPage: 1,
            listData: [res.data],
            textSearch: textSearch
          })
        );
      }
    } else {
      yield put(actions.paginationRequest({ activePage: activePage }));
    }
  } catch (error) {
    yield put(actions.updateFailure({ errorMessage: error.message }));
  }
}

function* searchPaginationApi(action) {
  try {
    const activeData = yield searchPaginationDataApi(action.payload);
    let textSearch = yield select((state) => state.itemReducer.textSearch);
    if (action.payload.actiPage === 1 && activeData.totalSearch === 0) {
      yield put(
        actions.searchSuccess({
          activePage: 1,
          totalPage: 1,
          listData: activeData.data,
          textSearch: textSearch
        })
      );
    } else {
      yield put(
        actions.searchSuccess({
          listData: activeData.data,
          totalPage: activeData.totalPage,
          activePage: activeData.actiPage,
          textSearch: activeData.textSearch,
        })
      );
    }
  } catch (error) {
    yield put(actions.searchFailure({ errorMessage: error.message }));
  }
}

export const itemSaga = [
  takeEvery(types.PAGINATION_ITEM_REQUEST, paginationApi),
  takeEvery(types.ADD_ITEM_REQUEST, addApi),
  takeEvery(types.DELETE_ITEM_REQUEST, deleteApi),
  takeEvery(types.UPDATE_ITEM_REQUEST, updateApi),
  takeEvery(types.SEARCH_ITEM_REQUEST, searchPaginationApi),
];
