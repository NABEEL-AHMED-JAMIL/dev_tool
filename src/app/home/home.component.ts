import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '@/_models';
import { UserService, AuthenticationService, WebsocketService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {

    public log_file : any = 'log_file';
    public token: any = '9faacaf6-e053-4812-8c7d-6be8b7f91596';
    public saveSocketClientInfo: Subject<any>;
    public currentUser: User;
    public users = [];
    public i:any = '0';
    public done = '10%';

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private wsService: WebsocketService) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.saveSocketClientInfo = <Subject<any>> wsService
            .connect(this.log_file).pipe((response: any): any => {
                return response;
            });
    }

    ngOnInit() {
        //this.loadAllUsers();
        this.sendMsg(this.token);
        this.saveSocketClientInfo
            .subscribe(msg => {
                this.i = msg;
                this.done = this.i+'%';
        });    
    }

    public deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    // save clent into
    public sendMsg(msg) {
        this.saveSocketClientInfo.next(msg);
    }
}