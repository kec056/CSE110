import { Meteor } from 'meteor/meteor';
import '../imports/api/Tasks.js';
import '../imports/startup/server';

Meteor.users.deny({ update: function () { return true; } });
// Meteor.startup(() => {
//   // code to run on server at startup
// });
