import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { createCircuit } from './circuit';
import { createAmbience, type Ambience } from './sound';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
root.classList.add('motion-ready');

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => scope.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => [...scope.querySelectorAll<T>(sel)];

/* ---------------------------------------------------------------- smooth scroll */

let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

const scrollToTarget = (target: HTMLElement | number, immediate = false) => {
  if (lenis) {
    lenis.scrollTo(target, { immediate, duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target });
  } else {
    target.scrollIntoView();
  }
};

/* ---------------------------------------------------------------- circuit */

const circuitCanvas = $<HTMLCanvasElement>('#circuit');
const circuit = circuitCanvas ? createCircuit(circuitCanvas, { reducedMotion: reduced }) : null;

/* ---------------------------------------------------------------- text splitting */

/** Wraps every word in a mask so it can slide up, keeping inline elements like <em> intact. */
const splitWords = (el: HTMLElement): HTMLElement[] => {
  const words: HTMLElement[] = [];
  const walk = (node: Node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        for (const part of parts) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.append(document.createTextNode(' '));
            continue;
          }
          const mask = document.createElement('span');
          mask.className = 'word-mask';
          const inner = document.createElement('span');
          inner.className = 'word';
          inner.textContent = part;
          mask.append(inner);
          frag.append(mask);
          words.push(inner);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    }
  };
  walk(el);
  return words;
};

/* ---------------------------------------------------------------- intro + hero */

const playHero = (delay = 0) => {
  const chars = $$('.hero-char');
  const fades = $$('[data-hero-fade]');
  if (reduced) {
    gsap.set([...chars, ...fades], { clearProps: 'all', opacity: 1 });
    circuit?.powerOn();
    return;
  }
  // y: 0 discards the CSS translateY GSAP would otherwise read as an extra pixel offset
  gsap.fromTo(chars, { y: 0, yPercent: 105 }, { y: 0, yPercent: 0, duration: 1.6, ease: 'expo.out', stagger: 0.035, delay });
  gsap.fromTo(fades, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.4, ease: 'expo.out', stagger: 0.12, delay: delay + 0.5 });
  // the chip powers up as the name lands
  gsap.delayedCall(delay + 0.3, () => circuit?.powerOn());
};

const finishIntro = () => {
  root.classList.remove('show-intro');
  document.body.classList.remove('is-loading');
  try {
    sessionStorage.setItem('intro-seen', '1');
  } catch {
    /* private mode: the intro simply plays again next time */
  }
  lenis?.start();
  circuit?.rebuild();
  ScrollTrigger.refresh();
};

const runIntro = () => {
  const loader = $('.loader');
  if (!loader || !root.classList.contains('show-intro')) {
    playHero(0.15);
    return;
  }

  document.body.classList.add('is-loading');
  lenis?.stop();

  const counter = $('.loader-count', loader);
  const progress = { value: 0 };
  const tl = gsap.timeline({ onComplete: finishIntro });

  tl.to($$('.loader-char', loader), { y: 0, yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.035 }, 0.1)
    .to($('.loader-bar-fill', loader), { scaleX: 1, duration: 1.9, ease: 'power2.inOut' }, 0.2)
    .to(
      progress,
      {
        value: 100,
        duration: 1.9,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counter) counter.textContent = String(Math.round(progress.value)).padStart(3, '0');
        },
      },
      0.2,
    )
    .to($$('.loader-char', loader), { yPercent: -110, duration: 0.7, ease: 'expo.in', stagger: 0.02 }, 2.25)
    .to($$('.loader-bar, .loader-meta', loader), { opacity: 0, duration: 0.4 }, 2.3)
    .add(() => playHero(0.35), 2.7)
    .fromTo(loader, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.2, ease: 'expo.inOut' }, 2.75);
};

/* ---------------------------------------------------------------- scroll-driven reveals */

