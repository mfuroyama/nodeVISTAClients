/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'config',
], function ($, _, Backbone, config) {
    'use strict';

    var ManagementModel = Backbone.Model.extend({
        urlRoot: `${config.httpProtocol}/${config.host}:${config.port}/management`,
    });

    return ManagementModel;
});