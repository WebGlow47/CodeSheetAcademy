const themeButton = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.querySelector(".theme-label");
const savedTheme = localStorage.getItem("theme");
const menuButton = document.querySelector(".menu-toggle");
const scrollProgress = document.querySelector(".scroll-progress");
const VISITOR_COUNTER_ENDPOINT = "";

function setTheme(theme) {
    const isLight = theme === "light";
    document.body.classList.toggle("light", isLight);
    themeIcon.textContent = isLight ? "☀" : "☾";
    themeLabel.textContent = isLight ? "Light" : "Dark";
    localStorage.setItem("theme", theme);
}

setTheme(savedTheme || "dark");

themeButton.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light") ? "dark" : "light";
    setTheme(nextTheme);
});

if (menuButton) {
    menuButton.addEventListener("click", () => {
        const isOpen = document.body.classList.toggle("nav-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav-links a, .more-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            document.body.classList.remove("nav-open");
            menuButton.setAttribute("aria-expanded", "false");
            const moreMenu = link.closest(".more-menu");
            if (moreMenu) {
                moreMenu.open = false;
            }
        });
    });
}

function updateScrollProgress() {
    if (!scrollProgress) {
        return;
    }

    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    scrollProgress.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
        const codeBox = button.closest(".code-card, .demo-code");
        const code = codeBox.querySelector("code").innerText;

        try {
            await navigator.clipboard.writeText(code);
            button.textContent = "Copied";
        } catch {
            button.textContent = "Select";
        }

        setTimeout(() => {
            button.textContent = "Copy";
        }, 1400);
    });
});

document.querySelectorAll("[data-copy-value]").forEach((button) => {
    button.addEventListener("click", async () => {
        const value = button.dataset.copyValue;

        try {
            await navigator.clipboard.writeText(value);
            button.textContent = "Copied";
        } catch {
            button.textContent = value;
        }

        setTimeout(() => {
            button.textContent = "Copy number";
        }, 1400);
    });
});

const searchInput = document.querySelector("#site-search");
const searchResults = document.querySelector("#search-results");
const searchCount = document.querySelector("#search-count");

const searchableSections = [
    { title: "Start here", id: "start", keywords: "beginner zero experience files html css" },
    { title: "HTML reference", id: "html", keywords: "html tags structure semantic form image link" },
    { title: "Examples", id: "examples", keywords: "header nav main section footer button card form grid result" },
    { title: "HTML elements", id: "html-elements", keywords: "table details summary blockquote aside progress input" },
    { title: "Visual basics", id: "visual-basics", keywords: "text links lists image spacing color hover" },
    { title: "CSS effects", id: "css-effects", keywords: "margin padding contrast position animation hover" },
    { title: "Layouts", id: "layouts", keywords: "flexbox grid navbar columns responsive layout" },
    { title: "Diagrams", id: "diagrams", keywords: "diagram box model html css browser semantic tree" },
    { title: "Projects", id: "projects", keywords: "landing free features dashboard mini project" },
    { title: "Recipes", id: "recipes", keywords: "navbar hero card contact form mobile theme" },
    { title: "Dictionary", id: "dictionary", keywords: "html tag css property div span article display gap padding" },
    { title: "Challenges", id: "challenges", keywords: "practice challenge profile card navbar features dashboard portfolio" },
    { title: "Common layouts", id: "common-layouts", keywords: "sidebar two columns footer dashboard card grid" },
    { title: "Starter template", id: "starter-template", keywords: "copy starter template index html style css" },
    { title: "Quiz", id: "quiz", keywords: "quiz questions test link color grid" },
    { title: "Publish checklist", id: "publish", keywords: "publish ready seo metadata manifest robots static hosting" },
    { title: "Visitor count", id: "visitors", keywords: "visitors counter analytics real people views count" },
    { title: "Support", id: "support", keywords: "support donation lebanon free creator help" },
    { title: "Fixes", id: "mistakes", keywords: "mistakes fixes css not working class mobile overflow" },
    { title: "Debug", id: "debug", keywords: "debug checklist broken inspect save refresh" },
];

function renderSearchResults(query) {
    const cleanQuery = query.trim().toLowerCase();
    searchResults.innerHTML = "";

    if (!cleanQuery) {
        searchCount.textContent = "Start typing to filter helpful sections.";
        return;
    }

    const matches = searchableSections.filter((item) => {
        return `${item.title} ${item.keywords}`.toLowerCase().includes(cleanQuery);
    });

    searchCount.textContent = `${matches.length} result${matches.length === 1 ? "" : "s"} found.`;

    matches.forEach((item) => {
        const link = document.createElement("a");
        link.href = `#${item.id}`;
        link.textContent = item.title;
        searchResults.appendChild(link);
    });
}

