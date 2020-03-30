import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CaptchaService {

    constructor(private http: HttpClient) { }

    getProcessImage(object: any) {
        return this.http.post('http://localhost:9098/api/converter/captcha/image-text-reader', object);
    }
}