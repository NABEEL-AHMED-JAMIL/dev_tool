import { Component, OnInit } from '@angular/core';
import { FormParserService } from '@/_services';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ParserHtml } from '../_models/parserHtml';
import { take } from 'rxjs/operators';


@Component({
    templateUrl: 'form.parser.component.html'
})
export class FormParserComponent implements OnInit {

    public htmlParser: FormGroup;
    public formParser: FormGroup;
    public parserHtml: ParserHtml;
    private controlTypes: any[];
    private formResponse: any[];

    constructor(private htmlParserService: FormParserService, public fb: FormBuilder) {
    }

    get parserTags(): FormArray {
        return this.formParser.get('parserTags') as FormArray;
    }

    ngOnInit() {
        this.htmlParser = this.fb.group({
            url: new FormControl('', Validators.required),
            tag: new FormControl('', Validators.required)
        });
        this.formParser = this.fb.group({
            parserTags: this.fb.array([]),
        });
    }

    public submintFormsParser(htmlParser: any): any {
        this.htmlParserService.formParser(htmlParser)
        .pipe(take(1))
        .subscribe((response: any) => {
            this.parserHtml = response;
            this.formResponse = this.parserHtml.data.formResponse;
            console.log(this.formResponse);
            this.controlTypes = this.parserHtml.data.controlTypes;
            console.log(this.controlTypes);
            for(let i=0; i<this.formResponse.length; i++) {
                //console.log(this.formResponse[i]);
                this.parserTags.push(this.buildItem(this.formResponse[i]));
            }
            console.log(this.parserTags.length);
            // this.formParser.setControl('parserTags', this.parserTags);
        }, (error) => {
            console.log('Error :- ' + JSON.stringify(error));
        });
    }

    public tageFormRemoveItem(index: number) {
        this.parserTags.removeAt(index);
    }

    public buildItem(data:any) {
        return new FormGroup({
            controlName: new FormControl(data.controlName),
            controlType: new FormControl(data.controlType),
            htmlTag: new FormControl(data.htmlTag),
            searchValue: new FormControl('')
        });
    }

}