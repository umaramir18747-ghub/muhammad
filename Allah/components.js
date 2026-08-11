// components.js - Islamic Edition

function initHeaderAndSidebar() {
  // Sidebar Toggle
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');

  let sidebarBackdrop = document.getElementById('sidebarBackdrop');
  if (!sidebarBackdrop) {
    sidebarBackdrop = document.createElement('div');
    sidebarBackdrop.id = 'sidebarBackdrop';
    sidebarBackdrop.className = 'sidebar-backdrop';
    document.body.appendChild(sidebarBackdrop);
  }

  function isMobileView() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function setToggleIcon() {
    if (!sidebarToggle) return;
    const icon = sidebarToggle.querySelector('i');
    if (!icon) return;
    icon.className = sidebar.classList.contains('hidden') ? 'fas fa-chevron-left' : 'fas fa-bars';
  }

  function openSidebar() {
    sidebar.classList.remove('hidden');
    if (isMobileView()) sidebarBackdrop.classList.add('active');
    setToggleIcon();
  }

  function closeSidebar() {
    sidebar.classList.add('hidden');
    sidebarBackdrop.classList.remove('active');
    setToggleIcon();
  }

  if (sidebarToggle && sidebar) {
    // Sidebar closed by default on mobile
    if (isMobileView()) {
      sidebar.classList.add('hidden');
    } else {
      sidebar.classList.remove('hidden');
    }
    setToggleIcon();

    sidebarToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (sidebar.classList.contains('hidden')) {
        openSidebar();
      } else {
        closeSidebar();
      }
    });

    sidebarBackdrop.addEventListener('click', closeSidebar);

    // Auto-close sidebar on navigation link clicks (mobile)
    sidebar.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item-side').forEach((link) => {
      link.addEventListener('click', () => {
        if (isMobileView()) {
          setTimeout(closeSidebar, 150);
        }
      });
    });

    window.addEventListener('resize', () => {
      if (!isMobileView()) {
        sidebar.classList.remove('hidden');
        sidebarBackdrop.classList.remove('active');
        setToggleIcon();
      } else {
        sidebar.classList.add('hidden');
        sidebarBackdrop.classList.remove('active');
        setToggleIcon();
      }
    });
  }

  // Fullscreen Toggle
  const fullscreenToggle = document.getElementById('fullscreenToggle');
  if (fullscreenToggle) {
    fullscreenToggle.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.log('Fullscreen request failed:', err);
        });
        fullscreenToggle.querySelector('i').className = 'fas fa-compress';
      } else {
        document.exitFullscreen();
        fullscreenToggle.querySelector('i').className = 'fas fa-expand';
      }
    });

    // Update icon when exiting fullscreen via ESC key
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        fullscreenToggle.querySelector('i').className = 'fas fa-expand';
      }
    });
  }

  // Sidebar Dropdown (Nabi ki Shan)
  const nabiDropdown = document.getElementById('nabiDropdown');
  const nabiToggle = document.getElementById('nabiToggle');

  if (nabiToggle && nabiDropdown) {
    nabiToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      nabiDropdown.classList.toggle('active');
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-nav')) {
      if (nabiDropdown) nabiDropdown.classList.remove('active');
    }
  });
}

// Export for global use
window.initHeaderAndSidebar = initHeaderAndSidebar;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initHeaderAndSidebar);