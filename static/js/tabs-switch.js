/**
 * Created by shugar on 10/3/16.
 */

/*for login module*/
$(function () {
    $('#log').on("click", function(e){
        $('#reg').removeClass('active');
        $('#log').addClass('active');
        $('#dv-log').css('display', 'block');
        $('#dv-reg').hide();

    });
    $('#reg').on("click", function(e){
        $('#log').removeClass('active');
        $('#reg').addClass('active');
        $('#dv-log').hide();
        $('#dv-reg').css('display', 'block');
    });
/*for project list tabs*/
    $('.nav-categories li').click(function(e){
        e.preventDefault();
        $('.nav-categories>li.active').removeClass('active');
        $(this).addClass('active');
        //var proj_data = $(this).attr('id');
    });
});



