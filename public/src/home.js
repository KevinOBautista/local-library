function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.reduce((count,book)=>{
    const findBorrowed = book.borrows.find((borrowObj)=> borrowObj.returned === false)
    if(findBorrowed != undefined){
      count++
    }
    return count
  },0)
}

function getMostCommonGenres(books) {
  const genreCounter = books.reduce((accumulator,{genre})=>{
    const currentGenre = accumulator.find((acc)=>acc.name == genre)
    currentGenre == undefined? accumulator.push({name: genre, count:1}):currentGenre.count++
    return accumulator
  },[])
  genreCounter.sort((genreA,genreB)=>genreB.count - genreA.count)
  return genreCounter.splice(0,5)
}

function getMostPopularBooks(books) {
  const bookPopularity = books.reduce((accumulator,{title,borrows})=>{
    accumulator.push({name: title, count: borrows.length})
    return accumulator
  },[])
  bookPopularity.sort((bookA,bookB)=>bookB.count - bookA.count)
  return bookPopularity.splice(0,5)
}

function getAuthorsPopularity (books,author){
  const booksByAuthor = books.filter((book)=> book.authorId == author.id)
  const countedBorrows = booksByAuthor.reduce((counter,book)=>{
    counter += book.borrows.length
    return counter
  },0)
  return countedBorrows
}

function getMostPopularAuthors(books, authors) {
  const authorsPop = authors.reduce((accumulator,author)=>{
    const currentAuthorsPopularity = getAuthorsPopularity(books,author);
    const currentAuthorsName = `${author.name.first} ${author.name.last}`
    accumulator.push({name: currentAuthorsName, count: currentAuthorsPopularity})
    return accumulator
  },[])
  authorsPop.sort((authorA,authorB)=>authorB.count - authorA.count)
  return authorsPop.splice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
