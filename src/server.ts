import mongoose from 'mongoose';
import app from './app';
import isEnvironmentProduction from './utilities/isEnvironmentProduction';

if (!isEnvironmentProduction()) {
  require('dotenv').config();
}

async function start() {
  await mongoose.connect(
    `mongodb+srv://${process.env['DB_USER_NAME']}:${process.env['DB_USER_PASSWORD']}@main.stxil.mongodb.net/keycap?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  );
  console.log('connected to keycap database successfully');

  const PORT = process.env['PORT'] || 5000;
  app.listen(PORT, () => {
    console.log(`keycap-api is listening on port ${PORT}`);
  });
}

start();
