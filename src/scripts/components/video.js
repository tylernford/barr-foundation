import Plyr from 'plyr';

const videoWrappers = document.querySelectorAll('.js-video-wrapper');
if (videoWrappers.length) {
  for (let videoWrapper of videoWrappers) {
    const videoPlayer = videoWrapper.querySelector(`.js-video`);
    const videoPlayButton = videoWrapper.querySelector(`.video-player__play-button`);
    const videoCover = videoWrapper.querySelector(`.video-player__cover`);

    videoPlayButton.addEventListener(`click`, function() {
      // Init player
      const player = new Plyr(videoPlayer, {
        iconUrl: `/build/svgs/plyr/plyr.svg`,
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'fullscreen'
        ],
        i18n: {
          play: 'Play Video',
        }
      });

      player.on(`ready`, () => {
        player.play();
      })

      videoPlayButton.classList.add(`-is-hidden`);
      setTimeout(() => {
        videoPlayButton.style.display = `none`
      }, 330);
      setTimeout(() => {
        videoCover.classList.add(`-is-hidden`);
      }, 480);

      player.on('enterfullscreen', () => {
        videoWrapper.classList.add(`-is-fullscreen`);
      });
      player.on('exitfullscreen', () => {
        videoWrapper.classList.remove(`-is-fullscreen`);
      });
    });
  }
}