import {get, isNil} from 'lodash';
import OutingGroupPlayer from './OutingGroupPlayer';

class OutingGroup {
  constructor(
    public id: number,
    public outingRoundId: number,
    public number: number,
    public players: OutingGroupPlayer[],
  ) {}

  public hasPlayer(playerId: number): boolean {
    return !isNil(this.players.find((x) => x.playerId === playerId));
  }

  public static parse(input: object): OutingGroup {
    return new OutingGroup(
      get(input, 'id'),
      get(input, 'outing_round_id'),
      get(input, 'number'),
      OutingGroupPlayer.parseList(get(input, 'outing_group_players', [])),
    );
  }

  public static parseList(input: object[]): OutingGroup[] {
    return input.map((x) => this.parse(x));
  }

  public dump(): object {
    return {
      id: this.id,
      outing_round_id: this.outingRoundId,
      number: this.number,
      outing_group_players: OutingGroupPlayer.dumpList(this.players),
    };
  }

  public static dumpList(outingGroups: OutingGroup[]): object[] {
    return outingGroups.map((x) => x.dump());
  }
}

export default OutingGroup;
