import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthorityService {

    public authToken: any = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSIsImtpZCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLndpbmRvd3MubmV0LyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2ZhYjYyYTVhLTQ1NDItNDRmZC05ODZmLTIxZjVmYTM3MjQzZS8iLCJpYXQiOjE1ODU3MjMzNDIsIm5iZiI6MTU4NTcyMzM0MiwiZXhwIjoxNTg1NzI3MjQyLCJhY3IiOiIxIiwiYWlvIjoiQVVRQXUvOFBBQUFBSkFwY3c5SmE5UWJLbm1pNGhLa0tUdTQremY3UEdPS2FJNnJNUDVBQVJhSGtrZjFlVllNN0VmUnJRcHNIODdjSTdlY2hzSWhoT2liYkFucUEyUUUrVnc9PSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiJmODdlZTliNC1kODkyLTQzMWItYmRiNy02YWRkNzc3MTgxYmUiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6IkFobWVkIiwiZ2l2ZW5fbmFtZSI6Ik5hYmVlbCIsImlwYWRkciI6IjExMS4xMTkuMTg3LjI1IiwibmFtZSI6Ik5hYmVlbCBBaG1lZCIsIm9pZCI6IjY0M2UwM2I5LTQ2OTEtNGU3OC05Y2M0LTAwZjZiZTU5ZDkzYyIsInB1aWQiOiIxMDAzMjAwMDRDRDlCRUFFIiwicHdkX2V4cCI6IjAiLCJwd2RfdXJsIjoiaHR0cHM6Ly9wb3J0YWwubWljcm9zb2Z0b25saW5lLmNvbS9DaGFuZ2VQYXNzd29yZC5hc3B4Iiwic2NwIjoiRGlyZWN0b3J5LkFjY2Vzc0FzVXNlci5BbGwgVXNlci5SZWFkIFVzZXIuUmVhZEJhc2ljLkFsbCIsInN1YiI6InZDSkhiaEtBWFlka21MeTVrTUZUcURzUkc5d0xFRlF0YnNSTXFkX1U0STAiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiTkEiLCJ0aWQiOiJmYWI2MmE1YS00NTQyLTQ0ZmQtOTg2Zi0yMWY1ZmEzNzI0M2UiLCJ1bmlxdWVfbmFtZSI6Im5haG1lZEBtYWNyb3NvZnRpbmMuY29tIiwidXBuIjoibmFobWVkQG1hY3Jvc29mdGluYy5jb20iLCJ1dGkiOiJhRUpMb0dnQXZFcWh1OHlwRW9JVEFBIiwidmVyIjoiMS4wIn0.C90odGVeSdyPOe9hV7qrCYsMEaEgbKJ-EsjI_B9Cnv0gWkeFRtmwzFviCjw5MZMLdIvZEzGEsUHAYtfNJ16VVFB_N-eRhLoTlfLVw7h6y4tiTPwx2vIvX7po_1usVwcZWJ1b0YDbcaC_XFonsA-bIasdPGvtEGlIp1mtFWBIPdylxd2gWFxD43ow_kUQdasY1S1lc9O8fEjvduKVpZvNRnaPBApSCXVqbYVOiwc2-PiEPGgdpKQiBlBRmcmzJgbWw8OHDlMCLGeImwZq36F_9qb0wOA3KvS8lMM2xG34xH8eyHCqhaxfjF-23V7Jxv4me3PuCIUGAtTspY3flUC9IQ';

    constructor(private http: HttpClient) {}

    getAllAuthority() {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', this.authToken);
        return this.http.get('http://localhost:9092/api/admin/getAllAuthority', {headers: headers});
    }

    getAuthorityDetailByAuthorityId(authorityId:any) {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', this.authToken);
        return this.http.get('http://localhost:9092/api/admin/getAuthorityDetailByAuthorityId/'+authorityId, {headers: headers});
    }

    saveAuthority(authority:any) {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', this.authToken);
        return this.http.post('http://localhost:9092/api/admin/saveAuthoritySettings', authority, {headers: headers});
    }

    deleteAuthorityDetailByAuthorityId(id:any) {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', this.authToken);
        return this.http.delete('http://localhost:9092/api/admin/deleteAuthorityDetailByAuthorityId/'+id, {headers: headers});
    }


}