import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthorityService } from '@/_services';
import { AuthorityDto } from '@/_models';

@Component({ 
    templateUrl: 'authority.component.html',
})
export class AuthorityComponent implements OnInit {

    public authorityList: AuthorityDto[] = [];
    public authority: AuthorityDto;
    public authorityForm: FormGroup;
    public fileName:string;


    constructor(private authorityService: AuthorityService, public fb: FormBuilder) {}

    ngOnInit() {
        this.getAllAuthority();
        this.initForm();
    }

    public initForm() {
        this.authorityForm = this.fb.group({
            id: new FormControl(),
            name: new FormControl('', Validators.required),
            filename: new FormControl(''),
            authorityDetail: this.fb.array([]),
        });
    }

    public buildItem(): any {
        return new FormGroup({
            id: new FormControl(),
            name: new FormControl('', Validators.required),
        });
    }

    public buildItemV2(name:any): any {
        return new FormGroup({
            id: new FormControl(),
            name: new FormControl(name, Validators.required),
        });
    }

    public get authortyDetailsForms(): FormArray {
        return this.authorityForm.get('authorityDetail') as FormArray;
    }
    
    public authortyDetailsFormsAddItem(): void {
        this.authortyDetailsForms.push(this.buildItem());
    }
    
    public authortyDetailsFormsRemoveItem(index: number) {
        var item = this.authortyDetailsForms.at(index);
        if(item.value.id !== null) {
            this.authorityService.deleteAuthorityDetailByAuthorityId(item.value.id)
                .subscribe((response: any) => {
                    console.log(response);
                }, error => {
                    console.log('Error :- ' + JSON.stringify(error));
                });
        }
        this.authortyDetailsForms.removeAt(index);
    }

    // looks good
    public getAllAuthority() {
        this.authorityService.getAllAuthority()
            .subscribe((response: any) => {
                this.authorityList = response.data;
            }, error => {
                console.log('Error :- ' + JSON.stringify(error));
            });
    }

    // looks good
    public getAuthorityDetailByAuthorityId(authorityId:any) {
        this.authorityService.getAuthorityDetailByAuthorityId(authorityId)
        .subscribe((response: any) => {
            this.authority = response.data;
            let tempAuthDetail = this.fb.array([]);
            for(let i=0; i<this.authority.authorityDetail.length; i++) {
                let element = this.authority.authorityDetail[i];
               tempAuthDetail.push(
                  this.fb.group({
                      id: element.id,
                      name: element.name
                  })
                );
            }
            this.authorityForm.patchValue({
                id: this.authority.id,
                name: this.authority.name, 
                filename: this.authority.filename
            });
            this.authorityForm.setControl('authorityDetail', tempAuthDetail);
        }, error => {
            console.log('Error :- ' + JSON.stringify(error));
        });
    }

    fileReaded:any;
    // looks good
    public bulkUpload(fileLoadedEvent) {
        this.fileReaded = fileLoadedEvent.target.files[0];
        this.fileName = this.fileReaded.name;
        let reader: FileReader = new FileReader();
        reader.readAsText(this.fileReaded);
        reader.onload = (e) => {
          let csv: any = reader.result;
          let allTextLines = csv.split(/\r|\n|\r/);
          let headers = allTextLines[0].split(',');
          for (let i = 0; i < allTextLines.length; i++) {
            // split content based on comma
            let data = allTextLines[i].split(',');
            if (data.length === headers.length) {
              let tarr = [];
              for (let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
              }
              if(tarr[0] !== '' && tarr[0] !== 'Company Name') {
                this.authortyDetailsForms.push(this.buildItemV2(tarr[0]));
              }
            }
          }
        }
    }

    // looks good
    public submint(authorityForm: any) {
        this.authority = authorityForm;
        if(this.fileName !== null) {
            this.authority.filename = this.fileName;
        }
        console.log(this.authority);
        this.authorityService.saveAuthority(this.authority)
            .subscribe((response: any) => {
                console.log(response.data);
                this.getAllAuthority();
                this.initForm();
            }, error => {
                console.log('Error :- ' + JSON.stringify(error));
            });
    }

}