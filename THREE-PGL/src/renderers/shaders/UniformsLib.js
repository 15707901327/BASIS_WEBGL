import {Color} from "../../math/Color.js";

var UniformsLib = {
  common: {
    diffuse: {value: new Color(0xeeeeee)},
    opacity: {value: 1.0},

    map: {value: null}
  },
  points: {
    size: {value: 1.0},
    diffuse: {value: new Color(0xeeeeee)}
  },
  lights: {
    ambientLightColor: {value: []},
    directionalLights: {
      value: [], properties: {
        direction: {},
        color: {},

        shadow: {},
        shadowBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    }
  }
};

export {UniformsLib};