Meteor.startup ->
  AccountsEntry.config
    
    homeRoute: '/'
    dashboardRoute: '/todos'
    profileRoute: 'profile'
    passwordSignupFields: 'EMAIL_ONLY'
  