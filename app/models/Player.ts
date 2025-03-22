import {get} from 'lodash';

class Player {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public nickname: string,
    public emailAddress: string,
    public phoneNumber: string,
    public handicap: number,
  ) {}

  public static parse(input: object): Player {
    return new Player(
      get(input, 'id'),
      get(input, 'first_name'),
      get(input, 'last_name'),
      get(input, 'nickname'),
      get(input, 'email_address'),
      get(input, 'phone_number'),
      get(input, 'handicap'),
    );
  }

  public static parseList(input: object[]): Player[] {
    return input.map((x) => this.parse(x));
  }
}

export default Player;
