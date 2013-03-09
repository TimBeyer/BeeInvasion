(function () {
    $(function () {
        
        var canvas = $('#gameCanvas')[0];
        var ctx = canvas.getContext("2d");
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    });
}());