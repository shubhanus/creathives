/**
 * Created by shugar on 21/3/16.
 */


var mediaHandler = {
    appendMedia:function(data){

    }
};


$('.project-sq').on('click', function(e){
    var self = $(this);
    var id = self.closest('li').find('a').attr('data-project-id');
    var url = 'http://creathives.com/index/home/get_project_media/';
    //data = id;
    //$.ajax({
    //        url: url,
    //        method: 'POST',
    //        data: JSON.stringify(data),
    //        'dataType': "json",
    //        'success': function (res) {
    //
    //        }
    //}).error(function (r) {
    //    console.log(r)
    //})
});

