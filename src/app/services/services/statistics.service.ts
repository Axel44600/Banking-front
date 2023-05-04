/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { TransactionSumDetails } from '../models/transaction-sum-details';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findSumTractionsByDate
   */
  static readonly FindSumTractionsByDatePath = '/statistics/sum-by-date/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findSumTractionsByDate()` instead.
   *
   * This method doesn't expect any request body.
   */
  findSumTractionsByDate$Response(params: {
    id: number;
    'start-date': string;
    'end-date': string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<TransactionSumDetails>>> {

    const rb = new RequestBuilder(this.rootUrl, StatisticsService.FindSumTractionsByDatePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('start-date', params['start-date'], {});
      rb.query('end-date', params['end-date'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TransactionSumDetails>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findSumTractionsByDate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findSumTractionsByDate(params: {
    id: number;
    'start-date': string;
    'end-date': string;
  },
  context?: HttpContext

): Observable<Array<TransactionSumDetails>> {

    return this.findSumTractionsByDate$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<TransactionSumDetails>>) => r.body as Array<TransactionSumDetails>)
    );
  }

  /**
   * Path part for operation highestTransfert
   */
  static readonly HighestTransfertPath = '/statistics/highest-transfer/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `highestTransfert()` instead.
   *
   * This method doesn't expect any request body.
   */
  highestTransfert$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, StatisticsService.HighestTransfertPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `highestTransfert$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  highestTransfert(params: {
    id: number;
  },
  context?: HttpContext

): Observable<number> {

    return this.highestTransfert$Response(params,context).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation highestDeposit
   */
  static readonly HighestDepositPath = '/statistics/highest-deposit/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `highestDeposit()` instead.
   *
   * This method doesn't expect any request body.
   */
  highestDeposit$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, StatisticsService.HighestDepositPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `highestDeposit$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  highestDeposit(params: {
    id: number;
  },
  context?: HttpContext

): Observable<number> {

    return this.highestDeposit$Response(params,context).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation getAccountBalance
   */
  static readonly GetAccountBalancePath = '/statistics/account-balance/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAccountBalance()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAccountBalance$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, StatisticsService.GetAccountBalancePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAccountBalance$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAccountBalance(params: {
    id: number;
  },
  context?: HttpContext

): Observable<number> {

    return this.getAccountBalance$Response(params,context).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

}
