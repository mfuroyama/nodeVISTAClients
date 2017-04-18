/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.paginator',
    'config',
], function ($, _, Backbone) {
    'use strict';

    var EmulatedRPCCollection = Backbone.PageableCollection.extend({
        model: Backbone.Model.extend(),
        mode: 'client',
        url: `${config.httpProtocol}://${config.host}:${config.port}/emulatedRPCList`,
        // Initial pagination states
        state: {
            pageSize: 20,
            firstPage: 0,
            currentPage: 0,
            sortKey: 'name'
        },
        consumeEvent: function(eventModel) {
            if (eventModel.get('runner') !== 'rpcEmulated') {
                return;
            }

            var model = this.fullCollection.findWhere({
                name: eventModel.get('rpcName')
            });

            if (!model) {
                return;
            }

            var count = model.get('count');

            model.set('count', count + 1);
        }
    });

    return new EmulatedRPCCollection();
});