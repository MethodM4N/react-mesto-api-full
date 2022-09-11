const Card = require('../models/card');

const BadRequestError = require('../errors/400error');
const NotFoundError = require('../errors/404error');
const ForbiddenError = require('../errors/403error');

const findCards = (req, res, next) => {
  Card.find({})
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные в метод создания карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      next(new NotFoundError('Карточка не найдена или был запрошен несуществующий роут'));
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.deleteOne({ _id: card._id })
          .then(res.status(200).send({ message: 'Карточка удалена' }))
          .catch((err) => next(err));
      } else {
        next(new ForbiddenError('Отсутствуют права доступа на удаление чужих карточек'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные в метод удаления карточки'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      next(new NotFoundError('Карточка не найдена или был запрошен несуществующий роут'));
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные в метод лайка карточки'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      next(new NotFoundError('Карточка не найдена или был запрошен несуществующий роут'));
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные в метод дизлайка карточки'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  findCards, createCard, deleteCardById, likeCard, dislikeCard,
};
