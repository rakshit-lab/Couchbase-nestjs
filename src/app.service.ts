import { Injectable } from '@nestjs/common';
// import { Bucket, Cluster, Collection, connect, ConnectOptions, DocumentNotFoundError, GetResult } from 'couchbase';

import {
    Bucket,
    Cluster,
    Collection,
    connect,
    ConnectOptions,
    DocumentNotFoundError,
    GetResult,
} from 'couchbase'

@Injectable()
export class AppService {
  async getHello() {
    return 'Hello World!';

  }
}
