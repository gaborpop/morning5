Router.configure({
	layoutTemplate: 'layout',
  loadingTemplate: 'loading'
  
});

Router.map( function () {
  
  this.route('accueilTemplate', {
    path: '/'
  });
  this.route('accueilTasks', {
    path: '/todos/:date/:month/:year',
    
    data: function () {
      var curD = this.params.date;
      var curM = this.params.month;
      var curY = this.params.year;
       
      var thedate = curD +'/'+ curM +'/'+ curY;
     
      
      var newDate = new Date();
      newDate.setDate(parseInt(curD));
      newDate.setMonth(parseInt(curM)-1);
      newDate.setYear(parseInt(curY));
      
      var prevDate = new Date();
      prevDate.setDate(parseInt(curD)-1);
      prevDate.setMonth(parseInt(curM));
      prevDate.setYear(parseInt(curY));
    
      var nextDate = new Date();
      nextDate.setDate(parseInt(curD)+1);
    
      nextDate.setMonth(parseInt(curM));
      nextDate.setYear(parseInt(curY));
      
      console.log('new Date is ' + newDate);
      console.log('Previous Date is ' + prevDate);
      console.log('Next Date is ' + nextDate);
      
      Session.set('previousDate', prevDate.getDate()+'/'+prevDate.getMonth() + '/' +prevDate.getFullYear());
      Session.set('nextDate', nextDate.getDate()+'/'+nextDate.getMonth() + '/' +nextDate.getFullYear());
      Session.set('viewDate', thedate);
      console.log(Session.get('viewDate'));
      task = { tasks: Tasks.find({submittedRealDate: thedate}  )};
      return task;
    },

    
  });
  
});