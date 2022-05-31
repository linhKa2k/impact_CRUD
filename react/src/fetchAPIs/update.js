export function updataDataApi(data) {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/${data.id}`;
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
