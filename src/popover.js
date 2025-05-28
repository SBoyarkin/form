export class Popover {
  constructor(id, data) {
    this.id = id;
    this.content = data;
  }
  createPopover() {
    if (!document.getElementById(this.id)) {
      const body = document.querySelector("body");
      const popover = document.createElement("div");
      popover.classList.add("popover");
      popover.id = this.id;
      popover.appendChild(this._createPopoverTitle());
      popover.appendChild(this._createPopoverContent());
      body.appendChild(popover);
    }
  }

  _createPopoverTitle() {
    const popoverTitle = document.createElement("div");
    popoverTitle.classList.add("popover-title");
    popoverTitle.textContent = this.content.title;
    return popoverTitle;
  }

  _createPopoverContent() {
    const popoverContent = document.createElement("div");
    popoverContent.classList.add("popover-content");
    popoverContent.textContent = this.content.message;
    return popoverContent;
  }
}
