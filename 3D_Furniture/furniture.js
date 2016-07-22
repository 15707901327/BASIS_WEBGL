/**
 * Created by 1231 on 2016/5/10.
 */
/*场景
 var Scene = {
 //三维实体
 "ObjectList" : [{
 "Object" : {
 "class" : "mesh",
 "name"  : "地面#16",
 "width" : "4065.00",
 "length": "4187.00",
 "height": "0.00",
 "pos"   : [
 "x":"0",
 "y":"0",
 "z":"0"
 ],
 "rot"  : [
 "x":"0",
 "y":"0",
 "z":"0"
 ],
 "Vertices" : [{
 "Vertex" : {
 "pos" : [
 "x":"-3877",
 "y":"1687",
 "z":"0"
 ],
 "normal":[
 "x":"0",
 "y":"0",
 "z":"100"],
 "uv":"0.999508,-1"
 }
 }],
 "Faces":[{
 "Face" : {
 "index":"0,4,5"
 }
 }]

 }
 }],
 //灯光
 "LightList" = [{

 }],
 //相机
 "CameraList" = [{

 }]
 };
 */
var XML_D = {
    /**数据域**/
    DtaFields : {
        /**保存对当前选中物体的操作数据**/
        CurrentGeometry : {
            //当前选中几何体
            geometry : null
        },
        /**保存柜子的修改信息**/
        updateDate : {
            ComposeList : {},
            ObjectList : [],
            ComposeGroup : []
        }
    },

    /* 初始化数据 */
    initDate : {
        /* 初始化数据 */
        initData : {

            INTERSECTED: null,

            //点击过的物体
            mesh : null,
            //用于控制
            controls:null,

            //放置canvas的div对象
            container : null || {}
        },

        /* 初始化UI的数据*/
        UIDate : {
            checked : false, //判断操作的是整个柜体，还是柜体的部件，false 整个柜体 true 柜体的部件

            splineObject:null,

            text : {}
        },

        /* 初始化Three */
        initThree : {

            renderer : {},
            initRenderer : function () {
                var container = document.createElement( 'div' );
                document.body.appendChild( container );
                XML_D.init.initData.container = container;

                var renderer = new THREE.WebGLRenderer({
                    antialias : true
                });

                renderer.setClearColor(0xAAAAAA, 1.0);
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);

                container.appendChild(renderer.domElement);
                XML_D.init.initThree.renderer = renderer;
            },

            camera : {},
            initCamera : function () {
                var camera = new THREE.PerspectiveCamera(45, window.innerWidth /  window.innerHeight, 1, 100000);

                camera.position.set(3000, 3000, 3000);
                camera.lookAt({
                    x : 0,
                    y : 0,
                    z : 0
                });
                XML_D.init.initThree.camera = camera;
            },

            controls : {},
            initControls : function(){
                /**设置相机的照射点
                 * 1. 计算出组合柜的中心，
                 * 2. 设置为相机的照射点**/
                var relative_x = 0;
                var relative_y = 0;
                var relative_z = 0;

                for(var i = 0; i < XML_D.init.initData.scene.ComposeList.length;i++){
                    var x = parseFloat(XML_D.init.initData.scene.ComposeList[i].xpos) + parseFloat(XML_D.init.initData.scene.ComposeList[i].width) - parseFloat(XML_D.init.initData.scene.ComposeList[0].xpos);
                    if(x > relative_x){
                        relative_x = x;
                    }

                    var y = parseFloat(XML_D.init.initData.scene.ComposeList[i].ypos) + parseFloat(XML_D.init.initData.scene.ComposeList[i].depth) - parseFloat(XML_D.init.initData.scene.ComposeList[0].ypos);
                    if(y > relative_y){
                        relative_y = y;
                    }

                    var z = parseFloat(XML_D.init.initData.scene.ComposeList[i].zpos) + parseFloat(XML_D.init.initData.scene.ComposeList[i].height) - parseFloat(XML_D.init.initData.scene.ComposeList[0].zpos);
                    if(z > relative_z){
                        relative_z = z;
                    }
                }

                var center_x = parseFloat(XML_D.init.initData.scene.ComposeList[0].xpos) + relative_x/2;
                var center_y = parseFloat(XML_D.init.initData.scene.ComposeList[0].ypos) + relative_y/2;
                var center_z = parseFloat(XML_D.init.initData.scene.ComposeList[0].zpos) + relative_z/2;

                var cameraControls = new THREE.OrbitControls( XML_D.init.initThree.camera, XML_D.init.initThree.renderer.domElement);
                cameraControls.target.set( center_x, center_z, center_y );
                cameraControls.update();

                cameraControls.addEventListener( 'change', XML_D.init.initThree.renderScene);
                XML_D.init.initThree.controls = cameraControls;
            },

            scene : {},
            initScene : function () {
                var scene = new THREE.Scene();

                ////辅助原点箭头
                //var axes = new THREE.AxisHelper(2000);
                //scene.add(axes);

                 //scene.fog = new THREE.Fog( 0xffffff, 500, 10000 );

                XML_D.init.initThree.scene = scene;
            },

            initLight : function () {
                var light = new THREE.AmbientLight( 0xA0A0A0);
                XML_D.init.initThree.scene.add( light );

                var spotLight = new THREE.SpotLight( 0xC0C0C0 );
                spotLight.position.set( 1000, 3000, 2000 );

                spotLight.castShadow = true;

                spotLight.shadow.mapSize.width = 1024;
                spotLight.shadow.mapSize.height = 1024;

                spotLight.shadow.camera.near = 500;
                spotLight.shadow.camera.far = 4000;
                spotLight.shadow.camera.fov = 30;

                spotLight.penumbra = 0.5;

                XML_D.init.initThree.scene.add( spotLight );
            },

            initObject:   function () {

                var scene = XML_D.init.initThree.scene;
                /***************** 处理SingleGroup集合 *******************************/
                //for(var i = 0;i < 1; i++){
                for(var i = 0;i < XML_D.init.initData.scene.ComposeList.length; i++){

                    var group = new THREE.Object3D();
                    //设置整个柜体的名称
                    group.name = XML_D.init.initData.scene.ComposeList[i].Name;
                    //整个组合柜的id
                    group.NodeID = XML_D.init.initData.scene.ComposeList[i].NodeID;

                    //整体柜的位置
                    var ComposeGroup_xpos = parseFloat(XML_D.init.initData.scene.ComposeList[i].xpos);
                    var ComposeGroup_ypos = parseFloat(XML_D.init.initData.scene.ComposeList[i].ypos);
                    var ComposeGroup_zpos = parseFloat(XML_D.init.initData.scene.ComposeList[i].zpos);
                    group.position.set(ComposeGroup_xpos,ComposeGroup_zpos,ComposeGroup_ypos);

                    console.log(XML_D.init.initData.scene.ComposeList[i]);

                    //整体柜在垂直方向上的转角
                    group.rotateY(-XML_D.Math.Angle.changeToRadian(XML_D.init.initData.scene.ComposeList[i].angle));

                    var ComposeGroup_TempleName = XML_D.init.initData.scene.ComposeList[i].TempleName;
                    //集合体图形的集合
                    var SingleGroupS = XML_D.init.initData.scene.ComposeList[i].SingleGroupS;
                    //遍历图形集合，得到单个组合体图形SingleGroupS.length
                    for(var j = 0; j < SingleGroupS.length; j++){
                        /** SingleGroup柜体组件的位置 **/
                        var xpos = parseFloat(SingleGroupS[j].xpos);
                        var ypos = parseFloat(SingleGroupS[j].ypos);
                        var zpos = parseFloat(SingleGroupS[j].zpos);

                        /***************** 处理ObjectList ****************/
                        //物体列表
                        var ObjectList;
                        if(ObjectList = SingleGroupS[j].ObjectList){
                            //ObjectList.length
                            for(var k = 0; k < ObjectList.length; k++){
                                var Object = ObjectList[k];

                                if(Object.class == "panel"){

                                    var parameter = {
                                        Object : Object,
                                        group : group,
                                        xpos : parseFloat(SingleGroupS[j].xpos),
                                        ypos : parseFloat(SingleGroupS[j].ypos),
                                        zpos : parseFloat(SingleGroupS[j].zpos)
                                    }
                                    XML_D.Material.lodeTexture(parameter,createPanel);

                                    function createPanel(parameter,texture){
                                        var Object = parameter.Object;
                                        var group = parameter.group;

                                        //组件的位置
                                        var xpos = parameter.xpos;
                                        var ypos = parameter.ypos;
                                        var zpos = parameter.zpos;

                                        /**************************** 生成几何体 ***********************/
                                        var width = parseFloat(Object.width);
                                        var height = parseFloat(Object.height);
                                        var depth = parseFloat(Object.depth);
                                        var geometry = new THREE.BoxGeometry( width,height,depth);

                                        /************************ 生成贴图材料 *************************/
                                        var material = new THREE.MeshPhongMaterial( {
                                            color : 0xffffff
                                        });

                                        //设置材料的反光度
                                        if(Object.Material.shininess){
                                            material.shininess = parseFloat(Object.Material.shininess);
                                        }

                                        if(texture){
                                                //设置贴图
                                                material.map = texture;
                                                material.map.wrapS = THREE.RepeatWrapping;
                                                material.map.wrapT = THREE.RepeatWrapping;

                                                //旋转贴图
                                                var rotate = parseFloat(Object.Material.rotate);
                                                if(rotate == 90){
                                                    for(var x = 0;x < geometry.faceVertexUvs[0].length; x++){
                                                        for(var y = 0 ;y < geometry.faceVertexUvs[0][x].length; y++){
                                                            var temp = geometry.faceVertexUvs[0][x][y].x;
                                                            geometry.faceVertexUvs[0][x][y].x = geometry.faceVertexUvs[0][x][y].y;
                                                            geometry.faceVertexUvs[0][x][y].y = temp;
                                                        }
                                                    }
                                                }

                                                /* 设置贴图重复
                                                 * 根据贴图的贴图方向，计算贴图的重复值
                                                 * w : 图片的宽
                                                 * h : 图片的高 */
                                                var w = parseFloat(Object.Material.width);
                                                var h = parseFloat(Object.Material.height);
                                                var x = 1.0, y = 1.0;

                                                //根据贴图的贴图方向，计算贴图的重复值
                                                if(width < length && width < height){
                                                    if(length > w){
                                                        x = length / w;
                                                    }

                                                    if(height > h){
                                                        y = height / h;
                                                    }

                                                }else if(length < width && length < height){
                                                    if(width > w ){
                                                        x = width / w;
                                                    }

                                                    if(height > h){
                                                        y = height / h;
                                                    }
                                                }else{
                                                    if(width > w ){
                                                        x = width / w;
                                                    }

                                                    if(length > h){
                                                        y = length / h;
                                                    }
                                                }

                                                //根据贴图的方向，变换
                                                if(rotate== 90){
                                                    var temp = x ;
                                                    x = y ;
                                                    y = temp;
                                                }
                                                material.map.repeat.set(x,y);
                                            }
                                        /************************ 生成网格 *****************************/
                                        var mesh = new THREE.Mesh( geometry, material );

                                        //设置网格位置
                                        var x = parseFloat(Object.x) + width/2 + xpos;
                                        var y = parseFloat(Object.z) + height/2 + zpos;
                                        var z = parseFloat(Object.y) + depth/2 + ypos;
                                        mesh.position.set(x,y,z);

                                        /** 板件的参数设置**/
                                        mesh.name = Object.Name;
                                        mesh.NodeID = Object.NodeID;

                                        //添加描边
                                        var deges = new THREE.EdgesHelper( mesh, 0x000000);
                                        XML_D.init.initThree.scene.add(deges);

                                        /********** 判断几何体是否显示 ********/
                                        if("visible" in Object){
                                            if(Object.visible == 0 ){
                                                mesh.visible = false;
                                                XML_D.init.initThree.scene.remove(deges);
                                            }
                                        }

                                        //设置是否是独立花色
                                        setKeepmat(mesh);
                                        function setKeepmat(object){
                                            if(object.constructor == THREE.Mesh){
                                                object.keepmat = Object.keepmat;
                                            }else{
                                                for(var kee = 0;kee < object.children.length; kee++){
                                                    setKeepmat(object.children[kee]);
                                                }
                                            }
                                        };

                                        group.add( mesh );
                                    };
                                };

                                /**hbar:水平拉伸 width C-J-X-00003.xml
                                 * vbar:垂直拉伸 height
                                 * dbar:纵向拉升 depth**/
                                if(Object.class == "hbar") {

                                    if(Object.Shape){
                                        //if(false){
                                        var parameter = {
                                            Object : Object,
                                            group : group,
                                            xpos : parseFloat(SingleGroupS[j].xpos),
                                            ypos : parseFloat(SingleGroupS[j].ypos),
                                            zpos : parseFloat(SingleGroupS[j].zpos)
                                        }
                                        XML_D.Material.lodeTexture(parameter,createHbarShape);

                                        function createHbarShape(parameter,texture){
                                            var Object = parameter.Object;
                                            var group = parameter.group;

                                            //组件的位置
                                            var xpos = parameter.xpos;
                                            var ypos = parameter.ypos;
                                            var zpos = parameter.zpos;

                                            /**************************** 生成几何体 ********************/
                                            var shape = XML_D.Path.getStringShape(Object.Shape);
                                            var extrudeSettings = {
                                                amount : parseFloat(Object.width),
                                                bevelEnabled : false
                                            };
                                            var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

                                            /**************************** 生成贴图材料 ********************/
                                            var materials = [];
                                            var material = new THREE.MeshPhongMaterial( {
                                                color : 0xffffff
                                            } );
                                            materials.push(material);

                                            //设置材料的反光度
                                            if(Object.Material.shininess){
                                                material.shininess = parseInt(Object.Material.shininess);
                                            }
                                            //设置材料颜色
                                            if(Object.Material.color.length > 0){
                                                var co = XML_D.Fun.tool.stringToHex(object.Material.color);
                                                material.color = new THREE.Color(co);
                                            }

                                            /******************************************************************/
                                            //3. 设置贴图坐标
                                            var tag = {
                                                state_x : 1,
                                                state_y : 0,
                                                state_z : 1
                                            };
                                            var rotate = parseFloat(Object.Material.rotate);
                                            var parameters = {
                                                rotate : rotate
                                            }
                                            XML_D.Fun.ExtrudeMapUV(tag,geometry,parameters);

                                            /*3. 设置贴图重复
                                             * 根据贴图方向，改变贴图的长宽比值
                                             * 计算贴图重复值
                                             * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                            var x = 1.0;
                                            var y = 1.0;
                                            var height = parseFloat(Object.Material.height);
                                            var width = parseFloat(Object.Material.width);
                                            var depth = parseFloat(Object.Material.depth);

                                            //计算贴图重复值
                                            if(tag.state_x == 0 ){
                                                if(tag.x > width)
                                                    x = tag.x / width;
                                                if(tag.y > height)
                                                    y = tag.y / height;
                                            }
                                            if(tag.state_y == 0 ){
                                                if(tag.x > height)
                                                    y = tag.x / height;
                                                if(tag.y > depth){
                                                    x = tag.y /depth ;
                                                }
                                            }
                                            if(tag.state_z == 0 ){
                                                if(tag.x > width)
                                                    y = tag.x / width;
                                                if(tag.y > height)
                                                    x = tag.y / height;
                                            }

                                            //根据贴图的贴图方向，变换贴图的重复设置
                                            if(rotate == 90){
                                                var temp = x ;
                                                x = y;
                                                y = temp;
                                            }

                                            material.repeat = {x:x,y:y};

                                            //设置材料的贴图
                                            if(texture){
                                                //2. 把贴图添加到几何体
                                                material.map = texture;
                                                material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
                                                material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                            }

                                            /******************************************************************/

                                            /**************************** 创建网格 ********************/
                                            mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);
                                            mesh.position.set(
                                                xpos + parseFloat(Object.x),
                                                zpos + parseFloat(Object.z),
                                                ypos + parseFloat(Object.y)
                                            );

                                            mesh.rotation.x += 2*Math.PI/4;
                                            mesh.rotation.y += 2*Math.PI/4;

                                            /** 板件的参数设置**/
                                            mesh.name = Object.Name;
                                            mesh.NodeID = Object.NodeID;

                                            //添加描边
                                            var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                            XML_D.init.initThree.scene.add(deges);

                                            //设置是否是独立花色
                                            setKeepmat(mesh);
                                            function setKeepmat(object){
                                                if(object.constructor == THREE.Mesh){
                                                    object.keepmat = Object.keepmat;
                                                }else{
                                                    for(var kee = 0;kee < object.children.length; kee++){
                                                        setKeepmat(object.children[kee]);
                                                    }
                                                }
                                            };

                                            group.add( mesh );
                                        };

                                    }else{
                                        //判断几何体侧面数据是否在其他的文件中
                                        if(Object.sect){
                                            //获得XML文件加载路径
                                            var parameter = {
                                                preDir : XML_D.init.initURL.xmlUrl,
                                                number : 1
                                            };
                                            var xml_url = XML_D.URL.transformURL(Object.sect,parameter);

                                            //把函数传入回调函数内部
                                            var param ={
                                                Object : Object,
                                                group : group,
                                                xpos : parseFloat(SingleGroupS[j].xpos),
                                                ypos : parseFloat(SingleGroupS[j].ypos),
                                                zpos : parseFloat(SingleGroupS[j].zpos)
                                            };
                                            XML_D.Utils.XMLHttpRequestObjectPool.sendReq("GET",xml_url,"",param,function(xmlhttp,parameter){
                                                XML_D.Material.lodeTexture(parameter,createHbarSect);
                                                function createHbarSect(parameter,texture){
                                                    var Object = parameter.Object;//当前要显示的对象
                                                    var group = parameter.group;

                                                    /** SingleGroup柜体组件的位置 **/
                                                    var xpos = parameter.xpos;
                                                    var ypos = parameter.ypos;
                                                    var zpos = parameter.zpos;

                                                    /*********************** 读取xml文件 *****************************************/
                                                    Object.cxshapes = XML_D.XML.transformXMLToJson_instance( xmlhttp.responseXML);

                                                    /**************************** 生成几何体 **********************/
                                                    //计算xyz那个轴上的顶点都是0
                                                    var param = {
                                                        arr : Object.cxshapes.shape
                                                    };
                                                    var tag = XML_D.Utils.OperationPoint(param);

                                                    var shape = XML_D.Path.getXMLShape(Object,tag);
                                                    var extrudeSettings = {
                                                        amount : parseFloat(Object.width),
                                                        bevelEnabled : false
                                                    };
                                                    var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

                                                    /**************************** 生成贴图材料 ********************/
                                                    var materials = [];
                                                    var material = new THREE.MeshPhongMaterial( {
                                                        color : 0xffffff
                                                    } );

                                                    //设置材料的反光度
                                                    if(Object.Material.shininess){
                                                        material.shininess = parseInt(Object.Material.shininess);
                                                    }
                                                    //设置材料颜色
                                                    if(Object.Material.color.length > 0){
                                                        var co = XML_D.Fun.tool.stringToHex(object.Material.color);
                                                        material.color = new THREE.Color(co);
                                                    }

                                                    //3. 设置贴图坐标
                                                    var rotate = parseFloat(Object.Material.rotate);
                                                    var parameters = {
                                                        rotate : rotate
                                                    }
                                                    XML_D.Fun.ExtrudeMapUV(tag,geometry,parameters);

                                                    /*3. 设置贴图重复
                                                     * 根据贴图方向，改变贴图的长宽比值
                                                     * 计算贴图重复值
                                                     * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                                    var x = 1.0;
                                                    var y = 1.0;
                                                    var height = parseFloat(Object.Material.height);
                                                    var width = parseFloat(Object.Material.width);

                                                    //计算贴图重复值
                                                    if(tag.state_x == 0 ){
                                                        if(tag.x > width)
                                                            x = tag.x / width;
                                                        if(tag.y > height)
                                                            y = tag.y / height;
                                                    }
                                                    if(tag.state_y == 0 ){
                                                        if(tag.x > width)
                                                            y = tag.x / width;
                                                        if(tag.y > height){
                                                            x = tag.y / height;
                                                        }
                                                    }
                                                    if(tag.state_z == 0 ){
                                                        if(tag.x > width)
                                                            y = tag.x / width;
                                                        if(tag.y > height)
                                                            x = tag.y / height;
                                                    }

                                                    //根据贴图的贴图方向，变换贴图的重复设置
                                                    if(rotate == 90){
                                                        var temp = x ;
                                                        x = y;
                                                        y = temp;
                                                    }
                                                    material.repeat = {x:x,y:y};

                                                    //设置材料的贴图
                                                    if(texture){
                                                        //2. 把贴图添加到几何体
                                                        material.map = texture;
                                                        material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                        material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                                    }
                                                    materials.push(material);

                                                    /**************************** 创建网格 ********************/
                                                    mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);
                                                    mesh.position.set(
                                                        xpos + parseFloat(Object.x),
                                                        zpos + parseFloat(Object.z) - parseFloat(Object.height)*3,
                                                        ypos + parseFloat(Object.y) - parseFloat(Object.depth)/2
                                                    );

                                                    mesh.rotation.y += 2*Math.PI/4;
                                                    mesh.rotation.z += 2*Math.PI/4;

                                                    /** 板件的参数设置**/
                                                    mesh.name = Object.Name;
                                                    mesh.NodeID = Object.NodeID;

                                                    //添加描边
                                                    var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                                    XML_D.init.initThree.scene.add(deges);

                                                    //设置是否是独立花色
                                                    setKeepmat(mesh);
                                                    function setKeepmat(object){
                                                        if(object.constructor == THREE.Mesh){
                                                            object.keepmat = Object.keepmat;
                                                        }else{
                                                            for(var kee = 0;kee < object.children.length; kee++){
                                                                setKeepmat(object.children[kee]);
                                                            }
                                                        }
                                                    };

                                                    group.add( mesh );
                                                }
                                            });
                                        }else{
                                            var parameter = {
                                                Object : Object,
                                                group : group,
                                                xpos : parseFloat(SingleGroupS[j].xpos),
                                                ypos : parseFloat(SingleGroupS[j].ypos),
                                                zpos : parseFloat(SingleGroupS[j].zpos)
                                            }
                                            XML_D.Material.lodeTexture(parameter,createHbar);

                                            function createHbar(parameter,texture){
                                                var Object = parameter.Object;
                                                var group = parameter.group;

                                                //组件的位置
                                                var xpos = parameter.xpos;
                                                var ypos = parameter.ypos;
                                                var zpos = parameter.zpos;

                                                /**************************** 生成几何体 ****************************************************/
                                                var shape = XML_D.Path.getShape(Object.shapedata);
                                                var extrudeSettings = {
                                                    amount : parseFloat(Object.width),
                                                    bevelEnabled : false
                                                };
                                                var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

                                                /**************************** 生成几何体 ****************************************************/

                                                /**************************** 生成贴图材料 ****************************************************/
                                                var materials = [];
                                                var material = new THREE.MeshPhongMaterial( {
                                                    color : 0xffffff
                                                });

                                                //设置材料的反光度
                                                if(Object.Material.shininess){
                                                    material.shininess = parseInt(Object.Material.shininess);
                                                }
                                                //设置材料颜色
                                                if(Object.Material.color.length > 0){
                                                    var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                    material.color = new THREE.Color(co);
                                                }

                                                //3. 设置贴图坐标
                                                var tag = {};
                                                var rotate = parseFloat(Object.Material.rotate);
                                                var parameters = {
                                                    rotate : rotate
                                                };
                                                tag = XML_D.UV.ExtrudeMapUV(tag,geometry,parameters);

                                                /*3. 设置贴图重复
                                                 * 根据贴图方向，改变贴图的长宽比值
                                                 * 计算贴图重复值
                                                 * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                                var x = 1.0;
                                                var y = 1.0;
                                                var height = parseFloat(Object.Material.height);
                                                var width = parseFloat(Object.Material.width);

                                                //计算贴图重复值
                                                if(tag.x > width){
                                                    y = tag.x / width;
                                                }
                                                if(tag.y > height){
                                                    x = tag.y / height;
                                                }

                                                //根据贴图的贴图方向，变换贴图的重复设置
                                                if(rotate == 90){
                                                    var temp = x ;
                                                    x = y;
                                                    y = temp;
                                                }
                                                material.repeat = {x:x,y:y};

                                                //设置材料贴图
                                                if(texture){
                                                    //2. 把贴图添加到几何体
                                                    material.map = texture;
                                                    material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                    material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                                }

                                                materials.push(material);
                                                /**************************** 生成贴图材料 ****************************************************/

                                                mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);
                                                //设置网格位置
                                                var x = parseFloat(Object.x)+ xpos + parseFloat(Object.width);
                                                var y = parseFloat(Object.z)+ zpos;
                                                var z = parseFloat(Object.y)+ ypos;
                                                mesh.position.set(x,y,z);

                                                mesh.rotateY(-2*Math.PI/4);

                                                //添加描边
                                                var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                                XML_D.init.initThree.scene.add(deges);

                                                /********** 判断几何体是否显示 ********/
                                                if("visible" in Object){
                                                    if(Object.visible == 0 ){
                                                        mesh.visible = false;
                                                        XML_D.init.initThree.scene.remove(deges);
                                                    }
                                                }

                                                /** 板件的参数设置**/
                                                mesh.name = Object.Name;
                                                mesh.NodeID = Object.NodeID;

                                                //设置是否是独立花色
                                                setKeepmat(mesh);
                                                function setKeepmat(object){
                                                    if(object.constructor == THREE.Mesh){
                                                        object.keepmat = Object.keepmat;
                                                    }else{
                                                        for(var kee = 0;kee < object.children.length; kee++){
                                                            setKeepmat(object.children[kee]);
                                                        }
                                                    }
                                                };

                                                group.add( mesh );
                                            };
                                        };
                                    };

                                };

                                if(Object.class == "vbar"){
                                    //if(Object.Shape){
                                        if(false){
                                        var parameter = {
                                            Object : Object,
                                            group : group,
                                            xpos : parseFloat(SingleGroupS[j].xpos),
                                            ypos : parseFloat(SingleGroupS[j].ypos),
                                            zpos : parseFloat(SingleGroupS[j].zpos)
                                        }
                                        XML_D.Material.lodeTexture(parameter,createVbarShape);
                                        function createVbarShape(parameter,texture){
                                            var Object = parameter.Object;
                                            var group = parameter.group;

                                            //组件的位置
                                            var xpos = parameter.xpos;
                                            var ypos = parameter.ypos;
                                            var zpos = parameter.zpos;
                                            /**************************** 生成几何体 ****************************************************/
                                            /***********************生成shape********************/
                                            var heartShape = XML_D.Path.getStringShape(Object.Shape);
                                            var extrudeSettings = {
                                                amount : parseFloat(Object.height),
                                                bevelEnabled : false
                                            };
                                            var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
                                            /**************************** 生成几何体 ****************************************************/

                                            /**************************** 生成贴图材料 ****************************************************/
                                            var materials = [];
                                            var material = new THREE.MeshPhongMaterial( {
                                                color : 0xffffff
                                            });

                                            XML_D.Material.setMaterialMap(Object,geometry,material);
                                            //设置材质的贴图
                                            if(texture){
                                                //2. 把贴图添加到几何体
                                                material.map = texture;
                                                material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                            };

                                            //设置材料的反光度
                                            if(Object.Material.shininess){
                                                material.shininess = parseInt(Object.Material.shininess);
                                            }
                                            //设置材料颜色
                                            if(Object.Material.color.length > 0){
                                                var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                material.color = new THREE.Color(co);
                                            }
                                            materials.push(material);
                                            /**************************** 生成贴图材料 ****************************************************/

                                            mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);
                                            //设置网格位置
                                            var x = parseFloat(Object.x)+ xpos;
                                            var y = parseFloat(Object.z)+ zpos + parseFloat(Object.height);
                                            var z = parseFloat(Object.y)+ ypos;
                                            mesh.position.set(x,y,z);

                                            //圆弧柜底板
                                            mesh.rotation.x += 2*Math.PI/4;
                                            mesh.rotation.z += 2*Math.PI/4;

                                            //添加描边
                                            var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                            XML_D.init.initThree.scene.add(deges);

                                            /********** 判断几何体是否显示 ********/
                                            if("visible" in Object){
                                                if(Object.visible == 0 ){
                                                    mesh.visible = false;
                                                    XML_D.init.initThree.scene.remove(deges);
                                                }
                                            }

                                            /** 板件的参数设置**/
                                            mesh.name = Object.Name;
                                            mesh.NodeID = Object.NodeID;
                                            //设置是否是独立花色
                                            setKeepmat(mesh);
                                            function setKeepmat(object){
                                                if(object.constructor == THREE.Mesh){
                                                    object.keepmat = Object.keepmat;
                                                }else{
                                                    for(var kee = 0;kee < object.children.length; kee++){
                                                        setKeepmat(object.children[kee]);
                                                    }
                                                }
                                            };

                                            group.add( mesh );
                                        };
                                    }else{
                                        var parameter = {
                                            Object : Object,
                                            group : group,
                                            xpos : parseFloat(SingleGroupS[j].xpos),
                                            ypos : parseFloat(SingleGroupS[j].ypos),
                                            zpos : parseFloat(SingleGroupS[j].zpos)
                                        }
                                        XML_D.Material.lodeTexture(parameter,createVbar);
                                        function createVbar(parameter,texture){
                                            var Object = parameter.Object;
                                            var group = parameter.group;

                                            //组件的位置
                                            var xpos = parameter.xpos;
                                            var ypos = parameter.ypos;
                                            var zpos = parameter.zpos;

                                            /**************************** 生成几何体 ****************************************************/
                                            /***********************生成shape********************/
                                            var heartShape = XML_D.Path.getShape(Object.shapedata);
                                            var extrudeSettings = {
                                                amount : parseFloat(Object.height),
                                                bevelEnabled : false
                                            };
                                            var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
                                            /**************************** 生成几何体 ****************************************************/

                                            /**************************** 生成贴图材料 ****************************************************/
                                            var materials = [];
                                            var material = new THREE.MeshPhongMaterial( {
                                                color : 0xffffff
                                            } );

                                            XML_D.Material.setMaterialMap(Object,geometry,material);
                                            //设置材质的贴图
                                            if(texture){
                                                //2. 把贴图添加到几何体
                                                material.map = texture;
                                                material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                            };

                                            //设置材料的反光度
                                            if(Object.Material.shininess){
                                                material.shininess = parseInt(Object.Material.shininess);
                                            }
                                            //设置材料颜色
                                            if(Object.Material.color.length > 0){
                                                var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                material.color = new THREE.Color(co);
                                            }
                                            materials.push(material);

                                            /**************************** 生成贴图材料 ****************************************************/

                                            mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);
                                            //设置网格位置
                                            var x = parseFloat(Object.x)+ xpos;
                                            var y = parseFloat(Object.z)+ zpos + parseFloat(Object.height);
                                            var z = parseFloat(Object.y)+ ypos;
                                            mesh.position.set(x,y,z);

                                            mesh.rotation.x += 2*Math.PI/4;

                                            //添加描边
                                            var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                            XML_D.init.initThree.scene.add(deges);

                                            /********** 判断几何体是否显示 ********/
                                            if("visible" in Object){
                                                if(Object.visible == 0 ){
                                                    mesh.visible = false;
                                                    XML_D.init.initThree.scene.remove(deges);
                                                }
                                            }

                                            /** 板件的参数设置**/
                                            mesh.name = Object.Name;
                                            mesh.NodeID = Object.NodeID;
                                            //设置是否是独立花色
                                            setKeepmat(mesh);
                                            function setKeepmat(object){
                                                if(object.constructor == THREE.Mesh){
                                                    object.keepmat = Object.keepmat;
                                                }else{
                                                    for(var kee = 0;kee < object.children.length; kee++){
                                                        setKeepmat(object.children[kee]);
                                                    }
                                                }
                                            };

                                            group.add( mesh );
                                        };
                                    }
                                };

                                if(Object.class == "dbar"){
                                    if(Object.Shape){
                                        //if(false){
                                        var parameter = {
                                            Object : Object,
                                            group : group,
                                            xpos : parseFloat(SingleGroupS[j].xpos),
                                            ypos : parseFloat(SingleGroupS[j].ypos),
                                            zpos : parseFloat(SingleGroupS[j].zpos)
                                        }
                                        XML_D.Material.lodeTexture(parameter,createDbarShape);
                                        function createDbarShape(parameter,texture){
                                            var Object = parameter.Object;
                                            var group = parameter.group;

                                            //组件的位置
                                            var xpos = parameter.xpos;
                                            var ypos = parameter.ypos;
                                            var zpos = parameter.zpos;
                                            /**************************** 生成几何体 ****************************************************/
                                            //生成shape
                                            var heartShape = XML_D.Path.getStringShape(Object.Shape);
                                            var extrudeSettings = {
                                                amount : parseFloat(Object.depth),
                                                bevelEnabled : false
                                            };
                                            var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
                                            /**************************** 生成几何体 ****************************************************/
                                            /**************************** 生成贴图材料 ****************************************************/
                                            var materials = [];
                                            var material = new THREE.MeshPhongMaterial( {
                                                color : 0xffffff
                                            } );

                                            //设置贴图的重复值和贴图的贴图坐标
                                            XML_D.Material.setMaterialMap(Object,geometry,material);

                                            //设置材质贴图
                                            if(texture){
                                                //2. 把贴图添加到几何体
                                                material.map = texture;
                                                material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                            }

                                            //设置材料的反光度
                                            if(Object.Material.shininess){
                                                material.shininess = parseInt(Object.Material.shininess);
                                            }
                                            //设置材料颜色
                                            if(Object.Material.color.length > 0){
                                                var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                material.color = new THREE.Color(co);
                                            }
                                            materials.push(material);

                                            /**************************** 生成贴图材料 ****************************************************/

                                            mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);
                                            //设置网格位置
                                            var x = parseFloat(Object.x)+ xpos;
                                            var y = parseFloat(Object.z)+ zpos;
                                            var z = parseFloat(Object.y)+ ypos;
                                            mesh.position.set(x,y,z);

                                            //添加描边
                                            var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                            XML_D.init.initThree.scene.add(deges);

                                            /********** 判断几何体是否显示 ********/
                                            if("visible" in Object){
                                                if(Object.visible == 0 ){
                                                    mesh.visible = false;
                                                    XML_D.init.initThree.scene.remove(deges);
                                                }
                                            }

                                            /** 板件的参数设置**/
                                            mesh.name = Object.Name;
                                            mesh.NodeID = Object.NodeID;
                                            //设置是否是独立花色
                                            setKeepmat(mesh);
                                            function setKeepmat(object){
                                                if(object.constructor == THREE.Mesh){
                                                    object.keepmat = Object.keepmat;
                                                }else{
                                                    for(var kee = 0;kee < object.children.length; kee++){
                                                        setKeepmat(object.children[kee]);
                                                    }
                                                }
                                            };

                                            group.add( mesh );
                                        };

                                    }else{
                                        var parameter = {
                                            Object : Object,
                                            group : group,
                                            xpos : parseFloat(SingleGroupS[j].xpos),
                                            ypos : parseFloat(SingleGroupS[j].ypos),
                                            zpos : parseFloat(SingleGroupS[j].zpos)
                                        }
                                        XML_D.Material.lodeTexture(parameter,createDbar);
                                        function createDbar(parameter,texture){
                                            var Object = parameter.Object;
                                            var group = parameter.group;

                                            //组件的位置
                                            var xpos = parameter.xpos;
                                            var ypos = parameter.ypos;
                                            var zpos = parameter.zpos;

                                            /**************************** 生成几何体 ****************************************************/
                                            //生成shape
                                            var heartShape = XML_D.Path.getShape(Object.shapedata);
                                            var extrudeSettings = {
                                                amount : parseFloat(Object.depth),
                                                bevelEnabled : false
                                            };
                                            var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
                                            /**************************** 生成几何体 ****************************************************/

                                            /**************************** 生成贴图材料 ****************************************************/
                                            var materials = [];
                                            var material = new THREE.MeshPhongMaterial( {
                                                color : 0xffffff
                                            } );

                                            //设置贴图的重复值和贴图的贴图坐标
                                            XML_D.Material.setMaterialMap(Object,geometry,material);
                                            //设置材质贴图
                                            if(texture){
                                                //2. 把贴图添加到几何体
                                                material.map = texture;
                                                material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                            }

                                            //设置材料的反光度
                                            if(Object.Material.shininess){
                                                material.shininess = parseInt(Object.Material.shininess);
                                            }
                                            //设置材料颜色
                                            if(Object.Material.color.length > 0){
                                                var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                material.color = new THREE.Color(co);
                                            }
                                            materials.push(material);

                                            /**************************** 生成贴图材料 ****************************************************/

                                            mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);
                                            //设置网格位置
                                            var x = parseFloat(Object.x)+ xpos;
                                            var y = parseFloat(Object.z)+ zpos;
                                            var z = parseFloat(Object.y)+ ypos;
                                            mesh.position.set(x,y,z);

                                            //添加描边
                                            var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                            XML_D.init.initThree.scene.add(deges);

                                            /********** 判断几何体是否显示 ********/
                                            if("visible" in Object){
                                                if(Object.visible == 0 ){
                                                    mesh.visible = false;
                                                    XML_D.init.initThree.scene.remove(deges);
                                                }
                                            }

                                            /** 板件的参数设置**/
                                            mesh.name = Object.Name;
                                            mesh.NodeID = Object.NodeID;
                                            //设置是否是独立花色
                                            setKeepmat(mesh);
                                            function setKeepmat(object){
                                                if(object.constructor == THREE.Mesh){
                                                    object.keepmat = Object.keepmat;
                                                }else{
                                                    for(var kee = 0;kee < object.children.length; kee++){
                                                        setKeepmat(object.children[kee]);
                                                    }
                                                }
                                            };

                                            group.add( mesh );
                                        };

                                    };
                                };

                                if(Object.class == "loft"){
                                    //if(Object.Shape){
                                        if(false){
                                        //把函数传入回调函数内部
                                        var parameter ={
                                            Object : Object,
                                            group : group,
                                            SingleGroup : SingleGroupS[j],
                                            ComposeGroup_TempleName : ComposeGroup_TempleName
                                        };
                                        XML_D.Material.lodeTexture(parameter,createLoft);
                                        function createLoft(parameter,texture){
                                            var group = parameter.group;
                                            var Object = parameter.Object;//当前要显示的对象

                                            var SingleGroup = parameter.SingleGroup;//一个SingleGroup组件
                                            var ObjectList = SingleGroup.ObjectList;//一个SingleGroup组件中的板件
                                            var ComposeGroup_TempleName = parameter.ComposeGroup_TempleName;

                                            /** SingleGroup柜体组件的位置 **/
                                            var xpos = parseFloat(SingleGroup.xpos);
                                            var ypos = parseFloat(SingleGroup.ypos);
                                            var zpos = parseFloat(SingleGroup.zpos);

                                            /*********************** 获得几何体 ********************/
                                            //获得基础图形
                                            var shape = XML_D.Path.getStringShape(Object.Shape);

                                            var tag = {};
                                            /**设置拉伸体拉伸路径
                                             * 1. 设置拉伸体路径上的顶点
                                             * 2. 生成曲线 **/
                                            //1. 设置拉伸体路径上的顶点
                                            var pathPoint = [];
                                            var baseboard = {};
                                            if(Object.Name.indexOf("脚线") >=0){
                                                for(var m = 0;m < ObjectList.length;m++){
                                                    if(ObjectList[m].Name.indexOf("底板") >= 0){
                                                        baseboard = ObjectList[m];
                                                    }
                                                }
                                            }
                                            if(Object.Name.indexOf("顶线") >= 0){
                                                for(var m = 0;m < ObjectList.length;m++){
                                                    if(ObjectList[m].Name.indexOf("顶板") >= 0){
                                                        baseboard = ObjectList[m];
                                                    }
                                                }
                                            }
                                            var shapedata = baseboard.shapedata;
                                            var strs = shapedata.split(";");

                                            //单个切角柜
                                            if(group.name =="右切角下柜" || ComposeGroup_TempleName == "右切角下柜"){
                                                //右切角下柜.xml 从第二个节点开始算起
                                                for(var a = 1; a < strs.length;a++ ){
                                                    var strs2 = strs[a].split(",");
                                                    var x = parseFloat(strs2[0]);
                                                    var y = parseFloat(strs2[1]);
                                                    var z = 0;
                                                    pathPoint.push(new THREE.Vector3(y,x,z));
                                                }
                                            }else if(group.name =="左切角下柜" || ComposeGroup_TempleName == "左切角下柜"){
                                                //左切角下柜.xml 从第三个节点开始算起
                                                for(var a = 2; a < strs.length;a++ ){
                                                    var strs2 = strs[a].split(",");
                                                    var x = parseFloat(strs2[0]);
                                                    var y = parseFloat(strs2[1]);
                                                    var z = 0;
                                                    pathPoint.push(new THREE.Vector3(y,x,z));
                                                }
                                                pathPoint.push(new THREE.Vector3(0.0,0.0,0.0));
                                            }

                                            console.log("切角柜左右还没有完成");

                                            //2. 生成曲线
                                            var curve = new THREE.CatmullRomCurve3(pathPoint);
                                            //圆弧
                                            if(ComposeGroup_TempleName.indexOf("圆弧") >= 0){
                                                curve = XML_D.Path.getCuvePathFromString(baseboard.Shape);
                                            }

                                            var steps = parseFloat(curve.points.length-1);
                                            var extrudeSettings = {
                                                steps : steps,
                                                bevelEnabled :false,
                                                extrudePath	:curve,
                                                frames : new THREE.TubeGeometry.RectangleFrames( curve,steps,0 )
                                            };
                                            var geometry = new THREE.MyExtrudeGeometry( shape, extrudeSettings );
                                            /**************************** 生成几何体 **********************/

                                            /**************************** 生成贴图材料 ********************/
                                            var materials = [];
                                            var material = new THREE.MeshPhongMaterial( {
                                                color : 0xffffff
                                            } );

                                            //3. 设置贴图坐标
                                            var rotate = parseFloat(Object.Material.rotate);
                                            var parameters = {
                                                rotate : rotate
                                            };
                                            XML_D.Fun.ExtrudeMapUV(tag,geometry,parameters);

                                            /*3. 设置贴图重复
                                             * 根据贴图方向，改变贴图的长宽比值
                                             * 计算贴图重复值
                                             * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                            var x = 1.0;
                                            var y = 1.0;
                                            var height = parseFloat(Object.Material.height);
                                            var width = parseFloat(Object.Material.width);

                                            //计算贴图重复值
                                            if(tag.state_x == 0 ){
                                                if(tag.x > width)
                                                    x = tag.x / width;
                                                if(tag.y > height)
                                                    y = tag.y / height;
                                            }
                                            if(tag.state_y == 0 ){
                                                if(tag.x > width)
                                                    y = tag.x / width;
                                                if(tag.y > height){
                                                    x = tag.y / height;
                                                }
                                            }
                                            if(tag.state_z == 0 ){
                                                if(tag.x > width)
                                                    y = tag.x / width;
                                                if(tag.y > height)
                                                    x = tag.y / height;
                                            }

                                            //根据贴图的贴图方向，变换贴图的重复设置
                                            if(rotate == 90){
                                                var temp = x ;
                                                x = y;
                                                y = temp;
                                            }

                                            material.repeat = {x:x,y:y};

                                            //设置材质的贴图
                                            if(texture){
                                                //2. 把贴图添加到几何体
                                                material.map = texture;
                                                material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                            }
                                            //设置材料的反光度
                                            if(Object.Material.shininess){
                                                material.shininess = parseInt(Object.Material.shininess);
                                            }
                                            //设置材料颜色
                                            if(Object.Material.color.length > 0){
                                                var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                material.color = new THREE.Color(co);
                                            }
                                            materials.push(material);

                                            /**************************** 创建网格 ********************/
                                            mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);

                                            //设置网格位置 （底板的位置加上当前脚线的相对位置）
                                            var x = xpos;
                                            var y = zpos;
                                            var z = ypos;
                                            mesh.position.set(x,y,z);

                                            //设置顶线的位置
                                            if(parseFloat(Object.PosType) == 0){
                                                mesh.position.y += parseFloat(Object.height) + parseFloat(baseboard.height);
                                            };

                                            /** 板件的参数设置**/
                                            mesh.name = Object.Name;
                                            mesh.NodeID = Object.NodeID;
                                            //设置是否是独立花色
                                            setKeepmat(mesh);
                                            function setKeepmat(object){
                                                if(object.constructor == THREE.Mesh){
                                                    object.keepmat = Object.keepmat;
                                                }else{
                                                    for(var kee = 0;kee < object.children.length; kee++){
                                                        setKeepmat(object.children[kee]);
                                                    }
                                                }
                                            };

                                            //添加描边
                                            var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                            XML_D.init.initThree.scene.add(deges);
                                            /********** 判断几何体是否显示 ********/
                                            if("visible" in Object){
                                                if(Object.visible == 0 ){
                                                    mesh.visible = false;
                                                    XML_D.init.initThree.scene.remove(deges);
                                                }
                                            }
                                            group.add( mesh );
                                        }
                                    }else {
                                        //获得XML文件加载路径
                                        var parameter = {
                                            preDir : XML_D.init.initURL.xmlUrl,
                                            number : 1
                                        }
                                        var xml_url = XML_D.URL.transformURL(Object.sectfile,parameter);

                                        //把函数传入回调函数内部
                                        var param ={
                                            Object : Object,
                                            group : group,
                                            SingleGroup : SingleGroupS[j],
                                            ComposeGroup_TempleName : ComposeGroup_TempleName
                                        };

                                        XML_D.Utils.XMLHttpRequestObjectPool.sendReq("GET",xml_url,"",param,function(xmlhttp,parameter){
                                            XML_D.Material.lodeTexture(parameter,createLoft);
                                            function createLoft(parameter,texture){
                                                var group = parameter.group;
                                                var Object = parameter.Object;//当前要显示的对象

                                                var SingleGroup = parameter.SingleGroup;//一个SingleGroup组件
                                                var ObjectList = SingleGroup.ObjectList;//一个SingleGroup组件中的板件
                                                var ComposeGroup_TempleName = parameter.ComposeGroup_TempleName;

                                                /** SingleGroup柜体组件的位置 **/
                                                var xpos = parseFloat(SingleGroup.xpos);
                                                var ypos = parseFloat(SingleGroup.ypos);
                                                var zpos = parseFloat(SingleGroup.zpos);

                                                /***************** 读取xml文件,获得截面数据 *******************************/
                                                Object.cxshapes = XML_D.XML.transformXMLToJson_instance(xmlhttp.responseXML);

                                                /**************************** 生成几何体 **********************/
                                                //计算xyz那个轴上的顶点都是0
                                                var param = {
                                                    arr : Object.cxshapes.shape
                                                };
                                                var tag = XML_D.Utils.OperationPoint(param);
                                                //设置生成基础图形的点
                                                var pts = [];
                                                for(var m = 0;m < Object.cxshapes.shape.length; m++ ){
                                                    //右切角下柜.xml中固定的xyz坐标
                                                    var x = -Object.cxshapes.shape[m].pos[0];
                                                    var y = Object.cxshapes.shape[m].pos[1];
                                                    var z = Object.cxshapes.shape[m].pos[2];
                                                    if(tag.state_x == 0){
                                                        pts.push(new THREE.Vector2(parseFloat(y),parseFloat(z)));
                                                    }
                                                    if(tag.state_y == 0){
                                                        //转化成当前物体的宽高
                                                        x = - x / x * Object.depth;
                                                        z = z / z * Object.height;
                                                        pts.push(new THREE.Vector2(parseFloat(z),parseFloat(x)));
                                                    }
                                                    if(tag.state_z == 0){
                                                        pts.push(new THREE.Vector2(-parseFloat(x),parseFloat(y)));
                                                    }
                                                }
                                                var shape = new THREE.Shape( pts );

                                                /**设置拉伸体拉伸路径
                                                 * 1. 设置拉伸体路径上的顶点
                                                 * 2. 生成曲线 **/
                                                //1. 设置拉伸体路径上的顶点
                                                var pathPoint = [];
                                                var baseboard = {};
                                                if(Object.Name.indexOf("脚线") >=0){
                                                    for(var m = 0;m < ObjectList.length;m++){
                                                        if(ObjectList[m].Name.indexOf("底板") >= 0){
                                                            baseboard = ObjectList[m];
                                                        }
                                                    }
                                                }
                                                if(Object.Name.indexOf("顶线") >= 0){
                                                    for(var m = 0;m < ObjectList.length;m++){
                                                        if(ObjectList[m].Name.indexOf("顶板") >= 0){
                                                            baseboard = ObjectList[m];
                                                        }
                                                    }
                                                }
                                                var shapedata = baseboard.shapedata;
                                                var strs = shapedata.split(";");

                                                //单个切角柜
                                                if(group.name =="右切角下柜" || ComposeGroup_TempleName == "右切角下柜"){
                                                    //右切角下柜.xml 从第二个节点开始算起
                                                    for(var a = 1; a < strs.length;a++ ){
                                                        var strs2 = strs[a].split(",");
                                                        var x = parseFloat(strs2[0]);
                                                        var y = parseFloat(strs2[1]);
                                                        var z = 0;
                                                        pathPoint.push(new THREE.Vector3(y,x,z));
                                                    }
                                                }else if(group.name =="左切角下柜" || ComposeGroup_TempleName == "左切角下柜"){
                                                    //左切角下柜.xml 从第三个节点开始算起
                                                    for(var a = 2; a < strs.length;a++ ){
                                                        var strs2 = strs[a].split(",");
                                                        var x = parseFloat(strs2[0]);
                                                        var y = parseFloat(strs2[1]);
                                                        var z = 0;
                                                        pathPoint.push(new THREE.Vector3(y,x,z));
                                                    }
                                                    pathPoint.push(new THREE.Vector3(0.0,0.0,0.0));
                                                }

                                                console.log("切角柜左右还没有完成");

                                                //圆弧
                                                if(ComposeGroup_TempleName.indexOf("圆弧") >= 0){

                                                    for(var a = 0; a < strs.length;a++ ){

                                                        var currentPoint = strs[a].split(",");
                                                        if(parseFloat(currentPoint[2]) > 0){

                                                            var beforePoint = strs[a-1].split(",");
                                                            var AfterPoint;
                                                            if(a == strs.length -1){
                                                                AfterPoint = strs[0].split(",");
                                                            }else{
                                                                AfterPoint = strs[a + 1].split(",");
                                                            }

                                                            //获得弧线的点
                                                            var sp = XML_D.Path.getCuvePath_Points(beforePoint,currentPoint,AfterPoint);

                                                            for(var m = 0; m < sp.length; m ++){
                                                                pathPoint.push(new THREE.Vector3(sp[m].y,sp[m].x,0));
                                                            }
                                                        }
                                                    }
                                                }

                                                //2. 生成曲线
                                                var curve = new THREE.CatmullRomCurve3(pathPoint);

                                                var steps = parseFloat(pathPoint.length-1);
                                                /**判断是向内拉伸，还是向外拉伸
                                                 * 如果向内拉伸，那么倒置点的数据
                                                 *
                                                 * tensileDirection : 拉伸体的拉伸方向
                                                 *   0 ： 向外拉伸
                                                 *   1 ： 向内拉伸*/
                                                var tensileDirection = 0;
                                                var extrudeSettings = {
                                                    steps : steps,
                                                    bevelEnabled :false,
                                                    extrudePath	:curve,
                                                    frames : new THREE.TubeGeometry.RectangleFrames( curve,steps,tensileDirection )
                                                };
                                                var geometry = new THREE.MyExtrudeGeometry( shape, extrudeSettings );
                                                /**************************** 生成几何体 **********************/

                                                /**************************** 生成贴图材料 ********************/
                                                var materials = [];
                                                var material = new THREE.MeshPhongMaterial( {
                                                    color : 0xffffff
                                                } );

                                                //3. 设置贴图坐标
                                                var rotate = parseFloat(Object.Material.rotate);
                                                var parameters = {
                                                    rotate : rotate
                                                };
                                                XML_D.Fun.ExtrudeMapUV(tag,geometry,parameters);

                                                /*3. 设置贴图重复
                                                 * 根据贴图方向，改变贴图的长宽比值
                                                 * 计算贴图重复值
                                                 * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                                var x = 1.0;
                                                var y = 1.0;
                                                var height = parseFloat(Object.Material.height);
                                                var width = parseFloat(Object.Material.width);

                                                //计算贴图重复值
                                                if(tag.state_x == 0 ){
                                                    if(tag.x > width)
                                                        x = tag.x / width;
                                                    if(tag.y > height)
                                                        y = tag.y / height;
                                                }
                                                if(tag.state_y == 0 ){
                                                    if(tag.x > width)
                                                        y = tag.x / width;
                                                    if(tag.y > height){
                                                        x = tag.y / height;
                                                    }
                                                }
                                                if(tag.state_z == 0 ){
                                                    if(tag.x > width)
                                                        y = tag.x / width;
                                                    if(tag.y > height)
                                                        x = tag.y / height;
                                                }

                                                //根据贴图的贴图方向，变换贴图的重复设置
                                                if(rotate == 90){
                                                    var temp = x ;
                                                    x = y;
                                                    y = temp;
                                                }

                                                material.repeat = {x:x,y:y};

                                                //设置材质的贴图
                                                if(texture){
                                                    //2. 把贴图添加到几何体
                                                    material.map = texture;
                                                    material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                    material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                                }
                                                //设置材料的反光度
                                                if(Object.Material.shininess){
                                                    material.shininess = parseInt(Object.Material.shininess);
                                                }
                                                //设置材料颜色
                                                if(Object.Material.color.length > 0){
                                                    var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                    material.color = new THREE.Color(co);
                                                }
                                                materials.push(material);

                                                /**************************** 创建网格 ********************/
                                                mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);

                                                //设置网格位置 （底板的位置加上当前脚线的相对位置）
                                                var x = parseFloat(baseboard.x) + xpos;
                                                var y = parseFloat(baseboard.z) + zpos;
                                                var z = parseFloat(baseboard.y) + ypos;
                                                mesh.position.set(x,y,z);

                                                //设置顶线的位置
                                                if(parseFloat(Object.PosType) == 0){
                                                    mesh.position.y += parseFloat(Object.height) + parseFloat(baseboard.height);
                                                };

                                                //切角下柜.xml 圆弧下柜.xml
                                                mesh.rotateX(2*Math.PI/4);
                                                mesh.rotateY(2*Math.PI/2);
                                                mesh.rotateZ(2*Math.PI/4);

                                                /** 板件的参数设置**/
                                                mesh.name = Object.Name;
                                                mesh.NodeID = Object.NodeID;
                                                //设置是否是独立花色
                                                setKeepmat(mesh);
                                                function setKeepmat(object){
                                                    if(object.constructor == THREE.Mesh){
                                                        object.keepmat = Object.keepmat;
                                                    }else{
                                                        for(var kee = 0;kee < object.children.length; kee++){
                                                            setKeepmat(object.children[kee]);
                                                        }
                                                    }
                                                };

                                                //添加描边
                                                var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                                XML_D.init.initThree.scene.add(deges);
                                                /********** 判断几何体是否显示 ********/
                                                if("visible" in Object){
                                                    if(Object.visible == 0 ){
                                                        mesh.visible = false;
                                                        XML_D.init.initThree.scene.remove(deges);
                                                    }
                                                }
                                                group.add( mesh );
                                            }
                                        });
                                    };
                                };
                            };
                        };

                        /***************** 处理二级SingleGroup ****************/

                        var SingleGroup2;
                        if(SingleGroup2 = SingleGroupS[j].SingleGroup2){
                            ObjectList = SingleGroup2.ObjectList;
                            var group2 = new THREE.Object3D();

                            group2.name = SingleGroupS[j].Name;
                            group2.width = SingleGroupS[j].width;
                            group2.height = SingleGroupS[j].height;
                            group2.depth = SingleGroupS[j].depth;
                            group2.GoodsType = SingleGroupS[j].GoodsType;
                            group2.OpenDir = SingleGroupS[j].OpenDir;
                            //默认门是闭合的
                            if(parseFloat(SingleGroup2.az) || parseFloat(SingleGroup2.ax)){
                                group2.OpenClose = false;
                            }else{
                                group2.OpenClose = true;
                            }

                            //组件的旋转角度
                            var ax = parseFloat(SingleGroup2.ax/180*Math.PI);
                            var ay = parseFloat(SingleGroup2.ay/180*Math.PI);
                            var az = parseFloat(SingleGroup2.az/180*Math.PI);
                            group2.rotateX(ax);
                            group2.rotateY(-az);
                            group2.rotateZ(-ay);
                            group2.ax = SingleGroup2.ax;
                            group2.ay = SingleGroup2.ay;
                            group2.az = SingleGroup2.az;

                            //组件的位置
                            var g2_x = xpos;
                            var g2_y = zpos;
                            var g2_z = ypos;
                            group2.position.set(g2_x,g2_y,g2_z);

                            //遍历物体列表，得到物体 Object ObjectList.length
                            for(var k = 0; k < ObjectList.length ; k++){
                                var Object = ObjectList[k];
                                if(Object.class == "panel"){
                                    var parameter = {
                                        Object : Object,
                                        group2 : group2
                                    };
                                    XML_D.Material.lodeTexture(parameter,createPanel2);
                                    function createPanel2(parameter,texture){
                                        var Object = parameter.Object;
                                        var group2 = parameter.group2;

                                        /**************************** 生成几何体 ***********************/
                                        var width = parseFloat(Object.width);
                                        var height = parseFloat(Object.height);
                                        var depth = parseFloat(Object.depth);
                                        var geometry = new THREE.BoxGeometry( width,height,depth);

                                        /************************ 生成贴图材料 *************************/
                                        var material = new THREE.MeshPhongMaterial( {
                                            color : 0xffffff
                                        } );

                                        //旋转贴图
                                        var rotate = parseFloat(Object.Material.rotate);
                                        if(rotate == 90){
                                            for(var x = 0;x < geometry.faceVertexUvs[0].length; x++){
                                                for(var y = 0 ;y < geometry.faceVertexUvs[0][x].length; y++){
                                                    var temp = geometry.faceVertexUvs[0][x][y].x;
                                                    geometry.faceVertexUvs[0][x][y].x = geometry.faceVertexUvs[0][x][y].y;
                                                    geometry.faceVertexUvs[0][x][y].y = temp;
                                                }
                                            }
                                        }

                                        /* 设置贴图重复
                                         * 根据贴图的贴图方向，计算贴图的重复值
                                         * w : 图片的宽
                                         * h : 图片的高 */
                                        var w = Object.Material.width;
                                        var h = Object.Material.height;
                                        var x = 1.0, y = 1.0;

                                        //根据贴图的贴图方向，计算贴图的重复值
                                        if(width < length && width < height){
                                            if(length > w){
                                                x = length / w;
                                            }

                                            if(height > h){
                                                y = height / h;
                                            }

                                        }else if(length < width && length < height){
                                            if(width > w ){
                                                x = width / w;
                                            }

                                            if(height > h){
                                                y = height / h;
                                            }
                                        }else{
                                            if(width > w ){
                                                x = width / w;
                                            }

                                            if(length > h){
                                                y = length / h;
                                            }
                                        }

                                        //根据贴图的方向，变换
                                        if(rotate== 90){
                                            var temp = x ;
                                            x = y ;
                                            y = temp;
                                        }
                                        material.repeat = {x:x,y:y};

                                        //设置材质的贴图
                                        if(texture){
                                            //2. 把贴图添加到几何体
                                            material.map = texture;
                                            material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                            material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                        }

                                        //设置材质的反光度
                                        if(Object.Material.shininess){
                                            material.shininess = Object.Material.shininess;
                                        }

                                        /************************ 生成网格 *****************************/
                                        var mesh = new THREE.Mesh( geometry, material );

                                        /**设置网格位置
                                         * 当网格的旋转角度不是直角时，相对于柜子的高度是不同的
                                         * Y0-00003.xml**/
                                        var x = parseFloat(Object.x) + width * Math.cos(XML_D.Math.Angle.changeToRadian(Object.ay)) / 2;
                                        var y = parseFloat(Object.z) + height * Math.cos(XML_D.Math.Angle.changeToRadian(Object.ay)) / 2;
                                        var z = parseFloat(Object.y) + depth/2;
                                        mesh.position.set(x,y,z);

                                        /** 板件的参数设置**/
                                        mesh.name = Object.Name;
                                        mesh.NodeID = Object.NodeID;
                                        //设置是否是独立花色
                                        setKeepmat(mesh);
                                        function setKeepmat(object){
                                            if(object.constructor == THREE.Mesh){
                                                object.keepmat = Object.keepmat;
                                            }else{
                                                for(var kee = 0;kee < object.children.length; kee++){
                                                    setKeepmat(object.children[kee]);
                                                }
                                            }
                                        };

                                        if(Object.ay == "45"){
                                            mesh.position.x += Object.height*Math.sin(XML_D.Math.Angle.changeToRadian(45))/2;
                                            mesh.rotation.z -= 2*Math.PI/8;
                                        }
                                        if(Object.ay == "-45"){
                                            mesh.position.x -= Object.height*Math.sin(XML_D.Math.Angle.changeToRadian(45))/2;
                                            mesh.rotation.z += 2*Math.PI/8;
                                        }

                                        //添加描边
                                        var deges = new THREE.EdgesHelper( mesh, 0x000000);
                                        XML_D.init.initThree.scene.add(deges);

                                        /********** 判断几何体是否显示 ********/
                                        if("visible" in Object){
                                            if(Object.visible == 0 ){
                                                mesh.visible = false;
                                            }
                                        }

                                        group2.add( mesh );
                                    };
                                }

                                //顶线
                                if(Object.class == "loft"){

                                    if(Object.Shape){
                                        //if(false){

                                        var parameter = {
                                            Object : Object,
                                            group2 : group2,
                                            width : parseFloat(XML_D.init.initData.scene.ComposeList[i].width),
                                            depth : parseFloat(XML_D.init.initData.scene.ComposeList[i].depth)
                                        }
                                        XML_D.Material.lodeTexture(parameter,createLoftShape2);

                                        function createLoftShape2(parameter,texture){
                                            var Object = parameter.Object;
                                            var group2 = parameter.group2;

                                            //获得柜体的长宽
                                            var width = parameter.width;
                                            var depth = parameter.depth;

                                            //计算数据的最大值，最小值
                                            var parameter1 = {
                                                str : Object.Shape
                                            };
                                            var tag1 = XML_D.vec3.getMinMaxPosition(null,parameter1);

                                            var arr = XML_D.String.splitToArray(Object.Shape,";");
                                            var pts = [];
                                            for(var m = 0;m < arr.length; m++ ){
                                                var pos = XML_D.String.splitToArray(arr[m],",");
                                                var pos_x = parseFloat(pos[0]) - parseFloat(tag1.min_x);
                                                var pos_y = parseFloat(pos[1]) - parseFloat(tag1.min_y);

                                                pts.push(new THREE.Vector2(-pos_y,pos_x));
                                            }

                                            var shape = new THREE.Shape( pts );

                                            var pathPoint = [];
                                            pathPoint.push(new THREE.Vector3(0, 0, 0));
                                            pathPoint.push(new THREE.Vector3(0, depth, 0));
                                            pathPoint.push(new THREE.Vector3(width, depth, 0));
                                            pathPoint.push(new THREE.Vector3(width, 0, 0));

                                            //2. 生成曲线
                                            var curve = new THREE.CatmullRomCurve3(pathPoint);

                                            var steps = parseFloat(pathPoint.length-1);


                                            /**判断是向内拉伸，还是向外拉伸
                                             * 如果向内拉伸，那么倒置点的数据
                                             *
                                             * tensileDirection : 拉伸体的拉伸方向
                                             *   0 ： 向外拉伸
                                             *   1 ： 向内拉伸*/
                                            var tensileDirection = 1;
                                            var extrudeSettings = {
                                                steps : steps,
                                                bevelEnabled :false,
                                                extrudePath	:curve,
                                                frames : new THREE.TubeGeometry.RectangleFrames( curve,steps,tensileDirection )
                                            };
                                            var geometry = new THREE.MyExtrudeGeometry( shape, extrudeSettings );
                                            /**************************** 生成几何体 **********************/

                                            /**************************** 生成贴图材料 ********************/
                                            var materials = [];
                                            var material = new THREE.MeshPhongMaterial( {
                                                color : 0xffffff
                                            } );


                                            //3. 设置贴图坐标
                                            var tag = {
                                                state_x : 1,
                                                state_y : 0,
                                                state_z : 1
                                            };
                                            var rotate = parseFloat(Object.Material.rotate);
                                            var parameters = {
                                                rotate : rotate
                                            };

                                            XML_D.Fun.ExtrudeMapUV(tag,geometry,parameters);

                                            /*3. 设置贴图重复
                                             * 根据贴图方向，改变贴图的长宽比值
                                             * 计算贴图重复值
                                             * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                            var x = 1.0;
                                            var y = 1.0;
                                            var height = parseFloat(Object.Material.height);
                                            var width = parseFloat(Object.Material.width);

                                            //计算贴图重复值
                                            if(tag.state_x == 0 ){
                                                if(tag.x > width)
                                                    x = tag.x / width;
                                                if(tag.y > height)
                                                    y = tag.y / height;
                                            }
                                            if(tag.state_y == 0 ){
                                                if(tag.x > width)
                                                    y = tag.x / width;
                                                if(tag.y > height){
                                                    x = tag.y / height;
                                                }
                                            }
                                            if(tag.state_z == 0 ){
                                                if(tag.x > width)
                                                    y = tag.x / width;
                                                if(tag.y > height)
                                                    x = tag.y / height;
                                            }

                                            //根据贴图的贴图方向，变换贴图的重复设置
                                            if(rotate == 90){
                                                var temp = x ;
                                                x = y;
                                                y = temp;
                                            }
                                            material.repeat = {x:x,y:y};

                                            //设置材质的贴图
                                            if(texture){
                                                //2. 把贴图添加到几何体
                                                material.map = texture;
                                                material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                            }

                                            //设置材质的反光度
                                            if(Object.Material.shininess){
                                                material.shininess = Object.Material.shininess;
                                            }
                                            //设置材料颜色
                                            if(Object.Material.color.length > 0){
                                                var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                material.color = new THREE.Color(co);
                                            }
                                            materials.push(material);

                                            /**************************** 创建网格 ********************/
                                            mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);

                                            //设置网格位置 （底板的位置加上当前脚线的相对位置）
                                            var x = parseFloat(Object.x);
                                            var y = parseFloat(Object.z) + parseFloat(Object.height);
                                            var z = parseFloat(Object.y);
                                            mesh.position.set(x,y,z);

                                            mesh.rotation.x += Math.PI/2;

                                            /** 板件的参数设置**/
                                            mesh.name = Object.Name;
                                            mesh.NodeID = Object.NodeID;

                                            //设置是否是独立花色
                                            setKeepmat(mesh);
                                            function setKeepmat(object){
                                                if(object.constructor == THREE.Mesh){
                                                    object.keepmat = Object.keepmat;
                                                }else{
                                                    for(var kee = 0;kee < object.children.length; kee++){
                                                        setKeepmat(object.children[kee]);
                                                    }
                                                }
                                            };

                                            //添加描边
                                            var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                            XML_D.init.initThree.scene.add(deges);

                                            group2.add( mesh );
                                        };
                                    }else{
                                        if(Object.sectfile){
                                            //获得XML文件加载路径
                                            var parameter = {
                                                preDir : XML_D.init.initURL.xmlUrl,
                                                number : 1
                                            };
                                            var xml_url = XML_D.URL.transformURL(Object.sectfile,parameter);

                                            var param = {
                                                Object : Object,
                                                group2 : group2,
                                                ComposeGroup_TempleName : ComposeGroup_TempleName,
                                                width : parseFloat(XML_D.init.initData.scene.ComposeList[i].width),
                                                depth : parseFloat(XML_D.init.initData.scene.ComposeList[i].depth)
                                            }
                                            XML_D.Utils.XMLHttpRequestObjectPool.sendReq("GET",xml_url,"",param,function(xmlhttp,parameter){
                                                XML_D.Material.lodeTexture(parameter,createSectfile2);
                                                function createSectfile2(parameter,texture){
                                                    var group2 = parameter.group2;
                                                    var Object = parameter.Object;//当前要显示的对象

                                                    var ComposeGroup_TempleName = parameter.ComposeGroup_TempleName;

                                                    var width = parameter.width;
                                                    var depth = parameter.depth;

                                                    /***************** 读取xml文件,获得截面数据 *******************************/
                                                    Object.cxshapes = XML_D.XML.transformXMLToJson_instance_2(xmlhttp.responseXML);

                                                    //Object.cxshapes.shapes.length
                                                    for(var shape_m = 0; shape_m < 1 ;shape_m++){
                                                        /**************************** 生成几何体 **********************/
                                                        var XML_Shape =  Object.cxshapes.shapes[shape_m];
                                                        //计算xyz那个轴上的顶点都是0
                                                        var param = {
                                                            arr : XML_Shape
                                                        };
                                                        var tag = XML_D.Utils.OperationPoint(param);

                                                        var parameter1 = {
                                                            shape : XML_Shape
                                                        };
                                                        var tag1 = XML_D.vec3.getMinMaxPosition(null,parameter1);

                                                        //设置生成基础图形的点
                                                        var pts = [];
                                                        for(var m = 0;m < XML_Shape.length; m++ ){
                                                            var x = parseFloat(XML_Shape[m].pos[0]) - tag1.min_x;
                                                            var y = parseFloat(XML_Shape[m].pos[1]);
                                                            var z = parseFloat(XML_Shape[m].pos[2]) - tag1.min_z;
                                                            if(tag.state_x == 0){
                                                                pts.push(new THREE.Vector2(parseFloat(y),parseFloat(z)));
                                                            }
                                                            if(tag.state_y == 0){
                                                                pts.push(new THREE.Vector2(-parseFloat(z),parseFloat(x)));
                                                            }
                                                            if(tag.state_z == 0){
                                                                pts.push(new THREE.Vector2(-parseFloat(x),parseFloat(y)));
                                                            }
                                                        }

                                                        var shape = new THREE.Shape( pts );

                                                        var pathPoint = [];
                                                        pathPoint.push(new THREE.Vector3(0, 0, 0));
                                                        pathPoint.push(new THREE.Vector3(0, depth, 0));
                                                        pathPoint.push(new THREE.Vector3(width, depth, 0));
                                                        pathPoint.push(new THREE.Vector3(width, 0, 0));

                                                        //2. 生成曲线
                                                        var curve = new THREE.CatmullRomCurve3(pathPoint);
                                                        var steps = parseFloat(pathPoint.length-1);

                                                        /**判断是向内拉伸，还是向外拉伸
                                                         * 如果向内拉伸，那么倒置点的数据
                                                         *
                                                         * tensileDirection : 拉伸体的拉伸方向
                                                         *   0 ： 向外拉伸
                                                         *   1 ： 向内拉伸*/
                                                        var tensileDirection = 1;
                                                        var extrudeSettings = {
                                                            steps : steps,
                                                            bevelEnabled :false,
                                                            extrudePath	:curve,
                                                            frames : new THREE.TubeGeometry.RectangleFrames( curve,steps,tensileDirection )
                                                        };
                                                        var geometry = new THREE.MyExtrudeGeometry( shape, extrudeSettings );
                                                        /**************************** 生成几何体 **********************/

                                                        /**************************** 生成贴图材料 ********************/
                                                        var materials = [];
                                                        var material = new THREE.MeshPhongMaterial( {
                                                            color : 0xffffff
                                                        });

                                                        //3. 设置贴图坐标
                                                        var rotate = parseFloat(Object.Material.rotate);
                                                        var parameters = {
                                                            rotate : rotate
                                                        };
                                                        XML_D.Fun.ExtrudeMapUV(tag,geometry,parameters);

                                                        /*3. 设置贴图重复
                                                         * 根据贴图方向，改变贴图的长宽比值
                                                         * 计算贴图重复值
                                                         * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                                        var x = 1.0;
                                                        var y = 1.0;
                                                        var height = parseFloat(Object.Material.height);
                                                        var width = parseFloat(Object.Material.width);

                                                        //计算贴图重复值
                                                        if(tag.state_x == 0 ){
                                                            if(tag.x > width)
                                                                x = tag.x / width;
                                                            if(tag.y > height)
                                                                y = tag.y / height;
                                                        }
                                                        if(tag.state_y == 0 ){
                                                            if(tag.x > width)
                                                                y = tag.x / width;
                                                            if(tag.y > height){
                                                                x = tag.y / height;
                                                            }
                                                        }
                                                        if(tag.state_z == 0 ){
                                                            if(tag.x > width)
                                                                y = tag.x / width;
                                                            if(tag.y > height)
                                                                x = tag.y / height;
                                                        }

                                                        //根据贴图的贴图方向，变换贴图的重复设置
                                                        if(rotate == 90){
                                                            var temp = x ;
                                                            x = y;
                                                            y = temp;
                                                        }
                                                        material.repeat = {x:x,y:y};

                                                        //设置材质的贴图
                                                        if(texture){
                                                            //2. 把贴图添加到几何体
                                                            material.map = texture;
                                                            material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                            material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                                        }

                                                        //设置材料的反光度
                                                        if(Object.Material.shininess){
                                                            material.shininess = parseInt(Object.Material.shininess);
                                                        }
                                                        //设置材料颜色
                                                        if(Object.Material.color.length > 0){
                                                            var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                            material.color = new THREE.Color(co);
                                                        }
                                                        materials.push(material);

                                                        /**************************** 创建网格 ********************/
                                                        mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);

                                                        //设置网格位置 （底板的位置加上当前脚线的相对位置）
                                                        var x = parseFloat(Object.x);
                                                        var y = parseFloat(Object.z) + parseFloat(Object.height);
                                                        var z = parseFloat(Object.y);
                                                        mesh.position.set(x,y,z);

                                                        mesh.rotation.x += Math.PI/2;

                                                        /** 板件的参数设置**/
                                                        mesh.name = Object.Name;
                                                        mesh.NodeID = Object.NodeID;

                                                        //设置是否是独立花色
                                                        setKeepmat(mesh);
                                                        function setKeepmat(object){
                                                            if(object.constructor == THREE.Mesh){
                                                                object.keepmat = Object.keepmat;
                                                            }else{
                                                                for(var kee = 0;kee < object.children.length; kee++){
                                                                    setKeepmat(object.children[kee]);
                                                                }
                                                            }
                                                        };

                                                        //添加描边
                                                        var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                                        XML_D.init.initThree.scene.add(deges);

                                                        group2.add( mesh );
                                                    }
                                                };
                                            });
                                        }
                                    }

                                }

                                /**hbar:水平拉伸 width 同色衣通杆
                                 * vbar:垂直拉伸 height C-J-M-00001.xml
                                 * dbar:纵向拉升 depth 书柜-柜体4.xml S-S-X-00004.xml **/
                                if(Object.class == "hbar"){
                                    if(Object.Shape){
                                        //if(false){
                                        var parameter = {
                                            Object : Object,
                                            group2 : group2,
                                            width : parseFloat(XML_D.init.initData.scene.ComposeList[i].width),
                                            depth : parseFloat(XML_D.init.initData.scene.ComposeList[i].depth)
                                        };
                                        XML_D.Material.lodeTexture(parameter,createHbarShape2);
                                        function createHbarShape2(parameter,texture){
                                            var Object = parameter.Object;
                                            var group2 = parameter.group2;

                                            /**************************** 生成几何体 **********************/
                                            //计算数据的最大值，最小值
                                            var parameter1 = {
                                                str : Object.Shape
                                            };
                                            var tag1 = XML_D.vec3.getMinMaxPosition(null,parameter1);

                                            var arr = XML_D.String.splitToArray(Object.Shape,";");
                                            var pts = [];
                                            for(var m = 0;m < arr.length; m++ ){
                                                var pos = XML_D.String.splitToArray(arr[m],",");
                                                var pos_x = parseFloat(pos[0]) - parseFloat(tag1.min_x);
                                                var pos_y = parseFloat(pos[1]) - parseFloat(tag1.min_y);
                                                var pos_z = parseFloat(pos[2]) - parseFloat(tag1.min_z);

                                                if(tag1.x == 0){
                                                    pts.push(new THREE.Vector2(pos_z,pos_y));
                                                }else{
                                                    pts.push(new THREE.Vector2(pos_z,pos_y));
                                                }

                                            }

                                            var shape = new THREE.Shape( pts );
                                            var extrudeSettings = {
                                                amount : parseFloat(Object.width),
                                                bevelEnabled :false
                                            };
                                            var geometry = new THREE.MyExtrudeGeometry( shape, extrudeSettings );

                                            /**************************** 生成贴图材料 ********************/
                                            var materials = [];
                                            var material = new THREE.MeshPhongMaterial( {
                                                color : 0xffffff
                                            });

                                            //3. 设置贴图坐标
                                            var tag = {
                                                state_x : 1,
                                                state_y : 0,
                                                state_z : 1
                                            };
                                            var rotate = parseFloat(Object.Material.rotate);
                                            var parameters = {
                                                rotate : rotate
                                            };
                                            XML_D.Fun.ExtrudeMapUV(tag,geometry,parameters);

                                            /*3. 设置贴图重复
                                             * 根据贴图方向，改变贴图的长宽比值
                                             * 计算贴图重复值
                                             * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                            var x = 1.0;
                                            var y = 1.0;
                                            var height = parseFloat(Object.Material.height);
                                            var width = parseFloat(Object.Material.width);

                                            //计算贴图重复值
                                            if(tag.state_x == 0 ){
                                                if(tag.x > width)
                                                    x = tag.x / width;
                                                if(tag.y > height)
                                                    y = tag.y / height;
                                            }
                                            if(tag.state_y == 0 ){
                                                if(tag.x > width)
                                                    y = tag.x / width;
                                                if(tag.y > height){
                                                    x = tag.y / height;
                                                }
                                            }
                                            if(tag.state_z == 0 ){
                                                if(tag.x > width)
                                                    y = tag.x / width;
                                                if(tag.y > height)
                                                    x = tag.y / height;
                                            }

                                            //根据贴图的贴图方向，变换贴图的重复设置
                                            if(rotate == 90){
                                                var temp = x ;
                                                x = y;
                                                y = temp;
                                            }
                                            material.repeat = {x:x,y:y};

                                            //设置材质的贴图
                                            if(texture){
                                                //2. 把贴图添加到几何体
                                                material.map = texture;
                                                material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                            }

                                            //设置材料的反光度
                                            if(Object.Material.shininess){
                                                material.shininess = parseInt(Object.Material.shininess);
                                            }
                                            //设置材料颜色
                                            if(Object.Material.color.length > 0){
                                                var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                material.color = new THREE.Color(co);
                                            }
                                            materials.push(material);

                                            /**************************** 创建网格 ********************/
                                            mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);

                                            mesh.position.set(
                                                parseFloat(Object.x),
                                                parseFloat(Object.z),
                                                parseFloat(Object.y)
                                            );

                                            mesh.rotateY(Math.PI/2);
                                            mesh.rotateZ(Math.PI/2);

                                            /** 板件的参数设置**/
                                            mesh.name = Object.Name;
                                            mesh.NodeID = Object.NodeID;

                                            //设置是否是独立花色
                                            setKeepmat(mesh);
                                            function setKeepmat(object){
                                                if(object.constructor == THREE.Mesh){
                                                    object.keepmat = Object.keepmat;
                                                }else{
                                                    for(var kee = 0;kee < object.children.length; kee++){
                                                        setKeepmat(object.children[kee]);
                                                    }
                                                }
                                            };

                                            //添加描边
                                            var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                            XML_D.init.initThree.scene.add(deges);

                                            group2.add( mesh );
                                        };
                                    }else{
                                        //判断图形是否要加载另外的xml
                                        if(Object.sect){
                                            //获得XML文件加载路径
                                            var parameter = {
                                                preDir : XML_D.init.initURL.xmlUrl,
                                                number : 1
                                            };
                                            var xml_url = XML_D.URL.transformURL(Object.sect,parameter);

                                            //把函数传入回调函数内部
                                            var param = {
                                                Object : Object,
                                                group2 : group2
                                            };

                                            XML_D.Utils.XMLHttpRequestObjectPool.sendReq("GET",xml_url,"",param,function(xmlhttp,parameter){
                                                XML_D.Material.lodeTexture(parameter,createHbarSect2);
                                                function createHbarSect2(parameter,texture){
                                                    var group2 = parameter.group2;
                                                    var Object = parameter.Object;//当前要显示的对象

                                                    /*********************** 读取xml文件 *****************************************/
                                                    Object.cxshapes = XML_D.XML.transformXMLToJson_instance( xmlhttp.responseXML);

                                                    /**************************** 生成几何体 **********************/
                                                    //计算xyz那个轴上的顶点都是0
                                                    var param = {
                                                        arr : Object.cxshapes.shape
                                                    };
                                                    var tag = XML_D.Utils.OperationPoint(param);

                                                    //设置生成基础图形的点
                                                    var pts = [];
                                                    for(var m = 0;m < Object.cxshapes.shape.length; m++ ){
                                                        var x = Object.cxshapes.shape[m].pos[0];
                                                        var y = Object.cxshapes.shape[m].pos[1];
                                                        var z = Object.cxshapes.shape[m].pos[2];
                                                        if(tag.state_x == 0){
                                                            pts.push(new THREE.Vector2(parseFloat(y),parseFloat(z)));
                                                        }
                                                        if(tag.state_y == 0){
                                                            pts.push(new THREE.Vector2(parseFloat(z),parseFloat(x)));
                                                        }
                                                        if(tag.state_z == 0){
                                                            pts.push(new THREE.Vector2(-parseFloat(x),parseFloat(y)));
                                                        }
                                                    }
                                                    var shape = new THREE.Shape( pts );
                                                    var extrudeSettings = {
                                                        amount : parseFloat(Object.width),
                                                        bevelEnabled :false
                                                    };
                                                    var geometry = new THREE.MyExtrudeGeometry( shape, extrudeSettings );

                                                    //变换中心点
                                                    geometry.center(0,0,0);

                                                    /**************************** 生成贴图材料 ********************/
                                                    var materials = [];
                                                    var material = new THREE.MeshPhongMaterial( {
                                                        color : 0xffffff
                                                    });


                                                    //3. 设置贴图坐标
                                                    var rotate = parseFloat(Object.Material.rotate);
                                                    var param1 = {
                                                        rotate : rotate
                                                    };
                                                    XML_D.Fun.ExtrudeMapUV(tag,geometry,param1);

                                                    /*3. 设置贴图重复
                                                     * 根据贴图方向，改变贴图的长宽比值
                                                     * 计算贴图重复值
                                                     * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                                    var x = 1.0;
                                                    var y = 1.0;
                                                    var height = parseFloat(Object.Material.height);
                                                    var width = parseFloat(Object.Material.width);

                                                    //计算贴图重复值
                                                    if(tag.state_x == 0 ){
                                                        if(tag.x > width)
                                                            x = tag.x / width;
                                                        if(tag.y > height)
                                                            y = tag.y / height;
                                                    }
                                                    if(tag.state_y == 0 ){
                                                        if(tag.x > width)
                                                            y = tag.x / width;
                                                        if(tag.y > height){
                                                            x = tag.y / height;
                                                        }
                                                    }
                                                    if(tag.state_z == 0 ){
                                                        if(tag.x > width)
                                                            y = tag.x / width;
                                                        if(tag.y > height)
                                                            x = tag.y / height;
                                                    }

                                                    //根据贴图的贴图方向，变换贴图的重复设置
                                                    if(rotate == 90){
                                                        var temp = x ;
                                                        x = y;
                                                        y = temp;
                                                    }
                                                    material.repeat = {x:x,y:y};

                                                    //设置材质的贴图
                                                    if(texture){
                                                        //2. 把贴图添加到几何体
                                                        material.map = texture;
                                                        material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                        material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                                    }

                                                    //设置材料的反光度
                                                    if(Object.Material.shininess){
                                                        material.shininess = parseInt(Object.Material.shininess);
                                                    }
                                                    //设置材料颜色
                                                    if(Object.Material.color.length > 0){
                                                        var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                        material.color = new THREE.Color(co);
                                                    }
                                                    materials.push(material);

                                                    /**************************** 创建网格 ********************/
                                                    mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);

                                                    mesh.position.set(
                                                        parseFloat(Object.x) + parseFloat(Object.width)/2,
                                                        parseFloat(Object.z) + parseFloat(Object.height)/2,
                                                        parseFloat(Object.y) + parseFloat(Object.depth)/2
                                                    );

                                                    mesh.rotation.y += -2*Math.PI/4;
                                                    mesh.rotation.z += 2*Math.PI/4;

                                                    /** 板件的参数设置**/
                                                    mesh.name = Object.Name;
                                                    mesh.NodeID = Object.NodeID;

                                                    //1.计算拉伸后，生成的各点的最大长宽
                                                    tag = XML_D.Utils.OperationVec3(tag,null,geometry.vertices);
                                                    //根据比例缩放衣通的大小
                                                    mesh.scale.set(Object.height/tag.x,Object.depth/tag.y,Object.width/tag.z);

                                                    //添加描边
                                                    var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                                    XML_D.init.initThree.scene.add(deges);

                                                    //设置是否是独立花色
                                                    setKeepmat(mesh);
                                                    function setKeepmat(object){
                                                        if(object.constructor == THREE.Mesh){
                                                            object.keepmat = Object.keepmat;
                                                        }else{
                                                            for(var kee = 0;kee < object.children.length; kee++){
                                                                setKeepmat(object.children[kee]);
                                                            }
                                                        }
                                                    };

                                                    group2.add( mesh );
                                                };
                                            });
                                        }else{
                                            var parameter = {
                                                Object : Object,
                                                group2 : group2
                                            };
                                            XML_D.Material.lodeTexture(parameter,createHbar2);
                                            function createHbar2(parameter,texture){
                                                var Object = parameter.Object;
                                                var group2 = parameter.group2;

                                                //Y0-00003.xml
                                                //获得shape
                                                /**************************** 生成几何体 ****************************************************/
                                                var shape = XML_D.Path.getShape(Object.shapedata);
                                                var extrudeSettings = {
                                                    amount : parseFloat(Object.width),
                                                    bevelEnabled : false
                                                };
                                                var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

                                                /**************************** 生成贴图材料 ****************************************************/
                                                var materials = [];
                                                var material = new THREE.MeshPhongMaterial( {
                                                    color : 0xffffff
                                                });

                                                //3. 设置贴图坐标
                                                var tag = {};
                                                var rotate = parseFloat(Object.Material.rotate);
                                                var parameters = {
                                                    rotate : rotate,
                                                    //DirType : DirType
                                                };
                                                tag = XML_D.UV.ExtrudeMapUV(tag,geometry,parameters);

                                                /*3. 设置贴图重复
                                                 * 根据贴图方向，改变贴图的长宽比值
                                                 * 计算贴图重复值
                                                 * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                                var x = 1.0;
                                                var y = 1.0;
                                                var height = parseFloat(Object.Material.height);
                                                var width = parseFloat(Object.Material.width);

                                                //计算贴图重复值
                                                if(tag.x > width){
                                                    y = tag.x / width;
                                                }
                                                if(tag.y > height){
                                                    x = tag.y / height;
                                                }

                                                //根据贴图的贴图方向，变换贴图的重复设置
                                                if(rotate == 90){
                                                    var temp = x ;
                                                    x = y;
                                                    y = temp;
                                                }
                                                material.repeat = {x:x,y:y};

                                                //设置材质的贴图
                                                if(texture){
                                                    //2. 把贴图添加到几何体
                                                    material.map = texture;
                                                    material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                    material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                                }

                                                //设置材料的反光度
                                                if(Object.Material.shininess){
                                                    material.shininess = parseInt(Object.Material.shininess);
                                                }
                                                //设置材料颜色
                                                if(Object.Material.color.length > 0){
                                                    var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                    material.color = new THREE.Color(co);
                                                }
                                                materials.push(material);

                                                /**************************** 生成贴图材料 ****************************************************/
                                                mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);

                                                var x = parseFloat(Object.x)+ parseFloat(Object.width);
                                                var y = parseFloat(Object.z);
                                                var z = parseFloat(Object.y);
                                                mesh.position.set(x,y,z);

                                                mesh.rotateY(-2*Math.PI/4);

                                                //添加描边
                                                var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                                XML_D.init.initThree.scene.add(deges);

                                                /********** 判断几何体是否显示 ********/
                                                if("visible" in Object){
                                                    if(Object.visible == 0 ){
                                                        mesh.visible = false;
                                                        XML_D.init.initThree.scene.remove(deges);
                                                    }
                                                }

                                                /** 板件的参数设置**/
                                                mesh.name = Object.Name;
                                                mesh.NodeID = Object.NodeID;

                                                //添加描边
                                                var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                                XML_D.init.initThree.scene.add(deges);

                                                //设置是否是独立花色
                                                setKeepmat(mesh);
                                                function setKeepmat(object){
                                                    if(object.constructor == THREE.Mesh){
                                                        object.keepmat = Object.keepmat;
                                                    }else{
                                                        for(var kee = 0;kee < object.children.length; kee++){
                                                            setKeepmat(object.children[kee]);
                                                        }
                                                    }
                                                };

                                                group2.add( mesh );
                                            };
                                        };
                                    };
                                };

                                if(Object.class == "vbar"){

                                    if(Object.Shape){
                                        //if(false){
                                        var parameter = {
                                            Object : Object,
                                            group2 : group2
                                        };
                                        XML_D.Material.lodeTexture(parameter,createVbarShape2);
                                        function createVbarShape2(parameter,texture){
                                            var Object = parameter.Object;
                                            var group2 = parameter.group2;

                                            //计算数据的最大值，最小值
                                            var parameter1 = {
                                                str : Object.Shape
                                            };
                                            var tag1 = XML_D.vec3.getMinMaxPosition(null,parameter1);

                                            var arr = XML_D.String.splitToArray(Object.Shape,";");
                                            var pts = [];
                                            for(var m = 0;m < arr.length; m++ ){
                                                var pos = XML_D.String.splitToArray(arr[m],",");
                                                var pos_x = parseFloat(pos[0]) - parseFloat(tag1.min_x);
                                                var pos_y = parseFloat(pos[1]) - parseFloat(tag1.min_y);
                                                var pos_z = parseFloat(pos[2]) - parseFloat(tag1.min_z);

                                                if(tag1.x == 0){
                                                    pts.push(new THREE.Vector2(pos_z,pos_y));
                                                }else if(tag1.z == 0){
                                                    pts.push(new THREE.Vector2(pos_y,-pos_x));
                                                }else{
                                                    pts.push(new THREE.Vector2(pos_z,pos_y));
                                                }
                                            }
                                            var shape = new THREE.Shape( pts );

                                            var extrudeSettings = {
                                                amount : parseFloat(Object.height),
                                                bevelEnabled :false
                                            };
                                            var geometry = new THREE.MyExtrudeGeometry( shape, extrudeSettings );
                                            /******************************** 生成几何体 ******************************/

                                            /**************************** 生成贴图材料 ********************/
                                            var materials = [];
                                            var material = new THREE.MeshPhongMaterial( {
                                                color : 0xffffff
                                            });

                                            //3. 设置贴图坐标
                                            var tag = {
                                                state_x : 1,
                                                state_y : 0,
                                                state_z : 1
                                            };
                                            var rotate = parseFloat(Object.Material.rotate);
                                            var parameters = {
                                                rotate : rotate
                                            };
                                            XML_D.Fun.ExtrudeMapUV(tag,geometry,parameters);

                                            /*3. 设置贴图重复
                                             * 根据贴图方向，改变贴图的长宽比值
                                             * 计算贴图重复值
                                             * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                            var x = 1.0;
                                            var y = 1.0;
                                            var height = parseFloat(Object.Material.height);
                                            var width = parseFloat(Object.Material.width);

                                            //计算贴图重复值
                                            if(tag.state_x == 0 ){
                                                if(tag.x > width)
                                                    x = tag.x / width;
                                                if(tag.y > height)
                                                    y = tag.y / height;
                                            }
                                            if(tag.state_y == 0 ){
                                                if(tag.x > width)
                                                    y = tag.x / width;
                                                if(tag.y > height){
                                                    x = tag.y / height;
                                                }
                                            }
                                            if(tag.state_z == 0 ){
                                                if(tag.x > width)
                                                    y = tag.x / width;
                                                if(tag.y > height)
                                                    x = tag.y / height;
                                            }

                                            //根据贴图的贴图方向，变换贴图的重复设置
                                            if(rotate == 90){
                                                var temp = x ;
                                                x = y;
                                                y = temp;
                                            }
                                            material.repeat = {x:x,y:y};
                                            //设置材质的贴图
                                            if(texture){
                                                //2. 把贴图添加到几何体
                                                material.map = texture;
                                                material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                            }

                                            //设置材料的反光度
                                            if(parseInt(Object.Material.shininess)){
                                                material.shininess = parseInt(Object.Material.shininess);
                                            }
                                            //设置材料颜色
                                            if(Object.Material.color.length > 0){
                                                var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                material.color = new THREE.Color(co);
                                            }
                                            materials.push(material);

                                            /**************************** 创建网格 ********************/
                                            mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);

                                            //设置网格位置 以横截面的第一个点为原点坐标，所以要减去他的坐标
                                            var x = parseFloat(Object.x);
                                            var y = parseFloat(Object.z);
                                            var z = parseFloat(Object.y);
                                            mesh.position.set(x,y,z);

                                            /**设置几何体的旋转
                                             * 根据判断拉伸体拉伸高度用的是长宽高的值**/
                                            if(parseFloat(Object.side)){
                                                mesh.rotation.x += -2*Math.PI/4;
                                                mesh.rotation.z += -2*Math.PI/4;
                                                mesh.position.x += parseFloat(Object.width);
                                            }else{
                                                mesh.rotation.x += 2*Math.PI/4;
                                                mesh.rotation.z += 2*Math.PI/4;
                                                mesh.position.y += parseFloat(Object.height);
                                            }

                                            /** 板件的参数设置**/
                                            mesh.name = Object.Name;
                                            mesh.NodeID = Object.NodeID;

                                            //设置是否是独立花色
                                            setKeepmat(mesh);
                                            function setKeepmat(object){
                                                if(object.constructor == THREE.Mesh){
                                                    object.keepmat = Object.keepmat;
                                                }else{
                                                    for(var kee = 0;kee < object.children.length; kee++){
                                                        setKeepmat(object.children[kee]);
                                                    }
                                                }
                                            };

                                            //添加描边
                                            var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                            XML_D.init.initThree.scene.add(deges);

                                            group2.add( mesh );
                                        };

                                    }else{
                                        if(Object.sect){
                                            //获得XML文件加载路径
                                            var parameter = {
                                                preDir : XML_D.init.initURL.xmlUrl,
                                                number : 1
                                            };
                                            var xml_url = XML_D.URL.transformURL(Object.sect,parameter);

                                            var param = {
                                                Object : Object,
                                                group2 : group2
                                            };
                                            XML_D.Utils.XMLHttpRequestObjectPool.sendReq("GET",xml_url,"",param,function(xmlhttp,parameter){
                                                XML_D.Material.lodeTexture(parameter,createVbarSect2);
                                                function createVbarSect2(parameter,texture){
                                                    var Object = parameter.Object;
                                                    var group2 = parameter.group2;

                                                    /*********************** 读取xml文件 *************************************/
                                                    Object.cxshapes = XML_D.XML.transformXMLToJson_instance(xmlhttp.responseXML);

                                                    /******************************** 生成几何体 ******************************/
                                                    //计算xyz那个轴上的顶点都是0
                                                    var param = {
                                                        arr : Object.cxshapes.shape
                                                    };
                                                    var tag = XML_D.Utils.OperationPoint(param);

                                                    var parameter1 = {
                                                        shape : Object.cxshapes.shape
                                                    };
                                                    var tag1 = XML_D.vec3.getMinMaxPosition(null,parameter1);

                                                    //设置生成基础图形的点
                                                    var pts = [];
                                                    for(var m = 0;m < Object.cxshapes.shape.length; m++ ){
                                                        var x = -parseFloat(Object.cxshapes.shape[m].pos[0]) + tag1.min_x;
                                                        var y = parseFloat(Object.cxshapes.shape[m].pos[1]);
                                                        var z = parseFloat(Object.cxshapes.shape[m].pos[2]) - tag1.min_z;
                                                        if(tag.state_x == 0){
                                                            pts.push(new THREE.Vector2(parseFloat(y),parseFloat(z)));
                                                        }
                                                        if(tag.state_y == 0){
                                                            pts.push(new THREE.Vector2(parseFloat(z),parseFloat(x)));
                                                        }
                                                        if(tag.state_z == 0){
                                                            pts.push(new THREE.Vector2(-parseFloat(x),parseFloat(y)));
                                                        }
                                                    }
                                                    var shape = new THREE.Shape( pts );

                                                    var extrudeSettings = {
                                                        amount : parseFloat(Object.height),
                                                        bevelEnabled :false
                                                    };
                                                    var geometry = new THREE.MyExtrudeGeometry( shape, extrudeSettings );
                                                    /******************************** 生成几何体 ******************************/

                                                    /**************************** 生成贴图材料 ********************/
                                                    var materials = [];
                                                    var material = new THREE.MeshPhongMaterial( {
                                                        color : 0xffffff
                                                    });

                                                    if(texture){
                                                        //2. 把贴图添加到几何体
                                                        material.map = texture;
                                                        material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                        //3. 设置贴图坐标
                                                        var rotate = parseFloat(Object.Material.rotate);
                                                        var parameters = {
                                                            rotate : rotate
                                                        };
                                                        XML_D.Fun.ExtrudeMapUV(tag,geometry,parameters);

                                                        /*3. 设置贴图重复
                                                         * 根据贴图方向，改变贴图的长宽比值
                                                         * 计算贴图重复值
                                                         * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                                        var x = 1.0;
                                                        var y = 1.0;
                                                        var height = parseFloat(Object.Material.height);
                                                        var width = parseFloat(Object.Material.width);

                                                        //计算贴图重复值
                                                        if(tag.state_x == 0 ){
                                                            if(tag.x > width)
                                                                x = tag.x / width;
                                                            if(tag.y > height)
                                                                y = tag.y / height;
                                                        }
                                                        if(tag.state_y == 0 ){
                                                            if(tag.x > width)
                                                                y = tag.x / width;
                                                            if(tag.y > height){
                                                                x = tag.y / height;
                                                            }
                                                        }
                                                        if(tag.state_z == 0 ){
                                                            if(tag.x > width)
                                                                y = tag.x / width;
                                                            if(tag.y > height)
                                                                x = tag.y / height;
                                                        }

                                                        //根据贴图的贴图方向，变换贴图的重复设置
                                                        if(rotate == 90){
                                                            var temp = x ;
                                                            x = y;
                                                            y = temp;
                                                        }
                                                        material.map.repeat.set(x ,y);
                                                    }
                                                    //设置材料的反光度
                                                    if(parseInt(Object.Material.shininess)){
                                                        material.shininess = parseInt(Object.Material.shininess);
                                                    }
                                                    //设置材料颜色
                                                    if(Object.Material.color.length > 0){
                                                        var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                        material.color = new THREE.Color(co);
                                                    }
                                                    materials.push(material);

                                                    /**************************** 创建网格 ********************/
                                                    mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);

                                                    //设置网格位置 以横截面的第一个点为原点坐标，所以要减去他的坐标
                                                    var x = parseFloat(Object.x);
                                                    var y = parseFloat(Object.z);
                                                    var z = parseFloat(Object.y);
                                                    mesh.position.set(x,y,z);

                                                    /**设置几何体的旋转
                                                     * 根据判断拉伸体拉伸高度用的是长宽高的值**/
                                                    if(parseFloat(Object.side)){
                                                        mesh.rotation.x += -2*Math.PI/4;
                                                        mesh.rotation.z += -2*Math.PI/4;
                                                        mesh.position.x += parseFloat(Object.width);
                                                    }else{
                                                        mesh.rotation.x += 2*Math.PI/4;
                                                        mesh.rotation.z += 2*Math.PI/4;
                                                        mesh.position.y += parseFloat(Object.height);
                                                    }

                                                    /** 板件的参数设置**/
                                                    mesh.name = Object.Name;
                                                    mesh.NodeID = Object.NodeID;

                                                    //添加描边
                                                    var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                                    XML_D.init.initThree.scene.add(deges);

                                                    //设置是否是独立花色
                                                    setKeepmat(mesh);
                                                    function setKeepmat(object){
                                                        if(object.constructor == THREE.Mesh){
                                                            object.keepmat = Object.keepmat;
                                                        }else{
                                                            for(var kee = 0;kee < object.children.length; kee++){
                                                                setKeepmat(object.children[kee]);
                                                            }
                                                        }
                                                    };

                                                    group2.add( mesh );
                                                };
                                            });
                                        }else{

                                            var parameter = {
                                                Object : Object,
                                                group2 : group2
                                            };
                                            XML_D.Material.lodeTexture(parameter,createVbar2);
                                            function createVbar2(parameter,texture){
                                                var Object = parameter.Object;
                                                var group2 = parameter.group2;

                                                /**************************** 生成几何体 *******************************/
                                                //获得图形shape
                                                var heartShape = XML_D.Path.getShape(Object.shapedata);
                                                var extrudeSettings = {
                                                    amount : parseFloat(Object.height),
                                                    bevelEnabled :false
                                                };
                                                var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

                                                /**************************** 生成贴图材料 ****************************************************/
                                                var materials = [];
                                                var material = new THREE.MeshPhongMaterial( {
                                                    color : 0xffffff
                                                });

                                                //3. 设置贴图坐标
                                                var tag = {};
                                                var rotate = parseFloat(Object.Material.rotate);
                                                var parameters = {
                                                    rotate : rotate,
                                                    //DirType : DirType
                                                };
                                                tag = XML_D.UV.ExtrudeMapUV(tag,geometry,parameters);

                                                /*3. 设置贴图重复
                                                 * 根据贴图方向，改变贴图的长宽比值
                                                 * 计算贴图重复值
                                                 * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                                var x = 1.0;
                                                var y = 1.0;
                                                var height = parseFloat(Object.Material.height);
                                                var width = parseFloat(Object.Material.width);

                                                //计算贴图重复值
                                                if(tag.x > width){
                                                    y = tag.x / width;
                                                }
                                                if(tag.y > height){
                                                    x = tag.y / height;
                                                }

                                                //根据贴图的贴图方向，变换贴图的重复设置
                                                if(rotate == 90){
                                                    var temp = x ;
                                                    x = y;
                                                    y = temp;
                                                }
                                                material.repeat = {x:x,y:y};
                                                //设置材质的贴图
                                                if(texture){
                                                    //2. 把贴图添加到几何体
                                                    material.map = texture;
                                                    material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                    material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                                }

                                                //设置材料的反光度
                                                if(parseInt(Object.Material.shininess)){
                                                    material.shininess = parseInt(Object.Material.shininess);
                                                }
                                                //设置材料颜色
                                                if(Object.Material.color.length > 0){
                                                    var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                    material.color = new THREE.Color(co);
                                                }
                                                materials.push(material);
                                                /**************************** 生成贴图材料 ****************************************************/

                                                mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);
                                                //设置网格位置
                                                var x = parseFloat(Object.x);
                                                var y = parseFloat(Object.z) + parseFloat(Object.height);
                                                var z = parseFloat(Object.y);
                                                mesh.position.set(x,y,z);

                                                mesh.rotation.x += 2*Math.PI/4;

                                                //添加描边
                                                var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                                XML_D.init.initThree.scene.add(deges);

                                                /********** 判断几何体是否显示 ********/
                                                if("visible" in Object){
                                                    if(Object.visible == 0 ){
                                                        mesh.visible = false;
                                                        XML_D.init.initThree.scene.remove(deges);
                                                    }
                                                }

                                                /** 板件的参数设置**/
                                                mesh.name = Object.Name;
                                                mesh.NodeID = Object.NodeID;

                                                //添加描边
                                                var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                                XML_D.init.initThree.scene.add(deges);

                                                //设置是否是独立花色
                                                setKeepmat(mesh);
                                                function setKeepmat(object){
                                                    if(object.constructor == THREE.Mesh){
                                                        object.keepmat = Object.keepmat;
                                                    }else{
                                                        for(var kee = 0;kee < object.children.length; kee++){
                                                            setKeepmat(object.children[kee]);
                                                        }
                                                    }
                                                };

                                                group2.add( mesh );
                                            };
                                        };
                                    }

                                };

                                if(Object.class == "dbar"){
                                    if(Object.Shape){
                                        //if(false){
                                        var parameter = {
                                            Object : Object,
                                            group2 : group2
                                        };
                                        XML_D.Material.lodeTexture(parameter,createDbarShape2);
                                        function createDbarShape2(parameter,texture){
                                            var group2 = parameter.group2;
                                            var Object = parameter.Object;

                                            /**************************** 生成几何体 *************************/
                                            //计算数据的最大值，最小值
                                            var parameter1 = {
                                                str : Object.Shape
                                            };
                                            var tag1 = XML_D.vec3.getMinMaxPosition(null,parameter1);

                                            var arr = XML_D.String.splitToArray(Object.Shape,";");
                                            var pts = [];
                                            for(var m = 0;m < arr.length; m++ ){
                                                var pos = XML_D.String.splitToArray(arr[m],",");
                                                var pos_x = parseFloat(pos[0]) - parseFloat(tag1.min_x);
                                                var pos_y = parseFloat(pos[1]) - parseFloat(tag1.min_y);
                                                var pos_z = parseFloat(pos[2]) - parseFloat(tag1.min_z);

                                                if(tag1.z == 0 ){
                                                    pts.push(new THREE.Vector2(-pos_y,pos_z));
                                                }else if(tag1.y < tag1.z && tag1.y < tag1.x){
                                                    pts.push(new THREE.Vector2(pos_x,pos_z));
                                                }else{
                                                    //默认z的值为0
                                                    pts.push(new THREE.Vector2(-pos_y,pos_x));
                                                }
                                            }

                                            var shape = new THREE.Shape( pts );
                                            var extrudeSettings = {
                                                amount : parseFloat(Object.depth)
                                            };

                                            //设置拉伸体的倒角
                                            if(Object.Offset){
                                                extrudeSettings.bevelThickness = parseFloat(Object.Offset);
                                            }else{
                                                extrudeSettings.bevelEnabled = false;
                                            }

                                            var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
                                            /**************************** 生成几何体 ****************************************************/

                                            /**************************** 生成贴图材料 ****************************************************/
                                            var materials = [];
                                            var material = new THREE.MeshPhongMaterial( {
                                                color : 0xffffff
                                            });

                                            //3. 设置贴图坐标
                                            var tag = {};
                                            var rotate = parseFloat(Object.Material.rotate);
                                            var parameters = {
                                                rotate : rotate,
                                                //DirType : DirType
                                            };
                                            tag = XML_D.UV.ExtrudeMapUV(tag,geometry,parameters);

                                            /*3. 设置贴图重复
                                             * 根据贴图方向，改变贴图的长宽比值
                                             * 计算贴图重复值
                                             * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                            var x = 1.0;
                                            var y = 1.0;
                                            var height = parseFloat(Object.Material.height);
                                            var width = parseFloat(Object.Material.width);

                                            //计算贴图重复值
                                            if(tag.x > width){
                                                y = tag.x / width;
                                            }
                                            if(tag.y > height){
                                                x = tag.y / height;
                                            }

                                            //根据贴图的贴图方向，变换贴图的重复设置
                                            if(rotate == 90){
                                                var temp = x ;
                                                x = y;
                                                y = temp;
                                            }
                                            material.repeat = {x:x,y:y};
                                            //设置材质的贴图
                                            if(texture){
                                                //2. 把贴图添加到几何体
                                                material.map = texture;
                                                material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                            }
                                            //设置材料的反光度
                                            if(Object.Material.shininess){
                                                material.shininess = parseInt(Object.Material.shininess);
                                            }
                                            //设置材料颜色
                                            if(Object.Material.color.length > 0){
                                                var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                material.color = new THREE.Color(co);
                                            }
                                            materials.push(material);

                                            /**************************** 生成贴图材料 ****************************************************/

                                            mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);
                                            //设置网格位置
                                            var x = parseFloat(Object.x);
                                            var y = parseFloat(Object.z);
                                            var z = parseFloat(Object.y);
                                            mesh.position.set(x,y,z);

                                            //添加描边
                                            var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                            XML_D.init.initThree.scene.add(deges);

                                            /********** 判断几何体是否显示 ********/
                                            if("visible" in Object){
                                                if(Object.visible == 0 ){
                                                    mesh.visible = false;
                                                    XML_D.init.initThree.scene.remove(deges);
                                                }
                                            }

                                            /** 板件的参数设置**/
                                            mesh.name = Object.Name;
                                            mesh.NodeID = Object.NodeID;

                                            //添加描边
                                            var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                            XML_D.init.initThree.scene.add(deges);

                                            //设置是否是独立花色
                                            setKeepmat(mesh);
                                            function setKeepmat(object){
                                                if(object.constructor == THREE.Mesh){
                                                    object.keepmat = Object.keepmat;
                                                }else{
                                                    for(var kee = 0;kee < object.children.length; kee++){
                                                        setKeepmat(object.children[kee]);
                                                    }
                                                }
                                            };

                                            group2.add( mesh );
                                        };

                                    }else{

                                        var parameter = {
                                            Object : Object,
                                            group2 : group2
                                        };
                                        XML_D.Material.lodeTexture(parameter,createDbar2);
                                        function createDbar2(parameter,texture){
                                            var group2 = parameter.group2;
                                            var Object = parameter.Object;
                                            /************************** 生成几何体 ********************************/
                                            var shape = XML_D.Path.getShape( Object.shapedata);
                                            var extrudeSettings = {
                                                amount : parseFloat(Object.depth)
                                            };
                                            //设置拉伸体的倒角
                                            if(Object.Offset){
                                                extrudeSettings.bevelThickness = parseFloat(Object.Offset);
                                            }else{
                                                extrudeSettings.bevelEnabled = false;
                                            }
                                            var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

                                            /**************************** 生成贴图材料 ****************************************************/
                                            var materials = [];
                                            var material = new THREE.MeshPhongMaterial( {
                                                color : 0xffffff
                                            });

                                            //3. 设置贴图坐标
                                            var tag = {};
                                            var rotate = parseFloat(Object.Material.rotate);
                                            var parameters = {
                                                rotate : rotate,
                                                //DirType : DirType
                                            };
                                            tag = XML_D.UV.ExtrudeMapUV(tag,geometry,parameters);

                                            /*3. 设置贴图重复
                                             * 根据贴图方向，改变贴图的长宽比值
                                             * 计算贴图重复值
                                             * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                            var x = 1.0;
                                            var y = 1.0;
                                            var height = parseFloat(Object.Material.height);
                                            var width = parseFloat(Object.Material.width);

                                            //计算贴图重复值
                                            if(tag.x > width){
                                                y = tag.x / width;
                                            }
                                            if(tag.y > height){
                                                x = tag.y / height;
                                            }

                                            //根据贴图的贴图方向，变换贴图的重复设置
                                            if(rotate == 90){
                                                var temp = x ;
                                                x = y;
                                                y = temp;
                                            }
                                            material.repeat = {x:x,y:y};
                                            //设置材质的贴图
                                            if(texture){
                                                //2. 把贴图添加到几何体
                                                material.map = texture;
                                                material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                            }

                                            //设置材料的反光度
                                            if(Object.Material.shininess){
                                                material.shininess = parseInt(Object.Material.shininess);
                                            }
                                            //设置材料颜色
                                            if(Object.Material.color.length > 0){
                                                var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                material.color = new THREE.Color(co);
                                            }
                                            materials.push(material);

                                            /**************************** 生成贴图材料 ****************************************************/

                                            mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);
                                            //设置网格位置
                                            var x = parseFloat(Object.x);
                                            var y = parseFloat(Object.z);
                                            var z = parseFloat(Object.y);
                                            mesh.position.set(x,y,z);

                                            //添加描边
                                            var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                            XML_D.init.initThree.scene.add(deges);

                                            /********** 判断几何体是否显示 ********/
                                            if("visible" in Object){
                                                if(Object.visible == 0 ){
                                                    mesh.visible = false;
                                                    XML_D.init.initThree.scene.remove(deges);
                                                }
                                            }

                                            /** 板件的参数设置**/
                                            mesh.name = Object.Name;
                                            mesh.NodeID = Object.NodeID;

                                            //设置是否是独立花色
                                            setKeepmat(mesh);
                                            function setKeepmat(object){
                                                if(object.constructor == THREE.Mesh){
                                                    object.keepmat = Object.keepmat;
                                                }else{
                                                    for(var kee = 0;kee < object.children.length; kee++){
                                                        setKeepmat(object.children[kee]);
                                                    }
                                                }
                                            };

                                            //添加描边
                                            var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                            XML_D.init.initThree.scene.add(deges);

                                            group2.add( mesh );
                                        };
                                    }
                                };

                                if(Object.class == "loftframe"){

                                    //if(Object.Shape){
                                    if(Object.false){
                                        var parameter = {
                                            Object : Object,
                                            group2 : group2
                                        };
                                        XML_D.Material.lodeTexture(parameter,createLoftframe2);
                                        function createLoftframe2(parameter,texture){
                                            var group2 = parameter.group2;
                                            var Object = parameter.Object;

                                            /**************************** 生成几何体 *************************/
                                            //计算数据的最大值，最小值
                                            var parameter1 = {
                                                str : Object.Shape
                                            };
                                            var tag1 = XML_D.vec3.getMinMaxPosition(null,parameter1);

                                            var arr = XML_D.String.splitToArray(Object.Shape,";");
                                            var pts = [];

                                            for(var m = 0;m < arr.length; m++ ){
                                                var pos = XML_D.String.splitToArray(arr[m],",");
                                                var pos_x = parseFloat(pos[0]) - parseFloat(tag1.min_x);
                                                var pos_y = parseFloat(pos[1]) - parseFloat(tag1.min_y);
                                                var pos_z = parseFloat(pos[2]) - parseFloat(tag1.min_z);

                                                if(tag1.z == 0){
                                                    pts.push(new THREE.Vector2(-pos_y,pos_x));
                                                }else{
                                                    //默认z的值为0
                                                    pts.push(new THREE.Vector2(-pos_y,pos_x));
                                                }

                                            }

                                            var shape = new THREE.Shape( pts );

                                            /**设置拉伸体拉伸路径
                                             * 1. 设置拉伸体路径上的顶点
                                             * 2. 生成曲线 **/
                                            var pathdata = Object.pathdata;
                                            var strs = pathdata.split(";");

                                            var pathPoint = [];
                                            for(var a = 0; a < strs.length;a++ ) {
                                                var strs2 = strs[a].split(",");
                                                var x = -parseFloat(strs2[0]);
                                                var y = parseFloat(strs2[1]);
                                                var z = 0;
                                                pathPoint.push(new THREE.Vector3(x, y, z));
                                            }

                                            //2. 生成曲线
                                            var curve = new THREE.CatmullRomCurve3(pathPoint);

                                            var steps = parseFloat(pathPoint.length-1);

                                            //默认为闭合
                                            if(parseFloat(Object.ClosePath) == 0){}else{
                                                //设置默认为为闭合的路径
                                                curve.closed = true;
                                                steps ++;
                                            }

                                            /**判断是向内拉伸，还是向外拉伸
                                             * 如果向内拉伸，那么倒置点的数据
                                             *
                                             * tensileDirection : 拉伸体的拉伸方向
                                             *   0 ： 向外拉伸
                                             *   1 ： 向内拉伸*/
                                            var tensileDirection = 1;
                                            var extrudeSettings = {
                                                steps : steps,
                                                bevelEnabled :false,
                                                extrudePath	:curve,
                                                frames : new THREE.TubeGeometry.RectangleFrames( curve,steps,tensileDirection )
                                            };
                                            var geometry = new THREE.MyExtrudeGeometry( shape, extrudeSettings );
                                            /**************************** 生成几何体 ******************************/

                                            /**************************** 生成贴图材料 ********************/
                                            var materials = [];
                                            var material = new THREE.MeshPhongMaterial( {
                                                color : 0xffffff
                                            });

                                            //3. 设置贴图坐标
                                            var tag = {
                                                state_x : 1,
                                                state_y : 0,
                                                state_z : 1
                                            };
                                            var rotate = parseFloat(Object.Material.rotate);
                                            var parameters = {
                                                rotate : rotate
                                            };
                                            XML_D.Fun.ExtrudeMapUV(tag,geometry,parameters);

                                            /*3. 设置贴图重复
                                             * 根据贴图方向，改变贴图的长宽比值
                                             * 计算贴图重复值
                                             * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                            var x = 1.0;
                                            var y = 1.0;
                                            var height = parseFloat(Object.Material.height);
                                            var width = parseFloat(Object.Material.width);

                                            //计算贴图重复值
                                            if(tag.state_x == 0 ){
                                                if(tag.x > width)
                                                    x = tag.x / width;
                                                if(tag.y > height)
                                                    y = tag.y / height;
                                            }
                                            if(tag.state_y == 0 ){
                                                if(tag.x > width)
                                                    y = tag.x / width;
                                                if(tag.y > height){
                                                    x = tag.y / height;
                                                }
                                            }
                                            if(tag.state_z == 0 ){
                                                if(tag.x > width)
                                                    y = tag.x / width;
                                                if(tag.y > height)
                                                    x = tag.y / height;
                                            }

                                            //根据贴图的贴图方向，变换贴图的重复设置
                                            if(rotate == 90){
                                                var temp = x ;
                                                x = y;
                                                y = temp;
                                            }
                                            material.repeat = {x:x,y:y};
                                            //设置材质的贴图
                                            if(texture){
                                                //2. 把贴图添加到几何体
                                                material.map = texture;
                                                material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                            }

                                            //设置材料的反光度
                                            if(Object.Material.shininess){
                                                material.shininess = parseInt(Object.Material.shininess);
                                            }
                                            //设置材料颜色
                                            if(Object.Material.color.length > 0){
                                                var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                material.color = new THREE.Color(co);
                                            }
                                            materials.push(material);

                                            /**************************** 创建网格 ********************/
                                            mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);

                                            //设置网格位置 （底板的位置加上当前脚线的相对位置）
                                            var x = parseFloat(Object.x) + parseFloat(Object.width);
                                            var y = parseFloat(Object.z);
                                            var z = parseFloat(Object.y);
                                            mesh.position.set(x,y,z);

                                            /** 板件的参数设置**/
                                            mesh.name = Object.Name;
                                            mesh.NodeID = Object.NodeID;

                                            //设置是否是独立花色
                                            setKeepmat(mesh);
                                            function setKeepmat(object){
                                                if(object.constructor == THREE.Mesh){
                                                    object.keepmat = Object.keepmat;
                                                }else{
                                                    for(var kee = 0;kee < object.children.length; kee++){
                                                        setKeepmat(object.children[kee]);
                                                    }
                                                }
                                            };

                                            //添加描边
                                            var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                            XML_D.init.initThree.scene.add(deges);

                                            group2.add( mesh );
                                        };
                                    }else{
                                        //判断图形是否要加载另外的xml
                                        if(Object.sect){
                                            //获得XML文件加载路径
                                            var parameter = {
                                                preDir : XML_D.init.initURL.xmlUrl,
                                                number : 1
                                            }
                                            var xml_url = XML_D.URL.transformURL(Object.sect,parameter);
                                            var param = {
                                                Object : Object,
                                                group2 : group2
                                            };

                                            XML_D.Utils.XMLHttpRequestObjectPool.sendReq("GET",xml_url,"",param,function(xmlhttp,parameter){
                                                XML_D.Material.lodeTexture(parameter,createLoftframeSect2);
                                                function createLoftframeSect2(parameter,texture){
                                                    var group2 = parameter.group2;
                                                    var Object = parameter.Object;//当前要显示的对象

                                                    /***************** 读取xml文件,获得截面数据 *******************************/
                                                    Object.cxshapes = XML_D.XML.transformXMLToJson_instance_2(xmlhttp.responseXML);

                                                    //Object.cxshapes.shapes.length
                                                    for(var shape_m = 0; shape_m < 1 ;shape_m++){
                                                        /**************************** 生成几何体 **********************/
                                                        var XML_Shape =  Object.cxshapes.shapes[shape_m];

                                                        //计算xyz那个轴上的顶点都是0
                                                        var parameter = {
                                                            arr : XML_Shape
                                                        };
                                                        var tag = XML_D.Utils.OperationPoint(parameter);

                                                        var parameter1 = {
                                                            shape : XML_Shape
                                                        };
                                                        var tag1 = XML_D.vec3.getMinMaxPosition(null,parameter1);

                                                        //设置生成基础图形的点
                                                        var pts = [];
                                                        for(var m = 0;m < XML_Shape.length; m++ ){
                                                            var x = parseFloat(XML_Shape[m].pos[0]) - tag1.min_x;
                                                            var y = parseFloat(XML_Shape[m].pos[1]) - tag1.min_y;
                                                            var z = parseFloat(XML_Shape[m].pos[2]) - tag1.min_z;
                                                            if(tag.state_x == 0){
                                                                pts.push(new THREE.Vector2(parseFloat(y),parseFloat(z)));
                                                            }
                                                            if(tag.state_y == 0){
                                                                pts.push(new THREE.Vector2(-parseFloat(z),parseFloat(x)));
                                                            }
                                                            if(tag.state_z == 0){
                                                                pts.push(new THREE.Vector2(-parseFloat(x),parseFloat(y)));
                                                            }
                                                        }

                                                        var shape = new THREE.Shape( pts );

                                                        /**设置拉伸体拉伸路径
                                                         * 1. 设置拉伸体路径上的顶点
                                                         * 2. 生成曲线 **/
                                                        var pathdata = Object.pathdata;
                                                        var strs = pathdata.split(";");

                                                        var pathPoint = [];
                                                        for(var a = 0; a < strs.length;a++ ) {
                                                            var strs2 = strs[a].split(",");
                                                            var x = -parseFloat(strs2[0]);
                                                            var y = parseFloat(strs2[1]);
                                                            var z = 0;
                                                            pathPoint.push(new THREE.Vector3(x, y, z));
                                                        }

                                                        //2. 生成曲线
                                                        var curve = new THREE.CatmullRomCurve3(pathPoint);

                                                        var steps = parseFloat(pathPoint.length-1);
                                                        //默认为闭合
                                                        if(parseFloat(Object.ClosePath) == 0){}else{
                                                            //设置默认为为闭合的路径
                                                            curve.closed = true;
                                                            steps ++;
                                                        }


                                                        /**判断是向内拉伸，还是向外拉伸
                                                         * 如果向内拉伸，那么倒置点的数据
                                                         *
                                                         * tensileDirection : 拉伸体的拉伸方向
                                                         *   0 ： 向外拉伸
                                                         *   1 ： 向内拉伸*/
                                                        var tensileDirection = 1;
                                                        var extrudeSettings = {
                                                            steps : steps,
                                                            bevelEnabled :false,
                                                            extrudePath	:curve,
                                                            frames : new THREE.TubeGeometry.RectangleFrames( curve,steps,tensileDirection )
                                                        };
                                                        var geometry = new THREE.MyExtrudeGeometry( shape, extrudeSettings );
                                                        /**************************** 生成几何体 **********************/

                                                        /**************************** 生成贴图材料 ********************/
                                                        var materials = [];
                                                        var material = new THREE.MeshPhongMaterial( {
                                                            color : 0xffffff
                                                        });

                                                        //3. 设置贴图坐标
                                                        var rotate = parseFloat(Object.Material.rotate);
                                                        var parameters = {
                                                            rotate : rotate
                                                        };
                                                        XML_D.Fun.ExtrudeMapUV(tag,geometry,parameters);

                                                        /*3. 设置贴图重复
                                                         * 根据贴图方向，改变贴图的长宽比值
                                                         * 计算贴图重复值
                                                         * 根据贴图的贴图方向，变换贴图的贴图方向*/
                                                        var x = 1.0;
                                                        var y = 1.0;
                                                        var height = parseFloat(Object.Material.height);
                                                        var width = parseFloat(Object.Material.width);

                                                        //计算贴图重复值
                                                        if(tag.state_x == 0 ){
                                                            if(tag.x > width)
                                                                x = tag.x / width;
                                                            if(tag.y > height)
                                                                y = tag.y / height;
                                                        }
                                                        if(tag.state_y == 0 ){
                                                            if(tag.x > width)
                                                                y = tag.x / width;
                                                            if(tag.y > height){
                                                                x = tag.y / height;
                                                            }
                                                        }
                                                        if(tag.state_z == 0 ){
                                                            if(tag.x > width)
                                                                y = tag.x / width;
                                                            if(tag.y > height)
                                                                x = tag.y / height;
                                                        }

                                                        //根据贴图的贴图方向，变换贴图的重复设置
                                                        if(rotate == 90){
                                                            var temp = x ;
                                                            x = y;
                                                            y = temp;
                                                        }
                                                        material.repeat = {x:x,y:y};
                                                        //设置材质的贴图
                                                        if(texture){
                                                            //2. 把贴图添加到几何体
                                                            material.map = texture;
                                                            material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;

                                                            material.map.repeat.set(material.repeat.x ,material.repeat.y);
                                                        }

                                                        //设置材料的反光度
                                                        if(Object.Material.shininess){
                                                            material.shininess = parseInt(Object.Material.shininess);
                                                        }
                                                        //设置材料颜色
                                                        if(Object.Material.color.length > 0){
                                                            var co = XML_D.Fun.tool.stringToHex(Object.Material.color);
                                                            material.color = new THREE.Color(co);
                                                        }
                                                        materials.push(material);

                                                        /**************************** 创建网格 ********************/
                                                        mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry,materials);

                                                        //设置网格位置 （底板的位置加上当前脚线的相对位置）
                                                        var x = parseFloat(Object.x)+ parseFloat(Object.width);
                                                        var y = parseFloat(Object.z);
                                                        var z = parseFloat(Object.y);
                                                        mesh.position.set(x,y,z);

                                                        /** 板件的参数设置**/
                                                        mesh.name = Object.Name;
                                                        mesh.NodeID = Object.NodeID;

                                                        //添加描边
                                                        var deges = new THREE.EdgesHelper( mesh.children[0], 0x000000);
                                                        XML_D.init.initThree.scene.add(deges);

                                                        /********** 判断几何体是否显示 ********/
                                                        if("visible" in Object){
                                                            if(Object.visible == 0 ){
                                                                mesh.visible = false;
                                                                XML_D.init.initThree.scene.remove(deges);
                                                            }
                                                        }

                                                        //设置是否是独立花色
                                                        setKeepmat(mesh);
                                                        function setKeepmat(object){
                                                            if(object.constructor == THREE.Mesh){
                                                                object.keepmat = Object.keepmat;
                                                            }else{
                                                                for(var kee = 0;kee < object.children.length; kee++){
                                                                    setKeepmat(object.children[kee]);
                                                                }
                                                            }
                                                        };

                                                        group2.add( mesh );
                                                };

                                                };
                                            });
                                        };
                                    };

                                };

                                if(Object.class == "model"){
                                    model(Object,group2);

                                    function model(xml_Object,group2){
                                        var xml_Object = xml_Object;
                                        var gropu2 = group2;

                                        //获得XML文件加载路径
                                        var parameter = {
                                            preDir : XML_D.init.initURL.objUrl,
                                            number : 1
                                        };
                                        var fileURL = XML_D.URL.transformObjURL(Object.modelfile,parameter);
                                        var onProgress = function ( xhr ) {
                                        };
                                        var onError = function ( xhr ) {
                                            console.log("模型加载错误");
                                        };

                                        var mtlLoader = new THREE.MTLLoader();
                                        //设置mtl文件中的资源路径（图片）
                                        mtlLoader.setBaseUrl( fileURL.filePath );
                                        //设置mtl文件路径
                                        mtlLoader.setPath( fileURL.filePath );
                                        mtlLoader.load(fileURL.fileName +'.mtl', function( materials ) {
                                            materials.preload();

                                            var objLoader = new THREE.OBJLoader();
                                            objLoader.setMaterials( materials );
                                            //设置obj文件路径
                                            objLoader.setPath( fileURL.filePath );
                                            objLoader.load( fileURL.fileName + ".obj", function ( object ) {

                                                //设置模型的位置
                                                var pos_x = parseFloat(xml_Object.x);
                                                var pos_y = parseFloat(xml_Object.y);
                                                var pos_z = parseFloat(xml_Object.z);
                                                object.position.set(pos_x,pos_z,pos_y);

                                                /*设置模型的大小
                                                * 1. 存放model的尺寸
                                                * 2. 设置缩放*/
                                                var model_size = {
                                                    minX: null,
                                                    minY: null,
                                                    minZ: null,
                                                    maxX: null,
                                                    maxY: null,
                                                    maxZ: null,
                                                    x : 0,
                                                    y : 0,
                                                    z : 0
                                                };
                                                object.traverse(function (child) {
                                                    if (child instanceof THREE.Mesh) {
                                                        /**
                                                         * 计算model的尺寸
                                                         * 1. 所有获取顶点的坐标
                                                         * 2. 获得所有坐标的最大值与最小值
                                                         * 3. 得到model的长、宽、高 */
                                                        var arr = child.geometry.getAttribute("position").array;

                                                        for (var i = 0; i < arr.length; i++) {
                                                            if (i % 3 == 0) {

                                                                if (model_size.minX == null || model_size.minX > arr[i]) {
                                                                    model_size.minX = arr[i];
                                                                }

                                                                if (model_size.maxX == null || model_size.maxX < arr[i]) {
                                                                    model_size.maxX = arr[i];
                                                                }
                                                            }

                                                            if (i % 3 == 1) {
                                                                if (model_size.minY == null || model_size.minY > arr[i]) {
                                                                    model_size.minY = arr[i];
                                                                }

                                                                if (model_size.maxY == null ||model_size.maxY < arr[i]) {
                                                                    model_size.maxY = arr[i];
                                                                }
                                                            }

                                                            if (i % 3 == 2) {
                                                                if (model_size.minZ == null || model_size.minZ > arr[i]) {
                                                                    model_size.minZ = arr[i];
                                                                }

                                                                if (model_size.maxZ == null || model_size.maxZ < arr[i]) {
                                                                    model_size.maxZ = arr[i];
                                                                }
                                                            }
                                                        }
                                                        model_size.x = model_size.maxX - model_size.minX;
                                                        model_size.y = model_size.maxY - model_size.minY;
                                                        model_size.z = model_size.maxZ - model_size.minZ;
                                                    }
                                                });
                                                //object.scale.set(parseFloat(xml_Object.width)/model_size.x, parseFloat(xml_Object.height)/model_size.y, parseFloat(xml_Object.depth) / model_size.z);

                                                //设置模型的旋转方向
                                                var ax = XML_D.Math.Angle.changeToRadian(parseFloat(xml_Object.ax));
                                                var ay = XML_D.Math.Angle.changeToRadian(parseFloat(xml_Object.ay));
                                                var az = XML_D.Math.Angle.changeToRadian(parseFloat(xml_Object.az));
                                                object.rotation.set(ax,az,ay);

                                                if(xml_Object.Name  == "拉手"){
                                                    object.rotation.y += -Math.PI;
                                                }else{
                                                    if(parseFloat(xml_Object.az) == 180){
                                                        object.rotation.y += Math.PI;
                                                    }
                                                    if(parseFloat(xml_Object.az) == 0){
                                                        object.rotation.y += Math.PI;
                                                    }

                                                    object.position.x += model_size.x/2;
                                                    object.position.z += model_size.z/2;
                                                }

                                                //设置是否是独立花色
                                                setKeepmat(object);
                                                function setKeepmat(object){
                                                    if(object.constructor == THREE.Mesh){
                                                        object.keepmat = xml_Object.keepmat;
                                                    }else{
                                                        for(var kee = 0;kee < object.children.length; kee++){
                                                            setKeepmat(object.children[kee]);
                                                        }
                                                    }
                                                };

                                                gropu2.add( object );
                                                XML_D.init.initThree.renderScene();
                                            }, onProgress, onError );
                                        });

                                    };
                                };
                            };

                            group.add(group2);
                        }
                    }
                    scene.add(group);
                }

            },

            /* 实现多次动态加载 */
            renderScene : function(){
                XML_D.init.initThree.renderer.clear();
                //requestAnimationFrame( XML_D.init.initThree.renderScene );
                //XML_D.init.initThree.controls.renderScene = XML_D.init.initThree.renderScene;
                //XML_D.init.initThree.controls.update(XML_D.clock.getDelta(), XML_D.init.initThree.renderScene);

                XML_D.init.initThree.renderer.render( XML_D.init.initThree.scene, XML_D.init.initThree.camera );
            },

            /* 初始化事件 */
            initEvent : function(){
                //当用户重置窗口大小时添加事件监听
                window.addEventListener( 'resize', XML_D.Event.onWindowResize, false );

                //添加滚龙事件
                $(XML_D.init.initData.container).unbind("mousewheel");
                $(XML_D.init.initData.container).bind("mousewheel",XML_D.Event.onDocumentMouseWheel);

                $(XML_D.init.initData.container).unbind("MozMousePixelScroll");
                $(XML_D.init.initData.container).bind("MozMousePixelScroll", XML_D.Event.onDocumentMouseWheel);

                /**************** 添加鼠标移动事件，用射线找到物体 ****************/
                XML_D.init.initData.container.addEventListener( 'mousemove', XML_D.Event.onDocumentMouseMove, false );
                XML_D.init.initData.container.addEventListener( 'touch', XML_D.Event.onMouseDown_overGeometry, false );
            },

            /* 启动three程序 */
            threeStart : function () {
                XML_D.init.initThree.initRenderer();
                XML_D.init.initThree.initCamera();
                XML_D.init.initThree.initControls();
                XML_D.init.initThree.initScene();
                XML_D.init.initThree.initLight();
                XML_D.init.initThree.initObject();
                XML_D.init.initThree.initEvent();
                XML_D.init.initThree.renderScene();
            }
        },
    },

    /** 操作数据的函数 */
    Fun : {
        /** 程序中常用的工具函数 */
        tool : {
            /* 把给定的数组用逗号链接成字符窜 */
            arrayToStr : function(Array){
                var str = Array.join(",");
                return str;
            },

            /**
             *  把给定的字符窜,切割成数组(默认用逗号分隔)
             *
             *  str: 字符串
             *  sep: 分隔符 */
            splitToArray : function(str,sep){
                var arr = new Array(); //定义一数组
                if(sep){
                    arr = str.split(sep); //字符分割
                }else{
                    arr = str.split(","); //字符分割
                }
                return arr;
            },

            /* 互换坐标系y轴与z轴 */
            change_y_z : function(arr){
                var temp = arr[1];
                arr[1] = arr[2];
                arr[2] = temp;

                return arr;
            },

            /**
             *  把给定的角度转换成对应的弧度
             * angle : 角度(字符窜类型)
             *
             * return 弧度*/
            angleToRadian : function(angle){
                return 2 * Math.PI * parseFloat(angle)/360
            },

            /** 1.根据给定的字符窜,分割成数组,
             * 2.互换坐标系中的y轴和z轴,
             * 3.把给定的角度转换成弧度
             * 4.在转角上加上负号
             *
             * str : 字符窜(用逗号分割)
             *
             * return : 数组 */
            change_rot : function(str){
                var arr = XML_D.Fun.tool.splitToArray(str);
                arr = XML_D.Fun.tool.change_y_z(arr);

                for(var i = 0; i < arr.length; i++){
                    arr[i] = -XML_D.Fun.tool.angleToRadian(arr[i]);
                }
                return arr;
            },

            /* 1.把给定的字符窜,切割成数组
             * 2.互换坐标系y轴与z轴
             *
             * str : 字符窜(用逗号分割)
             * 返回 数组
             */
            splitStr_changeYZ : function(str){
                var arr = XML_D.Fun.tool.splitToArray(str);
                arr = XML_D.Fun.tool.change_y_z(arr);
                return arr;
            },

            /** 把16进制的0xffffff 转换为#ffffff */
            stringToHex : function (str){
                var val="#";
                if(str.length > 0){
                    val += XML_D.Fun.tool.splitToArray(str,'0x')[1];
                }else{
                    return "";
                }
                return val;
            }
        }
    },

    test : {
        /* 把json中的数据显示到浏览器中 */
        TestData : function(){
            var txt = "";
            txt = txt + "scene <br><br>";
            txt = txt + "ObjectList  " + XML_D.init.initData.scene.ObjectList.Name + "<br><br>" ;
            for(var i = 0; i < XML_D.init.initData.scene.ObjectList.length; i++){
                txt = txt + "<br>" + "Object " + "class=" + XML_D.init.initData.scene.ObjectList[i].class +" "+ "name=" + XML_D.init.initData.scene.ObjectList[i].name +"<br>" ;

                if(XML_D.init.initData.scene.ObjectList[i].class == "mesh"){
                    txt = txt + "<br>" + "Vertices  " + "<br>" ;
                    for(var j = 0; j < XML_D.init.initData.scene.ObjectList[i].Vertices.length; j++){
                        txt = txt + "Vertex " + "pos=" + XML_D.tool.arrayToStr(XML_D.init.initData.scene.ObjectList[i].Vertices[j].pos) + "<br>" ;
                    }

                    txt = txt + "<br>" + "Faces  " + "<br>" ;
                    for(var j = 0; j < XML_D.init.initData.scene.ObjectList[i].Faces.length; j++){
                        txt = txt + "Face " + "index=" + XML_D.tool.arrayToStr(XML_D.init.initData.scene.ObjectList[i].Faces[j].index) + "<br>" ;
                    }

                }else if(XML_D.init.initData.scene.ObjectList[i].class == "poly"){
                    txt = txt + "<br>" + "Shape  " + "<br>" ;
                    for(var j = 0; j < XML_D.init.initData.scene.ObjectList[i].Shape.length; j++){
                        txt = txt + "Shape " + "pos=" + XML_D.tool.arrayToStr(XML_D.init.initData.scene.ObjectList[i].Shape[j].pos) + "<br>" ;
                    }
                }
            }

            txt = txt + "<br>" + "LightList  " + XML_D.init.initData.scene.LightList.Name + "<br>" ;
            for(var i = 0; i < XML_D.init.initData.scene.LightList.length; i++){
                txt = txt + "<br>" + "Light " + "class=" + XML_D.init.initData.scene.LightList[i].class +" "+ "name=" + XML_D.init.initData.scene.LightList[i].name +"<br>" ;
            }


            txt = txt + "<br>" + "CameraList  " + XML_D.init.initData.scene.CameraList.Name + "<br>" ;
            txt = txt + "<br>" + "Camera " + "class=" + XML_D.init.initData.scene.CameraList.Camera.class +" "+ "name=" + XML_D.init.initData.scene.CameraList.Camera.name + "pos="+ XML_D.init.initData.scene.CameraList.Camera.pos +"<br>";

            document.getElementById("myDiv").innerHTML = txt;
        }
    }
};

