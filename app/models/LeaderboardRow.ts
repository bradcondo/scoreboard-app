import { get } from "lodash";

import LeaderboardScore from "@/models/LeaderboardScore";
import Player from "@/models/Player";

class LeaderboardRow {
  constructor(
    public player: Player,
    public handicap: number,
    public completedRounds: number,
    public scores: LeaderboardScore[],
    public score: number,
    public toPar: number,
    public netScore: number,
    public netToPar: number,
    public birdies: number,
    public eagles: number,
  ) {}

  public static parse(input: object): LeaderboardRow {
    return new LeaderboardRow(
      Player.parse(get(input, "player")),
      get(input, "handicap"),
      get(input, "completed_rounds"),
      LeaderboardScore.parseList(get(input, "scores")),
      get(input, "score"),
      get(input, "to_par"),
      get(input, "net_score"),
      get(input, "net_to_par"),
      get(input, "birdies"),
      get(input, "eagles"),
    );
  }

  public static parseList(input: object[]): LeaderboardRow[] {
    return input.map((x) => this.parse(x));
  }
}

export default LeaderboardRow;
