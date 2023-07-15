export const DATABASE_URL = process.env.DATABASE_URL;


export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const ADMIN_ACCESS_TOKEN_SECRET = process.env.ADMIN_ACCESS_TOKEN_SECRET;

export const ACCESS_TOKEN_EXPIRATION = 60 * 15; // 15 min
export const REFRESH_TOKEN_EXPIRATION = 60 * 60 * 24; // day


export const ACCESS_TOKEN_SALT = 10;
export const REFRESH_TOKEN_SALT = 5;
