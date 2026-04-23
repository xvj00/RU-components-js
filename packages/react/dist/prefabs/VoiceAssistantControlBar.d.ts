import { Track } from 'livekit-client';
import * as React from 'react';
/** @beta */
export type VoiceAssistantControlBarControls = {
    microphone?: boolean;
    leave?: boolean;
};
/** @beta */
export type VoiceAssistantTheme = 'dark' | 'light' | 'calm' | 'focus' | 'expressive' | 'contrast';
/** @beta */
export type VoiceAssistantVariant = 'glass' | 'solid';
/** @beta */
export type VoiceAssistantDensity = 'comfortable' | 'compact';
/** @beta */
export interface VoiceAssistantControlBarProps extends React.HTMLAttributes<HTMLDivElement> {
    onDeviceError?: (error: {
        source: Track.Source;
        error: Error;
    }) => void;
    controls?: VoiceAssistantControlBarControls;
    /**
     * If `true`, the user's device choices will be persisted.
     * This will enables the user to have the same device choices when they rejoin the room.
     * @defaultValue true
     */
    saveUserChoices?: boolean;
    /**
     * Visual theme marker exposed via class/data attributes for custom styling.
     * @defaultValue 'dark'
     */
    theme?: VoiceAssistantTheme;
    /**
     * Visual variant marker exposed via class/data attributes for custom styling.
     * @defaultValue 'glass'
     */
    variant?: VoiceAssistantVariant;
    /**
     * Layout density marker exposed via class/data attributes for custom styling.
     * @defaultValue 'comfortable'
     */
    density?: VoiceAssistantDensity;
}
/**
 * @example
 * ```tsx
 * <LiveKitRoom ... >
 *   <VoiceAssistantControlBar />
 * </LiveKitRoom>
 * ```
 * @beta
 */
export declare function VoiceAssistantControlBar({ controls, saveUserChoices, theme, variant, density, onDeviceError, ...props }: VoiceAssistantControlBarProps): React.JSX.Element;
//# sourceMappingURL=VoiceAssistantControlBar.d.ts.map