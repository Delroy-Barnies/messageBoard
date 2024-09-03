const asyncHandler = require("express-async-handler");

const welomePage = asyncHandler(async (req, res) => {
    res.send("Index Route");
});

module.exports = { welomePage };
