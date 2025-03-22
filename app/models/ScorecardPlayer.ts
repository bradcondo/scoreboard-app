import { get } from "lodash";

import ScorecardRound from "@/models/ScorecardRound";

class ScorecardPlayer {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public nickname: string,
    public handicap: number,
    public round: ScorecardRound,
  ) {}

  public static parse(input: object): ScorecardPlayer {
    return new ScorecardPlayer(
      get(input, "id"),
      get(input, "first_name"),
      get(input, "last_name"),
      get(input, "nickname"),
      get(input, "handicap"),
      ScorecardRound.parse(get(input, "round", {})),
    );
  }

  public static parseList(input: object[]): ScorecardPlayer[] {
    return input.map((x) => this.parse(x));
  }
}

export default ScorecardPlayer;
