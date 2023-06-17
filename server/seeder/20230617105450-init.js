'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("category", [
      {
        cate_id: "127061ca-9174-4d16-9341-7000c81cc593",
        cate_name: "Beverages",
      },
      {
        cate_id: "432fb709-14b5-4a59-9c2f-01a5ee501d5e",
        cate_name: "Condiments",
      },
      {
        cate_id: "0127a762-eb3a-4b72-96a6-6704e5a99486",
        cate_name: "Confections",
      },
      {
        cate_id: "f26affb6-069b-4a9b-9372-ced389caf54c",
        cate_name: "Produce",
      },
    ]);

    await queryInterface.bulkInsert('products', [
      {
        name: "Chai",
        cate_id: "127061ca-9174-4d16-9341-7000c81cc593",
        stock: 37,
        price: 18
      },
      {
        name: "Chang",
        cate_id: "127061ca-9174-4d16-9341-7000c81cc593",
        stock: 15,
        price: 19
      },
      {
        name: "Chef Anton's Gumbo Mix",
        cate_id: "432fb709-14b5-4a59-9c2f-01a5ee501d5e",
        stock: 10,
        price: 2135
      },
      {
        name: "Northwoods Cranberry Sauce",
        cate_id: "432fb709-14b5-4a59-9c2f-01a5ee501d5e",
        stock: 10,
        price: 40
      },
      {
        name: "Aniseed Syrup",
        cate_id: "432fb709-14b5-4a59-9c2f-01a5ee501d5e",
        stock: 20,
        price: 10
      },
      {
        name: "Manjimup Dried Apples",
        cate_id: "f26affb6-069b-4a9b-9372-ced389caf54c",
        stock: 20,
        price: 53
      },
      {
        name: "Tofu",
        cate_id: "f26affb6-069b-4a9b-9372-ced389caf54c",
        stock: 25,
        price: 2325
      },
      {
        name: "Genen Shouyu",
        cate_id: "432fb709-14b5-4a59-9c2f-01a5ee501d5e",
        stock: 10,
        price: 13
      },
      {
        name: "Teatime Chocolate Biscuits",
        cate_id: "0127a762-eb3a-4b72-96a6-6704e5a99486",
        stock: 92,
        price: 25
      },
      {
        name: "Sir Rodney's Marmalade",
        cate_id: "0127a762-eb3a-4b72-96a6-6704e5a99486",
        stock: 10,
        price: 81
      },
    ]);

    await queryInterface.bulkInsert('users', [
      { username: "jessica" },
      { username: "kleechan" }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('category', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
