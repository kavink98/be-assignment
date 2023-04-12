import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    // @Post()
    // create(@Body() createTransactionDto: CreateTransactionDto) {
    //     return this.transactionsService.create(createTransactionDto);
    // }

    @Post()
    async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
        const transactionReceipt = await this.transactionsService.sendTransaction(
            createTransactionDto.fromAddress,
            createTransactionDto.toAddress,
            createTransactionDto.amount,
            createTransactionDto.password,
        );
        return { transactionReceipt };
    }

    @Get()
    findAllTransactions() {
        return this.transactionsService.getAllTransactions();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionsService.findOne(id);
    }
}
