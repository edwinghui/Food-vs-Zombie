const stage = document.querySelector("#gameStage");
const stageWrap = document.querySelector(".stage-wrap");
const girlSprite = document.querySelector("#girlSprite");
const zombieLayer = document.querySelector("#zombieLayer");
const projectileLayer = document.querySelector("#projectileLayer");
const burstLayer = document.querySelector("#burstLayer");
const keyboardCanvas = document.querySelector("#keyboardCanvas");
const keyboardCtx = keyboardCanvas.getContext("2d");

const input = document.querySelector("#wordInput");
const scoreNode = document.querySelector("#score");
const healthNode = document.querySelector("#health");
const remainingNode = document.querySelector("#remaining");
const statusPanel = document.querySelector("#statusPanel");
const statusTitle = document.querySelector("#statusTitle");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartButton");
const levelLabel = document.querySelector("#levelLabel");
const rewardPanel = document.querySelector("#rewardPanel");
const rewardImage = document.querySelector("#rewardImage");
const rewardText = document.querySelector("#rewardText");

const ASSETS = {
  zombieNormal: "assets/generated/zombie-normal.png",
  zombieRunner: "assets/generated/zombie-runner.png",
  projectiles: {
    tomato: "assets/generated/tomato.png",
    dumpling: "assets/generated/dumpling.png",
    sushi: "assets/generated/sushi.png",
  },
};

const WORDS = [
  "apple",
  "bread",
  "carrot",
  "soup",
  "pizza",
  "melon",
  "salad",
  "cheese",
  "noodle",
  "banana",
  "taco",
  "cookie",
  "rice",
  "toast",
  "pepper",
  "berry",
  "honey",
  "pasta",
  "orange",
  "waffle",
  "potato",
  "pickle",
  "yogurt",
  "muffin",
  "cereal",
  "butter",
  "garlic",
  "onion",
  "tomato",
  "grape",
  "lemon",
  "mango",
  "peach",
  "bacon",
  "beans",
  "cabbage",
  "coconut",
  "donut",
  "eggplant",
  "fries",
  "ginger",
  "kiwi",
  "lettuce",
  "mustard",
  "oatmeal",
  "pancake",
  "quinoa",
  "radish",
  "spinach",
  "sushi",
  "turkey",
  "vanilla",
  "walnut",
  "zucchini",
];

const PHRASES = [
  "He ate an apple",
  "I like soup",
  "She made pasta",
  "We eat rice",
  "The taco is hot",
  "Put it in a bowl",
  "I want a cookie",
  "The melon is sweet",
  "He has a carrot",
  "This bread is warm",
];

const LEVELS = [
  {
    number: 1,
    laneCount: 3,
    totalZombies: 18,
    health: 5,
    spawnEvery: 2800,
    firstSpawnDelay: 1000,
    zombieSpeed: 22,
    zombieHealth: 1,
    runnerChance: 0,
    phraseChance: 0,
    projectileTypes: ["tomato"],
  },
  {
    number: 2,
    laneCount: 3,
    totalZombies: 24,
    health: 5,
    spawnEvery: 2450,
    firstSpawnDelay: 1000,
    zombieSpeed: 24,
    zombieHealth: 1,
    runnerChance: 0.28,
    phraseChance: 0,
    projectileTypes: ["tomato", "dumpling"],
  },
  {
    number: 3,
    laneCount: 3,
    totalZombies: 24,
    health: 5,
    spawnEvery: 2450,
    firstSpawnDelay: 1000,
    zombieSpeed: 24,
    zombieHealth: 1,
    runnerChance: 0.28,
    phraseChance: 0.42,
    projectileTypes: ["tomato", "dumpling", "sushi"],
  },
];

const FIELD = {
  left: 150,
  right: 1080,
  top: 130,
  bottom: 565,
  dangerX: 122,
};

const DESIGN_SIZE = {
  width: 1120,
  height: 640,
};

const KEYBOARD_SIZE = {
  width: 1120,
  height: 380,
};

