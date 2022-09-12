const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { validateUrl } = require('../customvalidations/validateurl');
const { validateId } = require('../customvalidations/validateid');
const {
  findUsers, findUserById, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/users', findUsers);
router.get('/users/me', getUserInfo);

router.get('/users/:userId', celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .required()
        .custom(validateId),
    }),
}), findUserById);

router.patch('/users/me', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      about: Joi.string()
        .required()
        .min(2)
        .max(30),
    }),
}), updateUserInfo);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .custom(validateUrl),
    }),
}), updateUserAvatar);

module.exports = router;
