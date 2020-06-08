import React from 'react';
import * as PropTypes from 'prop-types';

export default function Error404Gif({ small, style }) {
  const errorGifs = [
    'https://media.giphy.com/media/TNf5oSRelTeI8',
    'https://media.giphy.com/media/ZUdJFU0tbEpnW',
    'https://media.giphy.com/media/26FPGt0CsPqPAmXg4',
    'https://media.giphy.com/media/l0Iyh3gFEvueA6guI',
    'https://media.giphy.com/media/H4KlAsvtVSaykHv7lY',
    'https://media.giphy.com/media/14uQ3cOFteDaU',
    'https://media.giphy.com/media/9J7tdYltWyXIY',
    'https://media.giphy.com/media/sSmxfWnEVxtWU',
  ];
  const selected = errorGifs[Math.floor(Math.random() * errorGifs.length)];
  const normalGif = `${selected}/giphy.gif`;
  const smallGif = `${selected}/200w_d.gif`;
  const loadingGif = small ? smallGif : normalGif;

  return <img src={loadingGif} style={style} alt="Not Found 404" />;
}

Error404Gif.propTypes = {
  small: PropTypes.bool,
  style: PropTypes.object,
};
