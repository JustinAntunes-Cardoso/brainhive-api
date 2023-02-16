const knex = require('knex')(require('../knexfile'));
const { v4: uuid } = require('uuid');

const setQuestion = async (req, res) => {
	const { word_id, game_id, answer, correct } = req.body;

	try {
		async function insertGame() {
			const id = uuid();
			const trx = await knex.transaction();
			try {
				await trx('questions').insert({
					id,
					game_id: game_id,
					word_id: word_id,
					answer: answer,
					correct: correct,
				});
				const [question] = await trx('questions').where('id', id).select('*');
				await trx.commit();
				console.log(question, 'hello');
				res.status(201).json({ question_id: question.id });
			} catch (error) {
				await trx.rollback();
				throw error;
			}
		}

		insertGame();
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: 'An error occurred, please try again later' });
	}
};

const getQuestions = async (req, res) => {
	const game_id = req.params.gameId;

	try {
		const data = await knex.select().from('questions').where('game_id', game_id);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).send(`Error retrieving games for ${game_id}: ${error}`);
	}
};

module.exports = {
	setQuestion,
	getQuestions,
};
