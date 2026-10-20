const BASE_URL = "https://jsonplaceholder.typicode.com";

const membersLoading = document.getElementById("members-loading");
const membersError = document.getElementById("members-error");
const membersList = document.getElementById("members-list");

const tasksTitle = document.getElementById("tasks-title");
const tasksPlaceholder = document.getElementById("tasks-placeholder");
const tasksLoading = document.getElementById("tasks-loading");
const tasksError = document.getElementById("tasks-error");
const tasksPanel = document.getElementById("tasks-panel");
const tasksList = document.getElementById("tasks-list");
const progress = document.getElementById("progress");
const noMatch = document.getElementById("no-match");

const searchInput = document.getElementById("search-input");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskSubmit = document.getElementById("task-submit");
const formError = document.getElementById("form-error");
const notif = document.getElementById("notif");

const KELAS_AKTIF = ["bg-blue-600", "text-white"];
const KELAS_BIASA = ["bg-slate-100", "hover:bg-slate-200"];
const KELAS_SELESAI = ["line-through", "text-gray-400"];

let requestTerakhir = 0; 
let notifTimer = null;

function tampilkan(el, teks) {
  if (teks !== undefined) el.textContent = teks;
  el.classList.remove("hidden");
}

function sembunyikan(el) {
  el.classList.add("hidden");
}

//daftar anggota
async function muatAnggota() {
  tampilkan(membersLoading, "Memuat anggota...");
  sembunyikan(membersError);
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`Server mengembalikan status ${response.status}`);
    }
    const users = await response.json();
    membersList.innerHTML = "";
    users.forEach((user) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = user.name;
      btn.dataset.id = user.id;
      btn.className = "text-left rounded-lg px-3 py-2 transition";
      btn.classList.add(...KELAS_BIASA);
      btn.addEventListener("click", () => pilihAnggota(user, btn));
      membersList.appendChild(btn);
    });
  } catch (error) {
    tampilkan(membersError, `Gagal memuat anggota: ${error.message}`);
  } finally {
    sembunyikan(membersLoading);
  }
}

//tugas anggota
function tandaiAnggota(btnTerpilih) {
  membersList.querySelectorAll("button").forEach((b) => {
    b.classList.remove(...KELAS_AKTIF);
    b.classList.add(...KELAS_BIASA);
  });
  btnTerpilih.classList.remove(...KELAS_BIASA);
  btnTerpilih.classList.add(...KELAS_AKTIF);
}

async function pilihAnggota(user, btn) {
  tandaiAnggota(btn);
  tasksTitle.textContent = `Tugas ${user.name}`;

  // reset tampilan
  tasksList.innerHTML = "";
  searchInput.value = "";
  taskInput.value = "";
  sembunyikan(tasksPanel);
  sembunyikan(tasksPlaceholder);
  sembunyikan(tasksError);
  sembunyikan(formError);
  sembunyikan(noMatch);
  tampilkan(tasksLoading, "Memuat tugas...");

  const idRequest = ++requestTerakhir;
  try {
    const response = await fetch(`${BASE_URL}/todos?userId=${user.id}`);
    if (!response.ok) {
      throw new Error(`Server mengembalikan status ${response.status}`);
    }
    const todos = await response.json();
    if (idRequest !== requestTerakhir) return; // sudah ada klik yang lebih baru

    tasksList.innerHTML = "";
    todos.forEach((todo) => {
      tasksList.appendChild(buatItemTugas(todo.title, todo.completed));
    });
    tampilkan(tasksPanel);
    perbaruiRingkasan();
  } catch (error) {
    if (idRequest !== requestTerakhir) return;
    tampilkan(tasksError, `Gagal memuat tugas: ${error.message}`);
  } finally {
    if (idRequest === requestTerakhir) sembunyikan(tasksLoading);
  }
}

function buatItemTugas(title, completed) {
  const li = document.createElement("li");
  li.className = "flex items-center justify-between gap-3 border border-slate-200 rounded-lg px-3 py-2";
  li.dataset.title = title;
  li.dataset.completed = completed ? "true" : "false";

  const span = document.createElement("span");
  span.className = "flex-1";
  span.textContent = title;
  if (completed) span.classList.add(...KELAS_SELESAI);

  const aksi = document.createElement("div");
  aksi.className = "flex gap-2 shrink-0";

  if (!completed) {
    const btnSelesai = document.createElement("button");
    btnSelesai.type = "button";
    btnSelesai.textContent = "Tandai selesai";
    btnSelesai.className = "text-xs bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1";
    btnSelesai.addEventListener("click", () => {
      span.classList.add(...KELAS_SELESAI);
      li.dataset.completed = "true";
      btnSelesai.remove();
      perbaruiRingkasan();
    });
    aksi.appendChild(btnSelesai);
  }

  const btnHapus = document.createElement("button");
  btnHapus.type = "button";
  btnHapus.textContent = "Hapus";
  btnHapus.className = "text-xs bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1";
  btnHapus.addEventListener("click", () => {
    li.remove();
    perbaruiRingkasan();
    terapkanPencarian();
  });
  aksi.appendChild(btnHapus);

  li.appendChild(span);
  li.appendChild(aksi);
  return li;
}

function perbaruiRingkasan() {
  const semua = tasksList.querySelectorAll("li");
  const selesai = tasksList.querySelectorAll('li[data-completed="true"]');
  progress.textContent = `${selesai.length} dari ${semua.length} tugas selesai`;
}

//pencarian tugas
function terapkanPencarian() {
  const kataKunci = searchInput.value.toLowerCase();
  const items = tasksList.querySelectorAll("li");
  let adaCocok = false;

  items.forEach((li) => {
    const cocok = li.dataset.title.toLowerCase().includes(kataKunci);
    if (cocok) {
      li.classList.remove("hidden");
      adaCocok = true;
    } else {
      li.classList.add("hidden");
    }
  });

  if (items.length > 0 && !adaCocok) {
    tampilkan(noMatch, "Tidak ada tugas yang cocok.");
  } else {
    sembunyikan(noMatch);
  }
}

searchInput.addEventListener("input", terapkanPencarian);

//tambah tugas
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sudahAda = Array.from(tasksList.querySelectorAll("li")).some(
        (li) => li.dataset.title.toLowerCase() === judul.toLowerCase()
      );
      if (sudahAda) {
        reject(new Error(`Tugas "${judul}" sudah ada di daftar.`));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

function tampilkanNotif(pesan) {
  tampilkan(notif, pesan);
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => sembunyikan(notif), 3000);
}

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  sembunyikan(formError);

  const judul = taskInput.value.trim();
  if (judul.length < 5) {
    tampilkan(formError, "Judul tugas minimal 5 karakter (spasi di awal/akhir tidak dihitung).");
    return;
  }

  taskSubmit.textContent = "Menyimpan...";
  taskSubmit.disabled = true;
  try {
    const tugasBaru = await simpanTugas(judul);
    tasksList.appendChild(buatItemTugas(tugasBaru.title, tugasBaru.completed));
    perbaruiRingkasan();
    terapkanPencarian();
    taskInput.value = "";
    tampilkanNotif("Tugas berhasil ditambahkan.");
  } catch (error) {
    tampilkan(formError, error.message);
  } finally {
    taskSubmit.textContent = "Simpan";
    taskSubmit.disabled = false;
  }
});

muatAnggota();