Router.route('/sendAccessCode', { where : 'server' })
  .get(function () {
    var self = this;
    HTTP.call('POST', 'https://login.uber.com/oauth/v2/token', {
      params : {
        client_secret : 'uTgoJtH-OyJ0bOV2fTKYZ7khB85EpOazXbrJHyXW',
        client_id : '_KX8HFVv0AqtWL48zFXY290SXNDcLLPC',
        grant_type : 'authorization_code',
        redirect_uri : 'http://localhost:3000/authenticated',
        code : self.params.query.code
      }
    }, function(err, response) {
      // console.log(err, response);
      Meteor.users.update(self.params.query.userId, {
        $set : {
          'profile.uberAccToken' : response.data.access_token
        }
      }, null, function(err, numAff) {
        self.response.statusCode = 302;
        self.response.setHeader('Location', '/dashboard');
        self.response.end('Arbitrary success message');
      });
    });
  });
