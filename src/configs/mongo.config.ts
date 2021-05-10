import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(),
    ...getMongoOptions(),
  };
};

const getMongoString = () =>
  'mongodb://' +
  process.env.MONGO_HOST +
  ':' +
  process.env.MONGO_PORT +
  '/' +
  process.env.MONGO_AUTHDATABASE;

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
