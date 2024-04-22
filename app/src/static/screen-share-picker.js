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

  const windowsContainer = document.getElementById('windows-container');

  const sources = ( await ipcRenderer.invoke('desktop-capturer-get-sources') ).filter((item) => !item.name.includes("nativefier"))

  console.log(sources);

  const entireScreenSources = sources.filter(source => source.id.includes('screen'));
  //
  const windowSources = sources.filter(source => source.id.includes('window'));

  entireScreenSources.forEach((source, index) => {
    const container = document.createElement('div');
    container.classList.add('source-container');
    container.innerHTML = `
      <h2>Screen ${index + 1}</h2>
      <img class="source-thumbnail" src="${source.thumbnail.toDataURL()}" />
    `;

    container.onclick = async () => {
      await ipcRenderer.invoke('start-screen-share', source);
    };

    fullScreenContainer.appendChild(container);
  });

  windowSources.forEach((source) => {
    const container = document.createElement('div');
    container.classList.add('source-container');
    container.innerHTML = `
      <h2>${source.name}</h2>
      <img class="source-thumbnail" src="${source.thumbnail.toDataURL()}" />
    `;

    container.onclick = async () => {
      await ipcRenderer.invoke('start-screen-share', source);
    };

    windowsContainer.appendChild(container);
  });
};

window.onload = run;
