import 'dotenv/config';
import { Module, Global } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

function buildMongoUri(): string {
  const envUri = process.env.MONGO_URI;
  if (envUri) return envUri;
  console.log(
    'Building MongoDB URI from environment variables',
    process.env.MONGO_PASS,
  );
  const user = process.env.MONGO_USER;
  const pass = process.env.MONGO_PASS;
  const host = process.env.MONGO_HOST || 'localhost';
  const port = process.env.MONGO_PORT || '27017';
  const db = process.env.MONGO_DB || 'pcmview';
  const authDb = process.env.MONGO_AUTH_DB || 'admin';
  const useSrv = process.env.MONGO_SRV === 'true';

  if (user && pass) {
    const u = encodeURIComponent(user);
    const p = encodeURIComponent(pass);
    if (useSrv) {
      return `mongodb+srv://${u}:${p}@${host}/${db}?authSource=${authDb}`;
    }
    return `mongodb://${u}:${p}@${host}:${port}/${db}?authSource=${authDb}`;
  }

  if (useSrv) {
    return `mongodb+srv://${host}/${db}`;
  }
  return `mongodb://${host}:${port}/${db}`;
}

const MONGO_URI = buildMongoUri();

@Global()
@Module({
  imports: [MongooseModule.forRoot(MONGO_URI)],
  providers: [
    {
      provide: 'MONGO_DB',
      useFactory: async (): Promise<Db> => {
        const client = await MongoClient.connect(MONGO_URI);
        return client.db();
      },
    },
  ],
  exports: ['MONGO_DB', MongooseModule],
})
export class DatabaseModule {}
