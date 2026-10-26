/* Circular carousel: a 3D ring of images with bendable cards, momentum drag, snapping and click to focus.
   Vanilla JS port of React Bits CircularCarousel (JS-CSS), https://reactbits.dev
   (registry: reactbits.dev/r/CircularCarousel-JS-CSS.json). The motion maths, presets and markup are the
   original's; React state and hooks are replaced by plain fields, and the image-swap animation is left out
   because this page's lists don't change after load. Styles: assets/css/circular-carousel.css.

   Usage: new CircularCarousel(element, items, options)
     items:   [{ src, alt, title, subtitle }]
     options: the original's props (preset, intro, cardWidth, aspectRatio, gap, autoplay, speed, direction,
              draggable, momentum, snap, pauseOnHover, focusOnClick, parallax, stretch, depthFade, fadeColor,
              innerShade, cornerRadius, captions, label). setCardWidth(px) re-lays it out for a new screen size. */
(function(){
  const PRESETS = {
    cylinder: { axis: 'y', tilt: -5, perspective: 2500, curve: 1, spread: 1, inward: false, billboard: false, backfaces: true, window: 0 },
    orbit: { axis: 'y', tilt: -16, perspective: 1500, curve: 0, spread: 1.45, inward: false, billboard: true, backfaces: false, window: 0 },
    wheel: { axis: 'x', tilt: 0, perspective: 1800, curve: 0, spread: 1, inward: false, billboard: false, backfaces: true, window: 1.7 },
    panorama: { axis: 'y', tilt: 0, perspective: 0, curve: 1, spread: 1, inward: true, billboard: false, backfaces: false, window: 0 }
  };
  const INTRO_LENGTH = { assemble: 1500, rise: 1400, spin: 1800, none: 0 };
  const TILES = 8;
  const OVERLAP = 2.5;
  const DRAG_THRESHOLD = 5;
  const SPRING = 118;
  const SETTLE_SPEED = 9;
  const CAPTION_SPACE = 76;
  const TO_RAD = Math.PI / 180;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const wrap = degrees => ((((degrees + 180) % 360) + 360) % 360) - 180;
  const easeOut = t => 1 - Math.pow(1 - t, 4);
  const easeOutQuint = t => 1 - Math.pow(1 - t, 5);
  const rotateX = (p, degrees) => { const r = degrees * TO_RAD, c = Math.cos(r), s = Math.sin(r); return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c]; };
  const rotateY = (p, degrees) => { const r = degrees * TO_RAD, c = Math.cos(r), s = Math.sin(r); return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c]; };
  const el = (tag, cls) => { const e = document.createElement(tag); if (cls) e.className = cls; return e; };
  const pad2 = n => String(n).padStart(2, '0');

  const DEFAULTS = {
    preset: 'cylinder', intro: 'rise', cardWidth: 220, aspectRatio: 1, gap: 25, curve: undefined, tilt: undefined,
    perspective: undefined, autoplay: 'drift', speed: 14, interval: 3, direction: 'left', draggable: true, momentum: 0.6,
    snap: true, pauseOnHover: true, focusOnClick: true, parallax: 0.3, stretch: 0.5, depthFade: 0.55, fadeColor: '#000000',
    innerShade: 0.6, cornerRadius: 12, captions: false, label: 'Image carousel', onChange: null, onItemClick: null
  };

  function CircularCarousel(root, items, options) {
    this.root = root;
    this.items = items || [];
    this.opts = Object.assign({}, DEFAULTS, options || {});
    this.reducedQuery = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : null;
    this.state = {
      angle: 0, velocity: 0, target: null, dir: 0, press: null, drag: false, hover: false,
      pointer: { inside: false, x: 0, y: 0 }, yaw: 0, pitch: 0, intro: null, introDone: false,
      holdUntil: 0, stepAt: 0, suppressClick: false, wheelTimer: 0, fit: 1, shift: 0, drop: 0, last: 0
    };
    this.active = -1;
    this.ready = false;
    this.raf = 0;
    this.visible = true;
    this.build();
    this.bind();
    this.preload();
  }

  CircularCarousel.prototype.settings = function () {
    const o = this.opts, count = this.items.length;
    const shape = PRESETS[o.preset] ? o.preset : 'cylinder';
    const layout = PRESETS[shape];
    const reduced = !!(this.reducedQuery && this.reducedQuery.matches);
    const cardW = Math.max(40, o.cardWidth);
    const cardH = cardW / clamp(o.aspectRatio, 0.2, 5);
    const axis = layout.axis;
    const along = axis === 'x' ? cardH : cardW;
    const curve = layout.billboard ? 0 : clamp(o.curve != null ? o.curve : layout.curve, 0, 1);
    const n = Math.max(count, 3);
    const pitch = (along + o.gap) * layout.spread;
    const chord = pitch / (2 * Math.sin(Math.PI / n));
    const arc = (n * pitch) / (2 * Math.PI);
    const radius = Math.max(chord + (arc - chord) * curve, along * 0.6);
    return {
      count, shape, layout, axis, along, curve, radius, cardW, cardH,
      step: 360 / Math.max(count, 1),
      tilt: o.tilt != null ? o.tilt : layout.tilt,
      perspective: layout.inward ? radius : (o.perspective != null ? o.perspective : layout.perspective),
      intro: reduced ? 'none' : (o.intro in INTRO_LENGTH ? o.intro : 'rise'),
      autoplay: reduced ? 'off' : o.autoplay,
      speed: o.speed,
      interval: Math.max(0.5, o.interval),
      draggable: o.draggable,
      momentum: clamp(o.momentum, 0, 1),
      snap: o.snap,
      pauseOnHover: o.pauseOnHover,
      parallax: reduced ? 0 : clamp(o.parallax, 0, 1),
      stretch: reduced ? 0 : clamp(o.stretch, 0, 1),
      depthFade: clamp(o.depthFade, 0, 1),
      captions: o.captions,
      reduced
    };
  };

  CircularCarousel.prototype.tiles = function (s) {
    const total = s.curve > 0.001 ? TILES : 1;
    const length = s.along / total;
    const bend = s.curve > 0.001 ? s.radius / s.curve : 0;
    return Array.from({ length: total }, (_, index) => {
      const start = index * length - (index > 0 ? OVERLAP / 2 : 0);
      const end = (index + 1) * length + (index < total - 1 ? OVERLAP / 2 : 0);
      const center = (start + end) / 2 - s.along / 2;
      const alpha = bend ? center / bend : 0;
      const shift = bend ? bend * Math.sin(alpha) : center;
      const sink = bend ? bend * (1 - Math.cos(alpha)) : 0;
      const depth = s.layout.inward ? sink : -sink;
      const turn = ((s.layout.inward ? -alpha : alpha) * 180) / Math.PI;
      const move = s.axis === 'x'
        ? 'translate3d(0px, ' + shift + 'px, ' + depth + 'px) rotateX(' + (-turn) + 'deg)'
        : 'translate3d(' + shift + 'px, 0px, ' + depth + 'px) rotateY(' + turn + 'deg)';
      return { index, total, start, end, size: end - start, move };
    });
  };

  CircularCarousel.prototype.build = function () {
    const o = this.opts, root = this.root;
    this.s = this.settings();
    const s = this.s;
    root.classList.add('circular-carousel');
    root.style.setProperty('--cc-fade', o.fadeColor);
    root.style.setProperty('--cc-radius', Math.max(0, o.cornerRadius) + 'px');
    root.style.setProperty('--cc-inner', (1 - clamp(o.innerShade, 0, 1)).toFixed(3));
    root.setAttribute('role', 'region');
    root.setAttribute('aria-roledescription', 'carousel');
    root.setAttribute('aria-label', o.label);
    root.tabIndex = 0;
    root.dataset.axis = s.axis;
    root.dataset.shape = s.shape;
    if (s.draggable) root.setAttribute('data-draggable', '');
    root.innerHTML = '';

    const view = el('div', 'circular-carousel__view');
    this.stage = el('div', 'circular-carousel__stage');
    this.camera = el('div', 'circular-carousel__camera');
    this.ring = el('div', 'circular-carousel__ring');
    this.camera.appendChild(this.ring); this.stage.appendChild(this.camera); view.appendChild(this.stage); root.appendChild(view);
    this.buildCards();

    if (o.captions) {
      this.caption = el('div', 'circular-carousel__caption');
      this.caption.setAttribute('aria-hidden', 'true');
      this.titleEl = el('span', 'circular-carousel__title');
      const count = el('span', 'circular-carousel__count');
      this.digits = el('span', 'circular-carousel__digits');
      const slash = el('span', 'circular-carousel__slash'); slash.textContent = '/';
      const total = el('span'); total.textContent = pad2(this.items.length);
      count.append(this.digits, slash, total);
      this.caption.append(this.titleEl, count);
      root.appendChild(this.caption);
    }
    this.live = el('div', 'circular-carousel__live');
    this.live.setAttribute('aria-live', 'polite');
    this.live.setAttribute('aria-atomic', 'true');
    root.appendChild(this.live);
    this.setActive(0, true);
  };

  CircularCarousel.prototype.buildCards = function () {
    const s = this.s, tiles = this.tiles(s);
    this.ring.innerHTML = '';
    this.cards = this.items.map((item, index) => {
      const card = el('div', 'circular-carousel__card');
      card.dataset.ccIndex = index;
      card.setAttribute('role', 'group');
      card.setAttribute('aria-roledescription', 'slide');
      card.setAttribute('aria-label', (item.title || item.alt || 'Image ' + (index + 1)) + ', ' + (index + 1) + ' of ' + s.count);
      tiles.forEach(tile => card.appendChild(this.tile(item, tile, false, s)));
      if (s.layout.backfaces) tiles.forEach(tile => card.appendChild(this.tile(item, tile, true, s)));
      this.ring.appendChild(card);
      return card;
    });
  };

  CircularCarousel.prototype.tile = function (item, tile, back, s) {
    const strip = back ? tile.total - 1 - tile.index : tile.index;
    const first = strip === 0, last = strip === tile.total - 1, r = 'var(--cc-radius)';
    const frameRadius = s.axis === 'x'
      ? (first ? r : 0) + ' ' + (first ? r : 0) + ' ' + (last ? r : 0) + ' ' + (last ? r : 0)
      : (first ? r : 0) + ' ' + (last ? r : 0) + ' ' + (last ? r : 0) + ' ' + (first ? r : 0);
    const offset = back ? s.along - tile.end : tile.start;
    const size = tile.size;
    const t = el('div', 'circular-carousel__tile');
    t.setAttribute('aria-hidden', 'true');
    if (s.axis === 'x') Object.assign(t.style, { left: -s.cardW / 2 + 'px', top: -size / 2 + 'px', width: s.cardW + 'px', height: size + 'px' });
    else Object.assign(t.style, { left: -size / 2 + 'px', top: -s.cardH / 2 + 'px', width: size + 'px', height: s.cardH + 'px' });
    t.style.transform = tile.move + (back ? (s.axis === 'x' ? ' rotateX(180deg)' : ' rotateY(180deg)') : '');
    const frame = el('div', 'circular-carousel__frame');
    frame.style.height = (s.axis === 'x' ? size : s.cardH) + 'px';
    frame.style.borderRadius = frameRadius;
    const img = el('img', 'circular-carousel__photo');
    img.src = item.src; img.alt = ''; img.draggable = false; img.decoding = 'async';
    if (s.axis === 'x') Object.assign(img.style, { left: '0px', top: -offset + 'px', width: s.cardW + 'px', height: s.cardH + 'px' });
    else Object.assign(img.style, { left: -offset + 'px', top: '0px', width: s.cardW + 'px', height: s.cardH + 'px' });
    frame.appendChild(img);
    if (back) frame.appendChild(el('div', 'circular-carousel__inner'));
    frame.appendChild(el('div', 'circular-carousel__shade'));
    t.appendChild(frame);
    return t;
  };

  CircularCarousel.prototype.setActive = function (index, force) {
    if (index === this.active && !force) return;
    this.active = index;
    const item = this.items[index] || this.items[0];
    if (!item) return;
    const label = item.title || item.alt || 'Image ' + (index + 1);
    this.live.textContent = label + ', ' + (index + 1) + ' of ' + this.items.length;
    if (this.titleEl) {
      const fresh = el('span', 'circular-carousel__title');
      fresh.textContent = item.title || item.alt || '';
      if (item.subtitle) { const sub = el('span', 'circular-carousel__subtitle'); sub.textContent = item.subtitle; fresh.appendChild(sub); }
      this.titleEl.replaceWith(fresh);
      this.titleEl = fresh;
      this.digits.innerHTML = '';
      pad2(index + 1).split('').forEach(d => {
        const digit = el('span', 'circular-carousel__digit'), reel = el('span', 'circular-carousel__reel');
        reel.style.transform = 'translateY(' + (-Number(d) * 10) + '%)';
        '0123456789'.split('').forEach(n => { const x = el('span'); x.textContent = n; reel.appendChild(x); });
        digit.appendChild(reel); this.digits.appendChild(digit);
      });
    }
    if (!force && typeof this.opts.onChange === 'function') this.opts.onChange(index);
  };

  CircularCarousel.prototype.preload = function () {
    const load = src => new Promise(resolve => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => (image.decode ? image.decode().then(resolve, resolve) : resolve());
      image.onerror = resolve;
      image.src = src;
    });
    const timeout = new Promise(resolve => setTimeout(resolve, 2400));
    Promise.race([Promise.all(this.items.slice(0, 16).map(i => load(i.src))), timeout]).then(() => {
      this.state.introDone = false;
      this.state.intro = null;
      this.ready = true;
      this.root.setAttribute('data-ready', '');
      this.wake();
    });
  };

  CircularCarousel.prototype.nearest = function (angle) { return Math.round(angle / this.s.step) * this.s.step; };

  CircularCarousel.prototype.measure = function () {
    const s = this.s, state = this.state;
    const rect = this.root.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const room = s.captions ? CAPTION_SPACE : 0;
    const width = rect.width * 0.94;
    const height = (rect.height - room) * 0.92;
    const P = s.perspective;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    if (s.layout.inward) {
      minX = -width / 2; maxX = width / 2; minY = -s.cardH / 2; maxY = s.cardH / 2;
    } else {
      const corners = [[-s.cardW / 2, -s.cardH / 2], [s.cardW / 2, -s.cardH / 2], [-s.cardW / 2, s.cardH / 2], [s.cardW / 2, s.cardH / 2]];
      const limit = s.layout.window ? s.layout.window * s.step : 180;
      for (let a = -limit; a <= limit; a += limit / 24) {
        for (const [cx, cy] of corners) {
          let p;
          if (s.axis === 'x') p = rotateY(rotateX([cx, cy, s.radius], -a), s.tilt);
          else if (s.layout.billboard) { const c = rotateY([0, 0, s.radius], a); p = rotateX([c[0] + cx, cy, c[2]], s.tilt); }
          else p = rotateX(rotateY([cx, cy, s.radius], a), s.tilt);
          p = [p[0], p[1], p[2] - s.radius];
          if (p[2] >= P * 0.95) continue;
          const k = P / (P - p[2]);
          minX = Math.min(minX, p[0] * k); maxX = Math.max(maxX, p[0] * k);
          minY = Math.min(minY, p[1] * k); maxY = Math.max(maxY, p[1] * k);
        }
      }
    }
    const fit = Math.min(1, width / Math.max(maxX - minX, 1), height / Math.max(maxY - minY, 1));
    state.fit = fit;
    state.shift = -((minY + maxY) / 2) * fit - room / 2;
    state.drop = s.axis === 'x' ? (rect.width / fit) * 0.55 + s.cardW : (rect.height / fit) * 0.55 + s.cardH;
    this.stage.style.perspective = P + 'px';
    this.stage.style.transform = 'translate3d(0, ' + state.shift + 'px, 0) scale(' + fit + ')';
  };

  CircularCarousel.prototype.introCard = function (elapsed, landing) {
    const state = this.state;
    if (!state.intro) return { radius: 1, lift: 0 };
    const type = state.intro.type, reach = Math.abs(wrap(landing + state.angle));
    if (type === 'assemble') { const p = easeOut(clamp((elapsed - (reach / 180) * 420) / 1080, 0, 1)); return { radius: 1 + 0.6 * (1 - p), lift: 0 }; }
    if (type === 'rise') { const p = easeOutQuint(clamp((elapsed - (reach / 180) * 480) / 900, 0, 1)); return { radius: 1, lift: (1 - p) * state.drop }; }
    if (type === 'spin') { const p = easeOut(clamp(elapsed / INTRO_LENGTH.spin, 0, 1)); return { radius: 1 + 0.28 * (1 - p), lift: 0 }; }
    return { radius: 1, lift: 0 };
  };

  CircularCarousel.prototype.advance = function (s, dt, now) {
    const state = this.state;
    if (!state.introDone && this.ready) {
      if (!state.intro) {
        if (s.intro === 'none') state.introDone = true;
        else state.intro = { type: s.intro, start: now };
      }
      if (state.intro && now - state.intro.start >= INTRO_LENGTH[state.intro.type]) { state.intro = null; state.introDone = true; }
    }
    const paused = (s.pauseOnHover && state.hover) || state.drag || now < state.holdUntil;
    const cruise = s.autoplay === 'drift' && !paused && !state.intro ? s.speed * state.dir : 0;
    let busy = Boolean(state.intro) || state.drag;
    if (state.drag || state.intro) {
      state.velocity = state.drag ? state.velocity : 0;
    } else if (state.target !== null) {
      let remaining = dt;
      const damping = 2 * Math.sqrt(SPRING);
      while (remaining > 0) {
        const h = Math.min(remaining, 1 / 240);
        const accel = SPRING * (state.target - state.angle) - damping * state.velocity;
        state.velocity += accel * h;
        state.angle += state.velocity * h;
        remaining -= h;
      }
      if (Math.abs(state.target - state.angle) < 0.004 && Math.abs(state.velocity) < 0.03) { state.angle = state.target; state.velocity = 0; state.target = null; }
      busy = true;
    } else {
      const tau = 0.18 + s.momentum * 1.5;
      state.velocity += (cruise - state.velocity) * (1 - Math.exp(-dt / tau));
      state.angle += state.velocity * dt;
      if (cruise === 0 && s.snap && Math.abs(state.velocity) < SETTLE_SPEED) state.target = this.nearest(state.angle);
      busy = busy || cruise !== 0 || Math.abs(state.velocity) > 0.01 || state.target !== null;
    }
    if (s.autoplay === 'step' && !paused && !state.intro && state.introDone) {
      if (!state.stepAt) state.stepAt = now + s.interval * 1000;
      if (now >= state.stepAt) { state.target = (state.target != null ? state.target : this.nearest(state.angle)) + s.step * state.dir; state.stepAt = now + s.interval * 1000; }
      busy = true;
    } else state.stepAt = 0;
    if (now < state.holdUntil) busy = true;
    const ease = 1 - Math.exp(-dt / 0.35);
    const aimYaw = state.pointer.inside ? state.pointer.x * s.parallax * 9 : 0;
    const aimPitch = state.pointer.inside ? -state.pointer.y * s.parallax * 6 : 0;
    state.yaw += (aimYaw - state.yaw) * ease;
    state.pitch += (aimPitch - state.pitch) * ease;
    if (Math.abs(aimYaw - state.yaw) > 0.01 || Math.abs(aimPitch - state.pitch) > 0.01) busy = true;
    return busy;
  };

  CircularCarousel.prototype.render = function (s, now) {
    const state = this.state;
    const elapsed = state.intro ? now - state.intro.start : 0;
    const swell = 1 + s.stretch * 0.12 * Math.min(1, Math.abs(state.velocity) / 420);
    let spinOffset = 0;
    if (state.intro && state.intro.type === 'spin') spinOffset = -300 * state.dir * (1 - easeOut(clamp(elapsed / INTRO_LENGTH.spin, 0, 1)));
    else if (state.intro && state.intro.type === 'assemble') spinOffset = -32 * state.dir * (1 - easeOut(clamp(elapsed / INTRO_LENGTH.assemble, 0, 1)));
    const angle = state.angle + spinOffset;
    const R = s.radius * swell;
    if (s.axis === 'x') {
      this.camera.style.transform = 'translate3d(0, 0, ' + (-R) + 'px) rotateY(' + (s.tilt + state.yaw) + 'deg) rotateX(' + state.pitch + 'deg)';
      this.ring.style.transform = 'rotateX(' + (-angle) + 'deg)';
    } else if (s.layout.inward) {
      this.camera.style.transform = 'translate3d(0, 0, ' + (s.perspective - 1) + 'px) rotateX(' + (s.tilt + state.pitch) + 'deg) rotateY(' + state.yaw + 'deg)';
      this.ring.style.transform = 'rotateY(' + angle + 'deg)';
    } else {
      this.camera.style.transform = 'translate3d(0, 0, ' + (-R) + 'px) rotateX(' + (s.tilt + state.pitch) + 'deg) rotateY(' + state.yaw + 'deg)';
      this.ring.style.transform = 'rotateY(' + angle + 'deg)';
    }
    for (let index = 0; index < s.count; index++) {
      const card = this.cards[index];
      if (!card) continue;
      const base = index * s.step;
      const mod = this.introCard(elapsed, base);
      const r = R * mod.radius;
      let transform;
      if (s.axis === 'x') transform = 'rotateX(' + (-base) + 'deg) translateZ(' + r + 'px)';
      else if (s.layout.inward) transform = 'rotateY(' + base + 'deg) translateZ(' + (-r) + 'px)';
      else {
        transform = 'rotateY(' + base + 'deg) translateZ(' + r + 'px)';
        if (s.layout.billboard) transform += ' rotateY(' + (-(base + angle)) + 'deg)';
      }
      if (mod.lift) transform += s.axis === 'x' ? ' translateX(' + mod.lift + 'px)' : ' translateY(' + mod.lift + 'px)';
      card.style.transform = transform;
      const world = wrap(base + angle);
      const facing = Math.cos(world * TO_RAD);
      if (s.layout.inward) card.style.visibility = Math.abs(world) > 86 ? 'hidden' : '';
      card.style.setProperty('--cc-depth', (s.depthFade * Math.pow((1 - facing) / 2, 1.25)).toFixed(3));
    }
    const index = ((Math.round(-state.angle / s.step) % s.count) + s.count) % s.count || 0;
    this.setActive(index);
  };

  CircularCarousel.prototype.frame = function (now) {
    this.raf = 0;
    const s = this.s, state = this.state;
    const dt = state.last ? Math.min((now - state.last) / 1000, 0.05) : 1 / 60;
    state.last = now;
    const busy = this.advance(s, dt, now);
    this.render(s, now);
    if (busy && this.visible && !document.hidden) this.raf = requestAnimationFrame(this.frameBound);
    else state.last = 0;
  };

  CircularCarousel.prototype.wake = function () {
    if (!this.raf && this.visible && !document.hidden) this.raf = requestAnimationFrame(this.frameBound);
  };

  CircularCarousel.prototype.stop = function () { cancelAnimationFrame(this.raf); this.raf = 0; this.state.last = 0; };

  CircularCarousel.prototype.focusIndex = function (index) {
    const state = this.state, s = this.s;
    let target = -index * s.step;
    target += 360 * Math.round((state.angle - target) / 360);
    state.target = target;
    state.holdUntil = performance.now() + 2800;
    this.wake();
  };

  CircularCarousel.prototype.stepBy = function (delta) {
    const state = this.state, s = this.s;
    const base = state.target != null ? state.target : Math.round(state.angle / s.step) * s.step;
    state.target = base - delta * s.step * (s.layout.inward ? -1 : 1);
    state.holdUntil = performance.now() + 2800;
    this.wake();
  };

  /* lay the ring out again for a new card size (the page calls this when the screen width changes) */
  CircularCarousel.prototype.setCardWidth = function (width) {
    if (width === this.opts.cardWidth) return;
    this.opts.cardWidth = width;
    this.s = this.settings();
    this.buildCards();
    this.measure();
    this.render(this.s, performance.now());
    this.wake();
  };

  CircularCarousel.prototype.bind = function () {
    const root = this.root, state = this.state;
    this.frameBound = now => this.frame(now);
    state.dir = (this.opts.direction === 'right' ? 1 : -1) * (this.s.layout.inward ? -1 : 1);

    this.onVisibility = () => { if (document.hidden) this.stop(); else this.wake(); };
    document.addEventListener('visibilitychange', this.onVisibility);
    this.resizeObs = new ResizeObserver(() => { this.measure(); this.wake(); });
    this.resizeObs.observe(root);
    this.io = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      if (this.visible) this.wake(); else this.stop();
    });
    this.io.observe(root);
    if (this.reducedQuery && this.reducedQuery.addEventListener) {
      this.reducedQuery.addEventListener('change', () => { this.s = this.settings(); this.wake(); });
    }

    root.addEventListener('wheel', event => {
      const s = this.s;
      if (!s.draggable) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : 0;
      if (!delta) return;
      event.preventDefault();
      const perPixel = 180 / (Math.PI * s.radius * state.fit);
      state.target = null;
      state.angle -= delta * perPixel * (s.layout.inward ? -1 : 1);
      state.velocity = -delta * perPixel * (s.layout.inward ? -1 : 1) * 30;
      state.holdUntil = performance.now() + 1600;
      clearTimeout(state.wheelTimer);
      state.wheelTimer = setTimeout(() => { if (this.s.snap) state.target = this.nearest(state.angle + state.velocity * 0.12); this.wake(); }, 140);
      this.wake();
    }, { passive: false });

    const updatePointer = event => {
      const rect = root.getBoundingClientRect();
      state.pointer.x = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      state.pointer.y = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
    };
    root.addEventListener('pointerdown', event => {
      state.suppressClick = false;
      if (!this.s.draggable || event.button !== 0) return;
      state.press = { id: event.pointerId, x: event.clientX, y: event.clientY, angle: state.angle, moved: false, origin: 0, samples: [{ time: performance.now(), angle: state.angle }] };
    });
    root.addEventListener('pointermove', event => {
      if (event.pointerType === 'mouse') { state.pointer.inside = true; updatePointer(event); }
      const press = state.press;
      if (!press || press.id !== event.pointerId) { this.wake(); return; }
      const s = this.s;
      const delta = s.axis === 'x' ? event.clientY - press.y : event.clientX - press.x;
      const cross = s.axis === 'x' ? event.clientX - press.x : event.clientY - press.y;
      if (!press.moved) {
        if (Math.abs(delta) < DRAG_THRESHOLD) return;
        if (Math.abs(cross) > Math.abs(delta) * 1.2 && event.pointerType !== 'mouse') { state.press = null; return; }
        press.moved = true;
        press.origin = delta;
        state.drag = true;
        state.target = null;
        state.velocity = 0;
        root.setAttribute('data-dragging', '');
        try { root.setPointerCapture(event.pointerId); } catch (e) {}
      }
      const perPixel = 180 / (Math.PI * s.radius * state.fit);
      state.angle = press.angle + (delta - press.origin) * perPixel * (s.layout.inward ? -1 : 1);
      const now = performance.now();
      press.samples.push({ time: now, angle: state.angle });
      while (press.samples.length > 2 && now - press.samples[0].time > 110) press.samples.shift();
      this.wake();
    });
    const release = event => {
      const press = state.press;
      if (!press || press.id !== event.pointerId) return;
      state.press = null;
      if (!press.moved) return;
      state.drag = false;
      root.removeAttribute('data-dragging');
      state.suppressClick = true;
      const s = this.s;
      const first = press.samples[0], last = press.samples[press.samples.length - 1];
      const span = (last.time - first.time) / 1000;
      const velocity = span > 0.008 ? clamp((last.angle - first.angle) / span, -1400, 1400) : 0;
      state.velocity = velocity;
      if (Math.abs(velocity) > 60) state.dir = Math.sign(velocity);
      const coasting = s.autoplay === 'drift' && !(s.pauseOnHover && state.hover && event.pointerType === 'mouse');
      if (s.snap && !coasting) {
        const tau = 0.18 + s.momentum * 1.5;
        state.target = Math.round((state.angle + velocity * tau * 0.55) / s.step) * s.step;
      }
      this.wake();
    };
    root.addEventListener('pointerup', release);
    root.addEventListener('pointercancel', release);
    root.addEventListener('pointerenter', event => { if (event.pointerType !== 'mouse') return; state.hover = true; this.wake(); });
    root.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') { state.hover = false; state.pointer.inside = false; }
      this.wake();
    });
    root.addEventListener('click', event => {
      if (state.suppressClick) { state.suppressClick = false; return; }
      const card = event.target.closest && event.target.closest('[data-cc-index]');
      if (!card) return;
      const index = Number(card.getAttribute('data-cc-index'));
      if (this.opts.focusOnClick) this.focusIndex(index);
      if (typeof this.opts.onItemClick === 'function') this.opts.onItemClick(this.items[index], index);
    });
    root.addEventListener('keydown', event => {
      const s = this.s;
      const forward = s.axis === 'x' ? 'ArrowDown' : 'ArrowRight';
      const backward = s.axis === 'x' ? 'ArrowUp' : 'ArrowLeft';
      if (event.key === forward) this.stepBy(1);
      else if (event.key === backward) this.stepBy(-1);
      else if (event.key === 'Home') this.focusIndex(0);
      else if (event.key === 'End') this.focusIndex(s.count - 1);
      else if ((event.key === 'Enter' || event.key === ' ') && typeof this.opts.onItemClick === 'function') this.opts.onItemClick(this.items[this.active], this.active);
      else return;
      event.preventDefault();
    });

    this.measure();
    this.render(this.s, performance.now());
    this.wake();
  };

  window.CircularCarousel = CircularCarousel;
})();
