import { Pageable } from "./pageable";

export class QueryTerms {​
	​public pageable:Pageable = new Pageable();	​
	public keyword:string;
	public isSearching:boolean = false;
	public showInactiveRegisters = false;
}