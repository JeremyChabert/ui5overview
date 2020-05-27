# Hello world starter

Open your app folder and search for Home.view.xml
Path should be `webapp/view/`

Open a browser and navigate to SAPUI5 SDK.  
Click on Samples in the header and look for `MessageStrip` component  
Among the samples, pick `Message Strip with enableFormattedText`  
You should see the results of different message strip layout
At the top right of the browser page, next to download, you should see a button look like {≡}.
This is to access the source code of what you're currently viewing.
Press it.

You'll have a xml view similar to this sample below ↓  

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

Rule of thumb:

- A component will always start with an Uppercase letter
- An aggregation of a component will always start with a lowercase letter
