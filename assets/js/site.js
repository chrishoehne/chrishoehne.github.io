'use strict';

document.addEventListener('DOMContentLoaded', function () {
    initAbstracts();
    initStickyNav();
    initScrollSpy();
});

/**
 * Abstract disclosures.
 * Only papers that actually have an abstract carry a toggle button, so a
 * paper without one is inert by construction — nothing to click, nothing
 * focusable, no misleading cursor.
 */
function initAbstracts() {
    document.querySelectorAll('.abstract-toggle').forEach(function (button) {
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        if (!panel) return;

        button.addEventListener('click', function () {
            const isOpen = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', String(!isOpen));
            panel.hidden = isOpen;
        });
    });
}

/**
 * The pinned nav is borderless over the top of the page and grows a hairline
 * rule once content scrolls beneath it.
 */
function initStickyNav() {
    const nav = document.querySelector('.topnav');
    if (!nav) return;

    const onScroll = function () {
        nav.classList.toggle('is-stuck', window.scrollY > 4);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * Moves the nav underline to "Research" once that section is the thing you
 * are actually looking at. Deliberately scroll-position based rather than an
 * IntersectionObserver: on a short page the section can already be inside
 * any sensible observer margin at scroll position zero, which would light
 * the link up before the reader has scrolled at all.
 */
function initScrollSpy() {
    const section = document.getElementById('research');
    const spyLink = document.querySelector('.topnav a[data-spy="research"]');
    const homeLink = document.querySelector('.topnav a[aria-current="page"]');
    if (!section || !spyLink) return;

    const update = function () {
        const top = section.getBoundingClientRect().top;
        const active = window.scrollY > 0 && top < window.innerHeight * 0.4;

        spyLink.classList.toggle('is-active', active);
        if (homeLink) homeLink.classList.toggle('is-muted', active);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
}
