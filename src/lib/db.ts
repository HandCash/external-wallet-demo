// db.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { User } from './schema';
import { eq } from 'drizzle-orm';
import { users } from './schema';
import * as dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set in the environment variables.');
}

const pool = new Pool({
  connectionString: databaseUrl,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

export const db = drizzle(pool);


export async function createUser(email: string, passwordHash: string) {
  await db.insert(users).values({ email, passwordHash }).execute();
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .execute();

  return result[0] as User | undefined;
}

export async function updateUserAuthToken(id: number, authToken: string) {
  await db
    .update(users)
    .set({ authToken })
    .where(eq(users.id, id))
    .execute();
}

export async function updateUserWalletCreated(id: number, walletId: string) {
  await db
    .update(users)
    .set({ walletId })
    .where(eq(users.id, id))
    .execute();
}

export async function getUser(id: number): Promise<User | undefined> {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1)
    .execute();

  return result[0] as User | undefined;
}

export async function deleteUserAuth(id: number) {
  await db
    .update(users)
    .set({ authToken: null })
    .where(eq(users.id, id))
    .execute();
}