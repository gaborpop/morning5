Meteor.startup ->
  AccountsEntry.config
    
    homeRoute: '/'
    dashboardRoute: '/'
    profileRoute: 'profile'
    passwordSignupFields: 'EMAIL_ONLY'
  