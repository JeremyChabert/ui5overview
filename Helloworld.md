# Hello world starter

Start VSCode from the directory where you have cloned your app

- From Windows Explorer, `Right Click -> Open in VSCode`
- From a terminal prompt, type `code .`

In VSCode, open an integrated terminal:

- Press key `Ctrl+P`
- Start typing `>integra`
- Select `Create New Integrated Terminal`

Then enter following command:

```sh
#install dependencies
> npm i

#once finished, run the app
> cds watch

# what you should see in the console
...
[cds] - launched in: 3328.892ms
[cds] - server listening on { url: 'http://localhost:4004' }
[ terminate with ^C ]
...
```

Open the app by clicking the hyperlink in the console or open chrome and type
`http://localhost:4004/webapp/index.html`

## View

Open your app folder and search for `Home.view.xml`
Path should be `webapp/view/`

What you should all have at this point is:

```xml
 <mvc:View >
  <App id="idAppControl">
    <pages>
        <MessagePage text="{i18n>welcomeMessage}"
        showHeader="false" icon="sap-icon://thumb-up"
        description=""/>
    </pages>
  </App>
</mvc:View>
```

>Note: We shorten the real content of your app, just focus on the xml tag

Delete the everything related to the `MessagePage`.
And replace it with the sample below

```xml
<Page title="{i18n>title}">
    <headerContent>

    </headerContent>
    <content>

    </content>
    <footer>

    </footer>
</Page>
```

Open a browser and navigate to [SAPUI5 SDK].  
Click on Samples in the header and look for `MessageStrip` component  
Among the samples, pick `Message Strip with enableFormattedText`  
You should see the results of different message strip layout
At the top right of the browser page, next to download, you should see a button look like {=}.
This is to access the source code of what you're currently viewing.
Press it.

You'll have a xml view similar to this sample below  

```xml
<mvc:View
 xmlns:l="sap.ui.layout"
 xmlns:mvc="sap.ui.core.mvc"
 xmlns="sap.m"
 controllerName="sap.m.sample.MessageStripWithEnableFormattedText.controller.MessageStripWithEnableFormattedText">
    <l:VerticalLayout class="sapUiContentPadding" width="100%">
        <l:content>
            <MessageStrip
                text="{/default}"
                type="Success"
                enableFormattedText="true"
                showIcon="true"
                showCloseButton="true"
                class="sapUiMediumMarginBottom">
            </MessageStrip>
            ...
        </l:content>
    </l:VerticalLayout>
</mvc:View>
```

Let's review what it contains and how to read it.  
First element is `<mvc:View>`.  
The prefix _mvc_ stands for the alias of the library we are using, here: `sap.ui.core.mvc`.  
The view contains a property called `controllerName`.  
There's a 1:1 relationship between a view and a controller.  

Then the second *imbricated* component is `VerticalLayout` which has an aggregation property called `content`  
What does this means ?  
It means that between the `<l:content></l:content>` tag, every next components declared will inherit the css properties of the parents components. In our case, they will be placed vertically according to the default css properties attached to `VerticalLayout`  
A similar component exists for layouting components horizontally  

Finally, we have the `MessageStrip` component, the one we looked for with some of its properties.  
If you look closely in the header bar, you'll see a big blue button `API reference`. This will direct you to the API reference of this component and you'll be able to see all its features and how to use them  

>Rule of thumb:
>
> - A component will always start with an Uppercase letter
> - An aggregation of a component will always start with a lowercase letter

Let's get back to our webapp.

Copy the `MessageStrip` component (everything between the tags `<MessageStrip>`) and paste it in your app between the `<content>` tags

Change the `showCloseButton` attribute and set it to false

Change the `text` attribute with the following:
`{i18n>helloWorld}`

## i18n

[What is i18n?](https://inui.io/sap-ui5-ultimate-guide-internalization-i18n/)

Go to your `i18n` folder.

Edit `i18n_fr.properties` with the following content
`helloWorld=Bonjour Monde`

Edit `i18n.properties` with the following content
`helloWorld=Hello world`

You can now test your app by adding `?sap-language=fr` or `?sap-language=en` at the end of the url (after `.html`)

## Controller

In addition to the message strip, we'll add a button that will display a `MessageToast`

Once again, (re)open the [SAPUI5 SDK] and look for the Button Component in the sample

This component will need an implementation in 2 parts:

- the component itself in the view
- the method associated with the press event (`press` which triggers `onPress`) in the controller

```xml
<Button text="Say hello"
press="onPress"
ariaDescribedBy="defaultButtonDescription genericButtonDescription">
</Button>
```

Now in the `controller/` folder, select the corresponding controller attached to the view

Write down the code below between the curly brakets **{ }** of `Controller.extend(...,{})`

```js
onPress: function (oEvent) {
    sap.m.MessageToast.show("Hello World", {
      duration: 3000, // default
      my: "center center",
      at: "center center",
      animationTimingFunction: "ease-in-out",
    });
}
```

Alternative

Declare the use of the library in the define section

```js
sap.ui.define([
  "com/ssg/myUI5App/controller/BaseController",
  "sap/m/MessageToast"
]
```

Give it an alias in the function list of parameters

```js
function(Controller,MessageToast)
```

Then, you can use the library directly throught its alias

```js
onPress: function (oEvent) {
    MessageToast.show("Hello World",
      duration: 3000, // default
      my: "center center",
      at: "center center",
      animationTimingFunction: "ease-in-out",
    });
}
```

Give it a shot and go to your [local app](http://localhost:4000/index.html) and press the button

[SAPUI5 SDK]:(https://sapui5.hana.ondemand.com/)
