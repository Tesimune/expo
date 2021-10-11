import { EventEmitter, Platform, Subscription } from 'expo-modules-core';
import { useEffect, useState } from 'react';
import { ColorValue, processColor } from 'react-native';

import ExpoNavigationBar from './ExpoNavigationBar';
import { BarStyle, Behavior, Position, Visibility, VisibilityEvent } from './NavigationBar.types';

const emitter = new EventEmitter(ExpoNavigationBar);

/**
 * Observe changes to the system navigation bar.
 * Due to platform constraints, this callback will also be triggered when the status bar visibility changes.
 *
 * @example
 * ```ts
 * NavigationBar.addVisibilityListener(({ visibility }) => {
 *   // ...
 * });
 * ```
 */
export function addVisibilityListener(listener: (event: VisibilityEvent) => void): Subscription {
  return emitter.addListener('ExpoNavigationBar.didChange', listener);
}

/**
 * Changes the navigation bar's background color.
 *
 * @example
 * ```ts
 * NavigationBar.setBackgroundColorAsync("white");
 * ```
 * @param color Any valid [CSS 3 (SVG) color](http://www.w3.org/TR/css3-color/#svg-color).
 */
export async function setBackgroundColorAsync(color: ColorValue): Promise<void> {
  if (Platform.OS !== 'android') {
    console.warn('`setBackgroundColorAsync` is only available on Android');
    return;
  }
  const colorNumber = processColor(color);
  return await ExpoNavigationBar.setBackgroundColorAsync(colorNumber);
}

/**
 * Gets the navigation bar's background color.
 *
 * @example
 * ```ts
 * const color = await NavigationBar.getBackgroundColorAsync();
 * ```
 * @returns Current navigation bar color in hex format. Returns `#00000000` (transparent) on unsupported platforms (iOS, web).
 */
export async function getBackgroundColorAsync(): Promise<ColorValue> {
  if (Platform.OS !== 'android') {
    console.warn('`getBackgroundColorAsync` is only available on Android');
    return `#00000000`;
  }
  return await ExpoNavigationBar.getBackgroundColorAsync();
}

/**
 * Changes the navigation bar's border color.
 *
 * @example
 * ```ts
 * NavigationBar.setBorderColorAsync("red");
 * ```
 * @param color Any valid [CSS 3 (SVG) color](http://www.w3.org/TR/css3-color/#svg-color).
 */
export async function setBorderColorAsync(color: ColorValue): Promise<void> {
  if (Platform.OS !== 'android') {
    console.warn('`setBorderColorAsync` is only available on Android');
    return;
  }
  const colorNumber = processColor(color);
  await ExpoNavigationBar.setBorderColorAsync(colorNumber);
}

/**
 * Gets the navigation bar's top border color, also known as the "divider color".
 *
 * @example
 * ```ts
 * const color = await NavigationBar.getBorderColorAsync();
 * ```
 * @returns Navigation bar top border color in hex format. Returns `#00000000` (transparent) on unsupported platforms (iOS, web).
 */
export async function getBorderColorAsync(): Promise<ColorValue> {
  if (Platform.OS !== 'android') {
    console.warn('`getBorderColorAsync` is only available on Android');
    return `#00000000`;
  }

  return await ExpoNavigationBar.getBorderColorAsync();
}

/**
 * Set the navigation bar's visibility.
 *
 * @example
 * ```ts
 * NavigationBar.setVisibilityAsync("hidden");
 * ```
 * @param color `visible|hidden` based on CSS visibility property.
 */
export async function setVisibilityAsync(visibility: Visibility): Promise<void> {
  if (Platform.OS !== 'android') {
    console.warn('`setVisibilityAsync` is only available on Android');
    return;
  }
  await ExpoNavigationBar.setVisibilityAsync(visibility);
}

/**
 * Get the navigation bar's visibility.
 *
 * @example
 * ```ts
 * const visibility = await NavigationBar.getVisibilityAsync("hidden");
 * ```
 * @returns Navigation bar's current visibility status. Returns `hidden` on unsupported platforms (iOS, web).
 */
export async function getVisibilityAsync(): Promise<Visibility> {
  if (Platform.OS !== 'android') {
    console.warn('`getVisibilityAsync` is only available on Android');
    return 'hidden';
  }
  return ExpoNavigationBar.getVisibilityAsync();
}

/**
 * Changes the navigation bar's button colors between white (`light`) and a dark gray color (`dark`).
 *
 * @example
 * ```ts
 * NavigationBar.setBarStyleAsync("light");
 * ```
 * @param style `light|dark` dictates the color of the foreground element color.
 */
export async function setBarStyleAsync(style: BarStyle): Promise<void> {
  if (Platform.OS !== 'android') {
    console.warn('`setBarStyleAsync` is only available on Android');
    return;
  }
  await ExpoNavigationBar.setBarStyleAsync(style);
}

