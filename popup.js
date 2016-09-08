
var serverurl = 'http://arabictest.herokuapp.com/morphology?json=true';

function onPageDetailsReceived(details) {
  //Get the moropholgy for this 
  console.log(details.summary);
  $.ajax({
    type: 'GET',
    url: serverurl+'&txt='+ encodeURIComponent(details.summary),
    crossDomain: true,
    dataType: 'json',
    success: function(result, textStatus, jqXHR) {
        var morph = "";
        console.log("go the result ....");
        $.each(result, function(x, obj) {
	   if (obj.meaning.length > 0) {
		morph += '<a href="http://corpus.quran.com/wordbyword.jsp">Quran corpus</a>';
		morph += "<table><tr><th>Word</th><th>root</th><th>meaning</th><th>Morphological Analysis</th></tr>";
		morph += "<tr><td><p>" + details.summary + "</p></td>";
		morph += "<td><p>" + obj.root +   "</p></td>"; 
		morph += "<td><p>" + obj.meaning +   "</p></td>"; 
		morph += obj.morphology2;
		morph += '<tr><td><h4 class="ar1">example</h4><p>' + obj.example +   "</p></td></tr></table>"; 
	   }
           if(obj.morphology1.length > 0){
             morph += '<a href="http://www.lexanalysis.com/araflex/araflex.html">Araflex</a>';
             morph += "<table><tr><th>Nr</th><th>Query</th><th>Base</th><th>Root</th><th>Morphological Analysis</th>";
             morph += "</tr>" + obj.morphology1 + "</table>" ;
           }
         });
        console.log(morph);
	document.getElementById('output').innerHTML = morph;
    },
    error: function (responseData, textStatus, errorThrown) {
        //alert(errorThrown);
	document.getElementById('output').innerText = errorThrown;
        console.log(errorThrown);
    }
  });
}
// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});
