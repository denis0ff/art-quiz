export const Header = {
  render: async () => {
    let view = /*html*/ `
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <a class="navbar-item" href="/#/">
            Home
          </a>
          <a class="navbar-item" href="/#/settings">
            Settings
          </a>
        </nav>
        `;
    return view;
  },
  after_render: async () => {},
};
