$(function(){



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

    $.post('/article/add',{
      params:JSON.stringify({
        title:title,
        author:author,
        type:3,
        content:content,
        img:''
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