if (searchInput) {
    searchInput.addEventListener("input", (event) => {
        renderSearchResults(event.target.value);
    });
}

document.querySelectorAll(".quiz-card").forEach((card) => {
    const answer = card.dataset.answer;
    const feedback = card.querySelector(".quiz-feedback");

    card.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
            card.querySelectorAll("button").forEach((choice) => {
                choice.classList.remove("correct", "wrong");
            });

            const isCorrect = button.dataset.choice === answer;
            button.classList.add(isCorrect ? "correct" : "wrong");
            feedback.textContent = isCorrect ? "Correct. Nice." : "Not this one. Try another answer.";
        });
    });
});

const progressItems = document.querySelectorAll("[data-progress-item]");
const progressPercent = document.querySelector("#progress-percent");
const meterFill = document.querySelector("#meter-fill");
const certificateCard = document.querySelector("#certificate-card");
const savedProgress = JSON.parse(localStorage.getItem("learningProgress") || "{}");

function updateProgress() {
    const total = progressItems.length;
    const completed = [...progressItems].filter((item) => item.checked).length;
    const percent = total ? Math.round((completed / total) * 100) : 0;

    if (progressPercent) {
        progressPercent.textContent = `${percent}%`;
    }

    if (meterFill) {
        meterFill.style.width = `${percent}%`;
    }

    if (certificateCard) {
        certificateCard.classList.toggle("is-visible", percent === 100);
    }
}

progressItems.forEach((item) => {
    item.checked = Boolean(savedProgress[item.dataset.progressItem]);

    item.addEventListener("change", () => {
        savedProgress[item.dataset.progressItem] = item.checked;
        localStorage.setItem("learningProgress", JSON.stringify(savedProgress));
        updateProgress();
    });
});

updateProgress();

const htmlEditor = document.querySelector("#html-editor");
const cssEditor = document.querySelector("#css-editor");
const playgroundPreview = document.querySelector("#playground-preview");
const resetPlayground = document.querySelector("#reset-playground");
const defaultPlaygroundHtml = htmlEditor ? htmlEditor.value : "";
const defaultPlaygroundCss = cssEditor ? cssEditor.value : "";

function updatePlayground() {
    if (!htmlEditor || !cssEditor || !playgroundPreview) {
        return;
    }

    playgroundPreview.srcdoc = `<!DOCTYPE html>
<html>
<head>
<style>${cssEditor.value}</style>
</head>
<body>${htmlEditor.value}</body>
</html>`;
}

if (htmlEditor && cssEditor) {
    htmlEditor.addEventListener("input", updatePlayground);
    cssEditor.addEventListener("input", updatePlayground);
    updatePlayground();
}

if (resetPlayground) {
    resetPlayground.addEventListener("click", () => {
        htmlEditor.value = defaultPlaygroundHtml;
        cssEditor.value = defaultPlaygroundCss;
        updatePlayground();
    });
}

const visitorCountTargets = document.querySelectorAll("[data-visitor-count]");
const visitorStatus = document.querySelector("[data-visitor-status]");

function setVisitorCount(value) {
    visitorCountTargets.forEach((target) => {
        target.textContent = value;
    });
}

async function updateVisitorCount() {
    if (!visitorCountTargets.length) {
        return;
    }

    if (!VISITOR_COUNTER_ENDPOINT) {
        setVisitorCount("Connect");
        if (visitorStatus) {
            visitorStatus.textContent = "Add your real counter endpoint in script.js before publishing.";
        }
        return;
    }

    const visitorIdKey = "codesheetVisitorId";
    let visitorId = localStorage.getItem(visitorIdKey);

    if (!visitorId) {
        visitorId = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
        localStorage.setItem(visitorIdKey, visitorId);
    }

    try {
        const response = await fetch(VISITOR_COUNTER_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ visitorId }),
        });
        const data = await response.json();
        const count = Number(data.count);

        if (!Number.isFinite(count)) {
            throw new Error("Counter endpoint did not return { count }.");
        }

        setVisitorCount(new Intl.NumberFormat().format(count));
        if (visitorStatus) {
            visitorStatus.textContent = "Real visitor count connected.";
        }
    } catch {
        setVisitorCount("Offline");
        if (visitorStatus) {
            visitorStatus.textContent = "Counter endpoint could not be reached.";
        }
    }
}

updateVisitorCount();

const revealItems = document.querySelectorAll(
    ".section, .stats-grid article, .demo-card, .project-demo, .diagram-card, .feature-card"
);

if ("IntersectionObserver" in window) {
    revealItems.forEach((item) => item.classList.add("reveal"));

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}
