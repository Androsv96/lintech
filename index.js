const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { initSequelize } = require('./src/services/sequelize');
const api = require('./src/routes');

app.use(express.json());
app.use(api);

(async () => {
  await initSequelize();
})();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
