export const Settings = {
  render: async () => /* html */ `
    <div class="settings">
      <h4 class="settings-field-header">Volume</h4>
      <div class="settings-field">
        <span class="volume-mute"></span>
        <input type="range" name="" id="" value="0"/>
        <span class="volume-plus"></span>
      </div>
      <h4 class="settings-field-header">Round Time</h4>
      <div class="settings-field">
        <input type="range" name="" id="" value="0" min="0" max="30" />
      </div>
      <button type="reset" id="resetSettings"></button>
      <button type="submit" id="submitSettings"></button>
    </div>
    `,
  after_render: async () => {},
};

export default Settings;
