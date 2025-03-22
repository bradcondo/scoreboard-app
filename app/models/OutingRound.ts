import { get, isNil } from "lodash";

import Course from "@/models/Course";
import OutingGroup from "@/models/OutingGroup";

class OutingRound {
  constructor(
    public id: number,
    public outingId: number,
    public courseId: number,
    public course: Course,
    public teeTime: Date | undefined,
    public groups: OutingGroup[],
  ) {}

  public static parse(input: object): OutingRound {
    const teeTimeString = get(input, "tee_time");
    const teeTime = !isNil(teeTimeString) ? new Date(teeTimeString) : undefined;

    return new OutingRound(
      get(input, "id"),
      get(input, "outing_id"),
      get(input, "course_id"),
      Course.parse(get(input, "course")),
      teeTime,
      OutingGroup.parseList(get(input, "outing_groups", [])),
    );
  }

  public static parseList(input: object[]): OutingRound[] {
    return input.map((x) => this.parse(x));
  }

  public dump(): object {
    return {
      id: this.id,
      outing_id: this.outingId,
      course_id: this.courseId,
      course: this.course.dump(),
      tee_time: this.teeTime?.toISOString(),
      outing_groups: OutingGroup.dumpList(this.groups),
    };
  }

  public static dumpList(outingGroups: OutingGroup[]): object[] {
    return outingGroups.map((x) => x.dump());
  }

  public when(): string | null {
    if (!isNil(this.teeTime)) {
      return `${this.teeTime.toLocaleString()}`;
    }
    return null;
  }
}

export default OutingRound;
