import cors from "cors";
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const server = express();
const filename = fileURLToPath(import.meta.url);
const DIRNAME = dirname(filename);

server.use(cors());

server.use(express.static(join(DIRNAME, "dist")));

server.use("/", (req, res) => {
  res.sendFile(join(DIRNAME, "dist", "index.html"));
});

//s
server.listen(3000, () => {
  console.log("running");
});
