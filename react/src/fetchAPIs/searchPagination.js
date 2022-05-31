import * as types from "../constants";
export function searchPaginationDataApi(data) {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/searchPagination?actiPage=${data.activePage}&limit=${types.limit}&name=${data.textSearch}`;
    fetch(url, {
      method: "GET",
    })
      .then((response) => resolve(response.json()))
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
