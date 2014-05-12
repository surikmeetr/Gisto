'use strict';

angular.module('gisto.directive.toast', []).directive('toast', ['$timeout', 'toastService', function ($timeout, toastService) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="messenger"><ol></ol></div>',
        link: function ($scope, $element, $attrs) {

        }
    }
}]);