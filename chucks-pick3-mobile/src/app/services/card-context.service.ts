import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {CardContext} from "../models/card-context";

@Injectable()
export class CardContextService {
    private context:Subject<CardContext> = new BehaviorSubject<CardContext>(null);

    get context$(){
        return this.context.asObservable();
    }

    addContext(context:CardContext) {
        this.context.next(context);
    }
}
