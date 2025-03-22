import { get, isNil } from "lodash";

import LeaderboardRow from "@/models/LeaderboardRow";
import Player from "@/models/Player";
import Skins from "@/models/Skins";
import Scorecard from "@/models/Scorecard";
import Outing from "@/models/Outing";
import OutingRound from "@/models/OutingRound";
import OutingGroup from "@/models/OutingGroup";
import OutingGroupPlayer from "@/models/OutingGroupPlayer";
import OutingPlayer from "@/models/OutingPlayer";

class Api {
  static BASE_URL = __DEV__
    ? "https://api.scoreboardgolf.com/api"
    : "https://api.scoreboardgolf.com/api";

  static async call(
    endpoint: string,
    method: RequestInit["method"] = "GET",
    headers: RequestInit["headers"] | undefined = undefined,
    body: RequestInit["body"] | undefined = undefined,
  ): Promise<any> {
    try {
      headers = typeof headers === "object" ? headers : {};
      headers.Authorization = "VhdMPfbDrnmTG9mvP6rJ6tNkqWZc";
      let response = await fetch(Api.BASE_URL + endpoint, {
        method,
        headers,
        body,
      });
      if (!response.ok) {
        console.error("In Api.call", "Bad result status from endpoint", {
          endpoint,
          method,
          headers,
          body,
        });
        throw new Error("Response from API was not OK");
      }
      let responseText: string = await response.text();
      var responseValue: any;
      if (responseText.length > 0) {
        responseValue = JSON.parse(responseText);
      }
      console.debug("In Api.call", "Response", {
        endpoint,
        method,
        headers,
        body,
        response,
        responseValue,
      });
      return responseValue;
    } catch (error) {
      console.log("In Api.call", "Error calling API", { endpoint, error });
      throw new Error(
        `Error while calling API endpoint, ${endpoint}, error: ${error}`,
      );
    }
  }

  static async getOutingWithInviteCode(inviteCode: string): Promise<Outing> {
    try {
      const url = `/v1/outings?invite_code=${inviteCode}`;
      const result: object[] = await Api.call(url);
      if (typeof result.length === "number" && result.length === 1) {
        return Outing.parse(result[0]);
      }
    } catch (_error) {}
    throw new Error(`Unable to find outing for: ${inviteCode}`);
  }

  static async getOuting(outingId: number): Promise<Outing> {
    try {
      const url = `/v1/outings/${outingId}`;
      const result: object = await Api.call(url);
      if (!isNil(get(result, "id"))) {
        return Outing.parse(result);
      }
    } catch (_error) {}
    throw new Error(`Unable to find outing: ${outingId}`);
  }

  static async getLeaderboard(outingId: number): Promise<LeaderboardRow[]> {
    try {
      const url = `/v1/outings/leaderboard?outing_id=${outingId}`;
      const result: object[] = await Api.call(url);
      return LeaderboardRow.parseList(result);
    } catch (_error) {}
    throw new Error(`Unable to get leaderboard for outing: ${outingId}`);
  }

  static async getPlayer(emailAddress: string): Promise<Player> {
    try {
      const url = `/v1/players?email_address=${emailAddress}`;
      const result: object[] = await Api.call(url);
      if (typeof result.length === "number" && result.length === 1) {
        return Player.parse(result[0]);
      }
    } catch (_error) {}
    throw new Error(`Unable to get player for: ${emailAddress}`);
  }

  static async getOutings(playerId: number): Promise<Outing[]> {
    try {
      const url = `/v1/outings?player_id=${playerId}`;
      const result: object[] = await Api.call(url);
      return Outing.parseList(result);
    } catch (_error) {}
    throw new Error(`Unable to get outings for player: ${playerId}`);
  }

  static async getSkins(outingId: number): Promise<Skins[]> {
    try {
      const url = `/v1/outings/skins?outing_id=${outingId}`;
      const result: object[] = await Api.call(url);
      return Skins.parseList(result);
    } catch (_error) {}
    throw new Error(`Unable to get skins for outing: ${outingId}`);
  }

  static async getOutingRounds(outingId: number): Promise<OutingRound[]> {
    try {
      const url = `/v1/outing-rounds?outing_id=${outingId}&preload_course&preload_groups`;
      const result: object[] = await Api.call(url);
      return OutingRound.parseList(result);
    } catch (_error) {}
    throw new Error(`Unable to get rounds for outing: ${outingId}`);
  }

  static async getOutingPlayers(outingId: number): Promise<OutingPlayer[]> {
    try {
      const url = `/v1/outing-players?outing_id=${outingId}&preload_player`;
      const result: object[] = await Api.call(url);
      return OutingPlayer.parseList(result);
    } catch (_error) {}
    throw new Error(`Unable to get players for outing: ${outingId}`);
  }

  static async getRoundGroups(outingRoundId: number): Promise<OutingGroup[]> {
    try {
      const url = `/v1/outing-groups?outing_round_id=${outingRoundId}`;
      const result: object[] = await Api.call(url);
      return OutingGroup.parseList(result);
    } catch (_error) {}
    throw new Error(`Unable to get groups for outing round: ${outingRoundId}`);
  }

  static async getScorecard(outingGroupId: number): Promise<Scorecard> {
    try {
      const url = `/v1/outing-groups/scorecard?outing_group_id=${outingGroupId}`;
      const result: object = await Api.call(url);
      return Scorecard.parse(result);
    } catch (_error) {}
    throw new Error(`Unable to get scorecard for group: ${outingGroupId}`);
  }

  static async getOutingGroupPlayers(
    outingGroupId: number,
  ): Promise<OutingGroupPlayer[]> {
    try {
      const url = `/v1/outing-group-players/?outing_group_id=${outingGroupId}`;
      const result: object[] = await Api.call(url);
      return OutingGroupPlayer.parseList(result);
    } catch (_error) {}
    throw new Error(`Unable to get players for group: ${outingGroupId}`);
  }

  static async updateScore(
    outingGroupId: number,
    playerId: number,
    holeId: number,
    score: number,
  ): Promise<Scorecard> {
    try {
      const url = "/v1/outing-groups/score";
      const result: object = await Api.call(
        url,
        "POST",
        { "Content-type": "application/json" },
        JSON.stringify({
          outing_group_id: outingGroupId,
          player_id: playerId,
          hole_id: holeId,
          score: score,
        }),
      );
      return Scorecard.parse(result);
    } catch (_error) {}
    throw new Error(`Unable to get scorecard for group: ${outingGroupId}`);
  }
}

export default Api;
