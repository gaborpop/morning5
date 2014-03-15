Session.setDefault('editing_itemname', null);
var activateInput = function (input) {
  input.focus();
  input.select();
}
Template.accueilTasks.helpers({
	tasks: function() {
		return Tasks.find();
		
  },
	editing:  function () {
  return Session.equals('editing_itemname', this._id);
},

	
	
	
	today: function() {
		var currentDate = new Date();
		var currentYear = currentDate.getFullYear();
		var currentMonth = currentDate.getMonth()+1;
		var currentDay = currentDate.getDate();
		return currentDay + '/' + currentMonth + '/' + currentYear;
	},
  advancement: function() {
    var nbTaskDone = Tasks.find({doneTask:true}).count();
    var nbTask = Tasks.find().count();
    return nbTaskDone/nbTask * 100; 
  }
	
	

	
});  	
	
Template.accueilTasks.events ({
	'keypress .taskClass': function(e, template) {
    //e.preventDefault();
    if (e.which === 13) {
      var url = template.find(".taskClass").value;
			var taskProperties = { textTask : url};
			Meteor.call('task', taskProperties, function(error, id) {});
			}

		},   
	'dblclick .display .todo-text': function (evt, tmpl) {
    Session.set('editing_itemname', this._id);
    Deps.flush(); // update DOM before focus
    activateInput(tmpl.find("#todo-input"));
  },
  	'keypress .input-ctrl': function(e, template) {
    //e.preventDefault();
    if (e.which === 13) {
      var url2 = template.find(".input-ctrl").value;
			
      Tasks.update(this._id, {$set: {textTask: url2}});
      Session.set('editing_itemname', null);
		}  
    },
  'focusout .input-ctrl': function(e, template) {
    //e.preventDefault();
    
      var url2 = template.find(".input-ctrl").value;
			
      Tasks.update(this._id, {$set: {textTask: url2}});
      Session.set('editing_itemname', null);
		 
    },
   'click .destroy': function () {
    Tasks.remove(this._id);
  },
  'click .checkbox2': function (evt, tmpl) {
   Tasks.update(this._id, {$set: {doneTask: true}});
    
  },
  'click .checkbox3': function (evt, tmpl) {
   Tasks.update(this._id, {$set: {doneTask: false}});
    
  }
});  