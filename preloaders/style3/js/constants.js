function getConstants() {
  const point = {};
  const center = {};
  const canvas = {};

  canvas['css'] = {};
  canvas['colour'] = {};
  canvas['css']['position'] = 'absolute';
  canvas['css']['top'] = canvas['css']['left'] = '0px';
  canvas['css']['background-color'] = canvas['colour']['dark'] = '#1C1C1C';
  canvas['colour']['primary'] = '#DC00DC';
  canvas['colour']['light'] = '#FFFFFF';
  canvas['frameRate'] = 100;

  center['radius'] = 80;
  center['pointsCount'] = 120;

  point['radius'] = 2;
  point['pathAmplitude'] = 120;
  point['pathDeviation'] = 30;

  return {
    canvas: canvas,
    center: center,
    point: point
  };
}
