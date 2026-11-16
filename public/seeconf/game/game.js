"use strict";

// The original Build Blades canvas mechanics, adapted for the SEE Conf booth.
const $ = (selector) => document.querySelector(selector);
const canvas = $("#playfield");
const ctx = canvas.getContext("2d");
const stage = $("[data-stage]");
const overlay = $("[data-overlay]");
const core = $("[data-core]");
const touchControls = window.matchMedia("(pointer: coarse), (max-width: 800px)");
const GAME = { width: 700, height: 700, x: 350, y: 326, radius: 108, bladeWidth: 5, handleWidth: 7, startY: 650, targetY: 491, projectileSpeed: 760 };
const TOOLS = [
  { label: "依赖", color: "#24bee9" }, { label: "开发", color: "#298ff0" },
  { label: "构建", color: "#1765db" }, { label: "Rust", color: "#ee6b3b" },
  { label: "原生", color: "#5867e8" }, { label: "WASM", color: "#20b8bc" },
  { label: "网页", color: "#2dbb82" }, { label: "部署", color: "#7059e6" },
];
const MOTIONS = [
  { factor: 1, duration: 1, label: "匀速旋转", tone: "blue" },
  { factor: 1.55, duration: .78, label: "加速旋转！", tone: "orange" },
  { factor: .45, duration: .74, label: "慢速旋转", tone: "blue" },
  { factor: -.9, duration: .9, label: "反向旋转！", tone: "orange" },
  { factor: -1.45, duration: .76, label: "反向加速！", tone: "orange" },
  { factor: -.42, duration: .72, label: "反向慢速", tone: "blue" },
];
const HUES = [202, 178, 148, 268, 18, 326, 42, 226];
// A new, event-specific record starts at zero and never imports demo scores.
const STORAGE_KEY = "utoo-seeconf-2026-build-blades-best-v1";
let best = loadBest();
let state;
let lastFrame = performance.now();
let feedbackTime = 0;
let effectTime = 0;
let lastControlTime = -Infinity;
const particles = [];
const fallen = [];

function loadBest() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Number.isFinite(value?.score) && Number.isFinite(value?.level)) {
      return { score: Math.max(0, Math.floor(value.score)), level: Math.max(1, Math.floor(value.level)) };
    }
  } catch { /* Storage may be disabled; gameplay still works. */ }
  return { score: 0, level: 1 };
}

function recordBest() {
  if (state.points <= best.score && state.level <= best.level) return;
  best = { score: Math.max(best.score, state.points), level: Math.max(best.level, state.level) };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(best)); } catch { /* Optional persistence. */ }
  renderRecord();
}

function renderRecord() {
  $("[data-best-score]").textContent = String(best.score).padStart(3, "0");
  $("[data-best-level]").textContent = String(best.level);
}

const goal = () => Math.min(4 + state.level, 10);
const baseSpeed = () => Math.min(.82 + (state.level - 1) * .16, 1.8);
const motionDelay = () => Math.max(1.45, 3.2 - (state.level - 1) * .16);
const hue = () => HUES[(state.level - 1) % HUES.length];
const nextTool = () => TOOLS[state.inserted % TOOLS.length];
const normalize = (angle) => ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
const distance = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
const collisionAngle = Math.max(2 * Math.asin(GAME.bladeWidth / GAME.radius), 2 * Math.asin(GAME.handleWidth / 175));

function resetRun() {
  state = { phase: "ready", level: 1, progress: 0, inserted: 0, points: 0, combo: 0, lives: 2,
    angle: 0, speed: .82, targetSpeed: .82, motion: 0, motionTime: 3.2,
    knives: [], projectile: null, wait: 0, recordAtStart: best.score };
  particles.length = 0;
  fallen.length = 0;
  feedbackTime = 0;
  effectTime = 0;
  stage.classList.remove("is-hit", "is-miss");
  $("[data-banner]").classList.remove("is-visible");
  setupKnives();
  setOverlay("ready");
  updateInterface();
}

function setupKnives() {
  const count = Math.min(2 + Math.floor((state.level - 1) / 3), 4);
  state.knives = Array.from({ length: count }, (_, i) => ({ localAngle: (i + 1) * Math.PI * 2 / (count + 1) + .35, color: "#70849a", label: "障碍", blocker: true }));
  stage.style.setProperty("--level-hue", String(hue()));
}

function startRun() {
  if (state.phase !== "ready") return;
  state.phase = "playing";
  overlay.hidden = true;
  canvas.focus({ preventScroll: true });
  showFeedback("第 1 关 · 开始", "blue");
  updateInterface();
}

