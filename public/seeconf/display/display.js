(() => {
  'use strict';

  const WIDTH = 1600;
  const HEIGHT = 900;
  const DURATION = 10_000;
  const sceneIds = ['hero', 'install', 'pack', 'web'];
  const sceneNames = ['首页', '依赖安装', '增量构建', '浏览器开发'];
  const stage = document.getElementById('stage');
  const scenes = [...document.querySelectorAll('[data-scene]')];
  const navButtons = [...document.querySelectorAll('[data-target]')];
  const sceneNumber = document.getElementById('scene-number');
  const announcement = document.getElementById('scene-announcement');
  const progress = document.getElementById('scene-progress');
  const playButton = document.getElementById('play-toggle');
  const fullscreenButton = document.getElementById('fullscreen-toggle');

  let current = Math.max(0, sceneIds.indexOf(location.hash.replace(/^#\/?/, '')));
  let playing = true;
  let elapsed = 0;
  let previousTick = performance.now();

  const resize = () => {
    const scale = Math.min(innerWidth / WIDTH, innerHeight / HEIGHT);
    stage.style.setProperty('--stage-scale', String(scale));
    stage.style.left = `${Math.max(0, (innerWidth - WIDTH * scale) / 2)}px`;
    stage.style.top = `${Math.max(0, (innerHeight - HEIGHT * scale) / 2)}px`;
  };

  const showScene = (index, updateHash = true) => {
    current = (index + scenes.length) % scenes.length;
    scenes.forEach((scene, sceneIndex) => {
      const active = sceneIndex === current;
      scene.hidden = !active;
      scene.classList.toggle('active', active);
      scene.setAttribute('aria-hidden', String(!active));
    });
    navButtons.forEach((button, buttonIndex) => {
      if (buttonIndex === current) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    sceneNumber.textContent = String(current + 1).padStart(2, '0');
    announcement.textContent = `当前第 ${current + 1} 屏：${sceneNames[current]}`;
    elapsed = 0;
    progress.style.transform = 'scaleX(0)';
    if (updateHash) history.replaceState(null, '', `#/${sceneIds[current]}`);
  };

  const togglePlaying = () => {
    playing = !playing;
    playButton.setAttribute('aria-pressed', String(!playing));
    playButton.setAttribute('aria-label', playing ? '暂停自动播放' : '继续自动播放');
    playButton.innerHTML = playing ? 'Ⅱ <span>轮播中</span>' : '▶ <span>已暂停</span>';
    previousTick = performance.now();
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      fullscreenButton.title = '可通过浏览器菜单进入全屏';
    }
  };

  navButtons.forEach((button, index) => {
    button.addEventListener('click', () => showScene(index));
  });
  playButton.addEventListener('click', togglePlaying);
  fullscreenButton.addEventListener('click', toggleFullscreen);

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
    const target = event.target;
    if (target instanceof Element && target.closest('input,textarea,select,[contenteditable="true"]')) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      showScene(current + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      showScene(current - 1);
    } else if (/^[1-4]$/.test(event.key)) {
      event.preventDefault();
      showScene(Number(event.key) - 1);
    } else if (event.key === ' ' || event.code === 'Space') {
      event.preventDefault();
      togglePlaying();
    } else if (event.key.toLowerCase() === 'f') {
      event.preventDefault();
      toggleFullscreen();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    const fullscreen = Boolean(document.fullscreenElement);
    fullscreenButton.setAttribute('aria-pressed', String(fullscreen));
    fullscreenButton.setAttribute('aria-label', fullscreen ? '退出全屏' : '进入全屏');
    fullscreenButton.innerHTML = `⛶ <span>${fullscreen ? '退出' : '全屏'}</span>`;
    resize();
  });
  document.addEventListener('visibilitychange', () => { previousTick = performance.now(); });
  window.addEventListener('hashchange', () => {
    const hashScene = sceneIds.indexOf(location.hash.replace(/^#\/?/, ''));
    if (hashScene >= 0 && hashScene !== current) showScene(hashScene, false);
  });
  window.addEventListener('resize', resize, { passive: true });

  const tick = (now) => {
    if (playing && !document.hidden) {
      elapsed += Math.max(0, now - previousTick);
      if (elapsed >= DURATION) showScene(current + 1);
      progress.style.transform = `scaleX(${Math.min(1, elapsed / DURATION)})`;
    }
    previousTick = now;
    requestAnimationFrame(tick);
  };

  resize();
  showScene(current, false);
  requestAnimationFrame(tick);
})();


