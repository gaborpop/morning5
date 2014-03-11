Template.accueilTasks.helpers({
	tasks: function() {
		return Tasks.find();
		
  },
	today: function() {
		var currentDate = new Date();
		var currentYear = currentDate.getFullYear();
		var currentMonth = currentDate.getMonth()+1;
		var currentDay = currentDate.getDate();
		return currentDay + '/' + currentMonth + '/' + currentYear;
	}
	
	

	
});  	
	
Template.accueilTasks.events ({
	'keypress .taskClass': function(e, template) {
    //e.preventDefault();
    if (e.which === 13) {
      var url = template.find(".taskClass").value;
			var taskProperties = { textTask : url};
			 Meteor.call('task', taskProperties, function(error, id) {
      

     		//Router.go('accueilTasks');
    });
			
			
    }
  
	
	}

});  