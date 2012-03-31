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
            var template = _.template($("#listview_template").html(),{});
            $(this.el).append(template);
        }
    });

    var GanttChart = Backbone.View.extend({
        el: $('#gantt-chart'),
        initialize: function() {
            _.bindAll(this, 'render');
        },
    
        retrieve: function() {
            var self = this;
            $.getJSON('/js/data.json', function(data) {
                var items= [];
                $.each(data, function(key, val) {
                    items.push(key + ':' + val);
                });
                alert(items);
                self.render(data);
            });
        },

        render: function(data) {
            if(!data) {
                this.retrieve();
                return;
            }
            $(this.el).empty();
            var top_row = $('<div class="row">');
            //top_row.append($('<button class="span2 btn btn-mini btn-primary">').append('Add Task'));
            

            var progress = $('<div class="span12 progress">');
            progress.append($('<div class="bar" style="width: 60%">'));

            top_row.append(progress);

            var template = $('<table class="table table-bordered">');
            template.append($('<tr>').append('<th>Title</th>').append('<th>Timeline</th>'));
            for(var i=0;i<10;i++) {
                var row = $('<tr>').append('<td width="30%"><span class="badge">'+i+'</span></td>');
                var line = $('<td width="70%">');
                
                var boxes = $('<table width="100%" boder="0">').append($('<tr>'));
                
                for(var j=0;j<10;j++) {
                    if(j==i) {
                        var color = '#'+Math.floor(Math.random()*(0xFFFFFF+1)<<0).toString(16);
                        boxes.append('<td boder="0" width="10%" style="background-color:'+color+';border:none"> </td>');
                    } else {
                        boxes.append('<td boder="0" width="10%" style="border:none;"> </td>');
                    }
                }

                line.append(boxes);
                row.append(line);
                template.append(row);
            }
            $(this.el).append(top_row).append(template);
        }
    });

    var AddTask = Backbone.View.extend({
        el: $('#add-task-page'),
        initialize: function() {
            _.bindAll(this, 'render');
            //this.render();
        },
        
        render: function() {
            var template = _.template($("#addtask_template").html(),{});
            $(this.el).append(template);
        }
    });


    var AppRouter = Backbone.Router.extend({
        routes: {
            "gantt":"ganttChartShow",
            "add":"addTask"
        },
        ganttChartShow: function() {
            $('a[href="#add"]').parent().removeClass();
            $('a[href="#gantt"]').parent().addClass('active');
            $('#add-task-page').empty();
            ganttChart.render();
        },
        addTask: function() {
            $('a[href="#gantt"]').parent().removeClass();
            $('a[href="#add"]').parent().addClass('active');
            $('#gantt-chart').empty();
            addTask.render();
        }
    });


    //var listView = new ListView();

    $('.dropdown-toggle').dropdown(); 
    var navBar = new NavBar();
    var ganttChart = new GanttChart();
    var addTask = new AddTask();
    var app_router = new AppRouter;

    Backbone.history.start();
})(jQuery);
