Meteor.users is a Mongo.Collection
{
  _id: string,
  createdAt: timestamp,
  services: [
    facebook: {...},
    password: {...},
  },
  resume: {
    loginTokens: [
      when: timestamp,
      hashedToken: string,
    ]
  },
  profile: {
    name: string,
    interests: [string],
    friends: {
      contacts: [_ids of documents in Meteor.users],
      facebook: [_ids...]
    },
  },
  emails: [
    {
      address: string,
      verified: bool,
    }
  ],
  tasks: [_ids of documents in Tasks],
  settings: {
    notificationType: string, (e.g., sound, ringer, off)
  },
}  

Tasks
{
  description: string,
  duration: int,
  timeOfDay: int,
  priority: int,
  completed: bool,
  dateCompleted: timestamp,
  scheduledTime: timestamp,
  notificationSettings: {
    timeBefore: int
  },
} 
  
ExternalCalendarEvents
{
  whatever Cronofy gives us
}
