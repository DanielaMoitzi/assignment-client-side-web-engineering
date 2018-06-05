const html = require('choo/html');

module.exports = (state, prev, send) => html`
  <main>
    <blockquote>
      “Don’t give up, the beginning is always the hardest.”
    </blockquote>
    <button class="track track_a">TRACK A</button>
    <button class="track track_b">TRACK B</button>
  </main>
`;
