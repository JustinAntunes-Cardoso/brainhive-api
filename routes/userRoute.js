const router = require('express').Router();

const { setUser, getUser } = require('../controllers/usersController');

router.route('/signup').post(setUser);

router.route('/:userId').get(getUser);

module.exports = router;
