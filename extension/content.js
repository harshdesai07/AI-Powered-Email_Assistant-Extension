// ===============================
// CONFIG
// ===============================

const CONFIG = {
    API_URL: 'http://localhost:8080/api/email/generate/reply'
};

// ===============================
// CREATE TONE SELECT
// ===============================

function createToneSelect() {

    const select = document.createElement('select');

    select.className = 'ai-tone-select';

    select.style.marginRight = '8px';
    select.style.height = '36px';
    select.style.borderRadius = '18px';
    select.style.border = '1px solid #c6c6c6';
    select.style.padding = '0 12px';
    select.style.fontSize = '13px';
    select.style.cursor = 'pointer';
    select.style.outline = 'none';
    select.style.background = '#fff';

    const tones = [
        'PROFESSIONAL',
        'FRIENDLY',
        'FORMAL',
        'CASUAL',
        'CONCISE',
        'PERSUASIVE',
        'CONFIDENT',
        'APOLOGETIC'
    ];

    tones.forEach(tone => {

        const option = document.createElement('option');

        option.value = tone;
        option.innerText = tone;

        select.appendChild(option);
    });

    const savedTone = localStorage.getItem('ai-email-tone');

    if (savedTone) {
        select.value = savedTone;
    }

    select.addEventListener('change', () => {
        localStorage.setItem('ai-email-tone', select.value);
    });

    return select;
}

// ===============================
// CREATE AI BUTTON
// ===============================

function createAIButton(toneSelect) {

    const button = document.createElement('div');

    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl ai-reply-button';

    button.innerText = 'AI Reply';

    button.style.marginRight = '8px';

    button.setAttribute('role', 'button');

    button.setAttribute('data-tooltip', 'Generate AI Reply');

    button.addEventListener('click', async () => {

        try {

            button.innerText = 'Generating...';
            button.style.pointerEvents = 'none';
            button.style.opacity = '0.7';

            const emailContent = getEmailContent();

            if (!emailContent) {

                alert('No email content found');

                resetButton(button);

                return;
            }

            const selectedTone = toneSelect.value;

            const generatedReply = await generateAIReply(
                emailContent,
                selectedTone
            );

            insertReplyIntoComposeWindow(generatedReply);

            resetButton(button);

        } catch (error) {

            console.error(error);

            resetButton(button);

            alert('Failed to generate AI reply');
        }
    });

    return button;
}

// ===============================
// RESET BUTTON
// ===============================

function resetButton(button) {

    button.innerText = 'AI Reply';
    button.style.pointerEvents = 'auto';
    button.style.opacity = '1';
}

// ===============================
// FIND SEND BUTTONS
// ===============================

function findSendButtons() {

    return document.querySelectorAll(
        'div[role="button"][data-tooltip^="Send"]'
    );
}

// ===============================
// INJECT BUTTON + DROPDOWN
// ===============================

function injectButton(sendButton) {

    const parent = sendButton.parentNode;

    if (parent.querySelector('.ai-reply-button')) {
        return;
    }

    const toneSelect = createToneSelect();

    const aiButton = createAIButton(toneSelect);

    parent.insertBefore(toneSelect, sendButton);

    parent.insertBefore(aiButton, sendButton);

    console.log('AI UI injected');
}

// ===============================
// GET EMAIL CONTENT
// ===============================

function getEmailContent() {

    const originalEmail = document.querySelector('.adn.ads .a3s');

    if (!originalEmail) {
        return '';
    }

    return originalEmail.innerText.trim();
}

// ===============================
// API CALL
// ===============================

async function generateAIReply(emailContent, emailTone) {

    const response = await fetch(CONFIG.API_URL, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            emailContent,
            emailTone
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    return data.reply || data;
}

// ===============================
// INSERT REPLY
// ===============================

function insertReplyIntoComposeWindow(generatedReply) {

    const selectors = [
        '.Am.Al.editable.LW-avf',
        '[role="textbox"]',
        '[g_editable="true"]',
        '[contenteditable="true"]',
        '.editable'
    ];

    let composeBox = null;

    for (const selector of selectors) {

        const element = document.querySelector(selector);

        if (element && element.isContentEditable) {
            composeBox = element;
            break;
        }
    }

    if (!composeBox) {

        alert('Compose box not found');

        return;
    }

    composeBox.focus();

    const formattedReply = generatedReply
        .replace(/\n/g, '<br>')
        .replace(/\r/g, '');

    composeBox.innerHTML = formattedReply;

    ['input', 'change', 'keyup'].forEach(eventType => {

        composeBox.dispatchEvent(
            new Event(eventType, { bubbles: true })
        );
    });

    console.log('Reply inserted');
}

// ===============================
// OBSERVER
// ===============================

const observer = new MutationObserver(() => {

    const sendButtons = findSendButtons();

    sendButtons.forEach(sendButton => {
        injectButton(sendButton);
    });
});

// ===============================
// START OBSERVER
// ===============================

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// ===============================
// INITIAL LOAD
// ===============================

setTimeout(() => {

    const sendButtons = findSendButtons();

    sendButtons.forEach(sendButton => {
        injectButton(sendButton);
    });

}, 1000);

console.log('AI Reply Extension Loaded');