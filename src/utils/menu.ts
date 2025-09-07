/**
 * Small DOM helpers for mobile menu control so behavior can be unit tested.
 */

export interface MenuState {
  isOpen: boolean;
  button: HTMLElement | null;
  menu: HTMLElement | null;
}

export const ARIA_LABELS = {
  open: 'メニューを開く',
  close: 'メニューを閉じる'
} as const;

/**
 * Safely controls body scroll behavior
 */
function setBodyScroll(disabled: boolean): void {
  try {
    document.body.style.overflow = disabled ? 'hidden' : '';
  } catch (error) {
    console.warn('Failed to set body scroll:', error);
  }
}

/**
 * Updates button ARIA attributes and classes
 */
function updateButtonAria(button: HTMLElement, isOpen: boolean): void {
  try {
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? ARIA_LABELS.close : ARIA_LABELS.open);
    button.classList.toggle('active', isOpen);
  } catch (error) {
    console.warn('Failed to update button ARIA:', error);
  }
}

export function openMenu(menuEl: HTMLElement | null): boolean {
  if (!menuEl) {
    console.warn('openMenu: menu element is null');
    return false;
  }
  
  try {
    menuEl.classList.add('open');
    setBodyScroll(true);
    return true;
  } catch (error) {
    console.error('Failed to open menu:', error);
    return false;
  }
}

export function closeMenu(menuEl: HTMLElement | null): boolean {
  if (!menuEl) {
    console.warn('closeMenu: menu element is null');
    return false;
  }
  
  try {
    menuEl.classList.remove('open');
    setBodyScroll(false);
    return true;
  } catch (error) {
    console.error('Failed to close menu:', error);
    return false;
  }
}

export function toggleMenu(buttonEl: HTMLElement | null, menuEl: HTMLElement | null): MenuState {
  if (!buttonEl || !menuEl) {
    console.warn('toggleMenu: button or menu element is null');
    return { isOpen: false, button: buttonEl, menu: menuEl };
  }
  
  try {
    const wasOpen = menuEl.classList.contains('open');
    const targetState = !wasOpen;
    
    if (targetState) {
      openMenu(menuEl);
    } else {
      closeMenu(menuEl);
    }
    
    updateButtonAria(buttonEl, targetState);
    
    return { isOpen: targetState, button: buttonEl, menu: menuEl };
  } catch (error) {
    console.error('Failed to toggle menu:', error);
    return { isOpen: false, button: buttonEl, menu: menuEl };
  }
}

export function isMenuOpen(menuEl: HTMLElement | null): boolean {
  if (!menuEl) return false;
  
  try {
    return menuEl.classList.contains('open');
  } catch (error) {
    console.warn('Failed to check menu state:', error);
    return false;
  }
}

/**
 * Gets current menu state for debugging/testing
 */
export function getMenuState(buttonEl: HTMLElement | null, menuEl: HTMLElement | null): MenuState {
  return {
    isOpen: isMenuOpen(menuEl),
    button: buttonEl,
    menu: menuEl
  };
}
