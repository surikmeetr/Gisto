'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ui', 'myApp.filters', 'myApp.services', 'myApp.directives', 'JobIndicator']).
        config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/empty.html'});
        $routeProvider.when('/gist/:gistId', {templateUrl: 'partials/single-gist.html', controller: singleGistCtrl});
        $routeProvider.when('/create', {templateUrl: 'partials/create.html', controller: createGistCtrl});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

myApp.value('ui.config', {
    codemirror: {
        mode: 'javascript',
        lineNumbers: true,
        matchBrackets: true
    }
});