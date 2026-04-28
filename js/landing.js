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

function setupEnterTransition() {
  // No transition needed when showing the homepage directly.
}

function addEntranceAnimation() {
  // No entrance animation when showing the homepage directly.
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
  setupVoiceWelcome();
  addEntranceAnimation();
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
  // No background floating animations for the simplified homepage.
}

function animateShape(shape, index) {
  // No animation when background effects are disabled.
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
