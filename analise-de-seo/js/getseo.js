$(document).ready(function () {
    
    /** Random integer  */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    /** Gauge Results */
    var seo = 0;
    var web = "";
    var g = new JustGage({
        id: "gauge",
        value: seo,
        min: 0,
        max: 100,
        title: "Visitors",
        label: web,
        symbol: '%',
        pointer: true,
        counter: true,
        customSectors: {
            percents: true,
            ranges: [{
                color: '#1ffa0f',
                lo: 76,
                hi: 100
            }, {
                color: '#0f1bfa',
                lo: 51,
                hi: 75
            }, {
                color: '#fae60f',
                lo: 26,
                hi: 50
            }, {
                color: '#fa2a0f',
                lo: 0,
                hi: 25
            }]
        },
        relativeGaugeSize: true
    });

    /** Form prevent defaults */
    $('#getStatus').on('submit', function (e) {
        e.preventDefault();
    })

    /** Form send info and get customer tests */
    $('#getStatus').on('submit', function () {
        if (!$('#email').val() || $('#website').val().length < 4) { return; }
        $('#mymodal').modal({
            backdrop: 'static',
            keyboard: false
        })

        $.ajax({
            url: "https://us-central1-dns1-248518.cloudfunctions.net/siteScore/?website=" + $('#website').val()
        }).done(function (data) {
            /** On success send data to mailchimp */
            $.ajax({
                url: 'https://qcommerx.us20.list-manage.com/subscribe/post?u=a8e37df0c5e1262b5fa443807&amp;id=5b4269ed78',
                dataType: 'html',
                type: 'POST',
                data: $('#mc-embedded-subscribe-form').serialize()
            })
            
            /** On success shows data and gauge refreshed*/
            seo = data
            web = $('#website').val()
            $('#site').html("Seu site: " + web)
            $('#mymodal').modal('hide')
            g.refresh(seo);
            $('#email').val('')
            $('#website').val('')

        }).fail(function (data) {
            $('#mymodal').modal('hide')
            $('#modalerror').modal('show')
            $('#website').val('')
        });

    })

});
