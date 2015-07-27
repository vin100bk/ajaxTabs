/**
 * ajaxTabs is a very lightweight jquery plugin which allows building tabs very easily
 * @param prop
 * @returns {*}
 */
$.fn.ajaxTabs = function (prop) {
    /**
     * Default properties values
     */
    var properties = $.extend({
        /**
         * Tab selector
         */
        'selectorTab': 'a',

        /**
         * Data attribute name which contains url to fetch for this tab
         * This attribute has to be set on elements selected by "selectorTab" (see just before)
         */
        'attrDataUrl': 'lighttab-url',

        /**
         * Callback function called before the ajax call
         * @param tab: the tab selected
         * @param container: the container associated
         */
        'beforeCallback': function (tab, container) {
        },

        /**
         * Callback function called after the ajax call
         * @param tab: the tab selected
         * @param container: the container associated
         */
        'afterCallback': function (tab, container) {
        }
    }, prop);

    /**
     * Browse all tabs elements
     */
    return this.each(function () {
        /**
         * Init click event on tabs
         */
        $(this).find(properties.selectorTab).on('click', function (e) {
            e.preventDefault();

            var tab = $(this);
            var url = tab.data(properties.attrDataUrl);
            var href = tab.attr('href');
            var container = $(href);

            // Hide all containers
            container.siblings().removeClass('active');

            // Set the tab as active
            var li = $(this).parent();
            li.siblings().removeClass('active');
            li.addClass('active');

            if (container.length == 0) {
                // Wrapper does not exist
                throw '"' + href + '" is not in the DOM !';
            } else if (container.is(':empty')) {
                if(!url) {
                    throw '"data-' + properties.attrDataUrl + '" is not set !';
                }

                // First loading
                properties.beforeCallback(tab, container);
                $.ajax(url)
                    .done(function (data) {
                        // Set the data in the container
                        container.html(data);
                        // Display the container
                        container.addClass('active');
                        properties.afterCallback(tab, container);
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        properties.afterCallback(tab, container);
                        throw 'Error while loading "' + url + '"';
                    });
            } else {
                // Content has already been loaded, just display it
                container.addClass('active');
            }
        });

        /**
         * Init initial tab (if there is one)
         */
        var initialTab = $(this).find('> .active ' + properties.selectorTab);
        if(initialTab.length == 1) {
            initialTab.trigger('click');
        }
    });
};
