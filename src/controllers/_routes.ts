// =============================================================================
// CONTOH ROUTE FILES — Next.js App Router (app/api/...)
// Salin setiap blok ke file path yang tertera.
// =============================================================================


// -----------------------------------------------------------------------------
// app/api/greetings/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { createGreeting } from '@/controllers/greetingController'

export async function POST(req: NextRequest) {
  return createGreeting(req)
}
*/


// -----------------------------------------------------------------------------
// app/api/greetings/[slug]/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { getGreetingBySlug, deleteGreeting } from '@/controllers/greetingController'

type Params = { params: { slug: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  return getGreetingBySlug(params.slug)
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  return deleteGreeting(params.slug)
}
*/


// -----------------------------------------------------------------------------
// app/api/greetings/[slug]/view/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { trackView } from '@/controllers/greetingController'

type Params = { params: { slug: string } }

export async function POST(req: NextRequest, { params }: Params) {
  return trackView(req, params.slug)
}
*/


// -----------------------------------------------------------------------------
// app/api/greetings/[slug]/share/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { trackShare } from '@/controllers/greetingController'

type Params = { params: { slug: string } }

export async function POST(req: NextRequest, { params }: Params) {
  return trackShare(req, params.slug)
}
*/


// -----------------------------------------------------------------------------
// app/api/files/upload/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { uploadFile } from '@/controllers/fileController'

export async function POST(req: NextRequest) {
  return uploadFile(req)
}
*/


// -----------------------------------------------------------------------------
// app/api/files/upload/batch/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { uploadBatch } from '@/controllers/fileController'

export async function POST(req: NextRequest) {
  return uploadBatch(req)
}
*/


// -----------------------------------------------------------------------------
// app/api/files/[id]/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { getFile, deleteFile } from '@/controllers/fileController'

type Params = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  return getFile(params.id)
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  return deleteFile(params.id)
}
*/


// -----------------------------------------------------------------------------
// app/api/themes/route.ts
// -----------------------------------------------------------------------------
/*
import { listThemes } from '@/controllers/themeController'

export async function GET() {
  return listThemes()
}
*/


// -----------------------------------------------------------------------------
// app/api/themes/[id]/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { getTheme } from '@/controllers/themeController'

type Params = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  return getTheme(params.id)
}
*/


// -----------------------------------------------------------------------------
// app/api/music/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { listMusic } from '@/controllers/musicController'

export async function GET(req: NextRequest) {
  return listMusic(req)
}
*/


// -----------------------------------------------------------------------------
// app/api/music/[id]/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { getMusic } from '@/controllers/musicController'

type Params = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  return getMusic(params.id)
}
*/


// -----------------------------------------------------------------------------
// app/api/effects/route.ts
// -----------------------------------------------------------------------------
/*
import { listEffects } from '@/controllers/effectController'

export async function GET() {
  return listEffects()
}
*/


// -----------------------------------------------------------------------------
// app/api/admin/stats/route.ts
// -----------------------------------------------------------------------------
/*
import { getDashboardStats } from '@/controllers/adminController'

export async function GET() {
  return getDashboardStats()
}
*/


// -----------------------------------------------------------------------------
// app/api/admin/greetings/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { listAllGreetings } from '@/controllers/adminController'

export async function GET(req: NextRequest) {
  return listAllGreetings(req)
}
*/


// -----------------------------------------------------------------------------
// app/api/admin/greetings/[slug]/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { getGreetingDetail } from '@/controllers/adminController'

type Params = { params: { slug: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  return getGreetingDetail(params.slug)
}
*/


// -----------------------------------------------------------------------------
// app/api/admin/themes/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { createTheme } from '@/controllers/themeController'

export async function POST(req: NextRequest) {
  return createTheme(req)
}
*/


// -----------------------------------------------------------------------------
// app/api/admin/themes/[id]/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { updateTheme, deleteTheme } from '@/controllers/themeController'

type Params = { params: { id: string } }

export async function PATCH(req: NextRequest, { params }: Params) {
  return updateTheme(req, params.id)
}
export async function DELETE(_req: NextRequest, { params }: Params) {
  return deleteTheme(params.id)
}
*/


// -----------------------------------------------------------------------------
// app/api/admin/music/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { createMusic } from '@/controllers/musicController'

export async function POST(req: NextRequest) {
  return createMusic(req)
}
*/


// -----------------------------------------------------------------------------
// app/api/admin/music/[id]/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { updateMusic, deleteMusic } from '@/controllers/musicController'

type Params = { params: { id: string } }

export async function PATCH(req: NextRequest, { params }: Params) {
  return updateMusic(req, params.id)
}
export async function DELETE(_req: NextRequest, { params }: Params) {
  return deleteMusic(params.id)
}
*/


// -----------------------------------------------------------------------------
// app/api/admin/effects/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { createEffect } from '@/controllers/effectController'

export async function POST(req: NextRequest) {
  return createEffect(req)
}
*/


// -----------------------------------------------------------------------------
// app/api/admin/effects/[id]/route.ts
// -----------------------------------------------------------------------------
/*
import { NextRequest } from 'next/server'
import { updateEffect, deleteEffect } from '@/controllers/effectController'

type Params = { params: { id: string } }

export async function PATCH(req: NextRequest, { params }: Params) {
  return updateEffect(req, params.id)
}
export async function DELETE(_req: NextRequest, { params }: Params) {
  return deleteEffect(params.id)
}
*/
