const router = require("express").Router();

const {
  getVisitors,
  getVisitorByID,
  createVisitor,
  updateVisitor,
  deleteVisitor,
} = require("../controllers/visitors");

router.get("/library/visitors", getVisitors);
router.get("/library/visitors/:visitor_id", getVisitorByID);

router.post("/library/visitors/new-member", createVisitor);

router.patch("/library/modification/visitors/:visitor_id", updateVisitor);

router.delete("/library/removal/visitors/:visitor_id", deleteVisitor);

module.exports = router;
