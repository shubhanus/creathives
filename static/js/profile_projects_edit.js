/**
 * Created by shugar on 14/3/16.
 */
var new_proj_id = 0;

$(function () {
    // $('.body-overlay').fadeIn()
    $("html, body").stop().animate({scrollTop:0});
    $('.dropdown').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
    });
    $('.dropdown').on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
    });

    sticky_relocate();
    $.ajaxSetup({
        headers: {'X-CSRFToken': getCookie("csrftoken")}
    });
    $('.leftPanel ul>li').first().click();

    //get media on scroll
    $(window).scroll(function (e) {
        sticky_relocate();
        total = media_count;
        p_id = $('#rightView_content .pH_row').attr('data-p-id');
        media_type = get_type($('.nav-categories .active img').attr('alt'));
        if ($(window).scrollTop() >= (($(document).height() - $(window).height())-100)) {
            media_from = media_to;
            if (media_to >= total) return;
            else {
                media_to += 3;
                getMedia(p_id, media_type, media_from, media_to, function (res) {
                    res = JSON.parse(res);
                    total = res.count;
                    data = res.data;
                    append_media(data);
                    console.log(total);
                })
            }
        }
        e.stopPropagation()
    });
    var media_count = 0;
    var media_from = 0;
    var media_to = 0;
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

/*For username and about edit*/


function save_name_about(data) {
    var url = 'http://creathives.com/index/home/update_name_about/';
    $.ajax({
        url: url,
        method: 'POST',
        data: JSON.stringify(data),
        'dataType': "json",
        'success': function (res) {
            //data = JSON.parse(res);
        }
    }).error(function (r) {
        console.log(r);
    })
}

var $edit_icon = $('#edit-name-about');
var $edit_user_name = $('#user-name');
var $edit_about = $('#about');
var $save_icon = $('#save-name-about');

$('#profile-name-about')
    .mouseenter(function () {
        $edit_icon.removeClass('hide');
        $edit_icon.click(function (e) {
            e.preventDefault();
            $save_icon.removeClass('hide');
            $edit_icon.hide();
            // $edit_icon.addClass('hide');
            $edit_user_name.attr('contentEditable', 'true');
            $edit_about.attr('contentEditable', 'true');
            $edit_user_name.css('border-bottom', '1px #ddd dashed');
            $edit_about.css('border-bottom', '1px #ddd dashed');

        })
    })
    .mouseleave(function () {
        $edit_icon.addClass('hide');
    });