//A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
/**获得浏览器的相关信息**/
XML_D.broweser = {
    //版本信息
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {         //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),

    //返回语言
    language:(navigator.browserLanguage || navigator.language).toLowerCase(),

    //测试使用broweser
    // 页面添加 ：<div id="testid"></div>
    test : function(){
        var html=[];
        html[html.length]="语言版本: "+ this.language+"<br/>";
        html[html.length]=" 是否为移动终端: "+this.versions.mobile+"<br/>";
        html[html.length]=" ios终端: "+this.versions.ios+"<br/>";
        html[html.length]=" android终端: "+this.versions.android+"<br/>";
        html[html.length]=" 是否为iPhone: "+this.versions.iPhone+"<br/>";
        html[html.length]=" 是否iPad: "+this.versions.iPad+"<br/>";
        html[html.length]= navigator.userAgent+"<br/>";
        html[html.length]= navigator.appVersion + "<br/>";
        document.getElementById("testid").innerHTML=html.join("");
    }
};

/**遮盖层
 * 使用：
 * 1. 写HTML文件
 * 2. 写css文件
 * 3. 写js文件**/
XML_D.Cover = function(){

    /*****创建遮罩层*************/
    //<!-- 遮罩层DIV -->
    //<div id="overlay" class="hidden"></div>
    //    <!-- Loading提示 DIV -->
    //<div id="loadingTip">
    //    <img src="images/loading.gif" />
    //    </div>
    var cover = document.createElement( 'div' );
    document.body.appendChild( cover );
    cover.id = "overlay";
    $(cover).append("<div id='loadingTip'><img src='images/loading.gif' /></div>");
    /*****创建遮罩层*************/

    var total_num = 0;
    var load_succss = 0;
    var load_error = 0;

    THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
        //console.log( item, loaded, total );
        total_num = total;
        load_succss = loaded;

        if(total_num <= (load_succss + load_error)){
            hideLoading();
        }else{
            showLoading();
        }
    };

    THREE.DefaultLoadingManager.onError = function ( item) {
        console.warn( item + "没有找到");
        load_error++;
        if(total_num <= (load_succss + load_error)){
            hideLoading();
        }else{
            showLoading();
        }
        //console.log("total_num"+total_num)
        //console.log("load_succss"+load_succss)
        //console.log("load_error"+load_error)

    };

    showLoading();
    $(document).ajaxStart(function(){
        console.log("所有 AJAX 请求已开始");
    });
    $(document).ajaxStop(function(){
        console.log("所有 AJAX 请求已完成");
    });

    // 浏览器兼容 取得浏览器可视区高度
    function getWindowInnerHeight() {
        var winHeight = window.innerHeight
            || (document.documentElement && document.documentElement.clientHeight)
            || (document.body && document.body.clientHeight);
        return winHeight;
    }
    // 浏览器兼容 取得浏览器可视区宽度
    function getWindowInnerWidth() {
        var winWidth = window.innerWidth
            || (document.documentElement && document.documentElement.clientWidth)
            || (document.body && document.body.clientWidth);
        return winWidth;
    }

    /**显示遮罩层*/
    function showOverlay() {
        // 遮罩层宽高分别为页面内容的宽高
        $("#overlay").width(getWindowInnerWidth());
        $("#overlay").height(getWindowInnerHeight());
        $("#overlay").css({"display":"block"});
    }

    /**显示Loading提示*/
    function showLoading() {
        // 先显示遮罩层
        showOverlay();

        // Loading提示窗口居中
        $("#loadingTip").css('top',
            (getWindowInnerHeight() - $("#loadingTip").height()) / 2 + 'px');
        $("#loadingTip").css('left',
            (getWindowInnerWidth() - $("#loadingTip").width()) / 2 + 'px');

        $("#loadingTip").show();
        $(document).scroll(function() {
            return false;
        });
    }

    function hideLoading(){
        $("#loadingTip").hide();
        $("#overlay").hide();
    }
};

