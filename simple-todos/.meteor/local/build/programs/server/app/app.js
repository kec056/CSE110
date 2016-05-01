var require = meteorInstall({"imports":{"api":{"tasks.js":["meteor/meteor","meteor/mongo","meteor/check",function(require,exports){

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// imports/api/tasks.js                                                      //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
exports.__esModule = true;                                                   //
exports.Tasks = undefined;                                                   //
                                                                             //
var _meteor = require('meteor/meteor');                                      // 1
                                                                             //
var _mongo = require('meteor/mongo');                                        // 2
                                                                             //
var _check = require('meteor/check');                                        // 3
                                                                             //
var Tasks = exports.Tasks = new _mongo.Mongo.Collection('tasks');            // 5
                                                                             //
if (_meteor.Meteor.isServer) {                                               // 7
  // This code only runs on the server                                       //
  // Only publish tasks that are public or belong to the current user        //
  _meteor.Meteor.publish('tasks', function () {                              // 10
    function tasksPublication() {                                            // 10
      return Tasks.find({ owner: this.userId });                             // 11
    }                                                                        //
                                                                             //
    return tasksPublication;                                                 //
  }());                                                                      //
}                                                                            //
                                                                             //
_meteor.Meteor.methods({                                                     // 15
  'tasks.insert': function () {                                              // 16
    function tasksInsert(text) {                                             //
      (0, _check.check)(text, String);                                       // 17
                                                                             //
      // Make sure the user is logged in before inserting a task             //
      if (!this.userId) {                                                    // 16
        throw new _meteor.Meteor.Error('not-authorized');                    // 21
      }                                                                      //
                                                                             //
      Tasks.insert({                                                         // 24
        text: text,                                                          // 25
        createdAt: new Date(),                                               // 26
        owner: this.userId,                                                  // 27
        username: _meteor.Meteor.users.findOne(this.userId).username         // 28
      });                                                                    //
    }                                                                        //
                                                                             //
    return tasksInsert;                                                      //
  }(),                                                                       //
  'tasks.remove': function () {                                              // 31
    function tasksRemove(taskId) {                                           //
      (0, _check.check)(taskId, String);                                     // 32
                                                                             //
      var task = Tasks.findOne(taskId);                                      // 34
      if (task['private'] && task.owner !== this.userId) {                   // 35
        // If the task is private, make sure only the owner can delete it    //
        throw new _meteor.Meteor.Error('not-authorized');                    // 37
      }                                                                      //
                                                                             //
      Tasks.remove(taskId);                                                  // 40
    }                                                                        //
                                                                             //
    return tasksRemove;                                                      //
  }(),                                                                       //
  'tasks.setChecked': function () {                                          // 42
    function tasksSetChecked(taskId, setChecked) {                           //
      (0, _check.check)(taskId, String);                                     // 43
      (0, _check.check)(setChecked, Boolean);                                // 44
                                                                             //
      var task = Tasks.findOne(taskId);                                      // 46
      if (task.owner !== this.userId) {                                      // 47
        // If the task is private, make sure only the owner can check it off
        throw new _meteor.Meteor.Error('not-authorized');                    // 49
      }                                                                      //
                                                                             //
      Tasks.update(taskId, { $set: { checked: setChecked } });               // 52
    }                                                                        //
                                                                             //
    return tasksSetChecked;                                                  //
  }(),                                                                       //
  'tasks.edit': function () {                                                // 54
    function tasksEdit(taskId, text) {                                       //
      (0, _check.check)(taskId, String);                                     // 55
      (0, _check.check)(text, String);                                       // 56
                                                                             //
      var task = Tasks.findOne(taskId);                                      // 58
      if (task.owner !== this.userId) {                                      // 59
        throw new _meteor.Meteor.Error('not-authorized');                    // 60
      }                                                                      //
                                                                             //
      Tasks.update(taskId, { $set: { text: text } });                        // 63
    }                                                                        //
                                                                             //
    return tasksEdit;                                                        //
  }()                                                                        //
});                                                                          //
///////////////////////////////////////////////////////////////////////////////

}]}},"server":{"main.js":["../imports/api/tasks.js",function(require){

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// server/main.js                                                            //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
require('../imports/api/tasks.js');                                          // 1
///////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json",".jsx"]});
require("./server/main.js");
//# sourceMappingURL=app.js.map
