/**
 * Created by shugar on 14/3/16.
 */
var new_proj_id=0;

$(function(){
    sticky_relocate();
    $.ajaxSetup({
        headers: {'X-CSRFToken': getCookie("csrftoken")}
    });
    $('.leftPanel ul>li').first().click();

    //get media on scroll
    $(window).scroll(function(e){
        sticky_relocate();
        total = media_count;
        p_id = $('#rightView_content .pH_row').attr('data-p-id');
        // console.log(parseInt($(window).scrollTop()) == parseInt($(document).height() - $(window).height()))
        if(parseInt($(window).scrollTop()) == parseInt(($(document).height() - $(window).height()))) {
            media_from = media_to;
            media_to += 3;
            if (media_to > total) return;
            else {
                getMedia(p_id, media_from, media_to, function (res) {
                    res = JSON.parse(res);
                    total = res.count;
                    data = res.data;
                    append_media(data);
                })
            }
        }

        e.stopPropagation()
    });

});


function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    var targetOffset = $("#anchor-point").offset().top;

    if (window_top > div_top) {
        $('.leftPanel').addClass('stick');
        $('.header-midMenu').removeClass('hide');
        $('.nav-categories').addClass('hide');
    } else {
        $('.leftPanel').removeClass('stick');
        $('.header-midMenu').addClass('hide');
        $('.nav-categories').removeClass('hide');
    }
}
/*------------------------------Ajax helpers------------------------------------------*/

//var ajaxhelper = {
//    ajaximg: function (field) {
//
//    },
//    ajaxdata: function (url,method,data,callback){
//        var ajax_data = {
//            'url':url,
//            'type':method,
//            'contentType':'application/json',
//            'success':function(response){
//                if(typeof callback!='undefined' && response){
//                    callback(response)
//                }
//            },
//            'error':function(response){
//                if(typeof callback!='undefined' && response){
//                    callback(response.responseJSON)
//                }
//            }
//        };
//
//        if(data!=undefined){
//             ajax_data['data'] = JSON.stringify(data)
//        }
//
//        var csrf_token = ajaxhelper.ajaxCookie('csrftoken');
//        //if(csrf_token!=''){
//        //    ajax_data['beforeSend'] = function(xhr, settings) {
//        //        xhr.setRequestHeader("X-CSRFToken", csrf_token);
//        //    }
//        //}
//        $.ajax(ajax_data)
//    },
//    ajaxCookie: function(name){
//        var cookieValue = null;
//        if (document.cookie && document.cookie != '') {
//            var cookies = document.cookie.split(';');
//            for (var i = 0; i < cookies.length; i++) {
//                var cookie = jQuery.trim(cookies[i]);
//                // Does this cookie string begin with the name we want?
//                if (cookie.substring(0, name.length + 1) == (name + '=')) {
//                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                    break;
//                }
//            }
//        }
//        return cookieValue;
//    }
//};

/*------------------------------------------------------------------------------------*/





/*For username and about edit*/


function save_name_about(data) {
    console.log(data);
    var url = 'http://creathives.com/index/home/update_name_about/';
    $.ajax({
        url: url,
        method: 'POST',
        data: JSON.stringify(data),
        'dataType': "json",
        'success': function (res) {
            //data = JSON.parse(res);
            console.log(res);
        }
    }).error(function (r) {
        console.log(r);
    })
}

var $edit_icon = $('#edit-name-about');
var $edit_user_name = $('#user-name');
var $edit_about = $('#about');
var $save_icon =  $('#save-name-about');

$('#profile-name-about')
    .mouseenter(function() {
        $edit_icon.removeClass('hide');
        $edit_icon.click(function(){
            e.preventDefault();
            $save_icon.removeClass('hide');
            $edit_icon.addClass('hide');
            $edit_user_name.attr('contentEditable','true');
            $edit_about.attr('contentEditable','true');
            $edit_user_name.css('border-bottom','1px #ddd dashed');
            $edit_about.css('border-bottom','1px #ddd dashed');
            $edit_icon.hide();
        })
    })
    .mouseleave(function() {
        $edit_icon.addClass('hide');

    });

