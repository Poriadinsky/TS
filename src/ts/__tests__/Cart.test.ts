import Book from '../domain/Book';
import Movie from '../domain/Movie';
import Cart from '../service/Cart';
import MusicAlbum from '../domain/MusicAlbum';
import Gadget from '../domain/Gadget';

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});

test('add movie in cart', () => {
  const cart = new Cart();
  cart.add(new Movie(1,'Мстители',2012,'США','Avengers assemble!',['фантастика','боевик','фэнтези','приключения'],'137 мин', 1500));

  expect(cart).toEqual({
    '_items': [
      {
        id: 1,
        name: 'Мстители',
        year:2012,
        country: 'США',
        tagline: 'Avengers assemble!',
        genre: ['фантастика','боевик','фэнтези','приключения'],
        duration: '137 мин',
        price: 1500
      }
    ]
  });
});

test('sum of prices', () => {
  const cart = new Cart();
  cart.add(new Movie(11,'Мстители',2012,'США','Avengers assemble!',['фантастика','боевик','фэнтези','приключения'],'137 мин', 1500));
  cart.add(new Book(22, 'War and Piece', 'Leo Tolstoy', 2500, 1886));
  cart.add(new MusicAlbum(33, 'Meteora', 'Linkin Park', 500));

  expect(cart.sum()).toBe(4500);
});

test('sum of prices with Gadget', () => {
  const cart = new Cart();
  cart.add(new Movie(11,'Мстители',2012,'США','Avengers assemble!',['фантастика','боевик','фэнтези','приключения'],'137 мин', 1500));
  cart.add(new Book(22, 'War and Piece', 'Leo Tolstoy', 2500, 1886));
  cart.add(new MusicAlbum(33, 'Meteora', 'Linkin Park', 500));
  cart.add(new Gadget(55, 'Samsung', 1000, 'S10+', 5));

  expect(cart.sum()).toBe(9500);
});

test('sum of prices with discount', () => {
  const cart = new Cart();
  cart.add(new Movie(11,'Мстители',2012,'США','Avengers assemble!',['фантастика','боевик','фэнтези','приключения'],'137 мин', 1500));
  cart.add(new Book(22, 'War and Piece', 'Leo Tolstoy', 2500, 1886));
  cart.add(new MusicAlbum(33, 'Meteora', 'Linkin Park', 500));

  expect(cart.sumDiscount(50)).toBe(2250);
});


test('delete item from card by id', () => {
  const cart = new Cart();
  cart.add(new Movie(11,'Мстители',2012,'США','Avengers assemble!',['фантастика','боевик','фэнтези','приключения'],'137 мин', 1500));
  cart.add(new Book(22, 'War and Piece', 'Leo Tolstoy', 2500, 1886));
  cart.add(new MusicAlbum(33, 'Meteora', 'Linkin Park', 500));
  cart.deleteItem(22);

  expect(cart.items).toEqual([
      {
        id: 11,
        name: 'Мстители',
        year:2012,
        country: 'США',
        tagline: 'Avengers assemble!',
        genre: ['фантастика','боевик','фэнтези','приключения'],
        duration: '137 мин',
        price: 1500
      },
      {
        id: 33,
        name: 'Meteora',
        author: 'Linkin Park', 
        price: 500
      }
    ]);
});

test('decrement quantity of item', () => {
  const cart = new Cart();
  cart.add(new MusicAlbum(33, 'Meteora', 'Linkin Park', 500));
  cart.add(new Gadget(55, 'Samsung', 1000, 'S10+', 1));
  cart.add(new Gadget(55, 'Samsung', 1000, 'S10+', 5));
  cart.decrementItem(55);


  expect(cart.items).toEqual([
    {
      id: 33,
      name: 'Meteora',
      author: 'Linkin Park', 
      price: 500
    },
    {
      id: 55,
      name: 'Samsung', 
      price: 1000,
      model: 'S10+', 
      quantity: 4
    }
  ]);
});

test('decrement quantity equal to one of item', () => {
  const cart = new Cart();
  cart.add(new MusicAlbum(33, 'Meteora', 'Linkin Park', 500));
  cart.add(new Gadget(55, 'Samsung', 1000, 'S10+', 1));
  cart.decrementItem(55);


  expect(cart.items).toEqual([
    {
      id: 33,
      name: 'Meteora',
      author: 'Linkin Park', 
      price: 500
    }
  ]);
});


test('decrement quantity of item', () => {
  const cart = new Cart();
  cart.add(new MusicAlbum(33, 'Meteora', 'Linkin Park', 500));
  cart.add(new Gadget(55, 'Samsung', 1000, 'S10+', 1));
  cart.add(new Gadget(55, 'Samsung', 1000, 'S10+', 5));
  cart.decrementItem(33);


  expect(cart.items).toEqual([
    {
      id: 55,
      name: 'Samsung', 
      price: 1000,
      model: 'S10+', 
      quantity: 5
    }
  ]);
});

