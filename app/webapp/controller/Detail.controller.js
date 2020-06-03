sap.ui.define(["com/ssg/myUI5App/controller/BaseController"], function (
  Controller
) {
  "use strict";

  return Controller.extend("com.ssg.myUI5App.controller.Detail", {
    onInit: function () {
      const oRouter = this.getRouter();
      oRouter
        .getRoute("RouteDetail")
        .attachPatternMatched(this._onObjectMatched, this);
    },
    _onObjectMatched: function (oEvent) {
      const sOrder = oEvent.getParameter("arguments").order;

      //remove
      // sap.m.MessageToast.show(`You're viewing order : ${sOrder}`);

      //add
      this.getView("idDetailView").bindElement({
        path: `/Orders(${sOrder})`,
        parameters: {
          $expand: "items($expand=material),customer",
        },
      });
    },
  });
});
