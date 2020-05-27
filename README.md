
# Getting Started

## Setup

- Visual Studio Code [VSCode Website](https://code.visualstudio.com/)

- Install nodeJS:LTS [nodeJS Website](https://nodejs.org/en/download/)

Test install
```sh
> node -v
> npm -v
```

```sh
> npm set @sap:registry=https://npm.sap.com
> npm install -g  @sap/cds
```

test
```sh
> cds -v
```

- (Optional) Yeoman https://yeoman.io/
- (Optional) EasyUI5


Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File / Folder | Purpose
---------|----------
`app/` | content for UI frontends go here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps...
- Open a new termina and run `npm i`
- Open a new terminal and run  `cds watch`
- ( in VSCode simply choose _**Terminal** > Run Task > cds watch_ )
- Start adding content, e.g. a [db/schema.cds](db/schema.cds), ...


## Learn more...

Learn more at https://cap.cloud.sap/docs/get-started/
