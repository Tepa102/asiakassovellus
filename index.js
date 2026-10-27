
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Mallimoottori
app.set('view engine', 'pug');

// Lomaketietojen käsittely
app.use(express.urlencoded({ extended: true }));

// Asiakastiedot
let customers = [
  {
    id: '1588323375416',
    firstname: 'John',
    lastname: 'Johnson',
    email: 'john@johnson.com',
    phone: '8233243'
  },
  {
    id: '1588323375417',
    firstname: 'Mary',
    lastname: 'Smith',
    email: 'mary@smith.com',
    phone: '6654113'
  },
  {
    id: '1588323375418',
    firstname: 'Peter',
    lastname: 'North',
    email: 'peter@north.com',
    phone: '901176'
  }
];

// Etusivu: asiakaslista
app.get('/', (req, res) => {
  res.redirect('/customers');
});

// Lista kaikista asiakkaista
app.get('/customers', (req, res) => {
  res.render('customers', {
    title: 'Asiakaslista',
    customers: customers
  });
});

// Lomake: uusi asiakas
app.get('/customers/add', (req, res) => {
  res.render('add-customer', {
    title: 'Lisää asiakas'
  });
});

// Uuden asiakkaan tallentaminen
app.post('/customers/add', (req, res) => {
  const { firstname, lastname, email, phone } = req.body;

  if (!firstname?.trim() || !lastname?.trim() ||
      !email?.trim() || !phone?.trim()) {
    return res.status(400).send('Kaikki kentät ovat pakollisia.');
  }

  const newCustomer = {
    id: Date.now().toString(),
    firstname: firstname.trim(),
    lastname: lastname.trim(),
    email: email.trim(),
    phone: phone.trim()
  };

  customers.push(newCustomer);

  res.redirect('/customers');
});

// Käynnistys
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä: http://localhost:${PORT}`);
});
