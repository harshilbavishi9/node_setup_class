import cors from 'cors';
import 'reflect-metadata';
import './config/dbConfig';
import morgan from 'morgan';
import './config/redisConfig';
import express from 'express';
import routes from './routes';
import { Server } from 'http';
import { appConfig } from './config/appConfig';
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

app.use('/api/v1', routes);
app.use(errorMiddleware);

app.listen(appConfig.port, () => console.log(ResMessages.SERVER_RUNNING + appConfig.port + '.'));

io.on('connection', (socket: Socket) => {
  console.log(ResMessages.USER_CONNECTED);

  socket.on('disconnect', () => {
    console.log(ResMessages.USER_DISCONNECTED);
  });
});

// PORT = 8080
// DB_PORT = 6543
// SMTP_PORT = 587
// DB_NAME = postgres
// DB_TYPE = postgres
// JWT_EXPIRES_IN = 1h
// DB_PASS = man_patel_555
// SMTP_HOST = smtp.gmail.com
// SMTP_PASS = gtdscvclmzpttujr
// SMTP_USER = nitiril208@gmail.com
// BASE_URL = http://localhost:8080
// REDIS_URL = redis://127.0.0.1:6379
// DB_USER = postgres.xlkbjgmaxgvhhllutjzo
// DB_HOST = aws-0-ap-south-1.pooler.supabase.com
// ACCESS_TOKEN_SECRET = gvjft84gifgnierwr83rsnvsijerhwe9ureth34fn
