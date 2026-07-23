import app from "./app.js";
import { env } from './utils/env.js';

if (!process.env.VERCEL) {
  app.listen(env.PORT, () => {
    console.log(`Server running at → ${env.HOST}`);
    console.log(`Coba buka semua route di atas pakai Postman!`);
  });
}

export default app;