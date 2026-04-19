// Landing page functionality for Kireka SmartLearn

function speak(text) {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function setupVoiceWelcome() {
  const voiceButton = document.getElementById('voiceWelcome');
  if (!voiceButton) return;

  voiceButton.addEventListener('click', () => {
    const welcomeText = `
      Welcome to Kireka SmartLearn Secondary School.
      We are happy to have you here.
      This is a friendly place for parents, students, and teachers.
      Click the Enter School Portal button to continue.
      You can access parent tools, student information, or admin features.
    `;
    speak(welcomeText);
  });
}

function addEntranceAnimation() {
  const welcomeSection = document.querySelector('.welcome-section');
  const features = document.querySelectorAll('.feature');
  const actionButtons = document.querySelector('.action-buttons');
  const quickInfo = document.querySelector('.quick-info');

  if (!welcomeSection) return;

  // Add initial hidden state
  welcomeSection.style.opacity = '0';
  welcomeSection.style.transform = 'translateY(30px)';

  // Hide features initially
  features.forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(20px)';
  });

  // Hide action buttons and quick info
  if (actionButtons) {
    actionButtons.style.opacity = '0';
    actionButtons.style.transform = 'translateY(20px)';
  }

  if (quickInfo) {
    quickInfo.style.opacity = '0';
    quickInfo.style.transform = 'translateY(20px)';
  }

  // Animate welcome section in
  setTimeout(() => {
    welcomeSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    welcomeSection.style.opacity = '1';
    welcomeSection.style.transform = 'translateY(0)';
  }, 300);

  // Animate features with stagger
  features.forEach((feature, index) => {
    setTimeout(() => {
      feature.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      feature.style.opacity = '1';
      feature.style.transform = 'translateY(0)';
    }, 800 + (index * 150));
  });

  // Animate action buttons
  if (actionButtons) {
    setTimeout(() => {
      actionButtons.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      actionButtons.style.opacity = '1';
      actionButtons.style.transform = 'translateY(0)';
    }, 1400);
  }

  // Animate quick info
  if (quickInfo) {
    setTimeout(() => {
      quickInfo.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      quickInfo.style.opacity = '1';
      quickInfo.style.transform = 'translateY(0)';
    }, 1600);
  }
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
  setupVoiceWelcome();
  addEntranceAnimation();
  setupEnterTransition();
  setupFeatureInteractions();
  setupBackgroundAnimations();

  // Add click effect to enter button
  const enterButton = document.querySelector('.enter-button');
  if (enterButton) {
    enterButton.addEventListener('click', (e) => {
      e.preventDefault();
      // Quick feedback animation
      enterButton.style.transform = 'scale(0.95)';
      setTimeout(() => {
        enterButton.style.transform = 'scale(1)';
      }, 150);

      // Trigger transition after a brief delay
      setTimeout(() => {
        enterSchoolPortal();
      }, 200);
    });
  }
});

function setupFeatureInteractions() {
  const features = document.querySelectorAll('.feature');

  features.forEach(feature => {
    feature.addEventListener('click', () => {
      const featureType = feature.dataset.feature;
      let message = '';

      switch (featureType) {
        case 'parent':
          message = 'Parent Portal: Access your child\'s academic progress, attendance records, and school announcements. Register or login to get started.';
          break;
        case 'student':
          message = 'Student Access: View your report cards, class notes, and school announcements. Use your student ID to login.';
          break;
        case 'admin':
          message = 'Admin Tools: Manage student records, upload academic results, and share important announcements with the school community.';
          break;
      }

      if (message) {
        speak(message);
      }

      // Add click feedback animation
      feature.style.transform = 'scale(0.95)';
      setTimeout(() => {
        feature.style.transform = 'scale(1.02)';
      }, 150);
    });
  });
}

function setupBackgroundAnimations() {
  const shapes = document.querySelectorAll('.floating-shape');

  shapes.forEach((shape, index) => {
    // Random initial positions
    shape.style.left = Math.random() * 100 + '%';
    shape.style.top = Math.random() * 100 + '%';

    // Animate shapes
    animateShape(shape, index);
  });
}

function animateShape(shape, index) {
  const duration = 15000 + (index * 2000); // Different durations for each shape
  const delay = index * 1000;

  setTimeout(() => {
    shape.style.transition = `all ${duration}ms linear`;
    shape.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg)`;

    // Reset animation after completion
    setTimeout(() => {
      animateShape(shape, index);
    }, duration);
  }, delay);
}

function enterSchoolPortal() {
  const landingContainer = document.querySelector('.landing-container');
  const mainContent = document.querySelector('.main-content');

  if (!landingContainer || !mainContent) return;

  // Add transition classes
  landingContainer.style.transition = 'all 0.8s ease-out';
  mainContent.style.transition = 'all 0.8s ease-in';

  // Hide landing page
  landingContainer.style.opacity = '0';
  landingContainer.style.transform = 'translateY(-50px)';

  // Show main content
  mainContent.style.display = 'block';
  mainContent.style.opacity = '0';
  mainContent.style.transform = 'translateY(50px)';

  // Trigger the show animation after a brief delay
  setTimeout(() => {
    mainContent.style.opacity = '1';
    mainContent.style.transform = 'translateY(0)';
  }, 100);

  // Remove landing container after transition
  setTimeout(() => {
    landingContainer.style.display = 'none';
  }, 800);
}
