exports.up = knex =>
  knex.schema
    .createTable("questions", table => {
      table.increments();
      table.text("question_text").notNullable();
      table
        .boolean("required")
        .notNullable()
        .defaultTo(true);
      table
        .boolean("allow_multiple_choices")
        .notNullable()
        .defaultTo(false);
    })
    .createTable("answer_choices", table => {
      table.increments();
      table.text("choice_text").notNullable();
      table
        .integer("question_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("questions");
    })
    .createTable("responses", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table
        .integer("question_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("questions");
      table
        .integer("answer_choice_id")
        .unsigned()
        .references("id")
        .inTable("answer_choices");
      table.text("response_text");
    });

exports.down = knex =>
  knex.schema
    .dropTable("responses")
    .dropTable("answer_choices")
    .dropTable("questions");
