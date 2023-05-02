console.log("This is index.")
// Note
// 1.store all the data to the localStorage
// 2.give another column as an option to delete the book
// 3.Add a scroll bar to the view

// Constructor
function book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// /Display Constructor
function Display() { }



// Add methods to display prototype
Display.prototype.add = function (book) {
    console.log('Adding to UI');
    tableBody = document.getElementById('tableBody');
    let uiString = `
                     <tr>        
                         <td>${book.name}</td>
                         <td>${book.author}</td>
                         <td>${book.type}</td>
                    </tr> `
    tableBody.innerHTML += uiString;
}

// Implement the clear funtion
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

// Implement the validate funtion
Display.prototype.validate = function (book1) {
    if (book1.name.length < 2 || book1.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}
Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Message: </strong> ${displayMessage}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div> `;
    setTimeout(function () {
        message.innerHTML = ''
    }, 2000);
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let creater = document.getElementById('creater');
    let type;

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (creater.checked) {
        type = creater.value;
    }

    let book1 = new book(name, author, type);
    console.log(book1);

    let display = new Display();

    if (display.validate(book1)) {

        display.add(book1);
        display.clear();
        display.show('success', 'your book has been successfully added.')
    }
    else {
        // show error to the user 
        display.show('danger', 'Sorry you cannot add this book.');
    }

    e.preventDefault();
}



