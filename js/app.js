const adminUser = 'admin';
const adminPassword = 'kireka123';

const STORAGE = {
  students: 'kireka_students',
  notes: 'kireka_notes',
  announcements: 'kireka_announcements',
  events: 'kireka_events',
  messages: 'kireka_messages',
  parents: 'kireka_parents',
};

function readStorage(key) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function createId(prefix) {
  return prefix + '-' + Date.now().toString(36);
}

function showToast(text) {
  console.log(text);
}

function speak(text) {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

function setupVoiceGuide(buttonId, message) {
  const button = document.getElementById(buttonId);
  if (!button) return;
  button.addEventListener('click', () => speak(message));
}

function setupHome() {
  const guideButton = document.getElementById('guideButton');
  if (guideButton) {
    setupVoiceGuide(
      'guideButton',
      'Welcome to Kireka SmartLearn. Students and parents can log in from the top buttons. Admins can manage students, results, and events.'
    );
  }

  setupMobileMenu();
  setupScrollEffects();
  setupHeroSlider();

  window.addEventListener('scroll', () => {
    document.querySelectorAll('[data-speed]').forEach((element) => {
      const speed = Number(element.dataset.speed) || 0.2;
      const offset = window.scrollY * speed;
      element.style.transform = `translateY(${offset}px)`;
    });
  });
}

function buildItem(cardTitle, details) {
  const card = document.createElement('div');
  card.className = 'item-card';
  card.innerHTML = `<strong>${cardTitle}</strong><div>${details}</div>`;
  return card;
}

function setupMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('nav');

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', () => {
    const isActive = nav.classList.contains('active');
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');

    // Animate hamburger menu
    if (!isActive) {
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when clicking on a link
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function setupScrollEffects() {
  const topNav = document.querySelector('.top-nav');

  // Make header always sticky from the start
  if (topNav) {
    topNav.classList.add('sticky', 'scrolled');
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 90; // Account for sticky header height
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Newsletter form handling
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      if (email) {
        showToast('Thank you for subscribing! We\'ll keep you updated with school news.');
        newsletterForm.reset();
      }
    });
  }

  // This file initializes the hero slider separately by calling setupHeroSlider().
}

function setupHeroSlider() {
  const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
  const heroSlider = document.querySelector('.hero-slider');

  if (!slides.length) return;

  const sliderFooter = heroSlider?.querySelector('.slider-footer');
  const currentCounter = sliderFooter?.querySelector('.slider-counter .current');
  const totalCounter = sliderFooter?.querySelector('.slider-counter .total');
  const progressBar = sliderFooter?.querySelector('.progress-bar');
  const sliderNav = heroSlider?.querySelector('.slider-nav');
  let dotContainer = sliderNav?.querySelector('.slider-dots');

  let currentIndex = 0;
  let sliderTimer = null;
  const slideDuration = 5000;

  function updateIndicators() {
    if (currentCounter) currentCounter.textContent = `${currentIndex + 1}`;
    if (totalCounter) totalCounter.textContent = `${slides.length}`;
    if (progressBar) progressBar.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
    if (dotContainer) {
      dotContainer.querySelectorAll('.slider-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, idx) => slide.classList.toggle('active', idx === currentIndex));
    updateIndicators();
  }

  function createDots() {
    if (!sliderNav) return;
    if (!dotContainer) {
      dotContainer = document.createElement('div');
      dotContainer.className = 'slider-dots';
      sliderNav.insertBefore(dotContainer, sliderNav.querySelector('.next'));
    }
    dotContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `slider-dot${idx === 0 ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        stopSlider();
        showSlide(idx);
        startSlider();
      });
      dotContainer.appendChild(dot);
    });
  }

  function startSlider() {
    stopSlider();
    showSlide(currentIndex);
    sliderTimer = setInterval(() => showSlide(currentIndex + 1), slideDuration);
  }

  function stopSlider() {
    if (sliderTimer) {
      clearInterval(sliderTimer);
      sliderTimer = null;
    }
  }

  if (sliderNav) {
    const prevButton = sliderNav.querySelector('.slider-arrow.prev');
    const nextButton = sliderNav.querySelector('.slider-arrow.next');

    prevButton?.addEventListener('click', () => {
      stopSlider();
      showSlide(currentIndex - 1);
      startSlider();
    });

    nextButton?.addEventListener('click', () => {
      stopSlider();
      showSlide(currentIndex + 1);
      startSlider();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, select, button')) return;
    if (e.key === 'ArrowLeft') {
      stopSlider();
      showSlide(currentIndex - 1);
      startSlider();
    } else if (e.key === 'ArrowRight') {
      stopSlider();
      showSlide(currentIndex + 1);
      startSlider();
    }
  });

  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', stopSlider);
    heroSlider.addEventListener('mouseleave', startSlider);
  }

  createDots();
  startSlider();
}

function updateAdminTabs() {
  document.querySelectorAll('.tab-button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach((item) => item.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach((box) => box.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(`${button.dataset.tab}Tab`).classList.add('active');
    });
  });
}

function renderStudentList() {
  const students = readStorage(STORAGE.students);
  const wrapper = document.getElementById('studentList');
  if (!wrapper) return;
  wrapper.innerHTML = '';
  if (!students.length) {
    wrapper.appendChild(buildItem('No students yet', 'Add a student to see them here.'));
    return;
  }
  students.forEach((student) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <strong>${student.name} • ${student.classYear}</strong>
      <div>ID: ${student.id}</div>
      <div>Passcode: ${student.passcode}</div>
      <div>${student.report ? student.report.summary : 'No report uploaded yet.'}</div>
      <button class="secondary small remove-student" data-id="${student.id}">Remove</button>
    `;
    wrapper.appendChild(card);
  });
  wrapper.querySelectorAll('.remove-student').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      writeStorage(STORAGE.students, students.filter((student) => student.id !== id));
      renderStudentList();
    });
  });
}

