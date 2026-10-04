const express = require("express");
const {
  listMaterials,
  getMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial
} = require("../controllers/materialController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/", listMaterials);
router.get("/:id", getMaterial);
router.post("/", protect, createMaterial);
router.put("/:id", protect, updateMaterial);
router.delete("/:id", protect, authorize("admin"), deleteMaterial);

module.exports = router;
