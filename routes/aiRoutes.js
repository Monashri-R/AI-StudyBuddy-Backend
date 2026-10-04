const express = require("express");
const { summary, studyPlan } = require("../controllers/aiController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/summary", protect, summary);
router.post("/study-plan", protect, studyPlan);

module.exports = router;
