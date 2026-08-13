/* =========================================
   SMART BLOOD DONATION SYSTEM
   Main JavaScript
========================================= */


/* ---------- PAGE LOAD ---------- */

document.addEventListener("DOMContentLoaded", () => {

    console.log("SmartBlood System Loaded Successfully");

    initializeNavigation();
    initializeScrollAnimation();
    initializeButtons();
    initializeStats();

});


/* ---------- NAVIGATION ---------- */

function initializeNavigation() {

    const navLinks = document.querySelectorAll(".navbar nav a");

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {

                event.preventDefault();

                const target = document.querySelector(targetId);

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });

}


/* ---------- SCROLL ANIMATION ---------- */

function initializeScrollAnimation() {

    const elements = document.querySelectorAll(
        ".about-card, .feature-card, .step, .prediction-card"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    elements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "all 0.6s ease";

        observer.observe(element);

    });

}


/* ---------- BUTTONS ---------- */

function initializeButtons() {

    const donorButtons = document.querySelectorAll(
        'a[href="register.html"]'
    );

    donorButtons.forEach(button => {

        button.addEventListener("click", () => {

            console.log("Donor registration selected");

        });

    });


    const bloodRequestButtons = document.querySelectorAll(
        'a[href="request-blood.html"]'
    );

    bloodRequestButtons.forEach(button => {

        button.addEventListener("click", () => {

            console.log("Blood request selected");

        });

    });

}


/* ---------- FIND DONOR ---------- */

function findDonor() {

    const bloodCard = document.querySelector(".blood-card");

    if (!bloodCard) {
        return;
    }


    const button = bloodCard.querySelector("button");

    if (!button) {
        return;
    }


    const originalText = button.innerHTML;

    button.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Finding Donor...
    `;

    button.disabled = true;


    setTimeout(() => {

        button.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Donor Found
        `;

        button.disabled = false;


        showNotification(
            "AI found a suitable donor with 94% match!",
            "success"
        );


        setTimeout(() => {

            button.innerHTML = originalText;

        }, 3000);

    }, 1800);

}


/* ---------- AI ASSISTANT ---------- */

function openChat() {

    const chatButton = document.querySelector(".chat-button");

    if (!chatButton) {
        return;
    }


    const existingChat = document.querySelector(".chat-window");


    if (existingChat) {

        existingChat.classList.toggle("active");

        return;

    }


    createChatWindow();

}


/* ---------- CREATE CHAT WINDOW ---------- */

function createChatWindow() {

    const chatWindow = document.createElement("div");

    chatWindow.className = "chat-window";


    chatWindow.innerHTML = `

        <div class="chat-header">

            <div>
                <i class="fa-solid fa-robot"></i>
                SmartBlood AI
            </div>

            <button onclick="closeChat()">
                <i class="fa-solid fa-xmark"></i>
            </button>

        </div>


        <div class="chat-body" id="chatBody">

            <div class="bot-message">

                Hello! 👋

                <br>

                I am SmartBlood AI Assistant.

                <br>

                How can I help you?

            </div>

        </div>


        <div class="quick-questions">

            <button onclick="askAI('Who can donate blood?')">
                Who can donate?
            </button>

            <button onclick="askAI('Which blood group is universal donor?')">
                Universal donor?
            </button>

            <button onclick="askAI('How often can I donate blood?')">
                Donation interval?
            </button>

        </div>


        <div class="chat-input">

            <input
                type="text"
                id="chatInput"
                placeholder="Ask about blood donation..."
                onkeydown="handleChatKey(event)"
            >

            <button onclick="sendMessage()">

                <i class="fa-solid fa-paper-plane"></i>

            </button>

        </div>

    `;


    document.body.appendChild(chatWindow);


    setTimeout(() => {

        chatWindow.classList.add("active");

    }, 50);

}


/* ---------- CLOSE CHAT ---------- */

function closeChat() {

    const chatWindow = document.querySelector(".chat-window");

    if (chatWindow) {

        chatWindow.classList.remove("active");

    }

}


/* ---------- SEND MESSAGE ---------- */

function sendMessage() {

    const input = document.getElementById("chatInput");

    if (!input) {
        return;
    }


    const message = input.value.trim();


    if (message === "") {

        return;

    }


    addUserMessage(message);

    input.value = "";


    setTimeout(() => {

        const response = getAIResponse(message);

        addBotMessage(response);

    }, 700);

}


/* ---------- ENTER KEY ---------- */

function handleChatKey(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

}


/* ---------- ASK AI ---------- */

function askAI(question) {

    addUserMessage(question);


    setTimeout(() => {

        const response = getAIResponse(question);

        addBotMessage(response);

    }, 500);

}


/* ---------- ADD USER MESSAGE ---------- */

