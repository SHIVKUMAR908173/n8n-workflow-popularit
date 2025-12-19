import { initDb, db } from "../src/db/index.js";

initDb();
db.close();
console.log("Migration complete: workflows table ready");
