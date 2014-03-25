Template.taskTable.helpers({
	tasks:  function () {
  		var thedate =  Session.get('viewDate');	
			return Tasks.find({submittedRealDate: thedate, backlogTask: false}  );
  },
		editing:  function () {
  return Session.equals('editing_itemname', this._id);
  }
	
	
	
	
})

Template.taskTable.events ({
	'keypress .taskClass': function(e, template) {
    //e.preventDefault();
    if (e.which === 13) {
      var url = template.find(".taskClass").value;
      
      var creaDate = Session.get('viewDate');
       //var creaDate2 = new Date();
      var newTask = {
        textTask: url,
         doneTask: false,
			   backlogTask : false,
        userId : Meteor.user()._id,
        author: Meteor.user().emails.adress,
        submitted: new Date().getTime(),
        modifiedStatus: new Date().getTime(),
        submittedRealDate : creaDate
        
      };
     
      newTask._id = Tasks.insert(newTask);
      $.sidr('close', 'sidr');
      e.target.value = '';

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
	 'click .action': function (evt, tmpl) {
		 
		 var months = {'Jan':'0', 'Feb':'1', 'Mar':'2', 'Apr':'3', 'May':'4','Jun':'5', 'July':'6', 'Aug':'7', 'Sept':'8', 'Oct':'9', 'Nov':'10', 'Dec':'11'};
		 var months1 = {'0':'Jan', '1':'Feb', '2':'Mar', '3':'Apr', '4':'May','5':'Jun', '6':'July', '7':'Aug', '8':'Sept', '9':'Oct', '10':'Nov', '11':'Dec'};
		 var newDate = new Date();
		 newDate.setDate(this.submittedRealDate.split("-")[0]);
		 newDate.setMonth(months[this.submittedRealDate.split("-")[1]]);
		 newDate.setFullYear(this.submittedRealDate.split("-")[2]);
		 newDate.setTime(newDate.getTime()+ 24 * 3600 * 1000);
		 
		 
		 Tasks.update(this._id, {$set: {submittedRealDate: newDate.getDate() + "-" + months1[newDate.getMonth()] + "-" + newDate.getFullYear()}});
   }  ,
	
	
})