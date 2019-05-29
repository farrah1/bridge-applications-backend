const faker = require("faker");

const getRandomElement = array =>
  array[Math.floor(Math.random() * array.length)];

const createNEntries = n => Array.from(Array(n));

const createCohort = (number, type) => ({
  name: `${type} Cohort ${number}`,
  cohort_type: type,
  start_date: faker.date.recent(),
  end_date: faker.date.future(2),
  welcome_text: "This is the application for Bridge",
  thank_you_text: "Thank you for applying to Bridge"
});

const createApplication = (cohortId, userId) => ({
  cohort_id: cohortId,
  user_id: userId,
  accepted_test: false,
  accepted_cohort: false
});

exports.seed = async knex => {
  // create cohorts
  await knex("cohorts").del();
  await knex("cohorts").insert(
    createNEntries(10).map((x, i) =>
      createCohort(i, getRandomElement(["frontend", "backend", "design"]))
    )
  );

  // create applications for every cohort
  const cohorts = await knex("cohorts").select("*");
  const users = await knex("users").select("*");

  const applications = await cohorts.map(cohort => {
    return users.map(user => createApplication(cohort.id, user.id));
  });

  await knex("applications").insert([].concat.apply([], applications));
};