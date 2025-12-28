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
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
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
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
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
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
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

  // SVG icons for share menu
  const whatsappSvg = '<svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  const linkedinSvg = '<svg viewBox="0 0 24 24" width="20" height="20" fill="#0077B5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';
  const twitterSvg = '<svg viewBox="0 0 24 24" width="20" height="20" fill="#000000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>';
  const facebookSvg = '<svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';
  const telegramSvg = '<svg viewBox="0 0 24 24" width="20" height="20" fill="#26A5E4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>';
  const copySvg = '<svg viewBox="0 0 24 24" width="20" height="20" fill="#666"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';
  const checkSvg = '<svg viewBox="0 0 24 24" width="20" height="20" fill="#4CAF50"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: whatsappSvg,
      url: `https://wa.me/?text=${encodeURIComponent(`${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`)}`,
    },
    {
      name: 'LinkedIn',
      icon: linkedinSvg,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
    },
    {
      name: 'X (Twitter)',
      icon: twitterSvg,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.title)}&via=gauravkhuraana`,
    },
    {
      name: 'Facebook',
      icon: facebookSvg,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
    },
    {
      name: 'Telegram',
      icon: telegramSvg,
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
      <span style="display: flex; align-items: center; justify-content: center; width: 20px;">${platform.icon}</span>
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
    <span style="display: flex; align-items: center; justify-content: center; width: 20px;">${copySvg}</span>
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
        <span style="display: flex; align-items: center; justify-content: center; width: 20px;">${checkSvg}</span>
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

// Track if buttons have been added for current route
let currentPath = '';

function handleRouteChange() {
  // Only re-add buttons if the path actually changed
  const newPath = window.location.pathname;
  if (newPath !== currentPath) {
    currentPath = newPath;
    // Remove existing buttons before adding new ones
    const existingButtons = document.querySelector('.auto-support-buttons');
    if (existingButtons) {
      existingButtons.remove();
    }
    // Small delay to ensure DOM is ready after navigation
    requestAnimationFrame(() => {
      addSupportButtons();
    });
  }
}

// Add when DOM is ready
if (ExecutionEnvironment.canUseDOM) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      currentPath = window.location.pathname;
      addSupportButtons();
    });
  } else {
    currentPath = window.location.pathname;
    addSupportButtons();
  }
  
  // Handle browser back/forward navigation
  window.addEventListener('popstate', handleRouteChange);
}

// Docusaurus client module export for route updates
export function onRouteDidUpdate({ location }) {
  if (ExecutionEnvironment.canUseDOM) {
    handleRouteChange();
  }
}

export default function supportButtonsAutoInjection() {
  // This is a client module, no need to return anything
}
