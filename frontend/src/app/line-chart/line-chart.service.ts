import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {DEPLOY_URL,API_URL} from '../config';
import {BSEStockDataModel} from './models/bseStockData';

import { catchError } from 'rxjs/operators';


import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LineChartService {

  constructor(private _http:HttpClient) { }

  getBSEData():Observable < BSEStockDataModel> {
    let queryString = new HttpParams();

    return this._http.get<BSEStockDataModel>(DEPLOY_URL+API_URL + 'data')
        .pipe(
            catchError(this.handleError)
        );
}

handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    // return an throwError with a user-facing error message
    return  throwError(error.message ? error.message :
      'Something bad happened; please try again later.');
}

}
