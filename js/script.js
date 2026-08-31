const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        navToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("nav-open", isOpen);
    });

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("nav-open");
        });
    });
}


// Project modal

const projectData = {
    pathfinding: {
        category: "GAME AI",
        title: "Game AI — Pathfinding",
        description:
            "Autonomous navigation using A*, Online Horizon Search, heuristics, and a hybrid approach for static and dynamic objectives.",
        technologies: ["Unity", "C#", "A*", "Horizon Search"],
        video: "assets/projects/pathfinding/demo.mp4",
        github: "https://github.com/Raul-BT/game-ai-pathfinding"
    },

    qlearning: {
        category: "REINFORCEMENT LEARNING",
        title: "Q-Learning Agent",
        description:
            "A reinforcement learning project using a Q-table, ε-greedy exploration, state modelling, and reward design.",
        technologies: ["Unity", "C#", "Q-Learning", "Reinforcement Learning"],
        video: "assets/projects/qlearning/demo.mp4",
        github: "https://github.com/Raul-BT/game-ai-qlearning"
    },

    multiplayer: {
        category: "MULTIPLAYER",
        title: "JavaScript Multiplayer Game",
        description:
            "Two-player Bomberman-style game with local and online multiplayer, matchmaking, rooms, and a client-server architecture.",
        technologies: ["JavaScript", "Phaser 3", "Node.js", "WebSockets"],
        video: "assets/projects/multiplayer/demo.mp4",
        github: "https://github.com/Raul-BT/javascript-websocket-multiplayer-game"
    },

    mips: {
        category: "LOW-LEVEL PROGRAMMING",
        title: "Retro Pong",
        description:
            "Retro-style Pong game developed in MIPS assembly using direct bitmap display and input handling.",
        technologies: ["MIPS", "Assembly", "MARS"],
        video: "assets/projects/mips/demo.mp4",
        github: "https://github.com/Raul-BT/mips-retro-pong"
    }
};

const modal = document.querySelector("#project-modal");
const modalTitle = document.querySelector("#modal-title");
const modalCategory = document.querySelector("#modal-category");
const modalDescription = document.querySelector("#modal-description");
const modalTech = document.querySelector("#modal-tech");
const modalVideo = document.querySelector("#modal-video");
const modalVideoSource = document.querySelector("#modal-video-source");
const modalGithub = document.querySelector("#modal-github");

const projectCards = document.querySelectorAll(".project-card");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");

let lastFocusedElement = null;

function openProjectModal(projectId) {
    const project = projectData[projectId];

    if (!project || !modal) {
        return;
    }

    lastFocusedElement = document.activeElement;

    modalCategory.textContent = project.category;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    modalTech.innerHTML = project.technologies
        .map((technology) => `<span>${technology}</span>`)
        .join("");

    modalVideoSource.src = project.video;
    modalVideo.load();

    modalGithub.href = project.github;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    modal.querySelector(".modal-close").focus();
}

function closeProjectModal() {
    if (!modal) {
        return;
    }

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    modalVideo.pause();

    modalVideoSource.src = "";
    modalVideo.load();

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

projectCards.forEach((card) => {
    card.addEventListener("click", (event) => {
        // Allow the GitHub link to work normally.
        if (event.target.closest(".project-link")) {
            return;
        }

        openProjectModal(card.dataset.project);
    });

    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProjectModal(card.dataset.project);
        }
    });
});

modalCloseButtons.forEach((button) => {
    button.addEventListener("click", closeProjectModal);
});

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        modal &&
        modal.classList.contains("open")
    ) {
        closeProjectModal();
    }
});