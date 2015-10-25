//any js functions we want to run on the dashboard view go here

Template.dashboard.rendered = function() {

  Accounts._loginButtonsSession.set('dropdownVisible', false);

};