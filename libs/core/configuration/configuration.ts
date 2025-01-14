import * as process from 'process';

export type ConfigurationType = {
  PORT: number;
  DATABASE_URL: string;
};

export default (): ConfigurationType => ({
  PORT: parseInt(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL,
});
