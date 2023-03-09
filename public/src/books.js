function findAuthorById(authors, id) {
  return authors.find((author)=> author.id === id)
}

function findBookById(books, id) {
  return books.find((book)=> book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = books.filter((book)=> book.borrows[0].returned === false)
  const returnedBooks = books.filter((book)=> book.borrows[0].returned === true)
  return [checkedOutBooks,returnedBooks]
}

function getBorrowersForBook(book, accounts) {
  const bookFiltered = book.borrows.reduce((accumulator,borrowedObj)=>{
    let accountMatch = accounts.find((account)=>borrowedObj.id === account.id)
    accountMatch['returned'] = borrowedObj.returned
    accumulator.push(accountMatch)
    return accumulator
  },[])
  return bookFiltered.slice(0,10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
