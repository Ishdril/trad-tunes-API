import express from 'express';
require('dotenv').config();
import router from './routes';
import { MikroORM } from '@mikro-orm/core';
import ormConfig from './orm.config';

const PORT = process.env.API_PORT || 3000;
const app = express();

app.use(router);

const main = async () => {
  const orm = await MikroORM.init(ormConfig);
  console.log(orm.em); // access EntityManager via `em` property

  app.listen(PORT, () => {
    console.log(`API listening @ ${PORT}`);
  });
};

main();

export default main;
