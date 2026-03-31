'use client';

import {
  useAgent,
  BarVisualizer,
  RoomAudioRenderer,
  VoiceAssistantControlBar,
  SessionProvider,
  useSession,
  SessionEvent,
  useEvents,
} from '@livekit/components-react';
import type { NextPage } from 'next';
import { useMemo, useState, useEffect } from 'react';
import { MediaDeviceFailure, TokenSource } from 'livekit-client';
import styles from '../styles/VoiceAssistant.module.scss';
import { generateRandomUserId } from '../lib/helper';
import {
  getStoredVoiceDensity,
  getStoredVoiceTheme,
  normalizeVoiceState,
  resolveVoiceThemeClass,
  setStoredVoiceDensity,
  setStoredVoiceTheme,
  voiceStates,
  voiceThemeLabel,
  voiceThemes,
  type VoiceTheme,
} from '../lib/voiceUi';

function SimpleAgent() {
  const agent = useAgent();

  useEffect(() => {
    if (agent.state === 'failed') {
      alert(`Ошибка ассистента: ${agent.failureReasons.join(', ')}`);
    }
  }, [agent.state, agent.failureReasons]);

  return (
    <BarVisualizer
      state={agent.state}
      barCount={7}
      track={agent.microphoneTrack}
      style={{ width: '75vw', height: '300px' }}
    />
  );
}

const tokenSource = TokenSource.endpoint(process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT!);

const voiceStateLabel: Record<(typeof voiceStates)[number], string> = {
  connecting: 'Подключение',
  listening: 'Слушает',
  thinking: 'Думает',
  speaking: 'Говорит',
  disconnected: 'Отключен',
};

function AgentStatePanel({ started }: { started: boolean }) {
  const agent = useAgent();
  const normalizedState = normalizeVoiceState(started ? agent.state : 'disconnected');

  return (
    <>
      <p className={styles.stateLabel} role="status" aria-live="polite">
        Статус: <strong>{voiceStateLabel[normalizedState]}</strong>
      </p>
      <div className={styles.statusGrid}>
        {voiceStates.map((state) => (
          <div
            key={state}
            className={`${styles.statusChip} ${normalizedState === state ? styles.statusChipActive : ''}`}
          >
            {voiceStateLabel[state]}
          </div>
        ))}
      </div>
    </>
  );
}

const AgentExample: NextPage = () => {
  const params = useMemo(
    () => (typeof window !== 'undefined' ? new URLSearchParams(location.search) : null),
    [],
  );
  const roomName = useMemo(
    () => params?.get('room') ?? 'test-room-' + Math.random().toFixed(5),
    [params],
  );
  const [userIdentity] = useState(() => params?.get('user') ?? generateRandomUserId());
  const [theme, setTheme] = useState<VoiceTheme>('dark');
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');

  const session = useSession(tokenSource, {
    roomName,
    participantIdentity: userIdentity,
  });

  const [started, setStarted] = useState(false);

  useEffect(() => {
    setTheme(getStoredVoiceTheme('dark'));
    setDensity(getStoredVoiceDensity('comfortable'));
  }, []);

  useEffect(() => {
    setStoredVoiceTheme(theme);
  }, [theme]);

  useEffect(() => {
    setStoredVoiceDensity(density);
  }, [density]);
  useEffect(() => {
    if (started) {
      session.start().catch((err) => {
        console.error('Не удалось запустить сессию:', err);
      });
    } else {
      session.end().catch((err) => {
        console.error('Не удалось завершить сессию:', err);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, session.start, session.end]);

  useEffect(() => {
    if (session.connectionState === 'disconnected') {
      setStarted(false);
    }
  }, [session.connectionState]);

  useEvents(session, SessionEvent.MediaDevicesError, (error) => {
    const failure = MediaDeviceFailure.getFailure(error);
    console.error(failure);
    alert(
      'Не удалось получить доступ к камере или микрофону. Разрешите доступ в браузере и перезагрузите вкладку.',
    );
  }, []);

  return (
    <main
      data-lk-theme="default"
      className={`${styles.main} ${styles.voiceShell} ${styles[resolveVoiceThemeClass(theme)]}`}
    >
      <SessionProvider session={session}>
        <div className={styles.room}>
          <section className={`${styles.surface} ${styles.header}`}>
            <div>
              <h1 className={styles.title}>Голосовой ассистент</h1>
              <p className={styles.description}>
                Полностью персонализированный интерфейс голосового помощника с адаптивной темой.
              </p>
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
              <button
                type="button"
                className={styles.themeButton}
                aria-pressed={density === 'compact'}
                onClick={() => setDensity((current) => (current === 'compact' ? 'comfortable' : 'compact'))}
              >
                {density === 'compact' ? 'Обычная плотность' : 'Компактная плотность'}
              </button>
            </div>
          </section>
          <section className={styles.surface}>
            <AgentStatePanel started={started} />
          </section>
          <section className={`${styles.surface} ${styles.inner}`}>
            {started ? (
              <SimpleAgent />
            ) : (
              <button type="button" className={styles.primaryButton} onClick={() => setStarted(true)}>
                Начать диалог
              </button>
            )}
          </section>
          <div className={`${styles.surface} ${styles.controlBar} ${density === 'compact' ? styles.controlBarCompact : ''}`}>
            <VoiceAssistantControlBar density={density} theme={theme} variant="solid" />
          </div>
          <RoomAudioRenderer />
        </div>
      </SessionProvider>
    </main>
  );
};

export default AgentExample;