/**
 * Gets the navigation bar's button color styles.
 *
 * @example
 * ```ts
 * const style = await NavigationBar.getBarStyleAsync();
 * ```
 * @returns Navigation bar foreground element color settings. Returns `light` on unsupported platforms (iOS, web).
 */
export async function getBarStyleAsync(): Promise<BarStyle> {
  if (Platform.OS !== 'android') {
    console.warn('`getBarStyleAsync` is only available on Android');
    return 'light';
  }
  return await ExpoNavigationBar.getBarStyleAsync();
}

/**
 * Sets positioning method used for the navigation bar (and status bar).
 * Setting position `absolute` will float the navigation bar above the content,
 * whereas position `relative` will shrink the screen to inline the navigation bar.
 *
 * When drawing behind the status and navigation bars, ensure the safe area insets are adjusted accordingly.
 *
 * @example
 * ```ts
 * // enables edge-to-edge mode
 * await NavigationBar.setPositionAsync('absolute')
 * // transparent backgrounds to see through
 * await NavigationBar.setBackgroundColorAsync('#ffffff00')
 * ```
 * @param position `absolute|relative` based on CSS position property.
 */
export async function setPositionAsync(position: Position): Promise<void> {
  if (Platform.OS !== 'android') {
    console.warn('`setPositionAsync` is only available on Android');
    return;
  }
  await ExpoNavigationBar.setPositionAsync(position);
}

/**
 * Whether the navigation and status bars float above the app (absolute) or sit inline with it (relative).
 * This value can be incorrect if `androidNavigationBar.visible` is used instead of the config plugin `position` property.
 *
 * @example
 * ```ts
 * await NavigationBar.getPositionAsync()
 * ```
 * @returns Navigation bar positional rendering mode. Returns `relative` on unsupported platforms (iOS, web).
 */
export async function getPositionAsync(): Promise<Position> {
  if (Platform.OS !== 'android') {
    console.warn('`setPositionAsync` is only available on Android');
    return 'relative';
  }
  return await ExpoNavigationBar.getPositionAsync();
}

/**
 * Sets the behavior of the status bar and navigation bar when they are hidden and the user wants to reveal them.
 *
 * For example, if the navigation bar is hidden (`setVisibilityAsync(false)`) and the behavior
 * is `'overlay-swipe'`, the user can swipe from the bottom of the screen to temporarily reveal the navigation bar.
 *
 * - `'overlay-swipe'`: Temporarily reveals the System UI after a swipe gesture (bottom or top) without insetting your App's content.
 * - `'inset-swipe'`: Reveals the System UI after a swipe gesture (bottom or top) and insets your App's content (Safe Area). The System UI is visible until you explicitly hide it again.
 * - `'inset-touch'`: Reveals the System UI after a touch anywhere on the screen and insets your App's content (Safe Area). The System UI is visible until you explicitly hide it again.
 *
 * @example
 * ```ts
 * await NavigationBar.setBehaviorAsync('overlay-swipe')
 * ```
 * @param behavior `overlay-swipe|inset-swipe|inset-touch` dictates the interaction behavior of the navigation bar.
 */
export async function setBehaviorAsync(behavior: Behavior): Promise<void> {
  if (Platform.OS !== 'android') {
    console.warn('`setBehaviorAsync` is only available on Android');
    return;
  }
  return await ExpoNavigationBar.setBehaviorAsync(behavior);
}

/**
 * Gets the behavior of the status and navigation bars when the user swipes or touches the screen.
 *
 * @example
 * ```ts
 * await NavigationBar.getBehaviorAsync()
 * ```
 * @returns Navigation bar interaction behavior. Returns `inset-touch` on unsupported platforms (iOS, web).
 */
export async function getBehaviorAsync(): Promise<Behavior> {
  if (Platform.OS !== 'android') {
    console.warn('`getBehaviorAsync` is only available on Android');
    return 'inset-touch';
  }
  return await ExpoNavigationBar.getBehaviorAsync();
}

/**
 * React hook that statefully updates with the visibility of the system navigation bar.
 *
 * @example
 * ```ts
 * function App() {
 *   const visibility = NavigationBar.useVisibility()
 *   // React Component...
 * }
 * ```
 * @returns Visibility of the navigation bar, `null` during async initialization.
 */
export function useVisibility(): Visibility | null {
  const [visibility, setVisible] = useState<Visibility | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (Platform.OS === 'android') {
      getVisibilityAsync().then((visibility) => {
        if (isMounted) {
          setVisible(visibility);
        }
      });
    }

    const listener = addVisibilityListener(({ visibility }) => {
      if (isMounted) {
        setVisible(visibility);
      }
    });

    return () => {
      listener.remove();
      isMounted = false;
    };
  }, []);

  return visibility;
}

export * from './NavigationBar.types';
