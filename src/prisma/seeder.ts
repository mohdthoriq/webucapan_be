/**
 * prisma/seed.ts
 *
 * Database seeder – Greeting Card Platform
 * Menggunakan @faker-js/faker
 *
 * Setup:
 *   npm install -D @faker-js/faker ts-node
 *
 * package.json:
 *   "prisma": { "seed": "ts-node prisma/seed.ts" }
 *
 * Jalankan:
 *   npx prisma db seed
 */

import { prisma } from "../config/prisma"
import { faker } from "@faker-js/faker";


// ─── Helpers ──────────────────────────────────────────────────────────────────

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

/** Buat slug 8 karakter alphanumeric (unik dari Set) */
function makeSlug(usedSlugs: Set<string>): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let slug: string;
  do {
    slug = Array.from({ length: 8 }, () => pick([...chars])).join("");
  } while (usedSlugs.has(slug));
  usedSlugs.add(slug);
  return slug;
}

/** Fake CDN URL untuk image */
function fakeImageUrl(seed: string): string {
  return `https://cdn.example.com/images/${seed}-${faker.string.alphanumeric(10)}.jpg`;
}

/** Fake CDN URL untuk audio */
function fakeAudioUrl(filename: string): string {
  return `https://cdn.example.com/music/${filename}`;
}

// ─── Static pools ─────────────────────────────────────────────────────────────

const OCCASIONS = [
  "Ulang Tahun",
  "Pernikahan",
  "Wisuda",
  "Hari Jadi",
  "Idul Fitri",
  "Natal",
  "Tahun Baru",
  "Kelulusan",
  "Perpisahan",
  "Baby Shower",
  "Promosi Kerja",
  "Hari Ibu",
  "Hari Ayah",
  "Valentine",
] as const;

const SENDER_NAMES = [
  "Keluarga Besar Santoso", "Teman-Teman SMA", "Rekan Kerja Divisi Marketing",
  "Sahabat Karib", "Tim Project Alpha", "Keluarga Wijaya", "Geng Kopi Sore",
  "Squad Traveling", "Alumni Angkatan 2018", "Komunitas Fotografi",
  "Bapak & Ibu Hartono", "Grup Arisan RT 05",
];

const RECIPIENT_NAMES = [
  "Budi Santoso", "Siti Rahayu", "Ahmad Fauzi", "Dewi Lestari",
  "Rizky Pratama", "Nurul Hidayah", "Dian Permata", "Fajar Nugroho",
  "Anisa Putri", "Hendra Kurniawan", "Maya Sari", "Eko Prasetyo",
  "Fitri Handayani", "Galih Wicaksono", "Hana Pertiwi",
];

const MESSAGES = [
  "Semoga hari-harimu selalu dipenuhi kebahagiaan dan keberkahan. Selamat merayakan momen spesial ini!",
  "Terima kasih sudah menjadi bagian penting dalam hidup kami. Semoga semua impianmu terwujud.",
  "Di momen istimewa ini, kami mendoakan yang terbaik untukmu. Teruslah bersinar!",
  "Kehadiranmu selalu membawa keceriaan. Semoga momen ini menjadi kenangan indah seumur hidup.",
  "Dengan penuh rasa syukur dan cinta, kami turut merayakan momen bahagiamu ini.",
  "Selamat! Pencapaianmu luar biasa. Semoga langkah selanjutnya lebih gemilang.",
  "Tumbuh dan berkembanglah, karena kamu luar biasa. Selamat di hari yang istimewa ini!",
  "Terima kasih atas setiap kenangan indah yang telah kita ciptakan bersama. Semoga selalu sehat dan bahagia.",
];

const PLATFORMS = ["whatsapp", "instagram", "telegram", "twitter", "facebook", "copy_link"] as const;

const USER_AGENTS = [
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
  "Mozilla/5.0 (Android 13; Mobile; rv:109.0) Gecko/109.0 Firefox/109.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0",
  "Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36 Chrome/119.0.0.0",
];

const REFERRERS = [
  "https://wa.me", "https://instagram.com", "https://t.me",
  "https://google.com", "https://twitter.com", null, null, null,
];

const MUSIC_CATEGORIES = ["Pop", "Instrumental", "Jazz", "Classical", "Acoustic", "Cinematic"] as const;

