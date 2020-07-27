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
