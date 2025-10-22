// ===== Shared Functions =====
function logout() {
  window.location.href = "index.html";
}

function getStudents() {
  return JSON.parse(localStorage.getItem('students')) || [];
}

function saveStudents(students) {
  localStorage.setItem('students', JSON.stringify(students));
}

// ===== Teacher Functions =====
function showSection(id) {
  document.querySelectorAll(".teacher-section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  if (id === "viewStudents") renderStudentTable();
  if (id === "markAttendance") renderMarkTable();
}

function closeSection(id) {
  document.getElementById(id).classList.add("hidden");
}

function addStudent() {
  const name = document.getElementById("studentName").value;
  const gender = document.getElementById("studentGender").value;
  if (!name || !gender) {
    alert("Please enter valid details!");
    return;
  }

  const students = getStudents();
  const id = students.length ? Math.max(...students.map(s=>s.id))+1 : 1;
  students.push({ id, name, gender, attended: 0, total: 0 });
  saveStudents(students);
  alert("Student added!");
  renderStudentTable();
  document.getElementById("studentName").value = "";
  document.getElementById("studentGender").value = "";
}

function removeStudent() {
  const id = parseInt(document.getElementById("removeId").value);
  let students = getStudents();
  students = students.filter(s => s.id !== id);
  saveStudents(students);
  alert("Student removed!");
  renderStudentTable();
  document.getElementById("removeId").value = "";
}

function renderStudentTable() {
  const students = getStudents();
  const t = document.getElementById("studentTable");
  t.innerHTML = `<tr><th>ID</th><th>Name</th><th>Gender</th><th>Attended</th><th>Total</th><th>%</th></tr>`;
  students.forEach(s => {
    const percent = s.total ? ((s.attended / s.total) * 100).toFixed(1) : 0;
    t.innerHTML += `<tr><td>${s.id}</td><td>${s.name}</td><td>${s.gender}</td><td>${s.attended}</td><td>${s.total}</td><td>${percent}%</td></tr>`;
  });
}

function renderMarkTable() {
  const students = getStudents();
  const t = document.getElementById("markTable");
  t.innerHTML = `<tr><th>ID</th><th>Name</th><th>Present</th></tr>`;
  students.forEach(s => {
    t.innerHTML += `<tr><td>${s.id}</td><td>${s.name}</td><td><input type="checkbox" data-id="${s.id}"></td></tr>`;
  });
}

function saveAttendance() {
  const students = getStudents();
  document.querySelectorAll("#markTable input[type='checkbox']").forEach(cb => {
    const student = students.find(s => s.id == cb.dataset.id);
    student.total++;
    if (cb.checked) student.attended++;
  });
  saveStudents(students);
  alert("Attendance saved!");
  renderStudentTable();
}

// ===== Student Page Functions =====
function toggleView() {
  const sec = document.getElementById("studentList");
  sec.classList.toggle("hidden");
  if (!sec.classList.contains("hidden")) renderStudentList();
}

function renderStudentList() {
  const students = getStudents();
  const table = document.getElementById("studentTable");
  table.innerHTML = `<tr><th>ID</th><th>Name</th><th>Gender</th><th>Attendance %</th></tr>`;
  students.forEach(s => {
    const percent = s.total ? ((s.attended / s.total) * 100).toFixed(1) : 0;
    table.innerHTML += `<tr><td>${s.id}</td><td>${s.name}</td><td>${s.gender}</td><td>${percent}%</td></tr>`;
  });
}