const MUSIC_TITLES = [
  "Happy Birthday Jazz Version",
  "Wedding March Orchestral",
  "Graduation Day Acoustic",
  "Eid Mubarak Nasheed",
  "New Year Countdown Beats",
  "Love Story Piano Cover",
  "Celebration Fanfare",
  "Gentle Morning Light",
  "Romantic Strings",
  "Pop Birthday Remix",
  "Acoustic Guitar Serenade",
  "Cinematic Triumph",
  "Soft Lullaby",
  "Upbeat Party Mix",
  "Emotional Piano Ballad",
];

const EFFECT_NAMES = [
  { name: "Confetti Rain",   code: "confetti_rain"   },
  { name: "Fireworks",       code: "fireworks"        },
  { name: "Falling Petals",  code: "falling_petals"   },
  { name: "Bubble Float",    code: "bubble_float"     },
  { name: "Star Sparkle",    code: "star_sparkle"     },
  { name: "Snow Fall",       code: "snow_fall"        },
  { name: "Heart Float",     code: "heart_float"      },
  { name: "Balloon Rise",    code: "balloon_rise"     },
] as const;

const THEMES = [
  {
    id:                  "birthday-warm",
    name:                "Birthday Warm",
    emoji:               "🎂",
    background_gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
    confetti_colors:     ["#FF6B6B", "#FFE66D", "#4ECDC4", "#45B7D1", "#96CEB4"],
    effectCodes:         ["confetti_rain", "balloon_rise", "star_sparkle"],
  },
  {
    id:                  "wedding-elegant",
    name:                "Wedding Elegant",
    emoji:               "💍",
    background_gradient: "linear-gradient(135deg, #FDFBFB 0%, #EBEDEE 100%)",
    confetti_colors:     ["#C9A96E", "#FFFFFF", "#F5E6D3", "#D4B896"],
    effectCodes:         ["falling_petals", "heart_float"],
  },
  {
    id:                  "graduation-proud",
    name:                "Graduation Proud",
    emoji:               "🎓",
    background_gradient: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
    confetti_colors:     ["#E94560", "#0F3460", "#FFD700", "#FFFFFF"],
    effectCodes:         ["confetti_rain", "fireworks", "star_sparkle"],
  },
  {
    id:                  "eid-festive",
    name:                "Eid Festive",
    emoji:               "🌙",
    background_gradient: "linear-gradient(135deg, #0D1B2A 0%, #1B4332 100%)",
    confetti_colors:     ["#FFD700", "#00B4D8", "#90E0EF", "#CAF0F8"],
    effectCodes:         ["star_sparkle", "bubble_float"],
  },
  {
    id:                  "christmas-joy",
    name:                "Christmas Joy",
    emoji:               "🎄",
    background_gradient: "linear-gradient(135deg, #1B5E20 0%, #B71C1C 100%)",
    confetti_colors:     ["#FFFFFF", "#FFD700", "#E53935", "#43A047"],
    effectCodes:         ["snow_fall", "confetti_rain"],
  },
  {
    id:                  "new-year-blast",
    name:                "New Year Blast",
    emoji:               "🎆",
    background_gradient: "linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 100%)",
    confetti_colors:     ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    effectCodes:         ["fireworks", "confetti_rain", "star_sparkle"],
  },
  {
    id:                  "anniversary-rose",
    name:                "Anniversary Rose",
    emoji:               "🌹",
    background_gradient: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
    confetti_colors:     ["#FF6B9D", "#FF9A9E", "#FECFEF", "#FFFFFF"],
    effectCodes:         ["heart_float", "falling_petals"],
  },
  {
    id:                  "baby-shower-pastel",
    name:                "Baby Shower Pastel",
    emoji:               "👶",
    background_gradient: "linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)",
    confetti_colors:     ["#A8EDEA", "#FED6E3", "#FFECD2", "#FCB69F"],
    effectCodes:         ["bubble_float", "balloon_rise", "star_sparkle"],
  },
] as const;

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Starting Greeting Card Platform seeder...\n");

  // ════════════════════════════════════════════════════════════════════════════
  // 1. EFFECTS (8 efek animasi)
  // ════════════════════════════════════════════════════════════════════════════
  console.log("✨ Seeding effects...");

  type CreatedEffect = Awaited<ReturnType<typeof prisma.effect.create>>;
  const effects: CreatedEffect[] = [];

  for (const e of EFFECT_NAMES) {
    const effect = await prisma.effect.create({
      data: {
        name:       e.name,
        code:       e.code,
        created_at: faker.date.past({ years: 1 }),
      },
    });
    effects.push(effect);
  }

  // Map code → id untuk referensi di bawah
  const effectByCode = new Map(effects.map((e) => [e.code, e]));

  console.log(`   ✅ ${effects.length} effects`);

  // ════════════════════════════════════════════════════════════════════════════
  // 2. THEMES (8 tema) + THEME_EFFECTS
  // ════════════════════════════════════════════════════════════════════════════
  console.log("🎨 Seeding themes + theme_effects...");

  type CreatedTheme = Awaited<ReturnType<typeof prisma.theme.create>>;
  const themes: CreatedTheme[] = [];

  for (const t of THEMES) {
    const theme = await prisma.theme.create({
      data: {
        id:                  t.id,
        name:                t.name,
        emoji:               t.emoji,
        background_gradient: t.background_gradient,
        confetti_colors:     t.confetti_colors,
        is_active:           true,
        created_at:          faker.date.past({ years: 1 }),
        updated_at:          new Date(),
      },
    });
    themes.push(theme);

    // Hubungkan theme dengan effects
    for (const code of t.effectCodes) {
      const effect = effectByCode.get(code);
      if (!effect) continue;
      await prisma.themeEffect.create({
        data: {
          theme_id:  theme.id,
          effect_id: effect.id,
        },
      });
    }
  }

  console.log(`   ✅ ${themes.length} themes`);

  // ════════════════════════════════════════════════════════════════════════════
  // 3. MUSIC LIBRARY (15 lagu)
  // ════════════════════════════════════════════════════════════════════════════
  console.log("🎵 Seeding music library...");

  type CreatedMusic = Awaited<ReturnType<typeof prisma.music.create>>;
  const musicList: CreatedMusic[] = [];

  for (const title of MUSIC_TITLES) {
    const music = await prisma.music.create({
      data: {
        title,
        file_url:         fakeAudioUrl(`${title.toLowerCase().replace(/\s+/g, "-")}.mp3`),
        duration_seconds: faker.number.int({ min: 60, max: 300 }),
        category:         pick(MUSIC_CATEGORIES),
        is_active:        faker.datatype.boolean({ probability: 0.95 }),
        created_at:       faker.date.past({ years: 1 }),
        updated_at:       new Date(),
      },
    });
    musicList.push(music);
  }

  console.log(`   ✅ ${musicList.length} music tracks`);

  // ════════════════════════════════════════════════════════════════════════════
  // 4. FILES (untuk foto & thumbnail, dibuat on-demand di bawah)
  //    Kita buat pool file dummy terlebih dahulu (50 file image)
  // ════════════════════════════════════════════════════════════════════════════
  console.log("📁 Seeding file pool...");

  type CreatedFile = Awaited<ReturnType<typeof prisma.file.create>>;
  const filePool: CreatedFile[] = [];

  for (let i = 0; i < 50; i++) {
    const ext        = pick(["jpg", "jpeg", "png", "webp"] as const);
    const fileName   = `photo-${faker.string.alphanumeric(12)}.${ext}`;
    const mimeType   = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
    const fileSize   = BigInt(faker.number.int({ min: 100_000, max: 5_000_000 }));

    const file = await prisma.file.create({
      data: {
        file_name:    fileName,
        file_url:     fakeImageUrl(faker.string.alphanumeric(8)),
        file_type:    "image",
        mime_type:    mimeType,
        file_size:    fileSize,
        storage_path: `uploads/images/${fileName}`,
        created_at:   faker.date.past({ years: 1 }),
      },
    });
    filePool.push(file);
  }

  console.log(`   ✅ ${filePool.length} files`);

  // ════════════════════════════════════════════════════════════════════════════
  // 5. GREETINGS (100 ucapan)
  //    Distribusi status: 70% published, 15% draft, 10% expired, 5% deleted
  // ════════════════════════════════════════════════════════════════════════════
  console.log("💌 Seeding greetings (100)...");

  const usedSlugs       = new Set<string>();
  const statusWeights   = [
    { weight: 70, value: "published" as const },
    { weight: 15, value: "draft"     as const },
    { weight: 10, value: "expired"   as const },
    { weight: 5,  value: "deleted"   as const },
  ];

  type CreatedGreeting = Awaited<ReturnType<typeof prisma.greeting.create>>;
  const greetings: CreatedGreeting[] = [];

  for (let i = 0; i < 100; i++) {
    const status       = faker.helpers.weightedArrayElement(statusWeights);
    const musicSource  = faker.helpers.weightedArrayElement([
      { weight: 80, value: "library" as const },
      { weight: 20, value: "upload"  as const },
    ]);
    const theme        = pick(themes);
    const createdAt    = faker.date.past({ years: 1 });

    // Music
    const musicId              = musicSource === "library" ? pick(musicList).id : null;
    const uploadedMusicFileId  = musicSource === "upload"  ? pick(filePool).id  : null;

    // Thumbnail (75% punya thumbnail)
    const thumbnailFileId = faker.datatype.boolean({ probability: 0.75 })
      ? pick(filePool).id
      : null;

    // Expired at (hanya published & expired yang punya)
    let expiresAt: Date | null = null;
    if (status === "published") {
      expiresAt = faker.helpers.maybe(
        () => faker.date.future({ years: 1 }),
        { probability: 0.4 }
      ) ?? null;
    } else if (status === "expired") {
      expiresAt = faker.date.past({ years: 0.5 });
    }

    const viewCount  = status === "published" ? faker.number.int({ min: 0, max: 5000 }) : 0;
    const shareCount = status === "published" ? faker.number.int({ min: 0, max: Math.floor(viewCount / 3) }) : 0;

    const greeting = await prisma.greeting.create({
      data: {
        slug:                   makeSlug(usedSlugs),
        recipient_name:         pick(RECIPIENT_NAMES),
        occasion:               pick(OCCASIONS),
        message:                pick(MESSAGES),
        sender_name:            pick(SENDER_NAMES),
        theme_id:               theme.id,
        music_source:           musicSource,
        music_id:               musicId,
        uploaded_music_file_id: uploadedMusicFileId,
        thumbnail_file_id:      thumbnailFileId,
        status,
        view_count:             viewCount,
        share_count:            shareCount,
        expires_at:             expiresAt,
        created_at:             createdAt,
        updated_at:             faker.date.between({ from: createdAt, to: new Date() }),
      },
    });

    greetings.push(greeting);
  }

  console.log(`   ✅ ${greetings.length} greetings`);

  // ════════════════════════════════════════════════════════════════════════════
  // 6. GREETING PHOTOS (1–5 foto per greeting, khusus yang punya konten)
  // ════════════════════════════════════════════════════════════════════════════
  console.log("📸 Seeding greeting photos...");

  const PHOTO_CAPTIONS = [
    "Momen bersama yang tak terlupakan",
    "Kenangan indah bersama",
    "Senyum termanis di hari istimewa",
    "Bersama dalam suka dan duka",
    "Potret kebahagiaan",
    null, null, // beberapa tanpa caption
  ];

  let photoCount = 0;

  for (const greeting of greetings) {
    if (greeting.status === "deleted") continue; // skip deleted
    if (Math.random() < 0.1) continue;           // 10% tanpa foto

    const count = faker.number.int({ min: 1, max: 5 });
    const usedFileIds = new Set<string>();

    for (let p = 0; p < count; p++) {
      // Pilih file yang belum dipakai di greeting ini
      let file: CreatedFile;
      let attempts = 0;
      do {
        file = pick(filePool);
        attempts++;
      } while (usedFileIds.has(file.id) && attempts < 20);

      usedFileIds.add(file.id);

      await prisma.greetingPhoto.create({
        data: {
          greeting_id:   greeting.id,
          file_id:       file.id,
          display_order: p + 1,
          caption:       pick(PHOTO_CAPTIONS),
          created_at:    greeting.created_at,
        },
      });
      photoCount++;
    }
  }

  console.log(`   ✅ ${photoCount} greeting photos`);

  // ════════════════════════════════════════════════════════════════════════════
  // 7. GREETING SETTINGS (semua greeting yang tidak deleted)
  // ════════════════════════════════════════════════════════════════════════════
  console.log("⚙️  Seeding greeting settings...");

  let settingCount = 0;

  for (const greeting of greetings) {
    if (greeting.status === "deleted") continue;

    await prisma.greetingSetting.create({
      data: {
        greeting_id:          greeting.id,
        autoplay_music:       faker.datatype.boolean({ probability: 0.85 }),
        show_confetti:        faker.datatype.boolean({ probability: 0.75 }),
        show_slideshow:       faker.datatype.boolean({ probability: 0.9  }),
        allow_download_photo: faker.datatype.boolean({ probability: 0.3  }),
        created_at:           greeting.created_at,
      },
    });
    settingCount++;
  }

  console.log(`   ✅ ${settingCount} greeting settings`);

  // ════════════════════════════════════════════════════════════════════════════
  // 8. GREETING VIEWS (proporsional terhadap view_count)
  //    Hanya published greeting yang punya views; max 20 records per greeting
  // ════════════════════════════════════════════════════════════════════════════
  console.log("👁️  Seeding greeting views...");

  let viewCount = 0;

  for (const greeting of greetings) {
    if (greeting.status !== "published") continue;
    if (greeting.view_count === 0) continue;

    // Simpan max 20 record views per greeting (representatif)
    const recordCount = Math.min(greeting.view_count, faker.number.int({ min: 3, max: 20 }));

    for (let v = 0; v < recordCount; v++) {
      await prisma.greetingView.create({
        data: {
          greeting_id: greeting.id,
          ip_address:  faker.helpers.maybe(() => faker.internet.ipv4(), { probability: 0.8 }) ?? null,
          user_agent:  faker.helpers.maybe(() => pick(USER_AGENTS),       { probability: 0.9 }) ?? null,
          referrer:    pick(REFERRERS as unknown as string[]) ?? null,
          viewed_at:   faker.date.between({
            from: greeting.created_at,
            to:   new Date(),
          }),
        },
      });
      viewCount++;
    }
  }

  console.log(`   ✅ ${viewCount} greeting views`);

  // ════════════════════════════════════════════════════════════════════════════
  // 9. GREETING SHARES (proporsional terhadap share_count)
  // ════════════════════════════════════════════════════════════════════════════
  console.log("🔗 Seeding greeting shares...");

  let shareCount = 0;

  for (const greeting of greetings) {
    if (greeting.status !== "published") continue;
    if (greeting.share_count === 0) continue;

    const recordCount = Math.min(greeting.share_count, faker.number.int({ min: 1, max: 15 }));

    for (let s = 0; s < recordCount; s++) {
      await prisma.greetingShare.create({
        data: {
          greeting_id: greeting.id,
          platform:    pick(PLATFORMS),
          shared_at:   faker.date.between({
            from: greeting.created_at,
            to:   new Date(),
          }),
        },
      });
      shareCount++;
    }
  }

  console.log(`   ✅ ${shareCount} greeting shares`);

  // ════════════════════════════════════════════════════════════════════════════
  // SUMMARY
  // ════════════════════════════════════════════════════════════════════════════
  const byStatus = greetings.reduce((acc, g) => {
    acc[g.status] = (acc[g.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log("\n✨ Seeding complete!\n");
  console.log("   ┌──────────────────────────────────────────┐");
  console.log(`   │  Effects              : ${String(effects.length).padStart(4)}             │`);
  console.log(`   │  Themes               : ${String(themes.length).padStart(4)}             │`);
  console.log(`   │  Music Tracks         : ${String(musicList.length).padStart(4)}             │`);
  console.log(`   │  Files (pool)         : ${String(filePool.length).padStart(4)}             │`);
  console.log(`   │  Greetings (total)    : ${String(greetings.length).padStart(4)}             │`);
  console.log(`   │    ├─ published       : ${String(byStatus["published"] ?? 0).padStart(4)}             │`);
  console.log(`   │    ├─ draft           : ${String(byStatus["draft"] ?? 0).padStart(4)}             │`);
  console.log(`   │    ├─ expired         : ${String(byStatus["expired"] ?? 0).padStart(4)}             │`);
  console.log(`   │    └─ deleted         : ${String(byStatus["deleted"] ?? 0).padStart(4)}             │`);
  console.log(`   │  Greeting Photos      : ${String(photoCount).padStart(4)}             │`);
  console.log(`   │  Greeting Settings    : ${String(settingCount).padStart(4)}             │`);
  console.log(`   │  Greeting Views       : ${String(viewCount).padStart(4)}             │`);
  console.log(`   │  Greeting Shares      : ${String(shareCount).padStart(4)}             │`);
  console.log("   └──────────────────────────────────────────┘\n");
  console.log("   💡 Contoh URL ucapan: /g/{slug-8-karakter}");
  console.log(`   💡 Total slug unik   : ${usedSlugs.size}\n`);
}

// ─── Run ──────────────────────────────────────────────────────────────────────

main()
  .catch((e) => {
    console.error("❌ Seeder failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });