// generate Random Users
const randomUserContainer = document.getElementById('users');

// (function getRandom() {
//   for (let i = 0; i < 5; i++) {
//     fetch('https://randomuser.me/api/')
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         if (typeof data === 'undefined') {
//           console.log(undefined);
//         } else {
//           // console.log(data);
//           let results = data.results[0];
//           // console.log(results);
//           let { title, first, last } = { ...results.name };
//           let email = results.email;
//           let pic = results.picture.large;
//           let phoneNo = results.phone;
//           let { city, _a, country, _b, _c, street } = results.location;
//           let { name, number } = { ...street };
//           let output = `<div class="card col-md-12 mb-3">
//           <div class="card-body">

//           <img src=${pic} alt="" class="img-fluid  rounded-circle  col-md-3"/>

//           <div class="float-right col-md-9">
//           <h3>${title}, ${last} ${first}</h3>
//           <h5 class="text-muted">Address:</h5>
//           Street: ${name}, No: ${number}, ${city}, ${country};
//           <p>
//           Phone Number: ${phoneNo}</bh>
//           Email: ${email}
//           </p>
//           </div>
//           </div>
//           </div>`;
//           randomUserContainer.insertAdjacentHTML('afterend', output);
//         }
//       })
//       .catch((err) => console.log(err));
//   }
// })();