function startLevel() {
  state.phase = "playing";
  state.progress = 0;
  state.angle = 0;
  state.speed = (state.level % 2 === 0 ? -1 : 1) * baseSpeed();
  state.targetSpeed = state.speed;
  state.motion = 0;
  state.motionTime = motionDelay();
  state.projectile = null;
  setupKnives();
  state.wait = .95;
  $("[data-banner]").innerHTML = `<strong>第 ${state.level} 关</strong><span>插入 ${goal()} 把小刀</span>`;
  $("[data-banner]").classList.add("is-visible");
  updateInterface();
}

function shoot() {
  if (state.phase !== "playing" || state.wait > 0 || state.projectile) return;
  state.projectile = { ...nextTool(), y: GAME.startY };
  showFeedback(`${state.projectile.label} · 发射！`, state.projectile.label === "Rust" ? "orange" : "blue");
}

function handlePlay() {
  const now = performance.now();
  if (now - lastControlTime < 100) return;
  lastControlTime = now;
  if (state.phase === "ready") startRun();
  else if (state.phase === "playing") shoot();
}

function pauseRun() {
  if (state.phase !== "playing" && state.phase !== "level-clear") return;
  state.resumePhase = state.phase;
  state.phase = "paused";
  setOverlay("paused");
  updateInterface();
}

function resumeRun() {
  if (state.phase !== "paused") return;
  state.phase = state.resumePhase || "playing";
  overlay.hidden = true;
  canvas.focus({ preventScroll: true });
  lastFrame = performance.now();
  updateInterface();
}

function finishRun() {
  if (state.phase === "ready" || state.phase === "finished") return;
  state.phase = "finished";
  state.projectile = null;
  state.wait = 0;
  $("[data-banner]").classList.remove("is-visible");
  recordBest();
  setOverlay("finished");
  updateInterface();
}

function setOverlay(mode) {
  overlay.hidden = false;
  $("[data-stamp]").hidden = mode !== "finished";
  $("[data-result-home]").hidden = mode === "ready";
  const button = $("[data-overlay-action]");
  if (mode === "ready") {
    $("[data-kicker]").textContent = "SEE CONF 2026 · 准备好了吗？";
    $("[data-overlay-title]").textContent = touchControls.matches ? "点按开始挑战" : "准备好，开始挑战";
    $("[data-overlay-copy]").textContent = "找准构建盘的空位，试试你能到第几关。每局有 2 次机会。";
    button.textContent = "开始第 1 关";
  } else if (mode === "paused") {
    $("[data-kicker]").textContent = "稍作休息 · 进度已保留";
    $("[data-overlay-title]").textContent = "挑战已暂停";
    $("[data-overlay-copy]").textContent = `当前第 ${state.level} 关，得分 ${state.points}。准备好后继续，也可结束本局查看集章提示。`;
    button.textContent = "继续挑战";
  } else {
    $("[data-kicker]").textContent = state.points > state.recordAtStart ? "SEE CONF 2026 · 新的本机纪录！" : "SEE CONF 2026 · 本局结束";
    $("[data-overlay-title]").textContent = `第 ${state.level} 关 · ${state.points} 分`;
    $("[data-overlay-copy]").textContent = `成功插入 ${state.inserted} 把工具链小刀。本机最佳 ${best.score} 分，最高到达第 ${best.level} 关。`;
    button.textContent = "再来一局";
  }
  // Dialog buttons use the browser's native keyboard activation, exactly once.
  button.focus({ preventScroll: true });
}

function showFeedback(text, tone) {
  $("[data-feedback]").textContent = text;
  $("[data-feedback]").dataset.tone = tone;
  $("[data-feedback]").classList.add("is-visible");
  feedbackTime = .95;
}

function burst(x, y, amount, color) {
  for (let i = 0; i < amount; i++) {
    const angle = Math.PI * 2 * i / amount + Math.random() * .12;
    const speed = 55 + Math.random() * 105;
    particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, color });
  }
}

