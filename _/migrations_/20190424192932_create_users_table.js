
exports.up = knex => knex.schema.createTable('users', table => {
    table.increments(); //this is where the primary key will be made as a column
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('email').notNullable().unique()
    table.string('pronouns').notNullable()
    table.enu('employment_status', ['full_time', 'part_time', 'in_school', 'looking', 'not_looking']).notNullable()
    table.string('employer')
}).createTable('identifying_info', table => {
    table.increments();
    table.string('name').notNullable()
    table.bool('gender').notNullable()
}).createTable('cohort', table => {
    table.increments()
    table.string('name')
    table.string('welcome_text')
    table.string('thank_you_text')
}).createTable('application', table => {
    table.increments();
    table.int('cohort_id')
    table.int('application_id')
    table.bool('accepted_test')
    table.bool('accepted_cohort')
}) // join tables
.createTable('applicant_identity', table => {
    table.increments();
    table.int('applicant_id')
    table.int('identity_id')
}).createTable('answer_choices', table => {
    table.increments();
    table.string('questions_id');
}).createTable('user_identifying_info', table => {
    table.increments();
    table.string('applicant_id');
    table.string('identity_id');
})

exports.down = knex => {
    knex.schema.dropTable('user_identifying_info');
    knex.schema.dropTable('answer_choices');
    knex.schema.dropTable('applicant_identity');
    knex.schema.dropTable('application');
    knex.schema.dropTable('cohort');
    knex.schema.dropTable('identifying_info');
    knex.schema.dropTable('users'); 
}
