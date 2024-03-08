import React, { useEffect, useState } from 'react';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
import { create, all } from 'mathjs';
const math = create(all)
math.import({ln: math.log})

const PlotlyComponent = createPlotlyComponent(Plotly);

export default function Graph({ func }) {
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);

  useEffect(() => {
    const x = [];
    for (let i = -2; i <= 2; i += 0.1) {
      x.push(i);
    }

    const y = x.map((value) => math.evaluate(func, {x:value}));

    setXValues(x);
    setYValues(y);
    console.log(func)
  }, [func]);

  const data = [
    {
      type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
      mode: 'lines',
      x: xValues,     // more about "x": #scatter-x
      y: yValues,     // #scatter-y
      marker: {         // marker is an object, valid marker keys: #scatter-marker
        color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
      }
    },
  ];
  const layout = {                     // all "layout" attributes: #layout
    title: '',  // more about "layout.title": #layout-title
    xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
      title: 'y'         // more about "layout.xaxis.title": #layout-xaxis-title
    },
    yaxis: {
      title: 'x'
    },
    /*
    annotations: [            // all "annotation" attributes: #layout-annotations
      {
        text: 'simple annotation',    // #layout-annotations-text
        x: 0,                         // #layout-annotations-x
        xref: 'paper',                // #layout-annotations-xref
        y: 0,                         // #layout-annotations-y
        yref: 'paper'                 // #layout-annotations-yref
      }
    ]
    */
  };
  let config = {
    showLink: false,
    displayModeBar: true
  };
  return (
    <PlotlyComponent className="" data={data} layout={layout} config={config}/>
  );
};
