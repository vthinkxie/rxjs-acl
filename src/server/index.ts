import express from "express";
import bodyParser from "body-parser";
import { randomUUID } from "crypto";

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const free = +(Math.random() * 500).toFixed(2);
const usage = +(Math.random() * 500).toFixed(2);

app.get("/api/v1/memory/free", function (req, res) {
  return res.json(free);
});

app.get("/api/v1/memory/usage", function (req, res) {
  return res.json(usage);
});

app.get("/api/v2/memory/free", function (req, res) {
  return res.json({ requestId: randomUUID(), data: { free } });
});

app.get("/api/v2/memory/usage", function (req, res) {
  return res.json({ requestId: randomUUID(), data: { usage } });
});

app.get("/api/v3/memory", function (req, res) {
  return res.json({ requestId: randomUUID(), data: { free, usage } });
});

const port = 3001;
console.log("checking port", port);
app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});
