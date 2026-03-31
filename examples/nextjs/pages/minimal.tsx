'use client';

import {
  SessionProvider,
  useSession,
  VideoConference,
  setLogLevel,
  SessionEvent,
  useEvents,
} from '@livekit/components-react';
import type { NextPage } from 'next';
import { generateRandomUserId } from '../lib/helper';
import { useMemo, useEffect, useState } from 'react';
import { TokenSource, MediaDeviceFailure } from 'livekit-client';
import styles from '../styles/VoiceAssistant.module.scss';
import {
  getStoredVoiceTheme,
  resolveVoiceThemeClass,
  setStoredVoiceTheme,
  voiceThemeLabel,
  type VoiceTheme,
  voiceThemes,
} from '../lib/voiceUi';

const tokenSource = TokenSource.endpoint(process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT!);

const MinimalExample: NextPage = () => {
  const params = useMemo(
    () => (typeof window !== 'undefined' ? new URLSearchParams(location.search) : null),
    [],
  );
  const roomName = params?.get('room') ?? 'test-room';
  setLogLevel('debug', { liveKitClientLogLevel: 'info' });

  const [userIdentity] = useState(() => params?.get('user') ?? generateRandomUserId());
  const [theme, setTheme] = useState<VoiceTheme>('dark');

  const session = useSession(tokenSource, {
    roomName,
    participantIdentity: userIdentity,
    participantName: userIdentity,
  });

  useEffect(() => {
    session
      .start({
        tracks: {
          microphone: { enabled: false },
        },
      })
      .catch((err) => {
        console.error('Не удалось запустить сессию:', err);
      });
    return () => {
      session.end().catch((err) => {
        console.error('Не удалось завершить сессию:', err);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.start, session.end]);

  useEvents(session, SessionEvent.MediaDevicesError, (error) => {
    const failure = MediaDeviceFailure.getFailure(error);
    console.error(failure);
    alert(
      'Не удалось получить доступ к камере или микрофону. Разрешите доступ в браузере и перезагрузите вкладку.',
    );
  }, []);

  useEffect(() => {
    setTheme(getStoredVoiceTheme('dark'));
  }, []);

  useEffect(() => {
    setStoredVoiceTheme(theme);
  }, [theme]);

  return (
    <main
      data-lk-theme="default"
      className={`${styles.main} ${styles.voiceShell} ${styles[resolveVoiceThemeClass(theme)]}`}
    >
      <div className={styles.room}>
        <section className={`${styles.surface} ${styles.header}`}>
          <div>
            <h1 className={styles.title}>Минимальная конференция</h1>
            <p className={styles.description}>Персональный стиль синхронизирован с voice-темами</p>
          </div>
          <div className={styles.themePicker}>
            {voiceThemes.map((themeName) => (
              <button
                key={themeName}
                type="button"
                className={styles.themeButton}
                aria-pressed={themeName === theme}
                onClick={() => setTheme(themeName)}
              >
                {voiceThemeLabel[themeName]}
              </button>
            ))}
          </div>
        </section>
        <section className={styles.surface}>
          {session.isConnected && (
            <SessionProvider session={session}>
              <VideoConference />
            </SessionProvider>
          )}
        </section>
      </div>
    </main>
  );
};

export default MinimalExample;
