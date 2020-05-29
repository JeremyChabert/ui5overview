sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device",
  "com/ssg/myUI5App/model/models",
  "sap/ui/model/json/JSONModel"
], function(UIComponent, Device, models, JSONModel) {
  "use strict";

  return UIComponent.extend("com.ssg.myUI5App.Component", {

    metadata: {
      manifest: "json"
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init: function() {
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // enable routing
      this.getRouter().initialize();

      // set the device model
      this.setModel(models.createDeviceModel(), "device");

      // Local model
      const data = { // the data that the model will contain initially
        name: 'Paul'
      };
      const jsonModel = new JSONModel(data); // creating the model
      sap.ui.getCore().setModel(jsonModel, 'local'); // assigning the model to the SAPUI5 core
    }
  });
});
