var arrayLength;
var ids = [];
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://domain.zendesk.com/api/v2/groups.json", true);

xhr.responseType = "json";
xhr.send(null);

xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            arrayLength = xhr.response.groups.length - 1;
            console.log("Array length = " + arrayLength);
            for (var i = arrayLength; i >= 0; i--) {
            (function (i){
            	if (xhr.response.groups[i].deleted === false) {
					var phr = [];
					phr[i] = new XMLHttpRequest();
					phr[i].open("GET", "https://domain.zendesk.com/api/v2/search.json?query=status%3Csolved%20Group:" + xhr.response.groups[i].name, true);
					phr[i].responseType = "json";
					phr[i].onreadystatechange = function () {
					    if (phr[i].readyState == 4 && phr[i].status == 200) {
					            numTickets = phr[i].response.count;
					            console.log("Group ID: " + xhr.response.groups[i].id + "\n" + "Group Name: " + xhr.response.groups[i].name + "\n" + "Count = " + numTickets);
					    }
					};
					phr[i].send(null);
				}
            })(i);
            }
        }
    }
};