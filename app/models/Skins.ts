import { get, isNil } from "lodash";

class Skins {
  constructor(
    public outingRoundId: number,
    public courseId: number,
    public courseName: string,
    public teeTime: Date | undefined,
    public skins: Skin[],
  ) {}

  public static parse(input: object): Skins {
    const teeTimeString = get(input, "tee_time");
    const teeTime = !isNil(teeTimeString) ? new Date(teeTimeString) : undefined;

    return new Skins(
      get(input, "outing_round_id"),
      get(input, "course_id"),
      get(input, "course_name"),
      teeTime,
      Skin.parseList(get(input, "skins")),
    );
  }

  public static parseList(input: object[]): Skins[] {
    return input.map((x) => this.parse(x));
  }
}

export class Skin {
  constructor(
    public playerId: number,
    public playerFirstName: string,
    public playerLastName: string,
    public playerNickname: string,
    public holeNumber: number,
    public holePar: number,
    public score: number,
    public toPar: number,
    public netScore: number,
    public netToPar: number,
  ) {}

  public static parse(input: object): Skin {
    return new Skin(
      get(input, "player_id"),
      get(input, "player_first_name"),
      get(input, "player_last_name"),
      get(input, "player_nickname"),
      get(input, "hole_number"),
      get(input, "hole_par"),
      get(input, "score"),
      get(input, "to_par"),
      get(input, "net_score"),
      get(input, "net_to_par"),
    );
  }

  public static parseList(input: object[]): Skin[] {
    return input.map((x) => this.parse(x));
  }
}

export default Skins;
