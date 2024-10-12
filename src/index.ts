import cors from 'cors';
import 'reflect-metadata';
import './config/dbConfig';
import morgan from 'morgan';
import './config/redisConfig';
import express from 'express';
import routes from './routes';
import { Server } from 'http';
import { appConfig } from './config/cred.json';
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

// npm init -y
// npx tsc --init
// npm install pg cors redis bcrypt nodemon morgan dotenv express ts-node typeorm socket.io typescript nodemailer jsonwebtoken multer express-validator nodemailer-smtp-transport
// npm install --save-dev husky eslint prettier globals @eslint/js @types/bcrypt @types/morgan lint-staged @types/multer typescript-eslint @types/nodemailer @types/jsonwebtoken eslint-config-prettier eslint-plugin-prettier @types/nodemailer-smtp-transport

// package.json
// "scripts": {
//     "build": "npx tsc",
//     "lint": "eslint .",
//     "prepare": "husky install",
//     "lint:fix": "eslint . --fix",
//     "format": "prettier --write .",
//     "start": "nodemon src/index.ts",
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },

// mkdir -p upload && \
// mkdir -p src/{routes,controllers,entities,middlewares,config,services,utils} && \
// touch src/index.ts && \
// touch src/routes/index.ts && \
// touch src/controllers/{userController.ts,authController.ts} && \
// touch src/services/{authService.ts,useService.ts} && \
// touch src/entities/{baseEntity.ts,userEntity.ts} && \
// touch src/middlewares/{errorMiddleware.ts,validateRequest.ts,validators.ts} && \
// touch src/config/{dbConfig.ts,appConfig.ts} && \
// touch src/utils/{errorCodes.ts,resMessages.ts,pagination.ts,errorHandler.ts,token.ts,multer.ts,otp.ts,password.ts,nodemailer.ts,validationMessages.ts,templates.ts} && \
// echo '{ "semi": true, "singleQuote": true, "trailingComma": "es5", "tabWidth": 2, "printWidth": 300, "arrowParens": "avoid" }' > .prettierrc && \
// touch .eslintrc.json .gitignore .env && \
// npm run prepare && \
// mkdir -p .husky && touch .husky/pre-commit && \
// chmod +x .husky/pre-commit
