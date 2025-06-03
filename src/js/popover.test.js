import { Popover } from "../popover";

describe("Popover class", () => {
  const mockData = {
    title: "Test Title",
    message: "Test Message Content",
  };
  const popoverId = "test-popover";
  let popover;
  let originalScrollX;
  let originalScrollY;
  let originalInnerWidth;

  beforeEach(() => {
    originalScrollX = window.scrollX;
    originalScrollY = window.scrollY;
    originalInnerWidth = window.innerWidth;

    Object.defineProperty(window, "scrollX", { value: 0, writable: true });
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    Object.defineProperty(window, "innerWidth", {
      value: 1024,
      writable: true,
    });

    document.body.innerHTML = '<button id="target">Click me</button>';
    popover = new Popover(popoverId, mockData);
  });

  afterEach(() => {
    Object.defineProperty(window, "scrollX", { value: originalScrollX });
    Object.defineProperty(window, "scrollY", { value: originalScrollY });
    Object.defineProperty(window, "innerWidth", { value: originalInnerWidth });

    document.body.innerHTML = "";
  });

  describe("createPopover()", () => {
    test("should create popover with correct structure", () => {
      const event = { target: document.getElementById("target") };
      popover.createPopover(event);

      const popoverElement = document.getElementById(popoverId);
      expect(popoverElement).not.toBeNull();
      expect(popoverElement.classList.contains("popover")).toBe(true);
    });

    test("should position popover correctly", () => {
      const mockRect = {
        left: 100,
        top: 200,
        width: 50,
        height: 30,
      };

      const event = {
        target: {
          getBoundingClientRect: jest.fn().mockReturnValue(mockRect),
        },
      };
      jest
        .spyOn(HTMLElement.prototype, "offsetWidth", "get")
        .mockReturnValue(200);
      jest
        .spyOn(HTMLElement.prototype, "offsetHeight", "get")
        .mockReturnValue(100);

      popover.createPopover(event);
      const popoverElement = document.getElementById(popoverId);

      expect(popoverElement.style.left).toBe("25px");
      expect(popoverElement.style.top).toBe("95px");
    });
  });
  test("should remove popover if it already exists", () => {
    const event = { target: document.getElementById("target") };

    popover.createPopover(event);
    expect(document.getElementById(popoverId)).not.toBeNull();

    popover.createPopover(event);
    expect(document.getElementById(popoverId)).toBeNull();
  });

  describe("Helper methods", () => {
    test("_createPopoverTitle() should create title element", () => {
      const titleElement = popover._createPopoverTitle();
      expect(titleElement.classList.contains("popover-title")).toBe(true);
      expect(titleElement.textContent).toBe(mockData.title);
    });

    test("_createPopoverContent() should create content element", () => {
      const contentElement = popover._createPopoverContent();
      expect(contentElement.classList.contains("popover-content")).toBe(true);
      expect(contentElement.textContent).toBe(mockData.message);
    });

    test("_removePopover() should remove popover from DOM", () => {
      document.body.innerHTML = `<div id="${popoverId}"></div>`;
      expect(document.getElementById(popoverId)).not.toBeNull();

      popover._removePopover();
      expect(document.getElementById(popoverId)).toBeNull();
    });
  });
});
