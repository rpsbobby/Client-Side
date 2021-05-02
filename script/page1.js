// generate Random Users
const randomUserContainer = document.getElementById('users');

(function getRandom() {
  fetch('https://randomuser.me/api/')
    .then((response) => response.json())
    .then((data) => {
      let results = data.results[0];
      console.log(results);
      let { title, first, last } = { ...results.name };
      let email = results.email;
      let pic = results.picture.medium;
      let phoneNo = results.phone;
      let output = `<div class="card">
          <div class="card-body">
          <img src=${pic} alt="" class="img-fluid card-img-top rounded-circle"/>
          <h3>${title}, ${last} ${first}</h3>
          <h5 class="text-muted">${country}</h5>
          <p>
          Phone Number: ${phoneNo}
          Email: ${email}
          </p>
          </div>
          </div>`;

      randomUserContainer.innerHTML = output;
    })
    .catch((err) => console.log(err));
})();

// let output = '<h2>Users</h2>';
// data.forEach(function (user) {
//   output += `
//   <div>
//   <h3>${user.name}
//   <ul>
//   <li>ID ${user.id}</li>
//   <li>Name ${user.email}</li>
//   <li>Address longtitude ${user.address.geo.lng}</li>
//   </div>`;
// });

// document.getElementById('output').innerHTML = output;
// document.getElementById('output').innerHTML = data;

/**
 *  <div class="card">
              <div class="card-body">
                <img
                  src=${pic}
                  alt=""
                  class="img-fluid card-img-top rounded-circle"
                />
                <h3>${title}, ${last} ${first}</h3>
                <h5 class="text-muted">${country}</h5>
                <p>
                  Phone Number: ${phoneNo}
                  Email: ${email}
                </p>
              </div>
            </div>
 */
