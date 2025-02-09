// ✅ Ensure Code Only Runs When Elements Exist
document.addEventListener("DOMContentLoaded", function () {
    // ✅ Check if we are on the Valentine Page
    if (document.getElementById("yes-button")) {
        setupValentinePage();
    } else {
        setupGamePage();
    }
});

// ✅ Game Page Setup
function setupGamePage() {
    const rat = document.getElementById("rat");
    const flower = document.getElementById("flower");
    const message = document.getElementById("message");
    const scoreDisplay = document.getElementById("score");
    const nextButton = document.getElementById("next-button");

    let ratX = 175, ratY = 175;
    const speed = 50;
    const gameSize = 400;
    let score = 5;

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
        scurrySound.currentTime = 0; // ✅ Restart sound immediately
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

    // ✅ Button Event Listeners (For Mobile Controls)
    document.getElementById("up").addEventListener("click", () => moveRat("ArrowUp"));
    document.getElementById("down").addEventListener("click", () => moveRat("ArrowDown"));
    document.getElementById("left").addEventListener("click", () => moveRat("ArrowLeft"));
    document.getElementById("right").addEventListener("click", () => moveRat("ArrowRight"));

    // ✅ Function to Redirect
    nextButton.addEventListener("click", function () {
        window.location.href = "valentine.html";
    });

    // ✅ Initial Flower Placement
    respawnFlower();
}

// ✅ Valentine Page Setup
function setupValentinePage() {
    let noButton = document.getElementById("no-button");
    let yesButton = document.getElementById("yes-button");
    let noClickCount = 0;

    noButton.addEventListener("click", function () {
        noClickCount++;

        if (noClickCount < 5) {
            let newSize = Math.max(5, parseFloat(window.getComputedStyle(noButton).fontSize) * 0.7);
            noButton.style.fontSize = `${newSize}px`;
            noButton.style.padding = `${newSize / 2}px ${newSize}px`; 
        } else {
            // 💔 After 5 clicks → Show sad alert & hide buttons
            alert("🥺 Okay... I understand... 💔");
            noButton.style.display = "none"; // Hide No button
            yesButton.style.display = "none"; // Hide Yes button
        }
    });

    yesButton.addEventListener("click", function () {
        alert("AH SHIT FR? That's skibbidi ong 😍🎉"); 

        // ✅ Create Audio Element for Music
        let song = new Audio("https://SlipperyCondom.github.io/Secret/yay.mp3");  
        song.loop = true; // 🎵 Loop the music
        song.volume = 0.8; // 🔊 Adjust volume (0.0 - 1.0)

        // ✅ Force Play After User Interaction
        song.play().then(() => {
            console.log("Music playing!");
        }).catch(error => {
            console.error("Music failed to play:", error);
            alert("Click the page again to play music!");
        });

        // ✅ Render Final Image & Download Link
        document.body.innerHTML = `
            <div style="text-align: center;">
                <a href="https://SlipperyCondom.github.io/Secret/Vaneltnines_card.pdf" download>
                    <img src="https://SlipperyCondom.github.io/Secret/Pdoc_squared_(5).png" class="final-image" alt="Click to Download">
            </div>
        `;
    });
}
