Router.configure({
	autoRender: false
  
  
});

Router.map( function () {
  
  this.route('accueilTemplate', {
    path: '/'
  });
  this.route('accueilTasks', {
    path: '/todos/:date/:month/:year',
	
    fastRender: true,
    data: function () {
      var curD = parseInt(this.params.date);
      var curM = this.params.month;
      var curY = parseInt(this.params.year);
			console.log("router : "+curM);
      var thedate = curD +'-'+ curM +'-'+ curY;
     var months = {'Jan':'0', 'Feb':'1', 'Mar':'2', 'Apr':'3', 'May':'4','Jun':'5', 'July':'6', 'Aug':'7', 'Sept':'8', 'Oct':'9', 'Nov':'10', 'Dec':'11'};
      
     
      var realDate = new Date();
			realDate.setDate(curD);
      realDate.setMonth(months[curM]);
      realDate.setYear(curY);
			console.log("routeur, apres conversion en date : "+realDate); 
      //Session.set('previousDate', prevDate.getDate()+'/'+prevDate.getMonth() + '/' +prevDate.getFullYear());
      //Session.set('nextDate', nextDate.getDate()+'/'+nextDate.getMonth() + '/' +nextDate.getFullYear());
      Session.set('viewDate', thedate);
			Session.set('realDate', realDate);
      console.log(Session.get('viewDate'));
			//task = { tasks: Tasks.find({submittedRealDate: thedate, backlogTask: false}  )};
			//task2 = { tasks2: Tasks.find() };
      //return [task, task2];
    },

    
  });
  
});