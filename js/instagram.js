export function initInstagram() {
  const process = () => {
    if (window.instgrm?.Embeds?.process) {
      window.instgrm.Embeds.process();
    }
  };

  process();

  // Instagram's script may load after us; retry briefly.
  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    process();
    if (window.instgrm?.Embeds?.process || attempts > 20) {
      window.clearInterval(timer);
    }
  }, 250);
}
