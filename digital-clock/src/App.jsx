import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());
  const [format, setFormat] = useState("12");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const displayHours =
    format === "12"
      ? String(hours % 12 || 12).padStart(2, "0")
      : String(hours).padStart(2, "0");

  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";

  const day = time.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const fullDate = time.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <main className="page">
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>

      <nav className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">◷</span>
          <span>Chrono<span className="brand-highlight">.</span></span>
        </a>

        <div className="nav-badge">
          <span className="live-dot"></span>
          LIVE TIME
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="eyebrow">
          <span className="eyebrow-line"></span>
          YOUR PERSONAL TIMEPIECE
          <span className="eyebrow-line"></span>
        </div>

        <h1>
          Every second
          <br />
          <span>matters.</span>
        </h1>

        <p className="description">
          A little moment of calm in your busy day.
        </p>

        <div className="clock-card">
          <div className="card-top">
            <div className="card-label">
              <span className="sun-icon">✳</span>
              LOCAL TIME
            </div>

            <div className="timezone">
              <span className="timezone-dot"></span>
              {timeZone || "Local timezone"}
            </div>
          </div>

          <div className="clock-display" aria-live="off">
            <span className="digit">{displayHours}</span>
            <span className="colon">:</span>
            <span className="digit">{minutes}</span>
            <span className="seconds-group">
              <span className="colon seconds-colon">:</span>
              <span className="seconds">{seconds}</span>
            </span>

            {format === "12" && (
              <span className="period">{period}</span>
            )}
          </div>

          <div className="clock-divider"></div>

          <div className="date-row">
            <div className="calendar-icon">
              <span>▦</span>
            </div>

            <div className="date-info">
              <span className="weekday">{day}</span>
              <span className="full-date">{fullDate}</span>
            </div>

            <div className="format-switch">
              <button
                className={format === "12" ? "active" : ""}
                onClick={() => setFormat("12")}
                aria-pressed={format === "12"}
              >
                12H
              </button>

              <button
                className={format === "24" ? "active" : ""}
                onClick={() => setFormat("24")}
                aria-pressed={format === "24"}
              >
                24H
              </button>
            </div>
          </div>
        </div>

        <div className="feature-row">
          <div className="feature">
            <span className="feature-icon">◷</span>
            <div>
              <strong>Real-time</strong>
              <span>Updates every second</span>
            </div>
          </div>

          <div className="feature">
            <span className="feature-icon">⌘</span>
            <div>
              <strong>Your time zone</strong>
              <span>Automatically detected</span>
            </div>
          </div>

          <div className="feature">
            <span className="feature-icon">◇</span>
            <div>
              <strong>Made for everyone</strong>
              <span>Fits every screen</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>MAKE EVERY SECOND COUNT.</span>
        <span>CRAFTED WITH ♥</span>
      </footer>
    </main>
  );
}

export default App;