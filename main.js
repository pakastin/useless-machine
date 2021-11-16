const $robotLid = document.querySelector('#robot-lid');
const $robotArm = document.querySelector('#robot-arm');
const $toggleTip = document.querySelector('#toggle-tip');
const $bullets = document.querySelectorAll('.bullet');

const $toggle = document.querySelector('#toggle');
let busy = false;

$toggle.onclick = async () => {
  if (busy) {
    return;
  }
  busy = true;
  toggleOn();
  await wait(Math.round(Math.random() * 1000));
  await openLid();
  await wait(Math.round(Math.random() * 1000));
  if (Math.random() < 0.25) {
    // just peek first
    await wait(500);
    await closeLid();
    await wait(Math.round(Math.random() * 1000));
    await openLid();
    await wait(Math.round(Math.random() * 1000));
  }
  if (Math.random() < 0.25) {
    await shoot();
    await toggleOff();
  } else {
    if (Math.random() < 0.25) {
      await moveToggleUp();
      await reachArm();
      await wait(100);
      await retractArm();
      await wait(Math.round(Math.random() * 2000));
      await moveToggleBack();
    }
    if (Math.random() < 0.25) {
      await moveToggleDown();
      await reachArm();
      await wait(100);
      await retractArm();
      await wait(Math.round(Math.random() * 2000));
      await moveToggleBack();
    }
    await reachArm();
    await toggleOff();
    await retractArm();
  }
  await closeLid();
  busy = false;
};

const wait = async (time) => new Promise((resolve) => setTimeout(resolve, time));

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
  await wait(250);
};

const moveToggleDown = async () => {
  $toggle.classList.add('move-down');
  await wait(250);
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
