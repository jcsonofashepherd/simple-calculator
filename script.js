$(document).ready(function() {
  
  //  Variables that represent global and local equations, as well as possible actions
  let gTotStr = '',
      gNumStr = '',  
      op = false,      //  Determines when operators can be pressed 
      dec = true,      //  Determines when decimals can be pressed 
      reset = false;   //  Determines if a numerical press after evaluation resets app
  
  //  Operations
  const plus = (one, two) => one + two;
  const minus = (one, two) => one - two;
  const multiply = (one, two) => one * two;
  const divide = (one, two) => one / two;
   
  //  Adding numbers to global equation
  $('.num').on('click', function() {
    if (reset) {
      gNumStr = '';
      gTotStr = '';
      reset = false;
    }
    if (gTotStr == '0') {
      gNumStr = '';
      gTotStr = '';
    }
    gNumStr += $(this).text();
    gTotStr += $(this).text();
    $('h5').text(gNumStr);
    $('h1').text(gTotStr.slice(0, 9));
    op = true;
  })
  
  //  Adding operations to global equation
  $('.op').on('click', function() {
    if (op) {
      $('h5').text($(this).text());
      gTotStr += ' ' + $(this).text() + ' ';
      $('h1').text(gTotStr.slice(0, 9));
      gNumStr = '';
      op = false;
      dec = true;
      reset = false;
    }
  })
  
  //  Adding decimals to numbers
  $('#Dec').on('click', function() {
    if (dec) {
      if (gNumStr == '') { 
        gNumStr = '0';
        gTotStr += '0';
      }
      gNumStr += ".";
      gTotStr += ".";
      $('h5').text(gNumStr);
      $('h1').text(gTotStr.slice(0,9));
      op = false;
      dec = false;
      reset = false;
    }
  })
  
  //  Evaluating the global equation
  $('#Eql').on('click', function() {
    if (op) {
      let totArr = gTotStr.split(' '),
          result = 0;
      
      while (totArr.length >= 3) {
        if (totArr[1] == '+') result = plus(Number(totArr[0]), Number(totArr[2]));
        if (totArr[1] == '-') result = minus(Number(totArr[0]), Number(totArr[2]));
        if (totArr[1] == 'x') result = multiply(Number(totArr[0]), Number(totArr[2]));
        if (totArr[1] == '/') result = divide(Number(totArr[0]), Number(totArr[2]));
        totArr = totArr.slice(3);
        totArr.unshift(result.toString());
      }
      
      gTotStr = totArr[0];
      gNumStr = totArr[0];
      $('h1').text(gTotStr.slice(0,9));
      $('h5').text($(this).text());
      if (!gTotStr.includes(".")) dec = true;
      reset = true;
    }
  })
  
  //  Clears app
  $('#C').on('click', function() {
    gTotStr = '0';
    gNumStr = '0';
    $('h1').text(gTotStr);
    $('h5').text(gNumStr);
    op = false;
    dec = true;
    reset = false;
  })
})
