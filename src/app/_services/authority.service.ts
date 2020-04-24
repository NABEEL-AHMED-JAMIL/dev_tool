import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthorityService {

    public authToken: any = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSIsImtpZCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLndpbmRvd3MubmV0LyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2ZhYjYyYTVhLTQ1NDItNDRmZC05ODZmLTIxZjVmYTM3MjQzZS8iLCJpYXQiOjE1ODYyNzU2NjcsIm5iZiI6MTU4NjI3NTY2NywiZXhwIjoxNTg2Mjc5NTY3LCJhY3IiOiIxIiwiYWlvIjoiQVZRQXEvOFBBQUFBWUk0bk8vTmYvYXJ4d2JaNjBqQmprenlIZjhzYTN6Mk41bU12VU01OGxBQzlDaE9PNkJmanV6a2JVWEw2cklGRU5tMUZWbG5iQkFwaEpJbFpSVU9rUjd3WHYxUUNyRUF5dy9QRGdGSmxyRWc9IiwiYW1yIjpbInB3ZCIsIm1mYSJdLCJhcHBpZCI6ImY4N2VlOWI0LWQ4OTItNDMxYi1iZGI3LTZhZGQ3NzcxODFiZSIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiQWhtZWQiLCJnaXZlbl9uYW1lIjoiTmFiZWVsIiwiaXBhZGRyIjoiMTAzLjI1NS40LjU5IiwibmFtZSI6Ik5hYmVlbCBBaG1lZCIsIm9pZCI6IjY0M2UwM2I5LTQ2OTEtNGU3OC05Y2M0LTAwZjZiZTU5ZDkzYyIsInB1aWQiOiIxMDAzMjAwMDRDRDlCRUFFIiwic2NwIjoiRGlyZWN0b3J5LkFjY2Vzc0FzVXNlci5BbGwgVXNlci5SZWFkIFVzZXIuUmVhZEJhc2ljLkFsbCIsInN1YiI6InZDSkhiaEtBWFlka21MeTVrTUZUcURzUkc5d0xFRlF0YnNSTXFkX1U0STAiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiTkEiLCJ0aWQiOiJmYWI2MmE1YS00NTQyLTQ0ZmQtOTg2Zi0yMWY1ZmEzNzI0M2UiLCJ1bmlxdWVfbmFtZSI6Im5haG1lZEBtYWNyb3NvZnRpbmMuY29tIiwidXBuIjoibmFobWVkQG1hY3Jvc29mdGluYy5jb20iLCJ1dGkiOiJrUWlwRTliRDVFUzFIOC1MWjFzZEFBIiwidmVyIjoiMS4wIn0.lSHvDBFuB-w4oZXrEVQqUZB04eBx8LaOt93QxUDMAXJsqccrIbn1h0qBDMie1DKZq18Y1Rv8nxEseiJbyAsCcGs2_NZsB2f_qrE4PGbIYYKXr9amTUCD6r0CHUaQX6MNuCzs6GS3c5snm6kPqjqkX2asorTJzFP7LcsO7_J7pHpmUbEdwqDDUYZ4paEH486TvT5tVmwXWOgXI_G2IHcGBhOn5BsFi_FsfubJv-3A3VRumOu7iQqyEKiO6YyLEMVH-WQMmmSy3V2eUtIZhpsK3wY39Yn8tGPDb1ShXaGCJC959G77773NKjOGWic-1gRJo2napzo87mvNPW1maaEKdQ';

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