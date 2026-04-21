const asyncHandler = require("express-async-handler");
const {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication
} = require("../services/interviewApplicationService");

exports.createApplication = asyncHandler(async (req, res) => {
  const data = await createApplication(req.user.id, req.body);
  res.status(201).json(data);
});


exports.getApplications = asyncHandler(async (req, res) => {
  const data = await getApplications(req.user.id);
  res.json(data);
});

exports.updateApplication = asyncHandler(async (req, res) => {
  const data = await updateApplication(
    req.user.id,
    req.params.id,
    req.body
  );
  res.json(data);
});

exports.deleteApplication = asyncHandler(async (req, res) => {
  await deleteApplication(req.user.id, req.params.id);
  res.json({ message: "Deleted successfully" });
});