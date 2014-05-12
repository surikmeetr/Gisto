'use strict';

/**
 * todo
 * Use: toastService.show('warn','This is toast warning',3000);
 */

angular.module('gisto.service.toastService', [], function ($provide) {
    $provide.factory('toastService', function ($timeout) {
        var toast = {
            kind: {
                loading: {
                    icon: 'icon-spin icon-spinner',
                    class: 'info template'
                },
                ok: {
                    icon: 'icon-ok-sign',
                    class: 'ok template'
                },
                warn: {
                    icon: 'icon-warning-sign',
                    class: 'warn template'
                },
                info: {
                    icon: 'icon-info-sign',
                    class: 'edit template'
                }
            },
            show: function (type, text, timeout) {

            $('.messenger ol')
                        .append('<li class="toast-' + toast.kind[type].icon + ' ' + toast.kind[type].class + '"><i class="' + toast.kind[type].icon + '"> </i><span>' + text + '</span></li>')
                        .slideDown('slow');

                    console.log('[----------- TOAST -----------]', type, text, timeout);

                if(timeout>0) $timeout(function(){$('.messenger ol li.toast-' + toast.kind[type].icon).slideUp('slow');},timeout);
            }
        };
        return toast;
    });
});