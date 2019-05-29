// var faker = require('faker');

// exports.seed = knex => {
//     returnknex("users").del()// always start by deleting existing entries
// .then(() => { // Inserts seed entries
//     returnknex("users").insert(createRecord(knex, 20));// runs a helper function we create to generate random info
// })

var faker = require('faker');

let createRecord = (knex, id) => {
  return knex('users').insert({
    id,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.exampleEmail(),
    pronouns: faker.lorem.words(),
    employment_status: faker.random.arrayElement(['full_time', 'part_time', 'in_school', 'looking', 'not_looking']),
    employer: faker.company.companyName()
  })
}

// exports.seed = knex => {
//     return knex("users").del()// always start by deleting existing entries
// .then(() => { // Inserts seed entries
//     return knex("users").insert(createRecord(knex, 20));// runs a helper function we create to generate random info
// })};


exports.seed = (knex, Promise) => {
  return knex('users').del()
    .then(() => {
      let records = [];

      for (let i = 1; i < 100; i++) {
        records.push(createRecord(knex, i))
      }

      return Promise.all(records);
    });
};