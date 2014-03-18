Meteor.subscribe('tasks');

Meteor.startup(function () {
  var oneMomentPlease = moment();
	var oneMonth = oneMomentPlease.month();
	alert(oneMonth);
	var curDate = new Date();

		var currentYear = curDate.getFullYear();
		var currentMonth = curDate.getMonth()+1;
		var currentDay = curDate.getDate();

  Session.set('date', currentDay+'/'+currentMonth+'/'+currentYear);
  console.log(Session.get('date'));
  
  
  
  
  
  
  });

Handlebars.registerHelper('date',function(input){
  var day = parseInt(Session.get('date').split("/")[0]);
	var month = parseInt(Session.get('date').split("/")[1]);
	var year =	parseInt(Session.get('date').split("/")[2]);
	var date = day +'/'+month+'/'+year;
	
	return date;
});
