import { Track } from 'livekit-client';
import * as React from 'react';
import { MediaDeviceMenu } from './MediaDeviceMenu';
import { TrackToggle } from '../components/controls/TrackToggle';
import {
  useLocalParticipant,
  useLocalParticipantPermissions,
  usePersistentUserChoices,
} from '../hooks';
import { mergeProps } from '../utils';
import { StartMediaButton } from '../components/controls/StartMediaButton';
import { BarVisualizer, DisconnectButton } from '../components';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';

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
  onDeviceError?: (error: { source: Track.Source; error: Error }) => void;
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
export function VoiceAssistantControlBar({
  controls,
  saveUserChoices = true,
  theme = 'dark',
  variant = 'glass',
  density = 'comfortable',
  onDeviceError,
  ...props
}: VoiceAssistantControlBarProps) {
  const visibleControls = { leave: true, microphone: true, ...controls };

  const localPermissions = useLocalParticipantPermissions();
  const { microphoneTrack, localParticipant } = useLocalParticipant();

  const micTrackRef: TrackReferenceOrPlaceholder = React.useMemo(() => {
    return {
      participant: localParticipant,
      source: Track.Source.Microphone,
      publication: microphoneTrack,
    };
  }, [localParticipant, microphoneTrack]);

  if (!localPermissions) {
    visibleControls.microphone = false;
  } else {
    visibleControls.microphone ??= localPermissions.canPublish;
  }

  const htmlProps = mergeProps(
    {
      className: `lk-agent-control-bar lk-agent-control-bar-theme-${theme} lk-agent-control-bar-variant-${variant} lk-agent-control-bar-density-${density}`,
      'data-lk-agent-theme': theme,
      'data-lk-agent-variant': variant,
      'data-lk-agent-density': density,
    },
    props,
  );

  const { saveAudioInputEnabled, saveAudioInputDeviceId } = usePersistentUserChoices({
    preventSave: !saveUserChoices,
  });

  const microphoneOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) => {
      if (isUserInitiated) {
        saveAudioInputEnabled(enabled);
      }
    },
    [saveAudioInputEnabled],
  );

  return (
    <div {...htmlProps}>
      {visibleControls.microphone && (
        <div className="lk-button-group">
          <TrackToggle
            source={Track.Source.Microphone}
            showIcon={true}
            onChange={microphoneOnChange}
            onDeviceError={(error) => onDeviceError?.({ source: Track.Source.Microphone, error })}
          >
            <BarVisualizer trackRef={micTrackRef} barCount={7} options={{ minHeight: 5 }} />
          </TrackToggle>
          <div className="lk-button-group-menu">
            <MediaDeviceMenu
              kind="audioinput"
              onActiveDeviceChange={(_kind, deviceId) =>
                saveAudioInputDeviceId(deviceId ?? 'default')
              }
            />
          </div>
        </div>
      )}

      {visibleControls.leave && <DisconnectButton>{'Отключиться'}</DisconnectButton>}
      <StartMediaButton />
    </div>
  );
}
