# Navigation

## Summary

What will see in this part is :

- Declaration of routes (manifest.json)
- Routing configuration
- Route parameters

## Explanations

In UI5, navigation deals with moving from one content to another by changing the page displayed.  
It can be seen at the end of the URL like in the below example :

- `http://localhost:4004/webapp/index.html`
- `http://localhost:4004/webapp/index.html#/Home`
- `http://localhost:4004/webapp/index.html#/Detail/XXXYYY`

Some navigations carry only a **pattern**, others also include parameters (optional or mandatory)

## Implementing our first navigation

### Create detail content

Starting from the ODataBinding part, we will create the following object:

- Detail.view.xml

> Brace yourself, that's a big one

```xml
<!-- Detail.view.xml -->
<mvc:View id="idDetailView" controllerName="com.ssg.myUI5App.controller.Detail" displayBlock="true"
  xmlns="sap.uxap"
  xmlns:m="sap.m"
  xmlns:layout="sap.ui.layout"
  xmlns:mvc="sap.ui.core.mvc">
  <ObjectPageLayout id="ObjectPageLayout" showTitleInHeaderContent="false">
    <headerTitle>
      <ObjectPageHeader id="idObjectPageHeader" isObjectTitleAlwaysVisible="true" objectImageURI="sap-icon://sales-order-item" isObjectIconAlwaysVisible="true" objectImageShape="Square" objectTitle="{orderID}">
      </ObjectPageHeader>
    </headerTitle>
    <headerContent>

      <!-- CUSTOMER DATA WILL BE INSERT HERE -->

    </headerContent>
    <sections>
      <ObjectPageSection id="idSectionDetail" title="{i18n>Details}">
        <subSections>
          <ObjectPageSubSection title="Stuff1">

            <!-- TABLE ITEMS WILL BE INSERT HERE -->

          </ObjectPageSubSection>

           <!-- ↓ STATIC CONTENT TO FILL THE VIEW ↓ -->
          <ObjectPageSubSection title="Stuff2">
            <m:FlexBox direction="Column" alignItems="Stretch"
              alignContent="Start" justifyContent="SpaceBetween">
              <m:Text text="anotherStuff"/>
              <m:Text text="yetAnotherOne"/>
            </m:FlexBox>
          </ObjectPageSubSection>
        </subSections>
      </ObjectPageSection>
      <ObjectPageSection id="idSectionList" title="{i18n>OtherDetails}">
        <subSections>
          <ObjectPageSubSection title="Stuff3">
            <m:FlexBox direction="Row" alignItems="Stretch" alignContent="Start"
            justifyContent="SpaceBetween">
              <m:Text text="someStuff"/>
              <m:Text text="otherStuff"/>
            </m:FlexBox>
          </ObjectPageSubSection>
          <ObjectPageSubSection title="Stuff4">
            <m:FlexBox direction="Column" alignItems="Stretch"
            alignContent="Start" justifyContent="SpaceBetween">
              <m:Text text="anotherStuff"/>
              <m:Text text="yetAnotherOne"/>
            </m:FlexBox>
          </ObjectPageSubSection>
        </subSections>
      </ObjectPageSection>
    </sections>
  </ObjectPageLayout>
</mvc:View>
```

