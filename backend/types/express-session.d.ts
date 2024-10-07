// types/express-session.d.ts
import 'express-session';
import 'path'

interface User {
  userId: number;
  name: string;
  email: string;
  role: string;
  phone?: string; // optional
  // tambahkan properti lain sesuai kebutuhan
}


declare module 'express-session' {
  interface SessionData {
    userId?: string; // Menambahkan properti kustom userId dengan tipe number
  }
}

declare module 'express' {
  export interface Request {
    userId?: Number; // Menambahkan properti userId ke Request
    role?: string;
    user?: User;
    
  }
}

declare module 'path' {
  export interface Request {
  files?: string
  }
}