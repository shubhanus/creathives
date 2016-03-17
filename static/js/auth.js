/**
 * Created by shugar on 10/3/16.
 */

$('#login-btn').on('click', function(e){
    e.preventDefault();
//    console.log("1");
    var data = {
        'email' : $('#e-mail').val(),
        'password' : $('#pwd').val()
    };

    console.log(data);


    $.ajax({
        url : 'http://creathives.com/accounts/login/',
        'method': 'post',
        'data' : JSON.stringify(data),
        'dataType': "json",
        'success': function(response) {
            //localStorage.setItem('token', response);
            //var win = '//' + window.location.hostname + '/index/home/';
            //window.location = win;
            window.location = '/index/home/';
            //$('#user-login').fadeOut();
            //$('.body-overlay').fadeOut();
            //$('body').css('overflow', 'scroll');
            //console.log(win);
        }
    }).error(function(r){console.log(r)})
});

$(function(){
   var login_win = $('#user-login');
    $.ajaxSetup({
       headers: {'X-CSRFToken': getCookie("csrftoken")}
   });

    login_win.fadeIn();
    $('.body-overlay').fadeIn();
    login_win.css('height', '550px');
    login_win.css('top', '100px');
    login_win.css('width', '1000px');

});


function getCookie(c_name)
  {
      if (document.cookie.length > 0)
      {
          c_start = document.cookie.indexOf(c_name + "=");
          if (c_start != -1)
          {
              c_start = c_start + c_name.length + 1;
              c_end = document.cookie.indexOf(";", c_start);
              if (c_end == -1) c_end = document.cookie.length;
              return unescape(document.cookie.substring(c_start,c_end));
          }
      }
      return "";
  }