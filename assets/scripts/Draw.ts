// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { DrawManager, PenType } from "./DrawManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



    @property(cc.Node)
    board: cc.Node = null;

    @property(cc.Node)
    widthSlider: cc.Node = null;

    @property(cc.Node)
    colorLayout: cc.Node = null;

    @property(cc.Node)
    toolLayout: cc.Node = null;

    //画板
    private drawManager: DrawManager;
    //定义当前为画笔
    private brush_tool: string = "BRUSH";
    //定义当前为橡皮擦
    private eraser_tool: string = "ERASER";
    //当前是画笔还是橡皮擦
    private tool: string;

    //画笔宽
    private lineWidth: number = 1;
    //橡皮擦宽
    private eraserWidth: number = 10;
    private curColor :  cc.Color = cc.color(0, 0, 0, 255);
    private curBrushWidth;
    private curEraserWidth;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.brush_tool = 'BRUSH'
        this.eraser_tool = 'ERASER'
        this.tool = this.brush_tool
        cc.debug.setDisplayStats(false) //去掉模拟器上的FPS信息
    }

    start() {
        this.drawManager = new DrawManager();
        this.drawManager.init(this.board);
        this.onPen();
        this.node.addChild(this.drawManager.drawNode);
    }


    onPen() {
        this.drawManager.setLineWidth(1);
        this.drawManager.setStrokeColor(new cc.Color(0, 0, 0, 255));
    }

    onEraser() {
        this.drawManager.setLineWidth(40);
        this.drawManager.setStrokeColor(new cc.Color(0, 0, 0, 0));
    }

  


    // update (dt) {}

 
    //调整笔刷粗细
    sliderEvent(slider) {

        if (this.tool == this.brush_tool) {

            this.lineWidth = 1 + slider.progress * 5

            this.drawManager.setLineWidth(this.lineWidth);



        } else if (this.tool == this.eraser_tool) {
            this.eraserWidth = 10 + slider.progress * 50
            this.drawManager.setLineWidth(this.eraserWidth);
        }
    }


    blackBtnEvent() {
        if (this.tool == this.brush_tool) {
            this.curColor = new cc.Color(0, 0, 0, 255)
            this.drawManager.setStrokeColor(this.curColor);

            for (let i = 0; i < this.colorLayout.children.length; i++) {
                if (i == 0) {
                    this.colorLayout.children[i].opacity = 255
                } else {
                    this.colorLayout.children[i].opacity = 100
                }
            }
        }
    }


    redBtnEvent() {
        if (this.tool == this.brush_tool) {
            this.curColor = new cc.Color(255, 0, 0, 255)
            this.drawManager.setStrokeColor(this.curColor);

            for (let i = 0; i < this.colorLayout.children.length; i++) {
                if (i == 1) {
                    this.colorLayout.children[i].opacity = 255
                } else {
                    this.colorLayout.children[i].opacity = 100
                }
            }
        }
    }


    greenBtnEvent() {
        if (this.tool == this.brush_tool) {
            this.curColor = new cc.Color(0, 255, 0, 255)
            this.drawManager.setStrokeColor(this.curColor);
            for (let i = 0; i < this.colorLayout.children.length; i++) {
                if (i == 2) {
                    this.colorLayout.children[i].opacity = 255
                } else {
                    this.colorLayout.children[i].opacity = 100
                }
            }
        }
    }


    blueBtnEvent() {
        if (this.tool == this.brush_tool) {
            this.curColor = new cc.Color(0, 0, 255, 255)
            this.drawManager.setStrokeColor(this.curColor);

            for (let i = 0; i < this.colorLayout.children.length; i++) {
                if (i == 3) {
                    this.colorLayout.children[i].opacity = 255
                } else {
                    this.colorLayout.children[i].opacity = 100
                }
            }
        }
    }


    yellowBtnEvent() {
        if (this.tool == this.brush_tool) {
            this.curColor = new cc.Color(255, 255, 0, 255)
            this.drawManager.setStrokeColor(this.curColor);

            for (let i = 0; i < this.colorLayout.children.length; i++) {
                if (i == 4) {
                    this.colorLayout.children[i].opacity = 255
                } else {
                    this.colorLayout.children[i].opacity = 100
                }
            }
        }
    }


    purpleBtnEvent() {
        if (this.tool == this.brush_tool) {
            this.curColor = new cc.Color(255, 0, 255, 255)
            this.drawManager.setStrokeColor(this.curColor);

            for (let i = 0; i < this.colorLayout.children.length; i++) {
                if (i == 5) {
                    this.colorLayout.children[i].opacity = 255
                } else {
                    this.colorLayout.children[i].opacity = 100
                }
            }
        }
    }

    //设置笔刷为普通画笔
    brushBtnEvent() {
        cc.game.canvas.style.cursor = "default";
        this.tool = this.brush_tool
        this.toolLayout.children[0].opacity = 255
        this.toolLayout.children[1].opacity = 100
        this.toolLayout.children[2].opacity = 255
        this.drawManager.setStrokeColor(this.curColor);
        // this.drawManager.setStrokeColor(new cc.Color(0, 0, 0, 255));

        //设置slider上handle位置
        this.widthSlider.getComponent(cc.Slider).progress = (this.lineWidth - 1) / 5
        this.drawManager.setLineWidth(this.lineWidth);

    }

    //设置笔刷为橡皮擦
    eraserBtnEvent() {
        cc.game.canvas.style.cursor = "pointer";

        this.tool = this.eraser_tool
        this.toolLayout.children[0].opacity = 100
        this.toolLayout.children[1].opacity = 255
        this.toolLayout.children[2].opacity = 255

        this.drawManager.setStrokeColor(new cc.Color(0, 0, 0, 0));
         
        //设置slider上handle位置
        this.widthSlider.getComponent(cc.Slider).progress = (this.eraserWidth - 10) / 50
        this.drawManager.setLineWidth(this.eraserWidth);

    

    }

    //清除所有内容
    cleanBtnEvent() {
        this.drawManager.clearReset()
    }
}
