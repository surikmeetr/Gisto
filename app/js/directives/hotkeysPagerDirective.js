'use strict';

angular.module('gisto.directive.hotkeysPager', ['cfp.hotkeys'])
    .directive('hotkeysPager', hotkeysPager)
    .directive('hotkeysPagerItem', hotkeysPagerItem);

function hotkeysPager(hotkeys) {
    return {
        restrict: 'A',
        controller: function($scope, $element, $attrs) {

            var vm = this,
                items = [],
                currentIndex = -1;

            vm.registerItem = function(id, element) {
                items.push({
                    id: id,
                    element: element
                });
            };

            vm.highlightElement = function(element) {
                var jElement = $(element);

                jElement
                    .addClass('focused')
                    .siblings()
                    .removeClass('focused');


                vm.scrollToView(jElement);
            };

            vm.scrollToView = function(jElement) {
                var height = $element.height();
                var position = jElement.offset().top;

                if (position > height || position < 0) {
                    jElement[0].scrollIntoView();
                }
            };

            vm.next = function() {
                currentIndex = currentIndex < (items.length - 1) ? ++currentIndex : 0;
                vm.highlightElement(items[currentIndex].element);
            };

            vm.prev = function() {
                currentIndex = currentIndex > 0 ? --currentIndex : items.length - 1;
                vm.highlightElement(items[currentIndex].element);
            };

            vm.enter = function() {
                console.log('enter', $attrs.hotkeysPager);
                if ($attrs.hotkeysPager) {
                    $scope[$attrs.hotkeysPager](items[currentIndex].id);
                }
            };

            vm.clearSelection = function() {
                $(items[currentIndex].element).removeClass('focused');
                currentIndex = -1;
            };

            // register hotkey shortcuts
            hotkeys.bindTo($scope)
                .add({
                    combo: 'up',
                    description: 'Highlight next gist on the list',
                    callback: vm.prev
                })
                .add({
                    combo: 'down',
                    description: 'Highlight previous gist on the list',
                    callback: vm.next
                })
                .add({
                    combo: 'enter',
                    description: 'Enter highlighted gist',
                    callback: vm.enter
                })
                .add({
                    combo: 'esc',
                    description: 'Clear highlighted gist selection',
                    callback: vm.clearSelection
                });
        }
    }
}

function hotkeysPagerItem() {
    return {
        restrict: 'A',
        require: '^hotkeysPager',
        link: function(scope, element, attrs, ctrl) {
            var id = attrs.hotkeysPagerItem;
            ctrl.registerItem(id, element);
        }
    }
}