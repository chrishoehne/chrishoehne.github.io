'use strict';

/**
 * Abstract disclosures.
 * Only papers that actually have an abstract carry a toggle button, so a
 * paper without one is inert by construction — nothing to click, nothing
 * focusable, no misleading cursor.
 */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.abstract-toggle').forEach(function (button) {
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        if (!panel) return;

        button.addEventListener('click', function () {
            const isOpen = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', String(!isOpen));
            panel.hidden = isOpen;
        });
    });
});
