# Documentation

## Example
```javascript
const config    = require('./config.json'),
      USER_NAME = config['user_name'],
      USER_PASS = config['user_pass'],
      Minehut   = require('node-minehut');
      mh        = new Minehut();

async function example() {
  let user = await mh.getSession(USER_NAME, USER_PASS); // Gets & sets user session info
  await mh.setServer(user['servers'][0]); // Sets default server

  let serverInfo = await mh.getInfo(); // Gtes server information

  console.log(`Starting ${serverInfo['name']}!`);

  mh.startService(); // Start server service

  console.log(`This can take 30+ seconds...`)
}

example();
```

## Links
*Links may not work on NPM page.*
- [User Functions](#user-functions)
	- [getSession()](#getsession)
	- [getUser()](#getuseruser-id)
	- [setServer()](#setserverserver-id)

- [Server Functions](#server-functions)
	- [getInfo()](#getinfoserver-id)
	- [Server Management](#server-management)
		- [getStatus()](#getstatusserver-id)
		- [startService()](#startservice)
		- [start()](#start)
		- [destroyService()](#destroyservice)
		- [shutdown()](#shutdown)
		- [resetServerFiles()](#resetserverfiles)
		- [repairServerFiles()](#repairserverfiles)
	- [Server Settings](#server-settings)
		- [changeMOTD()](#changemotdmotd)
		- [changeName()](#changenamename)
		- [changeVisbility()](#changevisibilitytruefalse)
		- [changeProperty()](#changeproperty-field-value-)
	- [Server Files](#server-files)
		- [getFiles()](#getfilespath)
		- [getFileContent()](#getfilecontentpath)
		- [editFile()](#editfilepath-content)
		- [deleteFile()](#deletefilepath)
		- [createDir()](#createdirpath)
		- [deleteDir()](#deletedirpath)
	- [Plugins](#plugins)
		- [getPlugins()](#getplugins)
		- [getAllPlugins()](#getallplugins)
		- [installPlugin()](#installpluginplugin-id)
		- [removePlugin()](#removeplugin)
		-	[resetPlugin()](#resetplugin)
	- [World](#world)
		- [saveWorld()](#saveworld)
		- [resetWorld()](#resetworld)
		- [uploadWorld()](#uploadworld)
	- [Network](#network)
		- [getNetworkStats()](#getnetworkstats)
		- [getHomepageStats()](#gethomepagestats)
		- [getTopServers()](#gettopservers)

## User Functions
#### getSession()
*getSession()* retrieves user session data (token, session ID) from the user's email & password. Example:
```javascript
Minehut.getSession('example@example.com', 'p4ssw0rd');
```
*getSession()* returns the response from the Minehut API and also stores it in `this.session` so you don't have to pass the token and session with every function.

#### getUser(*User ID*)
*getUser()* returns user data (credits, servers, email). The default *User ID* is the user's own ID (Stored in `this.session`). Example:
```javascript
Minehut.getUser();
```

#### setServer(Server ID)
Most of the API endpoints require a Server ID and it'd be a pain to pass the Server ID with every function. This is **required** if you want to use any server related functions. Example:
```javascript
let session = await Minehut.getSession('example@example.com', 'p4ssw0rd');
// Minehut also returns an array of servers with getSession();
Minehut.setServer(session.servers[0]);
```

## Server Functions

__**All functions require setServer()**__

#### getInfo(*Server ID*)
Returns server information (name, plugins, properties). Example:
```javascript
let serverInfo = await Minehut.getInfo();
```

### Server Management

#### getStatus(*Server ID*)
Returns the status of the specified server (default is the server set in *setServer()*). Example:
```javascript
let serverStatus = await Minehut.getStatus();
console.log(serverStatus['status']);
```

#### startService()
Brings server out of hibernation (Usually takes 30+ seconds).
```javascript
Minehut.startService();
```
#### start()
Starts server if service is already online but the server is offline.
```javascript
Minehut.start();
```
#### destroyService()
Immediately stops and hibernates server.
```javascript
Minehut.destroyService();
```
#### shutdown()
Stops server but does not end process, can be started again using *start()*.
```javascript
Minehut.shutdown();
```

#### resetServerFiles()
Completely resets a server's files but not settings. Example:
```
console.log('Resetting server!');
Minehut.resetServerFiles();
```

#### repairServerFiles()
Repairs a server's file if there are any problems. Example:
```javascript
Minehut.repairServerFiles();
```

### Server Settings

#### changeMOTD(MOTD)
Changes the server's MOTD. Example:
```javascript
Minehut.changeMOTD('A &lvery&r cool MOTD');
```

#### changeName(name)
Changes the server's name. Example:
```javascript
Minehut.changeName('aVeryCoolServer');
```

#### changeVisibility(true/false)
Changes whether the server is visible on Minehut's server list. Example:
```javascript
Minehut.changeVisbility(false); // Hides Server
```

#### changeProperty(`{ field: value }`)
Changes a server's properties, for a list of valid properties/fields check the API documentation [here](https://api.bennydoesstuff.me/#/server/{server-id}/edit_server_properties). Example:
```javascript
Minehut.changeProperty({ pvp: true }); // Enable server PVP
```

### Server Files

#### getFiles(*path*)
Lists server's files in *path* (default root), returns an array of `{ name: "cool Folder", directory: true, blocked: false }`, does not loop through sub directories. Example:
```javascript
let rootFiles = await Minehut.getFiles(); // Returns array of files in root
console.log(rootFiles);
```
Output:
```
[
	{name:"whitelist.json", directory: false, blocked: false}
    ...
]
```
#### getFileContent(path)
Returns content of file (*path*). Example:
```javascript
let bannedIps = Minehut.getFileContent('banned-ips.json');
console.log('Banned IPs: ' + bannedIps);
```

#### editFile(path, content)
Overwrites existing file with *content* or creates a new file if *path* does not exist. Example:
```javascript
Minehut.editFile('whitelist.json', '{}'); // Overwrites existing file

Minehut.editFile('newFile.txt', 'new file content'); // Creates new file

Minehut.editFile('emptyNewFile.txt'); // Creates new empty file
```
#### deleteFile(path)
Deletes a file on the server. Example:
```javascript
Minehut.deleteFile('whitelist.json');
```
#### createDir(path)
Creates a new directory. Example:
```javascript
Minehut.createDir('newFolder/anotherFolder');
```

#### deleteDir(path)
Deletes a directory. Example:
```javascript
Minehut.deleteDir('newFolder');
// or to delete inside a folder
Minehut.deleteDir('newFolder/anotherFolder');
```
### Plugins

#### getPlugins()
Returns all installed plugins as an array of IDs. Example:
```javascript
let installedPlugins = await Minehut.getPlugins();
console.log(installedPlugins);
```
#### getAllPlugins()
Returns an array of every avaliable  plugin. Example:
```javascript
let plugins = await Minehut.getAllPlugins();
console.log(plugins);
```
#### installPlugin(Plugin ID)
Installs a plugin. Example:
```javascript
let plugins = await Minehut.getAllPlugins();
Minehut.installPlugin(plugins[0]);
```
#### removePlugin()
Removes a plugin from a server. Example:
```javascript
let installedPlugins = await Minehut.getPlugins();
Minehut.removePlugin(installedPlugins[0]);
```

#### resetPlugin()
Completely resets a plugins config files. Example:
```javascript
let installedPlugins = await Minehut.getPlugins();
Minehut.resetPlugin(installedPlugins[0]);
```

### World
#### saveWorld()
Saves the server's world.
```
Minehut.saveWorld();
```
#### resetWorld()
Completely resets the server's world.
```
Minehut.resetWorld();
```
#### uploadWorld()
Uploads a world (.zip file) to your server.
```
Minehut.uploadWorld('../world.zip');
```

### Network
#### getNetworkStats()
Returns statistics for the Minehut network (`player_count`, `server_count`). Example:
```javascript
let minehutStats = await Minehut.getNetworkStats();
console.log(minehutStats['player_count']);
```

#### getHomepageStats()
Returns total server and player count for the Minehut network. Example:
```javascript
let totalMinehutStats = await Minehut.getHomepageStats();
console.log('Total Servers Hosted: ' + totalMinehutStats['server_count']);
```

#### getTopServers()
Returns a list of the top 5 Minehut servers. Example:
```javascript
let topServers = await Minehut.getTopServers();
console.log('Most popular server: ' + topServers[0]['name']);
```
