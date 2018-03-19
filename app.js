$(document).ready(function(){

  function makeGrid(row, cell) {

    const width = $('#input-width').val();
    const height = $('#input-height').val();
    const table = $('#grid');

    table.empty();   //clear table

    for (let row = 1; row <= height; row++) {
      table.append('<tr></tr>');
      for (let cell = 1; cell <= width; cell++) {
        table.children().last().append('<td></td>');
      }
    }
    $('td').addClass('border');
  }

  $('#submit').click(function(event) {
    event.preventDefault();
    makeGrid();
  });

  $('#draw-image').on('click', function() {
    //COLOR SINGLE CELL

      $('#grid').on('mousedown', 'td', 'tr', function(event) {
          let color = $('#color-input').val();   //select color
          event.preventDefault();
          $(this).css('background-color', color);

        //COLOR MULTIPLY CELLS

        $('#grid').on('mouseenter', 'td', 'tr', function(event){
          event.preventDefault();
           let color = $('#color-input').val();   //select color
           $(event.target).css('background-color', color);
              $('body').on('mouseup', function() {
                 $('#grid').off('mouseenter');
              });
        });
     });
  });

  //FILL CANVAS WITH SELECTED COLOR

  $('#fill-bucket').on('click', function(event) {
    let color = $('#color-input').val();   //select color
    event.preventDefault();
    $('td').css('background-color', color);
  });


  //HIDE / SHOW GRID

  $('#hide-grid').on('click', function() {
    $('td').toggleClass('border');
  })

  // CLEAR CANVAS

  $('#clear-canvas').on('click', function() {
    $('td').css('background-color', '#fff');
  })

  //CLEAR MULTIPLY CELLS

  $('#eraser').on('click', function() {
    //CLEAR SINGLE CELL

      $('#grid').on('mousedown', 'td', function(event) {
          $(this).css('background-color', '#fff');


        //CLEAR MULTIPLY CELLS

        $('#grid').on('mouseenter', 'td', function(event){
          event.preventDefault();
           $(event.target).css('background-color', '#fff');
              $('#grid').on('mouseup mouseleave', function(event) {
                 $('#grid').off('mouseenter');
              });

        });

     });
  });

  //SAVE TABLE AS IMAGE png

   $('#save').on('click', function() {
     html2canvas(document.querySelector('table')).then(canvas => {
       document.querySelector('.workarea').append(canvas);

       // save canvas image as data url (png format by default)
       const img = canvas.toDataURL();

       function saveAs(uri, filename) {
         const link = document.createElement('a');
         if (typeof link.download === 'string') {
           document.body.appendChild(link); // Firefox requires the link to be in the body
           link.download = filename;
           link.href = uri;
           link.click();
           document.body.removeChild(link); // remove the link when done
         } else {
           location.replace(uri);
         }
       }
       const uri = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
       //window.open(url);
       saveAs(uri, 'pixel-art-image.png');
     });
   });


  //SELECT CELL SIZE

  $('#small-grid').on('click', function() {
    $('td').css({'width': '10px', 'height': '10px'})
  });
  $('#medium-grid').on('click', function() {
    $('td').css({'width': '15px', 'height': '15px'})
  });
  $('#large-grid').on('click', function() {
    $('td').css({'width': '20px', 'height': '20px'})
  });

  // PRINTING CANVAS

  function printCanvas() {
    html2canvas(document.querySelector('table')).then(canvas => {
      document.querySelector('.workarea').append(canvas);
      $('canvas').attr('id', 'printable')

      var dataUrl = document.querySelector('#printable').toDataURL(); //attempt to save base64 string to server using this var
      var windowContent = '<!DOCTYPE html>';
      windowContent += '<html>'
      windowContent += '<head><title>Print canvas</title></head>';
      windowContent += '<body>'
      windowContent += '<img src="' + dataUrl + '">';
      windowContent += '</body>';
      windowContent += '</html>';
      var printWin = window.open('','','width=340,height=260');
      printWin.document.open();
      printWin.document.write(windowContent);
      printWin.document.close();
      printWin.focus();
      printWin.print();
      printWin.close();
    });
  };
   $('#print').on('click', function() {
     printCanvas();
   });

   // EYEDROPPER TOOL TO DO

   function processSettings() {
		// diplay settings
		$("#grid").css('background-color', localStorage.setItem('background-color'));
		// // tools setup
		setTool(parseInt(localStorage.getItem("#color-input")));
		// color picker setup
		$('#color-input').val( localStorage.getItem('#color-input'));
		// $('#color-input').trigger( "change" );

}

//Invert colors TO DO
$("#invert").on("click", function() {
  tdlist.each(function() {
    let tdcolor = $(this).css("background-color");
    let parts = tdcolor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete parts[0];
    let newr = 255 - parts[1];
    let newg = 255 - parts[2];
    let newb = 255 - parts[3];
    let tdnewcolor = "rgb(" + newr + "," + newg + "," + newb + ")";
    $(this).css("background-color", tdnewcolor);
  });
});

// ADD ROW

  $('#insert_row').on('click', function(event) {
    event.preventDefault();
    const table = $('#grid');
    $("tr").last().clone().appendTo(table);
      $("tr:last-child td").css("background-color", "#fff");
  });

  // ADD column

  $('#insert_column').on('click', function(event) {
    event.preventDefault();
    const table = $('#grid');
    $("td").last().clone().appendTo("tr");
      $("td:last-child").css("background-color", "#fff");
  });

  // DETECT MOUSE POSITION


  // HIDE / SHOW MAIN NAVIGATION

  $('.x-sign').click(function() {
    $('.main-nav').css('display', 'none');
    $('.x-sign').css('display', 'none');
    $('.arrow-right').css('display', 'block');
    $('.workarea').css('width', '100%');
  });
  $('.arrow-right').click(function() {
    $('.main-nav').css('display', 'block');
    $('.x-sign').css('display', 'block');
    $('.arrow-right').css('display', 'none');
    $('.workarea').css('width', '80%');
  });

  // SHOW DROPDOWN MENU CONTENT

  $('#grid-size-dropdown').on('click', function() { // SHOW / HIDE GRID SIZE DROPDOWN
    $('#grid-size-dropdown-content').toggleClass('show');
  });

  $('#brush-size').on('click', function() {
    $('#input-brush').toggleClass('show');
  });

  // OPEN MODAL

  // Get the modal
  const modal = document.getElementById('help-modal');

  // Get the button that opens the modal
  const btn = document.getElementById('help');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
      modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  };

});
