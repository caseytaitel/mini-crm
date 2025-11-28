const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// TODO: contacts routes
// TODO: notes routes

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Mini CRM API running on http://localhost:${PORT}`);
});
