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
            console.log(response)
        }
    })
});
