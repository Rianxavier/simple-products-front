export class ProductModel {
  public readonly id: string;
  public name: string;
  public price: number;
  public sku: string;
  public createdAt: string;
  public missingLetter: string;

  constructor({
    id,
    name,
    price,
    sku,
    createdAt,
    missingLetter,
  }: {
    id: string;
    name: string;
    price: number;
    sku: string;
    createdAt: string | Date;
    missingLetter: string;
  }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.sku = sku;
    this.createdAt = new Date(createdAt).toString();
    this.missingLetter = missingLetter;
  }
}
