let express = require('express');
let todoController = require('./controllers/todoController');

let app = express();

//настройка шаблона
app.set('view engine', 'ejs');

//статические файлы
app.use(express.static('./public'));

//запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});

//контроллеры
todoController(app);