const knex = require('knex')(require('../knexfile'));
const { v4: uuid } = require('uuid');

//Post a new user to the DB
const setUser = async (req, res) => {
	const { username, email } = req.body;

	try {
		//Checks to see if username and email already exists
		const [existingUsername] = await knex('users')
			.where({ username })
			.select('id');

		if (existingUsername) {
			return res.status(409).json({ error: 'Username already in use' });
		}

		const [existingEmail] = await knex('users').where({ email }).select('id');

		if (existingEmail) {
			return res.status(409).json({ error: 'Email already in use' });
		}

		//If username and email is unique create a new user in the DB
		async function insertUser() {
			const id = uuid();
			const trx = await knex.transaction();
			try {
				await trx('users').insert({
					id,
					username: username,
					email: email,
					password: 'secret',
				});
				const [user] = await trx('users').where('id', id).select('*');
				await trx.commit();
				return user;
			} catch (error) {
				await trx.rollback();
				throw error;
			}
		}

		const data = insertUser();

		res.status(201).json(data);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: 'An error occurred, please try again later' });
	}
};

//Gets a user from the DB
const getUser = async (req, res) => {
	const user_id = req.params.userId;

	try {
		const data = await knex.select().from('users').where('id', user_id);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).send(`Error retrieving games for ${user_id}: ${error}`);
	}
};

module.exports = {
	setUser,
	getUser,
};
