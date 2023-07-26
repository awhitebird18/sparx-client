// notifications.js
const originalTitle = document.title;
const newTitle = 'New Message!';
let intervalId: ReturnType<typeof setInterval> | null;

function changeTitle() {
  if (document.title === originalTitle) {
    document.title = newTitle;
  } else {
    document.title = originalTitle;
  }
}

function startFlashingTitle() {
  // if already flashing, do nothing
  if (intervalId) return;

  // Set interval to flip title every 1 second
  intervalId = setInterval(changeTitle, 1000);
}

function stopFlashingTitle() {
  if (!intervalId) return;

  clearInterval(intervalId);
  intervalId = null;

  // Reset the title to original
  document.title = originalTitle;
}

export { startFlashingTitle, stopFlashingTitle };
