import { Btn } from "../btn";

jest.mock("crypto");
describe("Btn class", () => {
  const name = "Test Name";
  const btn = new Btn(name);

  test("should create instance with correct name and id", () => {
    expect(btn.name).toBe(name);
  });
});
