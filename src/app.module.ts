import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { Report } from './reports/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => (config.get('typeorm'))
    // }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cofig: ConfigService) => {
        return {
          type: 'postgres',
          host: cofig.get<string>('DATABASE_HOST'),
          port: cofig.get<number>('DATABASE_PORT'),
          username: cofig.get<string>('DATABASE_USERNAME'),
          password: cofig.get<string>('DATABASE_PASSWORD'),
          database: cofig.get<string>('DATABASE_NAME'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrations: ['dist/migrations/*{.ts,.js}'],
          logging: true,
          synchronize: false,
          cli: {
            migrationsDir: 'src/migrations',
          },
        };
        // return {
        //   type: 'sqlite',
        //   database: cofig.get<string>('DB_NAME'),
        //   synchronize: true,
        //   entities: [User, Report],
        // };
      },
    }),
    // , TypeOrmModule.forRoot({
    // type:"sqlite",
    // database:"db.sqlite",
    // entities:[User,Report],
    // synchronize:true
    // })
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
