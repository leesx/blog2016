$(function(){


  var uploadImgName = ''
  $('#fileInput').on('change',function(){
     var oFormData = new FormData()
     oFormData.append('myfile',this.files[0])
    console.log(this.files[0])

    var oFormData = new FormData()

    console.log(this.files[0])

    oFormData.append('myfile',this.files[0])

    var xhr = new XMLHttpRequest()
    xhr.open('post','/article/upload',true)
    xhr.onload = function(){
      if(this.status === 200){

            var data = xhr.responseText
            //console.log(data.imgUrl)
            uploadImgName = data;
            $('#uploadImg').attr('src',data).width(100)
        }
    }
    xhr.send(oFormData)

    // $.ajax({
    //         url: '/article/upload',
    //         data: oFormData,
    //         processData: false,
    //         type: 'POST',
    //         contentType: 'multipart/form-data',
    //         mimeType: 'multipart/form-data',
    //         success: function (data) {
    //             alert(data);
    //         }
    //     });
  })


  $('#submit').on('click',function(){

    var title = $('#title').val().trim()
    var author = $('#author').val().trim()
    var $type = $('#article-type')
    var content = $('#content').val().trim()
    var files = $('#fileInput').val()
    console.log(title)
    // if(!title || !conetnt){
    //   return false;
    // }
    //


    $.post('/article/add',{
      params:JSON.stringify({
        title:title,
        author:author,
        type:3,
        content:content,
        img:uploadImgName,
      })
    },function(data){
        if(data.rs == 'ok'){
          alert('添加成功！')
          location.href="/article/list"
        }
    },'json')

    return false;

  })
})
