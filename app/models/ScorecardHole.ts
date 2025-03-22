import { get } from "lodash";

class Hole {
  constructor(
    public id: number,
    public number: number,
    public handicap: number,
    public yards: number,
    public par: number,
  ) {}

  public static parse(input: object): Hole {
    return new Hole(
      get(input, "id"),
      get(input, "number"),
      get(input, "handicap"),
      get(input, "yards"),
      get(input, "par"),
    );
  }

  public static parseList(input: object[]): Hole[] {
    return input.map((x) => this.parse(x));
  }
}

export default Hole;
