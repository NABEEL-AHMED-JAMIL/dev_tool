import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FormParserService {

    public authToken: any = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSIsImtpZCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLndpbmRvd3MubmV0LyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2ZhYjYyYTVhLTQ1NDItNDRmZC05ODZmLTIxZjVmYTM3MjQzZS8iLCJpYXQiOjE1ODcxMzA5MzksIm5iZiI6MTU4NzEzMDkzOSwiZXhwIjoxNTg3MTM0ODM5LCJhY3IiOiIxIiwiYWlvIjoiQVZRQXEvOFBBQUFBN1BtYUNVeFZDQ0VPOXBLZFR4RFc2YVhKQ2RYam1OMEV3NTNrbHZaQk9JaHlNSDEvcWFxVmtIcVV2NHArNDlReHFNSUZSQ3JJUnd2dFZCMG5kMTZYUDBCZXhqazBoNXZVNi9SMSt2Ky9pR2M9IiwiYW1yIjpbInB3ZCIsIm1mYSJdLCJhcHBpZCI6ImY4N2VlOWI0LWQ4OTItNDMxYi1iZGI3LTZhZGQ3NzcxODFiZSIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiQWhtZWQiLCJnaXZlbl9uYW1lIjoiTmFiZWVsIiwiaXBhZGRyIjoiMTAzLjI1NS41LjgyIiwibmFtZSI6Ik5hYmVlbCBBaG1lZCIsIm9pZCI6IjY0M2UwM2I5LTQ2OTEtNGU3OC05Y2M0LTAwZjZiZTU5ZDkzYyIsInB1aWQiOiIxMDAzMjAwMDRDRDlCRUFFIiwic2NwIjoiRGlyZWN0b3J5LkFjY2Vzc0FzVXNlci5BbGwgVXNlci5SZWFkIFVzZXIuUmVhZEJhc2ljLkFsbCIsInN1YiI6InZDSkhiaEtBWFlka21MeTVrTUZUcURzUkc5d0xFRlF0YnNSTXFkX1U0STAiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiTkEiLCJ0aWQiOiJmYWI2MmE1YS00NTQyLTQ0ZmQtOTg2Zi0yMWY1ZmEzNzI0M2UiLCJ1bmlxdWVfbmFtZSI6Im5haG1lZEBtYWNyb3NvZnRpbmMuY29tIiwidXBuIjoibmFobWVkQG1hY3Jvc29mdGluYy5jb20iLCJ1dGkiOiJUc1BGanhud1BVNnl0US03OVFjakFBIiwidmVyIjoiMS4wIn0.hd1fG3RzOn1xCIs2zprfhZIxHIGXmF0VfYIHefasbdudzFvI9Ic7s5TovyRSzbprp0AC16TB0LdW-BFB8gmMeCkSL74v8Dpg6ZMzTkA8T6h5PF6qwLtyg5zzaSgaTvk_DKwg31qzhjNRCdkV9bGddvLpdzEPAQaMrkDVhC_wtdRyhVq62yeRaI3ZcS6iQ-B2JXsFC8y9cIouZVEt84MlbsOpVSGZMTrBkF8c7BBTFAxqQZK3T8eJUjBXz9JnUNxy0fiS3kvweGRFIYCOOjhCTbvBVnyTYGYorHV6e5l0ocjbPVUQOycMfaIYGYl0fKQZrRKzkXDLHaqSQM6TBdtfPw';

    constructor(private http: HttpClient) { }

    public formParser(object: any) {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', this.authToken);    
        return this.http.post('https://raad-dev-api.macrosoftinc.com/api/scraper/scrap/formParser', object, { headers: headers });
    }
}