import Page from "sap/m/Page";
import Text from "sap/m/Text";
import JSView from "sap/ui/core/mvc/JSView";
import Column from "sap/ui/table/Column";
import Table from "sap/ui/table/Table";
type cellObject = {text : string,id : string};

sap.ui.jsview("com.myorg.myapp.view.Main",{
    getControllerName : function(){
        return "com.myorg.myapp.controller.Main";
    },
    createContent : function(){
        const _self = this as JSView;

        const page = new Page();
        const table = new Table({
            selectionMode : "None",
            rows : {
                path : "ViewModel>/"
            },
            columns : [
                new Column({
                    width : "10rem",
                    label : "User Id",
                    template : new Text({text : "{ViewModel>userId}"})
                }),
                new Column({
                    label : "title",
                    template : new Text({text : "{ViewModel>title}"})
                })
            ],
            rowsUpdated : function(){
                const dTable = document.querySelector("#"+table.getId());
                const cellArr = cellMerge(1);
                let count = 1;
                dTable.querySelector(`.sapUiTableContentRow td[rowspan]`)?.removeAttribute("rowspan");
                dTable.querySelectorAll(`.sapUiTableContentRow td[hideColumn="true"]`)?.forEach(cell=>{
                    cell.removeAttribute("style");
                    cell.removeAttribute("hideColumn");
                });
                function cellMerge(index : number){
                    const cellArr : cellObject[] = [];
                    const cells = dTable.querySelectorAll(`.sapUiTableContentRow td[aria-colindex="${index}"].sapUiTableCell`);
                    cells.forEach(cell=>{
                        const span = cell.querySelector("span")
                        if(span.textContent){
                            cellArr.push({id : cell.id,text : span.textContent});
                        }
                    })
                    return cellArr;
                }
    
                while(cellArr.length){
                    const cellObject = cellArr.pop();
                    const cell = document.querySelector("#"+cellObject.id) as HTMLElement;
                    if(cellArr.length===0){
                        cell.setAttribute("rowspan",count.toString());
                        break;
                    }
    
                    if(cellArr[cellArr.length-1].text === cellObject.text){
                        count++;
                        cell.setAttribute("hideColumn", "true");
                        cell.setAttribute("style", "display : none");
                    }else{
                        cell.setAttribute("rowspan",count.toString());
                        count = 1;  
                    }
                }
            }
        });

        
        
        page.addContent(table);
        
        return page;
    }
})