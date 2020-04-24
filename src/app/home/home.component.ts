import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '@/_models';
import { UserService, AuthenticationService, WebsocketService, HomeService } from '@/_services';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {

    public log_file : any = 'downlaod_file';
    public token: any = 'a5f97b77-2279-46f7-a50b-85837709fffd';
    public saveSocketClientInfo: Subject<any>;
    public currentUser: User;
    public users = [];
    public i:any = '0';
    public done = '10%';
    public fileIdForm: FormGroup;
    public messageList: string[] = [];

    constructor(
        private authenticationService: AuthenticationService, private userService: UserService,
        private wsService: WebsocketService, private homeService: HomeService,
        public fb: FormBuilder) {
            this.currentUser = this.authenticationService.currentUserValue;
            this.saveSocketClientInfo = <Subject<any>> wsService
                .connect(this.log_file).pipe((response: any): any => {
                    return response;
            });
    }

    ngOnInit() {
        //this.loadAllUsers();
        this.fileIdForm = this.fb.group({
            ids: new FormControl('', Validators.required),
        });
        this.sendMsg(this.token);
        this.saveSocketClientInfo
            .subscribe(msg => {
                if(msg.status === 400) {
                    this.messageList.push(msg.message + ' ' + msg.fileName);
                } else if(msg.status === 200) {
                    this.messageList.push(msg.message + ' ' + msg.fileName);
                    const file = new Blob([msg.download]);
                    saveAs(file, msg.fileName);
                }
        });    
    }

    public submit(fileIdForm: any): any {
        let splitted: any = fileIdForm.ids.split(",").map(x=>+x); 
        let fileDetail = {
            "ids" : splitted,
            "toke" : this.token
        }
        this.homeService.downloadFile(fileDetail)
        .subscribe((response: any) => {
            console.log(response);
        }, error => {
            console.log('Error :- ' + JSON.stringify(error));
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