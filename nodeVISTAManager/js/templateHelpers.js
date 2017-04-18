/*global define*/
define([
    'handlebars',
    'jsBeautify'
], function (Handlebars, jsBeautify) {
    'use strict';

    Handlebars.registerHelper('rpc-lock-select', function(management) {

        if (!management) {
            return;
        }

        function setSelected(management, optionValue) {
            if ((management.isRPCEmulated && optionValue === 'on') ||
                (!management.isRPCEmulated && optionValue === 'off')) {
                return ' selected';
            }

            return '';
        }

        var selectHtml = '<select class="form-control rpc-lock-select">';
        selectHtml += '<option value="on"' + setSelected(management, 'on') + '>On</option>';
        selectHtml += '<option value="off"' + setSelected(management, 'off') + '>Off</option>';
        selectHtml += '</select>';

        return new Handlebars.SafeString(selectHtml);
    });

    Handlebars.registerHelper('show-runner', function(runner, lockerName) {
        if (runner === 'rpcRunner') {
            return 'Pass Through';
        } else if (runner === 'rpcEmulated') {
            return lockerName || 'RPC Emulated';
        } else if (runner === 'server') {
            return 'Server';
        } else return runner;
    });

    Handlebars.registerHelper('jsBeautify', function(obj) {
        return jsBeautify.js_beautify(JSON.stringify(obj));
    });
});