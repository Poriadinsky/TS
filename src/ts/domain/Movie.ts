import Buyable from './Buyable';

export default class Movie implements Buyable {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly year: number,
        readonly country: string,
        readonly tagline: string,
        readonly genre: string [],
        readonly duration: string,
        readonly price: number,
    ) { }
}