const express = require('express');
let books = require("./booksdb.js");
const { authenticated } = require('./auth_users.js');
const jwt = require('jsonwebtoken');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
        return user.username === username
    });
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!doesExist(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User registered successfully, please log in" })
        }
        else {
            return res.status(404).json({ message: "User already exists" });
        }
    }
    return res.status(404).json({ message: "Unable to register user" })
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise resolved")
        }, 6000)
    })

    myPromise.then(() => {
        res.send(JSON.stringify({ books }, null, 4))
    })
        //Write your code here
        ;
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here

    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise resolved")
        }, 6000)
    })

    myPromise.then(() => {
        const isbn = req.params.isbn;
        res.send(isbn);
    })

});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise resolved")
        }, 6000)
    })

    myPromise.then(() => {
        const authorName = req.params.author;
        let bookAvailable = [];
        for (let key in books) {
            if (books[key].author === authorName) {
                bookAvailable.push(books[key]);
            }
        }
        res.send(bookAvailable)
    })

});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise resolved")
        }, 6000)
    })

    myPromise.then(() => {
        const title = req.params.title;
        let titleAvailable = [];
        for (let key in books) {
            if (books[key].title === title) {
                titleAvailable.push(books[key]);
            }
        }
        res.send(titleAvailable)
    })

});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    let reviewAvailable = '';
    for (let key in books) {
        if (books[key].isbn && books[key].reviews[isbn]) {
            reviewAvailable = books[key].reviews[isbn];
        }
    }
    return res.send(reviewAvailable);
});

module.exports.general = public_users;
