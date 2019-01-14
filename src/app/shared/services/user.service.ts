import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    readonly rootUrl = 'http://localhost/etmapi';
    constructor(private router: Router, private http: HttpClient) { }

    registerUser(user: User, roles: string[]) {
        const body = {
            UserName: user.UserName,
            Password: user.Password,
            Email: user.Email,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Roles: roles
        };

        const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.http.post(this.rootUrl + '/api/User/Register', body, { headers: reqHeader });
    }

    userAuthentication(userName, password): Observable<any> {
        const data = 'username=' + userName + '&password=' + password + '&grant_type=password';
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
    }

    getUserClaims() {
        return this.http.get(this.rootUrl + '/api/User/GetUserClaims');
    }

    getAllRoles() {
        const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.http.get(this.rootUrl + '/api/User/GetAllRoles', { headers: reqHeader });
    }

    roleMatch(allowedRoles): boolean {
        let isMatch = false;
        const userRoles: Array<string> = JSON.parse(localStorage.getItem('userRoles'));
        userRoles.forEach(element => {
            const newObj: any = element;
            if (allowedRoles.find(x => x === newObj.Name)) {
                isMatch = true;
                return false;
            }
        });
        // allowedRoles.forEach(element => {
        //     if (userRoles.indexOf(element) > -1) {
        //         isMatch = true;
        //         return false;
        //     }
        // });
        return isMatch;

    }

    sendToken(token: string) {
        localStorage.setItem('userToken', token);
    }

    getToken() {
        return localStorage.getItem('userToken');
    }

    isLoggednIn() {
        return this.getToken() !== null;
    }

    logout() {
        localStorage.removeItem('userToken');
        this.router.navigate(['login']);
    }
}
