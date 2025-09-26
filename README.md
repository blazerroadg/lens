


```
<form 
  onSubmit={handleSubmit} 
  className={`chat-input ${isFirstInteraction ? 'centered' : 'bottom'}`}
>
  {/* Attach button */}
  <button 
    type="button" 
    className="chat-attach-button"
    onClick={() => document.getElementById('fileInput').click()}
  >
    +
  </button>
  <input
    id="fileInput"
    type="file"
    style={{ display: 'none' }}
    onChange={(e) => console.log("File selected:", e.target.files[0])}
  />

  {/* Message input */}
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Type your message here..."
  />

  {/* Send button */}
  <button 
    type="submit" 
    className="chat-input-button" 
    disabled={!input.trim() || isProcessing}
  >
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  </button>
</form>


.chat-attach-button {
  background: #eee;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  cursor: pointer;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
}
.chat-attach-button:hover {
  background: #ddd;
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
