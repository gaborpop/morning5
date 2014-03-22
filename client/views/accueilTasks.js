Session.setDefault('editing_itemname', null);
var activateInput = function (input) {
  input.focus();
  input.select();
}
Template.accueilTasks.helpers({
  	tasks:  function () {
  		var thedate =  Session.get('viewDate');	
			return Tasks.find({submittedRealDate: thedate, backlogTask: false}  );
  },
	btask:  function () {
  	  
		return Tasks.find({ backlogTask: true});
  },
	editing:  function () {
  return Session.equals('editing_itemname', this._id);
  },
  daybefore:  function () {
 	var yesterday = Session.get('realDate');
  yesterday.setTime(yesterday.getTime()- 24 * 3600 * 1000);
	var months = {'0':'Jan', '1':'Feb', '2':'Mar', '3':'Apr', '4':'May','5':'Jun', '6':'July', '7':'Aug', '8':'Sept', '9':'Oct', '10':'Nov', '11':'Dec'};
		
  var yesterday1 = yesterday.getDate()+'/'+months[yesterday.getMonth()]+'/'+yesterday.getFullYear();
		
		
	return yesterday1;  

 
  },
  dayafter:  function () {
  var tomorrow = Session.get('realDate');
  tomorrow.setTime(tomorrow.getTime()+ 24 * 3600 * 1000);
		var months = {'0':'Jan', '1':'Feb', '2':'Mar', '3':'Apr', '4':'May','5':'Jun', '6':'July', '7':'Aug', '8':'Sept', '9':'Oct', '10':'Nov', '11':'Dec'};
    
  var tomorrow1 = tomorrow.getDate()+'/'+months[tomorrow.getMonth()]+'/'+tomorrow.getFullYear();
  return tomorrow1;
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
       //var creaDate2 = new Date();
    
     //creaDate2.setDate(parseInt(creaDate.split("-")[0]));
      //creaDate2.setMonth(creaDate.split("-")[1]);
      //creaDate2.setYear(parseInt(creaDate.split("-")[2]));
			//var months = {'Jan':'0', 'Feb':'1', 'Mar':'2', 'Apr':'3', 'May':'4','Jun':'5', 'July':'6', 'Aug':'7', 'Sept':'8', 'Oct':'9', 'Nov':'10', 'Dec':'11'};
			//var creaDateFull = creaDate2.getDate()+'/'+months[] +'/'+ creaDate2.getFullYear();
     
      
      var taskProperties = { textTask : url, submittedRealDate : creaDate  };
			Meteor.call('task', taskProperties, function(error, id) {});
			
			//Router.go('accueilTasks', {date: parseInt(creaDate.split("/")[0]), month: parseInt(creaDate.split("/")[1]), year: parseInt(creaDate.split("/")[2])});
			}

		},  
	'keypress #backlogTaskInput': function(e, template) {
    //e.preventDefault();
    if (e.which === 13) {
      var url = template.find("#backlogTaskInput").value;
      
      var creaDate = Session.get('viewDate');
      
      var taskProperties = { textTask : url, submittedRealDate : creaDate  };
			Meteor.call('task2', taskProperties, function(error, id) {});
			$.sidr('open', 'sidr');
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
    
  },
	 'click .action': function (evt, tmpl) {
		 
		 var months = {'Jan':'0', 'Feb':'1', 'Mar':'2', 'Apr':'3', 'May':'4','Jun':'5', 'July':'6', 'Aug':'7', 'Sept':'8', 'Oct':'9', 'Nov':'10', 'Dec':'11'};
		 var months1 = {'0':'Jan', '1':'Feb', '2':'Mar', '3':'Apr', '4':'May','5':'Jun', '6':'July', '7':'Aug', '8':'Sept', '9':'Oct', '10':'Nov', '11':'Dec'};
		 var newDate = new Date();
		 newDate.setDate(this.submittedRealDate.split("-")[0]);
		 newDate.setMonth(months[this.submittedRealDate.split("-")[1]]);
		 newDate.setFullYear(this.submittedRealDate.split("-")[2]);
		 newDate.setTime(newDate.getTime()+ 24 * 3600 * 1000);
		 
		 
		 Tasks.update(this._id, {$set: {submittedRealDate: newDate.getDate() + "-" + months1[newDate.getMonth()] + "-" + newDate.getFullYear()}});
   }  
  
});  

Template.accueilTasks.rendered = function() {
$('.ui.sidebar').sidebar('toggle');

	
};	