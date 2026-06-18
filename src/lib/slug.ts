import { prisma } from './prisma'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789'
const SLUG_LENGTH = 8

function randomSlug(): string {
  let result = ''
  for (let i = 0; i < SLUG_LENGTH; i++) {
    result += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return result
}

/**
 * Generate a unique slug that doesn't exist in the greetings table yet.
 * Retries up to 5 times before throwing.
 */
export async function generateUniqueSlug(): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = randomSlug()
    const existing = await prisma.greeting.findUnique({ where: { slug } })
    if (!existing) return slug
  }
  throw new Error('Gagal generate slug unik setelah 5 percobaan')
}

/**
 * Greeting link expires 30 days after creation.
 */
export function expiresAt(): Date {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d
}
