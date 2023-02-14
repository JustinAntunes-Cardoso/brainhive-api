const knex = require('knex')(require('../knexfile'));
const { v4: uuid } = require('uuid');

const setGame = async (req, res) => {
	const { user_id, level } = req.body;

	try {
		async function insertGame() {
			const id = uuid();
			const trx = await knex.transaction();
			try {
				await trx('games').insert({
					id,
					user_id: user_id,
					level: level,
				});
				const [game] = await trx('games').where('id', id).select('*');
				await trx.commit();

				res.status(201).json({ game_id: game.id });
			} catch (error) {
				console.error(error);
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

const getGames = async (req, res) => {
	const userId = req.params.userId;

	try {
		const data = await knex.select().from('games').where('user_id', userId);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).send(`Error retrieving games for ${userId}: ${error}`);
	}
};
const getGame = async (req, res) => {
	const gameId = req.params.gameId;

	try {
		const data = await knex.select().from('games').where('id', gameId);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).send(`Error retrieving games for ${gameId}: ${error}`);
	}
};

module.exports = {
	setGame,
	getGames,
	getGame,
};
