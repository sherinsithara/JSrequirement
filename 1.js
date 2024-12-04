//map will split the memory and allocate the value like 00,01
//array will allocate the memory without splitting arrange the value like 0,1....

const books = [
  { id: 1, Title: "The Mist", Price: 400, Stock: 12 },
  { id: 2, Title: "Mirror", Price: 530, Stock: 8 },
  { id: 3, Title: "Goodies", Price: 780, Stock: 5 },
  { id: 3, Title: "Goodies", Price: 780, Stock: 5 }

];

const customers = [
  { cid: 23423, name: "Sherin", pastcustomer: true, lastpurchase: { bookid: 5, bname: "Time" } },
  { cid: 23424, name: "ABC", pastcustomer: false, lastpurchase: { bookid: 23, bname: "Things" } },
  { cid: 22423, name: "Vais", pastcustomer: true, lastpurchase: { bookid: 9, bname: "Cloud" } },
  { cid: 2343, name: "Kaja", pastcustomer: true, lastpurchase: { bookid: 8, bname: "Time" } },
  { cid: 232, name: "Manthra", pastcustomer: false, lastpurchase: { bookid: 6, bname: "Money Heist" } }
];

const listofbook = [1, 3, 3, 2];
const selectedcustomer = 232;

function removeDuplicates() {
  const uniqueSet = new Set();
  const uniqueBooks = [];

  for (const bookId of listofbook) {
      if (!uniqueSet.has(bookId)) {
          uniqueSet.add(bookId);
          const book = books.find((b) => b.id === bookId);
          if (book) uniqueBooks.push(book);
      }
  }
  return uniqueBooks;
}

function calculateDiscount(book, isExistingCustomer) {
  let discount = 0;

  if (isExistingCustomer) {
      if (book.Price > 200) 
        discount = book.Price * 15/100;
  } else {
      if (book.Price >= 100 && book.Price < 200) 
        discount = book.Price * 2/100;
      else if (book.Price >= 200 && book.Price < 500) 
        discount = book.Price * 5/100;
      else if (book.Price >= 500 && book.Price <= 750) 
        discount = book.Price * 10/100;
      else if (book.Price > 750) 
        discount = book.Price * 15/100;
  }

  return discount;
}

function createBill(uniqueBooks, isExistingCustomer) {
  let totalPrice = 0;
  let totalDiscount = 0;
  const billDetails = [];

  for (const book of uniqueBooks) {
      const discount = calculateDiscount(book, isExistingCustomer);
      const finalPrice = book.Price - discount;

      billDetails.push({
          title: book.Title,
          price: book.Price,
          discount,
          finalPrice
      });

      totalPrice += finalPrice;
      totalDiscount += discount;
  }

  return { billDetails, totalPrice, totalDiscount };
}

function updateStock(uniqueBooks) {
  for (const book of uniqueBooks) {
      book.Stock -= 1;
  }
}

function processPurchase(listofbook, selectedcustomer) {
  const uniqueBooks = removeDuplicates();
  const customer = customers.find((c) => c.cid === selectedcustomer);

  if (!customer) return "Customer not found!";

  const bill = createBill(uniqueBooks, customer.pastcustomer);
  updateStock(uniqueBooks);

  customer.lastpurchase = {
      date: new Date().toLocaleDateString(),
      booksPurchased: bill.billDetails,
      totalAmount: bill.totalPrice
  };

  return { bill, updatedStock: books, updatedCustomer: customer };
}

const result = processPurchase(listofbook, selectedcustomer);

console.log("Bill:", result.bill);
console.log("Updated Stock:", result.updatedStock);
console.log("Updated Customer:", result.updatedCustomer);
