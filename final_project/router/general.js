const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

async function getBooks() {
  return new Promise((resolve, reject) => {
    resolve(books)
});
}

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  getBooks().then((books) => {
    res.send(JSON.stringify(books, null, 4));
  });
});

async function getBooksByISBN(isbn) {
  return new Promise((resolve, reject) => {
    if (isbn) {
      const book = books[isbn];
      if (book) {
        resolve(book);
      }
      else {
        reject(`No book found with ISBN ${isbn}`);
      }
    } 
    else {
      reject("No ISBN given");
    }   
  });
}  

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  getBooksByISBN(isbn).then((book) => {
    res.send(book);
  })
  .catch((err) => {
    res.status(404).send(err);
  });
 });
  

async function getBooksByAuthor(author) {
  return new Promise((resolve, reject) => {
    if (author) {
      let booksByAuthor = [];
      for (var key in books) {
        if (books[key].author === author) {
          booksByAuthor.push(books[key]);
        }
      }
      if (booksByAuthor.length) {
        resolve(booksByAuthor);
      }
      else {
        reject(`No book found by ${author}`);
      }
    } 
    else {
      reject("No author given");
    }   
        
  })
}

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  //
  getBooksByAuthor(author).then((books) => {
    res.send(JSON.stringify(books, null, 4));
  })
  .catch((err) => {
    res.status(404).send(err);
  });
});

async function getBooksByTitle(title) {
  return new Promise((resolve, reject) => {
    if (title) {
      let booksBytitle = [];
      for (var key in books) {
        if (books[key].title === title) {
          booksBytitle.push(books[key]);
        }
      }
      if (booksBytitle.length) {
        resolve(booksBytitle);
      }
      else {
        reject(`No book found by title "${title}"`);
      }
    } 
    else {
      reject("No title given");
    }   
  
  });
}

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  //
  getBooksByTitle(title).then((books) => {
    res.send(JSON.stringify(books, null, 4));
  })
  .catch((err) => {
    res.status(404).send(err);
  });
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
