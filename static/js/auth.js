/**
 * Created by shugar on 10/3/16.
 */
$('#login').on('click', function(e){
    e.preventDefault();
    var data = {
        'user' : $('#uname').val(),
        'password' : $('#pwd').val()
    };

    console.log(data);

    $.ajax({
        url : 'http://creathives.com/accounts/login/',
        'method': 'post',
        'data' : JSON.stringify(data),
        'dataType': "json",
        'success': function(response) {
            localStorage.setItem('token', response);
            $('#user-login').fadeOut();
	        $('.body-overlay').fadeOut();
	        $('body').css('overflow', 'scroll');
        }
    }).error(function(r){console.log(r)})
});

$(function(){
   $.ajaxSetup({
       headers: {'X-CSRFToken': getCookie("csrftoken")}
   });
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