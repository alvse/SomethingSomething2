// a key map of allowed keys
var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
  };
  
  // the 'official' Konami Code sequence
  var konamiCode = ['left', 'right', 'left', 'right', 'b', 'a'];
  
  // a variable to remember the 'position' the user has reached so far.
  var konamiCodePosition = 0;
  
  // add keydown event listener
  document.addEventListener('keydown', function(e) {
    // get the value of the key code from the key map
    var key = allowedKeys[e.keyCode];
    // get the value of the required key from the konami code
    var requiredKey = konamiCode[konamiCodePosition];
  
    // compare the key with the required key
    if (key == requiredKey) {
  
      // move to the next key in the konami code sequence
      konamiCodePosition++;
  
      // if the last key is reached, activate cheats
      if (konamiCodePosition == konamiCode.length) {
        activateCheats();
        konamiCodePosition = 0;
      }
    } else {
      konamiCodePosition = 0;
    }
  });
  
  function activateCheats() {
    var audio = new Audio('/../images/moto.mp3');
    audio.play();

    document.getElementById("Konamicontainer").style.display='block';
    document.getElementsByClassName("element")[0].className = "element slide-in";
    //document.getElementById("Konamicontainer").style.display='none';
    $('#Konamicontainer').delay(6000).fadeOut(300);
  }







function addUser(){
            
    window.location.href = '/caseReport/add';
}

function cancelAdd(){
    
    window.location.href = '/caseReport';
}

function gotoReport(reportName){
    window.location.href = '/reportsList/?reportName=' + reportName;
}

function openReport(reportURL){
    window.open(reportURL,'_blank').focus();
}

function sortThis() {
    $('th').each(function (col) {
        $(this).click(function () {
            if ($(this).is('.asc')) {
                $(this).removeClass('asc');
                $(this).addClass('desc selected');
                sortOrder = -1;
            } else {
                $(this).addClass('asc selected');
                $(this).removeClass('desc');
                sortOrder = 1;
            }
            $(this).siblings().removeClass('asc selected');
            $(this).siblings().removeClass('desc selected');
            var arrData = $('#dataTable').find('tbody >tr:has(td)').get();
            arrData.sort(function (a, b) {
                var val1 = $(a).children('td').eq(col).text().toUpperCase();
                var val2 = $(b).children('td').eq(col).text().toUpperCase();
                if ($.isNumeric(val1) && $.isNumeric(val2))
                    return sortOrder == 1 ? val1 - val2 : val2 - val1;
                else
                    return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
            });
            $.each(arrData, function (index, row) {
                $('#dataTable').append(row);
            });
        });
    });
    
}

function filterReport() {
    $("#dataTableSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#reportContent tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1 )
        })
    })
}