const KEY_ROWS = [
  {
    y: 72,
    x: 68,
    keys: [
      ["`", 52],
      ["1", 52],
      ["2", 52],
      ["3", 52],
      ["4", 52],
      ["5", 52],
      ["6", 52],
      ["7", 52],
      ["8", 52],
      ["9", 52],
      ["0", 52],
      ["-", 52],
      ["=", 52],
      ["Backspace", 146],
    ],
  },
  {
    y: 120,
    x: 68,
    keys: [
      ["Tab", 78],
      ["Q", 52],
      ["W", 52],
      ["E", 52],
      ["R", 52],
      ["T", 52],
      ["Y", 52],
      ["U", 52],
      ["I", 52],
      ["O", 52],
      ["P", 52],
      ["[", 52],
      ["]", 52],
      ["\\", 74],
    ],
  },
  {
    y: 168,
    x: 68,
    keys: [
      ["Caps", 92],
      ["A", 52],
      ["S", 52],
      ["D", 52],
      ["F", 52],
      ["G", 52],
      ["H", 52],
      ["J", 52],
      ["K", 52],
      ["L", 52],
      [";", 52],
      ["'", 52],
      ["Enter", 132],
    ],
  },
  {
    y: 216,
    x: 68,
    keys: [
      ["Shift", 118],
      ["Z", 52],
      ["X", 52],
      ["C", 52],
      ["V", 52],
      ["B", 52],
      ["N", 52],
      ["M", 52],
      [",", 52],
      [".", 52],
      ["/", 52],
      ["Shift", 166],
    ],
  },
  {
    y: 264,
    x: 68,
    keys: [
      ["Ctrl", 88],
      ["Alt", 70],
      ["Space", 388],
      ["Alt", 70],
      ["Ctrl", 88],
    ],
  },
];

const KEY_ALIASES = {
  backspace: "Backspace",
  tab: "Tab",
  capslock: "Caps",
  enter: "Enter",
  shift: "Shift",
  control: "Ctrl",
  alt: "Alt",
  " ": "Space",
};

const FINGER_NAMES = {
  leftPinky: "left pinky",
  leftRing: "left ring",
  leftMiddle: "left middle",
  leftIndex: "left index",
  leftThumb: "left thumb",
  rightThumb: "right thumb",
  rightIndex: "right index",
  rightMiddle: "right middle",
  rightRing: "right ring",
  rightPinky: "right pinky",
};

const FINGER_HOME = {
  leftPinky: "A",
  leftRing: "S",
  leftMiddle: "D",
  leftIndex: "F",
  leftThumb: "Space",
  rightThumb: "Space",
  rightIndex: "J",
  rightMiddle: "K",
  rightRing: "L",
  rightPinky: ";",
};

const KEY_TO_FINGER = {
  q: "leftPinky",
  a: "leftPinky",
  z: "leftPinky",
  w: "leftRing",
  s: "leftRing",
  x: "leftRing",
  e: "leftMiddle",
  d: "leftMiddle",
  c: "leftMiddle",
  r: "leftIndex",
  t: "leftIndex",
  f: "leftIndex",
  g: "leftIndex",
  v: "leftIndex",
  b: "leftIndex",
  y: "rightIndex",
  u: "rightIndex",
  h: "rightIndex",
  j: "rightIndex",
  n: "rightIndex",
  m: "rightIndex",
  i: "rightMiddle",
  k: "rightMiddle",
  ",": "rightMiddle",
  o: "rightRing",
  l: "rightRing",
  ".": "rightRing",
  p: "rightPinky",
  ";": "rightPinky",
  "/": "rightPinky",
  "[": "rightPinky",
  "]": "rightPinky",
  "'": "rightPinky",
  " ": "rightThumb",
};

const keyRects = buildKeyRects();

const trainer = {
  pressedKey: null,
  pressedUntil: 0,
  fingerPositions: {},
};

