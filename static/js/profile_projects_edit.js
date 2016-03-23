/**
 * Created by shugar on 14/3/16.
 */
var new_proj_id=0;

$(function(){
    $.ajaxSetup({
       headers: {'X-CSRFToken': getCookie("csrftoken")}
   });
    //console.log(new_proj_id);
});

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
            $save_icon.removeClass('hide');
            $edit_user_name.attr('contentEditable','true');
            $edit_about.attr('contentEditable','true');
            $edit_user_name.css('border-bottom','1px dashed');
            $edit_about.css('border-bottom','1px dashed');
            $edit_icon.hide();
        })
    })
    .mouseleave(function() {
        $edit_icon.addClass('hide');
    });

$save_icon.on('click',function(){
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
    $('#proj-add').addClass('hide');
    $('.leftPanel ul>li').addClass('hide');
    $('.project_lists>.pl_thumbHolder').addClass('hide');
    var count = parseInt($('.lp_title>span').attr('data-count'));
    $('.lp_title>span').attr('data-count', ++count);
    $('.lp_title>span').text(count);

    //    /*Right Panel*/
    //$('.project_lists').append(
    //    '<div class="pl_thumbHolder"><div class="thumb-edit-overlay"></div>' +
    //        '<div class="thumbnail">' +
    //            '<img src="/static/images/Edit/titleImage.png" alt="New Project" id="proj-new">' +
    //            '<div class="caption hide">' +
    //                '<p>Lorem ipsum diet your text goes here...</p>' +
    //                '<a href=""><img src="/static/images/Header/videos-black.png" alt="videos"></a>' +
    //            '</div>' +
    //            <!-- Portfolio Edit -->
    //            '<div class="thumb-edit-icons hide">' +
    //                '<div class="squaredThree hide">' +
    //                    '<input type="checkbox" value="None" name="check" />' +
    //                    '<label for="test_1"></label>' +
    //                '</div>' +
    //                '<a href=""><img src="/static/images/Edit/img-pen.png" alt="Edit"></a>' +
    //            '</div>' +
    //        '</div> ' +
    //    '</div> '
    //);

            /*Left Panel*/

    $('.left-panel-scroll>ul').prepend(
        '<li>' +
            '<a href="#">' +
                '<img src="/static/images/Edit/titleImage.png" alt="New Project">' +
                '<span class="hide">PROJECT TITLE</span>' +
                '<div class="overLay hide"></div>' +
                '<!-- Portfolio Edit -->' +
                '<img src="/static/images/Edit/empty-trash.png" class="emptyTrash hide" alt="delete">' +
                '<img src="/static/images/Edit/trash.png" class="deleteTrash hide" alt="delete">' +
            '</a>' +
            <!-- Delete Prompt -->
            '<div class="deletePrompt hide">' +
                '<h4>Are you sure?</h4>' +
                '<a href="">Cancel</a>' +
                '<a href="">Yes, Delete</a>' +
            '</div>' +
        '</li>'
    );
        $('.pH_row-edit').removeClass('hide');
});

/*---------------------------Get and Update Values for new Project--------------------------------------*/


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
        field.html('&nbsp;');
        field.css('border-color', '#ddd');
        field.css('color', '#000');
    },
    Require: function (field, msg){
        field.css('border-color', 'red');
        field.text(msg);
        field.css('color', 'red');
    },
    check_empty: function(field, msg1, msg2){
        val = field.text().trim();
        if(val == msg1 || val == msg2) return true;
        else return false;
    },
    checkDetails : function(){
        if(validation.check_empty(proj_title, 'Project Title', 'Enter Project Title')){
            validation.Require(proj_title, 'Enter Project Title');
            return false;
        }
        if(validation.check_empty(proj_type, 'Project Type', '')){
            validation.Require(proj_type, 'Enter Project Type');
            return false;
        }
        if(validation.check_empty(proj_type, 'Enter Project Type', '')){
            validation.Require(proj_type, 'Enter Project Type');
            return false;
        }
        else return true;
    }
};

/*-----------------------------------------*/

/*new project data insert*/


proj_title.on('focusin', function(e){
    if(validation.check_empty($(this), 'Project Title', 'Enter Project Title'))
        validation.ReDefault($(this));
    $('.left-panel-scroll>ul span').removeClass('hide');
    $(this).keyup(function(e){
        $('.left-panel-scroll>ul span').text($(this).text())
    });
});

proj_title.focusout(function(e){
    if(validation.check_empty($(this), 'Project Title', '')) {
        validation.Require($(this), 'Enter Project Title');
        return;
    }
    else
        project_title = $(this).text().trim();

    var data = {
        'title': project_title
    };
    update_project_name(data);
});


proj_type.on('focusin', function(e){
    if(validation.check_empty($(this), 'Project Type', 'Enter Project Type'))
        validation.ReDefault($(this));
});

