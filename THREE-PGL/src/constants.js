// 定义常量
var PGL = {
    REVISION: 1, // 版本
    MOUSE: {LEFT: 0, MIDDLE: 1, RIGHT: 2},

    NoColors: 0, // 不使用颜色
    FaceColors: 1, // 面颜色
    VertexColors: 2, // 顶点颜色

    TrianglesDrawMode: 0, // 绘制三角形
    TriangleStripDrawMode: 1, // 带状的三角形
    TriangleFanDrawMode: 2,// 扇形的图形

    UVMapping: 300,

    RepeatWrapping: 1000,
    ClampToEdgeWrapping: 1001,
    MirroredRepeatWrapping: 1002,

    NearestFilter: 1003,
    NearestMipMapNearestFilter: 1004,
    NearestMipMapLinearFilter: 1005,
    LinearFilter: 1006,
    LinearMipMapNearestFilter: 1007,
    LinearMipMapLinearFilter: 1008,

    UnsignedByteType: 1009,
    ByteType: 1010,
    ShortType: 1011,
    UnsignedShortType: 1012,
    IntType: 1013,
    UnsignedIntType: 1014,
    FloatType: 1015,
    HalfFloatType: 1016,
    UnsignedShort4444Type: 1017,
    UnsignedShort5551Type: 1018,
    UnsignedShort565Type: 1019,
    UnsignedInt248Type: 1020,

    AlphaFormat: 1021,
    RGBFormat: 1022,
    RGBAFormat: 1023,
    LuminanceFormat: 1024,
    LuminanceAlphaFormat: 1025,
    RGBEFormat: 1023,
    DepthFormat: 1026,
    DepthStencilFormat: 1027,
    RGB_S3TC_DXT1_Format: 33776,
    RGBA_S3TC_DXT1_Format: 33777,
    RGBA_S3TC_DXT3_Format: 33778,
    RGBA_S3TC_DXT5_Format: 33779,
    RGB_PVRTC_4BPPV1_Format: 35840,
    RGB_PVRTC_2BPPV1_Format: 35841,
    RGBA_PVRTC_4BPPV1_Format: 35842,
    RGBA_PVRTC_2BPPV1_Format: 35843,
    RGB_ETC1_Format: 36196,
    RGBA_ASTC_4x4_Format: 37808,
    RGBA_ASTC_5x4_Format: 37809,
    RGBA_ASTC_5x5_Format: 37810,
    RGBA_ASTC_6x5_Format: 37811,
    RGBA_ASTC_6x6_Format: 37812,
    RGBA_ASTC_8x5_Format: 37813,
    RGBA_ASTC_8x6_Format: 37814,
    RGBA_ASTC_8x8_Format: 37815,
    RGBA_ASTC_10x5_Format: 37816,
    RGBA_ASTC_10x6_Format: 37817,
    RGBA_ASTC_10x8_Format: 37818,
    RGBA_ASTC_10x10_Format: 37819,
    RGBA_ASTC_12x10_Format: 37820,
    RGBA_ASTC_12x12_Format: 37821,

    LinearEncoding: 3000,
    sRGBEncoding: 3001,
    GammaEncoding: 3007,
    RGBEEncoding: 3002,
    LogLuvEncoding: 3003,
    RGBM7Encoding: 3004,
    RGBM16Encoding: 3005,
    RGBDEncoding: 3006,
};