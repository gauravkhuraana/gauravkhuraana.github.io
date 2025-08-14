import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function addSupportButtons() {
  if (!ExecutionEnvironment.canUseDOM) {
    return;
  }

  // Check if buttons already exist
  if (document.querySelector('.auto-support-buttons')) {
    return;
  }

  // Only add to content pages (docs and blog posts)
  const isDocsPage = window.location.pathname.startsWith('/docs/') && !window.location.pathname.endsWith('/docs/');
  const isBlogPage = window.location.pathname.startsWith('/blog/') && !window.location.pathname.endsWith('/blog/');
  const isMarkdownPage = document.querySelector('.markdown');
  
  if (!isDocsPage && !isBlogPage && !isMarkdownPage) {
    return;
  }

  // Don't add to support page since it already has Ko-fi component
  if (window.location.pathname.includes('/support')) {
    return;
  }

  // Create container for both buttons
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'auto-support-buttons';
  buttonsContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-end;
  `;

  // Create Share button
  const shareButton = createShareButton();
  buttonsContainer.appendChild(shareButton);

  // Create Ko-fi button
  const kofiButton = createKofiButton();
  buttonsContainer.appendChild(kofiButton);

  // Add to page
  document.body.appendChild(buttonsContainer);

  // Add responsive behavior
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  function handleMediaQuery(e) {
    const shareBtn = buttonsContainer.querySelector('.auto-share-button button');
    const kofiBtn = buttonsContainer.querySelector('.auto-kofi-button');
    
    if (e.matches) {
      buttonsContainer.style.bottom = '80px'; // Above mobile navigation
      buttonsContainer.style.right = '15px';
      buttonsContainer.style.gap = '8px';
      
      // Update share button for mobile
      if (shareBtn) {
        shareBtn.style.padding = '8px 12px';
        shareBtn.style.fontSize = '12px';
        shareBtn.innerHTML = `
          <span style="font-size: 1.1em; line-height: 1;">🔗</span>
        `;
      }
      
      // Update Ko-fi button for mobile
      if (kofiBtn) {
        kofiBtn.style.padding = '10px 14px';
        kofiBtn.style.fontSize = '13px';
        kofiBtn.innerHTML = `
          <span style="font-size: 1.1em; line-height: 1;">☕</span>
          <span style="white-space: nowrap;">Support</span>
        `;
      }
    } else {
      buttonsContainer.style.bottom = '20px';
      buttonsContainer.style.right = '20px';
      buttonsContainer.style.gap = '10px';
      
      // Update share button for desktop
      if (shareBtn) {
        shareBtn.style.padding = '10px 14px';
        shareBtn.style.fontSize = '13px';
        shareBtn.innerHTML = `
          <span style="font-size: 1.1em; line-height: 1;">🔗</span>
          <span style="white-space: nowrap;">Share</span>
        `;
      }
      
      // Update Ko-fi button for desktop
      if (kofiBtn) {
        kofiBtn.style.padding = '12px 16px';
        kofiBtn.style.fontSize = '14px';
        kofiBtn.innerHTML = `
          <span style="font-size: 1.2em; line-height: 1;">☕</span>
          <span style="white-space: nowrap;">Buy Me a Coffee</span>
        `;
      }
    }
  }
  
  handleMediaQuery(mediaQuery);
  mediaQuery.addEventListener('change', handleMediaQuery);
}

function createShareButton() {
  const shareButton = document.createElement('div');
  shareButton.className = 'auto-share-button';
  shareButton.style.cssText = `
    position: relative;
    display: inline-block;
  `;

  const button = document.createElement('button');
  button.style.cssText = `
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 14px;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white !important;
    border: none;
    border-radius: 22px;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 3px 10px rgba(76, 175, 80, 0.3);
    font-family: inherit;
    user-select: none;
  `;
  
  button.innerHTML = `
    <span style="font-size: 1.1em; line-height: 1;">🔗</span>
    <span style="white-space: nowrap;">Share</span>
  `;

  button.title = 'Share this page';
  button.setAttribute('aria-label', 'Share this page');

  // Add hover effects
  button.addEventListener('mouseenter', () => {
    button.style.background = 'linear-gradient(135deg, #45a049, #4CAF50)';
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 5px 15px rgba(76, 175, 80, 0.4)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 3px 10px rgba(76, 175, 80, 0.3)';
  });

  // Share functionality
  button.addEventListener('click', () => {
    const shareData = {
      title: document.title,
      url: window.location.href,
      text: document.querySelector('meta[name="description"]')?.getAttribute('content') || 
             'Expert insights on software testing, test automation, DevOps, and AI tools from Gaurav Khurana'
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(error => {
        console.log('Error sharing:', error);
        showShareMenu(shareButton, shareData);
      });
    } else {
      showShareMenu(shareButton, shareData);
    }
  });

  shareButton.appendChild(button);
  return shareButton;
}

function showShareMenu(container, shareData) {
  // Remove existing menu if any
  const existingMenu = container.querySelector('.share-menu');
  if (existingMenu) {
    existingMenu.remove();
    return;
  }

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: '📱',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`)}`,
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
    },
    {
      name: 'X (Twitter)',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.title)}&via=gauravkhuraana`,
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
    },
    {
      name: 'Telegram',
      icon: '✈️',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.title)}`,
    },
  ];

  const menu = document.createElement('div');
  menu.className = 'share-menu';
  menu.style.cssText = `
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: 10px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    z-index: 1001;
    min-width: 180px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
    animation: slideUp 0.2s ease-out;
  `;

  const header = document.createElement('div');
  header.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-weight: 600;
    font-size: 14px;
    font-family: inherit;
  `;
  header.innerHTML = `
    <span>Share this page</span>
    <button style="background: none; border: none; font-size: 16px; cursor: pointer; padding: 4px; border-radius: 4px;" class="close-share">✕</button>
  `;

  const options = document.createElement('div');
  options.style.cssText = `padding: 8px 0;`;

  shareLinks.forEach(platform => {
    const option = document.createElement('a');
    option.href = platform.url;
    option.target = '_blank';
    option.rel = 'noopener noreferrer';
    option.style.cssText = `
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      text-decoration: none;
      color: #333;
      transition: background 0.2s ease;
      font-family: inherit;
      font-size: 14px;
    `;
    option.innerHTML = `
      <span style="font-size: 1.2em; width: 20px; text-align: center;">${platform.icon}</span>
      <span style="font-weight: 500;">${platform.name}</span>
    `;
    
    option.addEventListener('mouseenter', () => {
      option.style.background = 'rgba(0, 0, 0, 0.05)';
    });
    option.addEventListener('mouseleave', () => {
      option.style.background = 'transparent';
    });
    option.addEventListener('click', () => {
      menu.remove();
    });

    options.appendChild(option);
  });

  // Copy link option
  const copyOption = document.createElement('button');
  copyOption.style.cssText = `
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    color: #333;
    transition: background 0.2s ease;
  `;
  copyOption.innerHTML = `
    <span style="font-size: 1.2em; width: 20px; text-align: center;">📋</span>
    <span style="font-weight: 500;">Copy Link</span>
  `;
  
  copyOption.addEventListener('mouseenter', () => {
    copyOption.style.background = 'rgba(0, 0, 0, 0.05)';
  });
  copyOption.addEventListener('mouseleave', () => {
    copyOption.style.background = 'transparent';
  });
  copyOption.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      copyOption.innerHTML = `
        <span style="font-size: 1.2em; width: 20px; text-align: center;">✓</span>
        <span style="font-weight: 500;">Copied!</span>
      `;
      setTimeout(() => {
        menu.remove();
      }, 1000);
    } catch (error) {
      console.log('Error copying to clipboard:', error);
    }
  });

  options.appendChild(copyOption);

  menu.appendChild(header);
  menu.appendChild(options);
  container.appendChild(menu);

  // Close menu when clicking the close button
  header.querySelector('.close-share').addEventListener('click', () => {
    menu.remove();
  });

  // Close menu when clicking outside
  const closeOnOutsideClick = (e) => {
    if (!menu.contains(e.target)) {
      menu.remove();
      document.removeEventListener('click', closeOnOutsideClick);
    }
  };
  
  setTimeout(() => {
    document.addEventListener('click', closeOnOutsideClick);
  }, 100);

  // Add slide up animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}

