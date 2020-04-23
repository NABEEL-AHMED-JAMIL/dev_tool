import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class XMLMakerService {

    constructor(private http: HttpClient) { }

    public getXmlData(object: any) {
        return this.http.post('http://localhost:9098/api/converter/conversion/xmlCreateChecker', object);
    }
}