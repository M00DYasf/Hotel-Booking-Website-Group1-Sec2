export class Inventory {
  constructor(
    public resourceId: string, // what we are booking
    public totalUnits: number // how many products exist
  ) {}
}