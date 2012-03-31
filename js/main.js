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
        el: $('#listView'),
        initialize: function() {
            _.bindAll(this, 'render');
            this.render();
        },
        
        render: function() {
            $(this.el).append('<div style="padding: 8px 0;" class="well"><ul class="nav nav-list"></ul></div>');
        }
    });

    var navBar = new NavBar();
    var listView = new ListView();

    $('.dropdown-toggle').dropdown(); 
})(jQuery);
