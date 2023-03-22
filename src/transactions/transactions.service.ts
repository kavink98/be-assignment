import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {

    constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) { }

    create(createTransactionDto: CreateTransactionDto) {
        const createdTransaction = new this.transactionModel(createTransactionDto);
        return createdTransaction.save();
    }

    findAll() {
        return this.transactionModel.find().exec();
    }

    findOne(id: string) {
        return this.transactionModel.findById({ transactionHash: id }).exec();
    }
}
