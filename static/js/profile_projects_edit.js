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

/*For username and about edit*/

var $edit_icon = $('#edit-name-about');
var $edit_user_name = $('#user-name');
var $edit_about = $('#about');
var $save_icon =  $('#save-name-about');

$('#profile-name-about').hover(
        function() {
            $edit_icon.removeClass('hide');
            $edit_icon.click(function(){
                $edit_user_name.attr('contentEditable','true');
                $edit_about.attr('contentEditable','true');
                $edit_user_name.css('border-bottom','1px dashed');
                $edit_about.css('border-bottom','1px dashed');
                $edit_icon.hide();
                $save_icon.removeClass('hide');
                $save_icon.click(function(){
                    $edit_user_name.attr('contentEditable','false');
                    $edit_about.attr('contentEditable','false');
                    $edit_user_name.css('border','none');
                    $edit_about.css('border-bottom','none');
                    $edit_icon.addClass('hide');
                    $save_icon.addClass('hide');
                });
            });
        },
        function() {
            $edit_icon.addClass('hide');
        }
);

/*contact edit*/

/*var $edit_con = $('#edit-contact');
var $save_con = $('#save-contact');
var $contact = $('#contact');

$('#contact-div').hover(
    function(){
        $edit_con.removeClass('hide');
            $edit_con.click(function(){
                $contact.attr('contentEditable','true');
                $contact.css('border-bottom','1px dashed');
                $edit_con.hide();
                $save_con.removeClass('hide');
                $contact.attr('contentEditable','false');
                $contact.css('border','none');
                $edit_con.addClass('hide');
                $save_con.addClass('hide');
            });

        },
        function() {
            $edit_con.addClass('hide');
        }
);
*/

/*Add project*/
$('#proj-add').click(function(e){
    $('#proj-add').addClass('hide');
    $('.leftPanel ul>li').addClass('hide');
    $('.project_lists>.pl_thumbHolder').addClass('hide');

        /*Right Panel*/
    $('.project_lists').append(
        '<div class="pl_thumbHolder"><div class="thumb-edit-overlay"></div>' +
            '<div class="thumbnail">' +
                '<img src="/static/images/Edit/titleImage.png" alt="New Project" id="proj-new">' +
                '<div class="caption hide">' +
                    '<p>Lorem ipsum diet your text goes here...</p>' +
                    '<a href=""><img src="/static/images/Header/videos-black.png" alt="videos"></a>' +
                '</div>' +
                <!-- Portfolio Edit -->
                '<div class="thumb-edit-icons hide">' +
                    '<div class="squaredThree hide">' +
                        '<input type="checkbox" value="None" name="check" />' +
                        '<label for="test_1"></label>' +
                    '</div>' +
                    '<a href=""><img src="/static/images/Edit/img-pen.png" alt="Edit"></a>' +
                '</div>' +
            '</div> ' +
        '</div> '
    );

            /*Left Panel*/

    $('.left-panel-scroll>ul').append(
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

/*Enter Values in for Project*/
$('.media-body>h4').on('focus', function(e){
    if($(this).text().trim() == 'Project Title'){
        $(this).text('');
    }
    $('.left-panel-scroll>ul span').removeClass('hide');

    $(this).keyup(function(e){
        $('.left-panel-scroll>ul span').text($(this).text())
    });
});

$('.media-body>span').on('focus', function(e){
    if($(this).text().trim() == 'Project Type'){
        $(this).text('');
    }
});

$('.media-body>p').on('focus', function(e){
    if($(this).text().trim() == 'Enter Project Description'){
        $(this).text('');
    }
});

$('.pH_row-edit .media-left img').on('click', function(e){
    e.preventDefault();
    $('#proj-img').click();
});


/*new project and image upload*/
$('#proj-img').on('change', function(e){
    e.preventDefault();
    var $img = this.files[0];
    var $img_name = $img.name;
    var $img_ext = $img_name.substr($img_name.lastIndexOf('.')+1);
    if($img_ext!='jpeg' && $img_ext!='png' && $img_ext!='jpg'){
        return;
    }
    else {
        var img_obj = new FormData();
        //img_obj.append('name', '0');
        img_obj.append('image', $img);
        //var pdata ={'name':'0','image':$img}
        $.ajax({
            url: 'http://creathives.com/index/home/proj_create_update/',
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