const state = {
  phase: "playing",
  currentLevelIndex: 0,
  score: 0,
  health: LEVELS[0].health,
  spawned: 0,
  defeated: 0,
  missed: 0,
  levelStartTime: 0,
  lastTime: 0,
  nextSpawnAt: LEVELS[0].firstSpawnDelay,
  zombies: [],
  projectiles: [],
  bursts: [],
  girlLane: 1,
  girlLean: 0,
};

function currentLevel() {
  return LEVELS[state.currentLevelIndex];
}

function resizeStage() {
  const rect = stageWrap.getBoundingClientRect();
  const scale = Math.min(rect.width / DESIGN_SIZE.width, rect.height / DESIGN_SIZE.height);
  const left = (rect.width - DESIGN_SIZE.width * scale) / 2;
  const top = (rect.height - DESIGN_SIZE.height * scale) / 2;
  stage.style.transform = `translate(${left}px, ${top}px) scale(${scale})`;
}

function laneHeight() {
  return (FIELD.bottom - FIELD.top) / currentLevel().laneCount;
}

function laneCenter(lane) {
  return FIELD.top + laneHeight() * lane + laneHeight() / 2;
}

function buildKeyRects() {
  const rects = new Map();
  const gap = 6;
  const height = 42;

  for (const row of KEY_ROWS) {
    let x = row.x;
    for (const [label, width] of row.keys) {
      const rect = {
        label,
        x,
        y: row.y,
        width,
        height,
        centerX: x + width / 2,
        centerY: row.y + height / 2,
      };
      rects.set(label, rect);
      if (label.length === 1) rects.set(label.toLowerCase(), rect);
      x += width + gap;
    }
  }

  return rects;
}

function resetRun() {
  state.currentLevelIndex = 0;
  state.score = 0;
  startLevel();
}

function startLevel() {
  const level = currentLevel();
  state.phase = "playing";
  state.health = level.health;
  state.spawned = 0;
  state.defeated = 0;
  state.missed = 0;
  state.levelStartTime = 0;
  state.lastTime = 0;
  state.nextSpawnAt = level.firstSpawnDelay;
  state.zombies = [];
  state.projectiles = [];
  state.bursts = [];
  state.girlLane = Math.floor(level.laneCount / 2);
  state.girlLean = 0;
  zombieLayer.replaceChildren();
  projectileLayer.replaceChildren();
  burstLayer.replaceChildren();
  statusPanel.hidden = true;
  rewardPanel.hidden = true;
  input.disabled = false;
  input.value = "";
  input.focus();
  updateHud();
  render();
}

function updateHud() {
  const level = currentLevel();
  levelLabel.textContent = `Level ${level.number} · ${level.laneCount} lanes`;
  scoreNode.textContent = state.score;
  healthNode.textContent = state.health;
  remainingNode.textContent = Math.max(
    0,
    level.totalZombies - state.defeated - state.missed,
  );
}

function createSprite(className, imagePath, altText) {
  const wrapper = document.createElement("div");
  wrapper.className = className;

  const image = document.createElement("img");
  image.src = imagePath;
  image.alt = altText;
  image.draggable = false;
  wrapper.append(image);

  return { wrapper, image };
}

function createZombieElement(zombie) {
  const { wrapper, image } = createSprite(
    `zombie-sprite ${zombie.variant} ${zombie.kind}`,
    zombie.variant === "runner" ? ASSETS.zombieRunner : ASSETS.zombieNormal,
    zombie.variant === "runner" ? "fast zombie" : "zombie",
  );

  const word = document.createElement("div");
  word.className = "word-bubble";
  word.textContent = zombie.text;
  wrapper.append(word);

  zombie.element = wrapper;
  zombie.image = image;
  zombie.wordElement = word;
  zombieLayer.append(wrapper);
}

function createProjectileElement(projectile) {
  const { wrapper } = createSprite(
    `food-sprite ${projectile.type}`,
    ASSETS.projectiles[projectile.type],
    `thrown ${projectile.type}`,
  );
  projectile.element = wrapper;
  projectileLayer.append(wrapper);
}

