# Getting Started

## Setup

For this learning, you'll need the following to be installed on your laptop beforehand.
**Please take a moment to install them**

Required:

- [Visual Studio Code](https://code.visualstudio.com/)
- [NodeJS:LTS](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)

Optional:

- [Yeoman](https://yeoman.io/)
- EasyUI5

### Node

Once node is intall, you can test your setup opening a powershell window or command window  
(window icon->search->cmd.exe)
In the shell of your choice, write the following lines

```sh
> node -v #should display the version of node as a result */
> npm -v  #should display the version of npm as a result */
```

If node command is working fine, then set the sap registry by copying this the line below in your shell window.

```sh
> npm set @sap:registry=https://npm.sap.com
```

Then install globally the sap/cds material with the following command line.
This should takes a few minutes

```sh
> npm i -g @sap/cds
```

Once the installation done, test your setup with the following command line.

```sh
> cds -v
```

### Git

## Retrieve learning material

Open a git bash in the directory of your choice.
Then use the following command

`git clone https://innersource.soprasteria.com/sap-technologies-trainings/ui5overview.git`

If everything goes fine, you should have at least the following in your main directory:

```sh
app/
db/
buildScript/
srv/
package.json
```
