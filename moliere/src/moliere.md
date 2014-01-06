Belle Marquise
==============

This is a simple bit of front-end code used to demonstrate a REST api
written in Node.js. The code below is written in CoffeeScript, which in turn
is transcompiled into JavaScript in order to run in a web browser.

The code below uses Backbone.js for structure and D3 for drawing SVG-based
shapes.

Execute this code after the document has loaded

    $(->

The **Phrase** class holds the text and language of the current
phrase. It requests data from the server at the given `/phrase` endpoint.

        class Phrase extends Backbone.Model
            urlRoot: '/phrase'

The **PhraseView** class draws an SVG shape with the text of the current
phrase. When initialized, the first phrase is fetched from the server.
Also, the view will render every time the **Phrase** model is updated
(i.e. sync'ed).

        class PhraseView extends Backbone.View
            initialize: ->
                App.on 'sync', @render
                App.fetch cache: false

Use D3 to generate several SVG shapes: two small, empty circles and an elipse
in which the current phrase is displayed.

            render: =>
                svg = d3.select('svg')

Generate a small circle with radius=10 and fill=white

                svg.append('circle')
                   .attr('cx', 330)
                   .attr('cy', 120)
                   .attr('r', 10)
                   .style('fill', 'white')

Generate another small circle with radius=7 and fill=white

                svg.append('circle')
                   .attr('cx', 310)
                   .attr('cy', 140)
                   .attr('r', 7)
                   .style('fill', 'white')

Generate a larger ellipse with rx=250, ry=65 and a fill=white

                svg.append('ellipse')
                   .attr('cx', 600)
                   .attr('cy', 100)
                   .attr('rx', 250)
                   .attr('ry', 65)
                   .style('fill', 'white')

Generate a text element layered on top of the ellipse, containing
the text of the current phrase.

                svg.append('text')
                   .attr('x', 370)
                   .attr('y', 105)
                   .text(App.get('text'))
                   .attr('font-family', '"Lucida Grande", Helvetica, Arial, sans-serif')
                   .attr('font-size', '17px')
                   .attr('fill', 'black')

The **NewPhrase** class implements a simple button to request new phrases from the server.
It responds to `click` events and will first post some data to the server, requesting
a new random phrase (but not the last one shown). Once this data is retrieved, the
**Phrase** model `id` is updated and the data is re-fetched from the server.

        class NewPhrase extends Backbone.View
            events: 
                'click button': ->
                    $.post '/phrase', last: App.id, (data) ->
                        App.set data
                        App.fetch()

The **Language** class implements a button to toggle the language between French and
English. If the current phrase is French, the button displays 'English' and vice-versa.
The language is changed by posting the target language to the server endpoint.

        class Language extends Backbone.View
            initialize: ->
                App.on 'sync', @render
                
            render: =>
                @$('.lang').text if App.get('lang') is 'fr' then 'English' else 'French'
                        
            events: 
                'click button': ->
                    $.post 'lang/' + (if App.get('lang') is 'fr' then 'en' else 'fr'), ->
                        App.fetch cache: false
                    
Initialize the **Phrase** model with an `id` set to 1.

        App = new Phrase id: 1

Initialize the three page views.

        new PhraseView el: 'article'
        new NewPhrase el: '.new-phrase'
        new Language el: '.language'

End of the jQuery document.ready wrapper

    )
