# OData Binding

## OData ?
[OData](https://www.odata.org/) (Open Data Protocol) is a standard that defines a set of best practices for building and consuming RESTful APIs, created by Microsoft. It is widely used by SAP technologies, including by the SAPUI5 framework.

## Explore the OData API
To get a better understanding of how an OData API works, we will explore our own OData API.

To do so, go to [http://localhost:4004/api](http://localhost:4004/api). You should see a list of the availables *entities* (endpoints) available in the service.

An OData service is defined by a **metadata** document, a machine-readable description of the data model of the API. The SAPUI5 framework uses the metadata document to create an `ODataModel`. To see the metadata of our API, go to [http://localhost:4004/api/$metadata](http://localhost:4004/api/$metadata).

Here are a few examples of OData GET queries against our API:
- [http:localhost:4004/api/Orders](http:localhost:4004/api/Orders): Dislays a list of all the Orders
- [http:localhost:4004/api/Orders(01d4e16e-ab1a-45c7-8f13-e76edac4c014)](http:localhost:4004/api/Orders(01d4e16e-ab1a-45c7-8f13-e76edac4c014)): Displays the Order with the ID *01d4e16e-ab1a-45c7-8f13-e76edac4c014*
- [http:localhost:4004/api/Materials](http:localhost:4004/api/Materials): Displays a list of all the Materials
- [http://localhost:4004/api/Orders?$expand=items](http://localhost:4004/api/Orders?$expand=items): Displays a list of Orders with their items
- [http://localhost:4004/api/Orders?$filter=currency eq 'XAF'&$orderby=createdAt](http://localhost:4004/api/Orders?$filter=currency%20eq%20%27XAF%27&$orderby=createdAt): Displays a list of the Orders with a currency of *XAD*, ordered by their creation date

A lot of other query options exist. To learn more, click [here](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/)

## Configure an OData model

## Display a list of Orders