function getTotalBooksCount(books) {
    return books.length;
}

function getTotalAccountsCount(accounts) {
    return accounts.length;
}

function getBooksBorrowedCount(books) {
    let count = 0;
    for (let i = 0; i < books.length; i++) {
        let notReturnedBook = books[i];
        if (notReturnedBook.borrows[0].returned === false) {
            count++;
        }
    }
    return count;
}

function getMostCommonGenres(books) {
    let beforeSort = [];
    const bothNameAndCounts = books.reduce((acc, index) => {
        if (acc[index.genre]) {
            acc[index.genre] += 1;
        } else {
            acc[index.genre] = 1;
        }
        return acc;
    }, {})
    for (let name in bothNameAndCounts) {
        beforeSort.push({ name: name, count: bothNameAndCounts[name] });
    }
    return beforeSort.sort((genre1, genre2) => genre1.count < genre2.count ? 1 : -1).slice(0, 5);
}

//Helper function to find the times that books have been borrowed.
function getBooksBorrowedTimes(book) {
    let count = book.borrows.length;
    return count;
}

function getMostPopularBooks(books) {
    let result = [];
    for (let book of books) {
        result.push({ name: book.title, count: getBooksBorrowedTimes(book) });
    }
    return result.sort((book1, book2) => book1.count < book2.count ? 1 : -1).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
    let mostPopularAuthors = [];
    const booksWroteByAuthor = books.reduce((acc, book) => {
        if (acc[book.authorId]) {
            acc[book.authorId] += book.borrows.length;
        } else {
            acc[book.authorId] = book.borrows.length;
        }
        return acc;
    }, {})
    for (let authorIdInNewObj in booksWroteByAuthor) {
        for (let author of authors) {
            if (authorIdInNewObj == author.id) {
                let authorName = author.name.first + " " + author.name.last;
                let totalCount = booksWroteByAuthor[authorIdInNewObj];
                mostPopularAuthors.push({ name: authorName, count: totalCount })
            }
        }
    }
    return mostPopularAuthors.sort((author1, author2) => author1.count < author2.count ? 1 : -1).slice(0, 5);
}

module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
};