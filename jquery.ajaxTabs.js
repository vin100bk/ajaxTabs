/**
 * ajaxTabs is a very lightweight jquery plugin which allows to build tabs very easily
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
         */
        'beforeCallback': function () {
            $('html,body').css('cursor', 'progress');
        },

        /**
         * Callback function called after the ajax call
         */
        'afterCallback': function () {
            $('html,body').css('cursor', 'default');
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

            var url = $(this).data(properties.attrDataUrl);
            var href = $(this).attr('href');
            var wrapper = $(href);

            // Hide all wrappers
            wrapper.siblings().removeClass('active');

            // Set the tab as active
            var li = $(this).parent();
            li.siblings().removeClass('active');
            li.addClass('active');

            if (wrapper.length == 0) {
                // Wrapper does not exist
                throw '"' + href + '" is not in the DOM !';
            } else if (wrapper.is(':empty')) {
                // First loading
                $.ajax({
                    url: url,
                    beforeSend: properties.beforeCallback
                })
                    .done(function (data) {
                        // Set the data in the wrapper
                        wrapper.html(data);
                        // Display the wrapper
                        wrapper.addClass('active');
                        properties.afterCallback();
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        throw 'Error while loading "' + url + '"';
                    });
            } else {
                // Content has already been loaded, just display it
                wrapper.addClass('active');
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
