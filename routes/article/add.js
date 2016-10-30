var express = require('express');
var router = express.Router();
var db = require('./../../common/db')

/* Post add. */
router.post('/', function(req, res, next) {
    console.log('================',req.body)
    var params = JSON.parse(req.body.params)
    console.log(params)
    db.collection('articles').insert(params,function(err, result) {
      if (err) throw err;
      console.log('-----',result);
      res.send({ rs:'ok' });
    });
});

module.exports = router;
