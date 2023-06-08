import { config } from "dotenv";
import path, { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: join(__dirname, "../../.env") });

export default {
  host: "localhost",
  port: process.env.PORT || 3000,
};

