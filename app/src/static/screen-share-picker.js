const { ipcRenderer } = require('electron');
// clipboard
// contextBridge
// crashReporter
// ipcRenderer
// nativeImage
// shell
// webFrame
const log = console.log;

const run = async () => {
  const fullScreenContainer = document.getElementById('fullscreen-container');

  const fullScreenButton = document.getElementById('full-screen-button');

  const sources = await ipcRenderer.invoke('desktop-capturer-get-sources');

  console.log(sources);

  // const entireScreenSources = sources.filter(source => source.id.includes('screen'));
  //
  // const windowSources = sources.filter(source => source.id.includes('window'));

  sources.forEach((source, index) => {
    const container = document.createElement('div');
    container.classList.add('source-container');
    container.innerHTML = `
    <h3>Screen ${index + 1}</h3>
      <img class="source-thumbnail" src="${source.thumbnail.toDataURL({
        scaleFactor: 100,
      })}" />
    `;

    const button = document.createElement('button');

    button.innerText = 'Start Screen Share';

    button.onclick = async () => {
      await ipcRenderer.invoke('start-screen-share', source);
    };

    container.appendChild(button);
    fullScreenContainer.appendChild(container);
  });
};

window.onload = run;
