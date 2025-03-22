import {get} from 'lodash';

class TeamScore {
  constructor(
    public netToPars: number[],
    public frontNetToPar: number,
    public backNetToPar: number,
    public totalNetToPar: number,
  ) {}

  public static parse(input: object): TeamScore {
    return new TeamScore(
      get(input, 'net_to_pars'),
      get(input, 'front_net_to_par'),
      get(input, 'back_net_to_par'),
      get(input, 'total_net_to_par'),
    );
  }
}

export default TeamScore;
