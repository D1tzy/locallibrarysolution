// this function finds an account by its id
function findAccountById(accounts, id) {
  // loop through the accounts array
  for (let object in accounts) {
    // create local variables
    const account = accounts[object];
    const accountId = accounts[object].id;
    
    // if the current accounts id matches the id passed in, return the account
    if (accountId === id) return account;
  }
} 

// this function sorts account by last name
function sortAccountsByLastName(accounts) {

  // sorts the accounts by last name
  const sorted = accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last) ? 1 : -1);
  
  // returns the sorted array
  return sorted;
}

// this function returns the total number of times an account has checked out books
// couldve destructed ID from account... oh well
function getTotalNumberOfBorrows(account, books) {
  // create a counter variable
  let counter = 0;
  
  // loop through the books array
  for (let item in books) {
    // create local variables
    const book = books[item];
    const borrowed = book.borrows;

    // loop through the borrowed array for each book
    for (let i = 0; i < borrowed.length; i++) {
      // if the current borrowed values id is equal to the accounts, add 1 to the counter
      if (borrowed[i].id == account.id) counter++;
    }
  }
  
  // return the counter
  return counter;
}

// this function gets all the books currently checked out by an account
function getBooksPossessedByAccount(account, books, authors) {
  // create a value we can return eventually
  let returnObject = [];

  // create a book array by using a helper function
  const bookArray = getBookArray(account, books);
  
  // loop through that book array
  for (let items in bookArray) {
    // create local variables
    const book = bookArray[items];
    const authorId = book.authorId;

    // this variable is set to find the current author
    const author = getAuthor(authors, authorId);

    // this pushes the author value to the book object
    book['author'] = author;

    // push the full value, book and author, to the return object
    returnObject.push(book);
  }

  // return that value
  return returnObject;
}

// helper function for getBooksPosessed...
function getAuthor(authors, authorId) {
  // find the author
  const found = authors.find((author) => author.id === authorId);

  // return the author
  return found;
}

// second helper function for getBooksPosessed...
function getBookArray(account, books) {
  const accountId = account.id;
  const returnArray = [];

  for (let items in books) {
    const book = books[items];
    const borrowsList = book.borrows;
    const borrows = book.borrows[0];
    const checkedOut = borrows.id;


    if (checkedOut === accountId) {
      returnArray.push(book);
      returnArray[returnArray.length - 1].borrows = borrowsList;
    }
  }

  return returnArray;
}
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
