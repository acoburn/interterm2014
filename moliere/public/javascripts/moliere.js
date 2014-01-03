(function ($, Backbone, _, d3) {
  $(function() {
    
    // Phrase model
    // ------------
    var Phrase = Backbone.Model.extend({
      defaults: {
        lang: '',
        text: ''
      },
      urlRoot: '/phrase'
    });
        

    // Phrase Bubble view
    // ------------------
    var PhraseBubble = Backbone.View.extend({
      initialize: function () {
        App.phrase.on('sync', this.render, this);
        App.phrase.fetch({cache: false});
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

    // New Phrase button view
    // ----------------------
    var NewPhrase = Backbone.View.extend({
      events: {
        'click button': function () {
          $.post('/phrase', {last: App.phrase.id}, function (data) {
            App.phrase.set(data);
            App.phrase.fetch();
          });
        }
      }
    });

    // Language button toggle view
    // ---------------------------
    var Language = Backbone.View.extend({
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

    var App = {
      phrase: new Phrase({id: 1})
    };

    new PhraseBubble({el: 'article'});
    new NewPhrase({el: '.new-phrase'});
    new Language({el: '.language'});

  });
})(jQuery, Backbone, _, d3)
