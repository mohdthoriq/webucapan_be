import "dotenv/config.js";
import "./docs/registry.js";
import express, { type Application, type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { successResponse } from "./utils/response";
import { errorHandler } from "./middlewares/error.handler";
import { requestLogger } from "./middlewares/logging.middleware";
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
import { apiReference } from "@scalar/express-api-reference";
import { openApiDocument } from "./docs/generator";

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
app.use(morgan('dev'))
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
        "style-src": ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
        "img-src": ["'self'", "data:", "https://cdn.jsdelivr.net"],
      },
    },
  })
);
// app.use(cors())

app.use(requestLogger);

app.get('/api/v1/docs-json', (_req: Request, res: Response) => {
  res.header('Content-Type', 'application/json');
  res.send(openApiDocument);
});

app.use(
  '/api/docs',
  apiReference({
    url: '/api/v1/docs-json',
  })
);


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


app.get('/favicon.ico', (_req: Request, res: Response) => {
  res.status(204).send();
});

app.get(/.*/, (req: Request, res: Response) => {
  throw new Error(`Route ${req.originalUrl} tidak ada di API E-Commerce`);
})

app.use(errorHandler)

export default app;