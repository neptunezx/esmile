/**
 * Created by gujj on 2014/11/11.
 */

var ESmile = { REVISION: '1' };
ESmile.Util = {};

if (typeof module === 'object') {
    moudle.exports = ESmile;
}

ESmile.Config = {
    CurrentTheme: ESmile.Theme,
    CameraType: {
        Cube: "cube",
        Perspective: "perspective",
        Orthographic: "orthographic"
    },
    MaterialType: {
        BasicMaterial: "MeshBasicMaterial",
        LambertMaterial: "LambertMaterial",
        PhongMaterial: "PhongMaterial",
        NormalMaterial: "NormalMaterial",
        ShaderMaterial: "ShaderMaterial"
    },
    ThemeType: {
        Default: "default",
        Green: "green",
        Cool: "cool",
        Blue: "blue"
    },
    EventType : {
        /**
         * 窗口大小变化
         * @type {string}
         */
        Resize : 'resize',
        /**
         * 鼠标按钮被（手指）按下，事件对象是：目标图形元素或空
         * @type {string}
         */
        Click : 'click',
        /**
         * 双击事件
         * @type {string}
         */
        DblClick : 'dblclick',
        /**
         * 鼠标滚轮变化，事件对象是：目标图形元素或空
         * @type {string}
         */
        MouseWheel : 'mousewheel',
        /**
         * 鼠标（手指）被移动，事件对象是：目标图形元素或空
         * @type {string}
         */
        MouseMove : 'mousemove',
        /**
         * 鼠标移到某图形元素之上，事件对象是：目标图形元素
         * @type {string}
         */
        MouseOver : 'mouseover',
        /**
         * 鼠标从某图形元素移开，事件对象是：目标图形元素
         * @type {string}
         */
        MouseOut : 'mouseout',
        /**
         * 鼠标按钮（手指）被按下，事件对象是：目标图形元素或空
         * @type {string}
         */
        MouseDown : 'mousedown',
        /**
         * 鼠标按键（手指）被松开，事件对象是：目标图形元素或空
         * @type {string}
         */
        MouseUp : 'mouseup',
        /**
         * 全局离开，MOUSEOUT触发比较频繁，一次离开优化绑定
         * @type {string}
         */
        GlobalOut : 'globalout',    //

        // 一次成功元素拖拽的行为事件过程是：
        // dragstart > dragenter > dragover [> dragleave] > drop > dragend
        /**
         * 开始拖拽时触发，事件对象是：被拖拽图形元素
         * @type {string}
         */
        DragStart : 'dragstart',
        /**
         * 拖拽完毕时触发（在drop之后触发），事件对象是：被拖拽图形元素
         * @type {string}
         */
        DragEnd : 'dragend',
        /**
         * 拖拽图形元素进入目标图形元素时触发，事件对象是：目标图形元素
         * @type {string}
         */
        DragEnter : 'dragenter',
        /**
         * 拖拽图形元素在目标图形元素上移动时触发，事件对象是：目标图形元素
         * @type {string}
         */
        DragOver : 'dragover',
        /**
         * 拖拽图形元素离开目标图形元素时触发，事件对象是：目标图形元素
         * @type {string}
         */
        DragLeave : 'dragleave',
        /**
         * 拖拽图形元素放在目标图形元素内时触发，事件对象是：目标图形元素
         * @type {string}
         */
        DragDrop : 'dragdrop',
    },
    MapSelectedMode: {
        Multiple: "mutiple",
        Single: "single"
    }
};

// 全局图表颜色、字体、边框、属性等参数设置
ESmile.DefaultTheme = {
    ChartBackgroundColor:0xeeeeee /*0xadeaea*/,
    ChartBackgroundStyle: 'skybox',
    ComponentBackgroundColor: 0xffffff,
    ComponentOnClickColor: 0xffffff,
    ComponentOnMouseOverColor: 0xffffff,
    ComponentColor: 0xffffff,
    GraphicObjectOnClickColor:0xffffff,
    GraphicObjectBackgroundColor: 0xffffff,
    TextCanvasWidth: 100,
    TextCanvasHeight: 80,
    TextCanvasFont: '微软雅黑',
    TextCanvasColor: "#000000",
    TextCanvasSize: "20",
    TextCanvasStyle: "",
    TextCanvasTextAlign: "center",
    CameraType: ESmile.Config.CameraType.Perspective,
    MaterialType: ESmile.Config.MaterialType.BasicMaterial,
    PolygonColumnBorderColor: 0xffffff,
    PolygonColumnColor:  0xBDBDED,
    MapSelectedMode:  ESmile.Config.MapSelectedMode.Single,
    MapSelectedColor: 0xFFD700
};

ESmile.BlueTheme = {

};

ESmile.GreenTheme = {

};

ESmile.CoolTheme = {

};

ESmile.Theme = ESmile.DefaultTheme;