$save_icon.on('click',function(){
    e.preventDefault();
    $edit_user_name.attr('contentEditable','false');
    $edit_about.attr('contentEditable','false');
    $edit_user_name.css('border','none');
    $edit_about.css('border-bottom','none');
    $edit_icon.addClass('hide');
    $save_icon.addClass('hide');
    var data = {
        'name': $edit_user_name.text().trim(),
        'about': $edit_about.text().trim()
    };
    save_name_about(data);
});

/*contact edit*/

//var $edit_con = $('#edit-contact');
//var $save_con = $('#save-contact');
//var $contact = $('.profile_contactNo .num');
//
//$('.profile_contactNo')
//    .mouseenter(function(){
//        $edit_con.removeClass('hide');
//        $edit_con.click(function(){
//            $save_con.removeClass('hide');
//            $contact.attr('contentEditable','true');
//            $contact.css('border-bottom','1px dashed');
//            $edit_con.hide();
//        })
//    })
//    .mouseleave(function() {
//        $edit_con.addClass('hide');
//    });
//
//$save_con.on('click', function(){
//    $save_con.addClass('hide');
//    $contact.attr('contentEditable','false');
//    $contact.css('border','none');
//    $edit_con.addClass('hide');
//    data = {
//        'contact_no' : $contact.text().trim(),
//    };
//    save_name_about(data);
//});
/*--------------------*/


/*Add project*/

$('#proj-add').click(function(e){
    e.preventDefault();
    new_proj_id = 0
    $('.project-sq a[data-project-id=0]').parent().remove();
    $('.project-sq a[data-project-id=0]').parent().remove();
    $('#proj-add').addClass('hide');
    $('#proj-undo').removeClass('hide');
    $('#rightView_content .pH_row').addClass('hide');
    // $('.leftPanel ul>li').addClass('hide');
    $('.leftPanel ul').find('.active').removeClass('active');
    $('.project_lists>.pl_thumbHolder').remove();
    $('.leftPanel ul>li').find('.active').removeClass('active');
    var count = parseInt($('.lp_title>span').attr('data-count'));
    $('.lp_title>span').attr('data-count', ++count);
    $('.lp_title>span').text(count);
    $('.pH_row-edit .media-object').attr('src', '/static/images/Edit/titleImage.png')
    $('.media-body h4').text('');
    $('.media-body span').text('');
    $('.media-body p').text('');

    /*Left Panel*/

    $('.left-panel-scroll>ul').prepend(
        '<li class="project-sq">' +
            '<a href="#" data-project-id="0">' +
            '<img src="/static/images/Edit/titleImage.png" alt="New Project">' +
            '<span class="hide"></span>' +
            '<div class="overLay"></div>' +
            '<!-- Portfolio Edit -->' +
        '<img src="/static/images/Edit/empty-trash.png" class="emptyTrash" alt="delete">' +
        '<img src="/static/images/Edit/trash.png" class="deleteTrash" alt="delete">' +
        '</a>' +
        <!-- Delete Prompt -->
        '<div class="deletePrompt hide">' +
        '<h4>Are you sure?</h4>' +
        '<a href="#">Cancel</a>' +
        '<a href="#">Yes, Delete</a>' +
        '</div>' +
        '</li>'
    );
    $('.pH_row-edit').removeClass('hide');
    $('.left-panel-scroll ul li').first().addClass('active');
});

/*---------------------------Get and Update details of new Project--------------------------------------*/


/*-----function for updating project name----*/

function update_project_name(data) {
    console.log(data);
    var url = 'http://creathives.com/index/home/update_project_title/' + new_proj_id + '/';;
    $.ajax({
        url: url,
        method: 'POST',
        data: JSON.stringify(data),
        'dataType': "json",
        'success': function (res) {
            console.log(res);
            console.log(res.status);
            console.log(res.id);
             $('.left-panel-scroll ul li a').first().attr('data-project-id', res.id);
            new_proj_id = res.id;
        }
    }).error(function (r) {
        console.log(r)
    })
}

/*-------------------------------------------*/

/*---------Validation Handler-------------*/
var proj_title = $('.media-body>h4');
var proj_type = $('.media-body span');
var proj_desc = $('.media-body p');

