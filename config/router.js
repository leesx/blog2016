var AppIndex = require('./../controllers/index');


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

  app.get('/member/index', Members.index);

  app.get('/article/index', Articles.index);
  app.get('/article/list', Articles.list);
  app.get('/article/detail', Articles.detail);
  app.post('/article/add', Articles.add);


  app.get('/comment/index', Comments.index);
}
