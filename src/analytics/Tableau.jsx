"use client"
import React, { useEffect } from 'react';

const TableauVizStory = () => {
  useEffect(() => {
    const divElement = document.getElementById('viz1723338695498');
    const vizElement = divElement.getElementsByTagName('object')[0];

    vizElement.style.width = '1250px';
    vizElement.style.height = '947px';

    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }, []);

  return (
    <div className='tableauPlaceholder' id='viz1723338695498' style={{ position: 'relative' }}>
      <noscript>
        <a href='#'>
          <img
            alt='Story 1'
            src='https://public.tableau.com/static/images/PY/PYDS59SMD/1_rss.png'
            style={{ border: 'none' }}
          />
        </a>
      </noscript>
      <object
        className='tableauViz'
        style={{ display: 'none' }}
      >
        <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
        <param name='embed_code_version' value='3' />
        <param name='path' value='shared/PYDS59SMD' />
        <param name='toolbar' value='yes' />
        <param name='static_image' value='https://public.tableau.com/static/images/PY/PYDS59SMD/1.png' />
        <param name='animate_transition' value='yes' />
        <param name='display_static_image' value='yes' />
        <param name='display_spinner' value='yes' />
        <param name='display_overlay' value='yes' />
        <param name='display_count' value='yes' />
        <param name='language' value='en-US' />
        <param name='filter' value='publish=yes' />
      </object>
    </div>
  );
};

export default TableauVizStory;
