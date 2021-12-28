const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'postgres',
    ssl: true,
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

const initSequelize = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.createSchema('leantech');
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
};

module.exports = { sequelize, initSequelize };
