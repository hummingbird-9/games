(function () {
    const HOST_EXCLUDEs = [
        // "unblockedgames66.gitlab.io",
        // "unblockedgames67.gitlab.io",
        // "unblockedgames6969.gitlab.io",
        // "classroom6x.gitlab.io",
        // "unblockedgames76.gitlab.io",
        // "unblockedgames77.gitlab.io",
        // "unblockedgames911.gitlab.io",
        // "classroommanagement.gitlab.io",
        "ubg011.gitlab.io",
        "ubg010.gitlab.io",
        "ubg009.gitlab.io",
        "ubg008.gitlab.io",
        "ubg007.gitlab.io",
        "ubg006.gitlab.io",
        "ubg005.gitlab.io",
        "ubg004.gitlab.io",
        "ubg003.gitlab.io", "ubg03.gitlab.io",
        "ubg002.gitlab.io", "ubg02.gitlab.io",
        "ubg001.gitlab.io", "ubg01.gitlab.io",
        "ubg9999.gitlab.io",
        "ubg66ez.gitlab.io",
        "ubg69.gitlab.io",
        "ubg1000.gitlab.io",
        "ubg6.gitlab.io",
        "unblockedgames66.gitsites.io", "ubg66.gitsites.io", "ubg66.gitlab.io", "school.u66.dev",
        "ubg67.gitlab.io",
        "ubg6969.gitlab.io",
        "ubg76.gitlab.io",
        "ubg77.gitlab.io",
        "unblockedgames911.gitsites.io", "ubg911.gitsites.io", "ubg911.gitlab.io",

        "tyronegames.gitlab.io",
        "geometryspot.gitsites.io", "historyspot.gitsites.io", "geometrygames.gitlab.io",
        "unblockedgameswtf.gitsites.io", "ubgwtf.gitsites.io", "gameswtf.gitlab.io",
        "unblockedgamesworld.gitsites.io", "ubgw.gitsites.io", "ubgw.gitlab.io",
        "unblockedgamesmom.gitsites.io", "ubgmom.gitsites.io", "ubgmom.gitlab.io",
        "class6x.gitlab.io",
        "cmug.gitlab.io",
        "unblockedgamess3.gitlab.io",

        "ubg98.github.io",
        "ubg44.github.io",
        "ubg89.github.io",
        "ubg17.github.io",

        "puzzlegames.gitlab.io",
        "cargames.gitlab.io",
        "2playergames.gitlab.io",
        "sportsgames.gitlab.io",
        "dressupgames.gitlab.io",

        // AK47
        "fafgamesunblocked.github.io",
        "ubgsniper.github.io",
        "ubghunter.github.io",
        "ubgx3m.github.io",
        "unblockedgamespremium.github.io",
        "ubgarena.github.io",

        "gamecloner.wp235.workers.dev",
    ];

    const isInIframe = function () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    if (!isInIframe()) {
        console.log("ubg235.commerical SKIPDIRECT");
        return false;
    }

    const parent_location = document.referrer;
    console.log("parent_location", parent_location);
    for (let i = 0; i < HOST_EXCLUDEs.length; i++) {
        if (parent_location.indexOf(`https://${HOST_EXCLUDEs[i]}/`) > -1) {
            console.log("ubg235.commerical SKIPDOMAIN", parent_location);
            return false;
        }
    }

    window.safeWindowOpen = function (url, target, features) {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        const safeOpen = iframe.contentWindow.open.bind(window);
        document.body.removeChild(iframe);

        return safeOpen(url, target, features);
    };

    async function getCountryCode() {
        const res = await fetch("https://ubg235.pages.dev/cdn-cgi/trace");
        const data = await res.text();
        const country= (data.split("loc=")?.[1]?? "").split("\n")[0];
        return country;
    }

    getCountryCode().then((country) => {
        // console.log("country", country);
        if (["US", "GB", "AU"].includes(country)) {
            console.log("ubg235.commercial.ADS", country);
            // window.safeWindowOpen("https://unblockedgamess3.gitlab.io/", "unblockedgamess3");
            // window.safeWindowOpen("https://cmug.gitlab.io/", "cmug");
            // window.safeWindowOpen("https://ubgw.gitlab.io/", "ubgw");
            // window.safeWindowOpen("https://ubgmom.gitlab.io/", "ubgmom");
            // window.safeWindowOpen("https://gameswtf.gitlab.io/", "gameswtf");
            // window.safeWindowOpen("https://geometrygames.gitlab.io/", "geometrygames");
            // window.safeWindowOpen("https://tyronegames.gitlab.io/", "tyronegames");
            // window.safeWindowOpen("https://2playergames.gitlab.io/", "2playergames");
            // window.safeWindowOpen("https://ubg6.gitlab.io/", "ubg6");
            // window.safeWindowOpen("https://ubg1000.gitlab.io/", "ubg1000");
            // window.safeWindowOpen("https://ubg69.gitlab.io/", "ubg69");
            // window.safeWindowOpen("https://ubg66ez.gitlab.io/", "ubg66ez");
            // window.safeWindowOpen("https://ubg1024.gitlab.io/", "ubg1024");
            // window.safeWindowOpen("https://ubg9999.gitlab.io/", "ubg9999");
            // window.safeWindowOpen("https://gameswtf.gitlab.io/", "gameswtf");
            // window.safeWindowOpen("https://ubg66.gitlab.io/", "ubg66");
            // window.safeWindowOpen("https://ubg911.gitlab.io/", "ubg911");
            // window.safeWindowOpen("https://ubg005.gitlab.io/", "ubg005");
            // window.safeWindowOpen("https://ubg006.gitlab.io/", "ubg006");
            // window.safeWindowOpen("https://ubg007.gitlab.io/", "ubg007");
            // window.safeWindowOpen("https://ubg008.gitlab.io/", "ubg008");
            // window.safeWindowOpen("https://ubg009.gitlab.io/", "ubg009");
            window.safeWindowOpen("https://ubg010.gitlab.io/", "ubg010");
        } else {
            console.log("ubg235.commercial SKIP Country", country);
        }
    });
    // window.safeWindowOpen("https://www.games235.com/", "games235");
})();

console.log("ubg235.commercial");
