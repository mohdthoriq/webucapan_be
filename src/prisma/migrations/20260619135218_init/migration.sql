-- CreateEnum
CREATE TYPE "GreetingStatus" AS ENUM ('draft', 'published', 'expired', 'deleted');

-- CreateEnum
CREATE TYPE "MusicSource" AS ENUM ('library', 'upload');

-- CreateTable
CREATE TABLE "effects" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "effects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" UUID NOT NULL,
    "file_name" VARCHAR(255),
    "file_url" TEXT NOT NULL,
    "file_type" VARCHAR(50),
    "mime_type" VARCHAR(100),
    "file_size" BIGINT,
    "storage_path" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "greetings" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(8) NOT NULL,
    "recipient_name" VARCHAR(255) NOT NULL,
    "occasion" VARCHAR(100) NOT NULL,
    "message" TEXT NOT NULL,
    "sender_name" VARCHAR(255) NOT NULL,
    "theme_id" VARCHAR(50) NOT NULL,
    "music_source" "MusicSource" NOT NULL DEFAULT 'library',
    "music_id" UUID,
    "uploaded_music_file_id" UUID,
    "thumbnail_file_id" UUID,
    "status" "GreetingStatus" NOT NULL DEFAULT 'draft',
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "share_count" INTEGER NOT NULL DEFAULT 0,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "greetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "greeting_photos" (
    "id" UUID NOT NULL,
    "greeting_id" UUID NOT NULL,
    "file_id" UUID NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 1,
    "caption" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "greeting_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "greeting_settings" (
    "greeting_id" UUID NOT NULL,
    "autoplay_music" BOOLEAN NOT NULL DEFAULT true,
    "show_confetti" BOOLEAN NOT NULL DEFAULT true,
    "show_slideshow" BOOLEAN NOT NULL DEFAULT true,
    "allow_download_photo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "greeting_settings_pkey" PRIMARY KEY ("greeting_id")
);

-- CreateTable
CREATE TABLE "greeting_shares" (
    "id" UUID NOT NULL,
    "greeting_id" UUID NOT NULL,
    "platform" VARCHAR(50) NOT NULL,
    "shared_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "greeting_shares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "greeting_views" (
    "id" UUID NOT NULL,
    "greeting_id" UUID NOT NULL,
    "ip_address" VARCHAR(255),
    "user_agent" TEXT,
    "referrer" TEXT,
    "viewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "greeting_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "musics" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "file_url" TEXT NOT NULL,
    "duration_seconds" INTEGER,
    "category" VARCHAR(100),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "musics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "themes" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "emoji" VARCHAR(10),
    "background_gradient" TEXT NOT NULL,
    "confetti_colors" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "theme_effects" (
    "theme_id" VARCHAR(50) NOT NULL,
    "effect_id" UUID NOT NULL,

    CONSTRAINT "theme_effects_pkey" PRIMARY KEY ("theme_id","effect_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "effects_code_key" ON "effects"("code");

-- CreateIndex
CREATE UNIQUE INDEX "greetings_slug_key" ON "greetings"("slug");

-- CreateIndex
CREATE INDEX "greetings_slug_idx" ON "greetings"("slug");

-- CreateIndex
CREATE INDEX "greetings_theme_id_idx" ON "greetings"("theme_id");

-- CreateIndex
CREATE INDEX "greetings_created_at_idx" ON "greetings"("created_at");

-- CreateIndex
CREATE INDEX "greeting_photos_greeting_id_idx" ON "greeting_photos"("greeting_id");

-- CreateIndex
CREATE INDEX "greeting_shares_greeting_id_idx" ON "greeting_shares"("greeting_id");

-- CreateIndex
CREATE INDEX "greeting_views_greeting_id_idx" ON "greeting_views"("greeting_id");

-- CreateIndex
CREATE INDEX "greeting_views_viewed_at_idx" ON "greeting_views"("viewed_at");

-- AddForeignKey
ALTER TABLE "greetings" ADD CONSTRAINT "greetings_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "greetings" ADD CONSTRAINT "greetings_music_id_fkey" FOREIGN KEY ("music_id") REFERENCES "musics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "greetings" ADD CONSTRAINT "greetings_uploaded_music_file_id_fkey" FOREIGN KEY ("uploaded_music_file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "greetings" ADD CONSTRAINT "greetings_thumbnail_file_id_fkey" FOREIGN KEY ("thumbnail_file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "greeting_photos" ADD CONSTRAINT "greeting_photos_greeting_id_fkey" FOREIGN KEY ("greeting_id") REFERENCES "greetings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "greeting_photos" ADD CONSTRAINT "greeting_photos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "greeting_settings" ADD CONSTRAINT "greeting_settings_greeting_id_fkey" FOREIGN KEY ("greeting_id") REFERENCES "greetings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "greeting_shares" ADD CONSTRAINT "greeting_shares_greeting_id_fkey" FOREIGN KEY ("greeting_id") REFERENCES "greetings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "greeting_views" ADD CONSTRAINT "greeting_views_greeting_id_fkey" FOREIGN KEY ("greeting_id") REFERENCES "greetings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theme_effects" ADD CONSTRAINT "theme_effects_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theme_effects" ADD CONSTRAINT "theme_effects_effect_id_fkey" FOREIGN KEY ("effect_id") REFERENCES "effects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
