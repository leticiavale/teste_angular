import { Status } from "../utils/enum/status";
import { ClientType } from "../utils/enum/client-type";
import { Group } from "./group";
import { Phone } from "./phone";

export class Client {
	public id:number;
	public name:String;
	public status:Status;
	public type:ClientType;
	public cpg:String;
	public identity:String;
	public createdDate:Date;
	public group:Group = new Group();
	public phones:Phone[] = [];
}