function createBurstElement(burst) {
  const element = document.createElement("div");
  element.className = `burst ${burst.kind}`;
  element.textContent = burst.text;
  burst.element = element;
  burstLayer.append(element);
}

function spawnZombie() {
  const level = currentLevel();
  const lane = Math.floor(Math.random() * level.laneCount);
  const usesPhrase = level.phraseChance > 0 && Math.random() < level.phraseChance;
  const text = usesPhrase
    ? PHRASES[(state.spawned + state.currentLevelIndex * 3) % PHRASES.length]
    : WORDS[(state.spawned + state.currentLevelIndex * 11) % WORDS.length];
  const isRunner =
    level.runnerChance > 0 &&
    state.spawned > 1 &&
    (Math.random() < level.runnerChance || state.spawned % 9 === 6);
  const speedMultiplier = isRunner ? 3 : 1;
  const zombie = {
    id: crypto.randomUUID(),
    x: FIELD.right - 24,
    lane,
    text,
    normalizedText: normalizeTypingText(text),
    kind: usesPhrase ? "sentence" : "word",
    variant: isRunner ? "runner" : "normal",
    health: level.zombieHealth,
    speed: (level.zombieSpeed + Math.random() * 8 + state.spawned * 0.22) * speedMultiplier,
    wobble: Math.random() * Math.PI * 2,
    hitFlash: 0,
  };
  createZombieElement(zombie);
  state.zombies.push(zombie);
  state.spawned += 1;
}

function normalizeTypingText(value) {
  return value.toLowerCase().replace(/\s+/g, " ").trimStart();
}

function findWordTarget(word) {
  const typed = normalizeTypingText(word).trimEnd();
  if (!typed) return null;

  return state.zombies
    .filter((zombie) => zombie.normalizedText === typed)
    .sort((a, b) => a.x - b.x)[0];
}

function attackZombie(zombie) {
  const projectiles = currentLevel().projectileTypes;
  const projectile = {
    x: 124,
    y: laneCenter(state.girlLane) - 18,
    targetId: zombie.id,
    targetX: zombie.x - 34,
    targetY: laneCenter(zombie.lane) - 22,
    speed: 680,
    spin: 0,
    type: projectiles[Math.floor(Math.random() * projectiles.length)],
  };
  state.girlLane = zombie.lane;
  state.girlLean = 1;
  createProjectileElement(projectile);
  state.projectiles.push(projectile);
}

function finishGame(won) {
  const level = currentLevel();
  const hasNextLevel = won && state.currentLevelIndex < LEVELS.length - 1;
  const unlockedDumpling = won && level.number === 1;
  const unlockedSushi = won && level.number === 2;
  state.phase = won ? "won" : "lost";
  input.disabled = true;
  statusTitle.textContent = won ? `Level ${level.number} Clear` : "Zombies Got Through";
  statusText.textContent = won
    ? unlockedDumpling
      ? `Score ${state.score}. Dumplings join the snack attack.`
      : unlockedSushi
        ? `Score ${state.score}. Sushi rolls are ready to fly.`
        : hasNextLevel
          ? `Score ${state.score}. More typing trouble is coming.`
          : `Score ${state.score}. The little chef holds the kitchen.`
    : `Score ${state.score}. Try typing the nearest words first.`;
  rewardPanel.hidden = !unlockedDumpling && !unlockedSushi;
  if (unlockedDumpling) {
    rewardImage.src = ASSETS.projectiles.dumpling;
    rewardImage.alt = "dumpling projectile";
    rewardText.textContent = "Unlocked: Dumpling projectile";
  } else if (unlockedSushi) {
    rewardImage.src = ASSETS.projectiles.sushi;
    rewardImage.alt = "sushi projectile";
    rewardText.textContent = "Unlocked: Sushi projectile";
  }
  restartButton.textContent = hasNextLevel ? "Next Level" : "Play Again";
  statusPanel.hidden = false;
}

