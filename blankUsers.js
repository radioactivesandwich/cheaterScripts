function blankUsers (number) {
var arrayLength;
var ids = [];
var url = "https://domain.zendesk.com/api/v2/search.json?page=" + number + "&query=type%3Auser+role%3Aagent";
var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);

xhr.responseType = "json";
xhr.send(null);

xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {

            if (xhr.response.next_page === null) {
            arrayLength = xhr.response.results.length - 1;
            console.log("Next Page = " + xhr.response.next_page);
            for (var i = arrayLength; i >= 0; i--) {
            (function (i){
            	if (xhr.response.results[i].email === null && xhr.response.results[i].phone === null) {
					console.log("Name: " + xhr.response.results[i].name + "\n" + "Id: " + xhr.response.results[i].id);
				}
            })(i);
            }
            console.log("Done!");
            } else {
                arrayLength = xhr.response.results.length - 1;
            console.log("Next Page = " + xhr.response.next_page);
            for (var i = arrayLength; i >= 0; i--) {
            (function (i){
            	if (xhr.response.results[i].email === null && xhr.response.results[i].phone === null) {
					console.log("Name: " + xhr.response.results[i].name + "\n" + "Id: " + xhr.response.results[i].id);
				}
            })(i);
            }
                return blankUsers(number + 1);
            }

        }
    }
};
}
