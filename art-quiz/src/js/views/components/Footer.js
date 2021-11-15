export const Footer = {
  render: async () => {
    let view = /*html*/ `
    <a class="rs-school" href="https://rs.school/js/"></a>
    <div class="about__wr">
        <span class="app-date">2021</span>
        <a class="my-git" href="https://github.com/denis0ff"></a>
    </div>
  `;
    return view;
  },
  after_render: async () => {},
};
