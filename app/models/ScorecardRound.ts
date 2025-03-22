import {get} from 'lodash';

import ScorecardScore from '@models/ScorecardScore';

class ScorecardRound {
  constructor(
    public id: number,
    public scores: ScorecardScore[],
    public score: number,
    public toPar: number,
    public netScore: number,
    public netToPar: number,
    public frontScore: number,
    public frontToPar: number,
    public backScore: number,
    public backToPar: number,
  ) {}

  public static parse(input: object): ScorecardRound {
    return new ScorecardRound(
      get(input, 'id'),
      ScorecardScore.parseList(get(input, 'scores', [])),
      get(input, 'score'),
      get(input, 'to_par'),
      get(input, 'net_score'),
      get(input, 'net_to_par'),
      get(input, 'front_score'),
      get(input, 'front_to_par'),
      get(input, 'back_score'),
      get(input, 'back_to_par'),
    );
  }

  public static parseList(input: object[]): ScorecardRound[] {
    return input.map((x) => this.parse(x));
  }
}

export default ScorecardRound;
