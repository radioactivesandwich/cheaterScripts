var arrayLength;
var ids = [];
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://domain.zendesk.com/api/v2/views.json", true);

xhr.responseType = "json";
xhr.send(null);

xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            arrayLength = xhr.response.views.length - 1;
            console.log("Array length = " + arrayLength);
            for (var i = arrayLength; i >= 0; i--) {
            (function (i){
            	if (xhr.response.views[i].active === true) {
					var phr = [];
					phr[i] = new XMLHttpRequest();
					phr[i].open("GET", "https://domain.zendesk.com/api/v2/views/" + xhr.response.views[i].id + "/execute.json", true);
					phr[i].responseType = "json";
					phr[i].onreadystatechange = function () {
					    if (phr[i].readyState == 4 && phr[i].status == 200) {
					            numTickets = phr[i].response.count;
					            console.log("View ID: " + xhr.response.views[i].id + "\n" + "View Name: " + xhr.response.views[i].title + "\n" + "Count = " + numTickets);
					    }
					};
					phr[i].send(null);
				}
            })(i);
            }
        }
    }
};