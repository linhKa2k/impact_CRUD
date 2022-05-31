export function getDataApi() {
  return new Promise((resolve, reject) => {
    const url = "http://localhost:3001/get";
    console.log(url);
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
