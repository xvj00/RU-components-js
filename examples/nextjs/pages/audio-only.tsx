'use client';

import {
  AudioConference,
  SessionProvider,
  useSession,
  SessionEvent,
  useEvents,
} from '@livekit/components-react';
import type { NextPage } from 'next';
import { generateRandomUserId } from '../lib/helper';
import { useMemo, useState, useEffect } from 'react';
import { TokenSource, MediaDeviceFailure } from 'livekit-client';
import styles from '../styles/VoiceAssistant.module.scss';

const tokenSource = TokenSource.endpoint(process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT!);

const AudioExample: NextPage = () => {
  const params = useMemo(
    () => (typeof window !== 'undefined' ? new URLSearchParams(location.search) : null),
    [],
  );
  const roomName = params?.get('room') ?? 'test-room';
  const [userIdentity] = useState(() => params?.get('user') ?? generateRandomUserId());

  const session = useSession(tokenSource, {
    roomName,
    participantIdentity: userIdentity,
    participantName: userIdentity,
  });

  useEffect(() => {
    session
      .start({
        tracks: {
          microphone: { enabled: true },
        },
        roomConnectOptions: {
          autoSubscribe: true,
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

  return (
    <main data-lk-theme="default" className={`${styles.main} ${styles.voiceShell} ${styles.themeLight}`}>
      <div className={styles.room}>
        <section className={`${styles.surface} ${styles.header}`}>
          <div>
            <h1 className={styles.title}>Аудиоконференция</h1>
            <p className={styles.description}>Аккуратный аудио-режим с единым стилем интерфейса.</p>
          </div>
        </section>
        <section className={styles.surface}>
          <SessionProvider session={session}>
            <AudioConference />
          </SessionProvider>
        </section>
      </div>
    </main>
  );
};

export default AudioExample;
