class Book {
    constructor(bookName, genre, author, year, pages, language) {
        this.bookName = bookName;
        this.genre = genre;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.language = language;
    }
}

class Customer {
    constructor(customerName, customerSurname, birthDate, sex) {
        this.customerName = customerName;
        this.customerSurname = customerSurname;
        this.birthDate = birthDate;
        this.sex = sex;
    }
}
class Rented {
    constructor(customer, book) {
        this.customer = customer;
        this.book = book;
    }
}

class Library {
    constructor() {
        this.books = [];
        this.rent = [];
        this.customers = [];
    }

    addToLibrary(book) {
        if (this.books.includes(book)) {
            console.log("The Library already has ", book.bookName);
        } else {
            this.books.push(book);
            fs.writeFileSync(libraryPath, JSON.stringify(this.books));
            this.writeInLogs(`${date}: The book" ${book.bookName} "has been added to Library`);
        }
    }

    removeFromLibrary(book) {
        if (!this.books.includes(book)) {
            console.log("There is no book", book.bookName, "in the library");
        } else {
            let bookName = book.bookName
            this.books = this.books.filter(element => element !== book);
            fs.writeFileSync(libraryPath, JSON.stringify(this.books));
            this.writeInLogs(`${date}: The book "${bookName}" has successfully been removed from library`);
        }
    }

    addNewCustomer(customer) {
        if (this.customers.includes(customer)) {
            console.log(`The Customer "${customer.customerName} ${customer.customerSurname}" already exists`);
        } else {
            this.customers.push(customer);
            fs.writeFileSync(customersPath, JSON.stringify(this.customers));
            this.writeInLogs(`${date}: The Customer "${customer.customerName} ${customer.customerSurname}" has successfully been added`)
        }
    }

    deleteCustomer(customer) {
        if (!this.customers.includes(customer)) {
            console.log(`The Customer "${customer.customerName} ${customer.customerSurname}" does not exist`);
        } else{
            let customerName = customer.customerName
            let customerSurname = customer.customerSurname
            this.customers = this.customers.filter(element => element !== customer);
            fs.writeFileSync(customersPath, JSON.stringify(this.customers));
            this.writeInLogs(`${date}: The customer "${customerName} ${customerSurname}" has successfully been deleted`)
        }
    }

    addToRent(customer, book) {
        if (!this.customers.includes(customer)) {
            return console.log(`The Customer "${customer.customerName} ${customer.customerSurname}" does not exist`);
        }
        if (this.rent.includes(book)) {
            return console.log("The book", book.bookName, "has already been rent");
        }
        const rented = new Rented(customer, book)
        this.rent.push(rented);
        fs.writeFileSync(rentPath, JSON.stringify(this.rent));
        this.writeInLogs(`${date}: The book "${book.bookName}" was rented by "${customer.customerName}"`)
        this.removeFromLibrary(book);
    }

    removeFromRent(book) {
        for (let i = 0; i < this.rent.length; i++){
            if (!this.rent[i].book === book) {
                return console.log("The book", book.bookName, "has already been removed");
            }
        }
        this.rent.splice(book, 1);
        fs.writeFileSync(rentPath, JSON.stringify(this.rent));
        this.writeInLogs(`${date}: The book "${book.bookName}" has successfully been removed from rent`)
        this.addToLibrary(book);
    }

    writeInLogs(text) {
        const changes = fs.readFileSync(changesPath).toString();
        const changesData = changes.split('\n');
        changesData.push(text);
        fs.writeFileSync(changesPath, changesData.join('\n'));
    }
}
let path = require("path")
let fs = require("fs")

const libraryPath = path.resolve("library.txt");
const changesPath = path.resolve("logs.txt");
const customersPath = path.resolve("customers.txt");
const rentPath = path.resolve("rent.txt");
let soloLeveling = new Book(
    "Solo Leveling",
    "Adventures",
    "Sung-Lak Jang",
    2021,
    320,
    "Korean"
)
const customer = new Customer(
    "Nastya",
    "Hladkovich",
    new Date(2001, 3, 4),
    "female"
);
let library = new Library();
let date = new Date()
date = date.toLocaleString()

library.addToLibrary(soloLeveling)
library.addNewCustomer(customer)
library.addToRent(customer, soloLeveling)
library.removeFromRent(soloLeveling)
