


```
import { useEffect, useRef, useState } from "react";

export default function ChatInput({ handleSubmit, input, setInput, isProcessing, isFirstInteraction }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const fileRef = useRef(null);

  // Close on outside click or ESC
  useEffect(() => {
    function onDown(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) setOpen(false);
    }
    function onEsc(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className={`chat-input ${isFirstInteraction ? "centered" : "bottom"}`}
    >
      {/* + attach button (INSIDE the bar) */}
      <button
        type="button"
        className="icon-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden>＋</span>
        <span className="sr-only">Open attach menu</span>
      </button>

      {/* message field */}
      <input
        className="message-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message here…"
      />

      {/* send */}
      <button type="submit" className="send-btn" disabled={!input.trim() || isProcessing}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* floating menu */}
      {open && (
        <div className="attach-popover" role="menu" ref={menuRef}>
          <button
            type="button"
            className="menu-item"
            role="menuitem"
            onClick={() => fileRef.current?.click()}
          >
            {/* paperclip icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 8L10 19a6 6 0 1 1-8-8L13 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Upload a file
          </button>

          {/* add more items here (e.g., screenshot, from GitHub, etc.) */}
          {/* <button className="menu-item" role="menuitem">…</button> */}

          <input
            ref={fileRef}
            type="file"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                console.log("Selected:", f);
                // handle file here
              }
              setOpen(false);
            }}
          />
        </div>
      )}
    </form>
  );
}


/* Chat bar container */
.chat-input {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 8px 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

/* left + button (inside the border) */
.icon-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  background: #f7f7f8;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
}
.icon-btn:hover { background: #eee; }

/* text field */
.message-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  min-width: 0; /* avoid overflow */
}

/* send button */
.send-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 10px;
  background: #e8b6a7; /* tweak to your palette */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.send-btn:disabled { opacity: 0.6; cursor: not-allowed; }

/* floating white panel */
.attach-popover {
  position: absolute;
  bottom: calc(100% + 10px);  /* open upward from the bar */
  left: 8px;                  /* align under the + button */
  width: 360px;
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
  padding: 8px;
  z-index: 50;
}

/* menu item rows */
.menu-item {
  width: 100%;
  padding: 12px 14px;
  border: none;
  background: transparent;
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  border-radius: 10px;
}
.menu-item:hover { background: #f6f6f7; }

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}




```


# Getting Started with Create React App

# LIVE DEMO
https://lens-20b4b.web.app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
z
### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
