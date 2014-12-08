'use strict';

angular.module('gisto.directive.hotkeysPager', ['cfp.hotkeys'])
    .directive('hotkeysPager', hotkeysPager)
    .directive('hotkeysPagerItem', hotkeysPagerItem);

function hotkeysPager(hotkeys) {
    return {
        restrict: 'A',
        controller: function ($scope, $element, $attrs) {

            var vm = this,
                items = [],
                currentIndex = -1;

            /**
             * Register an item in the stack in order to track current
             * items in the list.
             * This is called from each hotkeysPagerItem directive with
             * a reference to itself and the item identifier.
             * @param id
             * @param element
             */
            vm.registerItem = function (id, element) {
                items.push({
                    id: id,
                    element: element
                });
            };

            /**
             * Remove an item from the stack after it has been removed
             * from the DOM.
             * Removing an item from the array is done through splice because
             * it is the only way to preserve the correct length of the array
             * and not cause giant arrays with undefined items inside them.
             * @param element
             */
            vm.removeItem = function (element) {
                items.filter(function (item) {
                    return item.element.length > 0 && item.element[0] === element
                }).forEach(function (item) {
                    items.splice(items.indexOf(item), 1);
                });
            };

            /**
             * Adds a focused class on the element while
             * removing the class from its siblings.
             * This is done to give a visual indication of the selected element
             * @param element
             */
            vm.highlightElement = function (element) {
                var jElement = $(element);

                jElement
                    .addClass('focused')
                    .siblings()
                    .removeClass('focused');

                vm.scrollToView(jElement);
            };

            /**
             * Checks the position of the give element to see if
             * the element is out of view.
             * If the element is out of view the view scrolls to the position
             * of the element.
             * @param jElement
             */
            vm.scrollToView = function (jElement) {
                var height = $element.height();
                var position = jElement.offset().top;

                if (position > height || position < 0) {
                    jElement[0].scrollIntoView();
                }
            };

            /**
             * Gets the next available item from the stack
             * If the next item index is larger than the total stack length
             * It will fallback to the start of the stack creating looping selection.
             */
            vm.next = function () {
                currentIndex = currentIndex < (items.length - 1) ? ++currentIndex : 0;
                vm.highlightElement(items[currentIndex].element);
            };

            /**
             * See next function, does the same but in reverse
             * If at the start of the stack while trying to go backwards
             * will result in fallback to the end of the stack
             */
            vm.prev = function () {
                currentIndex = currentIndex > 0 ? --currentIndex : items.length - 1;
                vm.highlightElement(items[currentIndex].element);
            };

            /**
             * If an enter action is provided runs the function with
             * the current item intentifier
             */
            vm.enter = function () {
                if ($attrs.hotkeysPager) {
                    $scope[$attrs.hotkeysPager](items[currentIndex].id);
                }
            };

            /**
             * Clears the visual selection and resets the currentIndex
             */
            vm.clearSelection = function () {
                if (items[currentIndex]) {
                    $(items[currentIndex].element).removeClass('focused');
                    currentIndex = -1;
                }
            };

            /**
             * Watching for DOM changes of the children of this element
             * If an item is removed from the DOM it is removed from the stack
             * This is not done in reverse due to the child directive hotkeysPagerItem
             * registers itself each time when initialized when a new element
             * is added back to the DOM.
             */
            vm.registerMutationObserver = function () {
                var observer = new MutationObserver(function (mutations) {
                    mutations
                        .filter(function (mutation) {
                            return mutation.removedNodes.length > 0 && mutation.removedNodes[0].tagName === 'LI';
                        }).map(function (mutation) {
                            return mutation.removedNodes[0];
                        }).forEach(function (element) {
                            vm.removeItem(element);
                        });
                });

                observer.observe($element[0], {childList: true});
            };

            // Intialize the DOM mutation observer to watch changes
            vm.registerMutationObserver();

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
        link: function (scope, element, attrs, ctrl) {
            var id = attrs.hotkeysPagerItem;
            ctrl.registerItem(id, element);
        }
    }
}