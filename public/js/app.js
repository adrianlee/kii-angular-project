'use strict';

/* Application */
// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'HashBangURLs']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'template/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/classes', {templateUrl: 'template/classes.html', controller: 'ClassCtrl'});
    $routeProvider.when('/teach', {templateUrl: 'template/teach.html', controller: 'TeachCtrl'});
    $routeProvider.when('/faq', {templateUrl: 'template/faq.html', controller: 'FAQCtrl'});
    $routeProvider.when('/login', {templateUrl: 'template/login.html', controller: 'LoginCtrl'});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);

angular.module('HashBangURLs', []).config(['$locationProvider', function($location) {
  $location.html5Mode(true).hashPrefix('!');
}]);

/* Controllers */
angular.module('myApp.controllers', []).
  controller('HomeCtrl', [function() {

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