import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DB_URL_NO_SSL,
  synchronize: true,
  dropSchema: false,
  ssl: true,
  entities: [__dirname + '/../**/*.finance.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
