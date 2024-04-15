const express = require('express');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Оголошення змінної shoppingCart
let shoppingCart = [];  // Масив для збереження товарів у корзині

app.get('/', (req, res) => {
    res.render('index', { title: 'Продаж - купівля одягу', shoppingCart });
});

app.get('/catalog/:category', (req, res) => {
    const category = req.params.category;
    res.render('catalog', { title: category });
});

// Додамо маршрут для корзини
app.get('/cart', (req, res) => {
    res.render('cart', { title: 'Корзина', shoppingCart });
});

// Маршрут для додавання товару в корзину
app.post('/add-to-cart', (req, res) => {
    const item = req.body.item;
    shoppingCart.push(item);
    res.redirect('/cart');
});

// Маршрут для видалення товару з корзини
app.post('/remove-from-cart', (req, res) => {
    const indexToRemove = req.body.index;
    if (indexToRemove >= 0 && indexToRemove < shoppingCart.length) { // Перевірка коректності індексу
        shoppingCart.splice(indexToRemove, 1); // Видаляємо товар за вказаним індексом
    }
    res.redirect('/cart');
});

// ...

app.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});
