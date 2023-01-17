import BaseController from "./BaseController";
import formatter from "../model/formatter";
import JSONModel from "sap/ui/model/json/JSONModel";
import Table from "sap/ui/table/Table";
import Column from "sap/ui/table/Column";
import Text from "sap/m/Text";

/**
 * @namespace com.myorg.myapp.controller
 */
export default class Main extends BaseController {
	private formatter = formatter;

	public onInit(){
		this.getPosts();
	}
	public async getPosts(){
		const posts = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();
		this.setModel(new JSONModel(posts),"ViewModel");
	}

	public createTable(){
		
	}
}
