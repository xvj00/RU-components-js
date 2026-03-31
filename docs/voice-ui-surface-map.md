# Voice UI Surface Map

Этот документ фиксирует поверхности voice-интерфейса и состояния, которые должны поддерживать единый визуальный язык при редизайне.

## Surfaces

- `voice-shell`: корневой контейнер voice-сцены.
- `voice-stage`: центральная зона статуса с визуализатором.
- `voice-status-chip`: короткий индикатор состояния ассистента.
- `voice-controls`: контрольная панель действий.
- `voice-theme-switcher`: выбор персонального пресета.

## Interaction States

- `connecting`: подключение с мягкой анимацией ожидания.
- `listening`: ассистент слушает пользователя.
- `thinking`: ассистент обрабатывает запрос.
- `speaking`: ассистент отвечает голосом.
- `disconnected`: сессия завершена/нет соединения.

## Personalization Dimensions

- `theme`: `calm`, `focus`, `expressive`, `contrast`.
- `variant`: `glass`, `solid`.
- `density`: `comfortable`, `compact`.

## Implementation Targets

1. Demo-прототип:
   - `examples/nextjs/pages/agent.tsx`
   - `examples/nextjs/pages/audio-only.tsx`
   - `examples/nextjs/pages/minimal.tsx`
2. Библиотечные компоненты:
   - `packages/react/src/prefabs/VoiceAssistantControlBar.tsx`