$save_icon.on('click', function (e) {
    e.preventDefault();
    $edit_user_name.attr('contentEditable', 'false');
    $edit_about.attr('contentEditable', 'false');
    $edit_user_name.css('border', 'none');
    $edit_about.css('border-bottom', 'none');
    $edit_icon.addClass('hide');
    $save_icon.addClass('hide');
    var data = {
        'name': $edit_user_name.text().trim(),
        'about': $edit_about.text().trim()
    };
    $edit_icon.show();
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

$('#proj-add').click(function (e) {
    e.preventDefault();
    new_proj_id = 0
    $('.project-sq a[data-project-id=0]').parent().remove();
    // $('.project-sq a[data-project-id=0]').parent().remove();
    $('#proj-add').addClass('hide');
    $('#proj-undo').removeClass('hide');
    $('#rightView_content .pH_row').addClass('hide');
    // $('.leftPanel ul>li').addClass('hide');
    $('.leftPanel ul').find('.active').removeClass('active');
    // $('.leftPanel ul').find('.active').removeClass('active');
    $('.project_lists .pl_thumbHolder').remove();
    var count = parseInt($('.lp_title>span').attr('data-count'));
    $('.lp_title>span').attr('data-count', ++count);
    $('.lp_title>span').text(count);
    $('.pH_row-edit .media-object').attr('src', '/static/images/Edit/titleImage.png')
    $('.media-body h4').text('');
    $('.media-body span').text('');
    $('.media-body p').text('');

    /*Left Panel*/
    //last
    new_data = '<li class="project-sq">' +
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
        '</li>';

    var new_div = $(new_data).hide();
    $('.left-panel-scroll ul').prepend(new_div);
    new_div.slideDown();
    var edit = $('.pH_row-edit').removeClass('hide').hide();
    edit.slideDown();
    $('.left-panel-scroll ul li').first().addClass('active');
});

/*---------------------------Get and Update details of new Project--------------------------------------*/


/*-----function for updating project name----*/

function update_project_name(data) {
    console.log(data);
    var url = 'http://creathives.com/index/home/update_project_title/' + new_proj_id + '/';
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
    Require: function (field) {
        field.css('border-color', 'red');
    },
    check_empty: function (field) {
        val = field.text().trim();
        if (val == '') {
            validation.Require(field);
            return true;
        }
        else return false;
    },
    checkDetails: function () {
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


proj_title.on('focusin', function (e) {
    validation.ReDefault($(this));
    $('.left-panel-scroll>ul span').removeClass('hide');
});

proj_title.focusout(function (e) {
    if (validation.check_empty($(this))) return;
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

proj_title.keyup(function (e) {
    $('.left-panel-scroll ul').find('.active span').text($(this).text())
});

proj_type.on('focusin', function (e) {
    validation.ReDefault($(this));
    if (validation.check_empty(proj_title)) return;
    e.stopPropagation();
});

proj_type.focusout(function (e) {
    if (validation.check_empty($(this))) return;
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

proj_desc.focusout(function (e) {
    if (validation.check_empty($(this))) return;
    else {
        project_desc = $(this).text().trim();
        data = {
            'desc': project_desc
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

$('.pH_row-edit .media-left img').on('click', function (e) {
    e.preventDefault();
    $('#proj-img').click();
    e.stopPropagation()
});

/*new project and image upload*/
$('#proj-img').on('change', function (e) {
    e.preventDefault();
    var $img = this.files[0];
    var $img_name = $img.name;
    var $img_ext = $img_name.substr($img_name.lastIndexOf('.') + 1);
    if ($img_ext.toLowerCase() != 'jpeg' && $img_ext != 'png' && $img_ext != 'jpg') {
        $('#proj-img-error')
            .text('Wrong Image Type!!')
            .fadeIn();
            setTimeout(function () {
                $('#proj-img-error')
                    .fadeOut('slow')
            }, 1000);
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
            success: function (res) {
                $('#proj-undo').addClass('hide');
                $('#proj-done').removeClass('hide');
                data = JSON.parse(res);
                $('.pH_row-edit .media-left img').attr('src', data.image_url + '?' + Date());
                $('.left-panel-scroll ul img').first().attr('src', data.image_url + '?' + Date());
                $('.left-panel-scroll li a').first().attr('data-project-id', data.id);
                new_proj_id = data.id;
            },
            error: function (r) {
                console.log(r)
            }
        })
    }
});


function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}


/*------------------------------------------profile_pic_upload------------------------------------------------------*/
var prof_pic_edit = $('.edit-prof');
$('.profile_pic_large')
    .mouseenter(function () {
        prof_pic_edit.removeClass('hide');
    })
    .mouseleave(function () {
        prof_pic_edit.addClass('hide');
    });


prof_pic_edit.on('click', function (e) {
    e.preventDefault();
    $('#prof-img').click();
});


$('#prof-img').on('change', function (e) {
    var $img = this.files[0];
    var $img_name = $img.name;
    var $img_ext = $img_name.substr($img_name.lastIndexOf('.') + 1).toLowerCase();
    if ($img_ext != 'jpeg' && $img_ext != 'png' && $img_ext != 'jpg') {
        $('#profile-pic-error')
            .text('Wrong Image Type!! Try again')
            .fadeIn('slow')
        setTimeout(function () {
            $('#profile-pic-error')
                .fadeOut('slow')
        }, 1000);
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
            success: function (res) {
                data = JSON.parse(res);
                $('.profile_pic_large>img').hide("scale", 300, function () {
                    $('.profile_pic_large>img')
                    .attr('src', data.image_url + '?' + new Date())
                    .show("scale", 300)
                });
                $('.header-profilePic img').attr('src', data.small_image + '?' + new Date());
            },
            error: function (r) {
                console.log(r);
            }
        })
    }
});

/*------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------banner upload----------------------------------------*/
var cover_edit = $('.edit-wall');
$('#banner')
    .mouseover(function (e) {
        cover_edit.removeClass('hide');
    })
    .mouseout(function (e) {
        cover_edit.addClass('hide');
    });
cover_edit.on('click', function (e) {
    e.preventDefault();
    $('#banner-img').click();
});


$('#banner-img').on('change', function (e) {
    var $img = this.files[0];
    var $img_name = $img.name;
    var $img_ext = $img_name.substr($img_name.lastIndexOf('.') + 1).toLowerCase();
    if ($img_ext != 'jpeg' && $img_ext != 'png' && $img_ext != 'jpg') {
        $('#cover-pic-error')
            .text('Wrong Image Type!! Try again')
            .hide()
            .fadeIn('slow')
        setTimeout(function () {
            $('#cover-pic-error')
                .fadeOut('slow')
        }, 1000);
        // alert('Wrong Image Format Please Try Agin With Image File Only !!!');
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
            success: function (res) {
                data = JSON.parse(res);
                $('#banner>img').hide("clip", 300, function () {
                    $('#banner>img')
                    .attr('src', data.image_url + '?' + new Date())
                    .show("clip", 300)
                });
                // $('#banner>img').attr('src', data.image_url + '?' + Date());
            },
            error: function (r) {
                console.log(r);
            }
        })
    }
});
/*-------------------------------------------------------------------------------------------------*/

/*----------------------------------Delete Project------------------------------------------------*/

$('.no').on('click', function (e) {
    e.preventDefault();
    $(this).closest('li').find('.deletePrompt').addClass('hide');
    e.stopPropagation();

});

$('.yes').on('click', function (e) {
    e.preventDefault();
    console.log('yes');
    var self = $(this);
    var id = self.closest('li').find('a').attr('data-project-id');
    var count = parseInt($('.lp_title>span').attr('data-count'));
    var data = {
        'id': id
    };
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
            $('.pl_thumbHolder').fadeOut(function (e) {
                $(this).remove()
            });
            $('.left-panel-scroll ul li').first().click();
            $('.pH_row').fadeOut(function (e) {
                $(this).addClass('hide')
            })
        },
        'error': function (res) {
            console.log(res)
        }
    })
    e.stopPropagation();
});

/*------------------------------------------------------------------------------------------------*/

/*--------------------------------media validator---------------------------------------------*/

function validateUploadedMediaFormat(type, files) {
    var validation;
    var approved_formats = {
        'Videos': ['avi', 'mp4', 'm4v', '3gp'],
        'Tracks': ['mp3', 'wav'],
        'Images': ['png', 'jpg', 'jpeg'],
        'Articles': ['doc', 'docx', 'pdf']
    };

    for (var i = 0; i < files.length; i++) {
        var file_name = files[i].name;
        var ext = file_name.substr(file_name.lastIndexOf('.') + 1).toLocaleLowerCase();
        if (approved_formats[type].indexOf(ext) < 0) {
            validation = false;
        } else {
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
$('.media-tabs li').on('click', 'img', function (e) {
    e.preventDefault();
    data_type = $(this).attr('data-type');
    $('.media_all_upload').attr('data-type', data_type);
    if (!validation.checkDetails()) {
        return;
    }
    else
        $('.media_all_upload').click();
});

$('#media_upload').on('change', function (e) {
    var files = e.target.files;
    var name = files[0].name;
    if (!validateUploadedMediaFormat(data_type, files)) {
        //last
        $('#media-upload-error')
            .text('Wrong ' + data_type + ' file.')
            .fadeIn('slow')
        setTimeout(function () {
            $('#media-upload-error')
                .fadeOut('slow')
        }, 1000);
        return;
    }
    var img_obj = new FormData();
    img_obj.append('files', files[0]);
    img_obj.append('type', data_type);
    var url = 'http://creathives.com/index/home/media_upload/' + new_proj_id + '/';
    $.ajax({
        url: url,
        type: 'POST',
        data: img_obj,
        processData: false,
        contentType: false,
        cache: false,
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            //Upload progress
            if (xhr.upload) {
                xhr.upload.addEventListener("progress", function (e) {
                    var percentComplete = (e.loaded * 100) / e.total;
                    $('.right_viewArea .progress .progress-bar').width(percentComplete + '%');
                }, false);
            }
            return xhr;
        },
        beforeSend: function (xhr, settings) {
            $('.body-overlay').show();
            $('.project_lists .progress .progress-bar').width(0);
        },
        success: function (res) {
            data = '<div class="pl_thumbHolder" data-title="' + res.name + '" data-description="' + res.description + '" ' +
                'data-type="' + res.type + '" data-url="' + res.url + '" data-thumb_url="' + res.thumb_img + '"' +
                'id="media-' + res.id + '"data-id="' + res.id + '">' +
                '<div class="thumb-edit-overlay"></div>' +
                '<div class="thumbnail" >' +
                '<img src="' + res.thumb_img + '" alt="' + res.name + '" id="th_img-' + res.id + '">' +
                '<div class="caption">' +
                '<p>' + res.name + '</p>' +
                '<a href=""><img src="/static/images/Header/' + res.type + '-black.png" alt="' + res.type + '"></a>' +
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
                '</div>';

            $('.project_lists').prepend(data);
            $('.body-overlay').fadeOut();

        }
    }).error(function (r) {
        console.log(r)
    });
    //$('.icn').show();
    e.stopPropagation();
});

/*update media details*/
//double click
$('.video-desc .title , .description').dblclick(function (e) {
    $(this).attr('unselectable', 'on')
        .css('user-select', 'none')
        .on('selectstart', false)
        .text('')
        .attr('contentEditable','true')
});

$('.video-desc').on('blur', '.title, .description', function (e) {
    $(this).css("cursor", "default")
        .attr('unselectable', 'on')
        .attr('contenteditable', false)
        .css('user-select', 'none')
        .on('selectstart', false);
    media_id = $('.video-desc').data('media_id');
    var detail = {
        'title': $('.video-desc .title').text().replace('Title:', '').trim(),
        'description': $('.video-desc .description').text().replace('Description:', '').trim()
    };
    var url = 'http://creathives.com/index/home/media_upload/' + media_id + '/';
    $.ajax({
        url: url,
        type: 'PUT',
        data: JSON.stringify(detail),
        'success': function (res) {
            $('#media-' + res.id + ' p').text(res.title);
            $('#media-' + res.id).data('description', res.description);
            $('#media-' + res.id).data('title', res.title);
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
    $('.pH_row-edit').removeClass('hide').hide();
    $('.pH_row-edit').fadeIn();
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
    $('.pH_row-edit').slideUp('fast');
    setTimeout(function() {
        $('.pH_row-edit').addClass('hide');
    },1000);
    $('#rightView_content .pH_row').removeClass('hide').hide();
    $('#rightView_content .pH_row').slideDown();
    $('#rightView_content .pH_row .p_mt').text($('.media-body h4').text().trim());
    $('#rightView_content .pH_row .p_st').text($('.media-body span').text().trim());
    $('#rightView_content .pH_row p').text($('.media-body p').text().trim());
    $('#rightView_content .pH_row .titleSection').attr('data-thumb-url', $('.pH_row-edit .media-left img').attr('src'));
    e.stopPropagation();
});
/*------------------------------------------------------------------*/


/*----------------get project media and details-------------------------*/
media_count = 0;
media_from = 0;
media_to = 0;
$('.left-panel-scroll').on('click', '.project-sq', function (e) {
    e.preventDefault();
    $(this).addClass('active')
    media_type = get_type($('.nav-categories .active img').attr('alt'));
    console.log(media_type)
    media_from = 0;
    media_to = 6;
    empty_project = $('.left-panel-scroll ul a').first().attr('data-project-id');
    if(empty_project == 0)
        $('.left-panel-scroll ul li').first().remove();
    $('.pH_row-edit').addClass('hide');
    $('#proj-undo').addClass('hide');
    $('#proj-done').addClass('hide');
    $('#proj-add').removeClass('hide');
    id = $(this).find('a').data('project-id');
    var url = 'http://creathives.com/index/home/get_project_details/' + id + '/';
    $.ajax({
        url: url,
        method: 'GET',
        'success': function (res) {
            $('#rightView_content .pH_row').removeClass('hide');
            $('#rightView_content .pH_row').data('p-id', id);
            $('#rightView_content .pH_row .p_mt').text(res.title);
            $('#rightView_content .pH_row .p_st').text(res.type);
            $('#rightView_content .pH_row p').text(res.description);
            $('#rightView_content .pH_row .titleSection').attr('data-thumb-url', res.url_thumb_img);
            new_proj_id = id;
            getMedia(id, media_type, media_from, media_to, function (res) {
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

function append_media(res_media) {
    jQuery.each(res_media, function (i, val) {
        data = '<div class="pl_thumbHolder" data-title="' + val.name + '" data-description="' + val.description + '" ' +
            'data-type="' + val.type + '" data-url="' + val.url + '" data-thumb_url="' + val.thumb_img + '"' +
            ' id="media-' + val.id + '"data-id="' + val.id + '">' +
            '<div class="thumb-edit-overlay"></div>' +
            '<div class="thumbnail" >' +
            '<img src="' + val.thumb_img + '" alt="' + val.name + '" id="th_img-' + val.id + '">' +
            '<div class="caption">' +
            '<p>' + val.name + '</p>' +
            '<a href=""><img src="/static/images/Header/' + val.type + '-black.png" alt="' + val.type + '"></a>' +
            '</div>' +
            <!-- Portfolio Edit -->
            '<div class="thumb-edit-icons">' +
            '   <div class="squaredThree">' +
            '<input id="test_1" type="checkbox" value="None" name="check" />' +
            '<label for="test_1"></label>' +
            '</div>' +
            '<a href="" class="hide"><img src="/static/images/Edit/img-pen.png" alt="Edit"></a>' +
            '</div>' +
            '</div>' +
            '</div>';
        // $(data).appendTo($('.project_lists')).hide().fadeIn();
        var new_div = $(data).hide();
        $('.project_lists').append(new_div);
        new_div.slideDown();
    });
}


function get_type(media) {
    if (media == 'images')
        media = 1;
    else if (media == 'tracks')
        media = 2;
    else if (media == 'videos')
        media = 3;
    else if (media == 'articles')
        media = 4;
    else if (media == 'all')
        media = 0;
    return media
}

function getMedia(id, media_type, st, end, callback) {
    st = st || 0;
    end = end || 5;
    var url = 'http://creathives.com/index/home/get_project_media/' + id + '/filter-' + media_type + '/' + st + '-' + end + '/';
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

/*----------------------------Display Media & information--------------------------*/
// Video modal open
$('.project_lists').on('click', '.pl_thumbHolder', function (e) {
    e.preventDefault();
    $('body').css('overflow', 'hidden');
    $('.body-overlay').fadeIn();
    $('.video-modal').slideDown();
    project_name = $('.left-panel-scroll').find('.active span').text().trim();
    $('.video-modal h4').first().text(project_name);
    getMediaThumbs($(this));
    $('.video-thumbnails ul li').first().trigger('click');
});

function previewMedia(current){
    media_desc = current.data('desc');
    media_type = current.data('type');
    media_url = current.data('url');
    media_thumb = current.data('thumb_url');
    media_title = current.data('media_title');
    media_id = current.data('media_id');
    $('.mediaplayer iframe, .mediaplayer iframe img')
        .addClass('hide')
        .attr('src', '/static/images/loading.gif');
    $('.mediaplayer').find('.'+media_type).removeClass('hide').attr('src', media_url);
    if(media_type == 'tracks')
        $('.mediaplayer').css('background-image', 'url(/static/images/audio.jpg)');
    $('.video-desc .details').text(media_type + ' Details');
    $('.video-desc .title').text('Title: ' + media_title);
    $('.video-desc .description').text('Description:' + media_desc);
    console.log(media_id);
    $('.video-desc').attr('data-media_id', media_id);
}

$('.video-thumbnails ul').on('click', 'li', function (e) {
    e.preventDefault();
    $(this)
        .siblings()
        .children('a')
        .removeClass('active')
        .end()
        .end()
        .children('a')
        .addClass('active');
    previewMedia($(this));
});

function getMediaThumbs(current){
    for(i=0; i<5; i++){
        if(!current.data('id')){
            return
        }
        media_desc = current.data('description');
        media_type = current.data('type');
        media_url = current.data('url');
        media_thumb = current.data('thumb_url');
        media_title = current.data('title');
        media_id = current.data('id');
        data = '<li data-desc="'+ media_desc +'" ' +
            'data-type="' + media_type + '"' +
            'data-url="' + media_url + '"' +
            'data-thumb_url="' + media_thumb + '"' +
            'data-media_title="' + media_title + '"' +
            'data-media_id="' + media_id + '">' +
            '<div class="thumb-progress-bar hide">' +
            '<div class="progress">' +
            '<div class="progress-bar progress-bar-success" role="progressbar"' +
            'aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"' +
            'style="width: 50%">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<a href="" class="" >' +
            '<img src="' + media_thumb+ '?' + Date() + '" alt="' + media_title + '">' +
            '</a>' +
            '</li>'
        $(data).appendTo($('.video-thumbnails ul')).hide().fadeIn('slow');
        current = current.next()
    }
}

$('.btn-done').on('click', function (e) {
    e.preventDefault();
    $('body').css('overflow', 'visible');
    // $('.video-modal').fadeOut();
    $('.body-overlay').fadeOut();
    $('.video-modal').slideUp('fast', function(){
        $('iframe').attr('src', '/static/images/loading.gif');
        $('.video-thumbnails li img').attr('src', '/static/images/ajax-loader.gif');
        $('.video-viewer img').attr('src', '/static/images/ajax-loader.gif');
        $('.mediaplayer').css('background-image', 'url(/static/images/loading.gif)');
        $('.mediaplayer iframe').addClass('hide');
        $('.mediaplayer img').addClass('hide');
        $('.video-thumbnails ul').empty();
    });
});
/*-----------------------------------------------------------------------*/

/*--------------uploading from youtube----------------------*/
function getDetailsYT(url, callback) {
    var key = "AIzaSyDxFzx3KaQFG4nrlDbxDBHeMdGtdBMPYxQ";
    var video = (url).split("=")[1];
    var YTLink = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + video + "&key=" + key;
    var player = $('.video-viewer .player[data-type="videos"]');
    // var media = {};

    $.ajax({
        url: YTLink,
        type: 'GET',
        success: function (data) {
            var media = {};
            if (data && data.hasOwnProperty('items') && data.items[0] != undefined) {
                media['title'] = data.items[0].snippet.title;
                media['description'] = data.items[0].snippet.description;
                media['thumbnail'] = data.items[0].snippet.thumbnails.default.url;
                media['media_url'] = video;
                media['index'] = '0';
                media['type'] = 'videos';
            }
            // console.log(media)
            callback(media);
        },
        error: function (r) {
            console.log(r);
        }
    });
}


$('.media-upload-URL input').on('keypress', function (e) {
    if (!($(this).val().trim().length == 0))
        $('#yt-add').fadeIn().removeClass('hide');
    e.stopPropagation();
});

$('.media-upload-URL').on('keyup', 'input', function (e) {
    if ($(this).val().trim().length == 0) {
        $('#yt-add').fadeOut();
    }
});

$('#yt-add').on('click', function (e) {
    e.preventDefault();
    var input = $('.media-upload-URL input')
    var url = input.val();
    var project_id = $('#rightView_content .pH_row').data('p-id')
    getDetailsYT(url, function (callback) {
        data = callback;
        console.log(data)
        var url = 'http://creathives.com/index/home/youtube_media_upload/' + project_id + '/';
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            dataType: "json",
            xhr: function () {
                var xhr = $.ajaxSettings.xhr();
                //Upload progress
                if (xhr.upload) {
                    xhr.upload.addEventListener("progress", function (evt) {
                        var percentComplete = (evt.loaded / evt.total) * 100;
                        $('.thumb-progress-bar .progress-bar').width(percentComplete + '%');
                    }, false);
                }
                return xhr;
            },
            success: function (res) {
                console.log(res);
                data = '<div class="pl_thumbHolder" data-title="' + res.name + '" data-description="' + res.description + '" ' +
                    'data-type="' + res.type + '" data-url="' + res.url + '" data-thumb_url="' + res.thumb_img + '"' +
                    ' id="media-' + res.id + '"data-id="' + res.id + '">' +
                    '<div class="thumb-edit-overlay"></div>' +
                    '<div class="thumbnail" >' +
                    '<img src="' + res.thumb_img + '" alt="' + res.name + '" id="th_img-' + res.id + '">' +
                    '<div class="caption">' +
                    '<p>' + res.name + '</p>' +
                    '<a href=""><img src="/static/images/Header/' + res.type + '-black.png" alt="' + res.type + '"></a>' +
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
                    '</div>';
                $('.project_lists').prepend(data);
            }
        }).error(function (r) {
            console.log(r)

        });
        youtubemediaDisplay(callback);
    });
    $('.media-upload-URL input').val('');
    e.stopPropagation();
});

function youtubemediaDisplay(media) {
    // console.log(media)
    $('.video-modal').slideDown();
    $('.body-overlay').fadeIn();
    // $('.video-modal h4').first().text(project_name);
    var watch = '//www.youtube.com/embed/' + media['media_url']
    var fetch = 'www.youtube.com/watch?v=' + media['media_url'];
    $('.mediaplayer iframe').removeClass('hide');
    $('.mediaplayer iframe').attr('src', watch);
    $('.video-thumbnails li img').attr('src', media['thumbnail']);
    $('.video-viewer img').attr('src', media['thumbnail']);
    // $('.video-desc .details').text('Fetch From '+ fetch);
    $('.video-desc .title').text('Title: ' + media['title']);
    $('.video-desc .description').text('Fetch From ' + fetch);
}
/*------------------------------------------------------------*/

/*for project list tabs*/
$('.nav-categories li, .header-midMenu a').on('click', function (e) {
    e.preventDefault();
    $('.nav-categories .active').removeClass('active');
    $('.header-midMenu .active').removeClass('active');
    $('.icn').addClass('hide');
    data_type = $(this).attr('data-type');
    $('.icn[data-type="' + data_type + '"]').removeClass('hide')
    if(data_type == 'all')
        $('.icn').removeClass('hide');
    var className = $(this).attr('class');
    $('.' + className).addClass('active');
    media_from = 0;
    media_to = 6;
    media_type = get_type($('.nav-categories .active img').attr('alt'));
    id = $('#rightView_content .pH_row').data('p-id');
    getMedia(id, media_type, media_from, media_to, function (res) {
        res_media = JSON.parse(res).data;
        media_count = JSON.parse(res).count;
        $('.pl_thumbHolder').remove();
        append_media(res_media);
    });
});


/*=====================media delete========================*/
del_arr = []
$(".project_lists").on('click', ".squaredThree" , function (e) {
    e.preventDefault();
    e.stopPropagation();
    var ckbox = $(this).find("input[type='checkbox']");
    ckbox.prop("checked", !ckbox.prop("checked"));
    check_div = $(this).closest('.pl_thumbHolder');
    check_data = check_div.data('id');
    check_type = check_div.data('type');
    count = $('.countDisplay').find('.' + check_type + '_count')
    if(ckbox.prop('checked')) {
        del_arr.push(check_data);
        count.text(parseInt(count.text())+1)
        if(del_arr)
            $('.countDisplay').removeClass('hide').hide().fadeIn();
    }
    else {
        del_arr.pop(check_data);
        count.text(parseInt(count.text())-1)
        if(del_arr == '')
            $('.countDisplay').fadeOut();
    }
    $('.countDisplay').data('selection', del_arr)
});

$('#media_delete_btn').on('click', function(e){
    e.preventDefault()
    data = {
        'id': $('.countDisplay').data('selection'),
        'project_id': $('#rightView_content .pH_row').data('p-id'),
        // 'type':
    };
    var url = 'http://creathives.com/index/home/delete_media/';
    $.ajax({
        url: url,
        method: 'POST',
        data: data,
        'dataType': "json",
        'success': function (res) {
            console.log(res)
            if(res.status == 'Project not Exist')
                return
            deleteAndResetCheck(data.id)
        }
    }).error(function (r) {
        console.log(r)
    });
});

function deleteAndResetCheck(id){
    $.each(id, function (index, value) {
        $('.project_lists').find('#media-' + value).fadeOut(function() { $(this).remove() });
    });
    $('.project_lists').find('input[type=checkbox]:checked').removeAttr('checked');
    $('.countDisplay span').text('0');
    $('.countDisplay').fadeOut();
}