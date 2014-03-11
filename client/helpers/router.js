Router.configure({
	layoutTemplate: 'layout',
  loadingTemplate: 'loading'
  
});

Router.map( function () {
  
  this.route('accueilTemplate', {
    path: '/'
  });
  this.route('accueilTasks', {
    path: '/todos'
  });
  
});