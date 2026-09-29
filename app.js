console.log("bismillah praktikum dimulai");

//aktivitas 1 DOM selection / selesi elemen 
// karena kita harus seleksi karena "menangkap atau ambil id/class
// mengambil elemen html tersebut lalu disimpan di variabel javascript

// 1. memgambil elemen judul dan sub judul 
// document.getelemenById("...") mengambil berdasarkann atribut Id

const judulutama = document.getElementById("judul-utama"); // menangkap: <h1 id="judul-utama">

//document.queryselector("#...")
// tanda # artinya ID 

const subjudul = document.querySelector("#sub-judul"); // menangkap: <p id="sub-judul">

// 2. mengambil elemen pada kartu 1 (kartu manipulasi teks dan style)
const tekspreview = document.getElementById("teks-preview");
const boxpreview = document.getElementById("box-preview");
const cardmanipulasi = document.getElementById("card-manipulasi");

// 3. mengambil elemen tombol - tombol aksi pada kartu 1
const btnubahteks = document.getElementById("btn-ubah-teks");
const btntogglewarna = document.getElementById("btn-toggle-warna");
const btnreset = document.getElementById("btn-reset");


// 4. mengambil elemen pada kartu 2 (fitur catatan dinamis/ to do list sederhana)
const inputcatatan = document.getElementById("input-catatan");
const btntambah = document.getElementById("btn-tambah");
const daftarcatatan = document.getElementById("daftar-catatan");
const jumlahcatatan = document.getElementById("jumlah-catatan");
const pesankosong = document.getElementById("pesan-kosong");

// kativitas ke 2 manipulasi teks dan style (card 1 )
// addEventlisntener("click", function(){...}) artinya adalah tolong dengarkan dulu/ tunggu 
// sampai di klik user. jika di klik jalankan perintah dalam function 

// A. mengubah teks dan warna secra langsung 

btnubahteks.addEventListener("click", function (){
    // .innertext = mengganti atau mengisi secara langsung teks yang ada di dalam elemen htmll
    tekspreview.innerText = "hebat! teks ini berhasil di ubah pake DOM ";

    // .style.color = " mengubah warna teks secara langsung (inlinen style)"
    tekspreview.style.color = "#4138ee";

    // consloe.log = menecetak persan di consele browser
    console.log("[DOM] teks preview telah di perbaharui")
});

//B. manipulasi class css menggunkan classlist.toggle()
btntogglewarna.addEventListener("click", function(){
    // .classlist.toggle("nama-class") = fitur saklar otomaris (ON/OF)
    boxpreview.classList.toggle("active-mode");
    cardmanipulasi.classList.toggle("highlight");

    console.log("DOM berhasil di swicth!")
});

//C. mengembalikan (reset) teks ke kondisi semula 
btnreset.addEventListener("click", function() {
    //1. kembalikan teks semula teks asli 
    tekspreview.innerText = "halo! teks ini siap di ubah oelh javascript";

    // 2. kosongkan warna agra kembali ke warna css semula 
    tekspreview.style.color ="";

    // 3. hapus calss khusus untuk menggukan .classlist.remove("")
    boxpreview.classList.remove("active-mode");
    cardmanipulasi.classList.remove("highlight");

    console.log("DOM tampilam di reset");
});

// kativitas 3 dan 4 : membuatkan elemen dinamis dan event handling (TO DO list sederhana)
// di aktivitas ini kita belajar elemen html baru <li> secara otomatis dalam javascript 
// mengisi teksnya, memberi tombil, lalu menempelkan ke layar (<ul>)

// langkah 1. membuat variabel penampunng angka jumlah catatan 
//"let" digunkan unutk nilai variable yang akan berubah bisa bertambah dan berkurang (counting)
let totalcatatan = 0;

//langkah 2. fungsi update angka counter dan pesan status
function perbaruijumlah() {
    //massukan angka total catatan ke dalam tag <span id="jumlah-catatan"
    if (totalcatatan === 0) {
        //jika 0: hapus class hideen supaya teks "belum ada catatan" tersembunyi
        pesankosong.classList.remove("hidden");
    } else {
        //jika > 0 : tambahkan class "hidden" agar teks "belum ada catatan " tersembunyi 
        pesankosong.classList.add("hidden")
    }
};

// langkah 3. fungsi utama logika tambah catatan baru 
function tambahcatatan() {
    // 3.1 inputcatatan.value fungsi nya unutk mengambil teks yang di ketik oleh user 
    // .trim() = menghapus spasi diawal dan diakhir 
    const isiteks = inputcatatan.value.trim();

    //3.2 validasi input : jika isi teks kosong maka tamoilkan alert
    if (isiteks === "") {
        alert("catatan kamu tidak boleh kosong!");
        return;
    }

    // 3.3 document.createelement("li") -> membuat memory di javascript
    const libaru = document.createElement("li");
    libaru.className = "note-item"; // menambahkan pada tag li 

    //3.4 inner.html = megisi struktur didalam <li> dengan  teks catatan dan tombil hapus 
    // tanda bactick (`)
    libaru.innerHTML = `<span>${isiteks}</span> <button class="btn-hapus">hapus</button>`;

    // 3.5 menambahkan telinga / event listener unutk tombol hapus pada catatan dinamis 
    // libaru.queryselector(".btn-hapus") = mengangmabil tombol ber class "btn-hapus" khsus ada yang di li 
    const btnhapus = libaru.querySelector(".btn-hapus");
    btnhapus.addEventListener("click", function() {
        libaru.remove(); // mengapus elemen list yang di layar html
        totalcatatan--; // total catatan dikurangi sebanyak 1x
        perbaruijumlah(); // panggil fungsi perbarui jumlah unutk update di angka layar 
        console.log(`Dom catatan "${isiteks}" dihapus`);
    });

    // 3.6 appenchilde = memasukan elemen li ke dalam <ul id="daftra-catatan">
    daftarcatatan.appendChild(libaru);

    // 3.7 mengosongkan kembali isi kolom input (inputcatatan.value = "") supaya bisa di ketik lagi 
    inputcatatan.value = "";

    // 3.8 totalcatatan++ artinya tambah nilai toatal catatan sebanyak 1x, lalu update ke layar 
    totalcatatan++;
    perbaruijumlah();

    console.log(`Dom catatan baru ditambahkan: ${isiteks} `);
}

//langkah 4: event listener klik tombol + "tambah"
//ketika tombol +"tambah" di klik oleh user, maka jalankan fungsi tambahan()
btntambah.addEventListener("click", function(){
    tambahcatatan();
});

//langkah 5: event lsitener keyboard "enter" pada kolom input 
// ketika user meengetik di kolom input dan melepas tombol keyboard(`event keyup`);
inputcatatan.addEventListener("keyup", function(event) {
    //periksa apakah tombol keyboard yang di tekan user adalah enter?
    if (event.key === "enter")
        tambahcatatan(); // jika ya, tambahl
})