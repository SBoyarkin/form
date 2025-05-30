import { Popover } from "./popover";
export class Btn {
  constructor(name) {
    this.name = name;
    this.id = crypto.randomUUID();
  }
  createBtn(element, data) {
    const btn = document.createElement("div");
    btn.classList.add("btn");
    btn.textContent = this.name;
    element.append(btn);
    btn.addEventListener("click", (e) => {
      const popover = new Popover(this.id, data);
      popover.createPopover(e);
    });
  }
}
