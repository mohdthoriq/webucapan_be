import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary";
import fs from "fs";
import path from "path";

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

        return {
            folder: "uploads",
            public_id: uniqueSuffix,
            resource_type: "image",
        };
    },
});

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        cb(new Error("File must be an image"));
    }
    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
});

// Configure disk storage for music files
const musicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "public/uploads/music";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const musicFilter: multer.Options["fileFilter"] = (req, file, cb) => {
    if (!file.mimetype.startsWith("audio/")) {
        cb(new Error("File must be an audio file"));
    }
    cb(null, true);
};

export const uploadMusic = multer({
    storage: musicStorage,
    fileFilter: musicFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
});

