Session.setDefault('editing_itemname', null);
var activateInput = function (input) {
  input.focus();
  input.select();
}
Template.accueilTasks.helpers({
  
	editing:  function () {
  return Session.equals('editing_itemname', this._id);
  },
  daybefore:  function () {
   var yesterday = Session.get('previousDate');
   
  return yesterday;  

 
  },
  dayafter:  function () {
  var tomorrow = Session.get('nextDate');
   
  return tomorrow;  
  
  
  },
	
	
	
	today: function() {
    
	
    return Session.get('viewDate');
    
    
	},
  
  advancement: function() {
    var nbTaskDone = Tasks.find({doneTask:true, submittedRealDate: Session.get('viewDate') }).count();
    var nbTask = Tasks.find({submittedRealDate: Session.get('viewDate') }).count();
    return nbTaskDone/nbTask * 100; 
  }
	
	

	
});  	
	
Template.accueilTasks.events ({
	'keypress .taskClass': function(e, template) {
    //e.preventDefault();
    if (e.which === 13) {
      var url = template.find(".taskClass").value;
      
      var creaDate = Session.get('viewDate');
       var creaDate2 = new Date();
    
     creaDate2.setDate(parseInt(creaDate.split("/")[0]));
      creaDate2.setMonth(parseInt(creaDate.split("/")[1]-1));
      creaDate2.setYear(parseInt(creaDate.split("/")[2]));
      var creaDateFull = creaDate2.getDate()+'/'+(creaDate2.getMonth()+1) +'/'+ creaDate2.getFullYear();
      
      
      var taskProperties = { textTask : url, submittedRealDate : creaDateFull  };
			Meteor.call('task', taskProperties, function(error, id) {});
			
			//Router.go('accueilTasks', {date: parseInt(creaDate.split("/")[0]), month: parseInt(creaDate.split("/")[1]), year: parseInt(creaDate.split("/")[2])});
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