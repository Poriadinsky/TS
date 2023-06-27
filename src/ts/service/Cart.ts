import Buyable from '../domain/Buyable';

export default class Cart {
  private _items: Buyable[] = [];

  add(item: Buyable): void {
    const index = this._items.findIndex((elem) => elem.id === item.id);
    if (index !== -1) {
      if (item.quantity) {
        this._items[index].quantity = item.quantity;
      }
    } else {
      this._items.push(item);
    }
  }

  get items(): Buyable[] {
    return [...this._items];
  }

  sum(): number {
    return this.items.reduce((result, item) => {
      if (item.quantity) {
        result += item.price * item.quantity;
      } else {
        result += item.price;
      }
      return result;
    }, 0);
  }

  sumDiscount(discount: number): number {
    const total = this.sum();
    return total * (1 - discount / 100);
  }

  deleteItem(id: number): void {
    const index = this._items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this._items.splice(index, 1);
    }
  }

  decrementItem(id: number): void {
    const index = this._items.findIndex((item) => item.id === id);
    if (index !== -1) {
      const item = this._items[index];
      if (item.quantity && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.deleteItem(id);
      }
    }
  }
}
