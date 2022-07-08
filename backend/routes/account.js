const express = require('express');
const router = express.Router();

router.get('/reg', (request, response) => {
    response.send('Регистрация нового пользователя');
});

router.get('/auth', (request, response) => {
    response.send('Авторизация');
});

router.get('/dashboard', (request, response) => {
    response.send('Личный кабинет пользователя');
});

module.exports = router;