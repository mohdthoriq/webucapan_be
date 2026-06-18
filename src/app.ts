import "dotenv/config";
import express, { type Application, type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { successResponse } from "./utils/response";
import { errorHandler } from "./middlewares/error.handler";
import { requestLogger } from "./middlewares/logging.middleware";
import swaggerUi from "swagger-ui-express";
import effectRouter from "./routers/effect.router"
import greetingRouter from "./routers/greeting.router"
import fileRouter from "./routers/file.router"
import greetingPhotoRouter from "./routers/greeting-photo.router"
import greetingSettingRouter from "./routers/gretting-setting.router"
import greetingShareRouter from "./routers/gretting-share.router"
import greetingViewRouter from "./routers/greeting-view.router"
import musicRouter from "./routers/music.router"
import themeRouter from "./routers/theme-router"
import themeEffectRouter from "./routers/theme-effect.router"

const app: Application = express()

app.use(
  express.json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(express.static('public'))
app.set('query parser', 'extended')
app.use(morgan('dev')) // Middleware logging HTTP request
// `morgan('dev')`: Middleware logging HTTP request. Format 'dev' memberikan output yang ringkas dan berwarna,
//                 sangat berguna saat pengembangan untuk melihat request yang masuk dan status responsnya.
app.use(helmet()) // Middleware keamanan header
// `helmet()`: Membantu mengamankan aplikasi Express dengan mengatur berbagai HTTP headers.
//             Ini melindungi dari beberapa kerentanan web yang diketahui seperti XSS.
app.use(cors()) // Middleware biar bisa di akses dari frontend
// `cors()`: Memungkinkan atau membatasi resource di server agar dapat diakses oleh domain lain (Cross-Origin Resource Sharing).
//           Sangat penting untuk API yang akan diakses oleh frontend dari domain berbeda.

app.use(requestLogger)

// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.get('/', (_req: Request, res: Response) => {
  successResponse(
    res,
    "Selamat datang di API E-Commerce!"
  )
})

app.use('/api/v1/effect', effectRouter);
app.use('/api/v1/greeting', greetingRouter)
app.use('/api/v1/greeting-photo', greetingPhotoRouter)
app.use('/api/v1/files', fileRouter)
app.use('/api/v1/greeting-setting', greetingSettingRouter)
app.use('/api/v1/greeting-share', greetingShareRouter)
app.use('/api/v1/greeting-view', greetingViewRouter)
app.use('/api/v1/musics', musicRouter)
app.use('/api/v1/themes', themeRouter)
app.use('/api/v1/theme-effect', themeEffectRouter)




app.get(/.*/, (req: Request, res: Response) => {
  throw new Error(`Route ${req.originalUrl} tidak ada di API E-Commerce`);
})

app.use(errorHandler)

export default app;