# Kireka SmartLearn

A modern school website prototype for Kireka SmartLearn with:

- Welcoming landing section with voice introduction
- Interactive 3D scroll homepage
- Admin, parent, and student dashboards
- Student registration and management
- Result reports, notes uploads, announcements, and events
- Parent registration, messaging, and notifications
- Student login with ID and passcode
- Voice guidance for accessibility
- Calendar integration across all panels
- Admin message response system

## How to use

1. Open `index.html` in a browser - you'll see the welcoming landing page first.
2. Click "Enter School Portal" to transition to the main content.
3. Use `admin.html` for admin access.
4. The default admin credentials are:
   - Username: `admin`
   - Password: `kireka123`
5. Parents can register an account on `parent.html`.
6. Students can log in on `student.html`.

## Features

- **Landing Page**: Welcome screen with voice introduction, floating animations, and smooth transition to main content
- **Homepage**: 3D parallax scrolling, voice guide, school calendar
- **Admin Dashboard**: Tabs for students, academics, announcements, calendar, messages
- **Parent Portal**: Register/login, child reports, student registration, messaging, notifications, calendar
- **Student Space**: Login, report cards, class notes, announcements, calendar
- **Accessibility**: Voice help buttons on all dashboards for guidance
- **Data Storage**: Uses browser localStorage for demo purposes

## Notes

- The site uses browser `localStorage` to keep data in the browser.
- Uploaded PDF notes are stored locally in the browser as file data.
- Voice guidance uses browser speech synthesis.
- For a production setup, integrate with a real backend and secure authentication.
