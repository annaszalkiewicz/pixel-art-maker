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

      $('#grid').on('mousedown', 'td', function(event) {
          let color = $('#color-input').val();   //select color
          $(this).css('background-color', color);

        //COLOR MULTIPLY CELLS

        $('#grid').on('mouseenter', 'td', function(event){
          event.preventDefault();
           let color = $('#color-input').val();   //select color
           $(event.target).css('background-color', color);
              $('#grid').on('mouseup mouseleave', function(event) {
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

});
