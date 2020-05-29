# Binding

## Create a local model with some initial data
We are going to create a local [JSON model](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.json.JSONModel).
This model will have some initial data, that we are going to display in the application using data binding.

First, import the JSONModel class in `Component.js`:
```js
sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device",
  "com/ssg/myUI5App/model/models",
  "sap/ui/model/json/JSONModel" // add the JSON model in the "define" array
], function(UIComponent, Device, models, JSONModel) { // add it here too
// ...
});
```

Then, initialize a new JSON model in the `init` function of the `Component.js`, that runs when the app is created:
```js
sap.ui.define([
  // ...
], function(UIComponent, Device, models, JSONModel) {
  "use strict";

  return UIComponent.extend("com.ssg.myUI5App.Component", {

    // ...

    init: function() {
        // ...
        // Below the existing code, add:
        const data = { // the data that the model will contain initially
            name: 'Paul'
        };
        const jsonModel = new JSONModel(data); // creating the model
        this.setModel(jsonModel, 'local'); // assigning the model to the SAPUI5 core
    }
  });
});
```

Now our model `local` will be available everywhere in our application.
Next, we'll see how to display the data of the model using data binding.

## Bind the model to a text element
We are going to display a custom "Hello" message using the `local` model that we just created.
To do so, we are going to change the `Home.view.xml` file, to replace the "Hello world" text.
```xml
<!-- ... -->
          <!-- Change the text property: -->
          <MessageStrip
            text="Hello {local>/name}"
            type="Success"
            showIcon="true"
            showCloseButton="false"
            class="sapUiMediumMarginBottom">
          </MessageStrip>
<!-- ... -->
```

Now, instead of "Hello World", we should have "Hello Paul".

## Remove initial data and bind the model property to an input instead
