import {get} from 'lodash';

class OutingGroupPlayer {
  constructor(
    public id: number,
    public outingGroupId: number,
    public playerId: number,
  ) {}

  public static parse(input: object): OutingGroupPlayer {
    return new OutingGroupPlayer(
      get(input, 'id'),
      get(input, 'outing_group_id'),
      get(input, 'player_id'),
    );
  }

  public static parseList(input: object[]): OutingGroupPlayer[] {
    return input.map((x) => this.parse(x));
  }

  public dump(): object {
    return {
      id: this.id,
      outing_group_id: this.outingGroupId,
      player_id: this.playerId,
    };
  }

  public static dumpList(outingGroups: OutingGroupPlayer[]): object[] {
    return outingGroups.map((x) => x.dump());
  }
}

export default OutingGroupPlayer;
