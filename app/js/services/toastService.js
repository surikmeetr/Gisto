'use strict';

/**
 * todo
 * Use: toastService.show('warn','This is toast warning',3000);
 */

angular.module('gisto.service.toastService', [], function ($provide) {
    $provide.factory('toastService', function (ghAPI, $rootScope,$q,$timeout) {
        var toast = {
            show: function(type,text,timeout) {
                console.log('[----------- TOAST INIT -----------]',type, text, timeout);
            }
        };
        return toast;
    });
});