/**放置各种事件**/
XML_D.Event = {
    /**鼠标移动事件中添加鼠标点击事件*/
    onDocumentMouseMove : function(event){
        event.preventDefault();

        $(XML_D.init.initData.container).unbind("mousedown");
        $(XML_D.init.initData.container).bind("mousedown",XML_D.Event.onMouseDown_overGeometry);
    },

    /**当点击物体时,对物体进行操作*/
    onMouseDown_overGeometry : function(event) {
        event.preventDefault();

        var intersects = XML_D.Raycaster.getRaycaster(event,true);
        /**对操作柜体
         * 1.选中柜体时，操作柜体
         * 2.未选中时，清空选中柜体的信息**/

        if ( intersects.length > 0 ) {

            findMesh(intersects);
            function findMesh(currentObject){
                for(var i = 0; i < currentObject.length;i++){
                    if(currentObject[i].object.constructor == THREE.Mesh){
                        Open(intersects[i].object);
                        return;
                    }
                }
            };
            function Open(currentObject){
                if(currentObject.parent.constructor == THREE.Object3D){
                    if(currentObject.parent.GoodsType == "掩门"){
                        if(parseFloat(currentObject.parent.OpenDir) == 0){
                            if(currentObject.parent.OpenClose){
                                currentObject.parent.rotateY(-Math.PI/2);

                                currentObject.parent.az = 90;
                                currentObject.parent.OpenClose = false;
                            }else{
                                currentObject.parent.rotateY(XML_D.Math.Angle.changeToRadian(parseFloat(currentObject.parent.az)));
                                currentObject.parent.OpenClose = true;
                            }
                        }

                        if(parseFloat(currentObject.parent.OpenDir) == 1){
                            var width = parseFloat(currentObject.parent.width);
                            if(currentObject.parent.OpenClose){
                                currentObject.parent.rotateY(Math.PI/2);
                                currentObject.parent.position.x += width;
                                currentObject.parent.position.z += width;

                                currentObject.parent.az = -90;
                                currentObject.parent.OpenClose = false;
                            }else{
                                var angle = parseFloat(currentObject.parent.az);
                                var x = 0;
                                var z = 0;
                                if(angle < -90){
                                    angle += 90;
                                    x = width + width * Math.sin(-angle/180*Math.PI);
                                    z = width * Math.cos(-angle/180*Math.PI);
                                }else{
                                    x = width - width * Math.cos(-angle/180*Math.PI);
                                    z = width * Math.sin(-angle/180*Math.PI);
                                }

                                currentObject.parent.rotateY(XML_D.Math.Angle.changeToRadian(currentObject.parent.az));
                                currentObject.parent.position.x -= x;
                                currentObject.parent.position.z -= z;
                                currentObject.parent.OpenClose = true;
                            }
                        }

                    }

                    if(currentObject.parent.GoodsType == "上翻门"){
                        if(parseFloat(currentObject.parent.OpenDir) == 0){
                            if(currentObject.parent.OpenClose){
                                currentObject.parent.rotateX(-Math.PI/2);

                                currentObject.parent.ax = 90;
                                currentObject.parent.OpenClose = false;
                            }else{
                                currentObject.parent.rotateX(XML_D.Math.Angle.changeToRadian(180-parseFloat(currentObject.parent.ax)));
                                currentObject.parent.OpenClose = true;
                            }
                        }
                    }

                    if(currentObject.parent.GoodsType == "抽屉"){

                        var depth = parseFloat(currentObject.parent.depth);
                        if(currentObject.parent.OpenClose){
                            currentObject.parent.position.z += depth * 0.6;
                            currentObject.parent.OpenClose = false;
                        }else{
                            console.log(currentObject.parent.position)
                            currentObject.parent.position.z -= depth * 0.6;
                            currentObject.parent.OpenClose = true;
                        }

                    }

                    if(currentObject.parent.GoodsType == "下翻门"){
                        if(parseFloat(currentObject.parent.OpenDir) == 0){
                            if(currentObject.parent.OpenClose){
                                currentObject.parent.rotateX(Math.PI/2);

                                currentObject.parent.ax = 90;
                                currentObject.parent.OpenClose = false;
                            }else{
                                currentObject.parent.rotateX(XML_D.Math.Angle.changeToRadian(-parseFloat(currentObject.parent.ax)));
                                currentObject.parent.OpenClose = true;
                            }
                        }
                    }

                    XML_D.init.initThree.renderScene();
                    XML_D.init.initThree.renderScene();
                }else{
                    Open(currentObject.parent);
                }
            };

             /*********************操作UI************************************************
             * 1. 设置柜体名称
             * 2. 显示选择按钮
             * 3. 图片添加点击事件 **/
            if(intersects[0].object.constructor == THREE.Mesh){
                //添加板件名称
                if(intersects[0].object.parent.constructor == THREE.Group){
                    $("#component_name")[0].innerHTML = intersects[0].object.parent.name;
                }else{
                    $("#component_name")[0].innerHTML = intersects[0].object.name;
                }

                //1. 设置柜体名称
                SetCabinetName(intersects[0].object);
            }
            //1. 地柜设置柜体的名称，设置柜体名称
            function SetCabinetName(object){
                if(object.parent.parent.constructor == THREE.Scene){
                    $("span.name")[0].innerHTML = object.parent.name;
                }else{
                    SetCabinetName(object.parent);
                }
            }
            //显示选择按钮
            $("#selection_panel").show();
            //把选中的几何体存储
            XML_D.DtaFields.CurrentGeometry.geometry = intersects[0].object;

            /*********************操作UI************************************************/

            var loder = new THREE.FontLoader();
            loder.load("js/font/helvetiker_regular.typeface.js", function (font) {

                boder1();

                /**添加选中物体的轮廓**/
                function boder(){
                    /**设置选中物体边框******************************************************
                     * 1. 去掉上一个物体的边框
                     * 2. 给当前选中的物体加上边框
                     * 3. 保存当前物体和参数 **/
                    // 1. 去掉上一个物体的边框
                    if (XML_D.init.UIDate.splineObject != null) {
                        XML_D.init.UIDate.splineObject.remove(XML_D.init.UIDate.splineObject.helper);
                    }

                    // 2. 给当前选中的物体加上边框
                    var object = intersects[0].object;
                    var edges = new THREE.EdgesGeometry(object.geometry);
                    var line = new THREE.LineSegments(edges);
                    var helper = new THREE.BoxHelper(line);
                    object.add(helper);


                    //// 3. 保存当前物体和参数
                    XML_D.init.UIDate.splineObject = object;
                    XML_D.init.UIDate.splineObject.helper = helper;

                    //边框顶点的位置
                    var position = helper.geometry.getAttribute("position").array;
                    //边框顶点
                    var index = helper.geometry.getIndex("index").array;

                    //遍历边框，找到边框的所有边，并添加边的长度
                    for (var i = 0; i < index.length; i += 2) {
                        var a = new THREE.Vector3(
                            position[index[i] * 3],
                            position[index[i] * 3 + 1],
                            position[index[i] * 3 + 2]
                        );
                        var b = new THREE.Vector3(
                            position[index[i + 1] * 3],
                            position[index[i + 1] * 3 + 1],
                            position[index[i + 1] * 3 + 2]
                        );

                        //计算两点间的距离
                        var distance = a.distanceTo(b);

                        var dir = new THREE.Vector3( -1, 0, 0 );
                        var origin = new THREE.Vector3(
                            (a.x + b.x )/2,
                            (a.y + b.y )/2,
                            (a.z + b.z )/2
                        );
                        var length = 1000;
                        var hex = 0xffff00;

                        var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
                        XML_D.init.UIDate.splineObject.helper.add( arrowHelper );

                        var textGeometry = new THREE.TextGeometry(distance, {
                            font: font,
                            size: 50,
                            height: 2,
                            curveSegments: 12
                        });

                        var textMaterial = new THREE.MeshPhongMaterial({
                            color: 0xffffff
                        });
                        var text = new THREE.Mesh(textGeometry, textMaterial);
                        text.position.set(
                            (position[index[i + 1] * 3] + position[index[i] * 3])/2,
                            (position[index[i + 1] * 3 + 1] + position[index[i] * 3 + 1])/2,
                            (position[index[i + 1] * 3 + 2] + position[index[i] * 3 + 2])/2
                        );

                        text.rotateY(-2*Math.PI/4);
                        XML_D.init.UIDate.splineObject.helper.add(text);
                    }
                    /**设置选中物体边框******************************************************/
                }

                /**添加选中物体的边框（链接物体的顶点）**/
                function boder1(){

                    /**设置选中物体边框******************************************************
                     * 1. 去掉上一个物体的边框
                     * 2. 给当前选中的物体加上边框
                     * 3. 保存当前物体和参数 **/
                    //1. 去掉上一个物体的边框
                    if (XML_D.init.UIDate.splineObject != null) {
                        XML_D.init.initThree.scene.remove(XML_D.init.UIDate.splineObject);
                    }

                    //也可能选中的是轮廓，要给mesh加上轮廓
                    for(var i = 0;i <intersects.length;i++){
                        if(intersects[i].object.constructor == THREE.Mesh){
                            //2. 给当前选中的物体加上边框
                            var object = intersects[i].object;
                            var deges = new THREE.EdgesHelper( object, 0xff0000);
                            XML_D.init.initThree.scene.add(deges);

                            // 3. 保存当前物体和参数
                            XML_D.init.UIDate.splineObject = deges;
                            return;
                        }
                    }

                    /**判断几何体是规则的几何体，添加长宽**/
                    if(object.geometry.parameters){

                        var tag = {
                            x : {
                                value : 0,
                                position : new THREE.Vector3()
                            },
                            y : {
                                value : 0,
                                position : new THREE.Vector3()
                            }
                        };
                        //几何体的边长
                        var wtdth = object.geometry.parameters.width;
                        var height = object.geometry.parameters.height;
                        var depth = object.geometry.parameters.depth;

                        //显示两个最大的边
                        if(wtdth < height && wtdth < depth){
                            tag.x.value = height;
                            tag.y.value = depth;
                        }
                        if(height < wtdth && height < depth){
                            tag.x.value = wtdth;
                            tag.y.value = depth;
                        }
                        if(depth < height && depth < wtdth){
                            tag.x.value = wtdth;
                            tag.y.value = height;
                        }

                        //边框顶点的位置
                        var position = deges.geometry.getAttribute("position").array;

                        for(var i = 0 ; i < position.length; i += 6){
                            var a = new THREE.Vector3(
                                position[i],
                                position[i + 1],
                                position[i + 2]
                            );
                            var b = new THREE.Vector3(
                                position[i + 3],
                                position[i + 4],
                                position[i + 5]
                            );

                            //计算两点间的距离
                            var distance = a.distanceTo(b);

                            //判断相等，添加位置
                            if(tag.x.value == distance){
                                tag.x.position = new THREE.Vector3(
                                    (a.x + b.x )/2,
                                    (a.y + b.y )/2,
                                    (a.z + b.z )/2
                                );
                            }
                            if(tag.y.value == distance){
                                tag.y.position = new THREE.Vector3(
                                    (a.x + b.x )/2,
                                    (a.y + b.y )/2,
                                    (a.z + b.z )/2
                                );
                            }

                            ///**添加测试箭头**/
                            //var dir = new THREE.Vector3( -1, 0, 0 );
                            //var origin = new THREE.Vector3(
                            //    (a.x + b.x )/2,
                            //    (a.y + b.y )/2,
                            //    (a.z + b.z )/2
                            //);
                            //
                            //var length = 1000;
                            //var hex = 0xffff00;
                            //
                            //var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
                            //XML_D.init.UIDate.splineObject.add( arrowHelper );
                        }

                        /**兴建字体，添加到线段的中间**/
                        var textGeometry = new THREE.TextGeometry(tag.x.value, {
                            font: font,
                            size: 50,
                            height: 2,
                            curveSegments: 12
                        });

                        var textMaterial = new THREE.MeshPhongMaterial({
                            color: 0xffffff
                        });
                        var text = new THREE.Mesh(textGeometry, textMaterial);
                        text.position.set(
                            tag.x.position.x,
                            tag.x.position.y,
                            tag.x.position.z
                        );
                        XML_D.init.UIDate.splineObject.add(text);

                        /**兴建字体，添加到线段的中间**/
                        var textGeometry = new THREE.TextGeometry(tag.y.value, {
                            font: font,
                            size: 50,
                            height: 2,
                            curveSegments: 12
                        });

                        var textMaterial = new THREE.MeshPhongMaterial({
                            color: 0xffffff
                        });
                        var text = new THREE.Mesh(textGeometry, textMaterial);
                        text.position.set(
                            tag.y.position.x,
                            tag.y.position.y,
                            tag.y.position.z
                        );
                        XML_D.init.UIDate.splineObject.add(text);
                    }
                }
            });
        }else{
            // 1. 去掉上一个物体的边框
            if (XML_D.init.UIDate.splineObject != null) {
                XML_D.init.initThree.scene.remove(XML_D.init.UIDate.splineObject);
            }
            //清空保存的的当前柜体
            XML_D.DtaFields.CurrentGeometry.geometry = null;

            $("span.name")[0].innerHTML = "当前未选中柜体";
            //影藏选择按钮
            $("#selection_panel").hide();

            $("li.zhujian").hide();

            XML_D.init.initThree.renderScene();
        };
    },

    /**
     * 窗口重置事件 */
    onWindowResize : function(event) {
        XML_D.init.initThree.camera.aspect = window.innerWidth / window.innerHeight;
        XML_D.init.initThree.camera.updateProjectionMatrix();
        XML_D.init.initThree.renderer.setSize( window.innerWidth, window.innerHeight);
        //controls.handleResize();
        XML_D.init.initThree.renderScene();
    },

    /**鼠标滚轮事件*/
    onDocumentMouseWheel : function(event){
        // WebKit
        if ( event.wheelDeltaY ) {
            XML_D.init.initThree.camera.translateZ(event.wheelDeltaY);
        } else if ( event.wheelDelta ) {
            XML_D.init.initThree.camera.translateZ(event.wheelDelta);
            // Firefox
        } else if ( event.detail ) {
            XML_D.init.initThree.camera.translateZ(event.detail);
        }
        XML_D.init.initThree.renderScene();
    },

    /**给图片添加点击事件，完成更换贴图**/
    addMaterialEvent :function(){
        //图片添加点击事件
        $("img.material").unbind("mouseup");
        $("img.material").bind("mouseup", function () {
            XML_D.Event.changeMaterial(this.alt);
        });

        /****************完成图片拖动更换贴图的效果***************/
        var alt;
        var src;
        var img_wigth = 100;
        var img_height = 100;
        //图片添加点击事件
        $("img.material").unbind("mousedown");
        $("img.material").bind("mousedown", function (event) {
            event.preventDefault();
            alt = this.alt;
            src = this.src;

            /*
             * 在图片的属性中加上{filter:alpha(opacity=50); -moz-opacity:0.5; -khtml-opacity: 0.5; opacity: 0.5;}
             opacity是最重要的，因为它是CSS透明的标准属性，取值范围在0-1之间，目前支持的浏览器有：
             Firefox、Chrome、Opera、Safari。（也就是说，除了IE，它支持所有主流浏览器）；
             filter:alpha(opacity=50);是专门给IE设定的属性，取值的范围在0-100之间；
             -moz-opacity是为了兼容一些老版本的Mozilla浏览器，取值范围在0-1之间；
             -khtml-opacity是为了兼容一些老版本的Safari浏览器，取值范围在0-1之间。*/

            $("body").append("<div id='DragImage'><img src='img/maps/4021-22439-12.jpg'/></div>");
            $("#DragImage").css("position","absolute");

            $("img","#DragImage").width(img_wigth).height(img_height).css("filter","alpha(opacity=10)").css("opacity","0.5");
        });

        $(document).unbind("mousemove");
        $(document).bind("mousemove", function(event){
            var positionX = event.clientX - img_wigth/2;
            var positionY = event.clientY - img_height/2;
            var myOffset = new Object();
            myOffset.left = positionX;
            myOffset.top = positionY;

            $("img","#DragImage").offset(myOffset);
        });

        $(document).unbind("mouseup");
        $(document).bind("mouseup", function(event){
            //移除拖动显示的图片
            $("#DragImage").remove();
            //获得当前鼠标指向的几何体
            var intersects = XML_D.Raycaster.getRaycaster(event,true);
            if ( intersects.length > 0 ) {
                /*********************操作UI************************************************
                 * 1. 设置柜体名称
                 * 2. 显示选择按钮
                 * 3. 把选中的几何体存储**/
                if(intersects[0].object.constructor == THREE.Mesh){
                    //添加板件名称
                    if(intersects[0].object.parent.constructor == THREE.Group){
                        $("#component_name")[0].innerHTML = intersects[0].object.parent.name;
                    }else{
                        $("#component_name")[0].innerHTML = intersects[0].object.name;
                    }

                    //1. 设置柜体名称
                    SetCabinetName(intersects[0].object);
                }
                //1. 地柜设置柜体的名称，设置柜体名称
                function SetCabinetName(object){
                    if(object.parent.parent.constructor == THREE.Scene){
                        $("span.name")[0].innerHTML = object.parent.name;
                    }else{
                        SetCabinetName(object.parent);
                    }
                }
                //显示选择按钮
                $("#selection_panel").show();
                //把选中的几何体存储
                XML_D.DtaFields.CurrentGeometry.geometry = intersects[0].object;

                //用拖动的几何体贴图
                if(alt){
                    XML_D.Event.changeMaterial(alt);
                }
            }
            alt = null;
        });
        /****************完成图片拖动更换贴图的效果***************/

        //img1(intersects);
        /**弹出窗体 */
        function img1(intersects) {
            /**当前的组件是普通的板件*/
            if (intersects[0].object.parent.constructor == THREE.Object3D) {
                //添加组合柜的名称
                $("#title")[0].innerHTML = intersects[0].object.parent.name + "<img src='img/2012100814082487.jpg' alt='关闭'>";
            } else {
                /**当前的组件是包裹在一个group中的*/
                if (intersects[0].object.parent.constructor == THREE.Group) {
                    //添加组合柜的名称
                    $("#title")[0].innerHTML = intersects[0].object.parent.parent.name + "<img src='img/2012100814082487.jpg' alt='关闭'>";
                }
            }


            //关闭窗口
            $(".title img").unbind("click");
            $(".title img").bind("click", function () {
                $(this).parent().parent().hide("slow");
            });

            //弹出窗体
            $("#myDiv").show().css({'left': event.clientX, 'top': event.clientY});
        }
    },
    /**改变柜体的贴图**/
    changeMaterial : function(alt){
        //加载图片
        var paramater = {
            division: "\/",
            preDir: XML_D.init.initURL.imgUrl
        };
        var url = XML_D.URL.transformURL(alt, paramater);
        var loader = new THREE.TextureLoader();
        var texture = loader.load(url, function () {
            XML_D.init.initThree.renderScene();
        });

        /**判断是否有当前选中了对象
         * 1. 当选中几何体时，对相应的柜体进行操作
         * 2. 当没有选中柜体的时候，默认更换所有柜体的贴图**/
        if(XML_D.DtaFields.CurrentGeometry.geometry){
            //选中操作单个板件
            if (XML_D.init.UIDate.checked) {
                //更换贴图的材质
                updateMaterial(XML_D.DtaFields.CurrentGeometry.geometry);

                /**保存修改了的几何体
                 * 1. 创建待修改的对象
                 * 2. 检查修改数据中书否存在当前对象**/
                var tag = true;
                var updateDate = XML_D.DtaFields.updateDate.ObjectList;
                for(var i = 0;i < updateDate.length;i++){
                    if(updateDate[i].NodeID == XML_D.DtaFields.CurrentGeometry.geometry.NodeID){
                        updateDate[i].url = url;
                        tag = false;
                    }
                }
                if(tag){
                    var Object = {};
                    Object.NodeID = XML_D.DtaFields.CurrentGeometry.geometry.NodeID;
                    Object.url = url;
                    XML_D.DtaFields.updateDate.ObjectList.push(Object);
                }

            } else { //选中操作整个柜体
                /**当前的组件是普通的板件*/
                if (XML_D.DtaFields.CurrentGeometry.geometry.parent.constructor == THREE.Object3D) {
                    //当前柜体
                    var currentObject = XML_D.DtaFields.CurrentGeometry.geometry.parent;
                    for (var j = 0; j < currentObject.children.length; j++) {
                        if (currentObject.children[j].constructor == THREE.Mesh) {
                            //更换贴图的材质
                            updateMaterial(currentObject.children[j]);
                        }
                        if (currentObject.children[j].constructor == THREE.Group) {
                            //更换贴图的材质
                            updateMaterial(currentObject.children[j].children[0]);
                        }
                    }
                    setupDateDate_Material();
                } else {
                    /**当前的组件是包裹在一个group中的*/
                    if (XML_D.DtaFields.CurrentGeometry.geometry.parent.parent.parent.constructor == THREE.Scene) {
                        var currentObject = XML_D.DtaFields.CurrentGeometry.geometry.parent.parent;
                        for (var j = 0; j < currentObject.children.length; j++) {
                            if (currentObject.children[j].constructor == THREE.Mesh) {
                                //更换贴图的材质
                                updateMaterial(currentObject.children[j]);
                            }
                            if (currentObject.children[j].constructor == THREE.Group) {
                                //更换贴图的材质
                                updateMaterial(currentObject.children[j].children[0]);
                            }
                        }
                        setupDateDate_Material();
                    }
                }
                /**保存修改了的几何体
                 * 1. 创建待修改的对象
                 * 2. 检查修改数据中书否存在当前对象**/
                function setupDateDate_Material(){

                    //2. 检查修改数据中书否存在当前对象
                    var tag = true;
                    var updateDate = XML_D.DtaFields.updateDate.ComposeGroup;
                    for(var i = 0;i < updateDate.length;i++){
                        if(updateDate[i].NodeID == currentObject.NodeID){
                            updateDate[i].url = url;
                            tag = false;
                        }
                    }
                    if(tag){
                        var ComposeGroup = {};
                        ComposeGroup.NodeID = currentObject.NodeID;
                        ComposeGroup.url = url;
                        XML_D.DtaFields.updateDate.ComposeGroup.push(ComposeGroup);
                    }
                }
            }
        }else{
            /** 2. 当没有选中柜体的时候，默认更换所有柜体的贴图
             *  2.1 递归查找所有场景中的网格
             *  2.2 当网格是Mesh时，更换网格的贴图*/
            yugi(XML_D.init.initThree.scene);
            function yugi(object){
                object.children.forEach(function(k){
                    if(k.constructor == THREE.Mesh){
                        //更换贴图的材质
                        updateMaterial(k);
                    }
                    if(k.children.length > 0){
                        yugi(k);
                    }
                });
            };

            //保存更改
            XML_D.DtaFields.updateDate.ComposeList.url = url;
        };

        /**创建新的材质，更换贴图**/
        function updateMaterial(mesh){
            //判断是否是独立花色
            if(mesh.keepmat != "1"){
                var material = new THREE.MeshPhongMaterial( {
                    color : 0xffffff,
                    map : texture,
                    shininess : parseFloat(mesh.material.shininess)
                });

                material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
                if(mesh.material.repeat){
                    var repeat = mesh.material.repeat;
                    material.map.repeat.set(repeat.x ,repeat.y);
                }
                mesh.material = material;
            }
        }
    },

    dbclick : function(){
        $(XML_D.init.initData.container).unbind("dblclick");
        $(XML_D.init.initData.container).bind("dblclick",function(){
            var intersects = XML_D.Raycaster.getRaycaster(event,true);
            if ( intersects.length > 0 ) {
                if(intersects[0].object.parent.constructor == THREE.Object3D){
                    intersects[0].object.parent.rotateY(-Math.PI/2);
                }

            };
        });

    },

    /** 全屏 **/
    fullscreen : function(){
        elem = document.body;
        if(elem.webkitRequestFullScreen){
            elem.webkitRequestFullScreen();
        }else if(elem.mozRequestFullScreen){
            elem.mozRequestFullScreen();
        }else if(elem.requestFullScreen){
            elem.requestFullscreen();
        }else{
            //浏览器不支持全屏API或已被禁用
        }
    },
    /** 退出全屏 **/
    exitFullscreen :function(){
        var elem=document;
        if(elem.webkitCancelFullScreen){
            elem.webkitCancelFullScreen();
        }else if(elem.mozCancelFullScreen){
            elem.mozCancelFullScreen();
        }else if(elem.cancelFullScreen){
            elem.cancelFullScreen();
        }else if(elem.exitFullscreen){
            elem.exitFullscreen();
        }else{
            //浏览器不支持全屏API或已被禁用
        }
    }
};