const setupReveals = () => {
  if (reduced) return;

  for (const title of $$('[data-split]')) {
    const words = splitWords(title);
    gsap.fromTo(
      words,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: title, start: 'top 85%', once: true },
      },
    );
  }

  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    // revealed blocks move into place: the circuit re-measures so it plugs into their final position
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.09, overwrite: true, onComplete: () => circuit?.rebuild() }),
  });

  for (const entry of $$('[data-entry]')) {
    ScrollTrigger.create({
      trigger: entry,
      start: 'top 66%',
      onEnter: () => entry.classList.add('is-active'),
      onLeaveBack: () => entry.classList.remove('is-active'),
    });
  }

  const portrait = $('[data-portrait]');
  if (portrait) {
    gsap.fromTo(
      $('.portrait-frame', portrait),
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut', scrollTrigger: { trigger: portrait, start: 'top 80%', once: true } },
    );
    gsap.fromTo(
      $('.portrait-outline', portrait),
      { opacity: 0, x: -22, y: -22 },
      { opacity: 1, x: 0, y: 0, duration: 1.6, delay: 0.6, ease: 'expo.out', scrollTrigger: { trigger: portrait, start: 'top 80%', once: true } },
    );
  }

  for (const img of $$('[data-parallax]')) {
    const amount = Number(img.dataset.parallax) || -0.08;
    gsap.fromTo(
      img,
      { yPercent: -amount * 100 },
      { yPercent: amount * 100, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  }

  for (const stat of $$('[data-count]')) {
    const target = Number(stat.dataset.count);
    const value = { n: 0 };
    stat.textContent = '0';
    gsap.to(value, {
      n: target,
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => {
        stat.textContent = String(Math.round(value.n));
      },
      scrollTrigger: { trigger: stat, start: 'top 90%', once: true },
    });
  }
};

/* ---------------------------------------------------------------- header + nav */

const setupNav = () => {
  ScrollTrigger.create({
    start: 40,
    end: 'max',
    onToggle: (self) => root.classList.toggle('scrolled', self.isActive),
  });

  const links = $$<HTMLAnchorElement>('.nav-link');
  for (const link of links) {
    const section = $(link.getAttribute('href') ?? '');
    if (!section) continue;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => link.classList.toggle('is-active', self.isActive),
    });
  }

  const toggle = $<HTMLButtonElement>('.menu-toggle');
  const menu = $('#mobile-menu');
  const setMenu = (open: boolean) => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    if (open) {
      lenis?.stop();
      gsap.fromTo($$('.mobile-link', menu), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.06 });
    } else {
      lenis?.start();
    }
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    const target = e.target as Element | null;
    const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor) return;
    const hash = anchor.getAttribute('href') ?? '';
    if (hash.length < 2) return;
    const section = hash === '#top' ? null : document.getElementById(hash.slice(1));
    if (hash !== '#top' && !section) return;
    e.preventDefault();
    setMenu(false);
    scrollToTarget(section ?? 0);
    history.replaceState(null, '', hash === '#top' ? location.pathname : hash);
    if (section) {
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    }
  });

  // keep the reader's place when switching language
  for (const link of $$<HTMLAnchorElement>('[data-lang-switch]')) {
    link.addEventListener('click', () => {
      if (location.hash) link.href = link.pathname + location.hash;
    });
  }

  if (location.hash && location.hash !== '#top') {
    const section = document.getElementById(location.hash.slice(1));
    if (section) window.setTimeout(() => scrollToTarget(section, true), 50);
  }
};

/* ---------------------------------------------------------------- cursor + magnetic */

const setupPointer = () => {
  window.addEventListener(
    'pointermove',
    (e) => {
      circuit?.setPointer(e.clientX, e.clientY);
    },
    { passive: true },
  );

  if (!finePointer) return;

  const dot = $('.cursor-dot');
  const ring = $('.cursor-ring');
  if (!dot || !ring) return;
  root.classList.add('cursor-ready');

  const dotX = gsap.quickSetter(dot, 'x', 'px');
  const dotY = gsap.quickSetter(dot, 'y', 'px');
  const ringX = gsap.quickTo(ring, 'x', { duration: reduced ? 0 : 0.45, ease: 'power3.out' });
  const ringY = gsap.quickTo(ring, 'y', { duration: reduced ? 0 : 0.45, ease: 'power3.out' });

  // stays invisible until the first move, otherwise it sits in the top-left corner
  gsap.set([dot, ring], { opacity: 0 });
  let seen = false;
  window.addEventListener(
    'pointermove',
    (e) => {
      if (!seen) {
        seen = true;
        gsap.set(ring, { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    },
    { passive: true },
  );

  const interactive = 'a, button, summary, [data-cursor]';
  document.addEventListener('pointerover', (e) => {
    if ((e.target as Element).closest(interactive)) root.classList.add('cursor-hover');
  });
  document.addEventListener('pointerout', (e) => {
    if ((e.target as Element).closest(interactive)) root.classList.remove('cursor-hover');
  });
  document.addEventListener('pointerdown', () => root.classList.add('cursor-down'));
  document.addEventListener('pointerup', () => root.classList.remove('cursor-down'));
  document.documentElement.addEventListener('pointerleave', () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 }));
  document.documentElement.addEventListener('pointerenter', () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 }));

  if (reduced) return;
  // plain tweens rather than quickTo: the elastic return used to kill the quickTo tweens for good
  for (const el of $$('[data-magnetic]')) {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = gsap.getProperty(el, 'x') as number;
      const y = gsap.getProperty(el, 'y') as number;
      // measure from the element's resting position, not its current pulled one
      const cx = r.left - x + r.width / 2;
      const cy = r.top - y + r.height / 2;
      gsap.to(el, { x: (e.clientX - cx) * 0.25, y: (e.clientY - cy) * 0.35, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
    });
  }
};

