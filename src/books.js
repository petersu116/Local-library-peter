function findAuthorById(authors, id) {
    return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
    return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
    const checkedBooks = books.filter((book) => book.borrows[0].returned === false);
    const returnedBooks = books.filter((book) => book.borrows[0].returned === true);
    const result = [];
    result.push(checkedBooks, returnedBooks);
    return result;
}

function getBorrowersForBook(book, accounts) {
    let result = [];
    const borrowsEle = book.borrows;
    for (let borrowId of borrowsEle) {
        for (let account of accounts) {
            if (borrowId.id === account.id) {
                let returnedVal = borrowId.returned;
                result.push({...account, returned: returnedVal });
            }
        }
    }
    return result.slice(0, 10);
}

module.exports = {
    findAuthorById,
    findBookById,
    partitionBooksByBorrowedStatus,
    getBorrowersForBook,
};