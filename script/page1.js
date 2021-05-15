// Password Validation
const paswordField = document.getElementById('password');
const regEx =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm;
const btnLogIn = document.getElementById('btnLogIn');
const feedback = document.getElementById('feedback');

const validate = function () {
  //setting password to input field
  const password = String(paswordField.value);
  if (!password.match(regEx)) {
    paswordField.classList.add('is-invalid');
    feedback.classList.remove('hide');
  } else {
    btnLogIn.classList.remove('disabled');
    paswordField.classList.remove('is-invalid');
    paswordField.classList.add('is-valid');
    feedback.classList.add('hide');
    //if password is valid login button is enabled
    btnLogIn.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('loginJumbo').classList.add('d-none');
      document.getElementById('website').classList.remove('d-none');
    });
  }
};

paswordField.addEventListener('keyup', function (e) {
  e.preventDefault();
  validate();
});

// // generate Random Users
getUsers();
const randomUserContainer = document.getElementById('users');
function getUsers() {
  for (let i = 0; i < 5; i++) {
    //fetch for API data
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === 'undefined') {
          console.log(undefined);
        } else {
          // assigning reqired information
          let results = data.results[0];
          let { title, first, last } = { ...results.name };
          let email = results.email;
          let pic = results.picture.large;
          let phoneNo = results.phone;
          let { city, _a, country, _b, _c, street } = results.location;
          let { name, number } = { ...street };
          // outputing to DOM
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
}

//    Menu

// Menu Items
const starters = {
  0: { name: 'chickenWings', price: 8.99, vegeterian: false },
  1: { name: 'cesarSalad', price: 6.49, vegeterian: true },
  2: { name: 'garlicBread', price: 4.99, vegeterian: true },
  3: { name: 'sautePrawns', price: 8.99, vegeterian: false },
};
const mains = {
  0: { name: 'ribeye', price: 23.99, vegeterian: false },
  1: { name: 'vegLasagne', price: 14.99, vegeterian: true },
  2: { name: 'salmon', price: 18.99, vegeterian: false },
  3: { name: 'chicken', price: 12.99, vegeterian: false },
};

const desserts = {
  0: { name: 'brulee', price: 5.99, vegeterian: true },
  1: { name: 'brownie', price: 5.99, vegeterian: true },
  2: { name: 'tart', price: 5.99, vegeterian: true },
};

const drinks = {
  0: { name: 'softDrinks', price: 2.99, vegetarian: true },
  1: { name: 'wine', price: 5.99, vegetarian: true },
  2: { name: 'beer', price: 5.99, vegetarian: true },
};

// add buttons
const startedBtnAdd = document.getElementById('starterBtnAdd');
const mainsBtnAdd = document.getElementById('mainsBtnAdd');
const dessertsBtnAdd = document.getElementById('dessertsBtnAdd');
const drinksBtnAdd = document.getElementById('drinksBtnAdd');
const paidBtn = document.getElementById('paid');

// cost output fields

const starterVeg = document.getElementById('starterVeg');
const starterNonVeg = document.getElementById('starterNonVeg');
const starterTotal = document.getElementById('starterTotal');
const mainVeg = document.getElementById('mainVeg');
const mainNonVeg = document.getElementById('mainNonVeg');
const mainTotal = document.getElementById('mainTotal');
const dessertTotal = document.getElementById('dessertsTotal');
const drinksTotal = document.getElementById('drinksTotal');
const total = document.getElementById('total');

// cost arrays - set up as objects so data can be manipulated easily

let startersSum = {
  total: [],
  veg: [],
  nonVeg: [],
};
let mainsSum = {
  total: [],
  veg: [],
  nonVeg: [],
};
let dessertsSum = {
  total: [],
  veg: [],
  nonVeg: [],
};
let drinksSum = {
  total: [],
  veg: [],
  nonVeg: [],
};
let totalCost = [startersSum, mainsSum, dessertsSum, drinksSum];

// methods

// display number to 2 decimals points
const dispEuro = function (n) {
  return `€${n.toFixed(2)}`;
};

// calculate sum of a array
const calcSum = (a) =>
  a.flat().reduce((sum, current) => {
    sum += current;
    return sum;
  }, 0);

// breakdown fields updated
const updateBreakdown = function (array) {
  const [starters, mains, desserts, drinks] = [...array];

  const totVal = starters.total
    .concat(mains.total)
    .concat(desserts.total)
    .concat(drinks.total);

  starterVeg.innerHTML = dispEuro(calcSum(starters.veg.flat()));
  starterNonVeg.innerHTML = dispEuro(calcSum(starters.nonVeg.flat()));
  starterTotal.innerHTML = dispEuro(calcSum(starters.total.flat()));
  mainVeg.innerHTML = dispEuro(calcSum(mains.veg.flat()));
  mainNonVeg.innerHTML = dispEuro(calcSum(mains.nonVeg.flat()));
  mainTotal.innerHTML = dispEuro(calcSum(mains.total.flat()));
  dessertTotal.innerHTML = dispEuro(calcSum(desserts.total.flat()));
  drinksTotal.innerHTML = dispEuro(calcSum(drinks.total.flat()));
  total.innerHTML = dispEuro(calcSum(totVal));
};

const addToOrder = function (menuItems, courseSumObject) {
  Object.entries(menuItems).forEach(([i, currenItem]) => {
    // obtaining dom element and multipling
    let temp = document.getElementById(`${currenItem.name}`);
    let price = Number(currenItem.price);
    let quantity = Number(temp.value);
    // testing for numbers
    if (isNaN(quantity)) {
      return (quantity = 0);
    }

    let sum = price * quantity;
    // adding to arrays based on type
    if (sum !== 0) {
      courseSumObject.total.push(sum);

      if (menuItems[i].vegeterian) {
        courseSumObject.veg.push(sum);
      } else {
        courseSumObject.nonVeg.push(sum);
      }
    }
  });

  cleanInputFields(menuItems);
  updateBreakdown(totalCost);
};

const cleanInputFields = function (menuItems) {
  Object.entries(menuItems).forEach(([_i, currenItem]) => {
    document.getElementById(`${currenItem.name}`).value = 0;
  });
};

// event handlers for menu section

startedBtnAdd.addEventListener('click', function (e) {
  e.preventDefault();
  addToOrder(starters, startersSum);
});

mainsBtnAdd.addEventListener('click', function (e) {
  e.preventDefault();
  addToOrder(mains, mainsSum);
});

dessertsBtnAdd.addEventListener('click', function (e) {
  e.preventDefault();
  addToOrder(desserts, dessertsSum);
});

drinksBtnAdd.addEventListener('click', function (e) {
  console.log('drinks added');
  e.preventDefault();
  addToOrder(drinks, drinksSum);
});

// testing

const displayData = function (_array) {
  totalCost.forEach((el, i) => {
    window.localStorage.setItem(i, el.total);
    // window.localStorage.setItem(i, el.veg);
    // window.localStorage.setItem(i, el.nonVeg);
  });
};

// when paid button is pressed data is send to localWindow for further display(page 2) and arrays get reset 
paidBtn.addEventListener('click', function (e) {
  e.preventDefault();
  window.localStorage.clear();
  displayData(totalCost);
  totalCost.map((obj) => {
    obj.total = [];
    obj.veg = [];
    obj.nonVeg = [];
  });
  updateBreakdown(totalCost);
});