function update(dt, elapsed) {
  const level = currentLevel();
  if (state.phase !== "playing") return;

  if (state.spawned < level.totalZombies && elapsed >= state.nextSpawnAt) {
    spawnZombie();
    state.nextSpawnAt += level.spawnEvery;
  }

  for (const zombie of state.zombies) {
    zombie.x -= zombie.speed * dt;
    zombie.wobble += dt * 5;
    zombie.hitFlash = Math.max(0, zombie.hitFlash - dt * 4);
  }

  const escaped = state.zombies.filter((zombie) => zombie.x < FIELD.dangerX);
  if (escaped.length) {
    state.health -= escaped.length;
    state.missed += escaped.length;
    for (const zombie of escaped) zombie.element.remove();
    state.zombies = state.zombies.filter((zombie) => zombie.x >= FIELD.dangerX);
    state.bursts.push(
      ...escaped.map((zombie) => {
        const burst = {
          x: FIELD.dangerX,
          y: laneCenter(zombie.lane),
          life: 1,
          text: "-1",
          kind: "danger",
        };
        createBurstElement(burst);
        return burst;
      }),
    );
    updateHud();
  }

  for (const projectile of state.projectiles) {
    const target = state.zombies.find((zombie) => zombie.id === projectile.targetId);
    if (target) {
      projectile.targetX = target.x - 46;
      projectile.targetY = laneCenter(target.lane) - 32;
    }

    const dx = projectile.targetX - projectile.x;
    const dy = projectile.targetY - projectile.y;
    const distance = Math.hypot(dx, dy) || 1;
    const step = projectile.speed * dt;
    projectile.spin += dt * 12;

    if (distance <= step) {
      projectile.x = projectile.targetX;
      projectile.y = projectile.targetY;
      projectile.done = true;
      projectile.element.remove();
      if (target) damageZombie(target);
    } else {
      projectile.x += (dx / distance) * step;
      projectile.y += (dy / distance) * step;
    }
  }

  state.projectiles = state.projectiles.filter((projectile) => !projectile.done);

  for (const burst of state.bursts) {
    burst.life -= dt * 1.8;
    burst.y -= dt * 34;
    if (burst.life <= 0) burst.element.remove();
  }
  state.bursts = state.bursts.filter((burst) => burst.life > 0);

  state.girlLean = Math.max(0, state.girlLean - dt * 4);

  if (state.health <= 0) finishGame(false);
  if (
    state.defeated + state.missed >= level.totalZombies &&
    state.spawned >= level.totalZombies &&
    state.zombies.length === 0 &&
    state.projectiles.length === 0
  ) {
    finishGame(true);
  }
}

function damageZombie(zombie) {
  zombie.health -= 1;
  zombie.hitFlash = 1;

  const burst = {
    x: zombie.x,
    y: laneCenter(zombie.lane) - 82,
    life: 1,
    text: "+10",
    kind: "score",
  };
  createBurstElement(burst);
  state.bursts.push(burst);

  if (zombie.health <= 0) {
    state.defeated += 1;
    state.score += 10;
    zombie.element.remove();
    state.zombies = state.zombies.filter((item) => item.id !== zombie.id);
    updateHud();
  }
}

function normalizeKeyLabel(key) {
  const lower = key.toLowerCase();
  if (KEY_ALIASES[lower]) return KEY_ALIASES[lower];
  if (key.length === 1) return key.toLowerCase();
  return key;
}

