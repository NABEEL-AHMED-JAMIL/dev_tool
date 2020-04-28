import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CaptchaService {

    constructor(private http: HttpClient) { }

    getProcessImage(object: any) {
        return this.http.post('http://localhost:9098/api/converter/captcha/image-text-reader', object);
    }

    imageReaderV1(object: any) {
        return this.http.post('http://localhost:9096/api/img-process/imageReaderV1', object);
    }

    imageReaderV2(object: any) {
        return this.http.post('http://localhost:9096/api/img-process/imageReaderV2', object);
    }

    imageReaderV3(object: any) {
        return this.http.post('http://localhost:9096/api/img-process/imageReaderV3', object);
    }
}