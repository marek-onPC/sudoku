"use strict";

$(document).ready(function($) {
    
    var sudoku;
    //4 sets of sudoku table are predefined
    $('#set1').click(function(){
        //After clicking on button #set<no>, sudoku table is prepared
      sudoku=[[[1,2,3],[4,5,7],[6,8,9]],[[4,5,6],[1,8,9],[2,3,7]],[[7,8,9],[2,3,6],[1,4,5]],[[8,1,5],[2,7,4],[3,9,6]],[[3,6,2],[8,9,1],[5,7,4]],[[9,7,4],[6,5,3],[8,1,2]],[[0,4,0],[7,6,1],[9,3,8]],[[6,1,8],[0,4,0],[7,2,5]],[[3,9,7],[5,2,8],[0,6,0]]];
      $('.choose-box').fadeOut();
      $('.win-bg').fadeOut();
      //Execute "sudo_key" function, this function is making a duplicate of initial table, and based on this, selected sudoku squares are not-active
      sudo_key(sudoku, key);

      //Execute "sudo_key" function, this function is sending table on the users screen
      sudo_screen(sudoku, key);
    });
    $('#set2').click(function(){
      sudoku=[[[4,7,0],[0,2,0],[0,0,0]],[[9,0,1],[3,0,0],[0,0,0]],[[6,0,5],[0,8,4],[0,0,1]],[[0,1,4],[6,0,0],[0,3,0]],[[7,0,8],[2,0,3],[6,0,5]],[[0,5,0],[0,0,9],[8,1,0]],[[8,0,0],[5,9,0],[7,0,1]],[[0,0,0],[0,0,4],[5,0,2]],[[0,0,0],[0,2,0],[0,9,8]]];
      $('.choose-box').fadeOut();
      $('.win-bg').fadeOut();
      sudo_key(sudoku, key);
      sudo_screen(sudoku, key);
    });
    $('#set3').click(function(){
      sudoku=[[[2,0,5],[4,0,0],[0,0,0]],[[0,0,7],[9,6,0],[0,8,0]],[[0,0,6],[0,2,0],[0,4,5]],[[9,8,0],[5,7,0],[0,0,0]],[[0,7,4],[8,0,2],[6,3,0]],[[0,0,0],[0,6,9],[0,5,7]],[[7,5,0],[0,6,0],[3,0,0]],[[0,2,0],[0,5,1],[4,0,0]],[[0,0,0],[0,0,2],[5,0,8]]];
      $('.choose-box').fadeOut();
      $('.win-bg').fadeOut();
      sudo_key(sudoku, key);
      sudo_screen(sudoku, key);
    });
    $('#set4').click(function(){
      sudoku=[[[0,6,0],[0,0,4],[8,7,1]],[[0,0,5],[0,9,6],[3,0,2]],[[7,0,2],[0,1,0],[0,0,0]],[[5,0,0],[0,3,0],[0,0,7]],[[0,7,1],[0,5,0],[8,2,0]],[[3,0,0],[0,7,0],[0,0,5]],[[0,0,0],[0,8,0],[7,0,6]],[[5,0,9],[2,6,0],[4,0,0]],[[6,8,7],[1,0,0],[0,2,0]]];
      $('.choose-box').fadeOut();
      $('.win-bg').fadeOut();
      sudo_key(sudoku, key);
      sudo_screen(sudoku, key);
    });

    //Define initial variables for sudoku table, key table
    var sudoku=[[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]]];
    var key=[[[4,7,0],[0,2,0],[0,0,0]],[[9,0,1],[3,0,0],[0,0,0]],[[6,0,5],[0,8,4],[0,0,1]],[[0,1,3],[6,0,0],[0,3,0]],[[7,0,8],[2,0,3],[6,0,5]],[[0,5,0],[0,0,9],[8,1,0]],[[8,0,0],[5,9,0],[7,0,1]],[[0,0,0],[0,0,4],[5,0,2]],[[0,0,0],[0,2,0],[0,9,8]]];
    //Define initial iteration variables for sudoku checking algorithm
    var i, w, k, ist, wst, kst, ch, new_no;
    var sudoku_selected = 0;
    var ca=[0,0,0,0];
    var status_win;
    var kontrola=0;

    //Preparing a not-changeable table, buttons with initial values are not-active
    function sudo_key(sudoku, key)
    {
        for (i = 0; i < 9; i++){
            for (w = 0; w < 3; w++){
                for (k = 0; k < 3; k++){
                    if (sudoku[i][w][k] == 0)
                    {
                        key[i][w][k]="O";
                    }
                    else
                    {
                        key[i][w][k]="B";
                    }
                }
            }
        }
        return key;
    }
    sudo_key(sudoku, key);

    //Putting table on users screen
    function sudo_screen(sudoku, key)
    {
        for (i = 0; i < 9; i++){
            for (w = 0; w < 3; w++){
                for (k = 0; k < 3; k++){
                    var name = '.S'+i+w+k;
                    console.log(name);
                    if (sudoku[i][w][k] == '0')
                    {
                      $(name).html('');
                    }
                    else $(name).html(sudoku[i][w][k]);
                    if (key[i][w][k] == 'B')
                    {
                      $(name).css("background-color", "#0C385E");
                    }
                }
            }
        }
    }
    sudo_screen(sudoku, key);

    //CHECKER - checking if selected number is valid (according to sudoku rules)

    //Checking same no. in section
    function checker1(sudoku, ist, wst, kst, ch)
    {
      var c = 0;
      for (w = 0; w < 3; w++){
        for (k = 0; k < 3; k++){
          if (c==0 || c==1){
            if (sudoku[ist][wst][kst] == sudoku[ist][w][k]){
              c++;
            }
            else{
              continue
            }
          }
          else{
            break
          }
          
        }
      }
      if (c == 0 || c == 1){
        ch = "True";
        return ch;
      }
      else if (c > 1){
        ch = "False";
        return ch;
      }
    };

    //Checking same no. in row
    function checker2(sudoku, ist, wst, kst, ch){
      var c = 0;
      if (ch == "True"){
        if (ist == 0 || ist == 1 || ist == 2){
          for (i = 0; i < 3; i++){
            for (k = 0; k < 3; k++){
              if (c == 0 || c == 1){
                if (sudoku[ist][wst][kst] == sudoku[i][wst][k]){
                  c++;
                }
                else{
                  continue;
                }
              }
          else{
            break;
                }
              }
            }
          }
        
        else if (ist == 3 || ist == 4 || ist == 5){
          for (i = 0; i < 3; i++){
            for (k = 0; k < 3; k++){
              if (c == 0 || c == 1){
                if (sudoku[ist][wst][kst] == sudoku[i+3][wst][k]){
                  c++;
                }
                else{
                  continue;
                }
              }
          else{
            break;
                }
              }
            }
          }
          else if (ist == 6 || ist == 7 || ist == 8){
            for (i = 0; i < 3; i++){
              for (k = 0; k < 3; k++){
                if (c == 0 || c == 1){
                  if (sudoku[ist][wst][kst] == sudoku[i+6][wst][k]){
                    c++;
                  }
                  else{
                    continue;
                  }
                }
            else{
              break;
                  }
                }
              }
            }
        }
      if (c == 0 || c == 1){
        ch = "True";
        return ch;
      }

      if (c > 1 ){
        ch="False";
        return ch;
      }
    }

    //Checking same no. in column
    function checker3(sudoku, ist, wst, kst, ch){
      var c = 0;
      if (ch == "True"){
        if (ist == 0 || ist == 3 || ist == 6){
          var it = 0;
          for (i = 0; i < 3; i++){
            for (w = 0; w < 3; w++){
              if (c == 0 || c == 1){
                if (sudoku[ist][wst][kst] == sudoku[it][w][kst]){
                  c++;
                }
                else{
                  continue;
                }
              }
          else{
            break;
                }
              }
              it = it + 3;
            }
          }
        
        else if (ist == 1 || ist == 4 || ist == 7){
          var it = 1;
          for (i = 0; i < 3; i++){
            for (w = 0; w < 3; w++){
              if (c == 0 || c == 1){
                if (sudoku[ist][wst][kst] == sudoku[it][w][kst]){
                  c++;
                }
                else{
                  continue;
                }
              }
          else{
            break;
                }
              }
              it = it + 3;

            }
          }

          else if (ist == 2 || ist == 5 || ist == 8){
            var it = 2;
            for (i = 0; i < 3; i++){
              for (w = 0; w < 3; w++){
                if (c == 0 || c == 1){
                  if (sudoku[ist][wst][kst] == sudoku[it][w][kst]){
                    c++;
                  }
                  else{
                    continue;
                  }
                }
            else{
              break;
                  }
                }
                it = it + 3;

              }
            }
        }
      if (c == 0 || c == 1){
        ch = "True";
        return ch;
      }

      if (c > 1 ){
        ch="False";
        return ch;
      }
    }

    //Checking the "win" rule
    function win_check(sudoku){
      var ch_win = 0;
      for (i = 0; i < 9; i++){
        for (w = 0; w < 3; w++){
            for (k = 0; k < 3; k++){
              if (sudoku[i][w][k] == 0)
              {
                ch_win++;
              }

              }

            }
          }
          if (ch_win == 0){
            return "WIN";}
          else{
            return "not yet";}
          }

    //Inserting no. into table with starting a checking algorithm, if number is correct and algorith is done, number can be inserted into table
    function sudo_put(sudoku, key, ca, new_no)
    {
      if (key[ca[1]][ca[2]][ca[3]]=="O"){
        var sud_save=sudoku[ca[1]][ca[2]][ca[3]];
        sudoku[ca[1]][ca[2]][ca[3]]=new_no;
        var ch_print = 0;
        var ch = "True";
        ch = checker1(sudoku, ca[1], ca[2], ca[3], ch);
        if (ch == "True"){
          ch = checker2(sudoku, ca[1], ca[2], ca[3], ch);
  
        }
        else{
          ch_print=1;
          sudoku[ca[1]][ca[2]][ca[3]] = sud_save;
        }
        if (ch == "True"){
          ch = checker3(sudoku, ca[1], ca[2], ca[3], ch);
          console.log("checker3"+ch+ch_print);
        }
        else{
          ch_print=2;
          sudoku[ca[1]][ca[2]][ca[3]] = sud_save;
        }
        if (ch == "True"){
          console.log("allgood");
        }
        else{
          ch_print=3;
          sudoku[ca[1]][ca[2]][ca[3]] = sud_save;
          $('.popup').fadeIn(200).delay(1000).fadeOut(200);
          
          //Cursor position spy function
          $(document).mousemove(function(e){
            $(".popup").css({left:e.pageX, top:e.pageY});
        });
        }
        
      }
      return ch_print;
    }

    //Function for checking the selected cell for inserting a "zero" which user see like cleaning the cell from any value
    function sudo_put_zero(sudoku, key, ca, new_no)
    {
      if (key[ca[1]][ca[2]][ca[3]]=="O"){
        sudoku[ca[1]][ca[2]][ca[3]]=new_no;
      }
      return 0;
    }

    //Checking if the sudoku cell is not a initial value
    function check_key(key, ca){
      if (key[ca[1]][ca[2]][ca[3]]=="B")
      {
        return true;
      }
      else
      {
        return false;
      }
    }

    //Getting class name (during click)
    $(".container").click(function(event) {
        sudoku_selected = $(event.target).attr('class');
        ca = Array.from(sudoku_selected)
        console.log(sudoku_selected);
        
        if (check_key(key, ca) == false)
        {
          $('.modal-bg').fadeIn(200);
          $('.modal-box').fadeIn(200);
        }

      });
        $('#no1').click(function(){
            new_no = 1;
            var check = sudo_put(sudoku, key, ca, new_no);
            status_win = win_check(sudoku);
            console.log(status_win);
            $('.modal-bg').fadeOut();
            $('.modal-box').fadeOut();
            if (check == 0)
            {
              $('.'+sudoku_selected).html(new_no);
            }
            if (status_win == "WIN"){
              $('.win-box').fadeIn();
              $('.win-bg').fadeIn();
            };
          });
        
          $('#no2').click(function(){
            new_no = 2;
            var check = sudo_put(sudoku, key, ca, new_no);
            status_win = win_check(sudoku);
            console.log(status_win);
            $('.modal-bg').fadeOut();
            $('.modal-box').fadeOut();
            if (check == 0)
            {
              $('.'+sudoku_selected).html(new_no);
            }
            if (status_win == "WIN"){
              $('.win-box').fadeIn();
              $('.win-bg').fadeIn();
            };
          });
          
          $('#no3').click(function(){
            new_no = 3;
            var check = sudo_put(sudoku, key, ca, new_no);
            status_win = win_check(sudoku);
            console.log(status_win);
            $('.modal-bg').fadeOut();
            $('.modal-box').fadeOut();
            if (check == 0)
            {
              $('.'+sudoku_selected).html(new_no);
            }
            if (status_win == "WIN"){
              $('.win-box').fadeIn();
              $('.win-bg').fadeIn();
            };
          });
        
          $('#no4').click(function(){
            new_no = 4;
            var check = sudo_put(sudoku, key, ca, new_no);
            status_win = win_check(sudoku);
            console.log(status_win);
            $('.modal-bg').fadeOut();
            $('.modal-box').fadeOut();
            if (check == 0)
            {
              $('.'+sudoku_selected).html(new_no);
            }
            if (status_win == "WIN"){
              $('.win-box').fadeIn();
              $('.win-bg').fadeIn();
            };
          });
        
          $('#no5').click(function(){
            new_no = 5;
            var check = sudo_put(sudoku, key, ca, new_no);
            status_win = win_check(sudoku);
            console.log(status_win);
            $('.modal-bg').fadeOut();
            $('.modal-box').fadeOut();
            if (check == 0)
            {
              $('.'+sudoku_selected).html(new_no);
            }
            if (status_win == "WIN"){
              $('.win-box').fadeIn();
              $('.win-bg').fadeIn();
            };
          });
        
          $('#no6').click(function(){
            new_no = 6;
            var check = sudo_put(sudoku, key, ca, new_no);
            status_win = win_check(sudoku);
            console.log(status_win);
            $('.modal-bg').fadeOut();
            $('.modal-box').fadeOut();
            if (check == 0)
            {
              $('.'+sudoku_selected).html(new_no);
            }
            if (status_win == "WIN"){
              $('.win-box').fadeIn();
              $('.win-bg').fadeIn();
            };
          });
        
          $('#no7').click(function(){
            new_no = 7;
            var check = sudo_put(sudoku, key, ca, new_no);
            status_win = win_check(sudoku);
            console.log(status_win);
            $('.modal-bg').fadeOut();
            $('.modal-box').fadeOut();
            if (check == 0)
            {
              $('.'+sudoku_selected).html(new_no);
            }
            if (status_win == "WIN"){
              $('.win-box').fadeIn();
              $('.win-bg').fadeIn();
            };
          });
        
          $('#no8').click(function(){
            new_no = 8;
            var check = sudo_put(sudoku, key, ca, new_no);
            status_win = win_check(sudoku);
            console.log(status_win);
            $('.modal-bg').fadeOut();
            $('.modal-box').fadeOut();
            if (check == 0)
            {
              $('.'+sudoku_selected).html(new_no);
            }
            if (status_win == "WIN"){
              $('.win-box').fadeIn();
              $('.win-bg').fadeIn();
            };
          });
        
          $('#no9').click(function(){
            new_no = 9;
            var check = sudo_put(sudoku, key, ca, new_no);
            status_win = win_check(sudoku);
            console.log(status_win);
            $('.modal-bg').fadeOut();
            $('.modal-box').fadeOut();
            if (check == 0)
            {
              $('.'+sudoku_selected).html(new_no);
            }
            if (status_win == "WIN"){
              $('.win-box').fadeIn();
              $('.win-bg').fadeIn();
            };
          });
        
          $('#zero').click(function(){
            new_no = 0;
            var check = sudo_put_zero(sudoku, key, ca, new_no);
            $('.modal-bg').fadeOut();
            $('.modal-box').fadeOut();
            if (check == 0)
            {
              $('.'+sudoku_selected).html('');
            }
          });
    

  $('.S0').click(function(){
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate
    $(".modal-box").css({top: (y), left: (x), position:'absolute'});
  });
  $('.S1').click(function(){
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate
    $(".modal-box").css({top: (y), left: (x-120), position:'absolute'});
  });
  $('.S2').click(function(){
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate
    $(".modal-box").css({top: (y), left: (x-240), position:'absolute'});
  });
  $('.S3').click(function(){
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate
    $(".modal-box").css({top: (y-140), left: (x), position:'absolute'});
  });
  $('.S4').click(function(){
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate
    $(".modal-box").css({top: (y-140), left: (x-120), position:'absolute'});
  });
  $('.S5').click(function(){
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate
    $(".modal-box").css({top: (y-140), left: (x-240), position:'absolute'});
  });
  $('.S6').click(function(){
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate
    $(".modal-box").css({top: (y-280), left: (x), position:'absolute'});
  });
  $('.S7').click(function(){
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate
    $(".modal-box").css({top: (y-280), left: (x-120), position:'absolute'});
  });
  $('.S8').click(function(){
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate
    $(".modal-box").css({top: (y-280), left: (x-240), position:'absolute'});
  });

  $('.button, .reset').click(function(){
    window.location.reload(false);
  });

  $('.info').click(function(){
    $('.info-box, .info-bg').fadeIn(250);
  });

  //modal window close when click on bg
  $('.modal-bg').click(function(e)
  {
    if (e.target !== this)
      return;
    $('.modal-box').fadeOut();
    $('.modal-bg').fadeOut();
  });

  $('.info-bg').click(function(e)
  {
    if (e.target !== this)
      return;
    $('.info-box').fadeOut();
    $('.info-bg').fadeOut();
  });


});