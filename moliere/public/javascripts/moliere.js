(function ($, Backbone, _, d3) {
  $(function() {
    var Models = {}
      , Views = {}
      , App = {}
      ;
    
    Models.Phrase = Backbone.Model.extend({
      defaults: {
        lang: '',
        text: ''
      },
      urlRoot: '/phrase'
    });
        
    Views.Phrase = Backbone.View.extend({
      initialize: function () {
        App.phrase.on('sync', this.render, this);
      },
      render: function () {
        var svg = d3.select("svg");
        svg.append('circle')
           .attr('cx', 330)
           .attr('cy', 120)
           .attr('r', 10)
           .style('fill', 'white');
        svg.append('circle')
           .attr('cx', 310)
           .attr('cy', 140)
           .attr('r', 7)
           .style('fill', 'white');
        svg.append("ellipse")
           .attr("cx", 600)
           .attr("cy", 100)
           .attr("rx", 250)
           .attr("ry", 65)
           .style("fill", "white");
        svg.append('text')
           .attr("x", 370)
           .attr("y", 105)
           .text(App.phrase.get('text'))
           .attr("font-family", '"Lucida Grande", Helvetica, Arial, sans-serif')
           .attr("font-size", "17px")
           .attr("fill", "black");
      }
    });

    Views.NewPhrase = Backbone.View.extend({
      events: {
        'click button': function () {
          $.post('/phrase', {last: App.phrase.id}, function (data) {
            App.phrase.set(data);
            App.phrase.fetch();
          });
        }
      }
    });

    Views.Language = Backbone.View.extend({
      initialize: function () {
        App.phrase.on('sync', this.render, this);
      },
      render: function () {
        this.$('.lang').text(
          App.phrase.get('lang') == 'fr' ? 'English' : 'French'
        );
      },
      events: {
        'click button': function (evt) {
          $.post('lang/' + (App.phrase.get('lang') == 'fr' ? 'en' : 'fr'), function () {
            App.phrase.fetch({cache: false});
          });
        }
      }
    });

    App.phrase = new Models.Phrase({id: 1});

    new Views.Phrase({el: 'article'});
    new Views.NewPhrase({el: '.new-phrase'});
    new Views.Language({el: '.language'});

    App.phrase.fetch({cache: false});
  });
})(jQuery, Backbone, _, d3)
