const StudyMaterial = require("../models/StudyMaterial");

async function listMaterials(req, res, next) {
  try {
    const materials = await StudyMaterial.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(materials);
  } catch (error) {
    next(error);
  }
}

async function getMaterial(req, res, next) {
  try {
    const material = await StudyMaterial.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!material) {
      return res.status(404).json({ message: "Study material not found" });
    }

    res.json(material);
  } catch (error) {
    next(error);
  }
}

async function createMaterial(req, res, next) {
  try {
    const { title, subject, content } = req.body;

    if (!title || !subject || !content) {
      return res.status(400).json({
        message: "Title, subject and content are required"
      });
    }

    const material = await StudyMaterial.create({
      title,
      subject,
      content,
      createdBy: req.user._id
    });

    res.status(201).json(material);
  } catch (error) {
    next(error);
  }
}

async function updateMaterial(req, res, next) {
  try {
    const material = await StudyMaterial.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ message: "Study material not found" });
    }

    if (
      material.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "You cannot edit this material" });
    }

    const { title, subject, content } = req.body;
    material.title = title ?? material.title;
    material.subject = subject ?? material.subject;
    material.content = content ?? material.content;

    await material.save();
    res.json(material);
  } catch (error) {
    next(error);
  }
}

async function deleteMaterial(req, res, next) {
  try {
    const material = await StudyMaterial.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ message: "Study material not found" });
    }

    await material.deleteOne();
    res.json({ message: "Study material deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listMaterials,
  getMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial
};
