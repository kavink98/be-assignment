import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb+srv://GBC:123123bc@cluster0.o4gv987.mongodb.net/FS-Assignment?retryWrites=true&w=majority'), WalletsModule, TransactionsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
