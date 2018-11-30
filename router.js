var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var Students = require('./student')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

var fruit = [
        {
            "title": "apple",
            "describe": "delicious"
        },
        {
            "title": "banana",
            "describe": "delicious"
        },
        {
            "title": "pear",
            "describe": "delicious"
        },
        {
            "title": "pitch",
            "describe": "delicious"
        }
    ]


router.get('/students', function(req, res) {
    Students.find(function(err, student) {
        if (err) { res.status(500).send('Server is error...') }
        res.render('index.html', {
            'fruit': fruit,
            'student': student
        })
    })
})

router.get('/students/new', function(req, res) {
    res.render('new.html')
})

router.post('/students/new', function(req, res) {
    var newStudent = req.body
    console.log(newStudent)
    new Students(newStudent).save(function(err) {
        if (err) { res.status(500).send('Server is error...') }
        res.redirect('/students')
    })

})

router.get('/students/edit', function(req, res) {
    var id = req.query.id.replace(/"/g,'')
    Students.findById(id, function(err, student) {
        if (err) { 
            res.status(500).send('Server is error...') 
        }
        // 不可以直接这样写res.render('edit.html',student),
        // 会报错Maximum call stack size exceeded
        res.render('edit.html',{
            'student': student
        })
    })
})

router.post('/students/edit', function(req, res) {
    // 必须有ID
    var edStudent = req.body
    var id = req.body.id.replace(/"/g,'')
    Students.findByIdAndUpdate(id, edStudent, function(err) {
        if (err) { res.status(500).send(err) }
        res.redirect('/students')
    })
})

router.get('/students/delete', function(req, res) {
    var id = req.query.id.replace(/"/g,'')
    Students.findByIdAndDelete(id, function(err) {
        if (err) { res.status(500).send('Server is error...') }
        res.redirect('/students')
    })
})



module.exports = router