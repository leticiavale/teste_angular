import { Pageable } from "./pageable";

export class DataTable {
	public content:any[];
	​public empty:boolean;	​
	​public first:boolean;​
	​public last:boolean;	​
	​public number:number;​
	​public numberOfElements:number;​	​
	​public pageable:Pageable = new Pageable();	​
	​public size:number;​	​
	​public sort:any;​
	​public totalElements:number = 0;​	​
	​public totalPages:number;​
}