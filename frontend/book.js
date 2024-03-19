const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const catalogServer = 'http://localhost:3000/api/catalog';
const orderServer = 'http://localhost:3001/api/order';

const mainMenu = () => {
  console.log('\nBook Catalog and Ordering System');
  console.log('1. List all books');
  console.log('2. Search for a book by UUID');
  console.log('3. Purchase a book');
  console.log('4. Exit');
  
  rl.question('Select an option: ', (option) => {
    switch (option) {
      case '1':
        listBooks();
        break;
      case '2':
        searchBook();
        break;
      case '3':
        purchaseBook();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Invalid option. Please enter a number between 1 and 4.');
        mainMenu();
    }
  });
};

const listBooks = async () => {
  try {
    const response = await axios.get(`${catalogServer}/books`);
    console.log('\nList of Books:', response.data);
  } catch (error) {
    console.error('Error fetching the list of books:', error.message);
  }
  mainMenu();
};

const searchBook = () => {
  rl.question('\nEnter UUID of the book to search: ', async (uuid) => {
    try {
      const response = await axios.get(`${catalogServer}/search/${uuid}`);
      console.log('Book Details:', response.data);
    } catch (error) {
      console.error('Error searching for the book:', error.message);
    }
    mainMenu();
  });
};

const purchaseBook = () => {
  rl.question('\nEnter UUID of the book to purchase: ', (uuid) => {
    rl.question('Enter quantity to purchase: ', async (quantity) => {
      try {
        const response = await axios.post(`${orderServer}/books/purchase`, {
          uuid,
          quantity: parseInt(quantity)
        });
        console.log('Purchase Response:', response.data);
      } catch (error) {
       console.error('Error purchasing the book:', error.message);
      }
      mainMenu();
    });
  });
};

// Start the application
mainMenu();

rl.on('close', () => {
  console.log('Exiting the Book Catalog and Ordering System.');
  process.exit(0);
});