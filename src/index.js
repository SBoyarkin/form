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

let testPopover1;
testPopover1 = {
  message: `And heres dome amazinf content. Its very engaging. Rigрt?`,
  title: `Popover title 2`,
};

const popoverBtn1 = new Btn("Click to toggle popover");
popoverBtn1.createBtn(document.body, testPopover1);