/**
 * 设置拉伸体的贴图坐标
 * 1.计算拉伸后，生成的各点的最大长宽
 * 2.遍历拉伸后生成的的面
 * 3.获得组成三角形面的三个点的保存位置编号
 * 4.根据位置编号找到对应点的位置坐标
 * 5.根据位置坐标计算贴图坐标，并进行设置
 *
 * 参数：
 * tag : 标记状态
 * geometry ：图形
 * parameters ={
 *   rotate : 贴图坐标的旋转角度（角度制）
 *   DirType ： 几何体拉伸的方向(0:x,1:z,2:y)
 * }**/
XML_D.Fun.ExtrudeMapUV = function(tag,geometry,parameters){
    //初始化
    this.tag = tag;
    this.geometry = geometry;
    this.parameter = {
        rotate : parameters.rotate ? parameters.rotate : 0,
        DirType: parameters.DirType ? parameters.DirType : 0
    };

    //1.计算拉伸后，生成的各点的最大长宽
    this.tag = XML_D.Utils.OperationVec3(this.tag,null,this.geometry.vertices);

    //2.遍历拉伸后生成的的面
    for(var j = 0 ;j < this.geometry.faces.length; j++){
        var list = [];
        //获得组成三角形面的三个点的坐标
        var firstPoint = parseInt(this.geometry.faces[j].a);
        var secondPoint = parseInt(this.geometry.faces[j].b);
        var thirdPoint = parseInt(this.geometry.faces[j].c);

        //根据拉伸方向设置贴图方向
        if(this.parameter.DirType == 1 || this.parameter.DirType == 2){
            //4.根据位置编号找到对应点的位置坐标 5.根据位置坐标计算贴图坐标，并进行设置
            list.push(
                new THREE.Vector2(
                    (this.geometry.vertices[firstPoint].y - tag.min_y) / tag.y,
                    (this.geometry.vertices[firstPoint].x - tag.min_x) / tag.x
                )
            );

            list.push(
                new THREE.Vector2(
                    (this.geometry.vertices[secondPoint].y - tag.min_y) / tag.y,
                    (this.geometry.vertices[secondPoint].x - tag.min_x) / tag.x
                )
            );
            list.push(
                new THREE.Vector2(
                    (this.geometry.vertices[thirdPoint].y - tag.min_y) / tag.y,
                    (this.geometry.vertices[thirdPoint].x - tag.min_x) / tag.x
                )
            );
        }else {
            //4.根据位置编号找到对应点的位置坐标 5.根据位置坐标计算贴图坐标，并进行设置
            list.push(
                new THREE.Vector2(
                    (this.geometry.vertices[firstPoint].x - tag.min_x) / tag.x,
                    (this.geometry.vertices[firstPoint].y - tag.min_y) / tag.y
                )
            );

            list.push(
                new THREE.Vector2(
                    (this.geometry.vertices[secondPoint].x - tag.min_x) / tag.x,
                    (this.geometry.vertices[secondPoint].y - tag.min_y) / tag.y
                )
            );
            list.push(
                new THREE.Vector2(
                    (this.geometry.vertices[thirdPoint].x - tag.min_x) / tag.x,
                    (this.geometry.vertices[thirdPoint].y - tag.min_y) / tag.y
                )
            );
        }

        this.geometry.faceVertexUvs[0][j] = list;
    }

    return this.tag;
};

