
"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // نمایش سال جاری با ارقام فارسی
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Intl.DateTimeFormat("fa-IR", {
            year: "numeric"
        }).format(new Date());
    }

    // منوی موبایل
    const menuToggle = document.getElementById("menuToggle");
    const mainMenu = document.getElementById("mainMenu");

    if (menuToggle && mainMenu) {

        menuToggle.addEventListener("click", function () {
            const isOpen = mainMenu.classList.toggle("is-open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "بستن منو" : "باز کردن منو"
            );
        });

        // بستن منو بعد از انتخاب بخش موردنظر
        mainMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mainMenu.classList.remove("is-open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "باز کردن منو");
            });
        });

        // بستن منو با کلید Escape
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                mainMenu.classList.remove("is-open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "باز کردن منو");
            }
        });

        // بستن منو در صورت کلیک بیرون از آن
        document.addEventListener("click", function (event) {
            const clickedInsideMenu = mainMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                mainMenu.classList.remove("is-open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "باز کردن منو");
            }
        });
    }

});



(() => {
    const track = document.getElementById("projectsTrack");
    const prev = document.getElementById("projectPrev");
    const next = document.getElementById("projectNext");
    const dotsContainer = document.getElementById("projectDots");

    if (!track || !prev || !next || !dotsContainer) return;

    const cards = Array.from(track.querySelectorAll(".project-card"));
    let index = 0;

    function visibleCount() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    function maxIndex() {
        return Math.max(0, cards.length - visibleCount());
    }

    function renderDots() {
        dotsContainer.innerHTML = "";

        for (let i = 0; i <= maxIndex(); i++) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "carousel-dot" + (i === index ? " active" : "");
            dot.setAttribute("aria-label", `رفتن به موقعیت ${i + 1}`);

            dot.addEventListener("click", () => {
                index = i;
                update();
            });

            dotsContainer.appendChild(dot);
        }
    }

    function update() {
        index = Math.min(index, maxIndex());

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;

        track.style.transform =
            `translateX(-${index * (cardWidth + gap)}px)`;

        renderDots();
        prev.disabled = index === 0;
        next.disabled = index === maxIndex();

        prev.style.opacity = prev.disabled ? "0.45" : "1";
        next.style.opacity = next.disabled ? "0.45" : "1";
    }

    prev.addEventListener("click", () => {
        if (index > 0) {
            index--;
            update();
        }
    });

    next.addEventListener("click", () => {
        if (index < maxIndex()) {
            index++;
            update();
        }
    });

    window.addEventListener("resize", update);

    update();
})();
