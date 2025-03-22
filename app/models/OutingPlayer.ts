import {get} from 'lodash';

import Player from '@models/Player';

class OutingPlayer {
  constructor(
    public id: number,
    public outingId: number,
    public playerId: number,
    public player: Player,
    public admin: boolean,
    public handicap: number,
  ) {}

  public static parse(input: object): OutingPlayer {
    return new OutingPlayer(
      get(input, 'id'),
      get(input, 'outing_id'),
      get(input, 'player_id'),
      Player.parse(get(input, 'player')),
      get(input, 'admin'),
      get(input, 'handicap'),
    );
  }

  public static parseList(input: object[]): OutingPlayer[] {
    return input.map((x) => this.parse(x));
  }
}

export default OutingPlayer;
