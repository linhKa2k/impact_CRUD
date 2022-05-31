const StudentModel = require("../model/index");
exports.getData = async (req, res) => {
  try {
    let data = await StudentModel.find({});
    res.send({ data });
  } catch (error) {
    res.send(error);
  }
};
exports.addDada = async (req, res) => {
  try {
    let name = req.body.name;

    let textSearch = req.query.textSearch;
    let limit = parseInt(req.query.limit);

    let data = await StudentModel.create({ name: name });

    let addData;
    if (textSearch) {
      addData = await StudentModel.countDocuments({
        name: { $regex: textSearch, $options: "i" },
      });
    } else {
      addData = await StudentModel.countDocuments();
    }

    let totalPage = Math.ceil(addData / limit);

    res.send({ data, totalPage });
  } catch (error) {
    res.send(error);
  }
};

exports.deletaData = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await StudentModel.findByIdAndDelete(id);
    res.send({ data });
  } catch (error) {
    res.send(error);
  }
};

exports.udateData = async (req, res) => {
  try {
    let id = req.params.id;
    let name = req.body.name;
    let textSearch = req.body.textSearch;
    let limit = parseInt(req.query.limit);

    let data = await StudentModel.findByIdAndUpdate(
      id,
      { name: name },
      { new: true }
    );
    let updateData;
    if (textSearch) {
      updateData = await StudentModel.countDocuments({
        name: { $regex: textSearch, $options: "i" },
      });
    } else {
      updateData = await StudentModel.countDocuments();
    }

    let totalPage = Math.ceil(updateData / limit);

    res.send({ data, totalPage });
  } catch (error) {
    res.send(error);
  }
};

exports.searchData = async (req, res) => {
  try {
    let text = req.query.name;
    let data = await StudentModel.find({
      name: { $regex: text, $options: "i" },
    });
    res.send({ data });
  } catch (error) {
    res.send(error);
  }
};

exports.paginationData = async (req, res) => {
  try {
    let actiPage = parseInt(req.query.actiPage);
    if (actiPage == 0) {
      actiPage = 1;
    } else {
      actiPage = parseInt(req.query.actiPage);
    }
    let limit = parseInt(req.query.limit);
    const skip = (actiPage - 1) * limit;
    const posts = await StudentModel.countDocuments();
    let totalPage = Math.ceil(posts / limit);
    if (totalPage == 0 && actiPage == 1) {
      totalPage = 1;
    } else {
      totalPage = Math.ceil(posts / limit);
    }

    let data = await StudentModel.find().skip(skip).limit(limit);
    res.send({
      actiPage,
      totalPage,
      data,
      posts
    });
  } catch (error) {
    res.send(error);
  }
};

exports.searchPaginationData = async (req, res) => {
  try {
    const actiPage = parseInt(req.query.actiPage);
   
    const limit = parseInt(req.query.limit);
    let textSearch = req.query.name;

    const skip = (actiPage - 1) * limit;
    let totalSearch = await StudentModel.countDocuments({
      name: { $regex: textSearch, $options: "i" },
    });
    let totalPage = Math.ceil(totalSearch / limit);
   

    let data = await StudentModel.find({
      name: { $regex: textSearch, $options: "i" },
    })
      .skip(skip)
      .limit(limit);
    res.send({
      actiPage,
      totalSearch,
      totalPage,
      data,
      textSearch,
    });
  } catch (error) {
    res.send(error);
  }
};