/**GUI插件的操作**/
XML_D.GUI = {

    //初始化GUI
    initGUI : function(){
        //根据不同的设备，加载不同的GUI
        if(XML_D.broweser.versions.mobile){
            this.initGUI_mobile();
        }else{
            XML_D.QrCode();
            this.initGUI_Pc();
        }

        //把更改传输到后台
        $(".update").unbind("click");
        $(".update").bind("click",function(){
            $.ajax({
                url: "http://www.itthome.com/OnlinePro/Web3DFurniture.ashx",
                data:JSON.stringify(XML_D.DtaFields.updateDate),
                type:'post',
                dataType:'json',
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                success: function (data) {
                    console.log(data);
                }
            });
        });

    },
    //初始化页面的控制框
    initGUI_Pc : function(){
        //是否选中单个板件
        $(".checked").each(function(){
            $(this).unbind("click");
            $(this).bind("click",function(){

                if(this.value == 1){
                    $("li.zhujian").show();
                    XML_D.init.UIDate.checked = true;
                }else{
                    $("li.zhujian").hide();
                    XML_D.init.UIDate.checked = false;
                }
            });
        });

        //添加开关
        $("#close").unbind("click");
        $("#close").bind("click",function(){
            if($(this).parent().siblings().is(":hidden")){
                $(this).parent().siblings().show("normal");
            }else{
                $(this).parent().siblings().hide("normal","linear");
            }
        });

        //添加或删除边框
        $("#show_border").unbind("change");
        $("#show_border").bind("change",function(){
            if($("#show_border")[0].checked){
                for(var i = 0;i < XML_D.init.initThree.scene.children.length;i++ ){
                    if(XML_D.init.initThree.scene.children[i].constructor == THREE.EdgesHelper){
                        XML_D.init.initThree.scene.children[i].visible = true;
                    }
                    XML_D.init.initThree.renderScene();
                }
            }else{
                for(var i = 0;i < XML_D.init.initThree.scene.children.length;i++ ){
                    if(XML_D.init.initThree.scene.children[i].constructor == THREE.EdgesHelper){
                        XML_D.init.initThree.scene.children[i].visible = false;
                    }
                    XML_D.init.initThree.renderScene();
                }
            }
        });

        //图片的放置位置
        var material_Container = $("#aside .material_Container");
        this.load_Material(material_Container,this.addMataerial_pc);

        $("#aside").show();
    },

    /**手机上的图片轮播 （移动端图片轮播）**/
    initGUI_mobile : function(){
        //添加保存按钮
        $("body").append("<button class='update' id='save_moble'>保存</button>");
        $("#save_moble").css({
            position: "relative",
            float: "right",
            padding: "1%",
            width: "50%",
            fontSize: "51px"
        });

        //显示边框
        $("body").append("<div id='border_div'>显示边框:</div>");
        $("#border_div").css({
            position: "relative",
            background: "#AAAAAA",
            width:"48%",
            padding: "1%",
            fontSize:" 54px",
            borderBottom: "1px solid #D9D9D9"
        });

        //添加保存按钮
        $("#border_div").append("<input id='moble_show_border' type='checkbox' checked/>");
        $("#moble_show_border").css({
            width: "50px",
            height: "50px",
            top: "5px",
            position: "relative"
        });

        //添加或删除边框
        $("#moble_show_border").unbind("change");
        $("#moble_show_border").bind("change",function(){
            if($("#moble_show_border")[0].checked){
                for(var i = 0;i < XML_D.init.initThree.scene.children.length;i++ ){
                    if(XML_D.init.initThree.scene.children[i].constructor == THREE.EdgesHelper){
                        XML_D.init.initThree.scene.children[i].visible = true;
                    }
                    XML_D.init.initThree.renderScene();
                }
            }else{
                for(var i = 0;i < XML_D.init.initThree.scene.children.length;i++ ){
                    if(XML_D.init.initThree.scene.children[i].constructor == THREE.EdgesHelper){
                        XML_D.init.initThree.scene.children[i].visible = false;
                    }
                    XML_D.init.initThree.renderScene();
                }
            }
        });

        //设置默认选中当个板件
        XML_D.init.UIDate.checked = true;

        //图片的放置位置
        var material_Container = $(".slider").children("ul");
        this.load_Material(material_Container,this.addMataerial_mobloe);
    },

    /**手机上的图片轮播 （JS动态可控制左右滚动的图片）**/
    initGUI_mobile1 : function(){
        /*******************控制div的显示生成************************/
        //图片的放置位置
        var material_Container = $("#mobile").children("div.material_Container");
        this.load_Material(material_Container,this.addMataerial2_pc);

        $("#mobile").show();
    },

    controls : {},
    setupGui : function() {

        /**
         * maps中存放贴图的名称和贴图的名称 */
        var maps = {
            "顺路快递" :{url:"1614-31376.jpg"},
            "版本" :{url:"1620-28776.jpg"}
        };

        //用于控制
        XML_D.GUI.controls = new function () {
            this.baseUrl = "img/maps/";
            this.url = "img/maps/1552-25004.jpg";
            this.show = true;
            this.map = 1;
            this.maps = "chrome";
        };

        var gui = new dat.GUI();

        /** 添加 materials 控制框 **/
        var folderMaterials = gui.addFolder( "Materials" );
        folderMaterials.add( XML_D.GUI.controls, "map", [1,2] ).name( "Map").onChange(XML_D.GUI.translateMap);

        for ( var m in maps ) {
            XML_D.GUI.controls[ m ] = XML_D.GUI.createHandler( m,maps );
            folderMaterials.add( XML_D.GUI.controls, m ).name( m );
        }

        /** 添加 Mesh 控制框 **/
        var folderMesh = gui.addFolder( "Mesh" );
        folderMesh.add( XML_D.GUI.controls, "show", false ).onChange( XML_D.GUI.hiddenObject );
    },

    /**转换贴图坐标*/
    translateMap : function(e){
        //控制物体贴图的转换
        if(XML_D.init.initData.mesh){
            switch(e){
                case "1" :
                    XML_D.GUI.controls.url = XML_D.GUI.controls.baseUrl + "2028-7448-4.jpg";
                    break;
                case "2" :
                    XML_D.GUI.controls.url = XML_D.GUI.controls.baseUrl + "1621-26403.jpg";
                    break;
            }

            var loader = new THREE.TextureLoader();
            var textureMap = loader.load(XML_D.GUI.controls.url,function(){
                XML_D.init.initThree.renderScene();
            });
            textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping;

            if(XML_D.init.initData.mesh.constructor == THREE.Group){
                //遍历父节点下的所有子节点
                for(var i = 0; i < XML_D.init.initData.mesh.children.length; i++){
                    if(XML_D.init.initData.mesh.children[i].constructor == THREE.Group){
                        XML_D.init.initData.mesh.children[i].children[0].material.map = textureMap
                    }else{
                        XML_D.init.initData.mesh.children[i].material.map = textureMap;
                    }
                }
            }else{
                XML_D.init.initData.mesh.material.map = textureMap
            }

        }
        XML_D.init.initThree.renderScene();
    },

    /**用于隐藏物体*/
    hiddenObject : function(){
        if(XML_D.init.initData.mesh){
            XML_D.init.initData.mesh.visible = XML_D.GUI.controls.show;
        }
        XML_D.init.initThree.renderScene();
    },

    /**
     * 回调函数
     * 给控制 controls 中的 maps 用
     *
     * id : 数据的id
     * data : 存放数据的对象*/
    createHandler:function( id,data ) {
        return function() {
            //控制物体贴图的转换
            if(XML_D.init.initData.mesh){
                XML_D.GUI.controls.url = XML_D.GUI.controls.baseUrl + data[id].url;
                var loader = new THREE.TextureLoader();
                textureMap = loader.load(XML_D.GUI.controls.url,function(texture){
                    texture.needsUpdate = true;
                    XML_D.init.initThree.renderScene();
                });
                textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping;

                if(XML_D.init.initData.mesh.constructor == THREE.Group){
                    //遍历父节点下的所有子节点
                    for(var i = 0; i < XML_D.init.initData.mesh.children.length; i++){

                        if(XML_D.init.initData.mesh.children[i].constructor == THREE.Group){
                            XML_D.init.initData.mesh.children[i].children[0].material.map = textureMap
                        }else{
                            XML_D.init.initData.mesh.children[i].material.map = textureMap;
                        }
                    }
                }else{
                    XML_D.init.initData.mesh.material.map = textureMap
                }
            }
            XML_D.init.initThree.renderScene();
        }
    },

    /**
     * 加载贴图，添加到显示图框中 **/
    load_Material : function(container,callback){
        /**
         * 加载贴图，添加到显示图框中
         * 1. 从服务器上获取图片
         * 2. 如果服务器上获取失败，使用默认图片**/
        $.ajax({
            url: "http://www.itthome.com/OnlineProducts/ajax/productMatInfo.ashx",
            success: function (data) {
                var obj = eval(data);
                callback(container,obj);
            },
            error : function(){
                var strjson = "[{ID:'6',Name:'艳阳',Number:'4028-22555-1',ImagePath:'http://www.itthome.com/OnlineProducts/Products/ProductMaterial/jpg/4028-22555-1.jpg',XImagePath:'http://www.itthome.com/OnlineProducts/Products/ProductMaterial/xjpg/4028-22555-1.jpg',Shininess:'30',Smoothness:'30',UpdateTime:'2016/6/3 13:51:32'},{ID:'7',Name:'雅思',Number:'4021-22439-12',ImagePath:'http://www.itthome.com/OnlineProducts/Products/ProductMaterial/jpg/4021-22439-12.jpg',XImagePath:'http://www.itthome.com/OnlineProducts/Products/ProductMaterial/xjpg/4021-22439-12.jpg',Shininess:'30',Smoothness:'30',UpdateTime:'2016/6/3 14:18:32'},{ID:'8',Name:'酒红',Number:'4014-22439-5',ImagePath:'http://www.itthome.com/OnlineProducts/Products/ProductMaterial/jpg/4014-22439-5.jpg',XImagePath:'http://www.itthome.com/OnlineProducts/Products/ProductMaterial/xjpg/4014-22439-5.jpg',Shininess:'40',Smoothness:'40',UpdateTime:'2016/6/3 14:19:17'},{ID:'9',Name:'雅韵',Number:'4022-22439-13',ImagePath:'http://www.itthome.com/OnlineProducts/Products/ProductMaterial/jpg/4022-22439-13.jpg',XImagePath:'http://www.itthome.com/OnlineProducts/Products/ProductMaterial/xjpg/4022-22439-13.jpg',Shininess:'70',Smoothness:'70',UpdateTime:'2016/6/3 14:20:20'}]";
                var obj = eval(strjson);
                callback(container,obj);
            }
        });
    },

    /**pc 向指定的容器中放入贴图材料**/
    addMataerial_mobloe : function(container,obj){
        for(var i = 0 ; i < obj.length; i++){
            $(container).append("<li><img src='"+ obj[i].XImagePath +"' class='material' alt='"+ obj[i].ImagePath +"'></li>")
        }
        $(".slider").yxMobileSlider({width:640,height:80,during:2000,number:5,blank:6});

        XML_D.Event.addMaterialEvent();
    },

    /**pc 向指定的容器中放入贴图材料**/
    addMataerial_pc : function(container,obj){

        for(var i = 0 ; i < obj.length; i++){
            container.each(function(){
                $(this).append("<DIV class='box'><img src='"+ obj[i].XImagePath +"' class='material' alt='"+ obj[i].ImagePath +"'></div>")
            })
        }

        XML_D.Event.addMaterialEvent();
    },

    /**pc 向指定的容器中放入贴图材料
     * JS动态可控制左右滚动的图片**/
    addMataerial2_pc : function(container,obj){

        for(var i = 0 ; i < obj.length; i++){
            container.each(function(){
                $(this).append("<DIV class='box'><img src='"+ obj[i].XImagePath +"' class='material' alt='"+ obj[i].ImagePath +"'></div>")
            })
        }
        contrlller_map();
        function contrlller_map(){
            /*******************控制贴图的滑动************************/
            var scrollPic_02 = new ScrollPic();
            scrollPic_02.scrollContId   = "ISL_Cont_1"; //内容容器ID
            scrollPic_02.arrLeftId      = "LeftArr";//左箭头ID
            scrollPic_02.arrRightId     = "RightArr"; //右箭头ID

            scrollPic_02.frameWidth     = 100;//显示框宽度
            scrollPic_02.pageWidth      = 152; //翻页宽度

            scrollPic_02.speed          = 0.1; //移动速度(单位毫秒，越小越快)
            scrollPic_02.space          = 100; //每次移动像素(单位px，越大越快)
            scrollPic_02.autoPlay       = false; //自动播放
            scrollPic_02.autoPlayTime   = 3; //自动播放间隔时间(秒)

            scrollPic_02.initialize(); //初始化
            /*******************控制贴图的滑动************************/
        }
    },

};

