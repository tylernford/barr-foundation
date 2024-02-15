class MediaPlayer {
  constructor(player, options) {
    this.player = player;
    this.progress = 0;
  }

  render(options) {
    const playerID = `player` + this.player.id;
    const renderedPlayer = document.getElementById(playerID);

    if (renderedPlayer) {
      return;
    }
    
    this.container = this.createElement('div', {
      class: 'playr',
      id: playerID
    });
  
    this.player.parentNode.insertBefore(this.container, this.player);
    this.container.appendChild(this.player);
  
    this.initPlayer();
    this.createUI();
    this.attachHandlers();
  }

  initPlayer() {
    this.player.controls = false;
    this.fileName = decodeURIComponent(this.player.src.split('/').pop());
    this.player.load();
  }

  attachHandlers() {
    var _scope = this;

    /* Play */
    this.playButton.addEventListener('click', this.play.bind(this));
    this.player.addEventListener('ended', this.reset.bind(this));
  }

  play() {
    var that = this;
    if (!!this.player.paused) {
      this.container.classList.add('playing');
      this.container.classList.remove('paused');
      this.player.play();
    } else {
      this.pause();
    }
  }

  pause() {
    if (this.player.paused) return;
    this.container.classList.add('paused');
    this.container.classList.remove('playing');
    this.player.pause();
  }

  reset() {
    this.player.currentTime = 0;
    this.container.classList.remove('playing');

    if (this.repeat) {
      this.play();
    }
  }

  setStyle(element, properties) {
    var property, css = '';
    for (property in properties) {
      css += property + ': ' + properties[property] + ';';
    }
    element.style.cssText += css;
  }

  createUI() {
    var _scope = this;
    var ui = this.createElement('div', {
      class: 'playr-ui'
    });
    this.playButton = this.createElement('button', {
      class: 'action action--button action--audio',
      type: 'button',
      html: `
        <span class="action__text">Listen</span>
        <span class="action__play"></span>
        <span class="action__pause"></span>
      `
    });

    ui.appendChild(this.playButton);

    this.container.appendChild(ui);
  }

  createElement(a, b) {
    var c = document,
      d = c.createElement(a);
    if (b && "object" == typeof b) {
      var e;
      for (e in b)
        if ("html" === e) d.innerHTML = b[e];
        else if ("text" === e) {
        var f = c.createTextNode(b[e]);
        d.appendChild(f)
      } else d.setAttribute(e, b[e])
    }
    return d
  }
}


function renderAudioPlayers() {
  const audioPlayers = document.querySelectorAll(`.audio__src`);

  for (let audioPlayer of audioPlayers) {
    // Render player
    player = new MediaPlayer(audioPlayer);
    player.render();
  }
}

// Render audio players
renderAudioPlayers();