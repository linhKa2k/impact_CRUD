import * as types from "../constants";
const DEFAULT_STATE = {
  listData: [],
  isFetching: false,
  dataFetched: false,
  error: false,
  errorMessage: null,

  activePage: "",
  totalPage: "",
  textSearch: "",
};
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.PAGINATION_ITEM_REQUEST:
    case types.ADD_ITEM_REQUEST:
    case types.DELETE_ITEM_REQUEST:
    case types.UPDATE_ITEM_REQUEST:
    case types.SEARCH_ITEM_REQUEST:
      return {
        ...state,
        isFetching: true,
        dataFetched: false,
      };

    case types.ADD_ITEM_SUCCESS:
    case types.DELETE_ITEM_SUCCESS:
    case types.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
      };

    case types.PAGINATION_ITEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        listData: action.payload.listData,
        activePage: action.payload.activePage,
        totalPage: action.payload.totalPage,
      };

    case types.SEARCH_ITEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        listData: action.payload.listData,
        activePage: action.payload.activePage,
        totalPage: action.payload.totalPage,
        textSearch: action.payload.textSearch,
      };
    case types.PAGINATION_ITEM_FAILURE:
    case types.ADD_ITEM_FAILURE:
    case types.DELETE_ITEM_FAILURE:
    case types.UPDATE_ITEM_FAILURE:
    case types.SEARCH_ITEM_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false,
        dataFetched: false,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};
