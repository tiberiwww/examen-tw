'use strict';

const faker = require("faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const data = [];
     for(let i = 0; i < 100; i++) {
       data.push({
         listId: faker.datatype.number({min: 1, max: 10}),
         title: faker.lorem.words(5),
         description: faker.lorem.words(12),
         url: faker.internet.url(),
         createdAt: new Date(),
         updatedAt: new Date()
       });
     }
 
     await queryInterface.bulkInsert('Videos', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
