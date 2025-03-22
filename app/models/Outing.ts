import {get} from 'lodash';

class Outing {
  constructor(
    public id: number,
    public name: string,
    public groupSize: number,
  ) {}

  public static parse(input: object): Outing {
    return new Outing(
      get(input, 'id'),
      get(input, 'name'),
      get(input, 'groupSize'),
    );
  }

  public static parseList(input: object[]): Outing[] {
    return input.map((x) => this.parse(x));
  }
}

export default Outing;
