/* global $ */
var url = 'https://allorigins.me/get?url=' + encodeURIComponent('https://success.spidergap.com/partners.json?inf_contact_key=d7b88659da63c312946ea685f6c8103fa07ddec7662e571bfbbfcf0a9ec9b22f') + '&callback=?';

$(document).ready(function(){
  $.ajax({
    method: "GET",
    url: url,
    crossDomain: true,
    dataType: 'jsonp'
  })
  .done(function(data){
     var obj = JSON.parse(data.contents);
    addInvities(obj);
});
});

function addInvities(invities){
    //filter invities on basis of distance
    var lat = 51.515419;
    var lon = -0.141099;
    var finalArr = []
    var eligible = invities.filter(function(x){
        var array = x.offices.filter(function(y){
            
        var arr= y.coordinates.split(",").map(Number);
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(arr[0]-lat);  // deg2rad below
        var dLon = deg2rad(arr[1]-lon);
        var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat)) * Math.cos(deg2rad(arr[0])) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        if(d <= 100){
            var s = {...x, 'offices': {...y, d : d}};
            finalArr.push(s);
            return true;
        }else{
            return false;
        }
    });
    if (array && array.length > 0){return true}
    else{return false}
    })
    
    finalArr.sort(function(a,b){
        return a.offices.d - b.offices.d
    });
    //add invities to page here
    finalArr.forEach(function(invite){
    addInvite(invite);
  });
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

function addInvite(invite){
  var newInvite = $('<li class="task"><h2>'+invite.urlName + '</h2> partner who has office in <h3>' + invite.offices.location + '</h3> and address "'+ invite.offices.address + '" are invited.</li>');
  $('.list').append(newInvite);
}