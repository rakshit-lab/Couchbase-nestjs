import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CouchbaseModule } from 'src/couchbase.module';
@Module({
  imports: [
    CouchbaseModule], 
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
