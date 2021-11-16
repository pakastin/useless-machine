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
  const rnd = Math.round(Math.random() * 1000);
  const rnd2 = Math.round(Math.random() * 1000);
  toggleOn();
  setTimeout(openLid, rnd + 100);
  setTimeout(reachArm, rnd + rnd2 + 200);
  setTimeout(toggleOff, rnd + rnd2 + 300);
  setTimeout(retractArm, rnd + rnd2 + 400);
  setTimeout(closeLid, rnd + rnd2 + 500);
  setTimeout(() => { wait = false; }, rnd + rnd2 + 500);
};

const toggleOn = () => {
  $toggleTip.classList.add('toggled');
};

const toggleOff = () => {
  $toggleTip.classList.remove('toggled');
};

const openLid = () => {
  $robotLid.classList.add('opened');
};

const closeLid = (duration) => {
  $robotLid.classList.remove('opened');
};

const reachArm = (duration) => {
  $robotArm.classList.add('reached');
};

const retractArm = (duration) => {
  $robotArm.classList.remove('reached');
};
