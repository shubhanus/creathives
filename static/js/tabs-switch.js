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
    $('.nav-categories li, .header-midMenu a').on('click', function(e){
        e.preventDefault();
        $('.nav-categories .active').removeClass('active');
        $('.header-midMenu .active').removeClass('active');
        var className = $(this).attr('class');
        $('.' + className).addClass('active');
        console.log(className)
        if(className == 'proj-all')
            $('.project_lists .pl_thumbHolder').removeClass('hide');
        else {
                $('.project_lists .pl_thumbHolder').addClass('hide');
                if (className == 'proj-videos')
                    $('.project_lists .pl_thumbHolder').filter("[data-type='videos']").removeClass('hide');
                if (className == 'proj-images')
                    $('.project_lists .pl_thumbHolder').filter("[data-type='images']").removeClass('hide');
                if (className == 'proj-tracks')
                    $('.project_lists .pl_thumbHolder').filter("[data-type='tracks']").removeClass('hide');
                if (className == 'proj-articles')
                    $('.project_lists .pl_thumbHolder').filter("[data-type='articles']").removeClass('hide');
            }
        // var proj_data = $(this).attr('id');
    });
});



