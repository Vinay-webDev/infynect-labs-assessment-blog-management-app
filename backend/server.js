import dotenv from "dotenv";
dotenv.config();

import app, { initDb } from "./app.js";

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await initDb();
    console.log("DB synced!");
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (e) {
    console.error("Startup error", e);
    process.exit(1);
  }
})();



