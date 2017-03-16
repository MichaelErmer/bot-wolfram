var _ = require('lodash');
var wolfram = require('wolfram').createClient(process.env.WOLFRAM_APPID);

var Module = function (bot) {
  this.bot = bot;
  this.name = "Wofram Library";
  this.version = "0.1";
  this.help = function () {
    // RETURN HELP STRING FOR YOUR COMMANDS or AT LEAST YOUR COMMANDS Object.keys(this.commands)
    return {
      "wolfram": "ask anything",
    };
  };
  this.commands = {};

  this.commands.wolfram = function(channel, args, user) {
    if (!args) bot.postMessage(channel, "Invalid Request");
    var debug = false;
    if (argv.slice(0,5)==="debug")) {
      debug=true:
      args = args.slice(5);
    }
    wolfram.query(args, function(error, result) {
      if (error) console.log(error);
      var answer = _.find(result, 'primary');
      var response = answer.title + ":\n" + _.map(answer.subpods, function(s) { return value; }).join("\n");
      bot.postMessage(channel, response);
      
      if (debug) bot.postMessage(channel, "```"+JSON.stringify(result, null, 2)+"```");
    });
  };

};

Module.prototype.toString = function() {
  return this.name;
};


var exports = module.exports = Module;