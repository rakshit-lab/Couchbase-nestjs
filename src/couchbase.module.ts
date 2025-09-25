
import { Module, Global } from '@nestjs/common';
import { Cluster, Bucket, Collection } from 'couchbase';
import * as dotenv from 'dotenv';
dotenv.config();


@Global()
@Module({
  providers: [
    {
      provide: 'COUCHBASE',
      useFactory: async () => {

        const cluster = await Cluster.connect(
          'couchbase://127.0.0.1',
          {
            username: process.env.COUCHBASE_USERNAME,
            password: process.env.COUCHBASE_PASSWORD
          },
        );

        const bucket: Bucket = cluster.bucket(process.env.BUCKET_NAME as string);
        const collection: Collection = bucket.scope('User').collection('User')

        return { cluster, bucket, collection };
      },
    },
  ],
  exports: ['COUCHBASE'],
})
export class CouchbaseModule {}
