//any js functions we want to run on the login screen (index view) go here


//makes the login buttons immediately visible

Template.index.rendered = function() {

  Accounts._loginButtonsSession.set('dropdownVisible', true);

};