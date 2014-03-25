Session.setDefault('editing_itemname', null);
var activateInput = function (input) {
  input.focus();
  input.select();
}
Template.accueilTasks.helpers({
  	
	btask:  function () {
  	  
		return Tasks.find({ backlogTask: true});
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
	 
	'keypress .addBacklogTask': function(e, template) {
    //e.preventDefault();
    if (e.which === 13) {
      var url = template.find(".addBacklogTask").value;
      
      var creaDate = Session.get('viewDate');
      var newBTask = {
        textTask: url,
         doneTask: false,
			   backlogTask : true,
        userId : Meteor.user()._id
      };
      newBTask._id = Tasks.insert(newBTask);
      e.target.value = '';
      
			}

		},   

    'click .destroy2': function () {
    Tasks.remove(this._id);
  },
 
  'click .checkbox3': function (evt, tmpl) {
   Tasks.update(this._id, {$set: {doneTask: false}});
    
  },
	
  'click .action2': function (evt, tmpl) {
		 
		 var months = {'Jan':'0', 'Feb':'1', 'Mar':'2', 'Apr':'3', 'May':'4','Jun':'5', 'July':'6', 'Aug':'7', 'Sept':'8', 'Oct':'9', 'Nov':'10', 'Dec':'11'};
		 var months1 = {'0':'Jan', '1':'Feb', '2':'Mar', '3':'Apr', '4':'May','5':'Jun', '6':'July', '7':'Aug', '8':'Sept', '9':'Oct', '10':'Nov', '11':'Dec'};
		 var newDate = new Date();
		 //newDate.setDate(this.submittedRealDate.split("-")[0]);
		 //newDate.setMonth(months[this.submittedRealDate.split("-")[1]]);
		 //newDate.setFullYear(this.submittedRealDate.split("-")[2]);
		 
		 
		 $.sidr('toggle', 'sidr');
		 Tasks.update(this._id, {$set: {submittedRealDate: newDate.getDate() + "-" + months1[newDate.getMonth()] + "-" + newDate.getFullYear(), backlogTask : false} });
   }  
  
  
});  

Template.accueilTasks.rendered = function() {
 $('#simple-menu').sidr();

	
};	