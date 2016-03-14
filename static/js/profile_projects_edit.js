/**
 * Created by shugar on 14/3/16.
 */

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
