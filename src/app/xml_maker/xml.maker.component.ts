import { Component, OnInit } from '@angular/core';
import { XMLMakerService, WebsocketService } from '@/_services';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { XMLInfo } from '@/_models/xml';
import { Subject } from 'rxjs';


@Component({ templateUrl: 'xml.maker.component.html' })
export class XMLMakerComponent implements OnInit {

    public log_file : any = 'downlaod_file';
    public token: any = 'a5f97b77-2279-46f7-a50b-85837709fffd';
    public saveSocketClientInfo: Subject<any>;
    public fileForm: FormGroup;
    public xmlForm: FormGroup;
    public xmlString: string = '';
    public message: string = "--";
    public xmlInfo: XMLInfo;
    public file: File;

    constructor(private xmlService: XMLMakerService, private wsService: WebsocketService, 
        public fb: FormBuilder) {
            this.saveSocketClientInfo = <Subject<any>> wsService
            .connect(this.log_file).pipe((response: any): any => {
                return response;
            });
    }

    ngOnInit() {
        this.sendMsg(this.token);
        this.saveSocketClientInfo
            .subscribe(msg => {
                console.log(msg);
        });

        this.xmlForm = this.fb.group({
            url: new FormControl('', Validators.required),
            tags: this.fb.array([ this.buildItem(), this.buildItem(), this.buildItem()]),
            // screen_shoot: new FormControl(false),
            html_cdata: new FormControl(false),
            page_url: new FormControl(false),
            pdf: new FormControl(false),
            html: new FormControl(false)
          });

        this.fileForm = this.fb.group( {
            file: new FormControl(null, Validators.required),
        });
    }

    // save clent into
    public sendMsg(msg) {
        this.saveSocketClientInfo.next(msg);
    }

    public buildItem(): any {
        return new FormGroup({
          tag_name: new FormControl('', Validators.required),
          parent_tag: new FormControl(''),
          html_tag: new FormControl(''),
          cdata: new FormControl(false)
        });
    }

    public createFile(): any {
        const file = new Blob([this.xmlString], { type: 'application/xml' });
        saveAs(file, 'Raad-Master-Data ' + this.uuid() + '.xml');
    }

    public uuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
          let random = Math.random() * 16 | 0;
          let value = char === "x" ? random : (random % 4 + 8);
          return value.toString(16);
        });
    }

    public get tageForms(): FormArray {
        return this.xmlForm.get('tags') as FormArray;
    }
    
    public tageFormsAddItem(): void {
        this.tageForms.push(this.buildItem());
    }
    
    public tageFormRemoveItem(index: number) {
        this.tageForms.removeAt(index);
    }

    public submintTageForms(xmlInfo: any): any {
        this.xmlInfo = xmlInfo;
        this.xmlService.getXmlData(this.xmlInfo)
        .subscribe((response: any) => {
            this.xmlString = response.data;
            this.message = response.message;
        }, error => {
            this.message = error.error.message;
            console.log('Error :- ' + JSON.stringify(error));
        });
    }

    public addFile(file: File): void {
        this.file = file;
    }
    
}