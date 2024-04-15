const express = require('express');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


let shoppingCart = []; 

app.get('/', (req, res) => {
    res.render('index', { title: 'Продаж - купівля одягу', shoppingCart });
});

app.get('/catalog/:category', (req, res) => {
    const category = req.params.category;
    res.render('catalog', { title: category });
});


app.get('/cart', (req, res) => {
    res.render('cart', { title: 'Корзина', shoppingCart });
});


app.post('/add-to-cart', (req, res) => {
    const item = req.body.item;
    shoppingCart.push(item);
    res.redirect('/cart');
});

app.post('/remove-from-cart', (req, res) => {
    const indexToRemove = req.body.index;
    if (indexToRemove >= 0 && indexToRemove < shoppingCart.length) { 
        shoppingCart.splice(indexToRemove, 1); 
    }
    res.redirect('/cart');
});

// ...

app.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});