function resolveProjectile() {
  const blade = state.projectile;
  if (!blade) return;
  state.projectile = null;
  const collision = state.knives.some((knife) => distance(normalize(knife.localAngle + state.angle), Math.PI / 2) < collisionAngle);
  if (collision) {
    state.lives--;
    state.combo = 0;
    fallen.push({ ...blade, x: GAME.x, y: GAME.targetY, vx: Math.random() > .5 ? 150 : -150, vy: -120, rotation: 0, spin: Math.random() > .5 ? 4 : -4, opacity: 1 });
    burst(GAME.x, GAME.y + GAME.radius, 12, "#ef6170");
    stage.classList.remove("is-hit");
    stage.classList.add("is-miss");
    effectTime = .4;
    showFeedback(state.lives > 0 ? "撞刀了！再找一个空位" : "本局挑战完成", "red");
    if (state.lives <= 0) finishRun();
    else state.wait = .52;
    updateInterface();
    return;
  }
  state.knives.push({ ...blade, localAngle: Math.PI / 2 - state.angle, blocker: false });
  state.progress++;
  state.inserted++;
  state.combo++;
  const earned = 100 * state.level * state.combo;
  state.points += earned;
  burst(GAME.x, GAME.y + GAME.radius, 18, blade.color);
  stage.classList.remove("is-miss");
  stage.classList.add("is-hit");
  effectTime = .4;
  showFeedback(`插入成功 · 连击 ×${state.combo} · +${earned}`, blade.label === "Rust" ? "orange" : "blue");
  state.wait = .1;
  if (state.progress >= goal()) {
    state.phase = "level-clear";
    const bonus = 500 * state.level * state.lives;
    state.points += bonus;
    state.wait = .62;
    showFeedback(`第 ${state.level} 关完成 · +${bonus}`, "orange");
  }
  recordBest();
  updateInterface();
}

function updateInterface() {
  $("[data-level]").textContent = String(state.level);
  $("[data-progress]").textContent = String(state.progress);
  $("[data-goal]").textContent = String(goal());
  $("[data-points]").textContent = String(state.points).padStart(3, "0");
  $("[data-lives]").textContent = ["♡ ♡", "♥ ♡", "♥ ♥"][state.lives];
  $("[data-lives]").setAttribute("aria-label", `剩余 ${state.lives} 次机会`);
  $("[data-current]").textContent = nextTool().label;
  const phaseLabel = { ready: "准备中", playing: "进行中", "level-clear": "过关", paused: "已暂停", finished: "已结束" }[state.phase];
  $("[data-state]").textContent = `${phaseLabel} · ${state.phase === "finished" ? "成绩不影响集章" : `${state.lives} 次机会`}`;
  $(".stage-card").dataset.phase = state.phase;
  $("[data-fire-label]").textContent = state.phase === "ready" ? "开始挑战" : touchControls.matches ? "点按发射" : "点击 / 空格发射";
  $("[data-control-key]").textContent = touchControls.matches ? "点按" : "空格";
  canvas.setAttribute("aria-label", touchControls.matches ? "构建盘游戏。点按画面或发射按钮发射小刀，使用暂停按钮暂停。" : "构建盘游戏。点击画面或按空格键发射小刀，按 P 暂停。");
  if (state.phase === "ready") $("[data-overlay-title]").textContent = touchControls.matches ? "点按开始挑战" : "准备好，开始挑战";
  $("[data-fire]").disabled = !["ready", "playing"].includes(state.phase);
  $("[data-pause]").disabled = !["playing", "level-clear", "paused"].includes(state.phase);
  $("[data-pause]").textContent = state.phase === "paused" ? "继续" : "暂停";
  $("[data-finish]").disabled = ["ready", "finished"].includes(state.phase);
  $("[data-combo]").classList.toggle("is-visible", state.combo >= 2 && state.phase === "playing");
  $("[data-combo]").innerHTML = `连击 <strong>×${state.combo}</strong>`;
  // Background gameplay controls stay out of the dialog's keyboard order.
  canvas.tabIndex = overlay.hidden ? 0 : -1;
  $("[data-fire]").tabIndex = overlay.hidden ? 0 : -1;
  $("[data-pause]").tabIndex = overlay.hidden ? 0 : -1;
  $("[data-finish]").tabIndex = overlay.hidden ? 0 : -1;
}

function roundRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, Math.min(radius, width / 2, height / 2));
}

