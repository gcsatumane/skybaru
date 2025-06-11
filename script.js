const editor = document.getElementById('editor');
const output = document.getElementById('output');
const runBtn = document.getElementById('runBtn');

runBtn.addEventListener('click', () => {
  const code = editor.value;
  try {
    // Redirect console.log to output
    let consoleOutput = '';
    const originalLog = console.log;
    console.log = (...args) => {
      consoleOutput += args.join(' ') + '\n';
    };

    // Run user code
    new Function(code)();

    // Restore console.log
    console.log = originalLog;

    output.textContent = consoleOutput || 'Code ran successfully (no output)';
  } catch (e) {
    output.textContent = 'Error: ' + e.message;
  }
});

// Load saved code from localStorage
window.onload = () => {
  const savedCode = localStorage.getItem('jsCode');
  if (savedCode) editor.value = savedCode;
};

// Save code to localStorage on every change
editor.addEventListener('input', () => {
  localStorage.setItem('jsCode', editor.value);
});
