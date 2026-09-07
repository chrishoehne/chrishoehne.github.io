'use strict';

document.addEventListener('DOMContentLoaded', function () {
    initAbstracts();
    initStickyNav();
    initScrollSpy();
    initRuleAlignment();
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

/**
 * Lines up the rule above the contact row with the rule under the first
 * section heading in the content column.
 *
 * The two rules live in different grid columns whose heights are set by
 * unrelated content — portrait plus name on one side, however many lines the
 * bio wraps to on the other — so CSS alone cannot relate them. The offset is
 * measured instead, and recomputed whenever the bio can rewrap.
 *
 * Only ever pushes the contact row down; if the heading sits above it there
 * is nothing sensible to close, so the natural position is kept.
 */
function initRuleAlignment() {
    const contact = document.querySelector('.profile .contact');
    const heading = document.querySelector('main .section-label');
    if (!contact || !heading) return;

    const align = function () {
        contact.style.marginTop = '';
        if (window.innerWidth <= 760) return;   // single column: nothing to align

        const delta = heading.getBoundingClientRect().bottom - contact.getBoundingClientRect().top;
        if (delta > 0.5) contact.style.marginTop = delta + 'px';
    };

    align();
    window.addEventListener('resize', align, { passive: true });

    // Webfonts change the metrics of both columns; realign once they land.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(align);
}
