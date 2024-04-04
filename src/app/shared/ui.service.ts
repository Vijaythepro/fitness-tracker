import { Subject } from 'rxjs';

export class UiService{
    loadingChange = new Subject<boolean>();
}