function renderNotes() {
  const notes = readStorage(STORAGE.notes);
  const wrapper = document.getElementById('noteList');
  if (!wrapper) return;
  wrapper.innerHTML = '';
  if (!notes.length) {
    wrapper.appendChild(buildItem('No notes yet', 'Upload class notes for students.'));
    return;
  }
  notes.forEach((note) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    const fileLink = note.fileData ? `<a href="${note.fileData}" download="${note.fileName}">Download PDF</a>` : 'File saved.';
    card.innerHTML = `
      <strong>${note.title}</strong>
      <div>${note.classYear} • ${note.subject}</div>
      <div>${fileLink}</div>
    `;
    wrapper.appendChild(card);
  });
}

function renderAnnouncements() {
  const announcements = readStorage(STORAGE.announcements);
  const wrapper = document.getElementById('announcementList');
  if (!wrapper) return;
  wrapper.innerHTML = '';
  if (!announcements.length) {
    wrapper.appendChild(buildItem('No announcements yet', 'Post a school announcement to share updates.'));
    return;
  }
  announcements.slice().reverse().forEach((item) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <strong>${item.title}</strong>
      <div>${item.date}</div>
      <div>${item.content}</div>
    `;
    wrapper.appendChild(card);
  });
}

function renderEvents() {
  const events = readStorage(STORAGE.events);
  const wrapper = document.getElementById('eventList');
  if (!wrapper) return;
  wrapper.innerHTML = '';
  if (!events.length) {
    wrapper.appendChild(buildItem('No events yet', 'Add terms, exams, and school events.'));
    return;
  }
  events.slice().reverse().forEach((event) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <strong>${event.title}</strong>
      <div>${event.date}</div>
      <div>${event.description}</div>
    `;
    wrapper.appendChild(card);
  });
}

function renderHomeCalendar() {
  const list = document.getElementById('homeCalendar');
  if (!list) return;
  const events = readStorage(STORAGE.events);
  if (!events.length) return;
  list.innerHTML = '';
  events.slice().reverse().forEach((event) => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${event.title}</strong> — ${event.date}`;
    list.appendChild(item);
  });
}

function renderParentMessages(parent) {
  const wrapper = document.getElementById('parentMessageList');
  if (!wrapper) return;
  const messages = readStorage(STORAGE.messages).filter((message) => message.fromEmail === parent.email);
  wrapper.innerHTML = '';
  if (!messages.length) {
    wrapper.appendChild(buildItem('No messages yet', 'Your sent messages appear here.'));
    return;
  }
  messages.slice().reverse().forEach((message) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <strong>${message.date}</strong>
      <div>${message.text}</div>
      <div><strong>Admin answer:</strong> ${message.response || 'Waiting for response.'}</div>
    `;
    wrapper.appendChild(card);
  });
}

