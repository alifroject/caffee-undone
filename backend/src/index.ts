import express, { Request, Response } from 'express';
import cors from 'cors';
import db from './config/Database';
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import fileUpload, { UploadedFile } from 'express-fileupload';
import dotenv from "dotenv";

//impor users
import UserRoute from "./routes/UserRoutes";
import AuthRoute from "./routes/AuthRoute";
import ItemRoute from "./routes/ItemRoutes"

dotenv.config();

const app = express();
app.use(express.json());



// Konfigurasi untuk menyimpan sesi
const sessionStore = SequelizeStore(session.Store); // 
const store = new sessionStore({
    db: db
});

app.use(session({
  secret: process.env.SECRET || 'default', // Default value for testing
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
      secure: 'auto'
  }
}));





const port = 7000;



app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));






(async () => {
  try {
    await db.sync();
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Failed to sync the database:", error);
  }
})();


app.use(fileUpload());
//app use app
app.use(UserRoute)
app.use(AuthRoute)
app.use(ItemRoute)

store.sync(); //membuat table session di dalam database


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
