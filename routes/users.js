const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gmail.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gmail.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gmail.com",
        DOB:"21-03-1989",
    },
];

// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
    let [dd, mm, yyyy] = strDate.split('-');
    return new Date(yyyy + "/" + mm + "/" + dd);
}

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Copy the code here
  res.send(JSON.stringify({users}, null, 4))//This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // Copy the code here
  const user = users.filter( user => user.email === req.params.email);
  res.send(user)//This line is to be replaced with actual return value
});

router.get("/lastName/:lastName", (req, res) => {
    const user = users.filter( user => user.lastName === req.params.lastName);
    res.send(user);
})

router.get("/dob", (req, res) => {
    
    //res.send(users.sort( (a, b) => new Date(b.DOB) - new Date(a.DOB)))
    let sorted_users = users.sort(function(a,b){
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
        return d1 - d2;
    })

    res.send("sorting dob");
})


// POST request: Create a new user
router.post("/",(req,res)=>{
  // Copy the code here
  const newUser = {
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB
  }

  users.push(newUser)

  res.send(`User ${users[users.length - 1].firstName} has been added successfully`)//This line is to be replaced with actual return value
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter(user => user.email === email);

  if (filtered_users.length > 0) {
    let filtered_user = filtered_users[0];

    let DOB = req.query.DOB;
    if (DOB) {
        filtered_user.DOB = DOB;
    }

    let firstName = req.query.firstName;
    if (firstName) (
        filtered_user.firstName = firstName
    )

    let lastName = req.query.lastName;
    if (lastName) (
        filtered_user.lastName = lastName
    )

    users = users.filter((user) => user.email != email);
    users.push(filtered_user);

    res.send(`User with the email ${email} updated`)
  } else {
    res.send("Unable to find user!")
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  const email = req.params.email;
  users = users.filter( user => user.email != email)
  res.send(`User with the email ${email} deleted`)//This line is to be replaced with actual return value
});

module.exports=router;
