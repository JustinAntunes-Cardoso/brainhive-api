const router = require('express').Router();

const {
	setQuestion,
	getQuestions,
} = require('../controllers/questionsController');

router.route('/').post(setQuestion);

router.route('/:gameId').get(getQuestions);

module.exports = router;
