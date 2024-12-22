const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (isbn) {
    const book = books[isbn];
    if (book) {
      res.send(book);
    }
    else {
      res.status(404).send(`No book found with ISBN ${isbn}`);
    }
  } 
  else {
    return res.status(400).send("No ISBN given");
  }   
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  if (author) {
    let booksByAuthor = [];
    for (var key in books) {
      if (books[key].author === author) {
        booksByAuthor.push(books[key]);
      }
    }
    if (booksByAuthor.length) {
      res.send(JSON.stringify(booksByAuthor, null, 4));
    }
    else {
      res.status(404).send(`No book found by ${author}`);
    }
  } 
  else {
    return res.status(400).send("No author given");
  }   
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  if (title) {
    let booksBytitle = [];
    for (var key in books) {
      if (books[key].title === title) {
        booksBytitle.push(books[key]);
      }
    }
    if (booksBytitle.length) {
      res.send(JSON.stringify(booksBytitle, null, 4));
    }
    else {
      res.status(404).send(`No book found by title "${title}"`);
    }
  } 
  else {
    return res.status(400).send("No title given");
  }   
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (isbn) {
    const book = books[isbn];
    if (book) {
      res.send(book.reviews);
    }
    else {
      res.status(404).send(`No book found with ISBN ${isbn}`);
    }
  } 
  else {
    return res.status(400).send("No ISBN given");
  }   
});

module.exports.general = public_users;
