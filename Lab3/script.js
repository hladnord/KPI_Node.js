class Book {
    constructor(bookName, genre, author, year, pages, language) {
        this.bookName = bookName;
        this.genre = genre;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.language = language;
    }

    getName() {
        console.log("Name: ", this.bookName);
    }

    getGenre() {
        console.log("Genre: ", this.genre);
    }

    getAuthor() {
        console.log("Author: ", this.author);
    }

    getYear() {
        console.log("Year: ", this.year);
    }

    getPages() {
        console.log("Pages: ", this.pages);
    }

    getLanguage() {
        console.log("Language: ", this.language);
    }

}

class Library {
    constructor() {
        this.books = [];
        this.taken = [];
    }

    addToLibrary(book) {
        if (this.books.includes(book)) {
            console.log("The Library already has", book.bookName);
        } else this.books.push(book);
        console.log("The book", book.bookName, "has been added to Library");
    }

    removeFromLibrary(book) {
        if (!this.books.includes(book)) {
            console.log("There is no book", book.bookName, "in the library");
        } else {
            this.books = this.books.filter(element => element !== book);
            console.log("The book", book.bookName, "has successfully been removed from library");
        }
    }

    addToTaken(book) {
        if (this.taken.includes(book)) {
            console.log("The book", book.bookName, "has already been taken");
        } else this.taken.push(book);
        console.log("The book", book.bookName, "has been taken");
        this.removeFromLibrary(book);
    }

    removeFromTaken(book) {
        if (!this.taken.includes(book)) {
            console.log("The book", book.bookName, "has already been removed");
        } else {
            this.taken = this.taken.filter(element => element !== book);
            console.log("The book", book.bookName, "has successfully been removed from taken");
            this.addToLibrary(book);
        }
    }

    getAvailableBooks() {
        console.log("Available books: ", this.books);
    }

    getTakenBooks() {
        console.log("Taken books: ", this.taken);
    }

    getAmountBooks() {
        console.log("The amount of available books: ", this.books.length);
    }

    getAmountTaken() {
        console.log("The Amount of taken books: ", this.taken.length);
    }

    getAllGenres() {
        console.log("Genres: ", this.books.map(element => element.genre));
    }

    sortByName() {
        console.log("Sort by name:\n", this.books.sort((a, b) => a.bookName > b.bookName ? 1 : -1));
    }

    sortByGenre() {
        console.log("Sort by genre:\n", this.books.sort((a, b) => a.genre > b.genre ? 1 : -1));
    }

    sortByAuthor() {
        console.log("Sort by author:\n", this.books.sort((a, b) => a.author > b.author ? 1 : -1));
    }

    sortByLanguage() {
        console.log("Sort by language:\n", this.books.sort((a, b) => a.language > b.language ? 1 : -1));
    }

    sortByYear() {
        console.log("Sort by year:\n", this.books.sort((a, b) => a.year > b.year ? -1 : 1));
    }

    sortByPages() {
        console.log("Sort by pages:\n", this.books.sort((a, b) => a.pages > b.pages ? -1 : 1));
    }

}

let soloLeveling = new Book(
    "Solo Leveling",
    "Adventures",
    "Sung-Lak Jang",
    2021,
    320,
    "Korean"
)

let friendsGames = new Book(
    "Friends Games",
    "Psychological",
    "Yamaguchi Mikoto",
    2013,
    150,
    "Japanese"
)

let philosopherStone = new Book(
    "Harry Potter and the Philosopher's Stone",
    "Fantasy",
    "Joanne Rowling",
    1997,
    223,
    "English"
)

let it = new Book(
    "It",
    "Horror",
    "Stephen King",
    1986,
    1138,
    "English"
)

let dune = new Book(
    "Dune",
    "Science fiction",
    "Frank Herbert",
    1965,
    412,
    "English"
)

let library = new Library();

// Add books to the Library
library.addToLibrary(soloLeveling);
library.addToLibrary(friendsGames);
library.addToLibrary(philosopherStone);
library.addToLibrary(it);
library.addToLibrary(dune);

// Get properties of the books
soloLeveling.getName();
soloLeveling.getLanguage();
friendsGames.getAuthor();
philosopherStone.getGenre();
it.getPages()
dune.getYear()

// Operations with Library
library.addToTaken(friendsGames);
library.getTakenBooks();
library.getAmountTaken();
library.getAmountBooks();
library.getAvailableBooks();
library.removeFromTaken(friendsGames);
library.getAllGenres();

// Sorting
library.sortByName();
library.sortByGenre();
library.sortByAuthor();
library.sortByLanguage();
library.sortByYear();
library.sortByPages();