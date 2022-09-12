const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { validateUrl } = require('../customvalidations/validateurl');
const { validateId } = require('../customvalidations/validateid');
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
        .custom(validateId),
    }),
}), deleteCardById);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .custom(validateId),
    }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .custom(validateId),
    }),
}), dislikeCard);

module.exports = router;
