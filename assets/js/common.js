/* ============================================================
   common.js — Satopi Apps 共通JavaScript
   編集する場合：
   - 各関数の上にコメントで説明を書いています
   - 基本的にはこのファイルを読み込むだけで動きます
   ============================================================ */

/* ─────────────────────────────────────────
   1. スクロールで要素をふわっと表示する
   ─────────────────────────────────────────
   HTML側で class="reveal" をつけた要素が
   画面に入ったタイミングで表示されます。
   遅延させたい場合は class="reveal delay-2" のように追加。
───────────────────────────────────────── */
function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  targets.forEach(function(el) {
    observer.observe(el);
  });
}

/* ─────────────────────────────────────────
   2. ナビゲーション：スクロールで背景を変える
   ─────────────────────────────────────────
   id="site-nav" のナビゲーションが
   スクロールするとクラス "scrolled" が付きます。
   CSSで .site-nav.scrolled { ... } のようにスタイルを当てられます。
───────────────────────────────────────── */
function initNav() {
  var nav = document.getElementById('site-nav');
  if (!nav) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/* ─────────────────────────────────────────
   3. スムーズスクロール（ページ内リンク）
   ─────────────────────────────────────────
   href="#section-id" のリンクをクリックすると
   なめらかにスクロールします。
───────────────────────────────────────── */
function initSmoothScroll() {
  var links = document.querySelectorAll('a[href^="#"]');
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ─────────────────────────────────────────
   4. 現在年を自動でフッターに表示
   ─────────────────────────────────────────
   id="footer-year" の要素に現在の年が入ります。
   例: <span id="footer-year"></span>
───────────────────────────────────────── */
function initYear() {
  var el = document.getElementById('footer-year');
  if (el) {
    el.textContent = new Date().getFullYear();
  }
}

/* ─────────────────────────────────────────
   5. ページ読み込み完了後に全て起動
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  initReveal();
  initNav();
  initSmoothScroll();
  initYear();
});
