import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DocumentNotFoundError } from 'couchbase';

@Injectable()
export class UsersService {
  constructor(
    @Inject('COUCHBASE')
    private readonly couchbaseConn: any,
  ) {}

  
  async createUser(name: string, email: string) {
    try {
      let randomID = Math.floor(Math.random() * 100000000);
      return this.couchbaseConn.collection.upsert(`user::${randomID}`, {
        name,
        email,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUser(id: string) {
    try {
      
      const result = await this.couchbaseConn.collection.get(`user::${id}`);    
      return result.content;

    } catch (error) {
       if (error instanceof DocumentNotFoundError) {
        throw new NotFoundException(`User not found`);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateUser(id: string, body: any) {
    try {
      const docId = `user::${id}`;
      return this.couchbaseConn.collection.replace(docId, body);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteUser(id: string) {
    try {
      return this.couchbaseConn.collection.remove(`user::${id}`);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByEmail(email: string) {
    try {
      const query = `
        SELECT META().id, d.*
      FROM \`${process.env.BUCKET_NAME as string}\`.\`User\`.\`User\` d
      WHERE d.email = $email`;
      const result = await this.couchbaseConn.cluster.query(query, {
        parameters: { email }
      });

      return result.rows;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(limit: number, offset: number) {
    try {
      const query = `
        SELECT META().id, d.*
          FROM \`${process.env.BUCKET_NAME as string}\`.\`User\`.\`User\` d LIMIT ${limit} OFFSET ${offset}`;
      const result = await this.couchbaseConn.cluster.query(query, {
        parameters: { limit, offset }
      });
      return result.rows;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
