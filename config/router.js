var AppIndex = require('./../controllers/index');
var User = require('./../controllers/user');


var Members = require('./../controllers/members');
var Articles = require('./../controllers/articles');
var Comments = require('./../controllers/comments');

module.exports = function(app){
  // pre handle user
  // app.use(function(req, res, next) {
  //   // var _user = req.session.user
  //   //
  //   // app.locals.user = _user
  //
  //   next()
  // })
  // 路由指向 / 不能使用 use
  app.get('/', AppIndex.index);
  app.post('/api/likes', AppIndex.likes);


  app.get('/member/index', Members.index);

  //注册
  app.get('/user/reg',User.reg)
  app.post('/api/reg',User.regApi)

  //登录
  app.get('/user/login',User.login)
  app.post('/api/login',User.loginApi)

  app.get('/article', Articles.index);
  app.get('/article/search', Articles.search);
  app.get('/article/add', Articles.add);
  app.get('/article/list', Articles.list);
  app.get('/article/detail', Articles.detail,Comments.list);
  app.post('/api/articleCreate', Articles.create);
  app.post('/article/upload', Articles.upload);
  app.post('/article/remove', Articles.remove);
  app.get('/article/update', Articles.update);
  app.post('/api/articleUpdate', Articles.articleUpdate);

  app.post('/api/reply', Comments.reply);


  app.get('/comment/index', Comments.index);
  app.post('/comment/add', Comments.add);
}
