import * as vkbeautify from 'vkbeautify';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'xml' })
export class XmlPipe implements PipeTransform {
    
    public transform(value: string): string {
        return vkbeautify.xml(value);
    }
}