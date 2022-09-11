const express = require('express');
const mongoose = require('mongoose');

const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3001 } = process.env;
const cors = require('cors');
const {
  login, createUser,
} = require('./controllers/users');
const { validateUrl } = require('./urlValidation/validateurl');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const NotFoundError = require('./errors/404error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(express.json());

const options = {
  origin: [
    'http://localhost:3000',
    'http://rusgram.nomoredomains.sbs',
    'https://MethodM4N.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));

app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(30),
      avatar: Joi.string()
        .custom(validateUrl),
    }),
}), createUser);

app.use(auth);
app.use('/', userRouter);
app.use('/', cardRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Обработка неправильного пути'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
