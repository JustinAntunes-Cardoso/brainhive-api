const fs = require('fs');
const easyWordData = require('../seed_data/SpellingOneBee');
const mediumWordData = require('../seed_data/SpellingTwoBee');
const hardWordData = require('../seed_data/SpellingThreeBee');

exports.seed = async function (knex) {
	// Seeds word data for all difficulties
	await knex('words').del();
	await knex('words').insert(easyWordData);
	await knex('words').insert(mediumWordData);
	await knex('words').insert(hardWordData);

	await knex('users').del();
	await knex('users').insert({
		id: 1,
		username: 'Justin',
		email: 'justin@hotmail.com',
		password: 'mypassword'
	});
};