var validation = {
    ReDefault: function (field) {
        field.css('border-color', '#ddd');
    },
    Require: function (field){
        field.css('border-color', 'red');
    },
    check_empty: function(field){
        val = field.text().trim();
        if(val == '') {
            validation.Require(field);
            return true;
        }
        else return false;
    },
    checkDetails : function() {
        if (validation.check_empty(proj_title, 'Project Title', 'Enter Project Title')) {
            validation.Require(proj_title, 'Enter Project Title');
            return false;
        }
        if (validation.check_empty(proj_type, 'Project Type', '')) {
            validation.Require(proj_type, 'Enter Project Type');
            return false;
        }
        if (validation.check_empty(proj_type, 'Enter Project Type', '')) {
            validation.Require(proj_type, 'Enter Project Type');
            return false;
        }
        else return true;
    }

};

/*-----------------------------------------*/

/*new project data insert*/


proj_title.on('focusin', function(e){
    validation.ReDefault($(this));
    $('.left-panel-scroll>ul span').removeClass('hide');
});

proj_title.focusout(function(e){
    if(validation.check_empty($(this))) return;
    else {
        project_title = $(this).text().trim();
        var data = {
            'title': project_title
        };
        update_project_name(data);
        $('#proj-undo').addClass('hide');
        $('#proj-done').removeClass('hide');
    }

});

proj_title.keyup(function(e){
    $('.left-panel-scroll ul').find('.active span').text($(this).text())
});

proj_type.on('focusin', function(e){
    validation.ReDefault($(this));
    if(validation.check_empty(proj_title)) return;
    e.stopPropagation();
});

proj_type.focusout(function(e){
    if(validation.check_empty($(this))) return;
    else {
        project_type = $(this).text().trim();
        var data = {
            'type': project_type
        };
        update_project_name(data);
        // $('.left-panel-scroll ul li').first('a').attr('data-project-id', res.id);
    }
    e.stopPropagation();
});

proj_desc.focusout(function(e){
    if(validation.check_empty($(this))) return;
    else{
        project_desc = $(this).text().trim();
        data = {
            'desc' : project_desc
        };
        update_project_name(data);
    }
});

/*|----------------------------------------------------------------------------------------------------------|*/

/*--------------undo project-------------------*/

$('#proj-undo').on('click', function (e) {
    e.preventDefault();
    $('#proj-add').removeClass('hide');
    $('#proj-undo').addClass('hide');
    $('.project-sq a[data-project-id=0]').parent().remove();
    $('#rightView_content .pH_row-edit').addClass('hide')
    $('.leftPanel ul>li').removeClass('hide');
    $('#proj-0').remove();
    $('.leftPanel ul>li').first().click();
    var count = parseInt($('.lp_title>span').attr('data-count'));
    $('.lp_title>span').attr('data-count', --count);
    $('.lp_title>span').text(count);
    e.stopPropagation();
});

/*-----------------------------------------------*/


/*----------------------------------------Project Thumb Image Upload----------------------------------------------------*/

$('.pH_row-edit .media-left img').on('click', function(e){
    e.preventDefault();
    $('#proj-img').click();
    e.stopPropagation()
});


