/**
 * Created by shugar on 10/3/16.
 */

$(function(){
    $.ajaxSetup({
        headers: {'X-CSRFToken': getCookie("csrftoken")}
    });

    $('#register').validate({
        rules: {
            email:   {
                required: true,
                email:  true,
                remote:{
                    'method': 'POST',
                    'url': 'http://creathives.com/accounts/checkExist/',
                    'data': {
                        email:function()
                        {
                            return $('.left-form :input[type="email"]').val()
                        }
                    }
                }
            },
            password: {
                required: true,
                minlength: 4
            },
            cpassword: {
                required: true,
                equalTo: "#password"
            },
            contact: {
                required: true,
                minlength: 10,
                maxlength: 11,
                number: true
            }
        },
        messages:{
            password: {
                required:      "Please Enter Password",
                minlength:    "Minimum 4 Character Required"
            },
            cpassword:{
                required:   "Please Confirm Password",
                equalTo: "Password Not Matched"
            },
            contact:{
                required:   "Please Enter Mobile Number",
                minlength: "Number Should Not less then 10 Digits",
                maxlength: "Number Should Not Exceed 11 Digits",
                number: "Only Digits Allowed"
            },
            email:{
                required:   "Please Enter Email",
                email:  "Please Enter Valid Email",
                remote: "Email Already Registered"
            }
        },
        submitHandler: function() {
            var data = {
                'email': $('.left-form :input[type="email"]').val(),
                'password': $('.left-form :input[type="password"]').first().val(),
                'contact_number': $('.left-form :input[type="text"]').val()
            };
            // console.log(data);
            $.ajax({
                url : 'http://creathives.com/accounts/register/',
                'method': 'post',
                'data' : data,
                'dataType': "json",
                'success': function(response) {
                    if(!(response['status'] == 'success' )) {
                        alert('Please Try Again After Sometime !!!');
                        return
                    }
                    alert('You are now member of CreatHives Family !! Please Login to Continue');
                    $('.left-form :input[type="text"]').val('');
                    $('.left-form :input[type="email"]').val('');
                    $('.left-form :input[type="password"]').val('');
                }
            })
        }
    });

    $('#login').validate({
        rules:{
            email:   {
                required: true,
                email:  true
            },
            password: {
                required: true,
                minlength: 4
            }
        },
        messages:{
            password: {
                required:      "Please Enter Password",
                minlength:    "Minimum 4 Character Required"
            },
            email:{
                required:   "Please Enter Email",
                email:  "Please Enter Valid Email"
            }
        },
        submitHandler: function() {
            var data = {
                'email' : $('.right-form :input[type="email"]').val(),
                'password' : $('.right-form :input[type="password"]').val()
            };
            $.ajax({
                url : 'http://creathives.com/accounts/login/',
                'method': 'post',
                'data' : JSON.stringify(data),
                'dataType': "json",
                'success': function(response) {
                    localStorage.setItem('token', response);
                    window.location = '/index/home/';
                },
                'error': function (res) {
                    // alert(res.responseJSON.message);
                    $('#login-error')
                        .text(res.responseJSON.message)
                        .hide()
                        .fadeIn();
                }
            })
        }
    })
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