function renderParentCalendar() {
  const wrapper = document.getElementById('parentCalendar');
  if (!wrapper) return;
  const events = readStorage(STORAGE.events);
  wrapper.innerHTML = '';
  if (!events.length) {
    wrapper.appendChild(buildItem('No school events', 'Calendar events will show here.'));
    return;
  }
  events.slice().reverse().forEach((event) => {
    wrapper.appendChild(buildItem(event.title, `${event.date} — ${event.description}`));
  });
}

function renderStudentCalendar() {
  const wrapper = document.getElementById('studentCalendar');
  if (!wrapper) return;
  const events = readStorage(STORAGE.events);
  wrapper.innerHTML = '';
  if (!events.length) {
    wrapper.appendChild(buildItem('No calendar events', 'Watch for upcoming school events here.'));
    return;
  }
  events.slice().reverse().forEach((event) => {
    wrapper.appendChild(buildItem(event.title, `${event.date} — ${event.description}`));
  });
}

function respondToMessage(messageId, response) {
  const messages = readStorage(STORAGE.messages);
  const message = messages.find((item) => item.id === messageId);
  if (!message) return;
  message.response = response;
  writeStorage(STORAGE.messages, messages);
}

function renderMessages() {
  const messages = readStorage(STORAGE.messages);
  const wrapper = document.getElementById('messageList');
  if (!wrapper) return;
  wrapper.innerHTML = '';
  if (!messages.length) {
    wrapper.appendChild(buildItem('No messages yet', 'Parents can send messages here.'));
    return;
  }
  messages.slice().reverse().forEach((message) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <strong>${message.fromName} (${message.fromEmail})</strong>
      <div>${message.date}</div>
      <div>${message.text}</div>
      <div><strong>Admin response:</strong> ${message.response || 'No response yet.'}</div>
      ${message.response ? '' : `<textarea class="response-text" data-id="${message.id}" rows="2" placeholder="Type a reply"></textarea><button class="secondary small respond-message" data-id="${message.id}">Reply</button>`}
    `;
    wrapper.appendChild(card);
  });

  wrapper.querySelectorAll('.respond-message').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const textarea = wrapper.querySelector(`textarea[data-id="${id}"]`);
      if (!textarea) return;
      const response = textarea.value.trim();
      if (!response) {
        alert('Please write a response.');
        return;
      }
      respondToMessage(id, response);
      renderMessages();
    });
  });
}

function renderParentPanel(parent) {
  const reportArea = document.getElementById('parentReport');
  const commentsArea = document.getElementById('parentComments');
  const notificationsArea = document.getElementById('parentNotifications');
  const studentsArea = document.getElementById('parentStudents');
  if (!reportArea || !commentsArea || !notificationsArea || !studentsArea) return;

  const students = readStorage(STORAGE.students).filter((student) => parent.children.includes(student.id));
  reportArea.innerHTML = '';
  commentsArea.innerHTML = '';
  studentsArea.innerHTML = '';
  notificationsArea.innerHTML = '';

  if (!students.length) {
    reportArea.appendChild(buildItem('No registered students', 'Register a child to see results.'));
    commentsArea.appendChild(buildItem('No comments yet', 'Teacher feedback appears here.'));
  } else {
    students.forEach((student) => {
      reportArea.appendChild(buildItem(student.name, student.report ? student.report.summary : 'No result uploaded yet.'));
      commentsArea.appendChild(buildItem(student.name, student.report ? student.report.comments : 'No comments uploaded yet.'));
      studentsArea.appendChild(buildItem(student.name, `${student.classYear} • ${student.id}`));
    });
  }

  const announcements = readStorage(STORAGE.announcements);
  const events = readStorage(STORAGE.events);
  if (!announcements.length && !events.length) {
    notificationsArea.appendChild(buildItem('No updates', 'School announcements and events show here.'));
  } else {
    announcements.slice().reverse().forEach((item) => {
      notificationsArea.appendChild(buildItem(item.title, item.date + ' — ' + item.content));
    });
    events.slice().reverse().forEach((event) => {
      notificationsArea.appendChild(buildItem(event.title, event.date + ' — ' + event.description));
    });
  }

  renderParentMessages(parent);
  renderParentCalendar();
}

function renderStudentPanel(student) {
  const reportArea = document.getElementById('studentReport');
  const notesArea = document.getElementById('studentNotes');
  const announcementsArea = document.getElementById('studentAnnouncements');
  if (!reportArea || !notesArea || !announcementsArea) return;

  reportArea.innerHTML = '';
  notesArea.innerHTML = '';
  announcementsArea.innerHTML = '';

  reportArea.appendChild(buildItem(student.name, student.report ? student.report.summary : 'Report will appear here when admin uploads it.'));
  reportArea.appendChild(buildItem('Teacher', student.report ? student.report.comments : 'Teacher comments will appear here.'));

  const notes = readStorage(STORAGE.notes).filter((note) => note.classYear === student.classYear);
  if (!notes.length) {
    notesArea.appendChild(buildItem('No notes yet', 'Your class notes appear here after upload.'));
  } else {
    notes.forEach((note) => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `<strong>${note.title}</strong><div>${note.subject} • ${note.classYear}</div><div><a href="${note.fileData}" download="${note.fileName}">Download PDF</a></div>`;
      notesArea.appendChild(card);
    });
  }

  const announcements = readStorage(STORAGE.announcements);
  if (!announcements.length) {
    announcementsArea.appendChild(buildItem('No announcements', 'School news and updates appear here.'));
  } else {
    announcements.slice().reverse().forEach((item) => {
      announcementsArea.appendChild(buildItem(item.title, item.date + ' — ' + item.content));
    });
  }

  renderStudentCalendar();
}

function renderReportList() {
  const students = readStorage(STORAGE.students);
  const wrapper = document.getElementById('reportList');
  if (!wrapper) return;
  wrapper.innerHTML = '';

  const studentsWithReports = students.filter(student => student.report);

  if (!studentsWithReports.length) {
    wrapper.appendChild(buildItem('No reports yet', 'Upload or create reports for students.'));
    return;
  }

  studentsWithReports.forEach((student) => {
    const report = student.report;
    const reportType = report.type === 'table' ? 'Table Report' : 'Uploaded File';
    const details = [
      `ID: ${student.id}`,
      `Class: ${student.classYear}`,
      `Type: ${reportType}`,
    ];

    if (report.type === 'table') {
      details.push(`Term: ${report.term}`);
      details.push(`Subjects: ${report.subjects.length}`);
    }
    if (report.fileName) {
      details.push(`File: ${report.fileName}`);
    }

    const summaryHtml = report.summary ? report.summary.replace(/\n/g, '<br />') : 'No summary available.';
    const subjectsHtml = report.type === 'table' && Array.isArray(report.subjects)
      ? `<div class="report-subjects">
          <h4>Subjects</h4>
          <div class="report-subject-grid">
            ${report.subjects.map((subject) => `
              <div class="report-subject-card">
                <strong>${subject.subject}</strong>
                <span>${subject.score}% • ${subject.grade}</span>
                ${subject.comment ? `<p>${subject.comment}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>`
      : '';

    const card = document.createElement('div');
    card.className = 'item-card report-card';
    card.innerHTML = `
      <div class="report-card-header">
        <div>
          <strong>${student.name}</strong>
          <div class="report-card-subtitle">${reportType} · ${student.classYear}</div>
        </div>
        <span class="report-badge">${reportType}</span>
      </div>
      <div class="report-meta-pill-group">
        ${details.map((detail) => `<span class="report-meta-pill">${detail}</span>`).join('')}
      </div>
      <div class="report-summary">${summaryHtml}</div>
      ${subjectsHtml}
      ${report.fileData ? `<a class="report-download" href="${report.fileData}" download="${report.fileName || 'report'}">Download report file</a>` : ''}
    `;
    wrapper.appendChild(card);
  });
}

function resetTableSubjects() {
  const tableContainer = document.querySelector('.grades-table');
  if (!tableContainer) return;
  
  // Remove all subject rows except header
  const existingRows = tableContainer.querySelectorAll('.table-row:not(.header)');
  existingRows.forEach(row => row.remove());
  
  // Add default 5 subject rows
  for (let i = 1; i <= 5; i++) {
    addSubjectRow();
  }
}

function addSubjectRow() {
  const tableContainer = document.querySelector('.grades-table');
  if (!tableContainer) return;
  
  const row = document.createElement('div');
  row.className = 'table-row';
  row.innerHTML = `
    <input type="text" placeholder="Subject name" />
    <input type="number" min="0" max="100" placeholder="85" />
    <input type="text" placeholder="A" />
    <input type="text" placeholder="Comments" />
  `;
  tableContainer.appendChild(row);
}

function setupReportOptions() {
  const uploadBtn = document.getElementById('uploadReportBtn');
  const createBtn = document.getElementById('createReportBtn');
  const uploadSection = document.getElementById('uploadReportSection');
  const createSection = document.getElementById('createReportSection');
  
  if (!uploadBtn || !createBtn || !uploadSection || !createSection) return;
  
  uploadBtn.addEventListener('click', () => {
    uploadBtn.classList.add('active');
    createBtn.classList.remove('active');
    uploadSection.classList.remove('hidden');
    createSection.classList.add('hidden');
  });
  
  createBtn.addEventListener('click', () => {
    createBtn.classList.add('active');
    uploadBtn.classList.remove('active');
    createSection.classList.remove('hidden');
    uploadSection.classList.add('hidden');
  });
  
  // Add subject button
  const addSubjectBtn = document.getElementById('addSubjectBtn');
  if (addSubjectBtn) {
    addSubjectBtn.addEventListener('click', addSubjectRow);
  }
}

function adminPage() {
  const loginForm = document.getElementById('adminLoginForm');
  const loginCard = document.getElementById('adminLogin');
  const adminPanel = document.getElementById('adminPanel');
  const logoutBtn = document.getElementById('adminLogout');

  if (!loginForm || !loginCard || !adminPanel || !logoutBtn) return;

  renderNotes();
  renderAnnouncements();
  renderEvents();
  renderMessages();
  updateAdminTabs();
  setupReportOptions();

  setupVoiceGuide(
    'adminHelp',
    'Admin dashboard. Use tabs to manage students, upload reports and notes, post announcements, add calendar events, and reply to parent messages.'
  );

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = document.getElementById('adminUser').value.trim();
    const pass = document.getElementById('adminPass').value;
    if (user === adminUser && pass === adminPassword) {
      loginCard.classList.add('hidden');
      adminPanel.classList.remove('hidden');
    } else {
      alert('Wrong admin credentials.');
    }
  });

  logoutBtn.addEventListener('click', () => {
    adminPanel.classList.add('hidden');
    loginCard.classList.remove('hidden');
    loginForm.reset();
  });

  document.getElementById('studentForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const studentName = document.getElementById('studentName').value.trim();
    const studentClass = document.getElementById('studentClass').value;
    const studentId = document.getElementById('studentId').value.trim();
    const studentPass = document.getElementById('studentPass').value.trim();
    if (!studentName || !studentId || !studentPass) return;
    const students = readStorage(STORAGE.students);
    if (students.some((item) => item.id === studentId)) {
      alert('Student ID already exists.');
      return;
    }
    students.push({ id: studentId, passcode: studentPass, name: studentName, classYear: studentClass, report: null });
    writeStorage(STORAGE.students, students);
    renderStudentList();
    event.target.reset();
  });

  document.getElementById('reportForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const studentId = document.getElementById('reportStudentId').value.trim();
    const text = document.getElementById('reportText').value.trim();
    const fileInput = document.getElementById('reportFile');
    
    const students = readStorage(STORAGE.students);
    const student = students.find((item) => item.id === studentId);
    if (!student) {
      alert('Student ID not found.');
      return;
    }

    let reportData = { summary: text, comments: 'Teacher comments are included above.', type: 'upload' };

    if (fileInput.files.length) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        reportData.fileData = reader.result;
        reportData.fileName = file.name;
        reportData.fileType = file.type;
        student.report = reportData;
        writeStorage(STORAGE.students, students);
        renderStudentList();
        renderReportList();
        event.target.reset();
      };
      reader.readAsDataURL(file);
    } else {
      student.report = reportData;
      writeStorage(STORAGE.students, students);
      renderStudentList();
      renderReportList();
      event.target.reset();
    }
  });

  document.getElementById('tableReportForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const studentId = document.getElementById('tableReportStudentId').value.trim();
    const term = document.getElementById('reportTerm').value;
    const overallComments = document.getElementById('overallComments').value.trim();
    
    const students = readStorage(STORAGE.students);
    const student = students.find((item) => item.id === studentId);
    if (!student) {
      alert('Student ID not found.');
      return;
    }

    const subjects = [];
    const subjectRows = document.querySelectorAll('.grades-table .table-row:not(.header)');
    
    subjectRows.forEach((row) => {
      const inputs = row.querySelectorAll('input');
      if (inputs.length >= 4) {
        const subject = inputs[0].value.trim();
        const score = inputs[1].value.trim();
        const grade = inputs[2].value.trim();
        const comment = inputs[3].value.trim();
        
        if (subject && score && grade) {
          subjects.push({ subject, score: parseFloat(score), grade, comment });
        }
      }
    });

    if (subjects.length === 0) {
      alert('Please add at least one subject with grades.');
      return;
    }

    const reportData = {
      type: 'table',
      term: term,
      subjects: subjects,
      overallComments: overallComments,
      summary: `Term: ${term}\n${subjects.map(s => `${s.subject}: ${s.score}% (${s.grade})`).join('\n')}`,
      comments: overallComments
    };

    student.report = reportData;
    writeStorage(STORAGE.students, students);
    renderStudentList();
    renderReportList();
    event.target.reset();
    
    // Reset table to default 5 subjects
    resetTableSubjects();
  });

  document.getElementById('notesForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('noteTitle').value.trim();
    const subject = document.getElementById('noteSubject').value.trim();
    const classYear = document.getElementById('noteClass').value;
    const fileInput = document.getElementById('noteFile');
    if (!fileInput.files.length || !title || !subject) return;
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const notes = readStorage(STORAGE.notes);
      notes.push({ id: createId('NOTE'), title, subject, classYear, fileName: file.name, fileData: reader.result });
      writeStorage(STORAGE.notes, notes);
      renderNotes();
      event.target.reset();
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('announceForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('announceTitle').value.trim();
    const content = document.getElementById('announceText').value.trim();
    if (!title || !content) return;
    const announcements = readStorage(STORAGE.announcements);
    announcements.push({ id: createId('ANN'), title, content, date: new Date().toLocaleDateString() });
    writeStorage(STORAGE.announcements, announcements);
    renderAnnouncements();
    renderHomeCalendar();
    event.target.reset();
  });

  document.getElementById('eventForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('eventTitle').value.trim();
    const date = document.getElementById('eventDate').value;
    const description = document.getElementById('eventText').value.trim();
    if (!title || !date || !description) return;
    const events = readStorage(STORAGE.events);
    events.push({ id: createId('EVT'), title, date, description });
    writeStorage(STORAGE.events, events);
    renderEvents();
    renderHomeCalendar();
    event.target.reset();
  });
}

function parentPage() {
  const registerBtn = document.getElementById('showParentRegister');
  const loginBtn = document.getElementById('showParentLogin');
  const registerForm = document.getElementById('parentRegisterForm');
  const loginForm = document.getElementById('parentLoginForm');
  const parentAccess = document.getElementById('parentAccess');
  const parentPanel = document.getElementById('parentPanel');
  const logoutBtn = document.getElementById('parentLogout');

  if (!parentAccess) return;
  setupHome();

  setupVoiceGuide(
    'parentHelp',
    'Parent dashboard. View your child’s reports, register new students, send messages to admin, and see school announcements and calendar events.'
  );

  function showRegister() {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    registerBtn.classList.add('active');
    loginBtn.classList.remove('active');
  }

  function showLogin() {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginBtn.classList.add('active');
    registerBtn.classList.remove('active');
  }

  registerBtn.addEventListener('click', showRegister);
  loginBtn.addEventListener('click', showLogin);

  const parentKey = 'kireka_parent_active';
  const activeParentEmail = localStorage.getItem(parentKey);

  if (activeParentEmail) {
    const parent = readStorage(STORAGE.parents).find((item) => item.email === activeParentEmail);
    if (parent) {
      parentAccess.classList.add('hidden');
      parentPanel.classList.remove('hidden');
      renderParentPanel(parent);
    }
  }

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('parentName').value.trim();
    const email = document.getElementById('parentEmail').value.trim().toLowerCase();
    const password = document.getElementById('parentPass').value;
    const parents = readStorage(STORAGE.parents);
    if (parents.some((item) => item.email === email)) {
      alert('Account already exists.');
      return;
    }
    const newParent = { id: createId('PARENT'), name, email, password, children: [] };
    parents.push(newParent);
    writeStorage(STORAGE.parents, parents);
    localStorage.setItem(parentKey, email);
    parentAccess.classList.add('hidden');
    parentPanel.classList.remove('hidden');
    renderParentPanel(newParent);
    registerForm.reset();
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('parentLoginEmail').value.trim().toLowerCase();
    const password = document.getElementById('parentLoginPass').value;
    const parents = readStorage(STORAGE.parents);
    const parent = parents.find((item) => item.email === email && item.password === password);
    if (!parent) {
      alert('Login failed.');
      return;
    }
    localStorage.setItem(parentKey, email);
    parentAccess.classList.add('hidden');
    parentPanel.classList.remove('hidden');
    renderParentPanel(parent);
    loginForm.reset();
  });

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem(parentKey);
    parentPanel.classList.add('hidden');
    parentAccess.classList.remove('hidden');
  });

  document.getElementById('parentAddStudentForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('parentStudentName').value.trim();
    const classYear = document.getElementById('parentStudentClass').value;
    const parents = readStorage(STORAGE.parents);
    const activeParentEmail = localStorage.getItem(parentKey);
    const parent = parents.find((item) => item.email === activeParentEmail);
    if (!parent) return;
    const studentId = createId('KSL');
    const studentPass = Math.floor(1000 + Math.random() * 9000).toString();
    const students = readStorage(STORAGE.students);
    students.push({ id: studentId, passcode: studentPass, name, classYear, report: null });
    writeStorage(STORAGE.students, students);
    parent.children.push(studentId);
    writeStorage(STORAGE.parents, parents);
    renderParentPanel(parent);
    event.target.reset();
    alert(`Student registered. Use ID ${studentId} and passcode ${studentPass}.`);
  });

  document.getElementById('parentMessageForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = document.getElementById('parentMessageText').value.trim();
    const parents = readStorage(STORAGE.parents);
    const activeParentEmail2 = localStorage.getItem(parentKey);
    const parent = parents.find((item) => item.email === activeParentEmail2);
    if (!parent || !text) return;
    const messages = readStorage(STORAGE.messages);
    messages.push({ id: createId('MSG'), fromEmail: parent.email, fromName: parent.name, text, date: new Date().toLocaleDateString(), response: '' });
    writeStorage(STORAGE.messages, messages);
    renderParentPanel(parent);
    event.target.reset();
    alert('Message sent to administration.');
  });
}

function studentPage() {
  const studentAccess = document.getElementById('studentAccess');
  const studentPanel = document.getElementById('studentPanel');
  const loginForm = document.getElementById('studentLoginForm');
  const logoutBtn = document.getElementById('studentLogout');

  if (!studentAccess) return;
  setupHome();

  setupVoiceGuide(
    'studentHelp',
    'Student dashboard. View your report card, download class notes, and see school announcements and calendar events.'
  );

  const studentKey = 'kireka_student_active';
  const activeStudentId = localStorage.getItem(studentKey);
  if (activeStudentId) {
    const student = readStorage(STORAGE.students).find((item) => item.id === activeStudentId);
    if (student) {
      studentAccess.classList.add('hidden');
      studentPanel.classList.remove('hidden');
      renderStudentPanel(student);
    }
  }

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.getElementById('studentLoginId').value.trim();
    const pass = document.getElementById('studentLoginPass').value.trim();
    const student = readStorage(STORAGE.students).find((item) => item.id === id && item.passcode === pass);
    if (!student) {
      alert('Login failed. Please check your ID and passcode.');
      return;
    }
    localStorage.setItem(studentKey, id);
    studentAccess.classList.add('hidden');
    studentPanel.classList.remove('hidden');
    renderStudentPanel(student);
    loginForm.reset();
  });

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem(studentKey);
    studentPanel.classList.add('hidden');
    studentAccess.classList.remove('hidden');
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setupHome();
  renderHomeCalendar();
  adminPage();
  parentPage();
  studentPage();
});
