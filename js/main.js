(function($){
    var NavBar = Backbone.View.extend({
        el: $('body'),
        initialize: function() {
            _.bindAll(this, 'render');
            this.render();
        },
        
        render: function() {
            var template = _.template($("#navbar_template").html(),{});
            $(this.el).append(template);
        }
    });

    var ListView = Backbone.View.extend({
        el: $('#list-view'),
        initialize: function() {
            _.bindAll(this, 'render');
            this.render();
        },
        
        render: function() {
            var html = '<div style="padding: 8px 0;" class="well"><ul class="nav nav-list">';
            for(var i=0;i<3;i++) {
                html += '<li class="' + (i==0?'active':'') +'"><a href="#"><i class="icon-home icon-white"></i> Home</a></li>';
            }
            
            $(this.el).append(html);
        }
    });

/*
    var GanttChart = Backbone.View.extend({
        el: $('#gantt-chart'),
        initialize: function() {
            _.bindAll(this, 'render');
            this.render();
        },

        render: function() {
            var html = '<table class="table"></table>';
            $(this.el).append(html);
        }
    });
*/

    var navBar = new NavBar();
    var listView = new ListView();

    jQuery("#gantt-chart").gantt({
        source: "js/data.json",
        itemsPerPage: 50,
        months: [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"],
        dow: ["S", "M", "T", "W", "Th", "F", "Sa"],
        navigate: 'scroll',
        scale: 'hours',
        maxScale: 'days',
        minScale: 'hours',
        holidays: [
            "\/Date(1293836400000)\/",
            "\/Date(1351724400000)\/"
        ]
    });

    $('.dropdown-toggle').dropdown(); 
})(jQuery);