function addUserMessage(message) {

    const chatBody = document.getElementById("chatBody");

    if (!chatBody) {
        return;
    }


    const messageElement = document.createElement("div");

    messageElement.className = "user-message";

    messageElement.textContent = message;


    chatBody.appendChild(messageElement);

    scrollChatToBottom();

}


/* ---------- ADD BOT MESSAGE ---------- */

function addBotMessage(message) {

    const chatBody = document.getElementById("chatBody");

    if (!chatBody) {
        return;
    }


    const messageElement = document.createElement("div");

    messageElement.className = "bot-message";

    messageElement.innerHTML = message;


    chatBody.appendChild(messageElement);

    scrollChatToBottom();

}


/* ---------- SCROLL CHAT ---------- */

function scrollChatToBottom() {

    const chatBody = document.getElementById("chatBody");

    if (chatBody) {

        chatBody.scrollTop = chatBody.scrollHeight;

    }

}


/* ---------- BASIC AI RESPONSE ---------- */

function getAIResponse(message) {

    const text = message.toLowerCase();


    /* Blood donation eligibility */

    if (
        text.includes("who can donate") ||
        text.includes("eligible") ||
        text.includes("donate blood")
    ) {

        return `
            Generally, a healthy person who meets the applicable
            age, weight and health requirements may be eligible to
            donate blood. Eligibility should always be confirmed
            with a qualified blood bank or medical professional.
        `;

    }


    /* Universal donor */

    if (
        text.includes("universal donor") ||
        text.includes("o negative") ||
        text.includes("o-")
    ) {

        return `
            O negative red blood cells are commonly considered the
            universal donor type for emergency red-cell transfusions.
            Blood compatibility should still be confirmed by medical staff.
        `;

    }


    /* Universal recipient */

    if (
        text.includes("universal recipient") ||
        text.includes("ab positive") ||
        text.includes("ab+")
    ) {

        return `
            AB positive is commonly considered the universal recipient
            type for red blood cells.
        `;

    }


    /* Donation interval */

    if (
        text.includes("how often") ||
        text.includes("donation interval") ||
        text.includes("again")
    ) {

        return `
            The interval between donations depends on the type of
            donation and local blood-bank guidelines. Please check
            with your blood bank before donating again.
        `;

    }


    /* Blood group */

    if (
        text.includes("blood group") ||
        text.includes("blood type")
    ) {

        return `
            Common blood groups include A+, A-, B+, B-, AB+, AB-,
            O+ and O-.
        `;

    }


    /* Emergency */

    if (
        text.includes("emergency") ||
        text.includes("urgent")
    ) {

        return `
            For an emergency blood requirement, contact a hospital
            or authorized blood bank immediately. Our system can
            help identify potentially suitable registered donors.
        `;

    }


    /* AI prediction */

    if (
        text.includes("prediction") ||
        text.includes("ai") ||
        text.includes("match")
    ) {

        return `
            SmartBlood AI can rank potential donors using factors
            such as blood-group compatibility, location, availability
            and donation history.
        `;

    }


    /* Greeting */

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return `
            Hello! 👋

            I can help you with blood groups, donor matching,
            blood donation information and the SmartBlood system.
        `;

    }


    /* Default */

    return `
        I can help with:

        <br><br>

        • Blood groups
        <br>
        • Donor eligibility
        <br>
        • AI donor prediction
        <br>
        • Blood requests
        <br>
        • Blood donation information
    `;

}


/* ---------- NOTIFICATION ---------- */

function showNotification(message, type = "success") {

    const notification = document.createElement("div");

    notification.className = `notification ${type}`;

    notification.innerHTML = `

        <i class="fa-solid fa-circle-check"></i>

        <span>${message}</span>

    `;


    document.body.appendChild(notification);


    setTimeout(() => {

        notification.classList.add("show");

    }, 50);


    setTimeout(() => {

        notification.classList.remove("show");


        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 3500);

}


/* ---------- STAT COUNTER ---------- */

function initializeStats() {

    const stats = document.querySelectorAll(".stat h3");


    stats.forEach(stat => {

        const originalText = stat.textContent;

        const number = parseInt(
            originalText.replace(/\D/g, "")
        );


        if (!number) {
            return;
        }


        const suffix = originalText.replace(/[0-9]/g, "");

        let current = 0;

        const increment = Math.ceil(number / 60);


        const counter = setInterval(() => {

            current += increment;


            if (current >= number) {

                current = number;

                clearInterval(counter);

            }


            stat.textContent = current + suffix;

        }, 25);

    });

}


/* ---------- ACTIVE NAV LINK ---------- */

window.addEventListener("scroll", () => {

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(".navbar nav a");


    let currentSection = "";


    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        const scrollPosition = window.scrollY;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


/* ---------- CONSOLE MESSAGE ---------- */

console.log(
    "%c SmartBlood AI System ",
    "background:#d90429;color:white;padding:8px;border-radius:5px;"
);

console.log(
    "Frontend initialized successfully."
);