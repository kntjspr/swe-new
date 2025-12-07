import { Pool } from "pg";

// Create a connection pool using the DATABASE_URL from environment
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
    const client = await pool.connect();
    try {
        const result = await client.query(text, params);
        return result.rows as T[];
    } finally {
        client.release();
    }
}

export async function queryOne<T>(
    text: string,
    params?: unknown[]
): Promise<T | null> {
    const rows = await query<T>(text, params);
    return rows[0] || null;
}

// Initialize the database schema
export async function initializeDatabase(): Promise<void> {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS workouts (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      muscles TEXT[] NOT NULL,
      equipment TEXT[] NOT NULL,
      duration INTEGER NOT NULL,
      difficulty VARCHAR(50) NOT NULL,
      exercises JSONB NOT NULL,
      estimated_calories INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      completed_at TIMESTAMP WITH TIME ZONE
    );

    CREATE INDEX IF NOT EXISTS idx_workouts_user_id ON workouts(user_id);
    CREATE INDEX IF NOT EXISTS idx_workouts_created_at ON workouts(created_at);
  `;

    await query(createTableQuery);
}

export default pool;