/* ---------------------------------------------------------------- scroll rail */

const setupRail = () => {
  const rail = $('.scroll-rail');
  const thumb = $('.scroll-thumb');
  if (!rail || !thumb) return;

  let thumbH = 40;
  const update = () => {
    const max = ScrollTrigger.maxScroll(window);
    const railH = rail.clientHeight;
    thumbH = Math.max(40, (railH * window.innerHeight) / (max + window.innerHeight));
    const progress = max > 0 ? window.scrollY / max : 0;
    thumb.style.height = `${thumbH}px`;
    thumb.style.transform = `translateY(${progress * (railH - thumbH)}px)`;
    root.classList.toggle('rail-ready', max > 0);
  };

  const scrollFromPointer = (clientY: number, grabOffset: number) => {
    const r = rail.getBoundingClientRect();
    const progress = gsap.utils.clamp(0, 1, (clientY - r.top - grabOffset) / (r.height - thumbH));
    scrollToTarget(progress * ScrollTrigger.maxScroll(window), true);
  };

  rail.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    const tr = thumb.getBoundingClientRect();
    const onThumb = e.clientY >= tr.top && e.clientY <= tr.bottom;
    const grabOffset = onThumb ? e.clientY - tr.top : thumbH / 2;
    if (!onThumb) {
      const r = rail.getBoundingClientRect();
      const progress = gsap.utils.clamp(0, 1, (e.clientY - r.top - grabOffset) / (r.height - thumbH));
      scrollToTarget(progress * ScrollTrigger.maxScroll(window));
    }
    rail.setPointerCapture(e.pointerId);
    root.classList.add('rail-dragging');
    const move = (ev: PointerEvent) => scrollFromPointer(ev.clientY, grabOffset);
    const up = () => {
      root.classList.remove('rail-dragging');
      rail.removeEventListener('pointermove', move);
      rail.removeEventListener('pointerup', up);
      rail.removeEventListener('pointercancel', up);
    };
    rail.addEventListener('pointermove', move);
    rail.addEventListener('pointerup', up);
    rail.addEventListener('pointercancel', up);
  });

  if (lenis) lenis.on('scroll', update);
  else window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  ScrollTrigger.addEventListener('refresh', update);
  update();
};

/* ---------------------------------------------------------------- sound */

const setupSound = () => {
  const button = $<HTMLButtonElement>('.sound');
  if (!button) return;
  let ambience: Ambience | null = null;
  button.addEventListener('click', () => {
    ambience ??= createAmbience();
    const on = ambience.toggle();
    button.setAttribute('aria-pressed', String(on));
    button.setAttribute('aria-label', (on ? button.dataset.labelOn : button.dataset.labelOff) ?? '');
  });
};

/* ---------------------------------------------------------------- boot */

setupNav();
setupPointer();
setupRail();
setupSound();
setupReveals();
runIntro();

// layout can shift when fonts load or a details panel opens: re-measure the circuit
let resizeTimer: number | undefined;
const remeasure = () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    circuit?.rebuild();
    ScrollTrigger.refresh();
  }, 200);
};
window.addEventListener('resize', remeasure);
for (const d of $$<HTMLDetailsElement>('details')) d.addEventListener('toggle', remeasure);
void document.fonts?.ready.then(remeasure);
