document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.getElementById("drop-zone");
    const fileInput = document.getElementById("file-input");
    const preview = document.getElementById("preview");
    const randomBtn = document.getElementById("random-btn");
    const randomMeme = document.getElementById("random-meme");
    const memes = [
        "https://sun9-32.userapi.com/impg/58b6K9oWwO8nEsR8w2Cgk-LNgiRdUj2uHCHL8A/CQGfxA7DmlM.jpg?size=650x734&quality=96&sign=56be36bd992f5c434c85c2fbca6cd085&type=album",
        "https://sun9-78.userapi.com/impg/c854320/v854320146/1b5359/vGYIMExOwBs.jpg?size=800x644&quality=96&sign=82bbb31f840748d86c24a2c454a3c1c3&type=album",
        "1.jpg",
        "2.jpg",
        "3.jpg",
        "4.jpg"
    ];
    
    randomBtn.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * memes.length);
        randomMeme.innerHTML = `<img src="${memes[randomIndex]}" alt="Случайный мем" class="fade-in">`;
    });
    
    dropZone.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropZone.classList.add("highlight");
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("highlight");
    });

    dropZone.addEventListener("drop", (event) => {
        event.preventDefault();
        dropZone.classList.remove("highlight");
        const file = event.dataTransfer.files[0];
        handleFile(file);
    });

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        handleFile(file);
    });

    function handleFile(file) {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = document.createElement("img");
                img.src = reader.result;
                img.classList.add("meme-preview");
                preview.innerHTML = "";
                preview.appendChild(img);
                showNotification("Мем загружен!");
            };
            reader.readAsDataURL(file);
        }
    }

    function showNotification(message) {
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(message);
        } else if ("Notification" in window && Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification(message);
                }
            });
        }
    }
});