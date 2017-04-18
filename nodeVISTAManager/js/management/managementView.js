/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'management/managementModel',
    'text!management/management.hbs',
    'templateHelpers'
], function ($, _, Backbone, Handlebars, ManagementModel, managementTemplate) {
    'use strict';
    var ManagementView = Backbone.View.extend({

        template: Handlebars.compile(managementTemplate),

        initialize: function () {
            this.management = new ManagementModel();
            this.management.fetch();

            this.management.on('change', _.bind(function() {
                this.render();
            }, this));
        },

        events: {
            "change .rpc-emulate-select": "onRPCEmulateChange"
        },

        render: function() {

            this.$el.html(this.template({management:this.management.toJSON()}));

            return this;
        },

        onRPCEmulateChange: function(event) {
            if (!event.currentTarget || !event.currentTarget.value) {
                return;
            }

            var isRpcsEmulated = undefined;
            if (event.currentTarget.value.toLowerCase() === 'on') {
                isRpcsEmulated = true;
            } else if (event.currentTarget.value.toLowerCase() === 'off') {
                isRpcsEmulated = false;
            } else {
                return;
            }

            //no change
            if (isRpcsEmulated === this.management.get('isRPCEmulated')) {
                return;
            }

            this.management.set('isRPCEmulated', isRpcsEmulated);

            this.management.sync('update', this.management);
        },

        onClose: function () {

        }
    });

    return ManagementView;
});