proj_type.focusout(function(e){
    if(validation.check_empty($(this), 'Project Type', '')){
        validation.Require($(this), 'Enter Project Type');
        return;
    }
    else if(proj_title.text().trim()== ''){
        proj_title.css('border-color', 'red');
        proj_title.text('Enter Project Title');
        proj_title.css('color', 'red');
    }
    else{
        project_type = $(this).text().trim();
    }
    var data = {
        'type': project_type
    };
    update_project_name(data);
});

proj_desc.on('focusin', function(e){
    if($(this).text().trim() == 'Enter Project Description'){
        $(this).text('');
    }
});

proj_desc.focusout(function(e){
    if(validation.check_empty($(this), 'Enter Project Description', '')) return;
    else{
        project_desc = $(this).text().trim();
        data = {
            'desc' : project_desc
        };
        update_project_name(data);
    }
});

/*|----------------------------------------------------------------------------------------------------------|*/



/*----------------------------------------input upload click----------------------------------------------------*/

$('.pH_row-edit .media-left img').on('click', function(e){
    e.preventDefault();
    $('#proj-img').click();
});


/*new project and image upload*/
$('#proj-img').on('change', function(e){
    e.preventDefault();
    console.log(e);
    var $img = this.files[0];
    var $img_name = $img.name;
    var $img_ext = $img_name.substr($img_name.lastIndexOf('.')+1);
    if($img_ext!='jpeg' && $img_ext!='png' && $img_ext!='jpg'){
        $(this).css('border-color', 'red');
        return;
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
                data = JSON.parse(res);
                $('.pH_row-edit .media-left img').attr('src', data.image_url);
                $('.project_lists img').attr('src', data.image_url);
                $('.left-panel-scroll>ul img').attr('src', data.image_url);
                new_proj_id = data.id;
            }
        }).error(function (r) {
            console.log(r)
        })
    }
     //console.log(new_proj_id);
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
    //console.log(e);
    var $img = this.files[0];
    //console.log($img);
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
    //console.log($img);
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
		$(this).closest('li').find('.deletePrompt').addClass('hide');
        e.stopPropagation();

});

$('.yes').on('click', function(e){
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
            'video' : ['avi','mp4','m4v','3gp'],
            'track' : ['mp3','wav'],
            'image' : ['png','jpg','jpeg'],
            'article' : ['doc','docx','pdf']
        };

        for(var i= 0;i<files.length;i++) {
            var file_name = files[i].name;
            var ext = file_name.substr(file_name.lastIndexOf('.') + 1);
            if(approved_formats[type].indexOf(ext) <0){
                validation = false;
            }else{
                validation = true;
            }

            if(validation){
                $('.media-tabs .error_message').hide();

            }else{
                var val = 'Approved Formats: '+approved_formats[type].join(', ');
                $('.media-tabs .error_message').show();
                $('.media-tabs .error_message .info-popup').attr('data-content',val)
            }
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
    console.log(e);
    //data_type = e.type;
    var files = e.target.files;
    console.log(files[0]);
    var name = files[0].name;
    console.log(name);
    console.log(validation.checkDetails());

    if(!validateUploadedMediaFormat(data_type, files)){
        console.log('wrong file type');
        return;
    }

    $('.body-overlay').fadeIn();
    $('.video-modal').fadeIn();

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
        'success': function (res) {
            data = JSON.parse(res);
            //console.log(data.image_url);
            $('.mediaplayer iframe').attr('src', data.image_url);
            $('.video-thumbnails li img').attr('src', data.image_url);
            $('.video-viewer img').attr('src', data.image_url);
            $('.video-desc h5').first().text(name);
            $('.video-desc h4').first().text(data_type+' Details');
        }
    }).error(function (r) {
        console.log(r)

    });
    //$('.icn').show();
});



/*---------------------------------------------------------------------------------------------*/

/*----------------get project media and details-------------------------*/

$('.project-sq').on('click', function (e) {
    id = $(this).find('a').attr('data-project-id');
    var url = 'http://creathives.com/index/home/get_project_details/'+id+'/';
    $.ajax({
            url: url,
            method: 'GET',
            'success': function (res) {
                //console.log(res);
                //$('#rightView_content>.pH_row').removeClass('hide');
                $('.pH_row-edit .media-left img').attr('src', res.url_thumb_img);
                $('.media-body h4').text(res.title);
                $('.media-body span').text(res.type);
                $('.media-body p').text(res.description);
                new_proj_id = id;
                //getMedia()
                //    /*Right Panel*/


            }
        }).error(function (r) {
            console.log(r);
        });
        e.stopPropagation();
});

function getMedia(){
    $.each()

}

/*----------------------------------------------------------------------*/