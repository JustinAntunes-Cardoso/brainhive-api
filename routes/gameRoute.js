const router = require('express').Router();

const {
	setGame,
	getGames,
	getGame,
} = require('../controllers/gamesController');

router.route('/').post(setGame);

router.route('/:gameId').get(getGame);

router.route('/user/:userId').get(getGames);

module.exports = router;
