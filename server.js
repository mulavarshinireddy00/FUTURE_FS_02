const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Lead = require("./models/Lead");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crm");

app.post("/api/leads", async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.json({ message: "Lead Saved" });
});

app.get("/api/leads", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});
app.put("/api/leads/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server Running");
});