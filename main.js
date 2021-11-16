const $robotLid = document.querySelector('#robot-lid');
const $robotArm = document.querySelector('#robot-arm');
const $toggleTip = document.querySelector('#toggle-tip');
const $bullets = document.querySelectorAll('.bullet');

const $toggle = document.querySelector('#toggle');
let busy = false;

const go = async () => {
  if (busy) {
    return;
  }
  busy = true;
  await toggleOn();
  await wait(Math.round(Math.random() * 1000));
  await openLid();
  await wait(Math.round(Math.random() * 1000));
  if (Math.random() < 0.25) {
    await eat();
  }
  if (Math.random() < 0.25) {
    await wait(500 + Math.round(Math.random() * 1000));
    await closeLid();
    await wait(500 + Math.round(Math.random() * 1000));
    await openLid();
    await wait(Math.round(Math.random() * 1000));
  }
  if (Math.random() < 0.25) {
    await shoot();
    await toggleOff();
  } else {
    const dir = Math.random() < 0.5;
    if (Math.random() < 0.25) {
      await (dir ? moveToggleUp : moveToggleDown)();
      await reachArm();
      await wait(150);
      await retractArm();
      await wait(Math.round(Math.random() * 1000));
      await moveToggleBack();
    }
    if (Math.random() < 0.25) {
      await (dir ? moveToggleDown : moveToggleUp)();
      await reachArm();
      await wait(150);
      await retractArm();
      await wait(Math.round(Math.random() * 1000));
      await moveToggleBack();
    }
    await reachArm();
    await toggleOff();
    await retractArm();
  }
  await closeLid();
  busy = false;
};

document.addEventListener('keydown', go);

$toggle.onclick = $toggle.onmousedown = $toggle.ontouchstart = go;

const wait = async (time) => new Promise((resolve) => setTimeout(resolve, time));

const eat = async () => {
  $robotArm.classList.add('reached');
  await wait(200);
  $toggle.classList.add('eat');
  $robotArm.classList.remove('reached');
  await wait(100);
  $robotLid.classList.remove('opened');
  await wait(1000 + Math.round(Math.random() * 1000));
  $robotLid.classList.add('opened');
  await wait(100);
  $toggle.classList.remove('eat');
  await wait(100);
  $robotLid.classList.remove('opened');
  await wait(500 + Math.round(Math.random() * 1000));
  $robotLid.classList.add('opened');
  await wait(100);
};

const shoot = async () => {
  $toggleTip.style.transition = 'background-color 1s, transform 1s';
  $toggleTip.style.transitionTimingFunction = 'linear';
  $toggleTip.classList.remove('toggled');
  await wait(100);
  for (const $bullet of $bullets) {
    $bullet.style.opacity = 1;
    $bullet.classList.add('fire');
    await wait(100);
    $bullet.style.opacity = 0;
    $bullet.classList.remove('fire');
  }
  $toggleTip.style.transition = '';
  $toggleTip.style.transitionTimingFunction = '';
};

const moveToggleUp = async () => {
  $toggle.classList.add('move-up');
};

const moveToggleDown = async () => {
  $toggle.classList.add('move-down');
};

const moveToggleBack = async () => {
  $toggle.classList.remove('move-up');
  $toggle.classList.remove('move-down');
  await wait(250);
};

const toggleOn = async () => {
  $toggleTip.classList.add('toggled');
  await wait(100);
};

const toggleOff = async () => {
  $toggleTip.classList.remove('toggled');
  await wait(100);
};

const openLid = async () => {
  $robotLid.classList.add('opened');
  await wait(100);
};

const closeLid = async (duration) => {
  $robotLid.classList.remove('opened');
  await wait(100);
};

const reachArm = async (duration) => {
  $robotArm.classList.add('reached');
  await wait(100);
};

const retractArm = async (duration) => {
  $robotArm.classList.remove('reached');
  await wait(100);
};
