import { Pool } from "pg";

// Pool disimpan di globalThis agar saat hot reload (npm run dev)
// tidak terbentuk pool baru setiap file disimpan.
const globalForPg = globalThis;

const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") globalForPg.pgPool = pool;

export default pool;
