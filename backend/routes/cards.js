const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { validateUrl } = require('../urlValidation/validateurl');
const {
  findCards, deleteCardById, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', findCards);

router.post('/cards', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string()
        .required()
        .custom(validateUrl),
    }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .length(24),
    }),
}), deleteCardById);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .length(24),
    }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .length(24),
    }),
}), dislikeCard);

module.exports = router;
