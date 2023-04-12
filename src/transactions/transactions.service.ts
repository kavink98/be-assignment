import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { WalletsService } from 'src/wallets/wallets.service';
import Web3 from 'web3';
import { TransactionReceipt } from './types/transactions.types';

@Injectable()
export class TransactionsService {

    private web3: Web3;

    constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>, private readonly walletService: WalletsService) {
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
    }

    async sendTransaction(fromAddress: string, toAddress: string, amount: number, password: string): Promise<TransactionReceipt> {

        await this.web3.eth.personal.unlockAccount(fromAddress, password, null);

        const tx = {
            from: fromAddress,
            to: toAddress,
            value: this.web3.utils.toWei(amount.toString(), 'ether'),
        };

        const transactionReceipt = await this.web3.eth.sendTransaction(tx);

        await this.web3.eth.personal.lockAccount(fromAddress);

        return {
            fromAddress: transactionReceipt.from,
            toAddress: transactionReceipt.to,
            blockNumber: transactionReceipt.blockNumber,
            blockHash: transactionReceipt.blockHash,
            transactionHash: transactionReceipt.transactionHash,
            timestamp: Math.floor(Date.now() / 1000),
            amount: amount,
            gasUsed: transactionReceipt.gasUsed
        };
    }

    async getAllTransactions(): Promise<TransactionReceipt[]> {
        const blockNumber = await this.web3.eth.getBlockNumber();
        let transactions: TransactionReceipt[] = [];

        for (let i = 0; i <= blockNumber; i++) {
            const block = await this.web3.eth.getBlock(i, true);
            if (block && block.transactions) {
                for (let j = 0; j < block.transactions.length; j++) {
                    const tx = block.transactions[j];
                    const txObj: TransactionReceipt = {
                        fromAddress: tx.from,
                        toAddress: tx.to,
                        blockHash: block.hash,
                        blockNumber: block.number,
                        transactionHash: tx.hash,
                        timestamp: (await this.web3.eth.getBlock(block.number)).timestamp,
                        amount: parseInt(this.web3.utils.fromWei(tx.value)),
                    };
                    transactions.push(txObj);
                }
            }
        }

        return transactions;
    }

    findOne(id: string) {
        return this.transactionModel.findById({ transactionHash: id }).exec();
    }
}
