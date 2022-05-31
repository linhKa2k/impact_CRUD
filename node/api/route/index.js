const controller = require("../controller/index");
module.exports = function (app) {
  app.route("/get").get(controller.getData);
  app.route("/add").post(controller.addDada);
  app.route("/delete/:id").delete(controller.deletaData);
  app.route("/:id").put(controller.udateData);
  app.route("/search").get(controller.searchData);
  app.route("/pagination").get(controller.paginationData);
  app.route("/searchPagination").get(controller.searchPaginationData);
}
