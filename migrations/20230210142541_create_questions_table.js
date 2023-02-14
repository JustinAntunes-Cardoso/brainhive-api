exports.up = function (knex) {
	return knex.schema.createTable('questions', (table) => {
		table.uuid('id').primary();
		table
			.uuid('game_id')
			.references('id')
			.inTable('games')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
        table
			.uuid('word_id')
			.references('id')
			.inTable('words')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
        table.string('answer');
        table.boolean('correct').notNullable();
		table.timestamps(true, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('questions');
};
