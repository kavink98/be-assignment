import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletsModule } from 'src/wallets/wallets.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]), WalletsModule],
    controllers: [TransactionsController],
    providers: [TransactionsService]
})
export class TransactionsModule { }