//程序中用到的数据
XML_D.Data = {

    /**初始化路径*/
    initURLData : {

        // 整个文件的位置
        xmlUrl: "xml/掩门下柜一区间.xml"
    },
    /**数据域**/
    DtaFields : {
        /* 定义保存Xml中数据的json对象 */
        scene: {}
    }
};

//对材质进行设置
XML_D.Material = {

    //设置材料的贴图
    getTexture : function(Path){
        //贴图的路径
        var parameter = {
            preDir : XML_D.init.initURL.imgUrl
        }
        var url = XML_D.URL.transformURL(Path,parameter);

        //加载贴图
        var loader = new THREE.TextureLoader();
        var texture = loader.load(url,function(){
            XML_D.init.initThree.renderScene();
        });

        return texture;
    },

    /**下载贴图，执行函数
     * 1. 下载成功，在函数中使用贴图
     * 2. 加载贴图失败，在函数中不使用贴图，传入空值**/
    lodeTexture : function(parameter,callback){
        if(parameter.Object.Material.imagefile){
            //贴图的路径
            var param = {
                preDir : XML_D.init.initURL.imgUrl
            };
            var url = XML_D.URL.transformURL(parameter.Object.Material.imagefile,param);

            //加载贴图
            var loader = new THREE.TextureLoader();
            loader.load(url,
                function(texture){
                    callback(parameter,texture);
                    XML_D.init.initThree.renderScene();
                },
                function(){},
                function(){
                    callback(parameter);
                    XML_D.init.initThree.renderScene();
                }
            );
        }else{
            callback(parameter);
            XML_D.init.initThree.renderScene();
        }
    },

    /**设置材质贴图的贴图坐标
     * 设置贴图的重复值**/
    setMaterialMap : function(Object,geometry,material){
        //3. 设置贴图坐标
        var tag = {};
        var rotate = parseFloat(Object.Material.rotate);
        var parameters = {
            rotate : rotate
        };
        tag = XML_D.UV.ExtrudeMapUV(tag,geometry,parameters);

        /*3. 设置贴图重复
         * 根据贴图方向，改变贴图的长宽比值
         * 计算贴图重复值
         * 根据贴图的贴图方向，变换贴图的贴图方向*/
        var x = 1.0;
        var y = 1.0;
        var height = parseFloat(Object.Material.height);
        var width = parseFloat(Object.Material.width);

        //计算贴图重复值
        if(tag.x > width){
            y = tag.x / width;
        }
        if(tag.y > height){
            x = tag.y / height;
        }

        //根据贴图的贴图方向，变换贴图的重复设置
        if(rotate == 90){
            var temp = x ;
            x = y;
            y = temp;
        }

        material.repeat = {x:x,y:y};
    }
};

/**数学基本运算**/
XML_D.Math = {
    /**角度计算**/
    Angle : {
        /**把给定的角转换到0 -360**/
        normalized : function(angle){
            this.angle = angle;
            while(this.angle <= -360){
                this.angle += 360;
            }
            while(this.angle > 0){
                this.angle -= 360;
            }

            return this.angle;
        },

        /**从当前角度获得对应的弧度数**/
        changeToRadian : function(angle){
            return angle * 2 * Math.PI/360;
        }
    },
    /**弧度计算**/
    Radian : {
        /**从当前弧度数获得对应的角度数**/
        changeToAngle : function(radian) {
            return radian/2/Math.PI * 360;
        },
        /**把弧度制诡异到-360 0**/
        normalized : function(radian){
            var angle = this.changeToAngle(radian);
            angle = XML_D.Math.Angle.normalized(angle);
            return XML_D.Math.Angle.changeToRadian(angle);
        }
    },

    //求多边形面积
    get_pline_area : function(pt_arrayi) {
        var areai = 0;
        //如果传入的点的个数少于3个，那个不能组成一个图形
        if( pt_arrayi.length < 3 ){
            return 0;
        }

        //第一个点的坐标值
        var y1 = pt_arrayi[0].y;
        var x1 = pt_arrayi[0].x;

        var y2;
        var x2;
        var i = 1;
        while (i < pt_arrayi.length)
        {
            x2 = pt_arrayi[i].x;
            y2 = pt_arrayi[i].y;

            areai = areai + (y1 + y2) * (x2 - x1) / 2;
            x1 = x2;
            y1 = y2;
            i++;
        } // end while

        x2 = pt_arrayi[0].x;
        y2 = pt_arrayi[0].y;

        areai = areai + (y1 + y2) * (x2 - x1) / 2;
        return areai;
    },

    _getTriArea : function(p1,p2,p3) {
        var pt_arrayi = [];
        pt_arrayi.push(p1);
        pt_arrayi.push(p2);
        pt_arrayi.push(p3);
        return this.get_pline_area(pt_arrayi);
    },

    /**获得外接圆的圆心**/
    getArcA : function(pt1,pt2,pt3,param){
        var x1, y1,  x2,  y2,  x3, y3;
        x1 = pt1.x;
        y1 = pt1.y;
        x2 = pt2.x;
        y2 = pt2.y;
        x3 = pt3.x;
        y3 = pt3.y;

        var ptc = param.point3 ? param.point3 : {x :0,y : 0};

        //圆心坐标
        var xc,yc;
        var  Ret = false;

        var eps = 0.000001;
        var m1;
        var m2;
        var mx1;
        var mx2;
        var my1;
        var my2;
        var dx;
        var dy;
        var rsqr;

        // //判断给定的点是否在一条直线上，当三点在一天直线上时，不能组成一个三角形，返回false
        if (Math.abs(y1 - y2) < eps && Math.abs(y2 - y3) < eps) {
            return Ret;
        }

        if (Math.abs(y2 - y1) < eps){
            m2 = -(x3 - x2) / (y3 - y2);
            mx2 = (x2 + x3) / 2;
            my2 = (y2 + y3) / 2;
            xc = (x2 + x1) / 2;
            yc = m2 * (xc - mx2) + my2;
        }
        else if (Math.abs(y3 - y2) < eps){
            m1 = -(x2 - x1) / (y2 - y1);
            mx1 = (x1 + x2) / 2;
            my1 = (y1 + y2) / 2;
            xc = (x3 + x2) / 2;
            yc = m1 * (xc - mx1) + my1;
        }
        else{
            m1 = -(x2 - x1) / (y2 - y1);
            m2 = -(x3 - x2) / (y3 - y2);
            mx1 = (x1 + x2) / 2;
            mx2 = (x2 + x3) / 2;
            my1 = (y1 + y2) / 2;
            my2 = (y2 + y3) / 2;

            xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
            yc = m1 * (xc - mx1) + my1;
        }

        dx = x2 - xc;
        dy = y2 - yc;

        rsqr = dx * dx + dy * dy;
        param.r = Math.sqrt(rsqr);

        ptc.x = xc;
        ptc.y = yc;

        return true;
    },

    /**获得画狐的切点,圆心
     * 参数：
     var parameter = {
            pt : {  //中间点
                x : 0,
                y : 0,
                radius : 0  //半径
            },
            pt1 : { //起始点
                x : 0,
                y : 0
            },
            pt2 : { //结束点
                x : 0,
                y : 0
            },
            pointArray : [3] // 0、1 切点 2 圆心
         };
     **/
    getArcVert : function(parameter){
        var point1= {x:0,y:0}, point2= {x:0,y:0};

        var pt = parameter.pt;
        var pt1 = parameter.pt1;
        var pt2 = parameter.pt2;

        var param = {
            r : 0,
            point3 : {
                x : 0,
                y : 0
            }
        }

        //三角形外接圆的半径和圆心坐标
        if(this.getArcA(pt1, pt, pt2,param) ){
            var d = Math.abs(1 - param.r / pt.radius );

            if( d < 0.1){//接近外接圆半径
                pt.radius = param.r;
                point1 = pt1;
                point2 = pt2;
                parameter.pointArray = [];
                parameter.pointArray.push(point1);
                parameter.pointArray.push(point2);
                parameter.pointArray.push(param.point3);
                return 1;
            }
        }
        var s = this._getTriArea(pt1,pt,pt2);

        //圆心坐标
        var xc,yc;

        var a1 = Math.atan2(pt1.y - pt.y,pt1.x - pt.x);
        var a2 = Math.atan2(pt2.y - pt.y,pt2.x - pt.x);
        var a = (a1 + a2) / 2;


        var delta = a1 - a2;

        if(s > 0)delta= a2 - a1;

        var L = pt.radius / Math.sin( delta / 2);//顶点与圆心连线

        param.point3.x = pt.x + L * Math.cos(a);
        param.point3.y = pt.y + L * Math.sin(a);
        //相切点
        var L1= pt.radius / Math.tan(delta / 2);
        point1.x = pt.x + L1 * Math.cos(a1);
        point1.y = pt.y + L1 * Math.sin(a1);

        point2.x = pt.x + L1 * Math.cos(a2);
        point2.y = pt.y + L1 * Math.sin(a2);

        parameter.pointArray = [];

        //切点
        parameter.pointArray.push(point1);
        parameter.pointArray.push(point2);

        //圆心
        parameter.pointArray.push(param.point3);

        return 0;
    }
};

