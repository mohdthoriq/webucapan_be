import app from "./app";
import { env } from './utils/env'

app.listen(env.PORT, () => {
    console.log(`Server running at → ${env.HOST}`);
    console.log(`Coba buka semua route di atas pakai Postman!`);
});