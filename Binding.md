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

Now, instead of "Hello World", we should have "Hello Paul" !

## Add an input field to change the `name` property
Finally, we are going to add an input field to be able to change the value of the `name` property of the model.

In `Home.view.xml`, add:
```xml
<!-- ... -->
          <!-- Add the Input at the end of the <content>, below the button -->
          <Input value="{local>/name}" placeholder="Say hello to..."/>
<!-- ... -->
```

Now, when we change the value of the input and hit "Enter" or un-focus the input, the text updates automatically !

This is what is called **two-way binding**. This means that if we change a value in the model, the view is updated, but **also** that if we change a binded property in the view, the model is updated too.

>There is 3 types of binding in SAPUI5:
> - *One Time*: binding from the model to the view, once
> - *One Way*: binding from the model to the view. A value change in the model update all corresponding bindings and the view
> - *Two Way*: binding from the model to the view and from the view to the model. A value change in the model and in the view updates all corresponding bindings and the view and model, respectively