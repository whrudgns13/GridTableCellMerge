import App from "sap/m/App";
import JSView from "sap/ui/core/mvc/JSView";

sap.ui.jsview("com.myorg.myapp.view.App",{
    getControllerName : function(){
        return "com.myorg.myapp.controller.App";
    },
    createContent : function(){
        const _self = this as JSView;
        return new App(_self.createId("app"))
    }
})