"use strict";

const { Insect, Tree } = require("../models");
const { Op } = require("sequelize");

const insectTrees = [
  {
    insect: { name: "Western Pygmy Blue Butterfly" },
    trees: [
      { tree: "General Sherman" },
      { tree: "General Grant" },
      { tree: "Lincoln" },
      { tree: "Stagg" },
    ],
  },
  {
    insect: { name: "Patu Digua Spider" },
    trees: [{ tree: "Stagg" }],
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < insectTrees.length; i++) {
      const data = insectTrees[i];
      const insect = await Insect.findOne({ where: data.insect });
      const trees = await Tree.findAll({
        where: { [Op.or]: data.trees },
      });
      await insect.addTrees(trees);
    }
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    for (let i = 0; i < insectTrees.length; i++) {
      const data = insectTrees[i];
      const insect = await Insect.findOne({ where: data.insect });
      const trees = await Tree.findAll({
        where: { [Op.or]: data.trees },
      });
      await insect.removeTrees(trees);
    }
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
