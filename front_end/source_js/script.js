var setFlexSize = function() {
    var correctSize = Math.max(0, ($(window).width() - 1400) / 2);
    $(".flex-size").css("width", correctSize);
}

window.onresize = function(ev) {
    setFlexSize();
}