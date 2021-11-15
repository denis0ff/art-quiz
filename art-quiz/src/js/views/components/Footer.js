export const Footer = {
  render: async () => {
    let view = /*html*/ `
    <a class="rs-school" href="https://rs.school/js/"></a>
    <span class="app-date">2021</span>
    <a class="my-git" href="https://github.com/denis0ff"></a>
  `;
    return view;
  },
  after_render: async () => {},
};
