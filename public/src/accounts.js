function findAccountById(accounts, id) {
    return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
    return accounts.sort((account1, account2) => account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {
    let result = 0;
    for (let book in books) {
        const borrowedBook = books[book].borrows;
        borrowedBook.forEach((borrow) => {
            if (borrow.id === account.id)
                result++;
        })
    }
    return result;
}

function getBooksPossessedByAccount(account, books, authors) {
    return books
        .filter((book) => {
            const recent = book.borrows[0];
            return !recent.returned && recent.id === account.id;
        })
        .map((book) => {
            const author = authors.find((author) => author.id === book.authorId);
            return {...book, author };
        });
}

module.exports = {
    findAccountById,
    sortAccountsByLastName,
    getTotalNumberOfBorrows,
    getBooksPossessedByAccount,
};