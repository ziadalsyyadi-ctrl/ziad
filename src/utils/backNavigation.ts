import { useEffect, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';

type BackHandler = () => boolean | void;

interface BackEntry {
  id: symbol;
  handler: BackHandler;
}

const backStack: BackEntry[] = [];

export function registerBackHandler(handler: BackHandler): () => void {
  const entry: BackEntry = { id: Symbol('back-handler'), handler };
  backStack.push(entry);
  return () => {
    const idx = backStack.findIndex((item) => item.id === entry.id);
    if (idx !== -1) {
      backStack.splice(idx, 1);
    }
  };
}

export function dispatchRegisteredBackHandlers(): boolean {
  for (let i = backStack.length - 1; i >= 0; i--) {
    const entry = backStack[i];
    if (!entry) continue;
    const handled = entry.handler();
    if (handled !== false) {
      return true;
    }
  }
  return false;
}

/**
 * Registers an active overlay/modal onto the LIFO back-button stack.
 * When active, pressing the hardware/system back button closes the topmost overlay first.
 */
export function useRegisterBackHandler(isActive: boolean, onBack: () => void): void {
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  useEffect(() => {
    if (!isActive) return;
    return registerBackHandler(() => {
      onBackRef.current();
      return true;
    });
  }, [isActive]);
}

export function isNativeBackPluginAvailable(): boolean {
  try {
    return Capacitor.isNativePlatform() && Capacitor.isPluginAvailable('App');
  } catch {
    return false;
  }
}

export async function addNativeBackButtonListener(
  callback: () => void
): Promise<(() => void) | null> {
  if (!isNativeBackPluginAvailable()) return null;
  try {
    const handle = await CapApp.addListener('backButton', () => {
      callback();
    });
    return () => {
      try {
        void handle.remove();
      } catch {
        // Ignore listener removal errors on teardown
      }
    };
  } catch {
    return null;
  }
}

export async function exitApplication(): Promise<'exited' | 'browser_fallback'> {
  if (isNativeBackPluginAvailable()) {
    try {
      await CapApp.exitApp();
      return 'exited';
    } catch {
      // Fall through to Web fallback if native call fails
    }
  }

  try {
    window.close();
  } catch {
    // Normal browser tabs often ignore window.close()
  }

  return window.closed ? 'exited' : 'browser_fallback';
}
