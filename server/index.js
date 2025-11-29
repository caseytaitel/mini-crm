const express = require("express");
const cors = require("cors");

const contactsRoutes = require("./routes/contacts");
const notesRoutes = require("./routes/notes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/notes", notesRoutes);
app.use("/contacts", contactsRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Mini CRM API running on http://localhost:${PORT}`);
});