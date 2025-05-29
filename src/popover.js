export class Popover {
  constructor(id, data) {
    this.id = id;
    this.content = data;
  }
  createPopover(event) {
    if (!document.getElementById(this.id)) {
      const body = document.querySelector("body");
      const popover = document.createElement("div");
      popover.classList.add("popover");
      popover.id = this.id;
      popover.appendChild(this._createPopoverTitle());
      popover.appendChild(this._createPopoverContent());
      body.appendChild(popover);

      const targetRect = event.target.getBoundingClientRect();
      const popoverWidth = popover.offsetWidth;
      const popoverHeight = popover.offsetHeight;

      const leftPosition =
        targetRect.left + targetRect.width / 2 - popoverWidth / 2;

      const topPosition = targetRect.top - popoverHeight - 5;

      popover.style.position = "absolute";
      popover.style.left = `${Math.max(0, leftPosition) + window.scrollX}px`;
      popover.style.top = `${Math.max(0, topPosition) + window.scrollY}px`;

      if (leftPosition + popoverWidth > window.innerWidth) {
        popover.style.left = `${window.innerWidth - popoverWidth + window.scrollX}px`;
      }
    } else {
      this._removePopover();
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

  _removePopover() {
    document.getElementById(this.id).remove();
  }
}
