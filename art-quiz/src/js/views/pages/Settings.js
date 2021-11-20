export const Settings = {
  render: async (input) => {
    const { settings } = input;
    const { volume } = settings;
    const { time } = settings;
    const volumeClass = volume ? '' : 'mute';
    const timeContent = time ? `Limit: ${time} seconds` : 'No Limit';
    return `
    <div class="settings">
      <h4 class="settings-field-header">Volume</h4>
      <div class="settings-field">
        <span class="volume ${volumeClass}" id="soundValue"></span>
        <input type="range" name="" id="soundSettings" value="${volume}" min="0" max="100" step="5"/>
      </div>
      <h4 class="settings-field-header">Round Time</h4>
      <div class="settings-field">
        <span class="settings-timer" id="timeValue">${timeContent}</span>
        <input type="range" name="" id="timeSettings" value="${time}" min="0" max="30" step="5"/>
      </div>
      <div class="settings-field">
        <a class="button" id="resetSettings">Reset</a>
        <a href="./#/" class="button" id="submitSettings">Submit</a>
      </div>
    </div>
    `;
  },
  after_render: async (input) => {
    const { settings } = input;
    const buttonReset = document.getElementById('resetSettings');
    const soundInput = document.getElementById('soundSettings');
    const timeInput = document.getElementById('timeSettings');
    const soundValue = document.getElementById('soundValue');
    const timeValue = document.getElementById('timeValue');
    const currentSettings = {
      time: timeInput.value,
      volume: soundInput.value,
    };
    soundInput.onchange = (e) => {
      const { value } = e.target;
      if (+value) soundValue.classList.remove('mute');
      else soundValue.classList.add('mute');
      settings.volume = value;
    };

    timeInput.onchange = (e) => {
      const { value } = e.target;
      if (+value) timeValue.textContent = `Limit: ${value} seconds`;
      else timeValue.textContent = 'No Limit';
      if (value) settings.time = value < 10 ? `0${value}` : `${value}`;
      else settings.time = value;
    };

    buttonReset.onclick = () => {
      soundInput.value = currentSettings.volume;
      timeInput.value = currentSettings.time;
    };
  },
};

export default Settings;
