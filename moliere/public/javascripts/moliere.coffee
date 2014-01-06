$(->
    class Phrase extends Backbone.Model
        urlRoot: '/phrase'

    class PhraseView extends Backbone.View
        initialize: ->
            App.on 'sync', @render
            App.fetch cache: false

        render: =>
            svg = d3.select('svg')

            svg.append('circle')
               .attr('cx', 330)
               .attr('cy', 120)
               .attr('r', 10)
               .style('fill', 'white')

            svg.append('circle')
               .attr('cx', 310)
               .attr('cy', 140)
               .attr('r', 7)
               .style('fill', 'white')

            svg.append('ellipse')
               .attr('cx', 600)
               .attr('cy', 100)
               .attr('rx', 250)
               .attr('ry', 65)
               .style('fill', 'white')

            svg.append('text')
               .attr('x', 370)
               .attr('y', 105)
               .text(App.get('text'))
               .attr('font-family', '"Lucida Grande", Helvetica, Arial, sans-serif')
               .attr('font-size', '17px')
               .attr('fill', 'black')

    class NewPhrase extends Backbone.View
        events: 
            'click button': ->
                $.post '/phrase', last: App.id, (data) ->
                    App.set data
                    App.fetch()

    class Language extends Backbone.View
        initialize: ->
            App.on 'sync', @render
            
        render: =>
            @$('.lang').text if App.get('lang') is 'fr' then 'English' else 'French'
                    
        events: 
            'click button': ->
                $.post 'lang/' + (if App.get('lang') is 'fr' then 'en' else 'fr'), ->
                    App.fetch cache: false
                
    App = new Phrase id: 1

    new PhraseView el: 'article'
    new NewPhrase el: '.new-phrase'
    new Language el: '.language'
)
