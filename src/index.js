import "./css/style.css";
import { Popover } from "./popover";
import { Btn } from "./btn";
import "./js/app";

let testPopover;
testPopover = {
  message: `And heres dome amazinf content. Its very engaging. Rigрt?`,
  title: `Popover title`,
};

const popoverBtn = new Btn("Click to toggle popover");
popoverBtn.createBtn(document.body, testPopover);
