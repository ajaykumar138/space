const TILE_TEMPLATE = `
  <div class="tile">
    <div class="tile-image">
      <img loading="lazy" alt="" />
    </div>
    <h3 class="tile-title"></h3>
    <p class="tile-description"></p>
  </div>
`;

function createTile(data) {
  const template = document.createElement('template');
  template.innerHTML = TILE_TEMPLATE.trim();
  const tile = template.content.firstElementChild;

  tile.querySelector('img').src = data.image;
  tile.querySelector('img').alt = data.title;
  tile.querySelector('.tile-title').textContent = data.title;
  tile.querySelector('.tile-description').textContent = data.description;

  return tile;
}

export default async function decorate(block) {
  const tilesContainer = document.createElement('div');
  tilesContainer.classList.add('tiles-container');

  const rows = [...block.children];
  rows.forEach((row) => {
    const data = {};
    const cells = [...row.children];
    if (cells.length >= 3) {
      data.image = cells[0].querySelector('img').src;
      data.title = cells[1].textContent;
      data.description = cells[2].textContent;
      tilesContainer.appendChild(createTile(data));
    }
  });
  block.innerHTML = '';
  block.appendChild(tilesContainer);
}
