let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

// ketika user menekan tombol di keyboard akan merubah tulisan judul
$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});

// ketika tombol dengan class .btn di klik
$(".btn").click(function() {
    // variabel untuk menyimpan id sesuai nama button mana yang di klik
    // contoh : jika tombol hijau ditekan maka memiliki id dengan nama green (id : green)
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    // ketika button diklik akan bersuara sesuai dengan warna nama id
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // memanggil checkAnswer() dan mengurangi panjang userClickedPattern - 1
    checkAnswer(userClickedPattern.length-1);
});

// function untuk mengecek jawaban/tebakan user
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            // jika panjang gamePatteen dengan userClickedPattern sama, menambahkan dilay pada nextSequence() 1000 milisecond
            setTimeout(() => {
                nextSequence();
            }, 1000);
        } 
    } else {
        // ketika salah akan merubah tulisan title(h1) 
        $("#level-title").text("Game Over, Press Any Key to Restart");
        // memainkan musik dengan nama wrong.mp3
        playSound("wrong");
        // menambahkan class game-over di body untuk menambahkan animasi yang ada di css
        $("body").addClass("game-over");

        // menghapus class game-over setelah 200 milisecond
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);

        // memanggil function startOver() untuk mereset level, gamePattern, dan started ketika user salah menekan tombol
        startOver();
    }
};

// function untuk menambahkan animasi ketika tombol ditekan
function animatePress(currentColour) {
    // akan mengeksekusi tombol sesui id yang dimasukkan ke currentColour dan menambahkan class yang ada di css untuk animasi
    $("#" + currentColour).addClass("pressed");

    // menggunakan setTimeout untuk menghapus class setelah 100 milisecond
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// function untuk pemilihan acak berikutnya setelah user menekan tombol/menebak tombol
function nextSequence() {
    // mereset isi aray menjadi kosong ketika nextSequence() ditrigger di function checkAnswer() agar siap menampung nilai baru ketika user benar menebak
    userClickedPattern = [];
    // melakukan increment level dan mengubah tulisan level sesuai isi dari variabel level
    level++;
    $("#level-title").text("Level " + level);
    // membuat angka acak dari 0 - 3
    let randomNumber = Math.floor(Math.random() * 4);
    // memilih warna dari array buttonColors dengan index acak dari randomNumber
    let randomChosenColour = buttonColors[randomNumber];
    //  memasukkan randomChoseColour ke gamePattern yang berisi warna acak berdasarkan index acak
    gamePattern.push(randomChosenColour);

    // mengeksekusi id dengan nama warna acak dan memberi animasi
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // memilih suara sesuai nama warna acak dari function playSound
    playSound(randomChosenColour);
}

// function untuk memainkan audio
function playSound(name) {
    // memilih dan memainkan suara berdasarkan nama warna di folder sounds
    let sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

// function untuk mereset level, gamePattern, dan started
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
