import { Meteor } from 'meteor/meteor';
import '../imports/api/Tasks.js';
import '../imports/startup/server';

Meteor.users.deny({ update: function () { return true; } });
Meteor.startup(() => {
  // code to run on server at startup
  // process.env.MAIL_URL = "smtp://postmaster%40sandbox9314ef87963f47ddadfcdbe3daa3da39.mailgun.org:4a21012b13c903dfb3b28ebf764ff344@smtp.mailgun.org:587";
});
