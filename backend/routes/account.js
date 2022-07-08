const express = require('express');
const router = express.Router();

const User = require('../models/user');

// router.get('/reg', (request, response) => {
//     response.send('Регистрация нового пользователя');
// });

router.post('/reg', (request, response) => {
    let newUserReg = new User({
       name: request.body.name,
       email: request.body.email,
       login: request.body.login,
       password: request.body.password
    });

    // здесь непонял, что за user в коллбэк функции - откуда берется
    User.addUser(newUserReg, (err, user) => {
        if (err)
            response.json({success: false, msg: "Пользователь не был добавлен. ошибка - ", err: err})
        else
            // тут непонятрный момент и эксперимент - добавил третье поле... ошибка и юзер... посмотрю что будет выводить
            response.json({success: true, msg: "Новый пользователь успешно добавлен - ", user: user})
    });
});

router.get('/auth', (request, response) => {
    response.send('Авторизация');
});

router.get('/dashboard', (request, response) => {
    response.send('Личный кабинет пользователя');
});

module.exports = router;