/**计算路径的相关操作**/
XML_D.Path = {

    /**根定给定的点的数据，画出shape
     * 其中使用了absarc类画圆**/
    getShape : function(data){
        var heartShape = new THREE.Shape();

        var start = 1;
        var strs = data.split(";");//点的数据
        if(strs.length > 0){
            var str0 = strs[0].split(",");//第一个点的数据
            if(parseFloat(str0[2]) > 0){
                str0 = strs[strs.length - 1].split(",");
                start = 0;
            }

            heartShape.moveTo(parseFloat(str0[0]), parseFloat(str0[1]));

            //遍历点数据的数组
            for(var a = start;a < strs.length;a++ ){
                var currentPoint = strs[a].split(",");
                if(parseFloat(currentPoint[2]) > 0 ){
                    //前一个点
                    var AfterPoint;
                    if(a == strs.length - 1){
                        AfterPoint = strs[0].split(",");
                    }else{
                        AfterPoint = strs[a + 1].split(",");
                    }

                    //后一个点
                    var beforePoint;
                    if(a == 0){
                        beforePoint = strs[strs.length - 1].split(",");//前一个点
                    }else{
                        beforePoint = strs[a - 1].split(",");//前一个点
                    }

                    var parameter = {
                        pt : {
                            x : parseFloat(currentPoint[0]),
                            y : parseFloat(currentPoint[1]),
                            radius : parseFloat(currentPoint[2])
                        },
                        pt1 : {
                            x : parseFloat(beforePoint[0]),
                            y : parseFloat(beforePoint[1])
                        },
                        pt2 : {
                            x : parseFloat(AfterPoint[0]),
                            y : parseFloat(AfterPoint[1])
                        },
                        pointArray : []
                    };
                    XML_D.Math.getArcVert(parameter);
                    //如果前一点的坐标和后一点的坐标相同，不用连线
                    if(!(parameter.pointArray[0].x == beforePoint[0] && parameter.pointArray[0].y == beforePoint[1])){
                        heartShape.lineTo(parseFloat(parameter.pointArray[0].x),parseFloat(parameter.pointArray[0].y));
                    }

                    /**根据数据中A来判断画狐的类型
                     * A   ：使用absarc类型来画狐
                     * 非A : 使用QuadricCurve类型来画狐  */
                    if(currentPoint[5] == "A"){
                        var pt1 = parameter.pointArray[0];
                        var pt2 = parameter.pointArray[1];
                        var xc = parseFloat(parameter.pointArray[2].x);
                        var yc = parseFloat(parameter.pointArray[2].y);

                        //点的起始弧度和结束弧度(角度制)
                        var a1 = Math.atan2(pt1.y - yc, pt1.x - xc) * 180 / Math.PI;
                        var a2 = Math.atan2(pt2.y - yc, pt2.x - xc) * 180 / Math.PI;

                        //圆弧三点和三顶点方向不同
                        var s = XML_D.Math._getTriArea(parameter.pt1,parameter.pt,parameter.pt2);
                        var s1 = XML_D.Math._getTriArea(pt1,parameter.pointArray[2],pt2);

                        if(s1*s != 0){
                            a1 += 360;
                        }


                        heartShape.absarc(parseFloat(parameter.pointArray[2].x),parseFloat(parameter.pointArray[2].y),parseFloat(parameter.pt.radius),parseFloat(a1 * Math.PI /180),parseFloat(a2 * Math.PI /180),true);
                    }else{
                        heartShape.quadraticCurveTo(parseFloat(parameter.pt.x),parseFloat(parameter.pt.y),parseFloat(parameter.pointArray[1].x),parseFloat(parameter.pointArray[1].y));
                    }

                }else{
                    heartShape.lineTo(parseFloat(currentPoint[0]), parseFloat(currentPoint[1]));
                }
            }
        }
        return heartShape;
    },

    /**从截面文件中获取基本图形点的数据
     * 绘制shape **/
    getXMLShape : function(Object,tag){
        //设置生成基础图形的点
        var pts = [];
        for(var m = 0;m < Object.cxshapes.shape.length; m++ ){
            var x = Object.cxshapes.shape[m].pos[0];
            var y = Object.cxshapes.shape[m].pos[1];
            var z = Object.cxshapes.shape[m].pos[2];
            if(tag.state_x == 0){
                pts.push(new THREE.Vector2(parseFloat(y),parseFloat(z)));
            }
            if(tag.state_y == 0){
                pts.push(new THREE.Vector2(parseFloat(z),parseFloat(x)));
            }
            if(tag.state_z == 0){
                pts.push(new THREE.Vector2(-parseFloat(x),parseFloat(y)));
            }
        }
        return new THREE.Shape( pts );
    },

    /**根据给定的字符串，解析出点的数据
     * 绘制成shape**/
    getStringShape : function(str){

        //计算数据的最大值，最小值
        var parameter1 = {
            str : str
        };
        var tag1 = XML_D.vec3.getMinMaxPosition(null,parameter1);

        var arr = XML_D.String.splitToArray(str,";");
        var pts = [];
        for(var m = 0;m < arr.length; m++ ){
            var pos = XML_D.String.splitToArray(arr[m],",");
            var pos_x = parseFloat(pos[0]) - parseFloat(tag1.min_x);
            var pos_y = parseFloat(pos[1]) - parseFloat(tag1.min_y);
            var pos_z = parseFloat(pos[2]) - parseFloat(tag1.min_z);
            if(tag1.x == 0){
                pts.push(new THREE.Vector2(pos_z,pos_y));
            }else if(tag1.z == 0){
                //pts.push(new THREE.Vector2(pos_x,pos_y));
                //圆弧柜下脚线
                pts.push(new THREE.Vector2(pos_y,-pos_x));
            }else if(tag1.y < tag1.z && tag1.y < tag1.x){
                pts.push(new THREE.Vector2(pos_x,pos_z));
            }else{
                pts.push(new THREE.Vector2(pos_z,pos_y));
            }
        }

        return  new THREE.Shape( pts );
    },

    /**根据给定的字符串，解析出点的数据
     * 绘制成cuve路径**/
    getCuvePathFromString : function(str){
        var pathPoint = [];
        var arr = XML_D.String.splitToArray(str,";")

        for (var i = 0;i < arr.length; i++){
            var arr2 = XML_D.String.splitToArray(arr[i],",");
            var x = parseFloat(arr2[0]);
            var y = parseFloat(arr2[1]);
            var z = parseFloat(arr2[2]);
            pathPoint.push(new THREE.Vector3(x,z,y));
        }

        //生成曲线
        return new THREE.CatmullRomCurve3(pathPoint);
    },

    getCuvePath_Points : function(beforePoint,currentPoint,AfterPoint){
        var heartShape = new THREE.Shape();

        var parameter = {
            pt : {  //中间点
                x : parseFloat(currentPoint[0]),
                y : parseFloat(currentPoint[1]),
                radius : parseFloat(currentPoint[2]) //半径
            },
            pt1 : { //起始点
                x : parseFloat(beforePoint[0]),
                y : parseFloat(beforePoint[1])
            },
            pt2 : { //结束点
                x : parseFloat(AfterPoint[0]),
                y : parseFloat(AfterPoint[1])
            },
            pointArray : [3] // 0、1 切点 2 圆心
        };
        XML_D.Math.getArcVert(parameter);

        heartShape.moveTo(parseFloat(beforePoint[0]),parseFloat(beforePoint[1]));
        heartShape.lineTo(parseFloat(parameter.pointArray[0].x),parseFloat(parameter.pointArray[0].y));
        heartShape.quadraticCurveTo(parseFloat(currentPoint[0]),parseFloat(currentPoint[1]),parseFloat(parameter.pointArray[1].x),parseFloat(parameter.pointArray[1].y));
        heartShape.lineTo(parseFloat(AfterPoint[0]),parseFloat(AfterPoint[1]));

        return heartShape.getPoints(20);
    }
};

/**二维码**/
XML_D.QrCode = function(){

    //创建存放二维码的存放位置
    var qr = document.createElement( 'div' );
    document.body.appendChild( qr );
    qr.id = "qr";
    $(qr).css({
        "position":"absolute",
        "left": "52px",
        "top": "45px"
    });

    /**设置二维码
     * 1. 当后台传送过来二维码时，使用后台的二维码
     * 2. 后台没有传送过来二维码时，自己创建二维码 **/
    var url = XML_D.URL.transform_QR_URL();
    if(url){
        $(qr).append("<img src='img/qr.jpg' />");;
        $("img",qr).attr("src",url);
        $("img",qr).css({
            "border":"4px solid"
        });
    }else{
        //生成的二维码宽高要相等
        var side = 100;
        $('#qr').qrcode({
            width :side,
            height : side,
            text : window.location.href
        });
    };

    $(qr).append("<br/><span/>扫一扫 把我拿走</span>").css({
        "position":"absolute",
        "text-align":"center"
    });

};

XML_D.Raycaster = {
    /**给定坐标，得到射线与物体的焦点
     * event ： 事件反回值值
     * recursive ：是否遍历子节点 **/
    getRaycaster : function(event,recursive){
        /**获得鼠标的位置*/
        var mouse = new THREE.Vector2();
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( mouse, XML_D.init.initThree.camera );
        return raycaster.intersectObjects( XML_D.init.initThree.scene.children,recursive);
    }
}

/**操作字符窜**/
XML_D.String = {
    /**
     *  把给定的字符窜,切割成数组(默认用逗号分隔)
     *
     *  str: 字符串
     *  sep: 分隔符 */
    splitToArray : function(str,sep){
        var arr = new Array(); //定义一数组
        if(sep){
            arr = str.split(sep); //字符分割
        }else{
            arr = str.split(","); //字符分割
        }
        return arr;
    }
};

/** 操作给定的三维数组 */
XML_D.Utils = {
    /**对给定的三维数据进行分析处理
     * tag ： 存放分析后的结果信息
     * arr ： 一个带有顶点信息的对象的集合(y与z互换)
     * vertices ：一个存放三维顶点坐标的数组
     * Shape : 一个带有顶点信息的对象的集合*/
    OperationVec3 : function(tag,arr,vertices,Shape){
        /* state_x,state_y,state_z : 判断xyz的坐标那个所有点都为0，为0的设置为0，否则为 1
         * x,y,z : 标记xyz轴的长度*/
        this.tag = ( tag != null ) ? tag : tag = {
            state_x : 0,
            state_y : 0,
            state_z : 0,
            x : 0,
            y : 0,
            z : 0
        };

        //判断三维顶点数据，那个坐标在所有顶点上的值都为0时，设置为0，否则为1
        if(arr != null){
            for(var j = 0;j < arr.length; j++ ){
                if(arr[j].pos[0] != 0){
                    tag.state_x = 1;
                }
                if(arr[j].pos[2] != 0){
                    tag.state_y = 1;
                }
                if(arr[j].pos[1] != 0){
                    tag.state_z = 1;
                }
            }
        }

        /*1.计算xyz的最大值与最小值
         * 2.计算xyz最大值与最小值的差*/
        if(vertices != undefined){
            this.tag.min_x = vertices[0].x;
            this.tag.min_y = vertices[0].y;
            this.tag.min_z = vertices[0].z;
            this.tag.max_x = vertices[0].x;
            this.tag.max_y = vertices[0].y;
            this.tag.max_z = vertices[0].z;
            for(var j = 1;j < vertices.length; j++ ){
                if(this.tag.min_x > vertices[j].x){
                    this.tag.min_x = vertices[j].x;
                }
                if(this.tag.max_x < vertices[j].x){
                    this.tag.max_x = vertices[j].x;
                }

                if(this.tag.min_y > vertices[j].y){
                    this.tag.min_y = vertices[j].y;
                }
                if(this.tag.max_y < vertices[j].y){
                    this.tag.max_y = vertices[j].y;
                }

                if(this.tag.min_z > vertices[j].z){
                    this.tag.min_z = vertices[j].z;
                }
                if(this.tag.max_z < vertices[j].z){
                    this.tag.max_z = vertices[j].z;
                }
            }
            this.tag.x = this.tag.max_x - this.tag.min_x;
            this.tag.y = this.tag.max_y - this.tag.min_y;
            this.tag.z = this.tag.max_z - this.tag.min_z;
        }

        /*1.计算xyz的最大值与最小值
         * 2.计算xyz最大值与最小值的差*/
        if(Shape){
            this.tag.min_x = Shape[0].pos[0];
            this.tag.min_y = Shape[0].pos[1];
            this.tag.min_z = Shape[0].pos[2];
            this.tag.max_x = Shape[0].pos[0];
            this.tag.max_y = Shape[0].pos[1];
            this.tag.max_z = Shape[0].pos[2];
            for(var j = 1;j < Shape.length; j++ ){
                if(this.tag.min_x > Shape[j].pos[0]){
                    this.tag.min_x = Shape[j].pos[0];
                }
                if(this.tag.max_x < Shape[j].pos[0]){
                    this.tag.max_x = Shape[j].pos[0];
                }

                if(this.tag.min_y > Shape[j].pos[1]){
                    this.tag.min_y = Shape[j].pos[1];
                }
                if(this.tag.max_y < Shape[j].pos[1]){
                    this.tag.max_y = Shape[j].pos[1];
                }

                if(this.tag.min_z > Shape[j].pos[2]){
                    this.tag.min_z = Shape[j].pos[2];
                }
                if(this.tag.max_z < Shape[j].pos[2]){
                    this.tag.max_z = Shape[j].pos[2];
                }
            }
            this.tag.x = this.tag.max_x - this.tag.min_x;
            this.tag.y = this.tag.max_y - this.tag.min_y;
            this.tag.z = this.tag.max_z - this.tag.min_z;
        }
        return this.tag;
    },

    /** 操作给定的顶点数据
     * tag：(y\z没有进行变换) */
    OperationPoint : function(parameter){
        /* state_x,state_y,state_z : 判断xyz的坐标那个所有点都为0，为0的设置为0，否则为 1
         * x,y,z : 标记xyz轴的长度*/
        this.tag = ( parameter.tag != null ) ? parameter.tag : {
            state_x : 0,
            state_y : 0,
            state_z : 0,
            x : 0,
            y : 0,
            z : 0
        };
        this.arr = parameter.arr;

        //判断三维顶点数据，那个坐标在所有顶点上的值都为0时，设置为0，否则为1
        if(this.arr != null){
            for(var j = 0;j < this.arr.length; j++ ){
                if(this.arr[j].pos[0] != 0){
                    this.tag.state_x = 1;
                }
                if(this.arr[j].pos[1] != 0){
                    this.tag.state_y = 1;
                }
                if(this.arr[j].pos[2] != 0){
                    this.tag.state_z = 1;
                }
            }
        }

        return this.tag;
    }
};

XML_D.URL = {
    /**对路径进行修改，保留文件名或者倒数几级的目录
     * 1.把路径分成数组
     * 2.判断图片是否有后缀名，如果没有添加".jpg"作为后缀名
     * 3.给图片加上路径
     *
     * url : 原始的路径
     * parameter = {
     *　division : 路径的分隔符 "\\"
     *  preDir : 路径
     *  number ：保留倒数几级的目录，默认不保留目录,只保存文件名称（0）
     * }**/
    transformURL : function(url,parameter){
        this.url = url;
        this.parameter = {
            division : parameter.division ? parameter.division : "\\",
            preDir : parameter.preDir ? parameter.preDir : "",
            number : parameter.number ? parameter.number : 0
        }

        //1.把路径分成数组
        var arr = XML_D.Fun.tool.splitToArray(this.url,this.parameter.division)

        //2.设置原目录使用几级
        //如果数组中有空值，者删除这个引用
        var str1 = arr[arr.length - 1];
        for(var i = 0 ; i < this.parameter.number; i++){
            if(arr[arr.length - 2 - i].length > 0){
                str1 = arr[arr.length - 2 - i]+ "/" + str1;
            }else{
                arr.splice(arr.length - 2 - i,1);
                str1 = arr[arr.length - 2 - i]+ "/" + str1;
            }
        }

        //2.判断图片是否有后缀名，如果没有添加".jpg"作为后缀名
        if(str1.indexOf(".") < 0){
            str1 = str1 + ".jpg";
        }

        //3.给图片加上路径
        this.url = this.parameter.preDir + str1;
        return this.url;
    },

    transformObjURL : function(url,parameter){
        /********* 初始化参数 *****************************/
        this.url = url;
        this.parameter = {
            division : parameter.division ? parameter.division : "\\",
            preDir : parameter.preDir ? parameter.preDir : "",
            number : parameter.number ? parameter.number : 0
        }

        /********* 获得文件路径 *****************************/
        //1.把路径分成数组
        var arr = XML_D.Fun.tool.splitToArray(this.url,this.parameter.division)
        //2.设置原目录使用几级
        //如果数组中有空值，者删除这个引用
        var str1 = "";
        for(var i = 0 ; i < this.parameter.number; i++){
            if(arr[arr.length - 2 - i].length > 0){
                str1 = arr[arr.length - 2 - i]+ "/" + str1;
            }else{
                arr.splice(arr.length - 2 - i,1);
                str1 = arr[arr.length - 2 - i]+ "/" + str1;
            }
        }
        //3.给图片加上路径
        var filePath = this.parameter.preDir + str1;

        /********* 获得文件名称 *****************************/
        //获取文件的名称（去掉后缀名）
        var fileName = arr[arr.length - 1];
        var fileName_arr = XML_D.Fun.tool.splitToArray(fileName,"\.");
        var fileName = fileName_arr[0];

        /********* 设置返回值 *****************************/
        var fileUrl = {
            fileName : fileName,
            filePath : filePath
        };
        return fileUrl;
    },

    /**获取地址栏中对应的参数
     * name ： 参数名称**/
    GetQueryString : function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r != null){
            return  unescape(r[2]);
        }else{
            return null;
        }
    },

    /**转换参数的到的xml文件访问路径**/
    transform_XML_URL : function(){
        var id = this.GetQueryString("id");
        var type = this.GetQueryString("type");

        console.log("type:"+ type);
        console.log("id:"+ id);

        //单个柜体
        if(type == 1){
            XML_D.init.initURL.url = "http://www.itthome.com/OnlineProducts/Products/UnitCabinet/xml/" + id + ".cxml";
        }else if(type == 2){//组合柜
            XML_D.init.initURL.url = "http://www.itthome.com/OnlineProducts/Products/GroupCabinet/xml/" + id + ".cxml";
        }else{
            console.log("加载本地的文件，网络路径没有给出！");
        }
    },

    /**转换参数的到的QR访问路径**/
    transform_QR_URL : function(){
        var id = this.GetQueryString("id");
        var type = this.GetQueryString("type");

        var url = null;

        console.log("type:"+ type);
        console.log("id:"+ id);

        //单个柜体
        if(type == 1){
            url = "http://www.itthome.com/OnlineProducts/Products/UnitCabinet/qrcode/" + id + ".jpg";
        }else if(type == 2){//组合柜
            url = "http://www.itthome.com/OnlineProducts/Products/GroupCabinet/qrcode/" + id + ".jpg";
        }else{
            //url = "img/qr.jpg";
            console.log("加载本地的文件，网络路径没有给出！");
        }

        return url;
    }
};

/**计算贴图坐标*/
XML_D.UV = {
    /**
     * 设置拉伸体的贴图坐标
     * 1.计算拉伸后，生成的各点的最大长宽
     * 2.遍历拉伸后生成的的面
     * 3.获得组成三角形面的三个点的保存位置编号
     * 4.根据位置编号找到对应点的位置坐标
     * 5.根据位置坐标计算贴图坐标，并进行设置
     *
     * 参数：
     * tag : 标记状态
     * geometry ：图形
     * parameters ={
     *   rotate : 贴图坐标的旋转角度（角度制）
     *   DirType ： 几何体拉伸的方向(0:x,1:z,2:y)
     * }**/
    ExtrudeMapUV :function(tag,geometry,parameters){
        //初始化
        this.tag = tag;
        this.geometry = geometry;
        this.parameter = {
            rotate : parameters.rotate ? parameters.rotate : 0,
            DirType: parameters.DirType ? parameters.DirType : 0
        };

        //1.计算拉伸后，生成的各点的最大长宽
        this.tag = XML_D.Utils.OperationVec3(this.tag,null,this.geometry.vertices);

        //2.遍历拉伸后生成的的面
        for(var j = 0 ;j < this.geometry.faces.length; j++){
            var list = [];
            //获得组成三角形面的三个点的坐标
            var firstPoint = parseInt(this.geometry.faces[j].a);
            var secondPoint = parseInt(this.geometry.faces[j].b);
            var thirdPoint = parseInt(this.geometry.faces[j].c);
            //根据拉伸方向设置贴图方向
            if(this.parameter.DirType == 1 || this.parameter.DirType == 2){
                //4.根据位置编号找到对应点的位置坐标 5.根据位置坐标计算贴图坐标，并进行设置
                list.push(
                    new THREE.Vector2(
                        (this.geometry.vertices[firstPoint].y - tag.min_y) / tag.y,
                        (this.geometry.vertices[firstPoint].x - tag.min_x) / tag.x
                    )
                );

                list.push(
                    new THREE.Vector2(
                        (this.geometry.vertices[secondPoint].y - tag.min_y) / tag.y,
                        (this.geometry.vertices[secondPoint].x - tag.min_x) / tag.x
                    )
                );
                list.push(
                    new THREE.Vector2(
                        (this.geometry.vertices[thirdPoint].y - tag.min_y) / tag.y,
                        (this.geometry.vertices[thirdPoint].x - tag.min_x) / tag.x
                    )
                );
            }else {
                //4.根据位置编号找到对应点的位置坐标 5.根据位置坐标计算贴图坐标，并进行设置
                list.push(
                    new THREE.Vector2(
                        (this.geometry.vertices[firstPoint].x - tag.min_x) / tag.x,
                        (this.geometry.vertices[firstPoint].y - tag.min_y) / tag.y
                    )
                );

                list.push(
                    new THREE.Vector2(
                        (this.geometry.vertices[secondPoint].x - tag.min_x) / tag.x,
                        (this.geometry.vertices[secondPoint].y - tag.min_y) / tag.y
                    )
                );
                list.push(
                    new THREE.Vector2(
                        (this.geometry.vertices[thirdPoint].x - tag.min_x) / tag.x,
                        (this.geometry.vertices[thirdPoint].y - tag.min_y) / tag.y
                    )
                );
            }

            this.geometry.faceVertexUvs[0][j] = list;
        }

        return this.tag;
    },

    /**
     * 设置拉伸体的贴图坐标
     * 1.计算拉伸后，生成的各点的最大长宽
     * 2.遍历拉伸后生成的的面
     * 3.获得组成三角形面的三个点的保存位置编号
     * 4.根据位置编号找到对应点的位置坐标
     * 5.根据位置坐标计算贴图坐标，并进行设置
     *
     * 参数：
     * tag : 标记状态
     * geometry ：图形
     * parameters ={
     *   rotate : 贴图坐标的旋转角度（角度制）
     *   DirType ： 几何体拉伸的方向(0:x,1:z,2:y)
     * }**/
    ExtrudeMapUV_2 :function(tag,geometry,Object,parameters){
        //初始化
        this.tag = tag;
        this.geometry = geometry;
        this.Object = Object;
        this.parameter = {
            rotate : parameters.rotate ? parameters.rotate : 0,
            DirType: parameters.DirType ? parameters.DirType : 0
        };

        //1.计算拉伸后，生成的各点的最大长宽
        this.tag = XML_D.Utils.OperationVec3(this.tag,null,null,Object.Shape);

        //2.遍历拉伸后生成的的面
        for(var j = 0 ;j < this.geometry.faces.length; j++){
            var list = [];
            //获得组成三角形面的三个点的坐标
            var firstPoint = parseInt(this.geometry.faces[j].a);
            var secondPoint = parseInt(this.geometry.faces[j].b);
            var thirdPoint = parseInt(this.geometry.faces[j].c);

            //根据拉伸方向设置贴图方向
            if(this.parameter.DirType == 1 || this.parameter.DirType == 2){
                //4.根据位置编号找到对应点的位置坐标 5.根据位置坐标计算贴图坐标，并进行设置
                list.push(
                    new THREE.Vector2(
                        (this.geometry.vertices[firstPoint].y - tag.min_y) / tag.y,
                        (this.geometry.vertices[firstPoint].x - tag.min_x) / tag.x
                    )
                );

                list.push(
                    new THREE.Vector2(
                        (this.geometry.vertices[secondPoint].y - tag.min_y) / tag.y,
                        (this.geometry.vertices[secondPoint].x - tag.min_x) / tag.x
                    )
                );
                list.push(
                    new THREE.Vector2(
                        (this.geometry.vertices[thirdPoint].y - tag.min_y) / tag.y,
                        (this.geometry.vertices[thirdPoint].x - tag.min_x) / tag.x
                    )
                );
            }else {
                //4.根据位置编号找到对应点的位置坐标 5.根据位置坐标计算贴图坐标，并进行设置
                list.push(
                    new THREE.Vector2(
                        (this.geometry.vertices[firstPoint].x - tag.min_x) / tag.x,
                        (this.geometry.vertices[firstPoint].y - tag.min_y) / tag.y
                    )
                );

                list.push(
                    new THREE.Vector2(
                        (this.geometry.vertices[secondPoint].x - tag.min_x) / tag.x,
                        (this.geometry.vertices[secondPoint].y - tag.min_y) / tag.y
                    )
                );
                list.push(
                    new THREE.Vector2(
                        (this.geometry.vertices[thirdPoint].x - tag.min_x) / tag.x,
                        (this.geometry.vertices[thirdPoint].y - tag.min_y) / tag.y
                    )
                );
            }

            this.geometry.faceVertexUvs[0][j] = list;
        }

        return this.tag;
    }
};

/** XMLHttpRequest对象池**/
XML_D.Utils.XMLHttpRequestObjectPool = {
    //放置XMLHttpRequest对象
    _objPool: [],

    /**初始化连接池
     * 判断池中的对象的状态（xmlhttp.readyState = 0 未初始化 ： 1  读取中；  2  已读取； 3  交互中；  4完成；）
     * 如果池中的对象都在使用，那么兴建一个对象放到池中
     * 返回链接池中刚刚兴建的objXMLHttp对象*/
    _getInstance: function () {
        for (var i = 0; i < this._objPool.length; i ++) {
            if (this._objPool[i].readyState == 0 || this._objPool[i].readyState == 4) {
                return this._objPool[i];
            }
        }

        // IE5中不支持push方法，新建一个对象放到连接池中
        this._objPool[this._objPool.length] = this._createObj();
        return this._objPool[this._objPool.length - 1];
    },

    /** 创建一个objXMLHttp对象 */
    _createObj: function () {
        var objXMLHttp = null;
        if (window.XMLHttpRequest) {
            objXMLHttp = new XMLHttpRequest();
        } else {
            var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
            for(var n = 0; n < MSXML.length; n ++) {
                try {
                    objXMLHttp = new ActiveXObject(MSXML[n]);
                    break;
                } catch(e) {}
            }
        }

        // mozilla某些版本没有readyState属性
        if (objXMLHttp.readyState == null) {
            objXMLHttp.readyState = 0;

            objXMLHttp.addEventListener("load", function () {
                objXMLHttp.readyState = 4;
                if (typeof objXMLHttp.onreadystatechange == "function") {
                    objXMLHttp.onreadystatechange();
                }
            },  false);
        }

        return objXMLHttp;
    },

    /**发送请求
     * method : 方法[post,get]
     * url ： 请求数据文件的路径
     * data : 发送的数据
     * object_json : 传入待处理的数据对象
     * callback ：回调函数*/
    sendReq: function (method, url, data, object_json, callback) {
        var objXMLHttp = this._getInstance();

        with(objXMLHttp) {
            try {
                // 加随机数防止缓存
                if (url.indexOf("?") > 0) {
                    url += "&randnum=" + Math.random();
                } else {
                    url += "?randnum=" + Math.random();
                }

                open(method, url, true);

                // 设定请求编码方式
                setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                send(data);
                onreadystatechange = function () {
                    //xmlhttp.status： 404 表示文件没有找到；200 服务器数据返回成功； 0 表示本地数据返回成功；
                    if (objXMLHttp.readyState == 4 && (objXMLHttp.status == 200 || objXMLHttp.status == 304)) {
                        callback(objXMLHttp,object_json);
                    }
                }
            }
            catch(e) {
                alert(e);
            }
        }
    }
};

//操作三维坐标点
XML_D.vec3 = {
    getMinMaxPosition : function(tag,parameter){
        /* state_x,state_y,state_z : 判断xyz的坐标那个所有点都为0，为0的设置为0，否则为 1
         * x,y,z : 标记xyz轴的长度*/
        this.tag = ( parameter.tag != null ) ? tag : {
            //存放最小值
            min_x : 0,
            min_y : 0,
            min_z : 0,
            //存放最大值
            max_x : 0,
            max_y : 0,
            max_z : 0,
            //存放最小值与最大值的差值
            x : 0,
            y : 0,
            z : 0
        };

        var Shape = parameter.shape;
        if(Shape){
            this.tag.min_x = parseFloat(Shape[0].pos[0]);
            this.tag.min_y = parseFloat(Shape[0].pos[1]);
            this.tag.min_z = parseFloat(Shape[0].pos[2]);
            this.tag.max_x = parseFloat(Shape[0].pos[0]);
            this.tag.max_y = parseFloat(Shape[0].pos[1]);
            this.tag.max_z = parseFloat(Shape[0].pos[2]);
            for(var j = 1;j < Shape.length; j++ ){
                if(this.tag.min_x > parseFloat(Shape[j].pos[0])){
                    this.tag.min_x = parseFloat(Shape[j].pos[0]);
                }
                if(this.tag.max_x < parseFloat(Shape[j].pos[0])){
                    this.tag.max_x = parseFloat(Shape[j].pos[0]);
                }

                if(this.tag.min_y > parseFloat(Shape[j].pos[1])){
                    this.tag.min_y = parseFloat(Shape[j].pos[1]);
                }
                if(this.tag.max_y < parseFloat(Shape[j].pos[1])){
                    this.tag.max_y = parseFloat(Shape[j].pos[1]);
                }

                if(this.tag.min_z > parseFloat(Shape[j].pos[2])){
                    this.tag.min_z = parseFloat(Shape[j].pos[2]);
                }
                if(this.tag.max_z < parseFloat(Shape[j].pos[2])){
                    this.tag.max_z = parseFloat(Shape[j].pos[2]);
                }
            }
            this.tag.x = this.tag.max_x - this.tag.min_x;
            this.tag.y = this.tag.max_y - this.tag.min_y;
            this.tag.z = this.tag.max_z - this.tag.min_z;
        }

        //字符串类型
        var str = parameter.str;
        if(str){
            var arr = XML_D.String.splitToArray(str,";");
            var pos0 = XML_D.String.splitToArray(arr[0],",");
            var pos_x = parseFloat(pos0[0]);
            var pos_y = parseFloat(pos0[1]);
            var pos_z = parseFloat(pos0[2]);
            this.tag.min_x = pos_x;
            this.tag.min_y = pos_y;
            this.tag.min_z = pos_z;
            this.tag.max_x = pos_x;
            this.tag.max_y = pos_y;
            this.tag.max_z = pos_z;

            for(var m = 0;m < arr.length; m++ ){
                var pos = XML_D.String.splitToArray(arr[m],",");

                if(this.tag.min_x > parseFloat(pos[0])){
                    this.tag.min_x = parseFloat(pos[0]);
                }
                if(this.tag.max_x < parseFloat(pos[0])){
                    this.tag.max_x = parseFloat(pos[0]);
                }

                if(this.tag.min_y > parseFloat(pos[1])){
                    this.tag.min_y = parseFloat(pos[1]);
                }
                if(this.tag.max_y < parseFloat(pos[1])){
                    this.tag.max_y = parseFloat(pos[1]);
                }

                if(this.tag.min_z > parseFloat(pos[2])){
                    this.tag.min_z = parseFloat(pos[2]);
                }
                if(this.tag.max_z < parseFloat(pos[2])){
                    this.tag.max_z = parseFloat(pos[2]);
                }
            }

            this.tag.x = this.tag.max_x - this.tag.min_x;
            this.tag.y = this.tag.max_y - this.tag.min_y;
            this.tag.z = this.tag.max_z - this.tag.min_z;
        }

        return this.tag;
    }
};

