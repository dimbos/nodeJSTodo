let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let url ='mongodb://localhost:27017/todos';


mongoose.connect(url, {useNewUrlParser: true});

mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let todoSchema = new Schema({
    item: String,
});


let Todo = mongoose.model('Todo', todoSchema);

let urlencoderParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {

    app.get('/todo', (req, res) => {
            //получаем данные из БД и передаем их в качестве контекста в render
        Todo.find({}, (err, data) => {
            if(err)
                throw err;
            res.render('todo', {todos: data});
            //mongoose.disconnect();
        });
        
    });

    app.post('/todo', urlencoderParser, (req, res) => {
        //получаем данные с формы и записывааем их в БД
        let newTodo = new Todo(req.body);
        newTodo.save((err, data) => {
            if (err)
                throw err;
            res.json(data);
           // mongoose.disconnect();
        });

    });

    app.delete('/todo/:item', (req, res) => {
        //удаляем записи в БД
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove((err, data) => {
            if(err)
                throw err;
            res.json(data);
           // mongoose.disconnect();
        });
        
    });
};