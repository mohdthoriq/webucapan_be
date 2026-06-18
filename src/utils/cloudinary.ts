import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";

cloudinary.config({
  cloud_name: String(env.CLOUDINARY_CLOUD_NAME),
  api_key: String(env.CLOUDINARY_API_KEY),
  api_secret: String(env.CLOUDINARY_API_SECRET),
});

export default cloudinary;
