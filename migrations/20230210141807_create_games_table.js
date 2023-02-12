exports.up = function (knex) {
	return knex.schema.createTable('games', (table) => {
		table.uuid('id').primary();
		table.string('level');
		table
			.uuid('user_id')
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
		table.timestamps(true, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('games');
};
