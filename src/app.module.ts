import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PaymentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'tuffi.db.elephantsql.com',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USERNAME || 'ebrpqwfi',
      password: process.env.DATABASE_PASSWORD || 'tET4t1PLighq9gQ3eJD4PBvMnlWBgfFX',
      database: process.env.DATABASE_SCHEMA || 'ebrpqwfi',
      entities: [__dirname + '/**/*.domain{.ts,.js}'],
      synchronize: process.env.PRODUCTION === undefined || process.env.PRODUCTION === 'false',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
