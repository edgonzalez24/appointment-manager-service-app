import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    // ConfigModule.forRoot() is a dynamic module that is configured globally.
    ConfigModule.forRoot(),
    // TypeOrmModule.forRoot() is a dynamic module that is configured with database connection settings.
    TypeOrmModule.forRoot({
      // The type of the database. In this case, it's a PostgreSQL database.
      type: 'postgres',
      // The host of the database. This is coming from the environment variables.
      host: process.env.DB_HOST,
      // The port of the database. This is coming from the environment variables.
      port: parseInt(process.env.PG_PORT),
      // The username for the database. This is coming from the environment variables.
      username: process.env.PG_USER,
      // The password for the database. This is coming from the environment variables.
      password: process.env.PG_PASSWORD,
      // The name of the database. This is coming from the environment variables.
      database: process.env.PG_DB,
      // If autoLoadEntities is true, entities will be loaded automatically.
      autoLoadEntities: true,
      // If synchronize is true, the database will be auto-created on every application launch.
      synchronize: true,
    }),
    CommonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
