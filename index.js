import express from "express";
import cors from "cors";
const app = express();
const exportFunc = require("./stripe-exports");
const PORT = process.env.PORT || 19132;

// JSON ボディをパース
app.use(express.json());

// CORS 設定（あとで origin を絞る）
app.use(
  cors({
    origin: true, // とりあえず全部許可。運用時は配列で絞る
  }),
);

// ヘルスチェック用
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Contact API
app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: "name, email, message は必須です",
    });
  }

  console.log("=== New contact ===");
  console.log("Name   :", name);
  console.log("Email  :", email);
  console.log("Subject:", subject || "(no subject)");
  console.log("Message:\n", message);
  console.log("===================");

  // TODO: ここにメール送信やログ保存を足す
  return res.json({ ok: true });
});

app.post("/stripe-create-customer", function (req, res) {
  exportFunc.stripe_create_customer(req.body.email);
  res.send("Created a customer.\n");
  console.log("Created a customer.");
});
app.post("/stripe-create-card", function (req, res) {
  exportFunc.stripe_create_card(
    req.body.customer_id,
    req.body.card_num,
    req.body.card_month,
    req.body.card_year,
    req.body.card_cvc,
  );
  res.send("Created a card.\n");
  console.log("Created a card.");
});
app.post("/stripe-charge", function (req, res) {
  exportFunc.stripe_charge(
    req.body.price,
    req.body.description,
    req.body.customer_id,
  );
  res.send("Created a charge.\n");
  console.log("Created a charge.");
});

// サーバ起動
app.listen(PORT, () => {
  console.log(`Contact API listening on port ${PORT}`);
});
