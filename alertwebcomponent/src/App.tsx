import { useState, useCallback, useEffect } from "react";
import AlertBox from "ace-editor-webcomponent/react";

const types = ["note", "tip", "important", "warning", "caution"] as const;

type AlertType = (typeof types)[number] | "";

interface AlertInstance {
  id: number;
  type: AlertType;
  alert: string;
  oneline: boolean;
  content: string;
}

function App() {
  const [alerts, setAlerts] = useState<AlertInstance[]>([
    { id: 1, type: "note", alert: "Custom Label 1", oneline: false, content: "Content for alert 1" },
    { id: 2, type: "tip", alert: "Custom Label 2", oneline: true, content: "Content for alert 2" },
    { id: 3, type: "warning", alert: "Custom Label 3", oneline: false, content: "Content for alert 3" },
  ]);

  const { width: sidebarWidth, isResizing, startResizing } = useResizer(300);

  const updateAlert = (id: number, field: keyof AlertInstance, value: string | boolean) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  return (
    <div style={{ display: "flex", gap: "10px", padding: "20px", userSelect: isResizing ? "none" : "auto" }}>
      <div style={{ width: `${sidebarWidth}px`, minWidth: "100px", paddingRight: "10px" }}>
        {alerts.map((a) => (
          <div key={a.id}>
            <hr />
            <div>
              <label>Type:</label>
              <br />
              <label>
                <input
                  type="radio"
                  name={`type-${a.id}`}
                  value=""
                  checked={a.type === ""}
                  onChange={(e) => updateAlert(a.id, "type", e.target.value)}
                />
                (none) &nbsp;
              </label>
              {types.map((t) => (
                <label key={t}>
                  <input
                    type="radio"
                    name={`type-${a.id}`}
                    value={t}
                    checked={a.type === t}
                    onChange={(e) => updateAlert(a.id, "type", e.target.value)}
                  />
                  {t}
                  &nbsp;
                </label>
              ))}
            </div>
            <div>
              <label>Alert:</label>
              <br />
              <input type="text" value={a.alert} onChange={(e) => updateAlert(a.id, "alert", e.target.value)} />
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={a.oneline}
                  onChange={(e) => updateAlert(a.id, "oneline", e.target.checked)}
                />
                Oneline
              </label>
            </div>
            <div>
              <label>Content:</label>
              <br />
              <textarea value={a.content} onChange={(e) => updateAlert(a.id, "content", e.target.value)} />
            </div>
            <br />
          </div>
        ))}
      </div>

      <div
        onMouseDown={startResizing}
        style={{
          width: "4px",
          cursor: "col-resize",
          background: isResizing ? "#0969da" : "#ccc",
          transition: "background 0.2s",
        }}
      />

      <div style={{ flex: 1, paddingLeft: "10px" }}>
        {alerts.map((a) => (
          <div key={a.id}>
            <p>Instance {a.id}:</p>
            <AlertBox type={a.type || undefined} alert={a.alert} oneline={a.oneline}>
              {a.content}
            </AlertBox>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

function useResizer(initialWidth: number) {
  const [width, setWidth] = useState(() => {
    const saved = localStorage.getItem("sidebarWidth");
    return saved ? parseInt(saved, 10) : initialWidth;
  });
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    localStorage.setItem("sidebarWidth", width.toString());
  }, [width]);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        setWidth(mouseMoveEvent.clientX);
      }
    },
    [isResizing],
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return { width, isResizing, startResizing };
}
