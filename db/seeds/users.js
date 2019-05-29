const faker = require("faker");

const createUser = () => {
  const firstName = faker.name.firstName(1);
  const lastName = faker.name.lastName();
  return {
    first_name: firstName,
    last_name: lastName,
    email: faker.internet.email(firstName, lastName),
    pronouns: "she/they",
    employment_status: "full_time",
    employer: faker.company.companyName(),
    permissions: "user"
  };
};

const identifying_info = [
  {
    name: "female",
    is_gender: true
  },
  {
    name: "male",
    is_gender: true
  },
  {
    name: "other",
    is_gender: false
  }
];

const createNUsers = n => Array.from(Array(n)).map(element => createUser());

exports.seed = knex => {
  // Deletes ALL existing entries

  return knex("users")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("identifying_info")
        .del()
        .then(() => {
          return knex("identifying_info")
            .returning("id")
            .insert(identifying_info)
            .then(info_ids => {
              return knex("users")
                .returning("id")
                .insert(createNUsers(20))
                .then(user_ids => {
                  return knex("user_identifying_info").insert(
                    user_ids.map(user_id => ({
                      user_id,
                      identifying_info_id: faker.helpers.randomize(info_ids)
                    }))
                  );
                });
            });
        });
    });
};