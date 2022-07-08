const express = require('express');
const router = express.Router();

const User = require('../models/user');

const config = require('../config/db');
const passport = require('passport');
const jwt = require('jsonwebtoken');

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

router.post('/auth', (request, response) => {
    const login = request.get('login'); // TODO: должно сработать и так!
    // const login = request.body.login; // если нет...
    const passw = request.body.password;
    User.getUserByLogin(login, (err, user) => {
        if (err) throw err;
        if (!user)
            return response.json({success: false, msg: "Пользователь " + user + " в БД не найден"})

        User.comparePassw(passw, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 3600 * 24 // авторизуем пользователя на сутки
                });

                return response.json({
                    success: true,
                    token: 'JWT' + token,
                    user: {
                        id: user._id, // TODO: id
                        name: user.name,
                        login: user.login,
                        email: user.email
                    }
                });
            } else
                return response.json({success: false, msg: "Пароли не совпадают! " + passw})
        });
    });
});

// TODO: переадресация на свою страницу игры...
// если юзер не авторизован, сессия = false, на страничку dashboard - в моем случае пределать, на страницу game его не пустит!!!
router.get('/dashboard',
    passport.authenticate('jwt', {session: false}),
    (request, response) => {
        response.send('Личный кабинет пользователя');
    });

module.exports = router;