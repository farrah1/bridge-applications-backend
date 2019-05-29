exports.up = knex =>
  knex.schema
    .createTable("cohorts", table => {
      table.increments();
      table.string("name").notNullable();
      table.enu("cohort_type", ["frontend", "backend", "design"]).notNullable();
      table.datetime("start_date").notNullable();
      table.datetime("end_date").notNullable();
      table.text("welcome_text").notNullable();
      table.text("thank_you_text").notNullable();
    })

    .createTable("applications", table => {
      table.increments();
      table
        .integer("cohort_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("cohorts");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table
        .boolean("accepted_test")
        .notNullable()
        .defaultsTo(false);
      table
        .boolean("accepted_cohort")
        .notNullable()
        .defaultsTo(false);
    });

exports.down = knex =>
  knex.schema.dropTable("applications").dropTable("cohorts");
