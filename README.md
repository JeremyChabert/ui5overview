
# UI5 Overview

## :warning: Getting Started

Please follow this setup guide in order to have all the tools required on your machine :computer: for this training

[Getting Started Guide](GettingStarted.md)

## Welcome to your new project

It contains at least these folders and files, following the recommended SAP project layout:

File / Folder | Purpose
--|--
`app/` | content for UI frontends go here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration

## Next Steps

- Open a new terminal and run

```sh
npm i #install all dependencies
```

- Open a new terminal and run

```sh
cds watch #run the application with autoreload on file changes
```

OR

- in VSCode simply choose _**Terminal** > Run Task > cds watch_

## Diving into UI5

### THE Guide

The link below shall be your bible.  
Everything you need or will need for this training or later is in this website [SDK](https://sapui5.hana.ondemand.com/)

So let's take a minute or two to look what it contains.

### The MVC principle

![SAPUI5 MVC](https://blogs.sap.com/wp-content/uploads/2015/09/mvc_799737.png)

**Model**: This is the part that is accountable for the management, retrieval, and updating of the data that is being viewed in your application.

**View**: This part is accountable for interpreting and rendering the initial UI. The view in the context of SAPUI5, generates the presentation to the user based on changes in the model.

What does a view look like? Well, in its directory, views are in stored in the “view” folder and names of XML views always end with __*.view.xml__ (as you’ll see later).

**Controller**: This is one of the most important parts.  
This is the part that is accountable for separating the view logic from the data logic.  
The Controller responds to user interaction and “view events” by adjusting the view and the model. The controller is essentially sending commands to the model to update it’s state, like editing a document in a word processing application.  
Similar to views, Controllers carry the same name as the related view (if there is a 1:1 relationship).  
Controller names always end with __*controller.js__ (as you’ll see below).  

## Building our app

- [HelloWorld](/HelloWorld.md)
- [Binding](/Binding.md)
- [Navigate](/Navigate.md)