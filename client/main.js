Meteor.subscribe('tasks');

Meteor.startup(function () {
	var months = {'0':'Jan', '1':'Feb', '2':'Mar', '3':'Apr', '4':'May','5':'Jun', '6':'July', '7':'Aug', '8':'Sept', '9':'Oct', '10':'Nov', '11':'Dec'};
	
	var curDate = new Date();

		var currentYear = curDate.getFullYear();
		var currentMonth = curDate.getMonth();
		var currentDay = curDate.getDate();
	
  Session.set('date', currentDay+'/'+months[currentMonth]+'/'+currentYear);
	console.log('mainjs : ' +Session.get('date'));
  
  
  
  
  
  
  });

Handlebars.registerHelper('date',function(input){
  var day = Session.get('date').split("/")[0];
	var month = Session.get('date').split("/")[1];
	
	var year =	Session.get('date').split("/")[2];
	var date = day +'/'+month+'/'+year;
	
	return date;
});
