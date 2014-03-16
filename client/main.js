Meteor.subscribe('tasks');

Meteor.startup(function () {
  var curDate = new Date();
 
		var currentYear = curDate.getFullYear();
		var currentMonth = curDate.getMonth()+1;
		var currentDay = curDate.getDate();

  Session.set('date', currentDay+'/'+currentMonth+'/'+currentYear);
  console.log(Session.get('date'));
  
  
  
  
  
  
  });

Handlebars.registerHelper('date',function(input){
    return Session.get('date');
});