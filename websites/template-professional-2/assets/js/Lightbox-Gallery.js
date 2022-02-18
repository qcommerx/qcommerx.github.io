if (document.querySelectorAll('[data-bss-baguettebox]').length > 0) {
   baguetteBox.run('[data-bss-baguettebox]', { animation: 'fadeIn', noScrollbars: true, captions: function(element) {
        return element.getElementsByTagName('img')[0].alt;
    } });
}