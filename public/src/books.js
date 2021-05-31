// this function finds an author by its ID
function findAuthorById(authors, id) {
  // loop through the authors array
  for (let item in authors) {
    const author = authors[item];
    
    // if the current authors id is equal to the id argument passed in, return the author
    if (author.id === id) return author;
  }
}

// this function finds a book by its ID and follows the same code as above
function findBookById(books, id) {
  for (let item in books) {
    const book = books[item];
    
    if (book.id === id) return book;
  }
}

// this function shows whether every book is available or not
function partitionBooksByBorrowedStatus(books) {
  // create necessary variables
  const returnArray = [];
  const notReturned = [];
  const returned = [];
  
  // loop through the books array
  for (let item in books) {
    const book = books[item];
    
    // if the first index of the borrows array has a returned value of true, it will be
    // pushed to the returned array, if not it will be pushed to the notReturned array
    if (book.borrows[0].returned === false) notReturned.push(book);
    if (book.borrows[0].returned === true) returned.push(book);
  }

  // push the two arrays to the returnArray 
  returnArray.push(notReturned);
  returnArray.push(returned);
  
  // return returnArray
  return returnArray;
}

// this function returns all transactions for a book with the related account info
// it destructures the borrows object from the book array
function getBorrowersForBook({borrows}, accounts) {

  // loop through the borrows array
  for (let i = 0; i < borrows.length; i++) {
    // set a variable equal to the users id
    const id = borrows[i].id;

    // find the user associated with that id
    const person = accounts.find((user) => user.id === id);

    // this is the value being pushed to the array i will eventually return
    const value = {...borrows[i], ...person};
    
    // set borrows at the current index to equal this value, instead of the borrows information
    borrows[i] = value;
  }

  // this chunk of code shortens the return value if its longer than 10, otherwise it just returns borrows
  if (borrows.length > 10) {
    const returnArray = [];
    for (let i = 0; i < 10; i++) {  
      returnArray.push(borrows[i]);
    }

    return returnArray;
  }
  else {
    return borrows;
  }
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
