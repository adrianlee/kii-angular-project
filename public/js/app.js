'use strict';

/* Application */
// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'HashBangURLs']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'template/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/home', {templateUrl: 'template/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/classes', {templateUrl: 'template/classes.html', controller: 'ClassCtrl'});
    $routeProvider.when('/teach', {templateUrl: 'template/teach.html', controller: 'TeachCtrl'});
    $routeProvider.when('/faq', {templateUrl: 'template/faq.html', controller: 'FAQCtrl'});
    $routeProvider.when('/login', {templateUrl: 'template/login.html', controller: 'LoginCtrl'});
    $routeProvider.when('/signup', {templateUrl: 'template/signup.html', controller: 'SignupCtrl'});
    $routeProvider.when('/reset_password', {templateUrl: 'template/reset_password.html', controller: 'ResetCtrl'});
    $routeProvider.when('/404', {templateUrl: 'template/404.html', controller: '404Ctrl'});
    $routeProvider.otherwise({redirectTo: '/404'});
  }]);

angular.module('HashBangURLs', []).config(['$locationProvider', function($location) {
  $location.html5Mode(true).hashPrefix('!');
}]);

/* Controllers */
angular.module('myApp.controllers', []).
  controller('MainCtrl', ['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.currentUser = KiiUser.getCurrentUser();

    console.log($rootScope.currentUser);

    if ($rootScope.currentUser) {
      $rootScope.currentUser.refresh({
        success: function (user) {
          console.log(user);
        },
        failure: function (user, error) {
          console.log(error);
        }
      });
    }

    $rootScope.logout = function () {
      console.log("logout");

      // Logout
      if (localStorage["access_token"]) {
        delete localStorage["access_token"];
      }

      $location.path('/');
    };
  }])
  .controller('HomeCtrl', ['$scope', function($scope) {

  }])
  .controller('ClassCtrl', ['$scope', function($scope) {
    $scope.title = "Title";
    $scope.description = "Description";

    if(!$scope.$$phase) {
      $scope.$digest();
    }
  }])
  .controller('TeachCtrl', [function() {

  }])
  .controller('FAQCtrl', [function() {

  }])
  .controller('LoginCtrl', ['$scope', function($scope) {
    $scope.submit = function (input) {
      if (!input || !input.user || !input.password) {
        return console.log("Invalid");
      }

      KiiUser.authenticate(input.user, input.password, {
        // Called on successful registration
        success: function(theUser) {
          // Print some info to the log
          console.log("User authenticated!");
          console.log(theUser);

          var access_token = theUser.getAccessToken();
          console.log(access_token)
          localStorage['access_token'] = access_token;
        },
        // Called on a failed authentication
        failure: function(theUser, errorString) {
          // Print some info to the log
          console.log("Error authenticating: " + errorString);
        }
      });
    };

    // $scope.facebookLogin = function () {
    //   // SNS Registration
    //   var loginCallbacks = {
    //     // successfully connected to facebook
    //     success : function(user, network) {
    //       console.log("Connected user " + JSON.stringify(user) + " to network: " + network);
    //     },
    //     // unable to connect
    //     failure : function(user, network, error) {
    //       console.log("Unable to connect to " + network + ". Reason: " + error);
    //     }
    //   };

    //   KiiSocialConnect.logIn(KiiSocialNetworkName.FACEBOOK, null, loginCallbacks);
    // }
  }])
  .controller('SignupCtrl', ['$scope', function($scope) {
    $scope.submit = function (input) {
      if (!input || !input.email || !input.password || !input.username) {
        return console.log("Invalid");
      }

      // if (input.password !== input.password2) {
      //   return console.log("Password not the same")
      // }

      var user = KiiUser.userWithEmailAddressAndUsername(input.email, input.username, input.password);

      user.register({
        // Called on successful registration
        success: function(theUser) {
          // Print some info to the log
          console.log("User registered!");
          console.log(theUser);
        },
        // Called on a failed registration
        failure: function(theUser, errorString) {
          // Print some info to the log
          console.log("Error registering: " + errorString);
        }
      });

    };
  }])
  .controller('ResetCtrl', ['$scope', function($scope) {
    $scope.submit = function (input) {
      if (!input || !input.email ) {
        return console.log("Invalid");
      }

      KiiUser.resetPassword(input.email, {
        success: function() {
          Kii.logger("Reset password");
        },
        failure: function(error) {
          Kii.logger("Error resetting password: " + error);
        }
      });
    };
  }])
  .controller('404Ctrl', [function() {

  }]);

/* Directives */
angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

/* Filters */
angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);

/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');