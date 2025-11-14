// index.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());

// とりあえず全部許可（後で絞る）
app.use(cors());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing fields" });
  }
  console.log("=== New contact ===");
  console.log({ name, email, subject, message });
  console.log("===================");
  return res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Contact API listening on ${PORT}`);
});
