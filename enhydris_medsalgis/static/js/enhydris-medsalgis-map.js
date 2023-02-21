Object.assign(enhydris.map, {
  create() {
      this.setUpMap();
      this.setupStationsLayer();
      if (enhydris.mapMode === 'many-stations') {
        this.addGeoOverlayLayers();
      }
  },

  addGeoOverlayLayers() {
    const str = enhydris.medsalgis.strings;
    const medsal_ows_url = enhydris.medsalgis.ows_url;
    const bgr_de_ows_url = 'https://services.bgr.de/wms/grundwasser/ihme1500/';
    this.addWmsLayer(medsal_ows_url, 'Watercourses', str.Watercourses, '#33CCFF', '⌇', false);
    this.addWmsLayer(medsal_ows_url, 'StandingWaters', str.StandingWaters, '#33CCFF', '■', false);
    this.addWmsLayer(medsal_ows_url, 'DrainageBasins06', str.DrainageBasins06, '#0066FF', '▮', false);
    this.addWmsLayer(medsal_ows_url, 'DrainageBasins07', str.DrainageBasins07, '#0066FF', '▮', false);
    this.addWmsLayer(bgr_de_ows_url, '2', str.AquiferType, '#FFFFFF', ' ', false);
    this.addWmsLayer(bgr_de_ows_url, '7', str.SeawaterIntrusion, '#FFFFFF', ' ', false);
  },

  /* This is a replacement for BetterWMS's getFeatureInfoUrl() which adds the
  * feature_count parameter. It is used in addMedsalLayer() below to monkey patch
  * layer.getFeatureInfoUrl().
  */
  getFeatureInfoUrl(latlng) {
    const map = this._map; /* eslint no-underscore-dangle: "off" */
    const url = this._url; /* eslint no-underscore-dangle: "off" */
    const point = map.latLngToContainerPoint(latlng, map.getZoom());
    const size = map.getSize();

    const params = {
      request: 'GetFeatureInfo',
      service: 'WMS',
      srs: 'EPSG:4326',
      styles: this.wmsParams.styles,
      transparent: this.wmsParams.transparent,
      version: this.wmsParams.version,
      format: this.wmsParams.format,
      bbox: map.getBounds().toBBoxString(),
      height: size.y,
      width: size.x,
      layers: this.wmsParams.layers,
      query_layers: this.wmsParams.layers,
      info_format: 'text/html',
      feature_count: '5',
    };

    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

    return url + L.Util.getParamString(params, url, true);
  },

  addWmsLayer(ows_url, name, legendText, legendSymbolColor, legendSymbol, initiallyVisible) {
    const layer = L.tileLayer.betterWms(ows_url, {
      layers: name,
      format: 'image/png',
      transparent: true,
    });
    layer.getFeatureInfoUrl = this.getFeatureInfoUrl;
    const legend = `<span style="color: ${legendSymbolColor}; font-size: large">${
      legendSymbol}</span> ${legendText}`;
    this.layerControl.addOverlay(layer, legend);
    if (initiallyVisible) {
      layer.addTo(this.leafletMap);
    }
  },
});
