$(document).ready(function() {
    //* small gallery grid
    gal_grid.small();
});

//* gallery grid
gal_grid = {
    small: function() {
        if($('#small_grid').length) {
            //* small gallery grid
            $('#small_grid ul').imagesLoaded(function() {
                
                var filter = '',
                    handler;
                
                // Prepare layout options.
                var options = {
                    autoResize: true, // This will auto-update the layout when the browser window is resized.
                    container: $('#small_grid'), // Optional, used for some extra CSS styling
                    offset: 4, // Optional, the distance between grid items
                    flexibleItemWidth: false
                };

                // This function filters the grid when a change is made.
                var refresh = function() {
                    // Clear our previous handler.
                    if(handler) {
                      handler.wookmarkClear();
                      handler = null;
                    }
                    
                    // This hides all grid items ("inactive" is a CSS class that sets opacity to 0).
                    $('#small_grid ul li').addClass('inactive');
                    
                    // Create a new layout selector with our filter.
                    handler = $(filter);
                    
                    // This shows the items we want visible.
                    handler.removeClass("inactive");
                    
                    // This updates the layout.
                    handler.wookmark(options);
                }

                /**
                 * This function checks all filter options to see which ones are active.
                 * If they have changed, it also calls a refresh (see above).
                 */
                var updateFilters = function() {
                    var oldFilter = filter;
                    filter = '';
                    var filters = [];
                    
                    // Collect filter list.
                    var lis = $('#small-filters li');
                    var i=0, length=lis.length, li;
                    for(; i<length; i++) {
                      li = $(lis[i]);
                      if(li.hasClass('active')) {
                        filters.push('#small_grid ul li.'+li.attr('data-filter'));
                      }
                    }

                    // If no filters active, set default to show all.
                    if(filters.length == 0) {
                      filters.push('#small_grid ul li');
                    }
                    
                    // Finalize our filter selector for jQuery.
                    filter = filters.join(', ');
                    
                    // If the filter has changed, update the layout.
                    if(oldFilter != filter) {
                      refresh();
                    }
                };

                /**
                 * When a filter is clicked, toggle it's active state and refresh.
                 */
                var onClickFilter = function(event) {
                    var item = $(event.currentTarget);
                    $('#small-filters li').removeClass('active');
                    item.toggleClass('active');
                    updateFilters();
                }

                // Capture filter click events.
                $('#small-filters li').click(onClickFilter);
                
                // Do initial update (shows all items).
                updateFilters();

                $('#small_grid ul li > a').attr('rel', 'gallery').colorbox({
                    maxWidth        : '80%',
                    maxHeight       : '80%',
                    initialWidth    : '100',
                    initialHeight   : '100',
                    opacity         : '0.4', 
                    loop            : false,
                    fixed           : true,
                    scrolling       : false
                });
                
                $('#small_grid ul li > a').append('<span class="zoomOverlay" />');
                
            });
        }
    }
};
