const knex = require('knex')(require('../knexfile'));

const getEasyWords = async (_req, res) => {
	//Gets 10 random words from a given level
	try {
		const data = await knex
			.select()
			.from('words')
			.where('level', 'Easy')
			.orderByRaw('RAND()')
			.limit(10);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).send(`Error retrieving easy difficulty words: ${error}`);
	}
};

const getMediumWords = async (_req, res) => {
	//Gets 10 random words from a given level
	try {
		const data = await knex
			.select()
			.from('words')
			.where('level', 'Medium')
			.orderByRaw('RAND()')
			.limit(10);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).send(`Error retrieving medium difficulty words: ${error}`);
	}
};

const getHardWords = async (_req, res) => {
	//Gets 10 random words from a given level
	try {
		const data = await knex
			.select()
			.from('words')
			.where('level', 'Hard')
			.orderByRaw('RAND()')
			.limit(10);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).send(`Error retrieving hard difficulty words: ${error}`);
	}
};

module.exports = {
	getEasyWords,
	getMediumWords,
	getHardWords,
};