function createKofiButton() {
  const kofiButton = document.createElement('a');
  kofiButton.className = 'auto-kofi-button';
  kofiButton.href = 'https://ko-fi.com/gauravkhurana';
  kofiButton.target = '_blank';
  kofiButton.rel = 'noopener noreferrer';
  kofiButton.title = 'Support me on Ko-fi';
  kofiButton.setAttribute('aria-label', 'Support me on Ko-fi');
  
  kofiButton.style.cssText = `
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: linear-gradient(135deg, #ff5722, #ff7043);
    color: white !important;
    text-decoration: none !important;
    border-radius: 25px;
    font-weight: 600;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(255, 87, 34, 0.4);
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    font-family: inherit;
    user-select: none;
  `;
  
  kofiButton.innerHTML = `
    <span style="font-size: 1.2em; line-height: 1;">☕</span>
    <span style="white-space: nowrap;">Buy Me a Coffee</span>
  `;

  // Add hover effects
  kofiButton.addEventListener('mouseenter', () => {
    kofiButton.style.transform = 'translateY(-3px)';
    kofiButton.style.boxShadow = '0 6px 16px rgba(255, 87, 34, 0.5)';
    kofiButton.style.background = 'linear-gradient(135deg, #e64a19, #ff5722)';
  });

  kofiButton.addEventListener('mouseleave', () => {
    kofiButton.style.transform = 'translateY(0)';
    kofiButton.style.boxShadow = '0 4px 12px rgba(255, 87, 34, 0.4)';
    kofiButton.style.background = 'linear-gradient(135deg, #ff5722, #ff7043)';
  });

  return kofiButton;
}

// Add when DOM is ready
if (ExecutionEnvironment.canUseDOM) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSupportButtons);
  } else {
    addSupportButtons();
  }
  
  // Also add on route changes (for SPA navigation)
  window.addEventListener('popstate', () => {
    setTimeout(addSupportButtons, 100);
  });
  
  // Watch for navigation changes
  const observer = new MutationObserver(() => {
    setTimeout(addSupportButtons, 100);
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

export default function supportButtonsAutoInjection() {
  // This is a client module, no need to return anything
}
