pc.script.createLoadingScreen(function (app) {
    const div = document.createElement('div');
    div.style.backgroundColor = "#232323"; // Dark gray background
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.height = "100%";
    div.style.width = "100%";
    document.body.appendChild(div);

    // Create the progress bar div, centered on the screen
    const progressBar = document.createElement('div');
    progressBar.style.position = "absolute";
    progressBar.style.top = "50%";
    progressBar.style.left = "25%";
    progressBar.style.transform = "translateY(-50%)";
    progressBar.style.width = "50%";
    progressBar.style.height = "20px";
    progressBar.style.backgroundColor = "#d3d3d3"; // Light gray for the bar background
    div.appendChild(progressBar);

    // Create the filler for the progress bar
    const progressFiller = document.createElement('div');
    progressFiller.style.height = "100%";
    progressFiller.style.backgroundColor = "#2847af"; // Green for the progress
    progressFiller.style.width = "0%";
    progressBar.appendChild(progressFiller);

    var showSplash = function () {
    };

    var hideSplash = function () {
        //document.body.removeChild(div);
    };

    var lastProgress = 0; 
    var setProgress = function (value) {
        let curProg = Math.floor(value * 100 -0.1);
        if (lastProgress != curProg && window.GameInterface !== undefined) window.GameInterface.sendPreloadProgress(curProg);
        lastProgress = curProg;

        progressFiller.style.width = (value * 100) + '%';
    };

    //var div;
    var createCss = function () {
        
    };

    createCss();
    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
        
    });
    app.on('preload:progress', setProgress);
    //app.on('start', hideSplash);

    app.once('start', () => {
        document.body.removeChild(div);
    });
});