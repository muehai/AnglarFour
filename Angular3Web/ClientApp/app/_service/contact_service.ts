import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Contact } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";


@Injectable()
export class ContactService {
   
    private _getcontactUrl = '/Contact/GetContacts';
    public _saveUrl: string = '/Contact/SaveContact';
    public _UpdateUrl: string = '/Contact/UpdateContact';
    public _deleteById: string = '/Contact/DeleteContactById';

    //Contstractors
    constructor(private http: Http) { }

    //GetContact
    GetContacts() {
        var headers = new Headers();
        headers.append("If - Modified - Since", "Tue, 24 July 2017 00:00:00 GMT");
        var getContactUrl = this._getcontactUrl;
        return this.http.get(getContactUrl, { headers: headers }).map(response => <any>(<Response>response).json());
    }

    //Save in database/post to database
    SaveContact(contact: Contact): Observable<string> {
        let body = JSON.stringify(contact);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._saveUrl, body, options).map(res => res.json().message).catch(this.HandleError); 
    }

    //Delete Operation
    deleteContac(id: number): Observable<string> {
        //Debugger 
        var deleteByIdUrl = this._deleteById + '/' + id

        return this.http.delete(deleteByIdUrl).map(respones => respones.json().message).catch(this.HandleError);
    }

    private HandleError(error : Response)
    {
        return Observable.throw(error.json().error) || 'OperationError on server';

    }
}