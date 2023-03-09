const findAccountById = (accounts,id) => accounts.find((account) => account.id === id)

function sortAccountsByLastName(accounts) {
  return accounts.sort((account1,account2)=> {
    const account1Last = account1.name.last;
    const account2Last = account2.name.last;
    return account1Last.toLowerCase() > account2Last.toLowerCase()? 1: -1
  })
}

function getTotalNumberOfBorrows(account, books) {
  const {id} = account
  const bookCounter = books.reduce((count,{borrows})=>{
    const borrowsCounter = borrows.forEach((borrowObj)=>{
      if(borrowObj.id === id){
        count++
        return;
      }
    })
    return count
  },0)
  return bookCounter
}

function getBooksPossessedByAccount(account, books, authors) {
  const bookFind = books.reduce((accumulator,book)=>{
    const {borrows,authorId} = book
    if(borrows[0].returned === false && book.borrows[0].id === account.id){
      const authorGrab = authors.find((author)=> author.id === authorId)
      book["author"] = authorGrab
      accumulator.push(book)
    }
    return accumulator
  },[])
  return bookFind
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
