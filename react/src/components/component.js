import React, { Component } from "react";

class Item extends Component {
  state = {
    name: "",
    id: "",
    update: { nameUpdate: "", id: "" },
    textSearch: "",
  };
  render() {
    let list = [];
    let listButton = [];
    let totalPage = this.props.totalPage;
    let textSearch = this.props.textSearch;

    for (let i = 1; i <= totalPage; i++) {
      listButton.push(i);
    }


    if (this.props.listData) {
      list = this.props.listData.map((item, key) => {
        return (
          <tr key={key}>
            <th>{key + 1}</th>
            <th>{item.name}</th>
            <th>
              <button
                onClick={() => {
                  this.props.deleteData(item._id);
                }}
              >
                Delete
              </button>
            </th>
            <th>
              <button
                onClick={() => {
                  this.setState({
                    update: {
                      id: item._id,
                      nameUpdate: item.name,
                    },
                  });
                }}
              >
                chon
              </button>
            </th>
          </tr>
        );
      });
    }
    return (
      <div>
        <div>
          <input
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
            value={this.state.name}
          />
          <button
            onClick={() => {
              this.props.addData({
                name: this.state.name,
                textSearch: this.props.textSearch,
              });
            }}
          >
            Add
          </button>
        </div>
        <div>
          <input
            onChange={(e) => {
              this.setState({
                update: {
                  ...this.state.update,
                  nameUpdate: e.target.value,
                },
              });
            }}
            value={this.state.update.nameUpdate}
          />
          <button
            onClick={() => {
              this.props.updateData({
                name: this.state.update.nameUpdate,
                id: this.state.update.id,
              });
            }}
          >
            Update
          </button>
        </div>
        <div>
          <input
            onChange={(e) => {
              this.setState({ textSearch: e.target.value });
            }}
          />
          <button
            onClick={() => {
              this.props.searchPaginationData({
                textSearch: this.state.textSearch,
                activePage: 1,
              });
            }}
          >
            Search
          </button>
        </div>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>NAME</th>
            </tr>
            {list}
          </tbody>
        </table>
        {listButton.map((btn, key) => {
          return (
            <button
              key={key}
              onClick={() => {
                textSearch
                  ? this.props.searchPaginationData({
                      textSearch,
                      activePage: btn,
                    })
                  : this.props.paginationData({ activePage: btn });
              }}
              style={{
                backgroundColor: this.props.activePage === btn ? "green" : null,
              }}
            >
              {btn}
            </button>
          );
        })}
      </div>
    );
  }
}
export default Item;
