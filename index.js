var package = require('./package.json');
var _ = require('lodash');
var wolfram = require('wolfram').createClient(process.env.WOLFRAM_APPID);

var Module = function (bot) {
  this.bot = bot;
  this.name = package.name;
  this.version = package.version;
  this.help = function () {
    // RETURN HELP STRING FOR YOUR COMMANDS or AT LEAST YOUR COMMANDS Object.keys(this.commands)
    return package.commands;
  };
  this.commands = {};

  this.commands.wolfram = function(channel, args, user) {
    if (!args) bot.postMessage(channel, "Invalid Request");
    var debug = false;
    if (args.slice(0,5)==="debug") {
      debug=true;
      args = args.slice(5);
    }
    bot.postMessage(channel, "Asking Wolfram... ")
      .then(function(data) {
        var ts = data.ts;
      wolfram.query(args, function(error, result) {
        if (error) console.log(error);
        var answer = _.find(result, 'primary');
        if (result.length && answer) {
          var response = answer.title + ":\n" + _.map(answer.subpods, function(s) { return s.value; }).join("\n");
          bot.updateMessage(channel, ts, response);
        } else {
          bot.updateMessage(channel, ts, "EVEN Wolfram doesn't know!");
        }
         
        if (debug) bot.postMessage(channel, "```"+JSON.stringify(result, null, 2)+"```");
      });
    });
  };

};

Module.prototype.toString = function() {
  return this.name;
};


var exports = module.exports = Module;