import { useEffect, useRef } from 'react';

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) {
      // Restore focus when deactivated
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
      return;
    }

    // Save current focus
    previousFocusRef.current = document.activeElement as HTMLElement;

    const focusableElementsString =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !containerRef.current) return;

      const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(focusableElementsString);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement || !containerRef.current.contains(document.activeElement)) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement || !containerRef.current.contains(document.activeElement)) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Initial focus on first element
    setTimeout(() => {
      if (containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(focusableElementsString);
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    }, 100); // Small delay to ensure render is complete before focusing

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return containerRef;
}
