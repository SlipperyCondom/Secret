// ✅ Select Elements
const rat = document.getElementById("rat");
const flower = document.getElementById("flower");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const nextButton = document.getElementById("next-button");

let ratX = 175, ratY = 175;
const speed = 50;
const gameSize = 400;
let score = 5;
let noClickCount = 0;  // ✅ Define globally

// ✅ Messages List
const messages = [
    "get the flower!",
    "you're doing so well ong",
    "fr fr ong",
    "go little one almost there",
    "last one :>",
    "goodjobbb thats my baby"
];

// ✅ Load Sound
const scurrySound = new Audio("Apple.mp3");
scurrySound.volume = 1.0;
scurrySound.playbackRate = 1.5;

function playScurrySound() {
    scurrySound.currentTime = 0;  // ✅ Restart sound immediately
    scurrySound.play().catch(e => console.error("Sound error:", e));
}

// ✅ Move Rat Function
function moveRat(direction) {
    if (direction === "ArrowUp" && ratY > 0) ratY -= speed;
    if (direction === "ArrowDown" && ratY < gameSize - 50) ratY += speed;
    if (direction === "ArrowLeft" && ratX > 0) ratX -= speed;
    if (direction === "ArrowRight" && ratX < gameSize - 50) ratX += speed;

    rat.style.left = `${ratX}px`;
    rat.style.top = `${ratY}px`;
    console.log(`Rat Position: X=${ratX}, Y=${ratY}`);

    // ✅ Add Animation
    rat.classList.add("scurry");
    setTimeout(() => rat.classList.remove("scurry"), 100);

    playScurrySound();
    checkCollision();
}

// ✅ Position Rat and Flower
rat.style.left = `${ratX}px`;
rat.style.top = `${ratY}px`;

function respawnFlower() {
    if (score > 0) {
        let flowerX = Math.floor(Math.random() * (gameSize - 50));
        let flowerY = Math.floor(Math.random() * (gameSize - 50));
        flower.style.left = `${flowerX}px`;
        flower.style.top = `${flowerY}px`;
    } else {
        flower.style.display = "none";
        nextButton.style.display = "block"; // Show Next Button
    }
}

// ✅ Check Collision with Flower
function checkCollision() {
    let ratRect = rat.getBoundingClientRect();
    let flowerRect = flower.getBoundingClientRect();

    if (
        ratRect.left < flowerRect.right &&
        ratRect.right > flowerRect.left &&
        ratRect.top < flowerRect.bottom &&
        ratRect.bottom > flowerRect.top
    ) {
        score--;
        scoreDisplay.innerText = `Flowers Left: ${score}`;
        message.innerText = messages[5 - score]; // Update Message

        if (score === 0) {
            message.innerText = messages[5];
        }

        respawnFlower();
    }
}

// ✅ Key Events
document.addEventListener("keydown", (event) => {
    moveRat(event.key);
});

// ✅ Button Event Listeners (MOVED TO AFTER moveRat() DEFINITION)
document.getElementById("up").addEventListener("click", () => moveRat("ArrowUp"));
document.getElementById("down").addEventListener("click", () => moveRat("ArrowDown"));
document.getElementById("left").addEventListener("click", () => moveRat("ArrowLeft"));
document.getElementById("right").addEventListener("click", () => moveRat("ArrowRight"));

// ✅ Function to Redirect
function goToValentinePage() {
    window.location.href = "valentine.html";
}

// ✅ Shrink "No" Button on Click
function shrinkNo() {
    let noButton = document.getElementById("no-button");

    noClickCount++;

    // Shrinks "No" button until it disappears
    let newSize = 5 - noClickCount;  
    if (newSize <= 1) {
        noButton.style.display = "none"; // Hides button when too small
        alert("🥺 Okay... I understand... 💔");
    } else {
        noButton.style.fontSize = newSize + "vw";
        noButton.style.padding = (newSize / 2) + "px " + (newSize * 2) + "px";
    }
}

// ✅ YES Button Event
document.getElementById("yes-button").addEventListener("click", function () {
    alert("AH SHIT FR? That's skibbidi ong 😍🎉"); 
    document.body.innerHTML = `
    <div style="text-align: center;">
        <a href="https://SlipperyCondom.github.io/Secret/Vaneltnines_card.pdf" download>
            <img src="Pdoc_squared_5.png" class="final-image" alt="Click to Download">
        </a>
        <p>Click the image to download your special Valentine’s Card ❤️</p>
    </div>
    `;
});

// ✅ Initial Flower Placement
respawnFlower();
