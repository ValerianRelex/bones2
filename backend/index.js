const express = require('express'); // позволяет управлять эндпоинтами...
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

// для подключения к БД
const config = require('./config/db');
// дабы не перегружать этот файлы, вынесли отдельно в другой файл (и папку)
const account = require('./routes/account')

// переменная для отслеживания URL адресов
const app = express();

const port = 3000;

// инициализируем библиотеку авторизации и укажем, что будем использовать сессии
// app.use(session({ … }));
app.use(passport.initialize());
app.use(passport.session());
// эта запись не совсем понятна...
require('./config/passport')(passport);

app.use(cors());

// парсер для получения данных из POST запросов
app.use(bodyParser.json());

// Здесь нужно будет установить путь до файла index.html из модуля фронт на энгуляр
// А папку PUBLIC нужно будет удалить!? если не пригодится...
app.use(express.static(path.join(__dirname, 'public')))

// подключаемся к БД, адрес из файла конфига, значение переменной .db
mongoose.connect(config.db);

// проверяем события - если 'connected' или если 'error'
mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo DB - SUCCESS!')
});

mongoose.connection.on('error', (error) => {
    console.log('Connected to Mongo DB - FAILED! ' + error);
});

app.get('/', (request, response) => {
    response.send('Ура, главная страничка запущена! И nodemon установлен');
});

app.use('/account', account);

// запуск сервера
app.listen(port, () => {
    console.log("Server starts on port: " + port);
})