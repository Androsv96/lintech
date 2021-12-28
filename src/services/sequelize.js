const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'd6e4n59m7dr7tu',
  'xvemvxbqixuijt',
  'bcefa1d1a45e15744e2743e69c94be0d98bf441677997f9d52b1d5b4c03752d2',
  {
    host: 'ec2-52-86-177-34.compute-1.amazonaws.com',
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
