export const Settings = {
  render: async () => /* html */ `
    <form class="settings">
      <fieldset class="volume-field">
        <legend class="volume-header">Volume</legend>
        <input type="range" name="" id="" value="0"/>
        <span class="volume-mute"></span>
        <span class="volume-plus"></span>
      </fieldset>
      <fieldset class="settings-game-time">
        <legend class="game-header">Time Game</legend>
        <input type="radio" name="" id="" />
      </fieldset>
      <fieldset class="settings-answer-time">
        <legend class="time-header">Time Game</legend>
        <input type="number" name="" id="" min="10" max="60" />
      </fieldset>
      <button type="reset" id="resetSettings"></button>
      <button type="submit" id="submitSettings"></button>
    </form>
    `,
  after_render: async () => {},
};

export default Settings;
