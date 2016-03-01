export class Product {
    constructor(
        public id:number,
        public urlName:string,
        public headline:string,
        public bestPrice:number,
        public newBestPrice:number,
        public usedBestPrice:number,
        public collectibleBestPrice:number,
        public advertsCount:number,
        public advertsNewCount:number,
        public advertsUsedCount:number,
        public advertsCollectibleCount:number
    ) { }
}