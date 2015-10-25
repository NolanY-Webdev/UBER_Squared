//main routes file that Iron Router (meteor routing server) uses to know which html template to serve

//defines the layout template

Router.configure({

  layoutTemplate : 'layout'

});

//routes index calls to the index template

Router.route('/', function() {

  this.render('index');

});

//routes dashboard calls to the dashboard template

Router.route('/dashboard', function() {

  this.render('dashboard');

});

//routes logins from the index (login screen) to the dashboard

Router.onBeforeAction(function() {

  if (!Meteor.user()) {

    if (Meteor.loggingIn()) {

      Router.go('dashboard');

    }

    this.render('index');

  } else {

    this.next();

  }

});

