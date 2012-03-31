(function($){
    var NavBar = Backbone.View.extend({
        el: $('body'),
        initialize: function() {
            _.bindAll(this, 'render');
            this.render();
        },
        
        render: function() {
            $(this.el).append('');
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

    var navBar = new NavBar();
    var listView = new ListView();
    var ganttChart = new GanttChart();

    $('.dropdown-toggle').dropdown(); 
})(jQuery);
