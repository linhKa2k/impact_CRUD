import React from "react";
import * as actions from "../actions/action";
import Item from "../components/component";
import { connect } from "react-redux";

class Container extends React.Component {
  componentDidMount() {
    this.props.paginationData({activePage : 1});
  }

  render() {
    return <Item {...this.props} />;
  }
}
const mapStateToProps = (state) => {
  return {
    listData: state.itemReducer.listData,
    activePage: state.itemReducer.activePage,
    totalPage: state.itemReducer.totalPage,
    textSearch: state.itemReducer.textSearch,
  };
};
 
const mapDispatchToProps = (dispatch) => {
  return {
    paginationData: (data) => {
      dispatch(actions.paginationRequest(data));
    },
    addData: (data) => {
      dispatch(actions.addRequest(data));
    },
    deleteData: (data) => {
      dispatch(actions.deleteRequest(data));
    },
    updateData: (data) => {
      dispatch(actions.updateRequest(data));
    },
    searchPaginationData: (data) => {
      dispatch(actions.searchRequest(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container)