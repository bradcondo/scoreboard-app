import { get } from "lodash";

class ScorecardScore {
  constructor(
    public id: number,
    public holeId: number,
    public score: number,
    public toPar: number,
    public netScore: number,
    public netToPar: number,
  ) {}

  public static parse(input: object): ScorecardScore {
    return new ScorecardScore(
      get(input, "id"),
      get(input, "hole_id"),
      get(input, "score"),
      get(input, "to_par"),
      get(input, "net_score"),
      get(input, "net_to_par"),
    );
  }

  public static parseList(input: object[]): ScorecardScore[] {
    return input.map((x) => this.parse(x));
  }
}

export default ScorecardScore;
