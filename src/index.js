const fetch    = require('node-fetch'),
      fs       = require('fs'),
      FormData = require('form-data'),
      API      = 'https://api.minehut.com';

class Minehut {
  constructor() {
    this.session    = null;
    this.authHeader = null;
    this.server     = null;
  }


  getSession(email, password) {
    let body = JSON.stringify({
      email: email,
      password: password
    });

    return fetch(`${API}/users/login`, { method: "POST", headers: {'Content-Type': 'application/json'}, body: body })
      .then(res => res.json())
      .then(json => {
        this.session = json;
        this.authHeader = {
          Authorization: this.session.token,
          'X-Session-ID': this.session.sessionId
        };
        return json;
      })
      .catch(err => {
        throw err;
      });
  }

  getUser(user=this.session._id) {
    return fetch(`${API}/user/${user}`, { headers: this.authHeader })
      .then(res => res.json())
      .then(json => {
        return json['user'];
      })
      .catch(err => {
        throw err;
      });
  }

  setServer(server) {
    this.server = server;
  }


  // Server
  getStatus() {
    return fetch(`${API}/server/${this.server}/status`, { headers: this.authHeader })
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      throw err;
    });
  }

  startService() {
    return fetch(`${API}/server/${this.server}/start_service`, { method: "POST", headers: this.authHeader })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  destroyService() {
    return fetch(`${API}/server/${this.server}/destroy_service`, { method: "POST", headers: this.authHeader })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  start() {
    return fetch(`${API}/server/${this.server}/start`, { method: "POST", headers: this.authHeader })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  shutdown() {
    return fetch(`${API}/server/${this.server}/shutdown`, { method: "POST", headers: this.authHeader })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  sendCommand(command) {
    this.authHeader['Content-Type'] = 'application/json';

    let body = JSON.stringify({
      command: command,
    });

    return fetch(`${API}/server/${this.server}/send_command`, { method: "POST", headers: this.authHeader, body: body })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  getInfo(server=this.server) {
    return fetch(`${API}/server/${server}`, { headers: this.authHeader })
    .then(res => res.json())
    .then(json => {
      return json['server'];
    })
    .catch(err => {
      throw err;
    });
  }

  // Edit Server
  changeMOTD(content) {
    this.authHeader['Content-Type'] = 'application/json';

    let body = JSON.stringify({
      motd: content
    });

    return fetch(`${API}/server/${this.server}/change_motd`, { method: "POST", headers: this.authHeader, body: body })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  changeName(content) {
    this.authHeader['Content-Type'] = 'application/json';

    let body = JSON.stringify({
      name: content
    });

    return fetch(`${API}/server/${this.server}/change_name`, { method: "POST", headers: this.authHeader, body: body })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  changeProperty(property) {
    this.authHeader['Content-Type'] = 'application/json';

    let body = JSON.stringify({
      field: Object.keys(property)[0],
      value: property[Object.keys(property)[0]]
    });

    return fetch(`${API}/server/${this.server}/edit_server_properties`, { method: "POST", headers: this.authHeader, body: body })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  changeVisibility(visible) {
    this.authHeader['Content-Type'] = 'application/json';

    let body = JSON.stringify({
      visibility: visible
    });

    return fetch(`${API}/server/${this.server}/visibility`, { method: "POST", headers: this.authHeader, body: body })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  // Server Files
  getFiles(path='') {
    return fetch(`${API}/file/${this.server}/list/${path}`, { headers: this.authHeader })
    .then(res => res.json())
    .then(json => {
      return json['files'];
    })
    .catch(err => {
      throw err;
    });
  }

  getFileContent(path) {
    return fetch(`${API}/file/${this.server}/read/${path}`, { headers: this.authHeader })
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      throw err;
    });
  }

  editFile(path, content) {
    this.authHeader['Content-Type'] = 'application/json';

    let body = JSON.stringify({
      content: content
    });

    return fetch(`${API}/file/${this.server}/edit/${path}`, { method: "POST", headers: this.authHeader, body: body })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  deleteFile(path) {
    return fetch(`${API}/file/${this.server}/delete/${path}`, { method: "POST", headers: this.authHeader })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  deleteFolder(name, path='') {
    this.authHeader['Content-Type'] = 'application/json';

    let body = JSON.stringify({
      name: name,
      directory: path
    });

    return fetch(`${API}/file/${this.server}/folder/delete`, { method: "POST", headers: this.authHeader, body: body })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  createDir(path) {
    this.authHeader['Content-Type'] = 'application/json';

    let dirName = path.substring(path.lastIndexOf('/') + 1),
        dirPath = path.substring(0, path.lastIndexOf('/') + 1);


    let body = JSON.stringify({
      name: dirName,
      directory: dirPath
    });

    return fetch(`${API}/file/${this.server}/folder/create`, { method: "POST", headers: this.authHeader, body: body })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  // Server Plugins
  getPlugins() {
    return this.getInfo(this.server)
    .then(res => { return res['active_plugins'] })
    .catch(err => { throw err });
  }

  getAllPlugins() {
    return fetch(`${API}/plugins`, { method: "GET", headers: this.authHeader })
    .then(res => res.json())
    .then(json => {
      return json['all'];
    })
    .catch(err => {
      throw err;
    });
  }

  installPlugin(plugin) {
    this.authHeader['Content-Type'] = 'application/json';

    let body = JSON.stringify({
      plugin: plugin
    });

    return fetch(`${API}/server/${this.server}/install_plugin`, { method: "POST", headers: this.authHeader, body: body })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  removePlugin(plugin) {
    this.authHeader['Content-Type'] = 'application/json';

    let body = JSON.stringify({
      plugin: plugin
    });

    return fetch(`${API}/server/${this.server}/remove_plugin`, { method: "POST", headers: this.authHeader, body: body })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  resetPlugin(plugin) {
    this.authHeader['Content-Type'] = 'application/json';

    let body = JSON.stringify({
      plugin: plugin
    });

    return fetch(`${API}/server/${this.server}/remove_plugin_data`, { method: "POST", headers: this.authHeader, body: body })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  // Server Dangerzone
  resetServerFiles() {
    return fetch(`${API}/server/${this.server}/reset_all`, { method: "POST", headers: this.authHeader })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  repairServerFiles() {
    return fetch(`${API}/server/${this.server}/repair_files`, { method: "POST", headers: this.authHeader })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  // Server World
  resetWorld() {
    return fetch(`${API}/server/${this.server}/reset_world`, { method: "POST", headers: this.authHeader })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  saveWorld() {
    return fetch(`${API}/server/${this.server}/save`, { method: "POST", headers: this.authHeader })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  uploadWorld(zipfile) {
    const reqForm = new FormData();
    reqForm.append('file', fs.createReadStream(zipfile));

    this.authHeader['Content-Type'] = `multipart/form-data; boundary=${reqForm['_boundary']}`;

    return fetch(`${API}/file/world/upload/${this.server}`, { method: "POST", headers: this.authHeader, body: reqForm })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
  }

  // Network
  getNetworkStats() {
    return fetch(`${API}/network/simple_stats`)
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      throw err;
    });
  }

  getHomepageStats() {
    return fetch(`${API}/network/homepage_stats`)
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      throw err;
    });
  }

  getTopServers() {
    return fetch(`${API}/network/top_servers`)
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      throw err;
    });
  }
}

module.exports = Minehut;
