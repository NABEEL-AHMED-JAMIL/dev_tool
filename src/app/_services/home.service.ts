import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HomeService {

    constructor(private http: HttpClient) { }

    public downloadFile(object: any) {
        return this.http.post('http://localhost:9098/api/converter/socket/file/download', object);
    }
}