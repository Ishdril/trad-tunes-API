import express from 'express';
require('dotenv').config();
import router from './routes';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import ormConfig from './orm.config';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

const PORT = process.env.API_PORT || 3000;
const app = express();

export let orm = {} as MikroORM;

const main = async () => {
  orm = await MikroORM.init(ormConfig);
  // await orm.getMigrator().createInitialMigration();
  await orm.getMigrator().up();

  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use((_, __, next) => {
    RequestContext.create(orm.em, next);
  });
  app.use(router);

  app.use((_, res) => res.status(404).json({ message: 'No route found' }));

  app.listen(PORT, () => {
    console.log(`API listening @ ${PORT}`);
  });
};

main();

export default main;
