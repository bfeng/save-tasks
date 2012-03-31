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

    var TaskView = Backbone.View.extend({
        tagName: "td",
        events: {
            "click .toggle" : "toggleDone",
            "mouseover":"showToggle",
            "mouseout":"muteToggle"
        },
        initialize: function() {
        },
        render:function(data) {
            $(this.el).attr('width', '30%');
            $(this.el).append($('<span class="badge">'+data.piority+'</span>'));
            $(this.el).append($('<span style="margin-left:2px;margin-right:2px" class="toggle">' + data['title'] + '</span>'));
            $(this.el).append($('<i class="icon-ok" style="display:none;float:right;">'));
            return this;
        },
        showToggle: function() {
            $(this.el).children('i').each(function() { $(this).show();});
        },
        muteToggle: function() {
            $(this.el).children('i').each(function() { $(this).hide();});
        },
        toggleDone: function() {
            alert('click');
        }
    });

    var GanttChart = Backbone.View.extend({
        el: $('#gantt-chart'),
        initialize: function() {
            _.bindAll(this, 'render');
        },
    
        retrieve: function() {
            var self = this;
            $.getJSON('/tasks', function(data) {
                var items= [];
                $.each(data, function(key, val) {
                    items.push(key + ':' + val);
                });
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
            for(var i=0;i<data.length;i++) {
                task_view = new TaskView;
                var row = $('<tr>').append(task_view.render(data[i]).el);
                var line = $('<td width="70%">');
                
                var boxes = $('<table width="100%" border="0">').append($('<tr>'));
                
                var potion = 100/data.length;
                for(var j=0;j<data.length;j++) {
                    if(j==i) {
                        var color = '#'+Math.floor(Math.random()*(0xFFFFFF+1)<<0).toString(16);
                        boxes.append('<td boder="0" width="'+potion+'%" style="background-color:'+color+';border:none"> </td>');
                    } else {
                        boxes.append('<td boder="0" width="'+potion+'%" style="border:none;"> </td>');
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
            $(this.el).empty();
            var template = _.template($("#addtask_template").html(),{});
            $(this.el).append(template);
        }
    });


    var AppRouter = Backbone.Router.extend({
        routes: {
            "gantt":"ganttChartShow",
            "add":"addTaskShow"
        },
        ganttChartShow: function() {
            $('a[href="#add"]').parent().removeClass();
            $('a[href="#gantt"]').parent().addClass('active');
            $('#add-task-page').empty();
            ganttChart.render();
        },
        addTaskShow: function() {
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
