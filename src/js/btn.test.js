import { Btn } from "../btn";

jest.mock("../popover", () => {
  return {
    Popover: jest.fn().mockImplementation(() => ({
      createPopover: jest.fn(),
    })),
  };
});

describe("Btn class", () => {
  const name = "Test Name";
  let btn;
  let cryptoSpy;
  let container;

  beforeAll(() => {
    cryptoSpy = jest
      .spyOn(require("crypto"), "randomUUID")
      .mockReturnValue("mocked-uuid-1234");
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    btn = new Btn(name);
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.removeChild(container);
  });

  afterAll(() => {
    cryptoSpy.mockRestore();
  });

  test("should create instance with correct name", () => {
    expect(btn.name).toBe(name);
    expect(btn.id).toBe("mocked-uuid-1234");
    expect(cryptoSpy).toHaveBeenCalledTimes(1);
  });

  test("should generate new UUID for each instance", () => {
    const btn2 = new Btn("Another button");
    expect(btn2.id).toBe("mocked-uuid-1234");
    expect(cryptoSpy).toHaveBeenCalledTimes(2);
  });

  describe("createBtn()", () => {
    const mockData = {
      title: "Test Popover",
      content: "Test content",
    };

    test("should create button element in DOM", () => {
      btn.createBtn(container, mockData);

      const button = container.querySelector(".btn");
      expect(button).not.toBeNull();
      expect(button.textContent).toBe(name);
    });
  });
});
