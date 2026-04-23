import { Track as v, facingModeFromLocalTrack as ie, Mutex as oe, createLocalTracks as le, createLocalVideoTrack as ue, VideoPresets as de, createLocalAudioTrack as me, RoomEvent as fe } from "livekit-client";
import * as e from "react";
import { C as K, S as he, a as pe, M as B, b as ge, T as R, c as Ee, d as ve, D as H, e as Se, f as z, L as J, G as ke, P as G, F as be, g as Ce, h as we, R as Ie, i as ye, j as Pe, k as Me, B as Ne } from "./components-Dl8_KfwP.mjs";
import { i as Q, as as Te, at as Le, p as N, a as Ae, au as De, av as Re, $ as U, aw as $e, ax as Oe } from "./contexts-BABOeQ4Z.mjs";
import { z as Ve, o as _e, A as Fe, B as W, C as xe, D as Be, E as Ue, F as We, G as X, m as Y, x as Z, H as qe, I as je } from "./room-BXkFS6wM.mjs";
function ee({
  messageFormatter: r,
  messageDecoder: d,
  messageEncoder: u,
  channelTopic: a,
  ...C
}) {
  const g = e.useRef(null), f = e.useRef(null), i = e.useMemo(() => ({ messageDecoder: d, messageEncoder: u, channelTopic: a }), [d, u, a]), { chatMessages: s, send: I, isSending: t } = Ve(i), p = Q(), o = e.useRef(0);
  async function k(l) {
    l.preventDefault(), f.current && f.current.value.trim() !== "" && (await I(f.current.value), f.current.value = "", f.current.focus());
  }
  return e.useEffect(() => {
    var l;
    g && ((l = g.current) == null || l.scrollTo({ top: g.current.scrollHeight }));
  }, [g, s]), e.useEffect(() => {
    var n, h, c, w, S;
    if (!p || s.length === 0)
      return;
    if ((n = p.widget.state) != null && n.showChat && s.length > 0 && o.current !== ((h = s[s.length - 1]) == null ? void 0 : h.timestamp)) {
      o.current = (c = s[s.length - 1]) == null ? void 0 : c.timestamp;
      return;
    }
    const l = s.filter(
      (A) => !o.current || A.timestamp > o.current
    ).length, { widget: m } = p;
    l > 0 && ((w = m.state) == null ? void 0 : w.unreadMessages) !== l && ((S = m.dispatch) == null || S.call(m, { msg: "unread_msg", count: l }));
  }, [s, p == null ? void 0 : p.widget]), /* @__PURE__ */ e.createElement("div", { ...C, className: "lk-chat" }, /* @__PURE__ */ e.createElement("div", { className: "lk-chat-header" }, "Сообщения", p && /* @__PURE__ */ e.createElement(K, { className: "lk-close-button" }, /* @__PURE__ */ e.createElement(he, null))), /* @__PURE__ */ e.createElement("ul", { className: "lk-list lk-chat-messages", ref: g }, C.children ? s.map(
    (l, m) => _e(C.children, {
      entry: l,
      key: l.id ?? m,
      messageFormatter: r
    })
  ) : s.map((l, m, n) => {
    const h = m >= 1 && n[m - 1].from === l.from, c = m >= 1 && l.timestamp - n[m - 1].timestamp < 6e4;
    return /* @__PURE__ */ e.createElement(
      pe,
      {
        key: l.id ?? m,
        hideName: h,
        hideTimestamp: h === !1 ? !1 : c,
        entry: l,
        messageFormatter: r
      }
    );
  })), /* @__PURE__ */ e.createElement("form", { className: "lk-chat-form", onSubmit: k }, /* @__PURE__ */ e.createElement(
    "input",
    {
      className: "lk-form-control lk-chat-form-input",
      disabled: t,
      ref: f,
      type: "text",
      placeholder: "Введите сообщение",
      onInput: (l) => l.stopPropagation(),
      onKeyDown: (l) => l.stopPropagation(),
      onKeyUp: (l) => l.stopPropagation()
    }
  ), /* @__PURE__ */ e.createElement("button", { type: "submit", className: "lk-button lk-chat-form-button", disabled: t }, "Отправить")));
}
function O({
  kind: r,
  initialSelection: d,
  onActiveDeviceChange: u,
  tracks: a,
  requestPermissions: C = !1,
  ...g
}) {
  const [f, i] = e.useState(!1), [s, I] = e.useState([]), [t, p] = e.useState(!0), [o, k] = e.useState(C), l = (c, w) => {
    N.debug("handle device change"), i(!1), u == null || u(c, w);
  }, m = e.useRef(null), n = e.useRef(null);
  e.useLayoutEffect(() => {
    f && k(!0);
  }, [f]), e.useLayoutEffect(() => {
    let c;
    return m.current && n.current && (s || t) && (c = Te(m.current, n.current, (w, S) => {
      n.current && Object.assign(n.current.style, { left: `${w}px`, top: `${S}px` });
    })), p(!1), () => {
      c == null || c();
    };
  }, [m, n, s, t]);
  const h = e.useCallback(
    (c) => {
      n.current && c.target !== m.current && f && Le(n.current, c) && i(!1);
    },
    [f, n, m]
  );
  return e.useEffect(() => (document.addEventListener("click", h), () => {
    document.removeEventListener("click", h);
  }), [h]), /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement(
    "button",
    {
      className: "lk-button lk-button-menu",
      "aria-pressed": f,
      ...g,
      onClick: () => i(!f),
      ref: m
    },
    g.children
  ), !g.disabled && /* @__PURE__ */ e.createElement(
    "div",
    {
      className: "lk-device-menu",
      ref: n,
      style: { visibility: f ? "visible" : "hidden" }
    },
    r ? /* @__PURE__ */ e.createElement(
      B,
      {
        initialSelection: d,
        onActiveDeviceChange: (c) => l(r, c),
        onDeviceListChange: I,
        kind: r,
        track: a == null ? void 0 : a[r],
        requestPermissions: o
      }
    ) : /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("div", { className: "lk-device-menu-heading" }, "Аудио-устройства"), /* @__PURE__ */ e.createElement(
      B,
      {
        kind: "audioinput",
        onActiveDeviceChange: (c) => l("audioinput", c),
        onDeviceListChange: I,
        track: a == null ? void 0 : a.audioinput,
        requestPermissions: o
      }
    ), /* @__PURE__ */ e.createElement("div", { className: "lk-device-menu-heading" }, "Видео-устройства"), /* @__PURE__ */ e.createElement(
      B,
      {
        kind: "videoinput",
        onActiveDeviceChange: (c) => l("videoinput", c),
        onDeviceListChange: I,
        track: a == null ? void 0 : a.videoinput,
        requestPermissions: o
      }
    ))
  ));
}
function q() {
  e.useEffect(() => {
    Fe();
  }, []);
}
function Ge(r, d) {
  const [u, a] = e.useState(), C = e.useMemo(() => new oe(), []);
  return e.useEffect(() => {
    let g = !1, f = [];
    return C.lock().then(async (i) => {
      try {
        (r.audio || r.video) && (f = await le(r), g ? f.forEach((s) => s.stop()) : a(f));
      } catch (s) {
        d && s instanceof Error ? d(s) : N.error(s);
      } finally {
        i();
      }
    }), () => {
      g = !0, f.forEach((i) => {
        i.stop();
      });
    };
  }, [JSON.stringify(r, Be), d, C]), u;
}
function Ze(r, d, u) {
  const [a, C] = e.useState(null), [g, f] = e.useState(!1), i = xe({ kind: u }), [s, I] = e.useState(
    void 0
  ), [t, p] = e.useState(), [o, k] = e.useState(d);
  e.useEffect(() => {
    k(d);
  }, [d]);
  const l = async (h, c) => {
    try {
      const w = c === "videoinput" ? await ue({
        deviceId: h,
        resolution: de.h720.resolution
      }) : await me({ deviceId: h }), S = await w.getDeviceId(!1);
      S && h !== S && (n.current = S, k(S)), p(w);
    } catch (w) {
      w instanceof Error && C(w);
    }
  }, m = async (h, c) => {
    await h.setDeviceId(c), n.current = c;
  }, n = e.useRef(o);
  return e.useEffect(() => {
    r && !t && !a && !g && (N.debug("creating track", u), f(!0), l(o, u).finally(() => {
      f(!1);
    }));
  }, [r, t, a, g]), e.useEffect(() => {
    t && (r ? s != null && s.deviceId && n.current !== (s == null ? void 0 : s.deviceId) ? (N.debug(`switching ${u} device from`, n.current, s.deviceId), m(t, s.deviceId)) : (N.debug(`unmuting local ${u} track`), t.unmute()) : (N.debug(`muting ${u} track`), t.mute().then(() => N.debug(t.mediaStreamTrack))));
  }, [t, s, r, u]), e.useEffect(() => () => {
    t && (N.debug(`stopping local ${u} track`), t.stop(), t.mute());
  }, []), e.useEffect(() => {
    I(i == null ? void 0 : i.find((h) => h.deviceId === o));
  }, [o, i]), {
    selectedDevice: s,
    localTrack: t,
    deviceError: a
  };
}
function et({
  defaults: r = {},
  onValidate: d,
  onSubmit: u,
  onError: a,
  debug: C,
  joinLabel: g = "Войти в комнату",
  micLabel: f = "Микрофон",
  camLabel: i = "Камера",
  userLabel: s = "Имя пользователя",
  persistUserChoices: I = !0,
  videoProcessor: t,
  ...p
}) {
  const {
    userChoices: o,
    saveAudioInputDeviceId: k,
    saveAudioInputEnabled: l,
    saveVideoInputDeviceId: m,
    saveVideoInputEnabled: n,
    saveUsername: h
  } = W({
    defaults: r,
    preventSave: !I,
    preventLoad: !I
  }), [c, w] = e.useState(o), [S, A] = e.useState(c.audioEnabled), [y, L] = e.useState(c.videoEnabled), [T, V] = e.useState(c.audioDeviceId), [E, P] = e.useState(c.videoDeviceId), [$, ae] = e.useState(c.username);
  e.useEffect(() => {
    l(S);
  }, [S, l]), e.useEffect(() => {
    n(y);
  }, [y, n]), e.useEffect(() => {
    k(T);
  }, [T, k]), e.useEffect(() => {
    m(E);
  }, [E, m]), e.useEffect(() => {
    h($);
  }, [$, h]);
  const D = Ge(
    {
      audio: S ? { deviceId: o.audioDeviceId } : !1,
      video: y ? { deviceId: o.videoDeviceId, processor: t } : !1
    },
    a
  ), _ = e.useRef(null), M = e.useMemo(
    () => D == null ? void 0 : D.filter((b) => b.kind === v.Kind.Video)[0],
    [D]
  ), ne = e.useMemo(() => {
    if (M) {
      const { facingMode: b } = ie(M);
      return b;
    } else
      return "undefined";
  }, [M]), j = e.useMemo(
    () => D == null ? void 0 : D.filter((b) => b.kind === v.Kind.Audio)[0],
    [D]
  );
  e.useEffect(() => (_.current && M && (M.unmute(), M.attach(_.current)), () => {
    M == null || M.detach();
  }), [M]);
  const [ce, se] = e.useState(), F = e.useCallback(
    (b) => typeof d == "function" ? d(b) : b.username !== "",
    [d]
  );
  e.useEffect(() => {
    const b = {
      username: $,
      videoEnabled: y,
      videoDeviceId: E,
      audioEnabled: S,
      audioDeviceId: T
    };
    w(b), se(F(b));
  }, [$, y, F, S, T, E]);
  function re(b) {
    b.preventDefault(), F(c) ? typeof u == "function" && u(c) : N.warn("Validation failed with: ", c);
  }
  return q(), /* @__PURE__ */ e.createElement("div", { className: "lk-prejoin", ...p }, /* @__PURE__ */ e.createElement("div", { className: "lk-video-container" }, M && /* @__PURE__ */ e.createElement("video", { ref: _, width: "1280", height: "720", "data-lk-facing-mode": ne }), (!M || !y) && /* @__PURE__ */ e.createElement("div", { className: "lk-camera-off-note" }, /* @__PURE__ */ e.createElement(ge, null))), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-container" }, /* @__PURE__ */ e.createElement("div", { className: "lk-button-group audio" }, /* @__PURE__ */ e.createElement(
    R,
    {
      initialState: S,
      source: v.Source.Microphone,
      onChange: (b) => A(b)
    },
    f
  ), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(
    O,
    {
      initialSelection: T,
      kind: "audioinput",
      disabled: !j,
      tracks: { audioinput: j },
      onActiveDeviceChange: (b, x) => V(x)
    }
  ))), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group video" }, /* @__PURE__ */ e.createElement(
    R,
    {
      initialState: y,
      source: v.Source.Camera,
      onChange: (b) => L(b)
    },
    i
  ), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(
    O,
    {
      initialSelection: E,
      kind: "videoinput",
      disabled: !M,
      tracks: { videoinput: M },
      onActiveDeviceChange: (b, x) => P(x)
    }
  )))), /* @__PURE__ */ e.createElement("form", { className: "lk-username-container" }, /* @__PURE__ */ e.createElement(
    "input",
    {
      className: "lk-form-control",
      id: "username",
      name: "username",
      type: "text",
      defaultValue: $,
      placeholder: s,
      onChange: (b) => ae(b.target.value),
      autoComplete: "off"
    }
  ), /* @__PURE__ */ e.createElement(
    "button",
    {
      className: "lk-button lk-join-button",
      type: "submit",
      onClick: re,
      disabled: !ce
    },
    g
  )), C && /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("strong", null, "Выбор пользователя:"), /* @__PURE__ */ e.createElement("ul", { className: "lk-list", style: { overflow: "hidden", maxWidth: "15rem" } }, /* @__PURE__ */ e.createElement("li", null, "Имя пользователя: ", `${c.username}`), /* @__PURE__ */ e.createElement("li", null, "Видео включено: ", `${c.videoEnabled}`), /* @__PURE__ */ e.createElement("li", null, "Аудио включено: ", `${c.audioEnabled}`), /* @__PURE__ */ e.createElement("li", null, "Видео-устройство: ", `${c.videoDeviceId}`), /* @__PURE__ */ e.createElement("li", null, "Аудио-устройство: ", `${c.audioDeviceId}`))));
}
function Ke({ props: r }) {
  const { dispatch: d, state: u } = Ae().widget, a = "lk-button lk-settings-toggle";
  return { mergedProps: e.useMemo(() => Ue(r, {
    className: a,
    onClick: () => {
      d && d({ msg: "toggle_settings" });
    },
    "aria-pressed": u != null && u.showSettings ? "true" : "false"
  }), [r, a, d, u]) };
}
const He = /* @__PURE__ */ e.forwardRef(
  function(d, u) {
    const { mergedProps: a } = Ke({ props: d });
    return /* @__PURE__ */ e.createElement("button", { ref: u, ...a }, d.children);
  }
), ze = (r) => {
  switch (r) {
    case v.Source.Camera:
      return 1;
    case v.Source.Microphone:
      return 2;
    case v.Source.ScreenShare:
      return 3;
    default:
      return 0;
  }
};
function te({
  variation: r,
  controls: d,
  saveUserChoices: u = !0,
  onDeviceError: a,
  ...C
}) {
  var V;
  const [g, f] = e.useState(!1), i = Q();
  e.useEffect(() => {
    var E, P;
    ((E = i == null ? void 0 : i.widget.state) == null ? void 0 : E.showChat) !== void 0 && f((P = i == null ? void 0 : i.widget.state) == null ? void 0 : P.showChat);
  }, [(V = i == null ? void 0 : i.widget.state) == null ? void 0 : V.showChat]);
  const I = We(`(max-width: ${g ? 1e3 : 760}px)`) ? "minimal" : "verbose";
  r ?? (r = I);
  const t = { leave: !0, ...d }, p = X();
  if (!p)
    t.camera = !1, t.chat = !1, t.microphone = !1, t.screenShare = !1;
  else {
    const E = (P) => p.canPublish && (p.canPublishSources.length === 0 || p.canPublishSources.includes(ze(P)));
    t.camera ?? (t.camera = E(v.Source.Camera)), t.microphone ?? (t.microphone = E(v.Source.Microphone)), t.screenShare ?? (t.screenShare = E(v.Source.ScreenShare)), t.chat ?? (t.chat = p.canPublishData && (d == null ? void 0 : d.chat));
  }
  const o = e.useMemo(
    () => r === "minimal" || r === "verbose",
    [r]
  ), k = e.useMemo(
    () => r === "textOnly" || r === "verbose",
    [r]
  ), l = De(), [m, n] = e.useState(!1), h = e.useCallback(
    (E) => {
      n(E);
    },
    [n]
  ), c = Y({ className: "lk-control-bar" }, C), {
    saveAudioInputEnabled: w,
    saveVideoInputEnabled: S,
    saveAudioInputDeviceId: A,
    saveVideoInputDeviceId: y
  } = W({ preventSave: !u }), L = e.useCallback(
    (E, P) => P ? w(E) : null,
    [w]
  ), T = e.useCallback(
    (E, P) => P ? S(E) : null,
    [S]
  );
  return /* @__PURE__ */ e.createElement("div", { ...c }, t.microphone && /* @__PURE__ */ e.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ e.createElement(
    R,
    {
      source: v.Source.Microphone,
      showIcon: o,
      onChange: L,
      onDeviceError: (E) => a == null ? void 0 : a({ source: v.Source.Microphone, error: E })
    },
    k && "Микрофон"
  ), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(
    O,
    {
      kind: "audioinput",
      onActiveDeviceChange: (E, P) => A(P ?? "default")
    }
  ))), t.camera && /* @__PURE__ */ e.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ e.createElement(
    R,
    {
      source: v.Source.Camera,
      showIcon: o,
      onChange: T,
      onDeviceError: (E) => a == null ? void 0 : a({ source: v.Source.Camera, error: E })
    },
    k && "Камера"
  ), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(
    O,
    {
      kind: "videoinput",
      onActiveDeviceChange: (E, P) => y(P ?? "default")
    }
  ))), t.screenShare && l && /* @__PURE__ */ e.createElement(
    R,
    {
      source: v.Source.ScreenShare,
      captureOptions: { audio: !0, selfBrowserSurface: "include" },
      showIcon: o,
      onChange: h,
      onDeviceError: (E) => a == null ? void 0 : a({ source: v.Source.ScreenShare, error: E })
    },
    k && (m ? "Остановить показ экрана" : "Поделиться экраном")
  ), t.chat && /* @__PURE__ */ e.createElement(K, null, o && /* @__PURE__ */ e.createElement(Ee, null), k && "Чат"), t.settings && /* @__PURE__ */ e.createElement(He, null, o && /* @__PURE__ */ e.createElement(ve, null), k && "Настройки"), t.leave && /* @__PURE__ */ e.createElement(H, null, o && /* @__PURE__ */ e.createElement(Se, null), k && "Выйти"), /* @__PURE__ */ e.createElement(z, null));
}
function tt({
  chatMessageFormatter: r,
  chatMessageDecoder: d,
  chatMessageEncoder: u,
  SettingsComponent: a,
  ...C
}) {
  var l, m;
  const [g, f] = e.useState({
    showChat: !1,
    unreadMessages: 0,
    showSettings: !1
  }), i = e.useRef(null), s = Z(
    [
      { source: v.Source.Camera, withPlaceholder: !0 },
      { source: v.Source.ScreenShare, withPlaceholder: !1 }
    ],
    { updateOnlyOn: [fe.ActiveSpeakersChanged], onlySubscribed: !1 }
  ), I = (n) => {
    N.debug("updating widget state", n), f(n);
  }, t = Re(), p = s.filter(U).filter((n) => n.publication.source === v.Source.ScreenShare), o = (l = qe(t)) == null ? void 0 : l[0], k = s.filter((n) => !$e(n, o));
  return e.useEffect(() => {
    var n, h, c, w, S, A;
    if (p.some((y) => y.publication.isSubscribed) && i.current === null ? (N.debug("Auto set screen share focus:", { newScreenShareTrack: p[0] }), (h = (n = t.pin).dispatch) == null || h.call(n, { msg: "set_pin", trackReference: p[0] }), i.current = p[0]) : i.current && !p.some(
      (y) => {
        var L, T;
        return y.publication.trackSid === ((T = (L = i.current) == null ? void 0 : L.publication) == null ? void 0 : T.trackSid);
      }
    ) && (N.debug("Auto clearing screen share focus."), (w = (c = t.pin).dispatch) == null || w.call(c, { msg: "clear_pin" }), i.current = null), o && !U(o)) {
      const y = s.find(
        (L) => L.participant.identity === o.participant.identity && L.source === o.source
      );
      y !== o && U(y) && ((A = (S = t.pin).dispatch) == null || A.call(S, { msg: "set_pin", trackReference: y }));
    }
  }, [
    p.map((n) => `${n.publication.trackSid}_${n.publication.isSubscribed}`).join(),
    (m = o == null ? void 0 : o.publication) == null ? void 0 : m.trackSid,
    s
  ]), q(), /* @__PURE__ */ e.createElement("div", { className: "lk-video-conference", ...C }, Oe() && /* @__PURE__ */ e.createElement(
    J,
    {
      value: t,
      onWidgetChange: I
    },
    /* @__PURE__ */ e.createElement("div", { className: "lk-video-conference-inner" }, o ? /* @__PURE__ */ e.createElement("div", { className: "lk-focus-layout-wrapper" }, /* @__PURE__ */ e.createElement(be, null, /* @__PURE__ */ e.createElement(Ce, { tracks: k }, /* @__PURE__ */ e.createElement(G, null)), o && /* @__PURE__ */ e.createElement(we, { trackRef: o }))) : /* @__PURE__ */ e.createElement("div", { className: "lk-grid-layout-wrapper" }, /* @__PURE__ */ e.createElement(ke, { tracks: s }, /* @__PURE__ */ e.createElement(G, null))), /* @__PURE__ */ e.createElement(te, { controls: { chat: !0, settings: !!a } })),
    /* @__PURE__ */ e.createElement(
      ee,
      {
        style: { display: g.showChat ? "grid" : "none" },
        messageFormatter: r,
        messageEncoder: u,
        messageDecoder: d
      }
    ),
    a && /* @__PURE__ */ e.createElement(
      "div",
      {
        className: "lk-settings-menu-modal",
        style: { display: g.showSettings ? "block" : "none" }
      },
      /* @__PURE__ */ e.createElement(a, null)
    )
  ), /* @__PURE__ */ e.createElement(Ie, null), /* @__PURE__ */ e.createElement(ye, null));
}
function at({ ...r }) {
  const [d, u] = e.useState({
    showChat: !1,
    unreadMessages: 0
  }), a = Z([v.Source.Microphone]);
  return q(), /* @__PURE__ */ e.createElement(J, { onWidgetChange: u }, /* @__PURE__ */ e.createElement("div", { className: "lk-audio-conference", ...r }, /* @__PURE__ */ e.createElement("div", { className: "lk-audio-conference-stage" }, /* @__PURE__ */ e.createElement(Pe, { tracks: a }, /* @__PURE__ */ e.createElement(Me, null))), /* @__PURE__ */ e.createElement(
    te,
    {
      controls: { microphone: !0, screenShare: !1, camera: !1, chat: !0 }
    }
  ), d.showChat && /* @__PURE__ */ e.createElement(ee, null)));
}
function nt({
  controls: r,
  saveUserChoices: d = !0,
  theme: u = "dark",
  variant: a = "glass",
  density: C = "comfortable",
  onDeviceError: g,
  ...f
}) {
  const i = { leave: !0, microphone: !0, ...r }, s = X(), { microphoneTrack: I, localParticipant: t } = je(), p = e.useMemo(() => ({
    participant: t,
    source: v.Source.Microphone,
    publication: I
  }), [t, I]);
  s ? i.microphone ?? (i.microphone = s.canPublish) : i.microphone = !1;
  const o = Y(
    {
      className: `lk-agent-control-bar lk-agent-control-bar-theme-${u} lk-agent-control-bar-variant-${a} lk-agent-control-bar-density-${C}`,
      "data-lk-agent-theme": u,
      "data-lk-agent-variant": a,
      "data-lk-agent-density": C
    },
    f
  ), { saveAudioInputEnabled: k, saveAudioInputDeviceId: l } = W({
    preventSave: !d
  }), m = e.useCallback(
    (n, h) => {
      h && k(n);
    },
    [k]
  );
  return /* @__PURE__ */ e.createElement("div", { ...o }, i.microphone && /* @__PURE__ */ e.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ e.createElement(
    R,
    {
      source: v.Source.Microphone,
      showIcon: !0,
      onChange: m,
      onDeviceError: (n) => g == null ? void 0 : g({ source: v.Source.Microphone, error: n })
    },
    /* @__PURE__ */ e.createElement(Ne, { trackRef: p, barCount: 7, options: { minHeight: 5 } })
  ), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(
    O,
    {
      kind: "audioinput",
      onActiveDeviceChange: (n, h) => l(h ?? "default")
    }
  ))), i.leave && /* @__PURE__ */ e.createElement(H, null, "Отключиться"), /* @__PURE__ */ e.createElement(z, null));
}
export {
  at as A,
  ee as C,
  O as M,
  et as P,
  tt as V,
  Ge as a,
  te as b,
  nt as c,
  Ze as u
};
//# sourceMappingURL=prefabs-CZ6hGPtR.mjs.map
