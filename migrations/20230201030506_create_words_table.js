exports.up = function(knex) {
    return knex.schema
        .createTable('words', (table) => {
            table.uuid('id').primary();
            table.string('word').notNullable();
            table.string('audio').notNullable();
            table.text('etymology').notNullable();
            table.text('definition').notNullable();
            table.string('phonetics').notNullable();
            table.string('level').notNullable();
            table.timestamps(true, true);
        })
};

exports.down = function(knex) {
  return knex.schema.dropTable('words');
};