function getTypingGuide() {
  const zombies = [...state.zombies].sort((a, b) => a.x - b.x);
  if (!zombies.length) {
    return {
      word: "",
      nextKey: null,
      progress: 0,
      finger: null,
    };
  }

  const typed = normalizeTypingText(input.value);
  const target =
    (typed && zombies.find((zombie) => zombie.normalizedText.startsWith(typed))) ||
    zombies[0];
  const progress =
    typed && target.normalizedText.startsWith(typed) ? typed.length : 0;
  const nextKey = target.normalizedText[progress] || null;

  return {
    word: target.text,
    nextKey,
    progress,
    finger: nextKey ? KEY_TO_FINGER[nextKey] : null,
  };
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawKey(key, guideKey, pressedKey) {
  const isTarget = key.label === guideKey || key.label.toLowerCase() === guideKey;
  const isPressed = key.label === pressedKey || key.label.toLowerCase() === pressedKey;
  const isCorrectPress = isPressed && isTarget;

  keyboardCtx.save();
  keyboardCtx.shadowColor = "rgb(0 0 0 / 0.22)";
  keyboardCtx.shadowBlur = 0;
  keyboardCtx.shadowOffsetY = 3;

  if (isCorrectPress) {
    keyboardCtx.fillStyle = "#8df35a";
  } else if (isPressed) {
    keyboardCtx.fillStyle = "#f35b4f";
  } else if (isTarget) {
    keyboardCtx.fillStyle = "#f7b43e";
  } else {
    keyboardCtx.fillStyle = "#fffdf8";
  }

  keyboardCtx.strokeStyle = isTarget ? "#784516" : "#d1d1d1";
  keyboardCtx.lineWidth = isTarget ? 4 : 2;
  roundRect(keyboardCtx, key.x, key.y, key.width, key.height, 7);
  keyboardCtx.fill();
  keyboardCtx.stroke();
  keyboardCtx.restore();

  keyboardCtx.fillStyle = "#222";
  keyboardCtx.font = key.label.length > 5 ? "800 18px Inter, system-ui" : "900 24px Inter, system-ui";
  keyboardCtx.textAlign = "center";
  keyboardCtx.textBaseline = "middle";
  keyboardCtx.fillText(key.label, key.centerX, key.centerY + 1);
}

function fingerHomePoint(finger) {
  const rect = keyRects.get(FINGER_HOME[finger]);
  return rect
    ? { x: rect.centerX, y: rect.centerY - 3 }
    : { x: KEYBOARD_SIZE.width / 2, y: 260 };
}

function fingerBasePoint(finger) {
  const bases = {
    leftPinky: { x: 228, y: 374 },
    leftRing: { x: 282, y: 368 },
    leftMiddle: { x: 335, y: 364 },
    leftIndex: { x: 390, y: 368 },
    leftThumb: { x: 472, y: 374 },
    rightThumb: { x: 594, y: 374 },
    rightIndex: { x: 678, y: 368 },
    rightMiddle: { x: 733, y: 364 },
    rightRing: { x: 786, y: 368 },
    rightPinky: { x: 840, y: 374 },
  };
  return bases[finger];
}

function quadraticPoint(start, control, end, t) {
  const inv = 1 - t;
  return {
    x: inv * inv * start.x + 2 * inv * t * control.x + t * t * end.x,
    y: inv * inv * start.y + 2 * inv * t * control.y + t * t * end.y,
  };
}

function drawFinger(finger, targetPoint, isActive, side) {
  const base = fingerBasePoint(finger);
  if (!base) return;

  const existing = trainer.fingerPositions[finger] || fingerHomePoint(finger);
  const desired = targetPoint || fingerHomePoint(finger);
  const next = {
    x: existing.x + (desired.x - existing.x) * 0.22,
    y: existing.y + (desired.y - existing.y) * 0.22,
  };
  trainer.fingerPositions[finger] = next;

  const mid = {
    x: (base.x + next.x) / 2,
    y: Math.min(base.y, next.y) + (isActive ? 48 : 56),
  };

  keyboardCtx.save();
  keyboardCtx.lineCap = "round";
  keyboardCtx.lineJoin = "round";
  keyboardCtx.globalAlpha = isActive ? 0.96 : 0.84;
  keyboardCtx.strokeStyle = "rgb(96 56 39 / 0.28)";
  keyboardCtx.lineWidth = isActive ? 36 : 31;
  keyboardCtx.beginPath();
  keyboardCtx.moveTo(base.x, base.y);
  keyboardCtx.quadraticCurveTo(mid.x, mid.y, next.x, next.y);
  keyboardCtx.stroke();

  keyboardCtx.strokeStyle = isActive ? "#f5c29e" : "#d7a184";
  keyboardCtx.lineWidth = isActive ? 29 : 24;
  keyboardCtx.beginPath();
  keyboardCtx.moveTo(base.x, base.y);
  keyboardCtx.quadraticCurveTo(mid.x, mid.y, next.x, next.y);
  keyboardCtx.stroke();

  for (const t of [0.43, 0.68]) {
    const joint = quadraticPoint(base, mid, next, t);
    keyboardCtx.strokeStyle = "rgb(120 71 51 / 0.28)";
    keyboardCtx.lineWidth = isActive ? 4 : 3;
    keyboardCtx.beginPath();
    keyboardCtx.ellipse(
      joint.x,
      joint.y,
      isActive ? 13 : 11,
      4,
      side === "left" ? -0.3 : 0.3,
      0,
      Math.PI * 2,
    );
    keyboardCtx.stroke();
  }

  keyboardCtx.fillStyle = isActive ? "#ffe0bf" : "#efc0a2";
  keyboardCtx.strokeStyle = isActive ? "#a46147" : "rgb(97 52 35 / 0.3)";
  keyboardCtx.lineWidth = 2;
  keyboardCtx.beginPath();
  keyboardCtx.ellipse(
    next.x,
    next.y - 3,
    isActive ? 15 : 13,
    isActive ? 11 : 10,
    side === "left" ? -0.2 : 0.2,
    0,
    Math.PI * 2,
  );
  keyboardCtx.fill();
  keyboardCtx.stroke();

  if (isActive) {
    keyboardCtx.fillStyle = "#a46147";
    keyboardCtx.font = "900 13px Inter, system-ui";
    keyboardCtx.textAlign = "center";
    keyboardCtx.textBaseline = "middle";
    keyboardCtx.fillText("tap", next.x, next.y - 24);
  }

  keyboardCtx.restore();
}

function drawHands(activeFinger, targetKey) {
  const targetRect = targetKey ? keyRects.get(targetKey) : null;
  const targetPoint = targetRect
    ? { x: targetRect.centerX, y: targetRect.centerY + 7 }
    : null;

  for (const finger of Object.keys(FINGER_HOME)) {
    drawFinger(
      finger,
      finger === activeFinger ? targetPoint : null,
      finger === activeFinger,
      finger.startsWith("left") ? "left" : "right",
    );
  }
}

function drawKeyboardTrainer() {
  const now = performance.now();
  const guide = getTypingGuide();
  const guideKey = guide.nextKey ? normalizeKeyLabel(guide.nextKey) : null;
  const pressedKey = now < trainer.pressedUntil ? trainer.pressedKey : null;

  keyboardCtx.clearRect(0, 0, KEYBOARD_SIZE.width, KEYBOARD_SIZE.height);

  const backdrop = keyboardCtx.createLinearGradient(0, 0, 0, KEYBOARD_SIZE.height);
  backdrop.addColorStop(0, "#fff9dc");
  backdrop.addColorStop(1, "#eadcaa");
  keyboardCtx.fillStyle = backdrop;
  keyboardCtx.fillRect(0, 0, KEYBOARD_SIZE.width, KEYBOARD_SIZE.height);

  keyboardCtx.fillStyle = "#2c2c2c";
  keyboardCtx.strokeStyle = "#161616";
  keyboardCtx.lineWidth = 5;
  roundRect(keyboardCtx, 38, 52, 1044, 252, 18);
  keyboardCtx.fill();
  keyboardCtx.stroke();

  keyboardCtx.fillStyle = "#9eff55";
  keyboardCtx.shadowColor = "#9eff55";
  keyboardCtx.shadowBlur = 8;
  roundRect(keyboardCtx, 902, 70, 62, 13, 7);
  keyboardCtx.fill();
  roundRect(keyboardCtx, 1014, 70, 62, 13, 7);
  keyboardCtx.fill();
  keyboardCtx.shadowBlur = 0;

  keyboardCtx.fillStyle = "#fffdf0";
  keyboardCtx.strokeStyle = "#d4bd75";
  keyboardCtx.lineWidth = 3;
  roundRect(keyboardCtx, 58, 12, 1004, 34, 10);
  keyboardCtx.fill();
  keyboardCtx.stroke();

  keyboardCtx.fillStyle = "#1d2823";
  keyboardCtx.font = "900 20px Inter, system-ui";
  keyboardCtx.textAlign = "center";
  keyboardCtx.textBaseline = "middle";
  const pressedText = pressedKey ? `Pressed: ${pressedKey}` : "Pressed: none";
  const cue = guide.nextKey
    ? `Next: ${guide.nextKey.toUpperCase()}    ${FINGER_NAMES[guide.finger]}    Word: ${guide.word}`
    : "Wait for a zombie word";
  keyboardCtx.fillText(`${cue}    ${pressedText}`, KEYBOARD_SIZE.width / 2, 30);

  for (const row of KEY_ROWS) {
    for (const [label] of row.keys) {
      const key = keyRects.get(label);
      drawKey(key, guideKey, pressedKey);
    }
  }

  drawHands(guide.finger, guideKey);
}

function render() {
  const girlY = laneCenter(state.girlLane);
  const girlHeight = girlSprite.offsetHeight || 158;
  const girlX = 42 + state.girlLean * 16;
  girlSprite.style.transform = `translate(${girlX}px, ${girlY - girlHeight * 0.63}px)`;

  for (const zombie of state.zombies) {
    const y = laneCenter(zombie.lane);
    const zombieWidth = zombie.element.offsetWidth || 108;
    const zombieHeight = zombie.element.offsetHeight || 136;
    const bob = Math.sin(zombie.wobble) * (zombie.variant === "runner" ? 1.5 : 1);
    zombie.element.style.transform = `translate(${zombie.x - zombieWidth * 0.5}px, ${
      y - zombieHeight * 0.82 + bob
    }px)`;
    zombie.element.style.zIndex = String(100 + zombie.lane);
    zombie.element.classList.toggle("is-hit", zombie.hitFlash > 0);
  }

  for (const projectile of state.projectiles) {
    const projectileSize = projectile.element.offsetWidth || 96;
    projectile.element.style.transform = `translate(${projectile.x - projectileSize / 2}px, ${
      projectile.y - projectileSize / 2
    }px) rotate(${projectile.spin}rad)`;
  }

  for (const burst of state.bursts) {
    burst.element.style.transform = `translate(${burst.x}px, ${burst.y}px)`;
    burst.element.style.opacity = Math.max(0, burst.life);
  }

  drawKeyboardTrainer();
}

function loop(timestamp) {
  if (!state.lastTime) state.lastTime = timestamp;
  if (!state.levelStartTime) state.levelStartTime = timestamp;
  const dt = Math.min(0.05, (timestamp - state.lastTime) / 1000);
  state.lastTime = timestamp;

  update(dt, timestamp - state.levelStartTime);
  render();
  requestAnimationFrame(loop);
}

input.addEventListener("input", () => {
  if (state.phase !== "playing") return;
  const target = findWordTarget(input.value);
  if (!target) return;
  attackZombie(target);
  input.value = "";
});

stage.addEventListener("pointerdown", () => {
  input.focus();
});

document.addEventListener("keydown", (event) => {
  trainer.pressedKey = normalizeKeyLabel(event.key);
  trainer.pressedUntil = performance.now() + 220;

  if (event.code === "Space" && state.phase !== "playing") {
    event.preventDefault();
    advanceEndScreen();
  }
});

window.addEventListener("resize", resizeStage);

function advanceEndScreen() {
  if (state.phase === "won" && state.currentLevelIndex < LEVELS.length - 1) {
    state.currentLevelIndex += 1;
    startLevel();
    return;
  }

  resetRun();
}

restartButton.addEventListener("click", advanceEndScreen);

resetRun();
resizeStage();
requestAnimationFrame(loop);
