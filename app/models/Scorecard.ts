import { get } from "lodash";

import ScorecardHole from "@/models/ScorecardHole";
import ScorecardPlayer from "@/models/ScorecardPlayer";
import TeamScore from "@/models/TeamScore";

class Scorecard {
  constructor(
    public holes: ScorecardHole[],
    public players: ScorecardPlayer[],
    public teamScore: TeamScore,
  ) {}

  public static parse(input: object): Scorecard {
    return new Scorecard(
      ScorecardHole.parseList(get(input, "holes", [])),
      ScorecardPlayer.parseList(get(input, "players", [])),
      TeamScore.parse(get(input, "team", {})),
    );
  }

  public static parseList(input: object[]): Scorecard[] {
    return input.map((x) => this.parse(x));
  }

  public frontPar(): number {
    var par = 0;
    this.holes.forEach((hole) => {
      if (hole.number <= 9) {
        par += hole.par;
      }
    });
    return par;
  }

  public backPar(): number {
    var par = 0;
    this.holes.forEach((hole) => {
      if (hole.number > 9) {
        par += hole.par;
      }
    });
    return par;
  }

  public totalPar(): number {
    var par = 0;
    this.holes.forEach((hole) => {
      par += hole.par;
    });
    return par;
  }
}

export default Scorecard;
