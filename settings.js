const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

global.owner = "51936994155";
global.botname = "Gx-Bot";
global.place = 'America/Managua';
global.prefix = ['.'];

// IDs tal como los definiste
global.ownerid  = ["51936994155@s.whatsapp.net"];
global.ownerlid = ["222265178386528@lid"];

// 🚀 Genera un array unificado que incluya todas las formas
global.allOwners = Array.from(new Set([
  // los definidos originalmente
  ...global.ownerid,
  ...global.ownerlid,
  // más sus normalizaciones cruzadas
  ...global.ownerid.map(id => id.replace(/@s\.whatsapp\.net$/, '@lid')),
  ...global.ownerlid.map(id => id.replace(/@lid$/, '@s.whatsapp.net')),
]));

module.exports = {
  owner: global.owner,
  botname: global.botname,
  place: global.place,
  prefix: global.prefix,
  ownerid: global.ownerid,
  ownerlid: global.ownerlid,
  allOwners: global.allOwners
};
