sap.ui.define(
  ["com/ssg/myUI5App/controller/BaseController", "sap/m/MessageToast"],
  function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("com.ssg.myUI5App.controller.Home", {
      onPress: function (oEvent) {
        MessageToast.show("Hello World", {
          duration: 3000, // default
          my: "center center",
          at: "center center",
          animationTimingFunction: "ease-in-out",
        });
      },
      navToDetail: function (oEvent) {
        const oItem = oEvent.getSource();
        const sOrder = oItem.getBindingContext().getObject().orderID;
        this.navTo("RouteDetail", {
          order: sOrder,
        });
      },
    });
  }
);
