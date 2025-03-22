import { get } from "lodash";

class LeaderboardScore {
  constructor(
    public outingRoundId: number,
    public highest: boolean,
    public score: number,
    public toPar: number,
    public netScore: number,
    public netToPar: number,
  ) {}

  public static parse(input: object): LeaderboardScore {
    return new LeaderboardScore(
      get(input, "outing_round_id"),
      get(input, "highest"),
      get(input, "score"),
      get(input, "to_par"),
      get(input, "net_score"),
      get(input, "net_to_par"),
    );
  }

  public static parseList(input: object[]): LeaderboardScore[] {
    return input.map((x) => this.parse(x));
  }
}

export default LeaderboardScore;
