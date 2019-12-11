/**
 * 管理灯光
 * @param lxIn
 * @param lyIn
 * @param lzIn
 * @constructor
 */
function LightManager(lxIn, lyIn, lzIn) {
  this.lx = lxIn;
  this.ly = lyIn;
  this.lz = lzIn;

  this.setLightLocation = function(lxIn, lyIn, lzIn) {
    this.lx = lxIn;
    this.ly = lyIn;
    this.lz = lzIn;
  };
}

export default LightManager;