function drawBackground() {
  const background = ctx.createLinearGradient(0, 0, 0, GAME.height);
  background.addColorStop(0, `hsl(${hue()} 78% 95%)`);
  background.addColorStop(.58, "#f7fbff");
  background.addColorStop(1, "#f8f0e4");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, GAME.width, GAME.height);
  ctx.fillStyle = `hsl(${hue()} 72% 46% / .13)`;
  for (let y = 24; y < GAME.height; y += 28) for (let x = 24; x < GAME.width; x += 28) {
    ctx.beginPath(); ctx.arc(x, y, 1.15, 0, Math.PI * 2); ctx.fill();
  }
  const glow = ctx.createRadialGradient(GAME.x, GAME.y, 30, GAME.x, GAME.y, 285);
  glow.addColorStop(0, `hsl(${hue()} 82% 56% / .24)`);
  glow.addColorStop(1, `hsl(${hue()} 82% 56% / 0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(42, 18, 616, 620);
  ctx.save();
  ctx.strokeStyle = `hsl(${hue()} 68% 48% / .17)`;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 10]);
  ctx.beginPath(); ctx.arc(GAME.x, GAME.y, GAME.radius + 84, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);
  for (let i = 0; i < 16; i++) {
    const angle = Math.PI * 2 * i / 16 + state.angle;
    ctx.strokeStyle = `hsl(${hue()} 78% 48% / ${i % 4 === 0 ? .38 : .16})`;
    ctx.lineWidth = i % 4 === 0 ? 3 : 1.5;
    ctx.beginPath();
    ctx.moveTo(GAME.x + Math.cos(angle) * (GAME.radius + 22), GAME.y + Math.sin(angle) * (GAME.radius + 22));
    ctx.lineTo(GAME.x + Math.cos(angle) * (GAME.radius + 31), GAME.y + Math.sin(angle) * (GAME.radius + 31)); ctx.stroke();
  }
  ctx.restore();
}

function drawRadialKnife(knife) {
  const radius = GAME.radius;
  ctx.save();
  ctx.translate(GAME.x, GAME.y);
  ctx.rotate(normalize(knife.localAngle + state.angle));
  ctx.shadowColor = "rgba(23,69,111,.2)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 5;
  const gradient = ctx.createLinearGradient(radius - 22, 0, radius + 35, 0);
  gradient.addColorStop(0, "#f7fbff"); gradient.addColorStop(1, "#a8bed0");
  ctx.fillStyle = gradient;
  ctx.beginPath(); ctx.moveTo(radius - 25, 0); ctx.lineTo(radius + 35, -GAME.bladeWidth); ctx.lineTo(radius + 35, GAME.bladeWidth); ctx.closePath(); ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.fillStyle = knife.blocker ? "#70849a" : knife.color;
  roundRect(radius + 26, -GAME.handleWidth, knife.blocker ? 60 : 82, GAME.handleWidth * 2, 8); ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,.36)";
  roundRect(radius + 34, -6, knife.blocker ? 44 : 66, 3, 2); ctx.fill();
  if (!knife.blocker) {
    ctx.fillStyle = "#fff"; ctx.font = "850 10px system-ui,sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(knife.label, radius + 67, 1);
  }
  ctx.restore();
}

function drawVerticalKnife(knife, x, y, rotation = 0, opacity = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rotation); ctx.globalAlpha = opacity;
  ctx.shadowColor = "rgba(23,69,111,.2)"; ctx.shadowBlur = 12; ctx.shadowOffsetY = 6;
  const gradient = ctx.createLinearGradient(0, -82, 0, -25);
  gradient.addColorStop(0, "#f9fcff"); gradient.addColorStop(1, "#a8bed0");
  ctx.fillStyle = gradient;
  ctx.beginPath(); ctx.moveTo(0, -82); ctx.lineTo(-GAME.bladeWidth, -25); ctx.lineTo(GAME.bladeWidth, -25); ctx.closePath(); ctx.fill();
  ctx.shadowColor = "transparent"; ctx.fillStyle = knife.color;
  roundRect(-GAME.handleWidth, -30, GAME.handleWidth * 2, 72, 8); ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,.34)"; roundRect(-6, -22, 3, 56, 2); ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,.94)"; roundRect(24, -5, 86, 30, 12); ctx.fill();
  ctx.strokeStyle = "rgba(26,101,177,.18)"; ctx.lineWidth = 1; roundRect(24, -5, 86, 30, 12); ctx.stroke();
  ctx.fillStyle = knife.color; ctx.font = "850 10px system-ui,sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(knife.label, 67, 10);
  ctx.restore();
}

function draw() {
  drawBackground();
  for (const knife of state.knives) drawRadialKnife(knife);
  if (state.projectile) drawVerticalKnife(state.projectile, GAME.x, state.projectile.y);
  else if (state.phase === "playing" && state.wait <= 0) {
    drawVerticalKnife(nextTool(), GAME.x, GAME.startY);
    ctx.fillStyle = "#1765db"; ctx.font = "900 11px system-ui,sans-serif"; ctx.textAlign = "center";
    ctx.fillText(touchControls.matches ? "点按画面或按钮发射" : "空格键 / 点击发射", GAME.x, GAME.height - 15);
  }
  for (const knife of fallen) drawVerticalKnife(knife, knife.x, knife.y, knife.rotation, knife.opacity);
  for (const particle of particles) {
    ctx.save(); ctx.globalAlpha = particle.life; ctx.fillStyle = particle.color;
    ctx.beginPath(); ctx.arc(particle.x, particle.y, 3.4, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }
  core.style.setProperty("--disk-angle", `${state.angle}rad`);
}

function update(delta) {
  if (state.phase === "paused") return;
  if (feedbackTime > 0 && (feedbackTime -= delta) <= 0) $("[data-feedback]").classList.remove("is-visible");
  if (effectTime > 0 && (effectTime -= delta) <= 0) stage.classList.remove("is-hit", "is-miss");
  if (state.phase === "level-clear") {
    state.wait -= delta;
    if (state.wait <= 0) { state.level++; recordBest(); startLevel(); }
  } else if (state.phase === "playing") {
    state.speed += (state.targetSpeed - state.speed) * Math.min(1, delta * 6.5);
    state.angle = normalize(state.angle + state.speed * delta);
    state.motionTime -= delta;
    if (state.motionTime <= 0) {
      state.motion = (state.motion + 1) % MOTIONS.length;
      const motion = MOTIONS[state.motion];
      state.targetSpeed = (state.level % 2 === 0 ? -1 : 1) * baseSpeed() * motion.factor;
      state.motionTime = motionDelay() * motion.duration;
      showFeedback(motion.label, motion.tone);
    }
    if (state.wait > 0) {
      state.wait -= delta;
      if (state.wait <= 0) $("[data-banner]").classList.remove("is-visible");
    }
    if (state.projectile) {
      state.projectile.y -= GAME.projectileSpeed * delta;
      if (state.projectile.y <= GAME.targetY) resolveProjectile();
    }
  }
  for (let i = fallen.length - 1; i >= 0; i--) {
    const knife = fallen[i];
    knife.x += knife.vx * delta; knife.y += knife.vy * delta; knife.vy += 580 * delta;
    knife.rotation += knife.spin * delta; knife.opacity -= .75 * delta;
    if (knife.opacity <= 0 || knife.y > GAME.height + 120) fallen.splice(i, 1);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx * delta; p.y += p.vy * delta; p.vx *= .987; p.vy = p.vy * .987 + 38 * delta; p.life -= 1.5 * delta;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function frame(now) {
  const delta = Math.min(.034, (now - lastFrame) / 1000);
  lastFrame = now;
  update(delta);
  draw();
  requestAnimationFrame(frame);
}

function resizeCanvas() {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = GAME.width * dpr; canvas.height = GAME.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

$("[data-overlay-action]").addEventListener("click", () => {
  if (state.phase === "paused") resumeRun();
  else if (state.phase === "finished") resetRun();
  else handlePlay();
});
$("[data-fire]").addEventListener("click", () => { handlePlay(); if (overlay.hidden) canvas.focus({ preventScroll: true }); });
$("[data-pause]").addEventListener("click", () => state.phase === "paused" ? resumeRun() : pauseRun());
$("[data-finish]").addEventListener("click", finishRun);
canvas.addEventListener("pointerdown", (event) => {
  if (event.isPrimary === false || (event.pointerType === "mouse" && event.button !== 0)) return;
  event.preventDefault();
  canvas.focus({ preventScroll: true });
  handlePlay();
}, { passive: false });
window.addEventListener("keydown", (event) => {
  if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
  const interactive = event.target instanceof Element && event.target.closest("button,a,input,textarea,select,[contenteditable='true']");
  if (event.code === "Space") {
    // Focused buttons/links activate on their native click; never also shoot.
    if (interactive || !overlay.hidden) return;
    event.preventDefault(); handlePlay();
  } else if (event.code === "KeyP" && !interactive) {
    event.preventDefault(); state.phase === "paused" ? resumeRun() : pauseRun();
  } else if (event.code === "Escape" && overlay.hidden) pauseRun();
});
document.addEventListener("visibilitychange", () => { if (document.hidden) pauseRun(); lastFrame = performance.now(); });
window.addEventListener("blur", pauseRun);
window.addEventListener("resize", resizeCanvas);
touchControls.addEventListener("change", updateInterface);
resizeCanvas();
renderRecord();
resetRun();
requestAnimationFrame(frame);



