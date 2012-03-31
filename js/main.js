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

    var ProgressBar = Backbone.View.extend({
        tagName: 'div',
        initialize: function() {},
        render: function(howmanydone, max) {
            $(this.el).append($('<div class="span12 progress">').append($('<div class="bar">').css( "width", howmanydone/max*100 + '%').show('slow')));
            return this;
        }
    });

    var TaskView = Backbone.View.extend({
        tagName: "tr",
        key:'',
        events: {
            "click .toggle" : "toggleDone",
            "mouseover":"showToggle",
            "mouseout":"muteToggle"
        },
        initialize: function() {
        },
        render:function(data, max, idx) {
            this.key = data.key;
            var td1 = $('<td>').attr('width', '30%');
            td1.append($('<span class="badge">'+data.queue+'</span>'));
            td1.append($('<span style="margin-left:2px;margin-right:2px" class="toggle">' + data['title'] + '</span>'));
            td1.append($('<i class="icon-ok toggle" style="display:none;float:right;">'));

            var td2 = $('<td>').attr('width', '70%');
            var boxes = $('<table width="100%" boder="0">').append($('<tr>'));
            var portion = 100/max;
            for(var j=0;j<max;j++) {
                if(j==idx) {
                    var color = '#'+Math.floor(Math.random()*(0xFFFFFF+1)<<0).toString(16);
                    boxes.append('<td boder="0" width="'+portion+'%" style="background-color:'+color+';border:none"> </td>');
                } else {
                    boxes.append('<td boder="0" width="'+portion+'%" style="border:none;"> </td>');
                }
            }

            td2.append(boxes);
            $(this.el).append(td1);
            $(this.el).append(td2);
            return this;
        },
        showToggle: function() {
            $(this.el).find('i').each(function() { $(this).show();});
        },
        muteToggle: function() {
            $(this.el).find('i').each(function() { $(this).hide();});
        },
        toggleDone: function() {
            var self = this;
            $(this.el).find('span').each(function() {
                $(this).parent().append($('<s>').append($(this)));
            });
            $.getJSON('/del?key=' + self.key, function(data) {
                alert('hh');
                ganttChart.retrieve();
            });
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

            var howmanydone = 0;
            for(var i=0;i<data.length;i++) {
                if(data[i].done) howmanydone++;
            }
            var progress = new ProgressBar;
            top_row.append(progress.render(howmanydone, data.length).el);

            var template = $('<table class="table table-bordered">');
            template.append($('<tr>').append('<th>Title</th>').append('<th>Timeline</th>'));
            for(var i=0;i<data.length;i++) {
                task_view = new TaskView;
                var max = 0, idx = 0;
                for(var j=0;j<data.length;j++) {
                    if(data[i].queue==data[j].queue) {
                        max++;
                        if(j<i)
                            idx++;
                    }
                }
                var row = task_view.render(data[i], max, idx).el;
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
