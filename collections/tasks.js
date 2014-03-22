Tasks = new Meteor.Collection('tasks');

Tasks.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },
  update: ownsDocument,
  remove: ownsDocument
});

Meteor.methods({
  task: function(postAttributes) {
    var user = Meteor.user();
  
      

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to create tasks");

    // pick out the whitelisted keys
    var task = _.extend(_.pick(postAttributes, 'textTask', 'submittedRealDate'), {
      userId: user._id, 
      author: user.emails.adress, 
      doneTask: false,
			backlogTask : false,
      submitted: new Date().getTime(),
      modifiedStatus: new Date().getTime()
      
    });
   
    var taskId = Tasks.insert(task);
    
		return taskId;
    
  },
	task2: function(postAttributes) {
    var user = Meteor.user();
  
      

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to create tasks");

    // pick out the whitelisted keys
    var task = _.extend(_.pick(postAttributes, 'textTask', 'submittedRealDate'), {
      userId: user._id, 
      author: user.emails.adress, 
      doneTask: false,
			backlogTask : true,
      submitted: new Date().getTime(),
      modifiedStatus: new Date().getTime()
      
    });
   
    var taskId = Tasks.insert(task);
    
		return taskId;
    
  }
  
 
});