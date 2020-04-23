import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    
    constructor(private http: HttpClient) { }

    public register(user: User): any {
        return this.http.post(`${config.apiUrl}/auth/signup`, user);
    }
}