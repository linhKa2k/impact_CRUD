import * as types from "../constants";
export function paginationDataApi(data) {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/pagination?actiPage=${data.activePage}&limit=${types.limit}`;
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