/*new project and image upload*/
$('#proj-img').on('change', function(e){
    e.preventDefault();
    // console.log(e);
    var $img = this.files[0];
    var $img_name = $img.name;
    var $img_ext = $img_name.substr($img_name.lastIndexOf('.')+1);
    // console.log($img_ext);
    if($img_ext!='jpeg' && $img_ext!='png' && $img_ext!='jpg'){
        alert('Wrong Image Type!! try again')
    }
    else {
        var img_obj = new FormData();
        img_obj.append('image', $img);
        var url = 'http://creathives.com/index/home/proj_create_update/' + new_proj_id + '/';
        $.ajax({
            url: url,
            type: 'POST',
            data: img_obj,
            processData: false,
            contentType: false,
            'success': function (res) {
                $('#proj-undo').addClass('hide');
                $('#proj-done').removeClass('hide');
                data = JSON.parse(res);
                $('.pH_row-edit .media-left img').attr('src', data.image_url);
                $('.left-panel-scroll ul img').first().attr('src', data.image_url);
                $('.left-panel-scroll li a').first().attr('data-project-id', data.id);
                new_proj_id = data.id;
            }
        }).error(function (r) {
            console.log(r)
        })
    }
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



/*------------------------------------------profile_pic_upload------------------------------------------------------*/
var prof_pic_edit = $('.edit-prof');
$('.profile_pic_large')
    .mouseenter( function() {
        prof_pic_edit.removeClass('hide');
        console.log('hover');
    })
    .mouseleave( function(){
        prof_pic_edit.addClass('hide');
    });


prof_pic_edit.on('click', function(e){
    e.preventDefault();
    $('#prof-img').click();
});

$('#prof-img').on('change', function(e){
    var $img = this.files[0];
    var $img_name = $img.name;
    var $img_ext = $img_name.substr($img_name.lastIndexOf('.')+1);
    if($img_ext!='jpeg' && $img_ext!='png' && $img_ext!='jpg'){
        return;
    }
    else {
        var img_obj = new FormData();
        img_obj.append('image', $img);
        var url = 'http://creathives.com/index/home/profile_pic_change/';
        $.ajax({
            url: url,
            type: 'POST',
            data: img_obj,
            processData: false,
            contentType: false,
            'success': function (res) {
                data = JSON.parse(res);
                $('.profile_pic_large>img').attr('src', data.image_url);
            }
        }).error(function (r) {
            console.log(r)
        })
    }
});

/*------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------banner upload----------------------------------------*/
var cover_edit = $('.edit-wall');
$('#banner')
    .mouseover( function(e){
        cover_edit.removeClass('hide');
    })
    .mouseout( function(e){
        cover_edit.addClass('hide');
    });
cover_edit.on('click', function(e){
    e.preventDefault();
    $('#banner-img').click();
});

$('#banner-img').on('change', function(e){
    var $img = this.files[0];
    var $img_name = $img.name;
    var $img_ext = $img_name.substr($img_name.lastIndexOf('.')+1);
    if($img_ext!='jpeg' && $img_ext!='png' && $img_ext!='jpg'){
        return;
    }
    else {
        var img_obj = new FormData();
        img_obj.append('cover_image', $img);
        var url = 'http://creathives.com/index/home/profile_pic_change/';
        $.ajax({
            url: url,
            type: 'POST',
            data: img_obj,
            processData: false,
            contentType: false,
            'success': function (res) {
                data = JSON.parse(res);
                $('#banner>img').attr('src', data.image_url);
            }
        }).error(function (r) {
            console.log(r)
        })
    }
});
/*-------------------------------------------------------------------------------------------------*/

/*----------------------------------Delete Project------------------------------------------------*/

$('.no').on('click', function(e){
    e.preventDefault();
    $(this).closest('li').find('.deletePrompt').addClass('hide');
    e.stopPropagation();

});

$('.yes').on('click', function(e){
    e.preventDefault();
    console.log('yes');
    var self = $(this);
    var id = self.closest('li').find('a').attr('data-project-id');
    var count = parseInt($('.lp_title>span').attr('data-count'));
    var data = {
        'id': id
    };
    console.log(data);
    var url = 'http://creathives.com/index/home/delete_project/';
    $.ajax({
        url: url,
        method: 'POST',
        data: JSON.stringify(data),
        'dataType': "json",
        'success': function (res) {
            console.log(res);
            $(self).closest('li').remove();
            $('.lp_title>span').attr('data-count', --count);
            $('.lp_title>span').text(count);
            $('.pl_thumbHolder').remove();
            $('.left-panel-scroll ul li').first().click();
        }
    }).error(function (r) {
        console.log(r)
    });
    e.stopPropagation();
});

/*------------------------------------------------------------------------------------------------*/

/*--------------------------------media validator---------------------------------------------*/

function validateUploadedMediaFormat(type, files){
    var validation;
    var approved_formats = {
        'Videos' : ['avi','mp4','m4v','3gp'],
        'Tracks' : ['mp3','wav'],
        'Images' : ['png','jpg','jpeg'],
        'Articles' : ['doc','docx','pdf']
    };

    for(var i= 0;i<files.length;i++) {
        var file_name = files[i].name;
        var ext = file_name.substr(file_name.lastIndexOf('.') + 1);
        if(approved_formats[type].indexOf(ext) <0){
            validation = false;
        }else{
            validation = true;
        }

        //if(validation){
        //    $('.media-tabs .error_message').hide();
        //
        //}else{
        //    var val = 'Approved Formats: '+approved_formats[type].join(', ');
        //    $('.media-tabs .error_message').show();
        //    $('.media-tabs .error_message .info-popup').attr('data-content',val)
        //}
        return validation
    }
}

/*---------------------------------------------------------------------------------------------*/


/*------------------------------------media upload---------------------------------------------*/
var data_type;
$('.media-tabs li img').on('click', function(e){
    e.preventDefault();
    data_type = $(this).attr('data-type');
    $('.media_all_upload').attr('data-type', data_type);
    console.log(!validation.checkDetails());
    if(!validation.checkDetails()){
        return;
    }
    else
        $('.media_all_upload').click();
    });

$('#media_upload').on('change', function(e){
    var files = e.target.files;
    var name = files[0].name;

    if(!validateUploadedMediaFormat(data_type, files)){
        alert('Wrong ' + data_type + ' type please choose a ' + data_type + ' file.');
        return;
    }

    var img_obj = new FormData();
    img_obj.append('files', files[0]);
    img_obj.append('type', data_type);
    var url = 'http://creathives.com/index/home/media_upload/'+new_proj_id+'/';
    $.ajax({
        url: url,
        type: 'POST',
        data: img_obj,
        processData: false,
        contentType: false,
        xhr: function()
        {
            var xhr = $.ajaxSettings.xhr();
            //Upload progress
            if(xhr.upload) {
                xhr.upload.addEventListener("progress", function(evt){
                    var percentComplete = (evt.loaded / evt.total)*100;
                    $('.thumb-progress-bar .progress-bar').width(percentComplete+'%');
                    console.log(percentComplete);
                }, false);
            }
            return xhr;
        },
        beforeSend: function (xhr, settings) {
            $('body').css('overflow', 'hidden');
            $('.body-overlay').fadeIn();
            $('.video-modal').fadeIn();
            $('.thumb-progress-bar').removeClass('hide');
            $('.thumb-progress-bar .progress-bar').width('0%');
        },
        'success': function (res) {
            console.log(res);
            $('.mediaplayer iframe').attr('src', res.thumb_img);
            if(res.type=='images') {
                $('.video-thumbnails li img').attr('src', res.thumb_img);
                $('.video-viewer img').attr('src', res.thumb_img);
            }
            $('.video-desc .details').text(res.type+' Details');
            $('.video-desc .title').text('');
            $('.video-desc .title').attr('contentEditable','true');
            $('.video-desc .title').focus();
            $('.video-desc .description').text('');
            $('.video-desc .description').attr('contentEditable','true');
            $('.video-desc').attr('data-media-id', res.id);


            $('.project_lists').prepend(
                '<div class="pl_thumbHolder"  data-description="' + res.description + '" ' +
                'data-type="'+ res.type +'" data-url="' + res.url + '" id="media-' + res.id + '">' +
                '<div class="thumb-edit-overlay"></div>' +
                '<div class="thumbnail">' +
                '<img src="/static/images/latest/project4.png" alt="'+ res.name +'" id="th_img-'+ res.id +'">' +
                '<div class="caption">' +
                '<p>' + res.name + '</p>' +
                '<a href=""><img src="/static/images/Header/'+ res.type +'-black.png" alt="' + res.type + '"></a>' +
                '</div>' +
                <!-- Portfolio Edit -->
                '<div class="thumb-edit-icons hide">' +
                '<div class="squaredThree hide">' +
                '<input type="checkbox" value="None" name="check" />' +
                '<label for="test_1"></label>' +
                '</div>' +
                '<a href=""><img src="/static/images/Edit/img-pen.png" alt="Edit"></a>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
            if(res.type=='images') {
                $('#th_img-' + res.id).attr('src', res.thumb_img);
            }
        }
    }).error(function (r) {
        console.log(r)

    });
    //$('.icn').show();
    e.stopPropagation();
});

/*update media details*/
$('.video-desc').on('blur', '.title, .description', function(e){
    media_id = $('.video-desc').attr('data-media-id');
    var detail = {
        'title': $('.video-desc .title').text().trim(),
        'description': $('.video-desc .description').text().trim()
    };
    var url = 'http://creathives.com/index/home/media_upload/' + media_id + '/';
    $.ajax({
        url: url,
        type: 'PUT',
        data: JSON.stringify(detail),
        'success': function (res) {
            $('#media-'+res.id+ ' p').text(res.title);
            $('#media-' + res.id).attr('data-description', res.description);
        }
    }).error(function (r) {
        console.log(r)
    });
    e.stopPropagation();
});

/*---------------------------------------------------------------------------------------------*/

/*----------------------------Project Edit------------------------*/

$('.project-details-edit').on('click', function (e) {
    e.preventDefault();
    $('#mediaURL').val('');
    $('#proj-add').addClass('hide');
    $('#proj-done').removeClass('hide');
    $('.pH_row-edit').removeClass('hide');
    $('#rightView_content .pH_row').addClass('hide');
    $('.pH_row-edit .media-left img').attr('src', $('#rightView_content .pH_row .titleSection').attr('data-thumb-url'));
    $('.media-body h4').text($('#rightView_content .pH_row .p_mt').text().trim());
    $('.media-body span').text($('#rightView_content .pH_row .p_st').text().trim());
    $('.media-body p').text($('#rightView_content .pH_row p').text().trim());
    e.stopPropagation();
});

$('#proj-done').on('click', function (e) {
    e.preventDefault();
    $('#proj-add').removeClass('hide');
    $('#proj-done').addClass('hide');
    $('.pH_row-edit').addClass('hide');
    $('#rightView_content .pH_row').removeClass('hide');
    $('#rightView_content .pH_row .p_mt').text($('.media-body h4').text().trim());
    $('#rightView_content .pH_row .p_st').text($('.media-body span').text().trim());
    $('#rightView_content .pH_row p').text($('.media-body p').text().trim());
    $('#rightView_content .pH_row .titleSection').attr('data-thumb-url', $('.pH_row-edit .media-left img').attr('src'));
    e.stopPropagation();
});
/*------------------------------------------------------------------*/


/*----------------get project media and details-------------------------*/
var media_count;
var media_from=0;
var media_to=0;
//last
$('.left-panel-scroll ul').on('click', '.project-sq', function (e) {
    e.preventDefault()
    media_from=0;
    media_to=6;
    $('.pH_row-edit').addClass('hide');
    $('#proj-undo').addClass('hide');
    $('#proj-done').addClass('hide');
    $('#proj-add').removeClass('hide');
    //$('.project-sq a[data-project-id=0]').parent().remove();
    id = $(this).find('a').attr('data-project-id');
    var url = 'http://creathives.com/index/home/get_project_details/'+id+'/';
    $.ajax({
        url: url,
        method: 'GET',
        'success': function (res) {
            $('#rightView_content .pH_row').removeClass('hide');
            $('#rightView_content .pH_row').attr('data-p-id', id);
            $('#rightView_content .pH_row .p_mt').text(res.title);
            $('#rightView_content .pH_row .p_st').text(res.type);
            $('#rightView_content .pH_row p').text(res.description);
            $('#rightView_content .pH_row .titleSection').attr('data-thumb-url', res.url_thumb_img);
            new_proj_id = id;
            getMedia(id, media_from, media_to, function (res) {
                res_media = JSON.parse(res).data;
                media_count = JSON.parse(res).count;
                $('.pl_thumbHolder').remove();
                append_media(res_media);
            });
        }
    }).error(function (r) {
        console.log(r);
    });
    e.stopPropagation();
});

function append_media(res_media){
    jQuery.each(res_media, function(i, val){
        $('.project_lists').append(
            '<div class="pl_thumbHolder" id="' + val.id + '" data-description="' + val.description + '" ' +
            'data-type="'+ val.type +'" data-url="' + val.url + '">' +
            '<div class="thumb-edit-overlay"></div>' +
            '<div class="thumbnail" >' +
            '<img src="/static/images/latest/project4.png" alt="'+ val.name +'" id="th_img-'+ val.id +'">' +
            '<div class="caption">' +
            '<p>' + val.name + '</p>' +
            '<a href=""><img src="/static/images/Header/'+ val.type +'-black.png" alt="' + val.type + '"></a>' +
            '</div>' +
            <!-- Portfolio Edit -->
            '<div class="thumb-edit-icons hide">' +
            '<div class="squaredThree hide">' +
            '<input type="checkbox" value="None" name="check" />' +
            '<label for="test_1"></label>' +
            '</div>' +
            '<a href=""><img src="/static/images/Edit/img-pen.png" alt="Edit"></a>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        if(val.type=='images') {
            $('#th_img-' + val.id).attr('src', val.thumb_img);
        }
    });
}

function getMedia(id, st, end, callback){
    st = st || 0;
    end = end || 5;
    var url = 'http://creathives.com/index/home/get_project_media/'+id+'/' + st + '-' + end+'/';
    $.ajax({
        url: url,
        method: 'GET',
        'success': function (res) {
            callback(res);
        }
    }).error(function (r) {
        console.log(r);
    });
}



/*----------------------------------------------------------------------*/

/*----------------------------media information--------------------------*/
// Video modal open
$('.project_lists').on('click', '.pl_thumbHolder', function(e){
    e.preventDefault();
    $('body').css('overflow', 'hidden');
    $('.video-modal').fadeIn();
    $('.body-overlay').fadeIn();
    project_name = $('.left-panel-scroll').find('.active span').text().trim();
    media_desc = $(this).attr('data-description');
    media_type = $(this).attr('data-type');
    media_url = $(this).attr('data-url');
    media_title = $(this).find('.caption p').text().trim();
    $('.video-modal h4').first().text(project_name);
    $('.mediaplayer iframe').attr('src', media_url);
    $('.video-thumbnails li img').attr('src', media_url);
    $('.video-viewer img').attr('src', media_url);
    $('.video-desc .details').text(media_type+' Details');
    $('.video-desc .title').text('Title: '+media_title);
    $('.video-desc .description').text('Description:'+media_desc);

});
$('.btn-done').on('click', function(e){
    e.preventDefault();
    $('body').css('overflow', 'visible');
    $('.video-modal').fadeOut();
    $('.body-overlay').fadeOut();
    $('.body-overlay').fadeOut();
});
/*-----------------------------------------------------------------------*/

/*--------------uploading from youtube----------------------*/
function getDetailsYT(url, callback) {
    var key = " AIzaSyDxFzx3KaQFG4nrlDbxDBHeMdGtdBMPYxQ";
    var video = (url).split("=")[1];
    var YTLink = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + video + "&key=" + key;
    var player = $('.video-viewer .player[data-type="videos"]');
    // var media = {};

    $.ajax({
        url: YTLink,
        type: 'GET',
        // async: 'false',
        success: function(data) {
            var media = {};
            if(data && data.hasOwnProperty('items') && data.items[0]!=undefined) {
                media['title'] = data.items[0].snippet.title;
                // media['description'] = data.items[0].snippet.description;
                media['thumbnail'] = data.items[0].snippet.thumbnails.default.url;
                media['media_url'] = video;
                media['index'] = '0';
                media['type'] = 'videos';
            }
            callback(media);
        },
        error: function(r) {
            console.log(r);
        }

    });
    // return media;
};

$('.media-upload-URL input').on('paste, keyup', function (e) {
    // $('#yt-add').removeClass('hide');
    var url = $('.media-upload-URL input').val();
    getDetailsYT(url, function(callback){
        youtubemediaDisplay(callback);
    });
    // console.log(media);
    // youtubemediaDisplay(media);
    // console.log(media);
    $('.media-upload-URL input').val('');
    e.stopPropagation();
});

function youtubemediaDisplay(media){
    console.log(media);
    $('.video-modal').fadeIn();
    $('.body-overlay').fadeIn();
    // $('.video-modal h4').first().text(project_name);
    var watch = '//www.youtube.com/embed/' + media['media_url'] + '?showinfo=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;nologo=1&amp;controls=2&amp;rel=0&amp;autohide=1&amp;wmode=transparent&amp;enablejsapi=1&amp;html5=1&amp;'
    var fetch = 'www.youtube.com/watch?v='+ media['media_url'];
    $('.mediaplayer iframe').attr('src', watch);
    $('.video-thumbnails li img').attr('src', media['thumbnail']);
    $('.video-viewer img').attr('src', media['thumbnail']);
    // $('.video-desc .details').text('Fetch From '+ fetch);
    $('.video-desc .title').text('Title: '+ media['title']);
    $('.video-desc .description').text('Fetch From '+ fetch);
}
/*------------------------------------------------------------*/
