# Getting Started

## Setup

For this learning, you'll need the following to be installed on your laptop beforehand.
**Please take a moment to install them**

Required:

- [Visual Studio Code](https://code.visualstudio.com/)
- [NodeJS:LTS](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)

### Node

Once node is installed, you can test your setup opening a powershell window or command window  
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
> npm i -g @sap/cds-dk
```

> Ignore warnings in the console

Once the installation is done, test your setup with the following command line.

```sh
> cds -v
```

### Git

:information_source: When installing git, leave all values per default

Once the installation is done, test your setup with the following command line in any repository

```sh
> git
```

This should display the list of commands available using git CLI (**C**ommand **L**ine **I**nterface)

## Retrieve learning material

### :warning: Access Token

The first time, you connect to GitLab, you'll have to create an access token to be able to pull the learning material.
To do so:

1. connect to [gitLab](https://innersource.soprasteria.com/sap-technologies-trainings/ui5overview)
2. Top right corner, click on your avatar and select settings
3. On the left pannel, select access token
4. Give it a name, for ex. `ui5Overview`
5. Choose an expiry date in the near future (1 or 2 months)
6. Tick `read_user` and `read_repository`
7. Press Create Access Token
8. Copy and paste this access token in a notepad

> If you happen to forget the last step, you'll need to start all over from step 4 as you CANNOT get the access token value after you changed the page

Open a `git bash` in the directory of your choice (in Documents or on Desktop for example)

:information_source: Right click -> git bash here

Then use the following command

`git clone https://innersource.soprasteria.com/sap-technologies-trainings/ui5overview.git`

Provide credentials when prompt:

- user: **firstname.lastname**, ex john.doe
- password: **access token** you have generated

If everything goes fine, you should have at least the following in your main directory:

```sh
app/
db/
buildScript/
srv/
package.json
```

If not, please raise an hand and an instructor will help you out

Go back to [ReadMe](/README.md)
