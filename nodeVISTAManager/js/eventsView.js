/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'backgrid',
    'management/managementModel',
    'jsBeautify',
    'config',
    'bootstrap',
    'templateHelpers',
    'backbone.paginator',
    'backgrid.paginator',
    'backgridCustomCells',
    'backgridSelectFilter',
    'backgridMomentCell'
], function ($, _, Backbone, Handlebars, Backgrid, ManagementModel, jsBeautify) {
    'use strict';

    var EventsView = Backbone.View.extend({

        /**
         * Initialize base EventsView
         * @param options {eventCollection, template, eventTableTemplate}
         */
        initialize: function (options) {

            this.eventTableFilter = '';

            this.template = Handlebars.compile(options.template);
            this.eventModalTemplate = Handlebars.compile(options.eventModalTemplate);

            this.eventCollection = options.eventCollection;

            this.management = new ManagementModel();

            //update is mvdm locked icon
            this.listenTo(this.management, 'change', function() {

                this.$el.find('.glyphicon-ok-sign').addClass('hidden');
                this.$el.find('.glyphicon-remove-sign').addClass('hidden');

                if (this.management.get('isRPCLocked')) {
                    this.$el.find('.glyphicon-ok-sign').removeClass('hidden');
                } else {
                    this.$el.find('.glyphicon-remove-sign').removeClass('hidden');
                }
            });

            this.management.fetch();

            var eventsView = this;

            //customize row to handle event details click
            var row = Backgrid.Row.extend({
                events: {
                    'click': "rowClick"
                },
                rowClick: function(e) {
                    eventsView.showEventDetails(this.model);
                }
            });

            this.lockedGrid = new Backgrid.Grid({
                row: row,
                columns: options.columns,
                collection: this.eventCollection
            });

            var filterConfig = {
                className: "backgrid-filter form-control filter filter-select",
                collection: this.eventCollection,
                field: options.selectField,
                selectOptions: options.selectOptions
            };

            if (options.selectInitialValue) {
                filterConfig.initialValue = options.selectInitialValue;
            }

            if (options.selectMatcher) {
                filterConfig.makeMatcher = options.selectMatcher;
            }

            this.gridFilter = new Backgrid.Extension.SelectFilter(filterConfig);

            this.lockedPaginator = new Backgrid.Extension.Paginator({
                collection: this.eventCollection,
                goBackFirstOnSort: false
            });

            this.gridPage = options.gridPage;
        },

        events: {
            'click .clear-events-list': 'onClearEventsList'
        },

        /**
         * Render events view
         * @param templateOptions template fields
         * @returns {EventsView}
         */
        render: function (templateOptions) {

            var templateArgs = {
                eventTableFilter: this.eventTableFilter,
                management:this.management.toJSON()
            };

            if (templateOptions) {
                templateArgs = _.extend(templateArgs, templateOptions);
            }

            this.$el.html(this.template(templateArgs));

            if (this.renderEventCounter) {
                this.renderEventCounter();
            }

            this.$el.find('#events-table').append(this.lockedGrid.render().el);

            //render paginator
            this.$el.find('#events-table').append(this.lockedPaginator.render().el);

            //render filter
            if (this.gridFilter) {
                this.$el.find("#filter").replaceWith(this.gridFilter.render().$el);

                this.$el.find('.filter')
                    .on('change', _.bind(function(e) {
                        if (this.onFilterChange) {
                            this.onFilterChange(e);
                        }
                    }, this));

            }

            //apply bootstrap table styles to grid
            this.$el.find('.backgrid').addClass('table table-condensed table-striped table-bordered table-hover');

            if (this.gridPage && this.eventCollection.fullCollection.pageableCollection) {
                this.eventCollection.fullCollection.pageableCollection.getPage(this.gridPage);
            }

            return this;
        },

        onClearEventsList: function(e) {
            e.preventDefault();

            //clear events
            var col = this.eventCollection.fullCollection || this.eventCollection;
            col.reset();

            if (this.clearEventCounter) {
                this.clearEventCounter();
            }
        },

        //display event details modal
        showEventDetails: function(eventModel) {

            var modalHtml = this.eventModalTemplate({
                event: eventModel.toJSON(),
                eventDetails: jsBeautify.js_beautify(
                    JSON.stringify(eventModel.get('data') ? eventModel.get('data') : _.omit(eventModel.toJSON(), 'cid'))
                )
            });

            this.$el.find('#event-modal-container').html(modalHtml);

            var $modelEl = this.$el.find('.event-modal');
            var title;

            if (eventModel.get('rpcName')) {
                title = 'RPC: ' + eventModel.get('rpcName');
            } else {
                title = 'Event: ' + eventModel.get('type');
            }

            $modelEl.find('.modal-title').html(title);

            $modelEl.modal('show');
        },

        onClose: function () {

        }
    });


    return EventsView;
});