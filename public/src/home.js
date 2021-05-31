// this function gets a total of all the books the library has
function getTotalBooksCount(books) {
  // declare a variable with a value of 0
  let counter = 0;
  
  // loop through the book array, for every value, add 1 to counter
  for (let item in books) counter++
  
  // return counter
  return counter;
}

// this function gets a total of all the accounts, it uses the same method as above
function getTotalAccountsCount(accounts) {
  let counter = 0;
  for (let people in accounts) counter++;
  return counter;
}

// this function gets the total number of books currently checked out
function getBooksBorrowedCount(books) {
  // declare a counter variable
  let counter = 0;
  
  // loop through the books array
  for (let item in books) {
    // declare 2 variables, one to hold each book object, and another thats set 
    // equal to the first book in the borrows object
    const book = books[item];
    const borrow =  book.borrows[0];
    
    // if the first book in the borrow object isnt returned, add 1 to the counter
    if (borrow.returned === false) counter++
  }
  
  // finally, return the counter
  return counter;
}

// this function gets the most common genres
function getMostCommonGenres(books) {
  // create starting variables
  let returnArray = [];
  const genreList = [];
  const finalArray = [];

  // loop through the books array
  for (let item in books) {
    // local variables
    const book = books[item];
    const genre = book.genre;
    let ifHasValue = false;

    // for every book object, push the genre to the genreList variable, so we know how many genres total there are
    genreList.push(genre);
    
    // create a filtered variable to filter all the books with the same genre as the current book
    const filtered = books.filter((book) => book.genre === genre);

    // loop through the returnArray to see if the genre is already in it
    for (let i = 0; i < returnArray.length; i++) {
      // if it is, set ifHasValue to true so the next if is skipped
      if (returnArray[i].includes(genre)) {
        ifHasValue = true;
      }
    }

    // if ifHasValue is still false, push pushValue to the returnArray
    // the value pushed is a string, not an object, looking back im not sure
    // why i did it this way, but i worked around it i guess
    if (!ifHasValue) {
      const pushValue = `name: ${genre}, count: ${filtered.length}`;
      returnArray.push(pushValue);
    }
  }

  // once all the books have been looped through, and we have all the genres and their counts,
  // sort the genres by their count value
  const sorted = returnArray.sort((itemA, itemB) => {
    // these two variables take the last character from each string
    const first = itemA.slice(-1);
    const second = itemB.slice(-1);

    // this return value tells the sorted function whether to switch the values or not
    return first < second ? 1 : -1;
  })

  // once its sorted, this for loop limits the value returned to just 5 items
  for (let i = 0; i < 5; i ++) {
    // this variable takes the last value of each string in sorted
    const amount = sorted[i].slice(-1);
    // create a final genre variable
    let finalGenre;

    // loop through our genreList
    for (let j = 0; j < genreList.length; j++) {
      // as long as sorted contains the genre, finalGenre can equal the genre
      if (sorted[i].includes(genreList[j])) finalGenre = genreList[j];
    }

    // this final statement pushes each value to the finalArray
    // must parseInt the amount variable because it was a string... i could fix that
    finalArray[i] = {name: finalGenre, count: parseInt(amount)};
  }

  // return finalArray
  return finalArray;
}

// this function gets the most popular books
function getMostPopularBooks(books) {
  // create a variable to return
  let returnObject = [];

  // loop through the books array
  for (let items in books) {
    // create local variables
    const book = books[items];
    const length = book.borrows.length;
    const title = book.title;

    // create the pushValue object that we can push to our returnObject
    const pushValue = {name: title, count: length};

    // push it
    returnObject.push(pushValue);
  }

  // sort the values based on the count value
  const sorted = returnObject.sort((itemA, itemB) => {
    const first = itemA.count;
    const second = itemB.count;

    return first < second ? 1 : -1;
  })

  const finalReturn = [];
  
  // only return the 5 highest values with the finalReturn variable created above
  for (let i = 0; i < 5; i++) {
    finalReturn.push(sorted[i]);
  }

  // return finalReturn
  return finalReturn;
}

// this function gets the most popular authors
function getMostPopularAuthors(books, authors) {
  // create a value we can return and a counter variable
  const returnValue = [];
  let counter = 0;

  // loop through the authors array
  for (let people in authors) {
    // create necessary local variables
    const author = authors[people];
    const authorId = author.id;
    const name = author.name;

    // this variable is equal to our times borrowed function, called with the book array
    // and the current authors id
    const timesBorrowed = getTimesBorrowed(books, authorId);

    // return value at index counter (starts at 0, then adds one after every loop).
    // is equal to this object. Name is equal to name.first + name.last (in string literal form)
    // and count equals timesBorrowed, which is the variable equal to the function 
    returnValue[counter] = {name: `${name.first} ${name.last}`, count: timesBorrowed};

    // add one to counter so it doesnt just replace the first index every time
    counter++;
  }

  // sort returnValue by count
  const sorted = returnValue.sort((itemA, itemB) => {
    const first = itemA.count;
    const second = itemB.count;

    return first < second ? 1 : -1;
  })

  const finalArray = [];

  // add the highest 5 to the returnArray
  for (let i = 0; i < 5; i++) {
    finalArray.push(sorted[i]);
  }

  // return returnArray
  return finalArray;
}

// helper function for getMostPopularAuthors
function getTimesBorrowed(books, authorId) {
  // filter the books that are written by this author
  const filteredBooks = books.filter((book) => book.authorId === authorId);

  // this reduce function adds each of the lengths of the borrows object of each of their written books
  const total = filteredBooks.reduce((acc, book) => {
    const length = book.borrows.length;
    return acc += length;
  }, 0);

  // return total
  return total;
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
}
