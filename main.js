const $robotLid = document.querySelector('#robot-lid');
const $robotArm = document.querySelector('#robot-arm');
const $toggleTip = document.querySelector('#toggle-tip');

const $toggle = document.querySelector('#toggle');
let wait = false;

$toggle.onclick = () => {
  if (wait) {
    return;
  }
  wait = true;
  const rnd = Math.round(Math.random() * 2000);
  const rnd2 = Math.round(Math.random() * 1000);
  openTip();
  setTimeout(openLid, rnd + 100);
  setTimeout(openArm, rnd + rnd2 + 200, 100);
  setTimeout(closeTip, rnd + rnd2 + 300);
  setTimeout(closeArm, rnd + rnd2 + 400, 200);
  setTimeout(closeLid, rnd + rnd2 + 500);
  setTimeout(() => { wait = false; }, rnd + rnd2 + 500);
};

const openTip = () => {
  $toggleTip.classList.add('toggled');
};

const closeTip = () => {
  $toggleTip.classList.remove('toggled');
};

const openLid = () => {
  $robotLid.classList.add('opened');
};

const closeLid = (duration) => {
  $robotLid.classList.remove('opened');
};

const openArm = (duration) => {
  $robotArm.classList.add('reached');
};

const closeArm = (duration) => {
  $robotArm.classList.remove('reached');
};
