import { get } from "lodash";

class Course {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public phoneNumber: string,
  ) {}

  public static parse(input: object): Course {
    return new Course(
      get(input, "id"),
      get(input, "name"),
      get(input, "address"),
      get(input, "city"),
      get(input, "state"),
      get(input, "zip_code"),
      get(input, "phone_number"),
    );
  }

  public static parseList(input: object[]): Course[] {
    return input.map((x) => this.parse(x));
  }

  public dump(): object {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      city: this.city,
      state: this.state,
      zip_code: this.zipCode,
      phone_number: this.phoneNumber,
    };
  }

  public static dumpList(courses: Course[]): object[] {
    return courses.map((x) => x.dump());
  }
}

export default Course;
