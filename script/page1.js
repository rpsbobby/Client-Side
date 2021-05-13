// Password Validation
const paswordField = document.getElementById('password');
const regEx =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm;
const btnLogIn = document.getElementById('btnLogIn');
const feedback = document.getElementById('feedback');

const validate = function () {
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
};

paswordField.addEventListener('keyup', function (e) {
  e.preventDefault();
  validate();
});

// // generate Random Users
const randomUserContainer = document.getElementById('users');
const getUsers = function getRandom() {
  for (let i = 0; i < 5; i++) {
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((data) => {
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
  1: { name: 'brulee', price: 5.99, vegeterian: true },
  2: { name: 'brownie', price: 5.99, vegeterian: true },
  3: { name: 'tart', price: 5.99, vegeterian: true },
};

const drinks = {
  0: { name: 'softDrinks', price: 2.99 },
  1: { name: 'wine', price: 5.99 },
  2: { name: 'beer', price: 5.99 },
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

// cost arrays

let startersSum = {
  total: [],
  veg: [],
  nonVeg: [],
}; // total / veg / nonveg
let mainsSum = {
  total: [],
  veg: [],
  nonVeg: [],
}; // total / veg / nonveg
let dessertsSum = {
  total: [],
  veg: [],
  nonVeg: [],
}; // total / veg / nonveg
let drinksSum = {
  total: [],
  veg: [],
  nonVeg: [],
}; // total / veg / nonveg
let totalCost = [startersSum, mainsSum, dessertsSum, drinksSum];

// methods

const dispEuro = function (n) {
  return `€${n.toFixed(2)}`;
};

const calcSum = (a) =>
  a.flat().reduce((sum, current) => {
    sum += current;
    return sum;
  }, 0);

const updateBreakdown = function (array) {
  // const [totStarters, vegStarers, nonVegStarters] = [
  //   ...array.slice(0, 1).flat(),
  // ];

  const [starters, mains, desserts, drinks] = [...array];

  // const [totMain, vegMain, nonVegMain] = [...array.slice(1, 2).flat()];
  // const dessertTotalVal = array[2][0];
  // const drinksTotalVal = array[3][0];
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
    let temp = document.getElementById(`${currenItem.name}`);
    let price = Number(currenItem.price);
    let quanity = Number(temp.value);

    let sum = price * quanity;
    if (sum !== 0) {
      courseSumObject.total.push(sum);
      console.log(`number ${sum} added to ${courseSumObject.total} total`);

      if (menuItems[i].vegeterian) {
        courseSumObject.veg.push(sum);
        console.log(`number ${sum} added to ${courseSumObject.veg} veg`);
      } else {
        courseSumObject.nonVeg.push(sum);
        console.log(`number ${sum} added to ${courseSumObject.nonVeg} nonveg`);
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
  e.preventDefault();
  addToOrder(drinks, drinksSum);
});

paidBtn.addEventListener('click', function (e) {
  e.preventDefault();
  totalCost.map((obj) => {
    obj.total = [];
    obj.veg = [];
    obj.nonVeg = [];
  });
  updateBreakdown(totalCost);
});
