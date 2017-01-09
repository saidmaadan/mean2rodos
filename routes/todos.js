var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://saidm:saidm@ds159348.mlab.com:59348/mean2todos',['todos']);

//Get Todos
router.get('/todos', function(req, res, next){
  db.todos.find(function(err, todos){
    if(err){
      res.send(err);
    }else{
      res.json(todos);
    }
  });
});

//Single Todo
router.get('/todo/:id', function(req, res, next){
  db.todos.findOne({
    _id: mongojs.ObjectId(req.params.id)
  },function(err, todo){
    if(err){
      res.send(err);
    }else{
      res.json(todo);
    }
  });
});

//Post Todo
router.post('/todo', function(req,res, next){
  var todo = req.body;
  if(!todo.text || !(todo.isCompleted + '')){
    res.status(400);
    res.json({
      "error": "Invalid data"
    });
  }else{
    db.save(todo, function(err, result){
      if(err){
        res.send(err);
      }else{
        res.json(result);
      }
    });
  }
});

//Update Todo
router.put('/todo/:id', function(req,res, next){
  var todo = req.body;
  var updatedObj = {};
  
  if(todo.isCompleted){
    updatedObj.isCompleted = todo.isCompleted;
  }

  if(todo.text){
    updatedObj.text = todo.text;
  }
  if(!updatedObj){
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  }else{
    db.todod.update({
      _id: mongojs.ObjectId(req.params.id)
    }, updatedObj, {}, function(err, result){
      if(err){
        res.send(err);
      }else{
        res.json(result);
      }
    });
  }
});

//Delete Todo
router.delete('/todo/:id', function(req,res, next){
  db.todod.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, '', function(err, result){
    if(err){
      res.send(err);
    }else{
      res.json(result);
    }
  });
});

module.exports = router;