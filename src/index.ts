import cors from 'cors';
import 'reflect-metadata';
import './config/dbConfig';
import morgan from 'morgan';
import './config/redisConfig';
import express from 'express';
import routes from './routes';
import { Server } from 'http';
import { port } from '../cred.json';
import Logger from './utils/winston';
import JWTService from './utils/token';
import authRoutes from '../src/routes/auth';
import ResMessages from './utils/resMessages';
import errorMiddleware from './middlewares/errorMiddleware';
import { Socket, Server as SocketIOServer } from 'socket.io';

const app = express();
const http = new Server(app);
const io = new SocketIOServer(http);

app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: '*',
    credentials: true,
  })
);
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/upload', express.static('upload'));

app.use(errorMiddleware);
app.use('/auth', authRoutes);
app.use('/api/v1', JWTService.verifyToken, routes);

app.listen(port, () => Logger.info(ResMessages.SERVER_RUNNING + port + '.'));

io.on('connection', (socket: Socket) => {
  Logger.info(ResMessages.USER_CONNECTED);

  socket.on('disconnect', () => {
    Logger.info(ResMessages.USER_DISCONNECTED);
  });
});

// {
//   "baseUrl": "http://localhost:8080",
//   "redisUrl": "redis://127.0.0.1:6379",
//   "jwtExpiresIn": "1h",
//   "accessTokenSecret": "gvjft84gifgnierwr83rsnvsijerhwe9ureth34fn",
//   "port": 8080,
//   "smtp": {
//     "smtpHost": "smtp.gmail.com",
//     "smtpPort": 587,
//     "smtpUser": "nitiril208@gmail.com",
//     "smtpPass": "gtdscvclmzpttujr"
//   },
//   "db": {
//     "dbHost": "aws-0-ap-south-1.pooler.supabase.com",
//     "dbPort": 6543,
//     "dbName": "postgres",
//     "dbUser": "postgres.xlkbjgmaxgvhhllutjzo",
//     "dbPass": "man_patel_555",
//     "dbType": "postgres"
//   }
// }
