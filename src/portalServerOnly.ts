import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { getDb } from "./portalDb";

const SECRET = "WOODLAND_ACRES_SECRET_HIPAA_KEY";

export function signToken(payload: { userId: number; email: string; role: string }) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: number; email: string; role: string } | null {
  try {
    return jwt.verify(token, SECRET) as any;
  } catch {
    return null;
  }
}

export function hashPassword(password: string): string {
  return bcryptjs.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcryptjs.compareSync(password, hash);
}

export async function queryDb(sql: string, params?: any[]) {
  const db = await getDb();
  if (params) {
    return db.query(sql).all(...params);
  }
  return db.query(sql).all();
}

export async function queryDbOne(sql: string, params?: any[]) {
  const db = await getDb();
  if (params) {
    return db.query(sql).get(...params);
  }
  return db.query(sql).get();
}

export async function runDb(sql: string, params?: any[]) {
  const db = await getDb();
  if (params) {
    return db.run(sql, ...params);
  }
  return db.run(sql);
}