//webGl的使用
XML_D.WebGl = {

    //初始化webGl
    initWebGl : function(){

        var Tx = 0.5,Ty = 0.5,Tz = 0.5;

        main();
        function main() {

            XML_D.WebGl.initGl();

            XML_D.WebGl.initShader();

            var gl = XML_D.WebGl.gl;
            // Initialize shaders

            // Write the positions of vertices to a vertex shader
            var n = initVertexBuffers(gl);
            if (n < 0) {
                console.log('Failed to set the positions of the vertices');
                return;
            }

            var u_Width = gl.getUniformLocation(gl.program, 'u_Width');
            if (!u_Width) {
                console.log('Failed to get the storage location of u_Width');
                return;
            }

            var u_Height = gl.getUniformLocation(gl.program, 'u_Height');
            if (!u_Height) {
                console.log('Failed to get the storage location of u_Height');
                return;
            }

            gl.uniform1f(u_Width, gl.drawingBufferWidth);
            gl.uniform1f(u_Height, gl.drawingBufferHeight);

            //将平移距离传输给定点着色器
            var u_Translation = gl.getUniformLocation(gl.program , 'u_Translation');

            // Specify the color for clearing <canvas>
            gl.clearColor(0, 0, 0, 1);

            gl.uniform4f(u_Translation,Tx,Ty,Tz,0.0);
            // Clear <canvas>
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Draw the rectangle
            gl.drawArrays(gl.TRIANGLES, 0, n);
        }

        function initVertexBuffers(gl) {
            var vertices = new Float32Array([
                -0.5, 0.5,   -0.5, -0.5, 0.5,-0.5
            ]);
            var n = 3; // The number of vertices

            // Create a buffer object
            var vertexBuffer = gl.createBuffer();
            if (!vertexBuffer) {
                console.log('Failed to create the buffer object');
                return -1;
            }

            // Bind the buffer object to target
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            // Write date into the buffer object
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
            if (a_Position < 0) {
                console.log('Failed to get the storage location of a_Position');
                return -1;
            }
            // Assign the buffer object to a_Position variable
            gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

            // Enable the assignment to a_Position variable
            gl.enableVertexAttribArray(a_Position);

            return n;
        }
    },

    gl : {},
    initGl : function(){
        // Retrieve <canvas> element
        var canvas = document.getElementById('webgl');
        // Get the rendering context for WebGL
        var gl = getWebGLContext(canvas);
        if (!gl) {
            console.log('Failed to get the rendering context for WebGL');
            return;
        }

        XML_D.WebGl.gl = gl;
    },

    initShader : function(){
        var VSHADER_SOURCE =
            'attribute vec4 a_Position;\n' +
            'uniform vec4 u_Translation;\n' +
            'void main() {\n' +
            '  gl_Position = a_Position + u_Translation;\n' +
            '}\n';

        var FSHADER_SOURCE =
            'precision mediump float;\n' +
            'uniform float u_Width;\n' +
            'uniform float u_Height;\n' +
            'void main() {\n' +
            '  gl_FragColor = vec4(gl_FragCoord.x/u_Width,0.0, gl_FragCoord.y/u_Height,1.0);\n' +
            '}\n';

        if (!initShaders(XML_D.WebGl.gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
            console.log('Failed to intialize shaders.');
            return;
        }
    }
};

/**关于xml文件的操作
 * 1.读出xml文件
 * 2.转换xml文件**/
XML_D.XML = {

    /**1.请求xml文件
     * 2.请求完成后执行回调函数 **/
    loadXMLTOJson : function(){
        XML_D.Utils.XMLHttpRequestObjectPool.sendReq("GET",XML_D.Data.initURLData.xmlUrl,"",{},function(xmlhttp){
            XML_D.XML.transformXMLToJson_combination(xmlhttp);
            XML_D.WebGl.initWebGl();
        });
    },
    /**把xml文件转化为json
     * 解析 下双轨.xml 类型文件 **/
    transformXMLToJson_instance : function(xmlDoc){
        this.xmlDoc = xmlDoc;
        var xml_cxshapes = this.xmlDoc.getElementsByTagName("cxshapes")[0];
        var cxshapes = {};
        //版本号
        if(xml_cxshapes.attributes['version']){
            cxshapes.version = xml_cxshapes.attributes['version'].value;
        }
        if(xml_cxshapes.attributes['width']){
            cxshapes.width = xml_cxshapes.attributes['width'].value;
        }
        if(xml_cxshapes.attributes['height']) {
            cxshapes.height = xml_cxshapes.attributes['height'].value;
        }
        for(var x = 0; x < xml_cxshapes.childNodes.length; x++){
            if(xml_cxshapes.childNodes[x].nodeType == 1){
                var xml_shape = xml_cxshapes.childNodes[x];
                var shape = [];
                shape.type = xml_shape.attributes['type'].value;
                shape.closed = xml_shape.attributes['closed'].value;
                shape.vertcount = xml_shape.attributes['vertcount'].value;

                for(var y = 0; y < xml_shape.childNodes.length; y++){
                    if(xml_shape.childNodes[y].nodeType == 1){
                        var vertex = {};
                        vertex.pos = XML_D.Fun.tool.splitStr_changeYZ(xml_shape.childNodes[y].attributes['pos'].value);
                        shape.push(vertex);
                    }
                }

                cxshapes.shape = shape;
            }
        }
        return cxshapes;
    },
    /**把xml文件转化为json
     * 文件中包含多个shape**/
    transformXMLToJson_instance_2 : function(xmlDoc){
        this.xmlDoc = xmlDoc;
        var xml_cxshapes = this.xmlDoc.getElementsByTagName("cxshapes")[0];
        var cxshapes = {};
        //版本号
        if(xml_cxshapes.attributes['version']){
            cxshapes.version = xml_cxshapes.attributes['version'].value;
        }
        if(xml_cxshapes.attributes['width']){
            cxshapes.width = xml_cxshapes.attributes['width'].value;
        }
        if(xml_cxshapes.attributes['height']) {
            cxshapes.height = xml_cxshapes.attributes['height'].value;
        }

        var shapes = [];
        for(var x = 0; x < xml_cxshapes.childNodes.length; x++){
            if(xml_cxshapes.childNodes[x].nodeType == 1){
                var xml_shape = xml_cxshapes.childNodes[x];
                var shape = [];
                if(xml_shape.attributes['type']){
                    shape.type = xml_shape.attributes['type'].value;
                }
                if(xml_shape.attributes['closed']){
                    shape.closed = xml_shape.attributes['closed'].value;
                }
                if(xml_shape.attributes['vertcount']){
                    shape.vertcount = xml_shape.attributes['vertcount'].value;
                }
                for(var y = 0; y < xml_shape.childNodes.length; y++){
                    if(xml_shape.childNodes[y].nodeType == 1){
                        var vertex = {};
                        if(xml_shape.childNodes[y].attributes['pos']){
                            vertex.pos = XML_D.Fun.tool.splitStr_changeYZ(xml_shape.childNodes[y].attributes['pos'].value);
                        }
                        shape.push(vertex);
                    }
                }

                shapes.push(shape);
            }
        }
        cxshapes.shapes = shapes;
        return cxshapes;
    },

    /**把XML文件数据转换为json数据对象
     * 解析组合柜体的文件信息 */
    transformXMLToJson_combination : function(xmlhttp){

        //在读取的数据文件中读取xml结构对象
        var xmlDoc = xmlhttp.responseXML || xmlhttp;

        var scene = XML_D.Data.DtaFields.scene;
        var ComposeList = xmlDoc.getElementsByTagName("ComposeList")[0];

        scene.ComposeList = [];

        //根节点是组合柜数组
        if(ComposeList){
            /************************** 读取组合体的集合 ComposeList *******************************/
            scene.ComposeList.count = ComposeList.attributes['count'].value;
            /*******获取ComposeList对象的集合中包含的所有柜体集合**********************************/
            for(var i = 0;i < ComposeList.childNodes.length ;i++){
                //判断节点的类型，1 表示元素节点
                if(ComposeList.childNodes[i].nodeType == 1){
                    var ComposeGroup = {};//存放一个柜体的所有信息
                    var XML_ComposeGroup = ComposeList.childNodes[i];
                    SetComposeGroup(XML_ComposeGroup);
                }
            }
        }else {//根节点是组合柜
            var XML_ComposeGroup = xmlDoc.getElementsByTagName("ComposeGroup")[0];
            SetComposeGroup(XML_ComposeGroup);
        }

        //把节点ComposeGroup转换为json
        function SetComposeGroup(XML_ComposeGroup){
            var ComposeGroup = {};//存放一个柜体的所有信息

            //柜体的属性
            if(XML_ComposeGroup.attributes['Name']){
                ComposeGroup.Name = XML_ComposeGroup.attributes['Name'].value;
            }
            if(XML_ComposeGroup.attributes['NodeID']){
                ComposeGroup.NodeID = XML_ComposeGroup.attributes['NodeID'].value;
            }
            if(XML_ComposeGroup.attributes['TempleName']){
                ComposeGroup.TempleName = XML_ComposeGroup.attributes['TempleName'].value;
            }

            if(XML_ComposeGroup.attributes['width']){
                ComposeGroup.width = XML_ComposeGroup.attributes['width'].value;
            }
            if(XML_ComposeGroup.attributes['height']){
                ComposeGroup.height = XML_ComposeGroup.attributes['height'].value;
            }
            if(XML_ComposeGroup.attributes['depth']){
                ComposeGroup.depth = XML_ComposeGroup.attributes['depth'].value;
            }

            if(XML_ComposeGroup.attributes['xpos']){
                ComposeGroup.xpos = XML_ComposeGroup.attributes['xpos'].value;
            }
            if(XML_ComposeGroup.attributes['ypos']){
                ComposeGroup.ypos = XML_ComposeGroup.attributes['ypos'].value;
            }
            if(XML_ComposeGroup.attributes['zpos']){
                ComposeGroup.zpos = XML_ComposeGroup.attributes['zpos'].value;
            }

            if(XML_ComposeGroup.attributes['angle']){
                ComposeGroup.angle = XML_ComposeGroup.attributes['angle'].value;
            }

            var SingleGroupS = [];//存放集合中的柜体
            /************************ 柜体集合的子节点 *******************************/
            for(var j = 0; j < XML_ComposeGroup.childNodes.length; j++){

                /************************ 柜体的参数集合 **************************************/
                if(XML_ComposeGroup.childNodes[j].nodeName == "VarList"){
                    var VarList = [];
                    //柜体参数集合的属性
                    if(XML_ComposeGroup.childNodes[j].attributes['Name']){
                        VarList.Name = XML_ComposeGroup.childNodes[j].attributes['Name'].value;
                    };

                    //设置子节点
                    for(var k = 0; k < XML_ComposeGroup.childNodes[j].childNodes.length ;k++){
                        if(XML_ComposeGroup.childNodes[j].childNodes[k].nodeType == "1"){
                            var Var = {};
                            if(XML_ComposeGroup.childNodes[j].childNodes[k].attributes['Name']){
                                Var.Name = XML_ComposeGroup.childNodes[j].childNodes[k].attributes['Name'].value;
                            }
                            VarList.push(Var);
                        }

                    }
                    ComposeGroup.VarList = VarList;
                }

                /************************ 柜体集合的材料 **************************************/
                if(XML_ComposeGroup.childNodes[j].nodeName == "Material"){
                    var Material = {};
                    if(XML_ComposeGroup.childNodes[j].attributes['name']){
                        Material.name = XML_ComposeGroup.childNodes[j].attributes['name'].value;
                    };
                    if(XML_ComposeGroup.childNodes[j].attributes['width']){
                        Material.width = XML_ComposeGroup.childNodes[j].attributes['width'].value;
                    }
                    if(XML_ComposeGroup.childNodes[j].attributes['height']){
                        Material.height = XML_ComposeGroup.childNodes[j].attributes['height'].value;
                    }
                    if(XML_ComposeGroup.childNodes[j].attributes['rotate']){
                        Material.rotate = XML_ComposeGroup.childNodes[j].attributes['rotate'].value;
                    }
                    ComposeGroup.Material = Material;
                }

                /************************ 柜体集合中的单个柜体 ********************************/
                if(XML_ComposeGroup.childNodes[j].nodeName == "SingleGroup"){
                    var SingleGroup = {};
                    var XML_SingleGroup = XML_ComposeGroup.childNodes[j];

                    if(XML_SingleGroup.attributes['GoodsType']){
                        SingleGroup.GoodsType = XML_SingleGroup.attributes['GoodsType'].value;
                    }
                    //设置组件的开门的方向
                    if(XML_SingleGroup.attributes['OpenDir']){
                        SingleGroup.OpenDir = XML_SingleGroup.attributes['OpenDir'].value;
                    }

                    //单个板件的属性
                    if(XML_ComposeGroup.childNodes[j].attributes['Name']){
                        SingleGroup.Name = XML_ComposeGroup.childNodes[j].attributes['Name'].value;
                    }
                    if(XML_ComposeGroup.childNodes[j].attributes['NodeID']){
                        SingleGroup.NodeID = XML_ComposeGroup.childNodes[j].attributes['NodeID'].value;
                    }

                    if(XML_ComposeGroup.childNodes[j].attributes['width']){
                        SingleGroup.width = XML_ComposeGroup.childNodes[j].attributes['width'].value;
                    }
                    if(XML_ComposeGroup.childNodes[j].attributes['height']){
                        SingleGroup.height = XML_ComposeGroup.childNodes[j].attributes['height'].value;
                    }
                    if(XML_ComposeGroup.childNodes[j].attributes['depth']){
                        SingleGroup.depth = XML_ComposeGroup.childNodes[j].attributes['depth'].value;
                    }

                    if(XML_ComposeGroup.childNodes[j].attributes['xpos']){
                        SingleGroup.xpos = XML_ComposeGroup.childNodes[j].attributes['xpos'].value;
                    }
                    if(XML_ComposeGroup.childNodes[j].attributes['ypos']){
                        SingleGroup.ypos = XML_ComposeGroup.childNodes[j].attributes['ypos'].value;
                    }
                    if(XML_ComposeGroup.childNodes[j].attributes['zpos']){
                        SingleGroup.zpos = XML_ComposeGroup.childNodes[j].attributes['zpos'].value;
                    }

                    //单个柜体的子节点
                    for(var k = 0;k < XML_ComposeGroup.childNodes[j].childNodes.length;k++){
                        //单个柜体的材料
                        if(XML_ComposeGroup.childNodes[j].childNodes[k].nodeName == "Material"){
                            var Material = {};
                            if(XML_ComposeGroup.childNodes[j].childNodes[k].attributes['name']){
                                Material.name = XML_ComposeGroup.childNodes[j].childNodes[k].attributes['name'].value;
                            }
                            if(XML_ComposeGroup.childNodes[j].childNodes[k].attributes['width']){
                                Material.width = XML_ComposeGroup.childNodes[j].childNodes[k].attributes['width'].value;
                            }
                            if(XML_ComposeGroup.childNodes[j].childNodes[k].attributes['height']){
                                Material.height = XML_ComposeGroup.childNodes[j].childNodes[k].attributes['height'].value;
                            }
                            if(XML_ComposeGroup.childNodes[j].childNodes[k].attributes['rotate']){
                                Material.rotate = XML_ComposeGroup.childNodes[j].childNodes[k].attributes['rotate'].value;
                            }
                            if(XML_ComposeGroup.childNodes[j].childNodes[k].attributes['imagefile']){
                                Material.imagefile = XML_ComposeGroup.childNodes[j].childNodes[k].attributes['imagefile'].value;
                            }
                            SingleGroup.Material = Material;
                        }

                        //物体部件列表
                        if(XML_ComposeGroup.childNodes[j].childNodes[k].nodeName == "ObjectList"){
                            var ObjectList = [];
                            var XML_ObjectList = XML_ComposeGroup.childNodes[j].childNodes[k];

                            /********************* 遍历物体部件列表 ObjectList ******************/
                            for(var x = 0;x < XML_ObjectList.childNodes.length; x++){

                                var XML_Object = XML_ObjectList.childNodes[x];
                                var Object = [];

                                if(XML_Object.nodeType == "1"){
                                    /***************** 给部件添加属性 ***************************/
                                    if(XML_Object.attributes['class']){
                                        Object.class = XML_Object.attributes['class'].value;
                                    }
                                    if(XML_Object.attributes['Name']){
                                        Object.Name = XML_Object.attributes['Name'].value;
                                    }
                                    if(XML_Object.attributes['NodeID']){
                                        Object.NodeID = XML_Object.attributes['NodeID'].value;
                                    }

                                    if(XML_Object.attributes['width']){
                                        Object.width = XML_Object.attributes['width'].value;
                                    }
                                    if(XML_Object.attributes['depth']){
                                        Object.depth = XML_Object.attributes['depth'].value;
                                    }
                                    if(XML_Object.attributes['height']){
                                        Object.height = XML_Object.attributes['height'].value;
                                    }

                                    if(XML_Object.attributes['x']){
                                        Object.x = XML_Object.attributes['x'].value;
                                    }
                                    if(XML_Object.attributes['y']){
                                        Object.y = XML_Object.attributes['y'].value;
                                    }
                                    if(XML_Object.attributes['z']){
                                       Object.z = XML_Object.attributes['z'].value;
                                   }

                                    if(XML_Object.attributes['ax']){
                                        Object.ax = XML_Object.attributes['ax'].value;
                                    }
                                    if(XML_Object.attributes['ay']){
                                        Object.ay = XML_Object.attributes['ay'].value;
                                    }
                                    if(XML_Object.attributes['az']){
                                        Object.az = XML_Object.attributes['az'].value;
                                    }

                                    //标记组件是否显示
                                    if(XML_Object.attributes['visible']){
                                        Object.visible = XML_Object.attributes['visible'].value;
                                    }
                                    //XML路径
                                    if(XML_Object.attributes['sect']){
                                        Object.sect = XML_Object.attributes['sect'].value;
                                    }
                                    if(XML_Object.attributes['sectfile']){
                                        Object.sectfile = XML_Object.attributes['sectfile'].value;
                                    }
                                    if(XML_Object.attributes['shapedata']){
                                        Object.shapedata = XML_Object.attributes['shapedata'].value;
                                    }
                                    if(XML_Object.attributes['shapedata']){
                                        Object.shapedata = XML_Object.attributes['shapedata'].value;
                                    }
                                    //区分是顶线（0）还是脚线（1）
                                    if(XML_Object.attributes['PosType']){
                                        Object.PosType = XML_Object.attributes['PosType'].value;
                                    }
                                    //截面数据
                                    if(XML_Object.attributes['Shape']){
                                        Object.Shape = XML_Object.attributes['Shape'].value;
                                    }
                                    //判断是否是独立花色
                                    if(XML_Object.attributes['keepmat']){
                                        Object.keepmat = XML_Object.attributes['keepmat'].value;
                                    }

                                    /*************** 遍历部件 Object ***************************/
                                    for(var y = 0; y < XML_Object.childNodes.length; y++){
                                        /************** 部件的材料**************************/
                                        if(XML_Object.childNodes[y].nodeName == "Material"){
                                            var Material = {};

                                            //属性
                                            Material.name = XML_Object.childNodes[y].attributes['name'].value;
                                            Material.width = XML_Object.childNodes[y].attributes['width'].value;
                                            Material.height = XML_Object.childNodes[y].attributes['height'].value;
                                            Material.rotate = XML_Object.childNodes[y].attributes['rotate'].value;
                                            Material.imagefile = XML_Object.childNodes[y].attributes['imagefile'].value;
                                            Material.shininess = XML_Object.childNodes[y].attributes['shininess'].value;
                                            Material.color = XML_Object.childNodes[y].attributes['color'].value;

                                            //子元素
                                            Material.matdata = {};
                                            Material.matdata.text = XML_Object.childNodes[y].childNodes[0].innerHTML;

                                            Object.Material = Material;
                                        }

                                        /****************************************************/
                                        var Vars = [];
                                        if(XML_Object.childNodes[y].nodeName == "Var"){
                                            var Var  = {};
                                            if(XML_Object.childNodes[y].attributes['Name']){
                                                Var.Name = XML_Object.childNodes[y].attributes['Name'].value;
                                            }
                                            Var.Name = XML_Object.childNodes[y].attributes['Name'].value;
                                            if(XML_Object.childNodes[y].attributes['Value']){
                                                Var.Value = XML_Object.childNodes[y].attributes['Value'].value;
                                            }
                                            Vars.push(Var);
                                        }
                                        Object.Vars = Vars;

                                        /****************************************************/
                                        if(XML_Object.childNodes[y].nodeName == "DrillSet"){
                                            var DrillSet  = {};
                                            Object.DrillSet = DrillSet;
                                        }
                                    }
                                    ObjectList.push(Object);
                                }
                            }

                            SingleGroup.ObjectList = ObjectList;
                        }

                        //VarList
                        if(XML_ComposeGroup.childNodes[j].childNodes[k].nodeName == "VarList"){
                            var VarList = [];
                            if(XML_ComposeGroup.childNodes[j].childNodes[k]){
                                var XML_VarList = XML_ComposeGroup.childNodes[j].childNodes[k];
                            }

                            for(var x = 0;x < XML_VarList.childNodes.length; x++){
                                var Var = {};
                                if(XML_VarList.childNodes[x].attributes['Name']){
                                    Var.Name = XML_VarList.childNodes[x].attributes['Name'].value;
                                }
                                if(XML_VarList.childNodes[x].attributes['NickName']){
                                    Var.NickName = XML_VarList.childNodes[x].attributes['NickName'].value;
                                }
                                if(XML_VarList.childNodes[x].attributes['Value']){
                                    Var.Value = XML_VarList.childNodes[x].attributes['Value'].value;
                                }
                                VarList.push(Var);
                            }
                            SingleGroup.VarList = VarList;
                        }

                        //SingleGroup2
                        if(XML_ComposeGroup.childNodes[j].childNodes[k].nodeName == "SingleGroup"){
                            var SingleGroup2 = {};
                            var XML_SingleGroup2 = XML_ComposeGroup.childNodes[j].childNodes[k];
                            //单个组件的属性
                            if(XML_SingleGroup2.attributes['Name']){
                                SingleGroup2.Name = XML_SingleGroup2.attributes['Name'].value;
                            }
                            if(XML_SingleGroup2.attributes['GoodsType']){
                                SingleGroup2.GoodsType = XML_SingleGroup2.attributes['GoodsType'].value;
                            }
                            //设置组件的开门的方向
                            if(XML_SingleGroup2.attributes['OpenDir']){
                                SingleGroup2.OpenDir = XML_SingleGroup2.attributes['OpenDir'].value;
                            }

                            if(XML_SingleGroup2.attributes['AlignX']){
                                SingleGroup2.AlignX = XML_SingleGroup2.attributes['AlignX'].value;
                            }
                            if(XML_SingleGroup2.attributes['AlignY']){
                                SingleGroup2.AlignY = XML_SingleGroup2.attributes['AlignY'].value;
                            }
                            if(XML_SingleGroup2.attributes['AlignZ']){
                                SingleGroup2.AlignZ = XML_SingleGroup2.attributes['AlignZ'].value;
                            }

                            if(XML_SingleGroup2.attributes['ax']){
                                SingleGroup2.ax = XML_SingleGroup2.attributes['ax'].value;
                            }
                            if(XML_SingleGroup2.attributes['ay']){
                                SingleGroup2.ay = XML_SingleGroup2.attributes['ay'].value;
                            }
                            if(XML_SingleGroup2.attributes['az']){
                                SingleGroup2.az = XML_SingleGroup2.attributes['az'].value;
                            }

                            /************************ 柜体集合中的单个柜体 ********************/
                            for(var x = 0; x < XML_SingleGroup2.childNodes.length; x++){
                                if(XML_SingleGroup2.childNodes[x].nodeName == "VarList"){
                                    var XML_VarList = XML_SingleGroup2.childNodes[x];
                                    var VarList = [];
                                    //添加属性
                                    if(XML_VarList.attributes['Name']){
                                        VarList.Name = XML_VarList.attributes['Name'].value;
                                    }
                                    //遍历VarList
                                    for(var y = 0;y < XML_VarList.childNodes.length;y++){
                                        var Var = {};
                                        if(XML_VarList.childNodes[y].attributes['Name']){
                                            Var.Name = XML_VarList.childNodes[y].attributes['Name'].value;
                                        }
                                        VarList.push(Var);
                                    }
                                    SingleGroup2.VarList = VarList;
                                }

                                //物体部件列表
                                if(XML_SingleGroup2.childNodes[x].nodeName == "ObjectList"){
                                    var ObjectList = [];
                                    var XML_ObjectList = XML_SingleGroup2.childNodes[x];
                                    ObjectList.Name = XML_ObjectList.attributes['Name'].value;

                                    /********************* 遍历物体部件列表 ObjectList ******************/
                                    for(var y = 0;y < XML_ObjectList.childNodes.length; y++){
                                        var XML_Object = XML_ObjectList.childNodes[y];
                                        var Object = [];

                                        //给部件添加属性
                                        if(XML_Object.attributes['class']){
                                            Object.class = XML_Object.attributes['class'].value;
                                        }
                                        if(XML_Object.attributes['Name']){
                                            Object.Name = XML_Object.attributes['Name'].value;
                                        }
                                        if(XML_Object.attributes['NodeID']){
                                            Object.NodeID = XML_Object.attributes['NodeID'].value;
                                        }

                                        if(XML_Object.attributes['width']){
                                            Object.width = XML_Object.attributes['width'].value;
                                        }
                                        if(XML_Object.attributes['depth']){
                                            Object.depth = XML_Object.attributes['depth'].value;
                                        }
                                        if(XML_Object.attributes['height']){
                                            Object.height = XML_Object.attributes['height'].value;
                                        }

                                        if(XML_Object.attributes['x']){
                                            Object.x = XML_Object.attributes['x'].value;
                                        }
                                        if(XML_Object.attributes['y']){
                                            Object.y = XML_Object.attributes['y'].value;
                                        }
                                        if(XML_Object.attributes['z']){
                                            Object.z = XML_Object.attributes['z'].value;
                                        }

                                        if(XML_Object.attributes['ax']){
                                            Object.ax = XML_Object.attributes['ax'].value;
                                        }
                                        if(XML_Object.attributes['ay']){
                                            Object.ay = XML_Object.attributes['ay'].value;
                                        }
                                        if(XML_Object.attributes['az']){
                                            Object.az = XML_Object.attributes['az'].value;
                                        }

                                        //标记组件是否显示
                                        if(XML_Object.attributes['visible']){
                                            Object.visible = XML_Object.attributes['visible'].value;
                                        }
                                        //XML路径
                                        if(XML_Object.attributes['sect']){
                                            Object.sect = XML_Object.attributes['sect'].value;
                                        }
                                        if(XML_Object.attributes['sectfile']){
                                            Object.sectfile = XML_Object.attributes['sectfile'].value;
                                        }
                                        if(XML_Object.attributes['AlignZ']){
                                            Object.AlignZ = XML_Object.attributes['AlignZ'].value;
                                        }
                                        //拉伸体的路径
                                        if(XML_Object.attributes['shapedata']){
                                            Object.shapedata = XML_Object.attributes['shapedata'].value;
                                        }
                                        if(XML_Object.attributes['pathdata']){
                                            Object.pathdata = XML_Object.attributes['pathdata'].value;
                                        }
                                        //板件的左右，0 左 1，右
                                        if(XML_Object.attributes['side']){
                                            Object.side = XML_Object.attributes['side'].value;
                                        }
                                        //几何体的倒角设置
                                        if(XML_Object.attributes['Offset']){
                                            Object.Offset = XML_Object.attributes['Offset'].value;
                                        }
                                        //模型的地址
                                        if(XML_Object.attributes['modelfile']){
                                            Object.modelfile = XML_Object.attributes['modelfile'].value;
                                        }
                                        //拉伸体路径是否闭合 0 闭合 （默认为不闭合）
                                        if(XML_Object.attributes['ClosePath']){
                                            Object.ClosePath = XML_Object.attributes['ClosePath'].value;
                                        }
                                        //拉伸的基础图形
                                        if(XML_Object.attributes['Shape']){
                                            Object.Shape = XML_Object.attributes['Shape'].value;
                                        }
                                        //判断是否是独立花色
                                        if(XML_Object.attributes['keepmat']){
                                            Object.keepmat = XML_Object.attributes['keepmat'].value;
                                        }

                                        var VarList = [];
                                        /*************** 遍历部件 Object ***************************/
                                        for(var z = 0; z < XML_Object.childNodes.length; z++){

                                            //部件的材料
                                            if(XML_Object.childNodes[z].nodeName == "Material"){
                                                var Material = {};

                                                //属性
                                                if(XML_Object.childNodes[z].attributes['name']){
                                                    Material.name = XML_Object.childNodes[z].attributes['name'].value;
                                                }

                                                if(XML_Object.childNodes[z].attributes['width']){
                                                    Material.width = XML_Object.childNodes[z].attributes['width'].value;
                                                }
                                                if(XML_Object.childNodes[z].attributes['height']){
                                                    Material.height = XML_Object.childNodes[z].attributes['height'].value;
                                                }

                                                if(XML_Object.childNodes[z].attributes['rotate']){
                                                    Material.rotate = XML_Object.childNodes[z].attributes['rotate'].value;
                                                }
                                                if(XML_Object.childNodes[z].attributes['imagefile']){
                                                    Material.imagefile = XML_Object.childNodes[z].attributes['imagefile'].value;
                                                }
                                                if(XML_Object.childNodes[z].attributes['color']){
                                                    Material.color = XML_Object.childNodes[z].attributes['color'].value;
                                                }

                                                //子元素
                                                Material.matdata = {};
                                                if(XML_Object.childNodes[z].childNodes[0].innerHTML){
                                                    Material.matdata.text = XML_Object.childNodes[z].childNodes[0].innerHTML;
                                                }
                                                Object.Material = Material;
                                            }

                                            if(XML_Object.childNodes[z].nodeName == "Var"){
                                                var Var  = {};
                                                if(XML_Object.childNodes[z].attributes['Name']){
                                                    Var.Name = XML_Object.childNodes[z].attributes['Name'].value;
                                                }
                                                if(XML_Object.childNodes[z].attributes['Value']){
                                                    Var.Value = XML_Object.childNodes[z].attributes['Value'].value;
                                                }

                                                VarList.push(Var);
                                            }

                                            if(XML_Object.childNodes[z].nodeName == "DrillSet"){
                                                var DrillSet  = {};
                                                Object.DrillSet = DrillSet;
                                            }
                                        }
                                        Object.VarList = VarList;
                                        ObjectList.push(Object);
                                    }

                                    SingleGroup2.ObjectList = ObjectList;
                                }
                            }
                            SingleGroup.SingleGroup2 = SingleGroup2;
                        }
                    }
                    SingleGroupS.push(SingleGroup);
                }
            }
            ComposeGroup.SingleGroupS = SingleGroupS;
            scene.ComposeList.push(ComposeGroup);
        }
    }
};

$(function(){

    //if(Detector.webgl){
    //    //设置遮盖层
    //    XML_D.Cover();
    //
    //    //接收地址栏的参数，并进行转换设置
    //    XML_D.URL.transform_XML_URL();
    //
    //    //加载GUI
    //    XML_D.GUI.initGUI();

        //加载threejs
        XML_D.XML.loadXMLTOJson();

    //}else{
    //    Detector.addGetWebGLMessage("123");
    //    throw "你的浏览器不支持webGL，建议使用谷歌浏览器！";
    //}

});

