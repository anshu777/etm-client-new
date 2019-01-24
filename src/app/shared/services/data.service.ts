import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';


@Injectable()
export class DataService {
    private apiUrl = 'http://localhost:8080/etmapi/api/';    // URL to web API
    
    constructor(private http: Http) { }

    getList(url: any): Observable<any[]> {
        return this.http.get(this.apiUrl + url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    get(url: any): Observable<any> {
        return this.http.get(this.apiUrl + url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        const data = res.json().Data;
        return data || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    put(url: any, data: any): Observable<any> {
        const headerOptions = new Headers({ 'Content-Type': 'application/json' });
        const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
        return this.http.put(this.apiUrl + url, data, requestOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    save(url: any, data: any) {
        const headerOptions = new Headers({ 'Content-Type': 'application/json' });
        const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        return this.http.post(this.apiUrl + url, data, requestOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    update(url: any, data: any) {
        const headerOptions = new Headers({ 'Content-Type': 'application/json' });
        const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
        return this.http.put(this.apiUrl + url, data, requestOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(url: any, id: number): Observable<any> {
        return this.http.delete(this.apiUrl + url + id)
            .map(this.extractData)
            .catch(this.handleError);
    }
}