The view, we've just pasted will later be enriched with additional dynamic content.
It lies on the [ObjectPageLayout](https://sapui5.hana.ondemand.com/#/entity/sap.uxap.ObjectPageLayout/sample/sap.uxap.sample.ObjectPageOnJSON), which is a commonly used component to display the lowest detail level

- Detail.controller.js

```js
// Details.controller.js
sap.ui.define([
  "com/ssg/myUI5App/controller/BaseController"
], function(Controller) {
  "use strict";

  return Controller.extend("com.ssg.myUI5App.controller.Detail", {
      onInit:function(){
        const oRouter = this.getRouter();
        oRouter.getRoute("RouteDetail")
        .attachPatternMatched(this._onObjectMatched, this);
      },
      _onObjectMatched:function(){
        const sOrder = oEvent.getParameter("arguments").order;
        sap.m.MessageToast.show(`You're viewing order : ${sOrder}`)
      }
  });
});
```

The controller implements onInit() which is called the first time the controller is used.
In our example, when the RouteDetail pattern is matched, then we trigger a `MessageToast` to display the pressed order

### Link the new content

In `manifest.json`, you'll declare the route configuration.
Start to look for the following property

```json
"routing": {
  ...
}
```

Then declare below the exisitng route `RouteHome`, our new route called `Detail` using the following template:

```json
...,
{
    "pattern":"Detail/{order}",
    "name":"RouteDetail",
    "target":"Detail_Target"
}
```

> As it's JSON declaration beware of the **`,`** to add after the existing route declaration

Now we need to match a target to `Detail_Target`, this will be done in the `targets` properties

```json
"targets": {
  ...
}
```

Add the following after the existing target which should be `Home`

```json
"targets":{
    ...,
    "Detail_Target" : {
        "viewName":"Detail",
        "viewLevel":"1",
        "transition":"slide"
    }
}
```

> As it's JSON declaration beware of the **`,`** to add after the existing target declaration  
>Instead of slide, you can try one of these: [flip,show,fade]

So now, our router knows which view to call when called with a navigation to RouteDetail.  
Lastly, we need to do the trigger.  

On `Home.view.xml`, you'll need to add the connect the press event to a method

```xml
<StandardListItem
...
press="navToDetail"
...>
...
</StandardListItem>
```

Then, on `Home.controller.js`, we will react to the press event with the following implementation.

```js
navToDetail:function(oEvent){
    const oItem = oEvent.getSource();
    const sOrder = oItem.getBindingContext().orderId;
    this.navTo('RouteDetail',{
        order:sOrder
    })
}
```

>It's retrieving the source of the event, the item pressed. Once we have the item pressed, we retrieve its binding context to get the order identifier and pass it to the route as a parameter

## Bonus: bind Detail to order clicked

Currently in `Detail.controller.js`, we are retrieving the order parameter and display it in a message toast.
Let's change that and use this navigation parameter to bind our view Detail to this order

```js
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
```

Then, in the `Detail.view.xml`, let's place the following xml code to its relevant placement

```xml
<!-- customer content -->
<m:FlexBox direction="Row">
  <layout:VerticalLayout >
    <m:Link text="{customer/phone}"/>
    <m:Link text="{customer/website}"/>
  </layout:VerticalLayout>
  <layout:VerticalLayout>
    <m:Text text="{customer/street}"/>
    <m:Text text="{customer/city},{customer/country}"/>
  </layout:VerticalLayout>
</m:FlexBox>
```

```xml
<!-- table items content -->
<m:Table growing="true" growingThreshold="5" id="SalesOrderItems" items="{path:'items'}" mode="None">
  <m:headerToolbar>
    <m:Toolbar>
      <m:Title text="Sales Order Items" titleStyle="H2"/>
    </m:Toolbar>
  </m:headerToolbar>
  <m:columns>
    <m:Column>
      <m:Text text="SalesOrderItem"/>
    </m:Column>
    <m:Column>
      <m:Text text="Product"/>
    </m:Column>
    <m:Column>
      <m:Text text="Quantity"/>
    </m:Column>
    <m:Column>
      <m:Text text="Net Value"/>
    </m:Column>
  </m:columns>
  <m:ColumnListItem>
    <m:Text text="{item}"/>
    <m:ObjectIdentifier title="{materialID}" text="{material/description}"/>
    <m:Text text="{quantity}"/>
    <m:Text text="{netValue}"/>
  </m:ColumnListItem>
</m:Table>
```

If everthing goes fine, you should have an Object page layout with the customer data showing in the header section and a list of items showing in a table for the order previously pressed.
