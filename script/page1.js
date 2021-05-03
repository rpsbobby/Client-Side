// Menu Items
const starters = {
  0: { name: 'chicken wings', price: 8.99, vegeterian: false },
  1: { name: 'cesar salad', price: 6.49, vegeterian: true },
  2: { name: 'garlic bread', price: 4.99, vegeterian: true },
  3: { name: 'saute prawns', price: 8.99, vegeterian: false },
};
const mains = {
  0: { name: 'ribeye', price: 23.99, vageterin: false },
  1: { name: 'veg lasagne', price: 14.99, vageterin: true },
  2: { name: 'salmon', price: 18.99, vageterin: false },
  3: { name: 'chicken', price: 12.99, vageterin: false },
};

const desserts = {
  1: { name: 'brulee', price: 5.99, vageterin: true },
  2: { name: 'brownie', price: 5.99, vageterin: true },
  3: { name: 'tart', price: 5.99, vageterin: true },
};

const drinks = {
  0: { name: 'softDrinks', price: 2.99 },
  1: { name: 'wine', price: 5.99 },
  2: { name: 'beer', price: 5.99 },
};

const menu = [starters, mains, desserts, drinks];
console.log(menu);

// Password Validation

const paswordField = document.getElementById('password');
const regEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm;
const btnLogIn = document.getElementById('btnLogIn');
const feedback = document.getElementById('feedback');

paswordField.addEventListener('keyup', function (e) {
  e.preventDefault();
  const password = String(paswordField.value);
  if (!password.match(regEx)) {
    paswordField.classList.add('is-invalid');
    feedback.classList.remove('hide');
  } else {
    btnLogIn.classList.remove('disabled');
    paswordField.classList.remove('is-invalid');
    paswordField.classList.add('is-valid');
    feedback.classList.add('hide');
  }
});
// // generate Random Users
const randomUserContainer = document.getElementById('users');

const getUsers = function getRandom() {
  for (let i = 0; i < 5; i++) {
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (typeof data === 'undefined') {
          console.log(undefined);
        } else {
          // console.log(data);
          let results = data.results[0];
          // console.log(results);
          let { title, first, last } = { ...results.name };
          let email = results.email;
          let pic = results.picture.large;
          let phoneNo = results.phone;
          let { city, _a, country, _b, _c, street } = results.location;
          let { name, number } = { ...street };
          let output = `
        <div class="card">
        <div class="card-body">
        <div class="row">
        <div class="col-md-3 py-3">
        <img src=${pic} alt="picture" class="img-fluid  rounded-circle"/>
        </div>
        <div class="col-md-9">
        <h3>${title}, ${last} ${first}</h3>
        <h5 class="text-muted">Address:</h5>
        Street: ${name}, No: ${number}, ${city}, ${country};
        <p>
        Phone Number: ${phoneNo}</bh>
        Email: ${email}
        </p>
        </div>
        </div>
        </div>
        </div>`;
          randomUserContainer.insertAdjacentHTML('afterend', output);
        }
      })
      .catch((err) => console.log(err));
  }
};

btnLogIn.addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('loginJumbo').classList.add('d-none');
  document.getElementById('website').classList.remove('d-none');
  getUsers();
});
