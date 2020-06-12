# OData Binding

## OData

[OData](https://www.odata.org/) (Open Data Protocol) is a standard that defines a set of best practices for building and consuming [RESTful](https://fr.wikipedia.org/wiki/Representational_state_transfer) APIs, created by Microsoft. It is widely used by SAP technologies, including by the SAPUI5 framework.

## Explore the OData API

To get a better understanding of how an OData API works, we will explore our own OData API.

To do so, go to [http://localhost:4004/api](http://localhost:4004/api). You should see a list of the availables *entities* (endpoints) available in the service.

An OData service is defined by a **metadata** document, a machine-readable description of the data model of the API. The SAPUI5 framework uses the metadata document to create an `ODataModel`. To see the metadata of our API, go to [<http://localhost:4004/api/$metadata>](http://localhost:4004/api/$metadata).

Here are a few examples of OData GET queries against our API:

- [<http:localhost:4004/api/Orders>](http:localhost:4004/api/Orders): Dislays a list of all the Orders
- [<http:localhost:4004/api/Orders(01d4e16e-ab1a-45c7-8f13-e76edac4c014)>](http:localhost:4004/api/Orders(01d4e16e-ab1a-45c7-8f13-e76edac4c014)): Displays the Order with the ID *01d4e16e-ab1a-45c7-8f13-e76edac4c014*
- [<http:localhost:4004/api/Materials>](http:localhost:4004/api/Materials): Displays a list of all the Materials
- [<http://localhost:4004/api/Orders?$expand=items>](http://localhost:4004/api/Orders?$expand=items): Displays a list of Orders with their items
- [<http://localhost:4004/api/Orders?$filter=currency eq 'XAF'&$orderby=createdAt>](http://localhost:4004/api/Orders?$filter=currency%20eq%20%27XAF%27&$orderby=createdAt): Displays a list of the Orders with a currency of *XAD*, ordered by their creation date

A lot of other query options exist. To learn more, click [here](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/)

## Configure an OData model

The configuration is done in the application description file, `manifest.json`.

First, we need to define our data source, that points to our API:

```json
{
  // ...
  "sap.app": {
    // ...
    // add a dataSources object under the existing properties
    "dataSources": {
        "API": {
          "uri": "/api/",
          "type": "odata",
          "settings": {
            "odataVersion": "4.0"
        }
      }
    }
  }
}
```

Now, let's define our model, still in `manifest.json`:

```json
{
  // ...
  "sap.ui5": {
    // ...
    "models": {
      "i18n": {
        // ...
        },
        // Add a new model:
      "": {
          "dataSource": "API",
          "type": "sap.ui.model.odata.v4.ODataModel",
          "settings": {
            "synchronizationMode": "None",
            "operationMode": "Server",
            "autoExpandSelect": true,
            "earlyRequests": true,
            "groupProperties": {
              "default": {
                "submit": "Auto"
              }
            }
          }
        }
      }
    },
    // ...
  }
}
```

Note: Since we only have one model, we use an *unnamed* model.

Now, when our app is created, it will query our OData API to get its metadata and build an `ODataModel`, that will be accessible from anywhere in our app.

## Display a list of Orders

Finally, let's use data binding to display a list of orders.

We will use a [sap.m.List](https://sapui5.hana.ondemand.com/#/api/sap.m.List) component. In the documentation link, if you go to *Aggregations*, you will see `items` in the list of available aggregations for this component.This is the aggregation that we are going to **bind** to the Orders entity of our model.

For the items of the list (i.e. the content of the `items` aggregation), we will use a [sap.m.StandardListItem](https://sapui5.hana.ondemand.com/#/api/sap.m.StandardListItem). The UI5 framework will generate an instance of StandardListItem for each entry in the Orders entity.

Go to the `Home.view.xml` file:

```xml
<!-- ... -->
 <content>
     <!-- Remove the existing content -->
     <List
       headerText="Orders"
       items="{
         path: '/Orders',
         parameters: {
           expand: 'customer'
         },
         sorter: { path: 'createdAt' }
       }"
       growing="true">
       <items>
         <StandardListItem
           title="{orderID}"
           description="{createdAt}"
           info="{customer/name} ({customer/phone})" />
       </items>
     </List>
 </content>
<!-- ... -->
```

We bind the `items` aggregation to the Orders entity, expanding the customer of the Orders, and sorting the results by their creation date.

We display the order ID, its creation date, and the name & phone number of the customer.

We also enable the "growing" feature, so that not all the data is loaded at once, but rather when the user scrolls.
