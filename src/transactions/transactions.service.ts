import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { WalletsService } from 'src/wallets/wallets.service';

@Injectable()
export class TransactionsService {

    constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>, private readonly walletService: WalletsService) { }

    async create(createTransactionDto: CreateTransactionDto) {
        const createdTransaction = new this.transactionModel(createTransactionDto);

        const transactionDoc = await createdTransaction.save();

        const transaction = transactionDoc.toObject();

        this.walletService.update(transaction.fromAddress, (-1 * transaction.amount));
        this.walletService.update(transaction.toAddress, transaction.amount);

        return transactionDoc;
    }

    findAll() {
        return this.transactionModel.find().exec();
    }

    findOne(id: string) {
        return this.transactionModel.findById({ transactionHash: id }).exec();
    }
}
