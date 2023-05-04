import {Component, OnInit} from '@angular/core';
import {TransactionsService} from "../../services/services/transactions.service";
import {TransactionDto} from "../../services/models/transaction-dto";
import {HelperService} from "../../services/helper/helper.service";

@Component({
  selector: 'app-my-transactions',
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.css']
})
export class MyTransactionsComponent implements OnInit {

  transactions: Array<TransactionDto> = [];

  constructor(
    private transactionService: TransactionsService,
    private helperService: HelperService
  ) {
  }

  ngOnInit(): void {
    this.transactionService.findAllByUserId({
      'id': this.helperService.userId
    }).subscribe({
      next: (data) => {
        this.transactions = data;
      }
    });
  }

}
