const { GoogleGenerativeAI } = require("@google/generative-ai");

function getModel() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

async function summary(req, res, next) {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Study text is required" });
    }

    const model = getModel();
    const prompt = `Create a concise, student-friendly summary of the following study material. Use headings and bullet points where useful. Do not invent facts.\n\nStudy material:\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({ summary: response.text() });
  } catch (error) {
    next(error);
  }
}

async function studyPlan(req, res, next) {
  try {
    const { subject, days, goal } = req.body;

    if (!subject || !days || !goal) {
      return res.status(400).json({
        message: "Subject, days and goal are required"
      });
    }

    const model = getModel();
    const prompt = `Create a realistic ${days}-day study plan for a student.
Subject: ${subject}
Goal: ${goal}
Return a day-by-day plan with topics, practice, and a short revision task.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({ studyPlan: response.text() });
  } catch (error) {
    next(error);
  }
}

module.exports = { summary, studyPlan };
