// Type definitions for CreateJS
// Project: http://www.createjs.com/
// Definitions by: Pedro Ferreira <https://bitbucket.org/drk4>, Chris Smith <https://github.com/evilangelist>, Satoru Kimura <https://github.com/gyohk>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/*
    Copyright (c) 2012 Pedro Ferreira
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// Common class and methods for CreateJS.
// Library documentation : http://www.createjs.com/Docs/EaselJS/modules/EaselJS.html
// Library documentation : http://www.createjs.com/Docs/PreloadJS/modules/PreloadJS.html
// Library documentation : http://www.createjs.com/Docs/SoundJS/modules/SoundJS.html
// Library documentation : http://www.createjs.com/Docs/TweenJS/modules/TweenJS.html


interface NativeMouseEvent extends MouseEvent {

}

declare namespace createjs {
    export class Types {
        static BINARY:string
        static CSS:string
        static FONT:string
        static FONTCSS:string
        static IMAGE:string
        static JAVASCRIPT:string
        static MANIFEST:string
        static SOUND:string
        static VIDEO:string
        static JSON:string
        static JSONP:string
        static SPRITESHEET:string
        static SVG:string
        static TEXT:string
        static XML:string
    }
    /**
     * 包含所有事件共享的属性和方法，以便与{@link EventDispatcher}一起使用。
     * 请注意，事件对象经常被重用，因此您永远不应该依赖于事件对象在调用堆栈之外的状态。
     */
    class Event {
        /**
         * 
         * @param type 事件类型。例如，Event.COMPLETE
         * @param bubbles 指示事件是否会在显示列表中冒泡。
         * @param cancelable 指示是否可以取消此事件的默认行为。
         */
        constructor(type?: string, bubbles?: boolean, cancelable?: boolean);

        // properties
        /** 指示事件是否会在显示列表中冒泡 */
        bubbles: boolean;
        /** 指示是否可以通过preventDefault取消此事件的默认行为。这是通过Event构造函数设置的 */
        cancelable: boolean;
        /** 正在从中调度冒泡事件的当前目标。对于非冒泡事件，这将始终与目标相同。例如，如果childObj.parent=parentObj，并且从childObj生成冒泡事件，则parentObj上的侦听器将接收到target=childObj（原始目标）和currentTarget=parentObj（添加侦听器的位置）的事件 */
        currentTarget: any; // It is 'Object' type officially, but 'any' is easier to use.
        /** 指示是否对此事件调用了preventDefault */
        defaultPrevented: boolean;
        /**
         * 对于冒泡事件，这表示当前事件阶段：
         * 1.捕获阶段：从顶部父对象开始到目标
         * 2.在目标阶段：当前正在从目标调度
         * 3.冒泡阶段：从目标到顶部父对象
        */
        eventPhase: number;
        /** 指示是否对此事件调用了stopImmediatePropagation */
        immediatePropagationStopped: boolean;
        /** 指示是否对此事件调用了stopPropagation或stopImmediatePropagation */
        propagationStopped: boolean;
        /** 指示是否对此事件调用了remove */
        removed: boolean;
        /** 事件目标对象 */
        target: any; // It is 'Object' type officially, but 'any' is easier to use.
        timeStamp: number;
        type: string;

        // other event payloads
        /** 自定义数据 */
        data: any;
        delta: number;
        error: string;
        id: string;
        item: any;
        loaded: number;
        name: string;
        next: string;
        params: any;
        paused: boolean;
        progress: number;
        rawResult: any;
        result: any;
        runTime: number;
        src: string;
        time: number;
        total: number;

        // methods
        /**
         * 返回Event实例的克隆。
         * @returns Event实例的克隆。
         */
        clone(): Event;
        /**
         * 如果事件可取消，则将{@link defaultPrevented}设置为true。反映DOM2事件标准。一般来说，如果事件可取消，则调用`preventDefault()`将取消与该事件关联的默认行为。
         */
        preventDefault(): void;
        /**

         * 通过removeEventListener();删除活动监听器
         * ```js
         * myBtn.addEventListener("click", function(evt) {
         *     // do stuff...
         *     evt.remove(); // 删除此侦听器。
         * });
         * ```
         */
        remove(): void;
        /**
         * 提供一种可链接的快捷方式，用于在实例上设置多个属性。
         * @param props 包含要复制到实例的属性的通用对象。
         * @returns 返回方法被调用的实例（对于链式调用很有用）。
         */
        set(props: Object): Event;
        /**
         * 将{@link propagationStopped}和{@link immediatePropagationStopped}设置为true。对应DOM事件标准。
         */
        stopImmediatePropagation(): void;
        /**
         * 将{@link propagationStopped}设置为true。反映DOM事件标准。
         */
        stopPropagation(): void;
        /**
         * 返回此对象的字符串表示形式。
         * @returns 实例的字符串表示。
         */
        toString(): string;
    }
    /**
     * EventDispatcher提供了管理事件侦听器队列和分发事件的方法。
     * 
     * 您可以扩展EventDispatcher，也可以使用EventDispatcher的{@link initialize}方法将其方法混合到现有的原型或实例中。
     * 
     * EventDispatcher与CreateJS Event类一起提供了一个基于DOM Level 2事件模型的扩展事件模型，包括addEventListener、removeEventListener和dispatchEvent。它支持冒泡/捕获、preventDefault, stopPropagation, stopImmediatePropagation和handleEvent。
     * 
     * EventDispatcher还公开了一个{@link on}方法，这使得创建作用域监听器、只运行一次的监听器以及具有相关任意数据的监听器变得更加容易。{@link off}方法只是removeEventListener的别名。
     * 
     * DOM Level 2模型的另一个补充是{@link removeAllEventListener}方法，该方法可用于所有事件的监听器，或特定事件的监听器。Event对象还包括一个{@link remove}方法，用于删除活动侦听器。
     * 
     * Example
     * 
     * 将EventDispatcher功能添加到"MyClass"类中。
     * ```js
     * EventDispatcher.initialize(MyClass.prototype); // add to the prototype of the class
     * EventDispatcher.initialize(myObject); // add to a specific instance
     * ```
     * 添加事件（请参阅{@link addEventListener}）。
     * ```js
     * instance.addEventListener("eventName", handleClick);
     * function handleClick(event) {
     *     console.log(event.target + " Was Clicked");
     * }
     * ```
     * 保持适当的范围
     * 
     * Scope (ie. "this")对事件来说可能是一个挑战。使用{@link on}方法监听事件简化了这一过程。
     * ```js
     * instance.addEventListener("click", function(event) {
     *     console.log(instance == this); // false, scope is ambiguous.
     * });
     *
     * instance.on("click", function(event) {
     *     console.log(instance == this); // true, "on" uses dispatcher scope by default.
     * });
     * ```
     * 如果你想使用addEventListener，你可能想使用function.bind()或类似的代理来管理作用域。
     * 
     * 浏览器支持CreateJS中的事件模型可以在任何项目中与套件分开使用，但是继承模型需要现代浏览器（IE9+）。
     */
    class EventDispatcher {
        constructor()
        // methods
        /**
         * 添加指定的事件侦听器。请注意，向同一个对象添加多个监听器将导致多个监听器被触发。
         * 
         * 案例：
         * ```js
         * displayObject.addEventListener("click", handleClick);
         * function handleClick(event) {
         *     // Click happened.
         * }
         * ```
         * @param type 事件的字符串类型。
         * @param listener 具有handleEvent方法的对象，或在事件被分派时将被调用的函数。
         * @param useCapture 对于冒泡的事件，指示是在捕获阶段还是冒泡/目标阶段监听事件。
         * @returns 返回用于链接或赋值的侦听器。
         */
        addEventListener(type: string, listener: (eventObj: Object) => void|boolean, useCapture?: boolean): Function|Object
        //addEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): Function;
        addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void|boolean}, useCapture?: boolean): Object
        //addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): Object;
        addEventListener(type: string, listener: (e?:Event|any) => void, useCapture?: boolean): ()=>{}
        //addEventListener(type: string, listener: (e?:any) => void, useCapture?: boolean): ()=>{}
        /**
         * 将指定的事件分派给所有侦听器。
         * @param eventObj 具有"type"属性或字符串类型的对象。虽然通用对象可以工作，但建议使用CreateJS事件实例。如果使用了字符串，dispatchEvent将在必要时使用指定的类型构造一个Event实例。后一种方法可以用于避免可能没有任何侦听器的非冒泡事件的事件对象实例化。
         * @param bubbles 指定将字符串传递给eventObj时的气泡值。
         * @param cancelable 指定将字符串传递给eventObj时可取消的值。
         * @returns 如果对可取消事件调用了preventDefault()，则返回false，否则返回true。
         */
        dispatchEvent(eventObj: Object|string|Event, target?: Object): boolean;
        /*dispatchEvent(eventObj: string, target?: Object): boolean;
        dispatchEvent(eventObj: Event, target?: Object): boolean;*/
        /**
         * 指定事件类型是否至少有一个侦听器。
         * @param type 事件类型
         * @returns 如果指定事件至少有一个侦听器，则返回true。
         */
        hasEventListener(type: string): boolean;
        /**
         * 静态初始化方法，用于将EventDispatcher方法混合到目标对象或原型中。
         * ```js
         * EventDispatcher.initialize(MyClass.prototype); // add to the prototype of the class
         * EventDispatcher.initialize(myObject); // add to a specific instance
         * ```
         * @param target 将EventDispatcher方法注入的目标对象。这可以是实例或原型。
         */
        static initialize(target: Object): void;
        off(type: string, listener: (eventObj: Object) => boolean|void, useCapture?: boolean): void;
        //off(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        off(type: string, listener: { handleEvent: (eventObj: Object) => boolean|void; }, useCapture?: boolean): void;
        //off(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        off(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        off<T extends Event = Event>(type: string, listener: Function|((eventObj?: T)=>void), useCapture?: boolean): void;
        /**
         * 一种使用addEventListener的快捷方法，可以更容易地指定执行范围，使侦听器只运行一次，将任意数据与侦听器相关联，并删除侦听器。
         * 
         * 此方法通过创建匿名包装器函数并使用addEventListener订阅它来工作。返回包装器函数以与removeEventListener一起使用（或关闭）。
         * 
         * 重要提示：要删除添加了on的侦听器，您必须将返回的包装器函数作为侦听器传递，或使用remove。同样，每次调用NEW包装器函数时，都会订阅，因此使用相同参数对on的多次调用将创建多个侦听器。
         * 
         * 案例：
         * ```js
         * var listener = myBtn.on("click", handleClick, null, false, {count:3});
         * function handleClick(evt, data) {
         *     data.count -= 1;
         *     console.log(this == myBtn); // true - scope defaults to the dispatcher
         *     if (data.count == 0) {
         *         alert("clicked 3 times!");
         *         myBtn.off("click", listener);
         *         // alternately: evt.remove();
         *     }
         * }
         * ```
         * @param type 事件类型
         * @param listener 侦听器
         * @param scope 执行侦听器的作用域。对于函数侦听器，默认为dispatcher/currentTarget，对于对象侦听器，则默认为侦听器本身（即使用handleEvent）。直白点说就是this指向谁，默认是指向侦听器自身。
         * @param once 是否仅执行一次侦听器
         * @param data 传参
         * @param useCapture 
         */
        on(type: string, listener: (eventObj: Object) => boolean|void, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        //on(type: string, listener: (eventObj: Object) => void, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        on(type: string, listener: { handleEvent: (eventObj: Object) => boolean|void; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        //on(type: string, listener: { handleEvent: (eventObj: Object) => void; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        on(type: string, listener:(eventObj: any)=>void, scope?: any, once?: boolean, data?: any, useCapture?: boolean):void;
        on<T extends Event = Event>(type: string, listener: Function|((eventObj?: T)=>void|boolean), scope?: any, once?: boolean, data?: any, useCapture?: boolean):Function|((eventObj?: T)=>void);
        /**
         * 删除指定类型的所有侦听器，或所有类型的所有监听器。
         * 
         * 案例：
         * ```js
         * // Remove all listeners
         * displayObject.removeAllEventListeners();
         * 
         * // Remove all click listeners
         * displayObject.removeAllEventListeners("click");
         * ```
         * @param type 事件类型
         */
        removeAllEventListeners(type?: string): void;
        /**
         * 删除指定的事件侦听器。
         * 
         * 重要提示：您必须传递添加事件时使用的确切函数引用。如果使用代理函数或函数闭包作为回调，则必须使用代理/闭包引用——新的代理或闭包将无法工作。
         * 
         * 案例：
         * ```js
         * displayObject.removeEventListener("click", handleClick);
         * ```
         * @param type 事件类型
         * @param listener 监听器函数或对象。
         * @param useCapture 对于冒泡的事件，指示是在捕获阶段还是冒泡/目标阶段监听事件。
         */
        removeEventListener(type: string, listener: (eventObj: Object) => boolean|void, useCapture?: boolean): void;
        //removeEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean|void; }, useCapture?: boolean): void;
        //removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        removeEventListener(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        /**
         * @returns 实例的字符串表示。
         */
        toString(): string;
        /**
         * 指示此对象或其任何祖先（父级、父级的父级等）上是否至少有一个指定事件类型的侦听器。
         * 返回值true表示，如果从该对象分派指定类型的冒泡事件，它将触发至少一个侦听器。
         * 
         * 这类似于{@link hasEventListener}，但它在整个事件流中搜索侦听器，而不仅仅是这个对象。
         * @param type 事件类型
         * @returns 如果指定事件至少有一个侦听器，则返回true。
         */
        willTrigger(type: string): boolean;
    }
    /**
     * 为新类设置原型链和构造函数属性。
     * 
     * 这应该在创建类构造函数之后立即调用。
     * 
     * @param subclass 
     * @param superclass 
     */
    export function extend(subclass: () => any, superclass: () => any): () => any;     // returns the subclass prototype
    /**
     * 在传入的数组中查找指定值searchElement的第一个匹配项，并返回该值的索引。如果找不到值，则返回-1。
     * @param array 数组
     * @param searchElement 匹配项
     */
    export function indexOf(array: any[], searchElement: Object): number;
    /**
     * 通过创建格式为prefix_methodName的别名，提升超类上被重写的任何方法。建议使用超类的名称作为前缀。超类的构造函数的别名总是以前缀_构造函数的格式添加。
     * 这允许子类在不使用function.call的情况下调用超类方法，从而提供更好的性能。
     * 
     * 例如，如果MySubClass扩展了MySuperClass，并且两者都定义了一个draw方法，那么调用promote(MySubClass, "MySuperClass")将向MySubClass添加一个MySupClass_constructor方法，并将MySupClass上的draw方法提升为MySupClass_draw的MySubClass原型。
     * 
     * 这应该在类的原型完全定义之后调用。
     * 
     * @param subclass 超类
     * @param prefix 前缀
     */
    export function promote(subclass: () => any, prefix: string): () => any;

    export function proxy(method: (eventObj: Object) => boolean, scope: Object, ...arg: any[]): (eventObj: Object) => any;
    export function proxy(method: (eventObj: Object) => void, scope: Object, ...arg: any[]): (eventObj: Object) => any;
    export function proxy(method: { handleEvent: (eventObj: Object) => boolean; }, scope: Object, ...arg: any[]): (eventObj: Object) => any;
    export function proxy(method: { handleEvent: (eventObj: Object) => void; }, scope: Object, ...arg: any[]): (eventObj: Object) => any;
    /**
     * 将灰度 Alpha 贴图图像（或画布）应用到目标，这样结果的 Alpha 通道将从贴图的红色通道复制，RGB 通道将从目标复制。
     * 通常，建议您使用AlphaMaskFilter，因为它的性能要好得多。
     */
    class AlphaMapFilter extends Filter {
        constructor(alphaMap: HTMLImageElement | HTMLCanvasElement);

        // properties

        /**
         * 要用作结果的alpha值的灰度图像（或画布）。这应该与目标的尺寸完全相同。
         */
        alphaMap: HTMLImageElement | HTMLCanvasElement;

        // methods
        clone(): AlphaMapFilter;
    }
    /**
     * 将遮罩图像（或画布）中的alpha应用于目标，这样结果的alpha通道将从遮罩中导出，而RGB通道将从目标中复制。例如，这可以用于将alpha掩码应用于显示对象。
     * 这也可以用于将JPG压缩的RGB图像与PNG32 alpha掩码组合，这可以导致比包含RGB的单个PNG32小得多的文件大小。
     */
    class AlphaMaskFilter extends Filter {
        constructor(mask: HTMLImageElement | HTMLCanvasElement);

        // properties

        /**
         * 要用作遮罩的图像（或画布）。
         */
        mask: HTMLImageElement | HTMLCanvasElement;

        // methods
        clone(): AlphaMaskFilter;
    }

    /**
     * 位图表示显示列表中的图像、画布或视频。可以使用现有HTML元素或字符串实例化位图。
     * 
     * 举个栗子
     * ```js
     * var bitmap = new createjs.Bitmap("imagePath.jpg");
     * ```
     * 注意事项：
     * 
     * 1.当使用可能循环或查找的视频源时，请使用{@link VideoBuffer}对象以防止闪烁/闪烁。
     * 
     * 2.当使用的图像或者img标签尚未加载时，在图像加载完成后，stage需要重绘才能显示该图像。
     * 
     * 3.具有SVG源的位图当前不考虑0或1以外的alpha值。要解决此问题，可以缓存位图。
     * 
     * 4.带有SVG源的位图会用跨源数据污染画布，这会阻止交互性。除最近的Firefox版本外，所有浏览器都会出现这种情况。
     * 
     * 5.对于跨源加载的图像，如果使用鼠标交互、使用 getObjectUnderPoint等方法、应用滤镜或者缓存时会抛出cross-origin security报错。
     * 你可以通过在将图像传递给EaselJS之前设置img标签的 crossOrigin 属性来解决这个问题，例如：img.crossOrigin="Anonymous";
     */
    class Bitmap extends DisplayObject {
        /**
         * 要显示的源图像。这可以是CanvasImageSource (image, video, canvas)、具有返回CanvasImageSourcean的getImage方法的对象或图像的字符串URL。
         * 如果是后者，将使用URL作为其src的新图像实例。
         * @param imageOrUrl 
         */
        constructor(imageOrUrl?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | Object | string);

        // properties

        /**
         * 要显示的源图像。这可以是CanvasImageSource（图像、视频、画布）、具有返回CanvasImage源的getImage方法的对象或图像的字符串URL。
         * 如果是后者，将使用URL作为其src的新图像实例。
         */
        image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
        /**
         * 指定要绘制的源图像的区域。如果省略，将绘制整个图像。
         * 
         * 注意：
         * 
         * 1.视频源必须设置宽度/高度才能正确使用sourceRect
         * 
         * 2.缓存对象将忽略sourceRect属性
         */
        sourceRect: Rectangle;

        // methods
        clone(): Bitmap;
    }
    /**
     * BitmapCache类集成了"缓存"对象所需的所有缓存属性和逻辑，它将{@link DisplayObject}对象渲染为位图。
     * 此信息和功能曾经位于DisplayObject中的缓存方法上，但被移动到了BitmapCache类中。
     * 
     * 在这种情况下，缓存纯粹是视觉上的，它会将DisplayObject渲染成一个图像来使用，而不是对象。
     * 实际缓存本身仍然与{@link cacheCanvas}一起存储在目标上。{@link Bitmap}对象执行缓存几乎没有好处，因为它已经是单个图像了。
     * 如果容器包含多个复杂且不经常移动的内容，使用缓存渲染图像将提高整体渲染速度。
     * 缓存不会自动更新，除非调用{@link cache}方法。如果缓存像Stage一样每帧更新一次，则可能无法提高渲染性能。
     * 当对象的内容变化频率很低时（画面长时间静止），最好使用缓存。
     * 
     * 缓存也是应用滤镜的必要条件。当滤镜不改变时，直接使用缓存显示，不需要每帧渲染。
     * BitmapCache还负责对对象应用过滤器，并根据这种关系读取每个{@link Filter}。在处理Context2D画布时，不建议使用实时过滤器。
     * 为了获得最佳性能并仍然允许一些视觉效果，请在可能的情况下使用compositeOperation。
     */
    class BitmapCache {
        constructor();

        // properties
        /** 跟踪缓存已更新的次数，主要用于防止重复的cacheURL。这对于查看缓存是否已更新非常有用。 */
        cacheID: number;

        // methods
        /**
         * 返回围绕所有应用的滤镜的边界，依赖于每个滤镜来描述它如何更改边界。
         * @param target 要检查其滤镜边界的对象。
         * @param output 可选参数，如果提供，则计算的边界将应用于该对象。
         */
        static getFilterBounds(target: DisplayObject, output?: Rectangle): Rectangle;
        /**
         * 返回此对象的字符串表示形式。
         */
        toString(): string;
        /**
         * 实际上创建了正确的缓存表面和与之相关的属性。缓存函数和这个类描述讨论了{@link cache}及其好处。以下是如何使用options对象的详细细节。
         * 
         * 1.如果options.useGL设置为"new"，则会创建一个StageGL并将其包含在其中，以便在渲染缓存时使用。
         * 
         * 2.如果options.useGL设置为"stage"，如果当前stage是StageGL，则将使用它。如果没有，它将默认为"new"。
         * 
         * 3.如果options.useGL是StageGL实例，它不会创建一个实例，而是使用提供的实例。
         * 
         * 4.如果options.useGL为undefined，将执行上下文2D缓存。
         * 
         * 这意味着您可以使用StageGL和2D的任何组合，其中一个、两个或两个阶段和缓存都是WebGL。在StageGL显示列表中使用"new"是非常不受欢迎的，但仍然是一种选择。
         * 由于负面性能原因和上述类别复杂性中提到的图像加载限制，应避免使用。
         * 
         * 当"options.useGL"设置为目标和WebGL的父阶段时，通过使用"RenderTextures"而不是画布元素来提高性能。这些是存储在GPU中的图形卡上的内部纹理。
         * 因为它们不再是画布，所以无法执行常规画布所能执行的操作。这样做的好处是避免了将纹理从GPU来回复制到Canvas元素的速度减慢。这意味着"阶段"是可用的推荐选项。
         * 
         * StageGL缓存不会推断绘制StageGL当前无法绘制的对象的能力，即在缓存形状、文本等时不要使用WebGL上下文缓存。
         * 
         * 具有2D上下文的WebGL缓存
         * ```js
         * var stage = new createjs.Stage();
         * var bmp = new createjs.Bitmap(src);
         * bmp.cache(0, 0, bmp.width, bmp.height, 1, {gl: "new"});          // no StageGL to use, so make one
         * 
         * var shape = new createjs.Shape();
         * shape.graphics.clear().fill("red").drawRect(0,0,20,20);
         * shape.cache(0, 0, 20, 20, 1);
         * ```
         * 带有WebGL上下文的WebGL缓存
         * ```js
         * var stageGL = new createjs.StageGL();
         * var bmp = new createjs.Bitmap(src);
         * bmp.cache(0, 0, bmp.width, bmp.height, 1, {gl: "stage"});       // use our StageGL to cache
         * 
         * var shape = new createjs.Shape();
         * shape.graphics.clear().fill("red").drawRect(0,0,20,20);
         * shape.cache(0, 0, 20, 20, 1);
         * ```
         * 您可能希望创建自己的StageGL实例来控制诸如透明颜色、透明度、AA等因素。
         * 如果您这样做，则传入一个新实例而不是"true"，库将自动在您的实例上将StageGL/isCacheControlled设置为true。
         * 这将触发它正确运行，而不是假设您的主上下文是WebGL。
         * @param target 
         * @param x 
         * @param y 
         * @param width 缓存区域的宽度。
         * @param height 缓存区域的高度。
         * @param scale 将创建缓存的比例。例如，如果使用myShape.cache（0,0100100.2）缓存矢量形状，则生成的cacheCanvas将为200x200 px。
         * 这样可以更逼真地缩放和旋转缓存的元素。默认值为1。
         * @param {Object} [options=undefined] 为缓存逻辑指定其他参数。
         * @param {undefined|"new"|"stage"|StageGL} [options.useGL=undefined] 选择是使用上下文2D还是WebGL渲染，以及是创建新的舞台实例还是使用现有的舞台实例。
         * 有关使用的详细信息，请参阅上文。
         * @for BitmapCache
         */
        define(target: DisplayObject, x: number, y: number, width: number, height: number, scale?: number, options?:any): void;
        /**
         * 直接通过{@link updateCache}调用，也可以在内部调用。这具有双重责任，即确保表面已准备好绘制，并执行绘制。
         * 有关每种行为的完整详细信息，请分别检查受保护的函数{@link _updateSurface}和{@link _drawToCache}。
         * @param compositeOperation 
         */
        update(compositeOperation?: string): void;
        /**
         * 重置并释放与此缓存关联的所有属性和内存。
         */
        release(): void;
        /**
         * 返回缓存的数据URL，如果未缓存此显示对象，则返回null。使用cacheID确保在缓存未更改的情况下不会生成新的数据URL。
         * @returns {string} 缓存的图像数据url。
         */
        getCacheDataURL(): string;
        /**
         * 使用context2D绘图命令显示正在使用的缓存画布。
         * @param ctx 绘制的画布上下文。
         * @returns {boolean} 绘制是否成功
         */
        draw(ctx: CanvasRenderingContext2D): boolean;
    }
    /**
     * 对位图使用九宫格缩放。
     * 
     * 案例：
     * ```js
     * var sb = new createjs.ScaleBitmap(image, new createjs.Rectangle(12, 12, 5, 10));
     * sb.setDrawSize(200, 300);
     * stage.addChild(sb);
     * ```
     */
    class ScaleBitmap extends DisplayObject {
        /**
         * 
         * @param imageOrUrl 源图或者链接地址
         * @param scale9Grid 指定九区域缩放网格的内部矩形
         */
        constructor(imageOrUrl: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | Object | string, scale9Grid: Rectangle);

        // properties

        /** 用来渲染的图像。可以是Image，或者Canvas，又或者Video */
        image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
        /** 源图的裁剪区域 */
        sourceRect: Rectangle;
        /** 绘制宽度 */
        drawWidth: number;
        /** 绘制高度 */
        drawHeight: number;
        /** 指定九区域缩放网格的内部矩形 */
        scale9Grid: Rectangle;
        /** ScaleSpriteSheet是否应在整个像素坐标下绘制到画布 */
        snapToPixel: boolean;

        // methods

        /**
         * 设置用于绘制ScaleSpriteSheet的尺寸
         * @param newWidth 
         * @param newHeight 
         */
        setDrawSize (newWidth: number, newHeight: number): void;
        /**
         * 返回克隆的ScaleBitmap实例。
         */
        clone(): ScaleBitmap;
    }
    /**
     * 使用sprite sheet中定义的位图图示符显示文本。支持使用换行字符的多行文本，但不支持自动换行。
     * 有关定义图示符的详细信息，请参见{@link spriteSheet}属性。
     * 
     * 重要提示： 虽然BitmapText扩展了Container，但它并不是设计为一个容器。因此，addChild和removeChild等方法被禁用。
     */
    class BitmapText extends DisplayObject {
        /**
         * 
         * @param text 要显示的文本。
         * @param spriteSheet 定义字符图示符的精灵表。
         */
        constructor(text?:string, spriteSheet?:SpriteSheet);
        /**
         * BitmapText使用Sprite实例绘制文本。为了减少实例的创建和销毁（从而减少垃圾收集），它维护了一个内部的sprite实例对象池以供重用。
         * 增加此值会导致保留更多精灵，略微增加内存使用，但会减少实例化。
         * @defaultValue 100
         */
        static maxPoolSize: number;

        // properties
        /**
         * 此间距（像素）将添加到输出中的每个字符之后。
         * @defaultValue 0
         */
        letterSpacing: number;
        /**
         * 每行文字的高度。如果为0，则它将使用通过检查"1"、"T"或"L"字符的高度（按此顺序）计算的行高度。
         * 如果这些字符没有定义，它将使用子画面第一帧的高度。
         * @defaultValue 0
         */
        lineHeight: number;
        /**
         * 如果子画面中未定义空格字符，则将插入等于spaceWidth的空像素。
         * 如果为0，则它将使用通过检查"1"、"l"、"E"或"a"字符的宽度（按此顺序）计算的值。
         * 如果这些字符没有定义，它将使用子画面第一帧的宽度。
         * @defaultValue 0
         */
        spaceWidth: number;
        /**
         * 定义此位图文本的字形的SpriteSheet实例。
         * 每个字形/字符都应该在精灵表中定义一个与相应字符同名的单帧动画。
         * 例如，以下动画定义：
         * ```js
         * "A": {frames: [0]}
         * ```
         * 将指示应为"A"字符绘制子画面索引0处的帧。简短的形式也是可以接受的：
         * ```js
         * "A": 0
         * ```
         * 请注意，如果在精灵表中找不到文本中的字符，它也会尝试使用其他大小写（大写或小写）。
         * 
         * 有关定义精灵表数据的详细信息，请参见{@link SpriteSheet}。
         * @defaultValue null
         */
        spriteSheet: SpriteSheet;
        /**
         * 要显示的文本。
         * @defaultValue ""
         */
        text: string;
    }
    /**
     * 将方框模糊应用于context 2D中的DisplayObjects，并将高斯模糊应用于webgl中。请注意，此滤镜相当密集，尤其是当质量设置为高于1时。
     * 
     * 案例：
     * 
     * 此示例创建一个红色圆圈，然后对其应用5像素的模糊。
     * 它使用getBounds方法来解释模糊引起的扩散。
     * ```js
     * var shape = new createjs.Shape().set({x:100,y:100});
     * shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
     * 
     * var blurFilter = new createjs.BlurFilter(5, 5, 1);
     * shape.filters = [blurFilter];
     * var bounds = blurFilter.getBounds();
     * 
     * shape.cache(-50+bounds.x, -50+bounds.y, 100+bounds.width, 100+bounds.height);
     * ```
     * 有关应用滤镜的详细信息，请参阅{@link Filter}。
     */
    class BlurFilter extends Filter {
        /**
         * 
         * @param blurX 水平模糊半径（像素）。
         * @param blurY 垂直模糊半径（像素）。
         * @param quality 模糊迭代次数。
         */
        constructor(blurX?: number, blurY?: number, quality?: number)

        // properties
        /** 以像素为单位的水平模糊半径。 */
        blurX: number
        /** 以像素为单位的垂直模糊半径。 */
        blurY: number
        /**
         * 模糊迭代次数。例如，值为1将产生粗糙模糊。
         * 值为2将产生更平滑的模糊，但运行时间是原来的两倍。
         * @defaultValue 1
         */
        quality: number

        // methods
        clone(): BlurFilter
    }
    /**
     * ButtonHelper是一个帮助类，用于从 MovieClip 或 Sprite 实例创建交互式按钮。
     * 该类将截获对象的鼠标事件，并自动调用 gotoAndStop 或 gotoAndPlay 到相应的动画标签，添加指针光标，并允许用户定义命中状态帧。
     * 
     * ButtonHelper实例不需要加入stage，但应保留引用以防止垃圾收集。
     * 
     * 注意：只有启用了{@link enableMouseOver}，按钮的over状态才会触发。
     * 
     * 案例：
     * ```js
     * 		var helper = new createjs.ButtonHelper(myInstance, "out", "over", "down", false, myInstance, "hit");
     * 		myInstance.addEventListener("click", handleClick);
     * 		function handleClick(event) {
     * 		    // Click Happened.
     * 		}
     * ```
     */
    class ButtonHelper {
        /**
         * 
         * @param target 要管理的实例。
         * @param outLabel 当鼠标指针移出按钮时要跳转到的标签或动画。
         * @param overLabel 当鼠标指针悬浮在按钮时要跳转到的标签或动画。
         * @param downLabel 当鼠标指针在按钮上按下时要跳转到的标签或动画。
         * @param play 当按钮状态改变时，是调用"gotoAndPlay"还是"gotoAndStop"？
         * @param hitArea 一个可选项目，用作按钮的点击区域。如果未对此进行定义，则将使用按钮的可见区域。请注意，hitState可以使用与"target"参数相同的实例。
         * @param hitLabel hitArea实例上定义hitArea边界的标签或动画。如果这是null，那么将使用hitArea的默认状态。*
         */
        constructor(target: Sprite|MovieClip, outLabel?: string, overLabel?: string, downLabel?: string, play?: boolean, hitArea?: DisplayObject, hitLabel?: string);
        //constructor(target: MovieClip, outLabel?: string, overLabel?: string, downLabel?: string, play?: boolean, hitArea?: DisplayObject, hitLabel?: string);

        // properties
        /** 当用户按下目标时显示的标签名称或帧号。默认为"down"。 */
        downLabel: string | number;
        /** 当用户将鼠标悬停在目标上时显示的标签名称或帧号。默认为"out"。 */
        outLabel: string | number;
        /** 当用户将鼠标移出目标时显示的标签名称或帧号。默认为"over"。 */
        overLabel: string | number;
        /** 如果为true，则ButtonHelper将调用gotoAndPlay，如果为false，则将使用gotoAndStop。默认值为false。 */
        play: boolean;
        /** 此按钮助手的目标。 */
        target: MovieClip | Sprite;
        /** 启用或禁用目标上的按钮功能。 */
        enabled: boolean;

        // methods
        /**
         * @deprecated - 使用{@link enabled}属性代替
         */
        setEnabled(value: boolean): void;
        /**
         * @deprecated - 使用{@link enabled}属性代替
         */
        getEnabled(): boolean;
        /**
         * 返回此对象的字符串表示形式。
         * @returns 字符串表示形式。
         */
        toString(): string;
    }
    /**
     * 将颜色变换应用于DisplayObjects。
     * 
     * 案例：
     * 
     * 本例绘制一个红色圆圈，然后将其转换为蓝色。这是通过将所有通道相乘为0（透明度通道除外，透明度通道设置为1），然后将255添加到蓝色通道来实现的。
     * ```js
     * 		var shape = new createjs.Shape().set({x:100,y:100});
     * 		shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
     * 
     * 		shape.filters = [
     * 		    new createjs.ColorFilter(0,0,0,1, 0,0,255,0)
     * 		];
     * 		shape.cache(-50, -50, 100, 100);
     * ```
     * 有关应用滤镜的详细信息，请参见{@link Filter}。
     */
    class ColorFilter extends Filter {
        /**
         * 
         * @param redMultiplier 与红色通道相乘的量。这是一个介于0和1之间的范围。
         * @param greenMultiplier 与绿色通道相乘的量。这是一个介于0和1之间的范围。
         * @param blueMultiplier 与蓝色通道相乘的量。这是一个介于0和1之间的范围。
         * @param alphaMultiplier 与alpha通道相乘的量。这是一个介于0和1之间的范围。
         * @param redOffset 相乘后要添加到红色通道的数量。这是一个介于-255和255之间的范围。
         * @param greenOffset 相乘后要添加到绿色通道的数量。这是一个介于-255和255之间的范围。
         * @param blueOffset 相乘后要添加到蓝色通道的数量。这是一个介于-255和255之间的范围。
         * @param alphaOffset 相乘后要添加到alpha通道的数量。这是一个介于-255和255之间的范围。
         */
        constructor(redMultiplier?: number, greenMultiplier?: number, blueMultiplier?: number, alphaMultiplier?: number, redOffset?: number, greenOffset?: number, blueOffset?: number, alphaOffset?: number);

        // properties
        /** 与红色通道相乘的量。这是一个介于0和1之间的范围。 */
        alphaMultiplier: number;
        /** 相乘后要添加到alpha通道的数量。这是一个介于-255和255之间的范围。 */
        alphaOffset: number;
        /** 与蓝色通道相乘的量。这是一个介于0和1之间的范围。 */
        blueMultiplier: number;
        /** 相乘后要添加到蓝色通道的数量。这是一个介于-255和255之间的范围。 */
        blueOffset: number;
        /** 与绿色通道相乘的量。这是一个介于0和1之间的范围。 */
        greenMultiplier: number;
        /** 相乘后要添加到绿色通道的数量。这是一个介于-255和255之间的范围。 */
        greenOffset: number;
        /** 与红色通道相乘的量。这是一个介于0和1之间的范围。 */
        redMultiplier: number;
        /** 相乘后要添加到红色通道的数量。这是一个介于-255和255之间的范围。 */
        redOffset: number;

        // methods
        clone(): ColorFilter;
    }
    /**
     * 提供用于组合矩阵以与ColorMatrixFilter一起使用的辅助函数。大多数方法都返回实例以方便链式调用。
     * 
     * 案例：
     * ```js

     * 		myColorMatrix.adjustHue(20).adjustBrightness(50);
     * ```
     * 有关如何应用滤镜的示例，请参见{@link Filter}，或有关如何使用ColorMatrix更改DisplayObject颜色的示例，参见{@link ColorMatrixFilter}。
     */
    class ColorMatrix {
        constructor(brightness?: number, contrast?: number, saturation?: number, hue?: number);

        // methods
        /**
         * 通过将指定值添加到红色、绿色和蓝色通道来调整像素颜色的亮度。正值会使图像更亮，负值会使其更暗。
         * @param value 介于-255和255之间的值，该值将添加到RGB通道中。
         * @returns 返回该方法的ColorMatrix实例（适用于链式调用）
         */
        adjustBrightness(value: number): ColorMatrix;
        /**
         * 调整亮度、对比度、饱和度和色相的快捷方式。
         * 相当于按顺序调用adjustHue（色相）、adjustContrast（对比度）、adjustBrightness（亮度）、adjutoSaturation（饱和度）。
         * @param brightness 
         * @param contrast 
         * @param saturation 
         * @param hue 
         * @returns 返回该方法的ColorMatrix实例（适用于链式调用）
         */
        adjustColor(brightness: number, contrast: number, saturation: number, hue: number): ColorMatrix;
        /**
         * 调整像素颜色的对比度。正值将增加对比度，负值将降低对比度。
         * @param value 介于-100和100之间的值。
         * @returns 返回该方法的ColorMatrix实例（适用于链式调用）
         */
        adjustContrast(value: number): ColorMatrix;
        /**
         * 调整像素颜色的色调。
         * @param value 介于-180和180之间的值。
         * @returns 返回该方法的ColorMatrix实例（适用于链式调用）
         */
        adjustHue(value: number): ColorMatrix;
        /**
         * 调整像素颜色的饱和度。正值将增加饱和度，负值将降低饱和度（趋向灰度）。
         * @param value 介于-100和100之间的值。
         * @returns 返回该方法的ColorMatrix实例（适用于链式调用）
         */
        adjustSaturation(value: number): ColorMatrix;
        /**
         * 返回此ColorMatrix实例的克隆。
         */
        clone(): ColorMatrix;
        /**
         * danzen新增的声明，目前还不支持，请勿使用
         * @param ...matrix 
         */
        concat(...matrix: number[]): ColorMatrix;
        /**
         * 将指定的矩阵与此矩阵连接（相乘）。
         * @param matrix 
         */
        concat(matrix: ColorMatrix): ColorMatrix;
        /**
         * danzen新增的声明，目前还不支持，请勿使用
         * @param ...matrix 
         */
        copy(...matrix: number[]): ColorMatrix;
        /**
         * 将指定矩阵的值复制到此矩阵。
         * @param matrix 
         */
        copy(matrix: ColorMatrix): ColorMatrix;
        /**
         * 将矩阵重置为单位值。
         */
        reset(): ColorMatrix;
        /**
         * 使用指定的值重置实例。
         * @param brightness 
         * @param contrast 
         * @param saturation 
         * @param hue 
         */
        setColor( brightness: number, contrast: number, saturation: number, hue: number ): ColorMatrix;
        toArray(): number[];
        toString(): string;
    }
    /**
     * 允许您执行复杂的颜色操作，如修改饱和度、亮度或反转。
     * 有关更改颜色的详细信息，请参见{@link ColorMatrix}。
     * 为了更容易地进行颜色变换，请考虑{@link ColorFilter}。
     * 
     * 案例：
     * 
     * 此示例创建一个红色圆圈，反转其色调，然后使其饱和以使其变亮。
     * ```js
     * var shape = new createjs.Shape().set({x:100,y:100});
     * shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
     * 
     * var matrix = new createjs.ColorMatrix().adjustHue(180).adjustSaturation(100);
     * shape.filters = [
     *     new createjs.ColorMatrixFilter(matrix)
     * ];
     * 
     * shape.cache(-50, -50, 100, 100);
     * ```
     * 有关应用滤镜的详细信息，请参{@link Filter}。
     */
    class ColorMatrixFilter extends Filter {
        constructor(matrix: number[] | ColorMatrix);

        // properties
        /** 描述要执行的颜色操作的4x5矩阵。另请参阅ColorMatrix类。 */
        matrix: number[] | ColorMatrix;

        // methods
        clone(): ColorMatrixFilter;
    }
    /**
     * Container是一个可嵌套的显示列表，允许您使用复合显示元素。
     * 例如，可以将手臂、腿、躯干和头部位图实例组合到一个"人物容器"中，并将它们变换为一个组，同时仍然可以相对移动各个部分。
     * 容器的子级具有与其父级Container连接的transform和alpha属性。
     * 例如，放置在x=50且阿尔法=0.7的Container中的x=100且阿尔法=0.5的Shape将在x=150且阿尔法=0.35处渲染到画布上。
     * 容器有一些开销，所以通常不应该创建一个容器来容纳一个子容器。
     * 
     * 案例：
     * ```js
     * var container = new createjs.Container();
     * container.addChild(bitmapInstance, shapeInstance);
     * container.x = 100;
     * ```
     */
    class Container extends DisplayObject {
        constructor();

        // properties
        /** 显示列表中的子项数组。您通常应该使用子管理方法，如addChild、removeChild、swapChildren等，而不是直接访问它，但它是为高级用途而包含的。 */
        children: DisplayObject[];
        /** 指示是否独立启用此容器的子级以进行鼠标/指针交互。如果为false，子级将聚合在容器下——例如，单击子级形状将触发容器上的单击事件。说白了就是容器内子级是否可以接收鼠标/指针交互。 */
        mouseChildren: boolean;
        /** 返回容器中的子级数。 */
        numChildren: number;
        /** 如果为false，则tick将不会传播到此容器的子级。
         * 这可以提供一些性能优势。除了阻止"tick"事件被调度外，它还将阻止某些显示对象上与tick相关的更新（例如Sprite&MovieClip帧前进、DOMElement可见性处理）。
         * @default true
         */
        tickChildren: boolean;

        // methods
        addChild<T extends DisplayObject>(child: T): T;
        addChild<T extends DisplayObject>(child0: DisplayObject, lastChild: T): T;
        addChild<T extends DisplayObject>(child0: DisplayObject, child1: DisplayObject, lastChild: T): T;
        addChild<T extends DisplayObject>(child0: DisplayObject, child1: DisplayObject, child2: DisplayObject, lastChild: T): T;
        addChild(...children: DisplayObject[]): DisplayObject;
        addChildAt<T extends DisplayObject>(child: T, index: number): T;
        addChildAt<T extends DisplayObject>(child0: DisplayObject, lastChild: T, index: number): T;
        addChildAt<T extends DisplayObject>(child0: DisplayObject, child1: DisplayObject, lastChild: T, index: number): T;
        addChildAt(...childOrIndex: (DisplayObject|number)[]): DisplayObject; // actually (...child: DisplayObject[], index: number)

        clone(recursive?: boolean): Container;
        /**
         * 如果指定的显示对象是此容器或是此容器的后代（子、孙等），则返回true。
         * @param child 要检查的显示对象。
         * @returns 如果指定的显示对象是此容器或其子级之一，则返回true。
         */
        contains(child: DisplayObject): boolean;
        /**
         * 返回指定索引处的子显示对象。如果索引超出范围，则返回null。
         * 
         * 案例：
         * ```js
         * container.getChildAt(2);
         * ```
         * @param index 要返回的子显示对象的索引。
         * @returns 指定索引处的子显示对象。如果索引超出范围，则返回null。
         */
        getChildAt(index: number): DisplayObject;
        /**
         * 返回具有指定名称的首个子显示对象。
         * @param name 要查找的显示对象的名称。
         * @returns 具有指定名称的首个子显示对象。
         */
        getChildByName(name: string): DisplayObject;
        /**
         * 返回显示列表中指定子显示对象的索引，如果不在显示列表中，则返回-1。
         * 
         * 案例：
         * ```js
         * var index = container.getChildIndex(child);
         * ```
         * @param child 要检查的显示对象。
         * @returns 显示列表中指定子显示对象的索引，如果不在显示列表中，则返回-1。
         */
        getChildIndex(child: DisplayObject): number;
        /**
         * @deprecated - 使用{@link numChildren}属性代替。
         */
        getNumChildren(): number;
        /**
         * 返回此容器显示列表中指定坐标下的所有显示对象的数组。此程序忽略任何将{@link mouseEnabled}设置为false的显示对象。
         * 数组将按视觉深度顺序排序，最顶部的显示对象位于索引0处。这使用基于形状的碰撞检测，并且运行起来可能是一项消耗性能的操作，因此最好谨慎使用。
         * 例如，如果测试鼠标下的对象，请在tick（而不是{@link stagemousemove}）上进行测试，并且仅当鼠标的位置发生变化时才进行测试。
         * @param x 
         * @param y 
         * @param mode 
         */
        getObjectsUnderPoint(x: number, y: number, mode: number): DisplayObject[];
        /**
         * 与getObjectsUnderPoint功能相似，但仅返回最上层的显示对象。该方法执行效率比getObjectsUnderPoint高。但性能开销仍然不少，详情查看getObjectsUnderPoint的注释。
         * @param x 
         * @param y 
         * @param mode 匹配模式，0为所有、1为启用鼠标交互的、2为启用鼠标交互且不透明的对象。
         */
        getObjectUnderPoint(x: number, y: number, mode: number): DisplayObject;
        /**
         * 从显示列表中删除所有子项。
         * 
         * 案例：
         * ```js
         * container.removeAllChildren();
         * ```
         */
        removeAllChildren(): void;
        /**
         * 从显示列表中删除指定的子项。请注意，如果索引已知，使用removeChildAt()会更快。
         * @param child 要删除的子显示对象。
         * @returns 如果成功删除了子显示对象，则返回true。
         */
        removeChild(...child: DisplayObject[]): boolean;
        /**
         * 从显示列表中删除指定索引处的子项，并将其父项设置为null。如果索引未知，请使用removeChild()。
         * 
         * 案例：
         * ```js
         * container.removeChildAt(2);
         * ```
         * 您还可以删除多个子项：
         * 
         * 案例：
         * ```js
         * container.removeChild(2, 7, ...)
         * ```
         * 如果子项（或多个子项）被删除，则返回true，如果任何索引超出范围，则返回false。
         * @param index 要删除的子显示对象的索引。
         * @returns 如果成功删除了子显示对象，则返回true。
         */
        removeChildAt(...index: number[]): boolean;
        /**
         * 更改指定子对象的深度。如果子对象不是此容器的子对象，或者索引超出范围，则会自动失败。
         * @param child 要更改的子显示对象。
         * @param index 要更改的子显示对象的索引。
         */
        setChildIndex(child: DisplayObject, index: number): void;
        /**
         * 对子列表执行数组排序操作。
         * @param sortFunction 用于对子列表进行排序的函数。有关详细信息，请参阅JavaScript的Array.sort文档。
         */
        sortChildren(sortFunction: (a: DisplayObject, b: DisplayObject) => number): void;
        /**
         * 交换显示列表中指定的子项深度。如果任一子节点不是此容器的子节点，则会自动失败。
         * @param child1 
         * @param child2 
         */
        swapChildren(child1: DisplayObject, child2: DisplayObject): void;
        /**
         * 在指定的索引处交换子项。如果任一索引超出范围，则自动失败。
         * @param index1 
         * @param index2 
         */
        swapChildrenAt(index1: number, index2: number): void;
    }
    /**
     * DisplayObject是一个抽象类，不能直接构建的。子类可以构建，如Container、Bitmap和Shape。
     * 
     * DisplayObject是EaselJS库中所有显示类的基类。
     * 
     * 它定义了所有显示对象之间共享的核心属性和方法，如转换属性（x、y、scaleX、scaleY等）、缓存和鼠标处理程序。
     */
    class DisplayObject extends EventDispatcher {
        constructor();

        // properties
        /** 此显示对象的alpha（透明度）。0是完全透明的，1是完全不透明的。 */
        alpha: number;
        /** 如果已创建缓存，则返回管理cacheCanvas及其属性的类。有关更多信息，请参阅BitmapCache。使用此选项可以控制、检查和更改缓存。在特殊情况下，这可能是修改后的或子类化的BitmapCache。 */
        bitmapCache: BitmapCache;
        /** 如果缓存处于活动状态，则返回包含此显示对象图像的画布。有关详细信息，请参阅缓存。使用此选项显示缓存的结果。这将是一个HTMLCanvasElement，除非为此缓存特意启用了特殊的缓存规则。 */
        cacheCanvas: HTMLCanvasElement | Object;
        /** 返回唯一标识此显示对象的当前缓存的ID号。这可用于确定自上次检查以来缓存是否已更改。 */
        cacheID: number;
        /** 复合操作指示此显示对象的像素将如何与其后面的元素复合。如果为null，则此属性将从父容器继承。有关更多信息，请阅读关于合成的whatwg规范。有关支持的compositeOperation值的列表，请访问W3C关于Compositing and Blending的草案。 */
        compositeOperation: string;
        /** 当用户将鼠标悬停在此显示对象上时,将显示相应的鼠标指针样式（例如"指针"、"帮助"、"文本"等），这类似与CSS的cursor */
        cursor: string;
        /** 应用于此显示对象的滤镜对象数组。当显示对象上调用Cache或UpdateCache时滤镜将应用或者更新，并且仅应用于缓存的区域。 */
        filters: Filter[];
        /**
         * 在检查鼠标交互或调用getObjectsUnderPoint时，将会对hitArea指定的显示对象进行碰撞检测。将对hitArea对象相对于此显示对象的坐标空间应用其变换（就像hitArea对象是此显示对象及其regX/Y的子对象一样）。hitArea将仅使用其自己的alpha值进行碰撞检测，而不管目标显示对象上的alpha值或目标的祖先（父级）。
         * 
         * 如果在容器上设置，容器的子对象将不会收到鼠标事件。这类似于将MouseChildren设置为false。
         * 
         * 请注意，当前基类的hitTest()方法不使用hitArea，Stage也不支持hitArea。
         */
        hitArea: DisplayObject;
        /** 此显示对象的唯一ID。方便扩展其他用途用途。 */
        id: number;
        /** 为该显示对象定义矢量遮罩（剪裁路径）的Shape实例。形状的变换将相对于显示对象的父坐标应用（就像它是父坐标的子坐标一样）。 */
        mask: Shape;
        /** 
         * 指示在运行鼠标交互时是否包含此对象。将容器的子级设置为false将导致单击该子级时容器上的事件不会触发。将此属性设置为false不会阻止getObjectsUnderPoint方法返回子对象。
         * 注意：在EaselJS 0.7.0中，mouseEnabled属性在嵌套容器中无法正常工作。请查看GitHub上的最新NEXT版本，以获取已解决此问题的更新版本。该修复程序将在EaselJS的下一个版本中提供。
         */
        mouseEnabled: boolean;
        /** 此显示对象的可选名称。包含在toString中。可用于调试。 */
        name: string;
        /** 对包含此显示对象的Container或Stage对象的引用，如果尚未添加到其中，则为null。 */
        parent: Container;
        /** 此显示对象的注册点的左偏移量。例如，要使100x100px位图围绕其中心旋转，您可以将regX和regY设置为50。缓存对象的注册点应根据预缓存条件设置，而不是缓存大小。 */
        regX: number;
        /** 此显示对象的注册点的y偏移。例如，要使100x100px位图围绕其中心旋转，您可以将regX和regY设置为50。缓存对象的注册点应根据预缓存条件设置，而不是缓存大小。 */
        regY: number;
        /** 此显示对象的旋转度。 */
        rotation: number;
        /** 水平拉伸此显示对象的因素。例如，将scaleX设置为2会将显示对象拉伸到其标称宽度的两倍。要水平翻转对象，请将比例设置为负数。 */
        scaleX: number;
        /** 垂直拉伸此显示对象的因素。例如，将scaleY设置为0.5会将显示对象拉伸到其标称高度的一半。要垂直翻转对象，请将比例设置为负数。 */
        scaleY: number;
        /** 将scaleX和scaleY属性设置为相同的值。请注意，当您获得该值时，如果scaleX和scaleY是不同的值，它将只返回scaleX。 */
        scale: number;
        /** 定义要在此显示对象上渲染的阴影的阴影对象。设置为null以删除阴影。如果为null，则此属性从父容器继承。 */
        shadow: Shadow;
        /** 水平倾斜此显示对象的因素。 */
        skewX: number;
        /** 垂直倾斜此显示对象的因素。 */
        skewY: number;
        /** 指示当snapToPixelEnabled为true时，是否应将显示对象绘制为整个像素。要启用/禁用对整个类别的显示对象的捕捉，请在原型上设置此值（例如Text.prototype.snapToPixel=true）。 */
        snapToPixel: boolean;
        /** 返回此显示对象将在其上呈现的Stage实例，如果尚未将其添加到Stage实例中，则返回null。 */
        stage: Stage;
        /** 抑制在跨域内容中使用hitTest、鼠标事件和GetObjectsUnderPoint等功能时生成的错误。 */
        static suppressCrossDomainErrors: boolean;
        /** 如果为false，则tick时钟将不会作用在此显示对象（或其子对象）上运行。这可以提供一些性能优势。除了阻止"tick"事件被分派外，它还将阻止某些显示对象上与tick相关的更新（例如Sprite和MovieClip帧前进，以及DOMElement显示属性）。 */
        tickEnabled: boolean;
        /** 如果非null，则定义此显示对象的变换矩阵，覆盖所有其他变换属性(x, y, rotation, scale, skew)。 */
        transformMatrix: Matrix2D;
        /** 指示是否应将此显示对象绘制到画布上，并在运行Stage.getObjectsUnderPoint方法时将其包含在内。 */
        visible: boolean;
        /** 显示对象相对于其父对象的x（水平）位置 */
        x: number;
        /** 显示对象相对于其父对象的y（垂直）位置 */
        y: number;

        // methods
        /**
         * 
         * @param evtObj 一个将被分派给所有Ticker监听器的事件对象。此对象在调度员之间重复使用，以降低构建和GC成本。
         */
        protected _tick(evtObj?: Object): void;
        /** 
         * 将显示对象绘制到新元素中，然后用于后续绘制。适用于不经常更改的复杂内容（例如，具有许多不移动的子项的容器，或复杂的矢量形状），
         * 这可以提供更快的渲染，因为内容不需要在每帧中重新渲染。缓存的显示对象可以自由移动、旋转、褪色等，但如果其内容发生变化，则必须再次调用updateCache()手动更新缓存。
         * 您必须通过x、y、w和h参数指定缓存区域。这定义了将使用此显示对象的坐标渲染和缓存的矩形。
         * 
         * 演示案例
         * 例如你定义了一个圆形半径为25像素，坐标为(0, 0)：
         * 
         * 		var shape = new createjs.Shape();
         * 		shape.graphics.beginFill("#ff0000").drawCircle(0, 0, 25);
         * 		shape.cache(-25, -25, 50, 50);
         * 
         * 请注意，滤镜需要在应用缓存之前声明，否则您必须要在应用滤镜之后调用updateCache。查看Filter类以获取更多信息。某些滤镜（例如BlurFilter）可能无法与scale参数一起按预期工作。
         * 通常，生成的cacheCanvas宽度和高度都应用了scale，但是一些过滤器（例如BlurFilter）会增加一些填充，这些填充可能不在缓存的区域。
         * 在以前的版本中，缓存是在DisplayObject上处理的，但后来被转移到了BitmapCache。这允许更容易的交互和替代缓存方法，如WebGL和StageGL。
         * 有关选项对象的更多信息，请参阅BitmapCache定义。
         * 
         * @param x 缓存区域的x坐标原点。
         * @param y 缓存区域的y坐标原点。
         * @param width 缓存区域的宽度。
         * @param height 缓存区域的高度。
         * @param scale 缓存内容的缩放。例如，如果使用myShape.cache(0,0,100,100,2)缓存矢量形状，则生成的cacheCanvas将为200x200像素。这使您能够以更高的保真度缩放和旋转缓存元素。默认值为1。
         */
        cache(x: number, y: number, width: number, height: number, scale?: number): void;
        /**
         * 返回此DisplayObject的克隆。克隆体的某些属性将恢复为默认值（例如.parent）。缓存不会跨克隆进行维护，某些元素会通过引用进行复制（遮罩、单个滤镜实例、hit area）。
         * @returns {DisplayObject} 当前DisplayObject实例的克隆。
         */
        clone(): DisplayObject;
        /**
         * 将显示对象绘制到指定的上下文中，忽略其可见、alpha、投影和变换。如果处理了绘图，则返回true（对于覆盖功能很有用）。
         * 
         * 注意：此方法主要用于内部使用，但可能对高级用途有用。
         * @param ctx 要绘制的画布2D上下文对象。
         * @param ignoreCache 指示绘图操作是否应忽略任何当前缓存。例如，用于绘制缓存（以防止它简单地将现有缓存绘制回自身）。
         */
        draw(ctx: CanvasRenderingContext2D, ignoreCache?: boolean): boolean;
        /**
         * 返回一个矩形，该矩形表示该对象在其局部坐标系中的边界（即无变换）。已缓存的对象将返回缓存的边界。
         * 
         * 并非所有显示对象都可以计算自己的边界（例如形状）。对于这些对象，可以使用 setBounds，以便在计算容器边界时包含它们。
         * 
         * |对象|说明|
         * | :--- | :--- |
         * |All|所有显示对象都支持使用setBounds()手动设置边界。同样，使用cache()缓存的显示对象将返回其缓存的边界。手动和缓存边界将覆盖下面列出的自动计算。|
         * |Bitmap|返回Bitmap/sourceRect（如果指定）或图像的宽度和高度，从（x=0，y=0）开始延伸。|
         * |Sprite|返回当前帧的边界。如果在spritesheet数据中指定了帧注册点，则x/y可能为非零。另请参见getFrameBounds|
         * |Container|返回从getBounds()返回非空值的所有子级的聚合（组合）边界。|
         * |Shape|当前不支持自动边界计算。使用setBounds()手动定义边界。|
         * |Text|返回近似边界。水平值（x/宽度）非常准确，但垂直值（y/高度）则不准确，尤其是在使用textBaseline值而不是"top"时。|
         * |BitmapText|返回近似边界。如果spritesheet帧注册点接近（x=0，y=0），则值将更准确。|
         * 
         * 对于某些对象（例如文本或具有许多子对象的容器），计算边界可能很消耗性能，每次调用getBounds（）时都会重新计算边界。通过显式设置边界，可以防止对静态对象进行重新计算：
         * ```js
         * var bounds = obj.getBounds();
         * obj.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
         * // getBounds will now use the set values, instead of recalculating
         * ```
         * 为了减少内存影响，返回的Rectangle实例可以在内部重用；克隆实例或复制其值（如果需要保留）。
         * ```js
         * var myBounds = obj.getBounds().clone();
         * // OR:
         * myRect.copy(obj.getBounds());
         * ```
         * @returns {Rectangle} 显示对象的矩形边界，如果此对象没有边界，则为null。
         */
        getBounds(): Rectangle;
        /**
         * 返回缓存的数据URL，如果未缓存此显示对象，则返回null。仅当缓存已更改时生成，否则返回最后一个结果。
         * 
         * @returns {string} 缓存的图像数据url。
         */
        getCacheDataURL(): string;
        /**
         * 生成一个DisplayProps对象，表示对象及其所有父容器的组合显示属性，直到最高级别的祖先（通常是Stage）。
         * @param props 一个DisplayProps对象，用于填充计算值。如果为null，则返回一个新的DisplayProps对象。
         * @returns {DisplayProps} 包含显示属性的DisplayProps对象。
         */
        getConcatenatedDisplayProps(props?: DisplayProps): DisplayProps;
        /**
         * 生成一个Matrix2D对象，表示显示对象及其所有父容器到最高级别祖先（通常是Stage）的组合变换。这可用于在坐标空间之间转换位置，例如使用localToGlobal和globalToLocal。
         * @param mtx 用计算值填充的Matrix2D对象。如果为null，则返回一个新的Matrix2D对象。
         */
        getConcatenatedMatrix(mtx?: Matrix2D): Matrix2D;
        /**
         * 基于此对象的当前变换返回一个矩阵。
         * @param matrix 可选。用计算值填充的Matrix2D对象。如果为null，则返回一个新的Matrix对象。
         * @returns {Matrix2D} 表示此显示对象变换的矩阵。
         */
        getMatrix(matrix?: Matrix2D): Matrix2D;
        /**
         * @deprecated
         * 请改用stage属性。
         */
        getStage(): Stage;
        /**
         * 返回一个矩形，表示该对象在其父坐标系中的边界（即应用了变换）。已缓存的对象将返回缓存的转换边界。
         * 
         * 并非所有显示对象都可以计算自己的边界（例如Shape）。对于这些对象，可以使用setBounds，以便在计算容器边界时包含它们。
         * 
         * 为了减少内存影响，返回的Rectangle实例可以在内部重用；克隆实例或复制其值（如果需要保留）。
         * 
         * 容器实例计算所有通过getBounds返回边界的子级的聚合边界。
         * @returns {Rectangle} 表示边界的Rectangle实例，如果此对象没有边界，则为null。
         */
        getTransformedBounds(): Rectangle;
        /**
         * 将指定的x和y位置从全局（舞台）坐标空间转换到显示对象的坐标空间。例如，这可用于确定显示对象内的当前鼠标位置。返回一个Point实例，其x和y属性与显示对象坐标空间中的变换位置相关。
         * 
         * 案例
         * 
         * 		displayObject.x = 300;
         * 		displayObject.y = 200;
         * 		stage.addChild(displayObject);
         * 		var point = displayObject.globalToLocal(100, 100);
         * 		// Results in x=-200, y=-100
         * 
         * @param x 要变换的舞台上的x位置。
         * @param y 舞台上的y位置要变换。
         * @param pt 将结果复制到其中的对象。如果省略，将返回一个具有x/y属性的新Point对象。
         */
        globalToLocal(x: number, y: number, pt?: Point | Object): Point;
        /**
         * 检测显示对象是否与本地坐标中的指定点相交（即在指定位置绘制一个alpha>0的像素）。这将忽略显示对象的alpha、shadow、hitArea、mask和compositeOperation。
         * 
         * 案例
         * 
         * 		stage.addEventListener("stagemousedown", handleMouseDown);
         * 		function handleMouseDown(event) {
         * 			var hit = myShape.hitTest(event.stageX, event.stageY);
         * 		}
         * 
         * 请注意，EaselJS目前不支持形状到形状的碰撞。
         * @param x 
         * @param y 
         */
        hitTest(x: number, y: number): boolean;
        /**
         * 返回true或false，指示如果绘制到画布上，显示对象是否可见。这并不能说明它是否在舞台边界内可见。
         * 
         * 注意：此方法主要用于内部使用，但可能对高级用途有用。
         * 
         * @returns {boolean} 布尔值，指示如果绘制到画布上，显示对象是否可见。
         */
        protected isVisible(): boolean;
        /**
         * 将指定的x和y位置从显示对象的本地坐标空间转换到全局（舞台）坐标空间。
         * 
         * 例如，这可用于将HTML标签定位在嵌套显示对象上的特定点上。返回一个Point实例，其x和y属性与舞台上的变换坐标相关。
         * 
         * 注意：如果舞台有设置缩放的话，需要自己计算缩放。例如返回的Point实例是p，则实际的坐标是(p.x/stage.scaleX,p.y/stage.scaleY)。
         * @param x 
         * @param y 
         * @param pt 
         */
        localToGlobal(x: number, y: number, pt?: Point | Object): Point;
        /**
         * 将指定的x和y位置从该显示对象的坐标空间转换到目标显示对象的坐标空间。返回一个Point实例，其x和y属性与目标坐标空间中的变换位置相关。与使用以下代码处理localToGlobal和globalToLocal的效果相同。
         * 
         * 		var pt = this.localToGlobal(x, y);
         * 		pt = target.globalToLocal(pt.x, pt.y);
         * 
         * @param x 
         * @param y 
         * @param target 
         * @param pt 
         */
        localToLocal(x: number, y: number, target: DisplayObject, pt?: Point | Object): Point;
        /**
         * 提供一种可链接的快捷方式，用于在实例上设置多个属性。
         * 
         * 案例：
         * ```js
         * var myGraphics = new createjs.Graphics().beginFill("#ff0000").drawCircle(0, 0, 25);
         * var shape = stage.addChild(new Shape()).set({graphics:myGraphics, x:100, y:100, alpha:0.5});
         * ```
         * @param props 一个包含要复制到DisplayObject实例的属性的通用对象。
         * @returns {DisplayObject} 返回方法被调用的实例（对于链式调用很有用）。
         */
        set(props: Object): DisplayObject;
        /**
         * 允许您手动设置对象的边界，这些对象要么无法计算自己的边界（例如，形状和文本）以供将来引用，要么可以将对象包含在容器边界中。
         * 手动设置的边界将始终覆盖计算的边界。边界应该在对象的局部（未转换的）坐标中指定。例如，一个以(0,0)为中心的半径为25px的圆的Shape实例的边界为(-25，-25，50，50)。
         * @param x 
         * @param y 
         * @param width 
         * @param height 
         */
        setBounds(x: number, y: number, width: number, height: number): void;
        /**
         * 用于快速设置显示对象上的变换属性。所有参数都是可选的。省略的参数将设置默认值。
         * @param x 
         * @param y 
         * @param scaleX 
         * @param scaleY 
         * @param rotation 旋转，单位为度，默认为0度。
         * @param skewX 水平倾斜系数
         * @param skewY 垂直倾斜系数
         * @param regX 水平注册点
         * @param regY 垂直注册点
         * @returns {DisplayObject} 当前DisplayObject实例的克隆。
         */
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): DisplayObject;
        /**
         * 清除当前的缓存。详情请查看cache。
         */
        uncache(): void;
        /**
         * 更新显示对象缓存，在没有激活缓存的情况下，调用updateCache将抛出错误。如果compositeOperation为空，则在绘图之前将清除当前缓存。
         * @param compositeOperation 合成操作。
         */
        updateCache(compositeOperation?: string): void;
        /**
         * 将此显示对象的变换、alpha、globalCompositeOperation、剪裁路径（遮罩）和阴影应用于指定的上下文。这通常称为绘制前。
         * @param ctx {CanvasRenderingContext2D} The canvas 2D to update.
         */
        updateContext(ctx: CanvasRenderingContext2D): void;
    }
    /**
     * 用于计算和封装与显示相关的属性。
     */
    class DisplayProps {
        constructor(visible?: number, alpha?: number, shadow?: number, compositeOperation?: number, matrix?: number);

        // properties
        /** 表示将应用于显示对象的alpha的属性。 */
        alpha: number;
        /**
         * 表示将应用于显示对象的compositeOperation的属性。
         * 您可以在以下位置找到有效的复合操作列表：https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing
         */
        compositeOperation: string;
        /**
         * 将应用于显示对象的变换矩阵。
         */
        matrix: Matrix2D;
        /** 表示将应用于显示对象的投影的属性。 */
        shadow: Shadow;
        /** 表示将应用于显示对象的可见值的属性。 */
        visible: boolean;

        // methods

        /**
         * 附加指定的显示属性。这通常用于应用子属性及其父属性。
         * @param visible 
         * @param alpha 
         * @param shadow 
         * @param compositeOperation 
         * @param matrix 变换矩阵。默认为单位矩阵。
         */
        append(visible: boolean, alpha: number, shadow: Shadow, compositeOperation: string, matrix?: Matrix2D): DisplayProps;
        /**
         * 返回DisplayProps实例的克隆。克隆相关矩阵。
         */
        clone(): DisplayProps;
        /**
         * 将此实例及其矩阵重置为默认值。
         */
        identity(): DisplayProps;
        /**
         * 前置指定的显示属性。这通常用于将父属性应用于子属性。例如，要获取将应用于子对象的组合显示属性。
         * @param visible 
         * @param alpha 
         * @param shadow 
         * @param compositeOperation 
         * @param matrix 变换矩阵。默认为单位矩阵。
         */
        prepend(visible: boolean, alpha: number, shadow: Shadow, compositeOperation: string, matrix?: Matrix2D): DisplayProps;
        /**
         * 使用指定的值重新初始化实例。
         * @param visible 
         * @param alpha 
         * @param shadow 
         * @param compositeOperation 合成。
         * @param matrix 变换矩阵。默认为单位矩阵。
         */
        setValues(visible?: boolean, alpha?: number, shadow?: number, compositeOperation?: number, matrix?: number): DisplayProps;
    }
    /**
     * DOMElement允许您将HTMLElement与显示列表相关联。它将在DOM中转换，就像它是添加到其中的容器的子级一样。
     * 但是，它不会被渲染到画布上，因此将保留它相对于画布的任何z索引（即，它将被绘制在画布的上方或下方）。
     * 
     * DOMElement的位置相对于其在DOM中的父节点。建议将DOM对象添加到也包含画布的div中，以便它们在页面上共享相同的位置。
     * 
     * DOMElement可用于将HTML元素定位在画布内容之上，以及用于要显示在画布边界之外的元素。例如，一个包含丰富HTML内容的工具提示。
     * 
     * 鼠标交互
     * 
     * DOMElement实例不是完整的EaselJS显示对象，也不参与EaselJS鼠标事件或支持hitTest等方法。
     * 要从DOMElement获取鼠标事件，您必须向htmlElement添加处理程序（注意，这不支持EventDispatcher）
     * ```js
     * var domElement = new createjs.DOMElement(htmlElement);
     * domElement.htmlElement.onclick = function() {
     *     console.log("clicked");
     * }
     * ```
     * 重要事项：需要特别注意该类的绘制，如果你调用stage.update/stage.draw
     */
    class DOMElement extends DisplayObject {
        constructor(htmlElement: HTMLElement);

        // properties
        /** 要管理的DOM对象。 */
        htmlElement: HTMLElement;

        // methods
        clone(): DisplayObject; // throw error
        set(props: Object): DOMElement;
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): DOMElement;
    }


    class EaselJS {
        // properties
        static buildDate: string;
        static version: string;
    }
    /**
     * 所有滤镜的基类。滤镜需要应用于使用缓存方法缓存的对象。如果对象发生更改，请再次缓存它，或使用{@link updateCache}。请注意，在缓存之前必须应用过滤器。
     * 
     * 案例：
     * ```js
     * myInstance.filters = [
     *     new createjs.ColorFilter(0, 0, 0, 1, 255, 0, 0),
     *     new createjs.BlurFilter(5, 5, 10)
     * ];
     * myInstance.cache(0,0, 100, 100);
     * ```
     * 请注意，每个滤镜都可以实现一个{@link getBounds}方法，该方法返回需要应用的边距，以便完全显示滤镜。例如，{@link BlurFilter}（模糊滤镜）将导致对象向外移动，从而在形状周围产生边距。
     * 
     * EaselJS 滤镜
     * 
     * EaselJS附带了许多预构建的滤镜：
     */
    class Filter {
        constructor();

        // methods
        applyFilter(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, targetCtx?: CanvasRenderingContext2D, targetX?: number, targetY?: number): boolean;
        clone(): Filter;
        getBounds(): Rectangle;
        toString(): string;
    }
    /**
     * Graphics类公开了一个易于使用的API，用于生成矢量绘图指令并将其绘制到指定的上下文中。
     * 请注意，您可以通过直接调用{@link draw}来使用Graphics，而不依赖于EaselJS框架，或者它可以与{@link Shape}对象一起使用，在EaselJS显示列表的上下文中绘制矢量图形。
     * 
     * 使用图形对象有两种方法：在图形实例("Graphics API")上调用方法，或实例化图形命令对象并通过{@link append}将其添加到图形队列。
     * 前者抽象了后者，简化了开始和结束路径、填充和笔划。
     * ```js
     * var g = new createjs.Graphics();
     * g.setStrokeStyle(1);
     * g.beginStroke("#000000");
     * g.beginFill("red");
     * g.drawCircle(0,0,30);
     * ```
     * Graphics中的所有绘图方法都返回Graphics实例，因此它们可以链接在一起。例如，以下代码行将生成用红色笔划和蓝色填充绘制矩形的指令：
     * ```js
     * myGraphics.beginStroke("red").beginFill("blue").drawRect(20, 20, 100, 50);
     * ```
     * 每个图形API调用都会生成一个命令对象（请参见下文）。要创建的最后一个命令可以通过{@link command}访问：
     * ```js
     * var fillCommand = myGraphics.beginFill("red").command;
     * // ... later, update the fill style/color:
     * fillCommand.style = "blue";
     * // or change it to a bitmap fill:
     * fillCommand.bitmap(myImage);
     * ```
     * 为了更直接地控制渲染，您可以直接实例化命令对象并将其附加到图形队列中。在这种情况下，您需要手动管理路径创建，并确保填充/笔划应用于定义的路径：
     * ```js
     * // start a new path. Graphics.beginCmd is a reusable BeginPath instance:
     * myGraphics.append(createjs.Graphics.beginCmd);
     * // we need to define the path before applying the fill:
     * var circle = new createjs.Graphics.Circle(0,0,30);
     * myGraphics.append(circle);
     * // fill the path we just defined:
     * var fill = new createjs.Graphics.Fill("red");
     * myGraphics.append(fill);
     * ```
     * 这些方法可以一起使用，例如插入自定义命令：
     * ```js
     * myGraphics.beginFill("red");
     * var customCommand = new CustomSpiralCommand(etc);
     * myGraphics.append(customCommand);
     * myGraphics.beginFill("blue");
     * myGraphics.drawCircle(0, 0, 30);
     * ```
     * 有关创建自定义命令的更多信息，请参阅{@link append}。
     * 
     * ### 缩写 API
     * 
     * Graphics类还包括一个"缩写的API"，这是一个或两个字母的方法，是所有Graphics方法的快捷方式。
     * 这些方法非常适合创建紧凑的指令，CreateJS工具包使用这些方法生成可读代码。所有缩写方法都标记为受保护，因此您可以通过在文档中启用受保护的描述来查看它们。
     * |缩写|方法|缩写|方法|
     * |---|---|---|---|
     * |mt|{@link moveTo}|lt|{@link lineTo}|
     * |a/at|{@link arc}/{@link arcTo}|bt|{@link bezierCurveTo}|
     * |qt|{@link quadraticCurveTo}(或 {@link curveTo})|r|{@link rect}|
     * |cp|{@link closePath}|c|{@link clear}|
     * |f|{@link beginFill}|lf|{@link beginLinearGradientFill}|
     * |rf|{@link beginRadialGradientFill}|bf|{@link beginBitmapFill}|
     * |ef|{@link endFill}|ss/sd|{@link setStrokeStyle}/{@link setStrokeDash}|
     * |s|{@link beginStroke}|ls|{@link beginLinearGradientStroke}|
     * |rs|{@link beginRadialGradientStroke}|bs|{@link beginBitmapStroke}|
     * |es|{@link endStroke}|dr|{@link drawRect}|
     * |rr|{@link drawRoundRect}|rc|{@link drawRoundRectComplex}|
     * |dc|{@link drawCircle}|de|{@link drawEllipse}|
     * |dp|{@link drawPolyStar}|p|{@link decodePath}|
     * 
     * 这里是上面的例子，使用缩写的API代替。
     * ```js
     * myGraphics.s("red").f("blue").r(20, 20, 100, 50);
     * ```
     */
    class Graphics {
        constructor();

        // properties
        /** Base64字符到值的映射。由decodePath使用。 */
        static BASE_64: Object;
        /** Graphics的可重用实例。BeginPath可避免不必要的实例化。 */
        static beginCmd: Graphics.BeginPath;
        /** 
         * 保存对创建或附加的最后一个命令的引用。例如，您可以保留对Fill命令的引用，以便稍后使用以下命令动态更新颜色：
         * ```js
         * var myFill = myGraphics.beginFill("red").command;
         * // update color later:
         * myFill.style = "yellow";
         * ```
         */
        command: Object;
        /** 
         * 返回图形指令数组。每个条目都是一个图形命令对象（例如graphics.Fill、graphics.Rect）。不建议直接修改返回的数组，这可能会导致意外行为。
         * 
         * 此属性主要用于指令的自检（例如用于图形导出）。
         */
        instructions: Object[]; // array of graphics command objects (Graphics.Fill, etc)
        /** 
         * 将setStrokeStyle的caps参数的数值映射到相应的字符串值。这主要用于小型API。映射如下：0到"对接"，1到"圆形"，2到"方形"。例如，要将线条大写设置为"方形"：
         * ```js
         * myGraphics.ss(16, 2);
         * ```
         */
        static STROKE_CAPS_MAP: string[];
        /** 
         * 将setStrokeStyle的关节参数的数值映射到相应的字符串值。这主要用于小型API。映射如下：0到"斜接"，1到"圆形"，2到"斜面"。例如，要将线接头设置为"斜面"：
         * ```js
         * myGraphics.ss(16, 0, 2);
         * ```
         */
        static STROKE_JOINTS_MAP: string[];

        // methods
        /**
         * 将图形命令对象附加到图形队列。
         * 该命令对象公开了一个"exec"方法，该方法接受两个参数：要操作的Context2D和传递到draw中的任意数据对象。
         * 后者通常是调用draw的Shape实例。
         * 
         * 此方法由图形方法（如drawCircle）在内部使用，但也可以直接用于插入内置或自定义图形命令。例如：
         * ```js
         * // attach data to our shape, so we can access it during the draw:
         * myShape.color = "red";
         * 
         * // append a Circle command object:
         * myShape.graphics.append(new createjs.Graphics.Circle(50, 50, 30));
         * 
         * // append a custom command object with an exec method that sets the fill style
         * // based on the shape's data, and then fills the circle.
         * myShape.graphics.append({exec:function(ctx, shape) {
         *     ctx.fillStyle = shape.color;
         *     ctx.fill();
         * }});
         * ```
         * @param command 
         * @param clean 
         * @returns 返回Graphics实例（用于链式调用）
         */
        append(command: Object, clean?: boolean): Graphics;
        /**
         * 绘制一条由半径、startAngle和endAngle参数定义的弧，以位置（x，y）为中心。
         * 
         * 例如，要绘制一个以（100100）为中心、半径为20的完整圆：
         * ```js
         * arc(100, 100, 20, 0, Math.PI*2);
         * ```
         * 有关详细信息，请阅读whatwg规范。
         * 
         * 简短写法"a"。
         * @param x 
         * @param y 
         * @param radius 半径
         * @param startAngle 开始弧度
         * @param endAngle 结束弧度
         * @param anticlockwise 
         * @returns 返回Graphics实例（用于链式调用）
         */
        arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): Graphics;
        /**
         * 绘制具有指定控制点和半径的圆弧。有关详细信息，请阅读whatwg规范。
         * 
         * 简短写法"at"。
         * @param x1 
         * @param y1 
         * @param x2 
         * @param y2 
         * @param radius 
         * @returns 返回Graphics实例（用于链式调用）
         */
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
        /**
         * 使用指定的图像开始填充图案。这将结束当前的子路径。
         * 
         * 简短写法"bf"。
         * @param image 用于填充的图像源（Image, Canvas, 或 Video），图像源必须要加载完成才能用于填充，否则填充为空。
         * @param repetition 可选。指示是否在填充区域中重复图像。"repeat"、"repeat-x"、"repreat-y"或"no-repeat"中的一个。默认为"repeat"。请注意，Firefox不支持"repeat-x"或"repeat-y"（最新测试在FF 20.0中），默认为"repeat"。
         * @param matrix 
         * @returns 返回Graphics实例（用于链式调用）
         */
        beginBitmapFill(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, repetition?: string, matrix?: Matrix2D): Graphics;
        /**
         * 使用指定的图像开始填充图案。这将结束当前的子路径。请注意，与位图填充不同，由于画布API中的限制，笔划当前不支持矩阵参数。
         * 
         * 简短写法"bs"。
         * @param image 用于填充的图像源（Image, Canvas, 或 Video），图像源必须要加载完成才能用于填充，否则填充为空。
         * @param repetition 可选。指示是否在填充区域中重复图像。"repeat"、"repeat-x"、"repreat-y"或"no-repeat"中的一个。默认为"repeat"。
         * @returns 返回Graphics实例（用于链式调用）
         */
        beginBitmapStroke(image: Object, repetition?: string): Graphics;
        /**
         * 使用指定颜色开始填充。这将结束当前的子路径。
         * 
         * 简短写法"f"。
         * @param color CSS兼容的颜色值（例如"red"、"#FF0000"或"rgba(255,0,0,0.5)"）。设置为null将导致无填充。
         * @returns 返回Graphics实例（用于链式调用）
         */
        beginFill(color: string): Graphics;
        /**
         * 开始由线（x0，y0）到（x1，y1）定义的线性梯度填充。这将结束当前的子路径。
         * 例如，以下代码定义了一个从20px到120px的黑白垂直渐变，并绘制了一个正方形来显示它：
         * ```js
         * myGraphics.beginLinearGradientFill(["#000","#FFF"], [0, 1], 0, 20, 0, 120).drawRect(20, 20, 120, 120);
         * ```
         * 简短写法lf
         * @param colors 一组与CSS兼容的颜色值。例如，["#F00","#00F"]将定义从红色到蓝色的渐变图。
         * @param ratios 与颜色相对应的梯度位置数组。例如，[0.1，0.9]将第一种颜色绘制为10%，然后插值为90%的第二种颜色。
         * @param x0 定义定义渐变方向和大小的线的第一个点的位置。
         * @param y0 定义定义渐变方向和大小的线的第一个点的位置。
         * @param x1 定义定义渐变方向和大小的线的第二个点的位置。
         * @param y1 定义定义渐变方向和大小的线的第二个点的位置。
         * @returns 返回Graphics实例（用于链式调用）
         */
        beginLinearGradientFill(colors: string[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Graphics;
        /**
         * 开始由线（x0，y0）到（x1，y1）定义的线性梯度笔划。这将结束当前的子路径。例如，以下代码定义了一个从20px到120px的黑白垂直渐变，并绘制了一个正方形来显示它：
         * ```js
         * myGraphics.setStrokeStyle(10).
         *     beginLinearGradientStroke(["#000","#FFF"], [0, 1], 0, 20, 0, 120).drawRect(20, 20, 120, 120);
         * ```
         * 简短写法ls
         * @param colors 一组与CSS兼容的颜色值。例如，["#F00","#00F"]将定义从红色到蓝色的渐变图。
         * @param ratios 与颜色相对应的梯度位置数组。例如，[0.1,0.9]将第一种颜色绘制为10%，然后插值为90%的第二种颜色。
         * @param x0 定义定义渐变方向和大小的线的第一个点的位置。
         * @param y0 定义定义渐变方向和大小的线的第一个点的位置。
         * @param x1 定义定义渐变方向和大小的线的第二个点的位置。
         * @param y1 定义定义渐变方向和大小的线的第二个点的位置。
         * @returns 返回Graphics实例（用于链式调用）
         */
        beginLinearGradientStroke(colors: string[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Graphics;
        /**
         * 开始径向渐变填充。这将结束当前的子路径。例如，以下代码定义了一个以(100, 100)为中心、半径为50的红色到蓝色的径向渐变，并绘制了一个圆来显示它：
         * ```js
         * myGraphics.beginRadialGradientFill(["#F00","#00F"], [0, 1], 100, 100, 0, 100, 100, 50).drawCircle(100, 100, 50);
         * ```
         * 简短写法rf
         * @param colors 一组与CSS兼容的颜色值。例如，["#F00","#00F"]将定义从红色到蓝色的渐变图。
         * @param ratios 与颜色相对应的梯度位置数组。例如，[0.1,0.9]将第一种颜色绘制为10%，然后插值为90%的第二种颜色。
         * @param x0 定义渐变的内圈的中心位置。
         * @param y0 定义渐变的内圈的中心位置。
         * @param r0 定义渐变的内圈半径。
         * @param x1 定义渐变的外圆的中心位置。
         * @param y1 定义渐变的外圆的中心位置。
         * @param r1 定义渐变的外圆半径。
         * @returns 返回Graphics实例（用于链式调用）
         */
        beginRadialGradientFill(colors: string[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Graphics;
        /**
         * 开始径向渐变笔划。这将结束当前的子路径。例如，以下代码定义了一个以(100, 100)为中心、半径为50的红色到蓝色的径向渐变，并绘制了一个矩形来显示它：
         * ```js
         * myGraphics.setStrokeStyle(10)
         *     .beginRadialGradientStroke(["#F00","#00F"], [0, 1], 100, 100, 0, 100, 100, 50)
         *     .drawRect(50, 90, 150, 110);
         * ```
         * 简单写法rs
         * @param colors 一组与CSS兼容的颜色值。例如，["#F00","#00F"]将定义从红色到蓝色的渐变图。
         * @param ratios 与颜色相对应的梯度位置数组。例如，[0.1,0.9]将第一种颜色绘制为10%，然后插值到90%的第二种颜色，然后将第二种色彩绘制为100%。
         * @param x0 定义渐变的内圈的中心位置。
         * @param y0 定义渐变的内圈的中心位置。
         * @param r0 定义渐变的内圈半径。
         * @param x1 定义渐变的外圆的中心位置。
         * @param y1 定义渐变的外圆的中心位置。
         * @param r1 定义渐变的外圆半径。
         * @returns 返回Graphics实例（用于链式调用）
         */
        beginRadialGradientStroke(colors: string[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Graphics;
        /**
         * 以指定的颜色开始笔划。这将结束当前的子路径。
         * 
         * 简短写法"s"。
         * @param color CSS兼容的颜色值（例如"#FF0000","red"或"rgba(255,0,0,0.5)"）。设置为null将不会导致笔划。
         * @returns 返回Graphics实例（用于链式调用）
         */
        beginStroke(color: string): Graphics;
        /**
         * 使用控制点(cp1x,cp1y)和(cp2x,cp2y)从当前绘图点到(x,y)绘制贝塞尔曲线。
         * 有关详细信息，请阅读[whatwg](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-beziercurveto)规范。
         * 简单写法"bt"。
         * @param cp1x 
         * @param cp1y 
         * @param cp2x 
         * @param cp2y 
         * @param x 
         * @param y 
         * @returns 返回Graphics实例（用于链式调用）
         */
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): Graphics;
        /**
         * 清除所有绘图指令，有效重置此Graphics实例。任何线条和填充样式都需要重新定义，以便在明确的调用后绘制形状。
         * @returns 返回Graphics实例（用于链式调用）
         */
        clear(): Graphics;
        /**
         * 返回此Graphics实例的克隆。请注意，单个命令对象不会被克隆。
         * @returns 返回Graphics实例（用于链式调用）
         */
        clone(): Graphics;
        /**
         * 关闭当前路径，有效地从当前绘图点绘制一条线到自上次设置填充或笔划以来指定的第一个绘图点。
         * @returns 返回Graphics实例（用于链式调用）
         */
        closePath(): Graphics;
        /**
         * 将熟悉的ActionScript curveTo（）方法映射到功能相似的{@link quadraticCurveTo}方法。
         * 绘制贝塞尔曲线，从当前绘图点到目标点(x,y)，使用控制点(cpx,cpy)。
         * @param cpx 控制点坐标
         * @param cpy 控制点坐标
         * @param x 目标点坐标
         * @param y 目标点坐标
         * @returns 返回Graphics实例（用于链式调用）
         */
        curveTo(cpx: number, cpy: number, x: number, y: number): Graphics;
        /**
         * 将压缩的编码路径字符串解码为一系列绘图指令。这种格式不是人类可读的，而是供创作工具使用的。该格式使用base64字符集，每个字符代表6位，来定义一系列绘图命令。
         * 
         * 每个命令由一个"标题"字符组成，后面是可变数量的交替x和y位置值。
         * 从左到右读取标头位（最高有效位到最低有效位）：位1到3指定操作类型（0-moveTo、1-lineTo、2-quadraticCurveTo、3-bezierCurveTo、4-closePath、5-7未使用）。
         * 位4表示位置值是使用12位（2个字符）还是18位（3个字符），其中一位表示后者。位5和6当前未使用。
         * 
         * 标题后面是一系列0（closePath）、2（moveTo、lineTo）、4（quadraticCurveTo）或6（bezierCurveTo"）参数。
         * 这些参数是由2或3个字符表示的交替x/y位置（如命令char中的第4位所示）。这些字符由1位符号（1为负，0为正）和11（2个字符）或17（3个字符）位整数值组成。
         * 所有位置值都以十分之一像素为单位。除非移动操作是绝对的，否则该值是前一个x或y位置的增量（视情况而定）。
         * 
         * 例如，字符串"A3cAAMAu4AAA"表示从-150,0开始到150,0结束的行。A-比特000000。前3位(000)表示moveTo操作。第4位(0)表示每个参数2个字符。
         * n0-1110111011100。绝对x位置为-150.0px。第一位表示负值，其余位表示十分之1500个像素。AA-000000000000。绝对y位置为0。
         * I-001100。前3位(001)表示lineTo操作。第4位(1)表示每个参数3个字符。4000001110111000澳元。300.0px的x增量，加上之前的x值-150.0px，得到+150.0px的绝对位置。
         * AAA-0000000000000000000。y增量值为0。
         * 
         * 简短写法"p"。
         * @param str 
         * @returns 返回Graphics实例（用于链式调用）
         */
        decodePath(str: string): Graphics;
        /**
         * 将显示对象绘制到指定的上下文中，忽略其可见、alpha、阴影和变换。如果处理了绘图，则返回true（对于覆盖功能很有用）。
         * 
         * 注意：此方法主要用于内部使用，但可能对高级用途有用。
         * @param ctx 要绘制的画布2D上下文对象。
         * @param data 传递给图形命令exec方法的可选数据。当从Shape实例调用时，形状将自己作为数据参数传递。这可以由自定义图形命令用于插入上下文数据。
         */
        draw(ctx: CanvasRenderingContext2D,data:any): void;
        /**
         * 仅绘制为此Graphics实例描述的路径，跳过任何非路径指令，包括填充和笔划描述。例如，用于DisplayObject.mask绘制剪切路径。
         * 
         * 注意：此方法主要用于内部使用，但可能对高级用途有用。
         * @param ctx 要绘制的画布2D上下文对象。
         */
        drawAsPath(ctx: CanvasRenderingContext2D): void;
        /**
         * 在(x,y)处绘制具有指定半径的圆。
         * ```js
         * var g = new createjs.Graphics();
         * g.setStrokeStyle(1);
         * g.beginStroke(createjs.Graphics.getRGB(0,0,0));
         * g.beginFill(createjs.Graphics.getRGB(255,0,0));
         * g.drawCircle(0,0,3);
         * 
         * var s = new createjs.Shape(g);
         * s.x = 100;
         * s.y = 100;
         * 
         * stage.addChild(s);
         * stage.update();
         * ```
         * 简短写法"dc"。
         * @param x 原点坐标
         * @param y 原点坐标
         * @param radius 半径
         * @returns 返回Graphics实例（用于链式调用）
         */
        drawCircle(x: number, y: number, radius: number): Graphics;
        /**
         * 绘制具有指定宽度（w）和高度（h）的椭圆。与drawCircle类似，只是宽度和高度可以不同。
         * 
         * 简短写法"de"。
         * @param x 椭圆的x轴坐标点。请注意，这与从中心绘制的drawCircle不同。
         * @param y 椭圆的y轴坐标点。请注意，这与从中心绘制的drawCircle不同。
         * @param w 椭圆的高度（水平直径）。水平半径将是这个数字的一半。
         * @param h 
         * @returns 返回Graphics实例（用于链式调用）
         */
        drawEllipse(x: number, y: number, w: number, h: number): Graphics;
        /**
         * 如果pointSize大于0，则绘制星形；如果pointSize为0，则使用指定的点数绘制正多边形。例如，以下代码将绘制一个熟悉的以100、100为中心、半径为50的五角星形状：
         * ```js
         * myGraphics.beginFill("#FF0").drawPolyStar(100, 100, 50, 5, 0.6, -90);
         * // Note: -90 makes the first point vertical
         * ```
         * 简短写法"dp"。
         * @param x 形状中心的位置。
         * @param y 形状中心的位置。
         * @param radius 形状的外半径。
         * @param sides 星形或多边形边上的点数。
         * @param pointSize 星点的深度或"尖锐度"。pointSize为0将绘制一个正多边形（没有点），pointSize为1将不绘制任何内容，因为点是无限尖的。
         * @param angle 第一个点/角的角度。例如，值为0时，第一个点将直接绘制在中心的右侧。
         * @returns 返回Graphics实例（用于链式调用）
         */
        drawPolyStar(x: number, y: number, radius: number, sides: number, pointSize: number, angle: number): Graphics;
        /**
         * 将熟悉的ActionScript drawRect()方法映射到功能类似的rect方法。
         * @param x 
         * @param y 
         * @param w 
         * @param h 
         * @returns 返回Graphics实例（用于链式调用）
         */
        drawRect(x: number, y: number, w: number, h: number): Graphics;
        /**
         * 绘制具有指定半径的所有角的圆角矩形。
         * @param x 
         * @param y 
         * @param w 宽度
         * @param h 高度
         * @param radius 圆角半径
         * @returns 返回Graphics实例（用于链式调用）
         */
        drawRoundRect(x: number, y: number, w: number, h: number, radius: number): Graphics;
        /**
         * 绘制具有不同角半径的圆角矩形。支持正角半径和负角半径。
         * 
         * 简短写法"rc"。
         * @param x 
         * @param y 
         * @param w 
         * @param h 
         * @param radiusTL 
         * @param radiusTR 
         * @param radiusBR 
         * @param radisBL 
         * @returns 返回Graphics实例（用于链式调用）
         */
        drawRoundRectComplex(x: number, y: number, w: number, h: number, radiusTL: number, radiusTR: number, radiusBR: number, radisBL: number): Graphics;
        /**
         * 结束当前子路径，并开始一个没有填充的新路径。功能上与beginFill（null）相同。
         * 
         * 简短写法"ef"。
         * @returns 返回Graphics实例（用于链式调用）
         */
        endFill(): Graphics;
        /**
         * 结束当前子路径，并开始一条没有笔划的新路径。功能上与beginStroke（null）相同。
         * 
         * 简短写法"es"。
         * @returns 返回Graphics实例（用于链式调用）
         */
        endStroke(): Graphics;
        /**
         * 根据指定的HSL数字颜色值，以"hsla(360100100,1.0)"的格式返回CSS兼容的颜色字符串，或者如果alpha为空，则以"HSL(360100100)"的形式返回。
         * ```js
         * createjs.Graphics.getHSL(150, 100, 70);
         * // Returns "hsl(150,100,70)"
         * ```
         * @param hue 颜色的色调分量，介于0和360之间。
         * @param saturation 颜色的饱和度分量，介于0和100之间。
         * @param lightness 颜色的亮度分量，介于0和100之间。
         * @param alpha 颜色的alpha分量，其中0表示完全透明，1表示完全不透明。
         * @returns 基于指定HSL数字颜色值的CSS兼容颜色字符串，格式为"hsla(360100100,1.0)"，或者如果alpha为空，则格式为"hsl(360100100)"。
         */
        static getHSL(hue: number, saturation: number, lightness: number, alpha?: number): string;
        /**
         * @deprecated - 使用{@link instructions}属性代替
         */
        getInstructions(): Object[];
        /**
         * 返回一个基于指定RGB数字颜色值的CSS兼容颜色字符串，格式为"rgba(255,255,255,1.0)"，或者如果alpha为空，则格式为"rgb(255,255,255)"。例如，
         * ```js
         * createjs.Graphics.getRGB(50, 100, 150, 0.5);
         * // Returns "rgba(50,100,150,0.5)"
         * ```
         * 它还支持将单个十六进制颜色值作为第一个参数传递，将可选的alpha值作为第二个参数传递。例如，
         * ```js
         * createjs.Graphics.getRGB(0xFF00FF, 0.2);
         * // Returns "rgba(255,0,255,0.2)"
         * ```
         * @param r 颜色的红色分量，介于0和0xFF(255)之间。
         * @param g 颜色的绿色分量，介于0和0xFF(255)之间。
         * @param b 颜色的蓝色分量，介于0和0xFF(255)之间。
         * @param alpha 颜色的alpha分量，其中0表示完全透明，1表示完全不透明。
         * @returns 基于"rgba（255,255,255,1.0)"格式的指定RGB数字颜色值的CSS兼容颜色字符串，或者如果alpha为空，则采用"RGB(255,255,255)"格式。
         */
        static getRGB(r: number, g: number, b: number, alpha?: number): string;
        /**
         * 该方法已经弃用。
         * @param callback 
         * @param data 
         */
        inject(callback: (data: any) => any,  data: any): Graphics; // deprecated
        /**
         * 如果此Graphics实例没有绘图命令，则返回true。
         * @returns 如果此Graphics实例没有绘图命令，则返回true。
         */
        isEmpty(): boolean;
        /**
         * 从当前绘图点到指定位置绘制一条线，该位置将成为新的当前绘图点。请注意，您必须在首次lineTo()之前调用moveTo设置绘制始点。
         * 
         * 简短写法"lt"。
         * 
         * 有关详细信息，请阅读[whatwg](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#complex-shapes-(paths))规范。
         * @param x 
         * @param y 
         * @returns 返回Graphics实例（用于链式调用）
         */
        lineTo(x: number, y: number): Graphics;
        /**
         * 将绘图点移动到指定位置。
         * 
         * 简短写法"mt"。
         * @param x
         * @param y
         * @returns 返回Graphics实例（用于链式调用）
         */
        moveTo(x: number, y: number): Graphics;
        /**
         * 使用控制点(cpx,cpy)从当前绘图点绘制到(x,y)的二次曲线。有关详细信息，请阅读[whatwg](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-quadraticcurveto)规范。
         * 
         * 简短写法"qt"。
         * @param cpx 
         * @param cpy 
         * @param x 
         * @param y 
         * @returns 返回Graphics实例（用于链式调用）
         */
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): Graphics;
        /**
         * 使用当前填充和/或笔划在（x，y）处绘制具有指定宽度和高度的矩形。
         * 
         * 简短写法"r"。
         * 
         * 有关详细信息，请阅读[whatwg](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-rect)规范。
         * @param x 
         * @param y 
         * @param w 
         * @param h 
         * @returns 返回Graphics实例（用于链式调用）
         */
        rect(x: number, y: number, w: number, h: number): Graphics;
        /**
         * 设置笔划样式。与所有绘图方法一样，这可以链接，因此您可以在一行代码中定义笔划样式和颜色，如下所示：
         * ```js
         * myGraphics.setStrokeStyle(8,"round").beginStroke("#F00");
         * ```
         * 简短写法"ss"。
         * @param thickness 笔划的宽度。
         * @param caps 指示线条末端收尾类型。"butt"、"round"或"square"。默认为"butt"。还接受数值0(butt)、1(round)和2(square)一起使用。
         * @param joints 指定两条线相交处应使用的接头类型。"bevel"、"round"或"miter"中的一种。默认为"miter"。还接受值0(bevel)、1(round)和2(miter)一起使用。
         * @param miterLimit 如果将接头设置为斜接("miter")，则可以指定斜接限制比率，该比率控制斜接接头将被剪裁的点。
         * @param ignoreScale 如果为真，则无论活动变换如何，笔划都将以指定的厚度绘制。
         * @returns 返回Graphics实例（用于链式调用）
         */
        setStrokeStyle(thickness: number, caps?: string | number, joints?: string | number, miterLimit?: number, ignoreScale?: boolean): Graphics;
        /**
         * 设置或清除笔划破折号图案。
         * ```js
         * myGraphics.setStrokeDash([20, 10], 0);
         * ```
         * 简短写法"sd"。
         * @param segments 指定虚线图案的数组，在直线和间隙之间交替。例如，[20,10]将创建一个20像素线的图案，它们之间有10个像素的间隙。传递null或空数组将清除现有的笔划破折号。
         * @param offset 虚线图案的偏移。例如，您可以增加此值以创建"行进的蚂蚁"效果。
         * @returns 返回Graphics实例（用于链式调用）
         */
        setStrokeDash(segments?: number[], offset?: number): Graphics;
        /**
         * 存储所有图形命令，以便在未来的绘图中不会执行。第二次调用store（）将添加到现有存储中。这也会影响drawAsPath()。
         * 
         * 这在以迭代方式创建矢量图形（例如生成艺术）的情况下很有用，这样只需要绘制新的图形（这可以提供巨大的性能优势），但您希望保留所有矢量指令以供以后使用（例如缩放、修改或导出）。
         * 
         * 请注意，调用store（）将强制活动路径（如果有的话）以类似于更改填充或笔划的方式结束。
         * 
         * 例如，考虑一个用户用鼠标绘制线条的应用程序。
         * 当每个线段（或线段集合）被添加到形状中时，可以使用updateCache对其进行光栅化，然后进行存储，以便在调整应用程序大小或导出到SVG时可以以不同的比例重新绘制。
         * ```js
         * // set up cache:
         * myShape.cache(0,0,500,500,scale);
         * 
         * // when the user drags, draw a new line:
         * myShape.graphics.moveTo(oldX,oldY).lineTo(newX,newY);
         * // then draw it into the existing cache:
         * myShape.updateCache("source-over");
         * // store the new line, so it isn't redrawn next time:
         * myShape.store();
         * 
         * // then, when the window resizes, we can re-render at a different scale:
         * // first, unstore all our lines:
         * myShape.unstore();
         * // then cache using the new scale:
         * myShape.cache(0,0,500,500,newScale);
         * // finally, store the existing commands again:
         * myShape.store();
         * ```
         * @returns 返回Graphics实例（用于链式调用）
         */
        store(): Graphics;
        /**
         * 返回此对象的字符串表示形式。
         */
        toString(): string;
        /**
         * 取消存储以前使用store存储的任何图形命令，以便在后续绘图调用中执行。
         * @returns 返回Graphics实例（用于链式调用）
         */
        unstore(): Graphics;

        // tiny API - short forms of methods above
        /**
         * {@link arc}的简短写法。
         * @param x 
         * @param y 
         * @param radius 半径
         * @param startAngle 开始弧度
         * @param endAngle 结束弧度
         * @param anticlockwise 
         * @returns 返回Graphics实例（用于链式调用）
         */
        a(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): Graphics;
        /**
         * {@link arcTo}的简短写法。
         * @param x1 
         * @param y1 
         * @param x2 
         * @param y2 
         * @param radius 
         * @returns 返回Graphics实例（用于链式调用）
         */
        at(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
        /**
         * {@link beginBitmapFill}的简短写法。
         * @param image 用于填充的图像源（Image, Canvas, 或 Video），图像源必须要加载完成才能用于填充，否则填充为空。
         * @param repetition 可选。指示是否在填充区域中重复图像。"repeat"、"repeat-x"、"repreat-y"或"no-repeat"中的一个。默认为"repeat"。请注意，Firefox不支持"repeat-x"或"repeat-y"（最新测试在FF 20.0中），默认为"repeat"。
         * @param matrix 
         * @returns 返回Graphics实例（用于链式调用）
         */
        bf(image: Object, repetition?: string, matrix?: Matrix2D): Graphics;
        /**
         * {@link beginBitmapStroke}的简短写法。
         * @param image 用于填充的图像源（Image, Canvas, 或 Video），图像源必须要加载完成才能用于填充，否则填充为空。
         * @param repetition 可选。指示是否在填充区域中重复图像。"repeat"、"repeat-x"、"repreat-y"或"no-repeat"中的一个。默认为"repeat"。
         * @returns 返回Graphics实例（用于链式调用）
         */
        bs(image: Object, repetition?: string): Graphics;
        /**
         * {@link beginFill}的简短写法。
         * @param color CSS兼容的颜色值（例如"red"、"#FF0000"或"rgba(255,0,0,0.5)"）。设置为null将导致无填充。
         * @returns 返回Graphics实例（用于链式调用）
         */
        f(color?: string): Graphics;
        /**
         * {@link beginLinearGradientFill}的简短写法。
         * @param colors 一组与CSS兼容的颜色值。例如，["#F00","#00F"]将定义从红色到蓝色的渐变图。
         * @param ratios 与颜色相对应的梯度位置数组。例如，[0.1，0.9]将第一种颜色绘制为10%，然后插值为90%的第二种颜色。
         * @param x0 定义定义渐变方向和大小的线的第一个点的位置。
         * @param y0 定义定义渐变方向和大小的线的第一个点的位置。
         * @param x1 定义定义渐变方向和大小的线的第二个点的位置。
         * @param y1 定义定义渐变方向和大小的线的第二个点的位置。
         * @returns 返回Graphics实例（用于链式调用）
         */
        lf(colors: string[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Graphics;
        /**
         * {@link beginRadialGradientStroke}的简短写法。
         * @param colors 一组与CSS兼容的颜色值。例如，["#F00","#00F"]将定义从红色到蓝色的渐变图。
         * @param ratios 与颜色相对应的梯度位置数组。例如，[0.1,0.9]将第一种颜色绘制为10%，然后插值为90%的第二种颜色。
         * @param x0 定义渐变的内圈的中心位置。
         * @param y0 定义渐变的内圈的中心位置。
         * @param r0 定义渐变的内圈半径。
         * @param x1 定义渐变的外圆的中心位置。
         * @param y1 定义渐变的外圆的中心位置。
         * @param r1 定义渐变的外圆半径。
         * @returns 返回Graphics实例（用于链式调用）
         */
        rs(colors: string[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Graphics;
        /**
         * {@link beginStroke}的简短写法。
         * @param color CSS兼容的颜色值（例如"#FF0000","red"或"rgba(255,0,0,0.5)"）。设置为null将不会导致笔划。
         * @returns 返回Graphics实例（用于链式调用）
         */
        s(color?: string): Graphics;
        /**
         * {@link bezierCurveTo}的简短写法。
         * @param cp1x 
         * @param cp1y 
         * @param cp2x 
         * @param cp2y 
         * @param x 
         * @param y 
         * @returns 返回Graphics实例（用于链式调用）
         */
        bt(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): Graphics;
        /**
         * {@link clear}的简短写法。
         * @returns 返回Graphics实例（用于链式调用）
         */
        c(): Graphics;
        /**
         * {@link closePath}的简短写法。
         * @returns 返回Graphics实例（用于链式调用）
         */
        cp(): Graphics;
        /**
         * {@link decodePath}的简短写法。
         * @param str 
         * @returns 返回Graphics实例（用于链式调用）
         */
        p(str: string): Graphics;
        /**
         * {@link drawCircle}的简短写法。
         * @param x 原点坐标
         * @param y 原点坐标
         * @param radius 半径
         * @returns 返回Graphics实例（用于链式调用）
         */
        dc(x: number, y: number, radius: number): Graphics;
        /**
         * {@link drawEllipse}的简短写法。
         * @param x 椭圆的x轴坐标点。请注意，这与从中心绘制的drawCircle不同。
         * @param y 椭圆的y轴坐标点。请注意，这与从中心绘制的drawCircle不同。
         * @param w 椭圆的高度（水平直径）。水平半径将是这个数字的一半。
         * @param h 
         * @returns 返回Graphics实例（用于链式调用）
         */
        de(x: number, y: number, w: number, h: number): Graphics;
        /**
         * {@link drawPolyStar}的简短写法。
         * @param x 形状中心的位置。
         * @param y 形状中心的位置。
         * @param radius 形状的外半径。
         * @param sides 星形或多边形边上的点数。
         * @param pointSize 星点的深度或"尖锐度"。pointSize为0将绘制一个正多边形（没有点），pointSize为1将不绘制任何内容，因为点是无限尖的。
         * @param angle 第一个点/角的角度。例如，值为0时，第一个点将直接绘制在中心的右侧。
         * @returns 返回Graphics实例（用于链式调用）
         */
        dp(x: number, y: number, radius: number, sides: number, pointSize: number, angle: number): Graphics;
        /**
         * {@link drawRect}的简短写法。
         * @param x 
         * @param y 
         * @param w 
         * @param h 
         * @returns 返回Graphics实例（用于链式调用）
         */
        dr(x: number, y: number, w: number, h: number): Graphics;
        /**
         * {@link drawRoundRect}的简短写法。
         * @param x 
         * @param y 
         * @param w 宽度
         * @param h 高度
         * @param radius 圆角半径
         * @returns 返回Graphics实例（用于链式调用）
         */
        rr(x: number, y: number, w: number, h: number, radius: number): Graphics;
        /**
         * {@link drawRoundRectComplex}的简短写法。
         * @param x 
         * @param y 
         * @param w 
         * @param h 
         * @param radiusTL 
         * @param radiusTR 
         * @param radiusBR 
         * @param radisBL 
         * @returns 返回Graphics实例（用于链式调用）
         */
        rc(x: number, y: number, w: number, h: number, radiusTL: number, radiusTR: number, radiusBR: number, radisBL: number): Graphics;
        /**
         * {@link endFill}的简短写法。
         * @returns 返回Graphics实例（用于链式调用）
         */
        ef(): Graphics;
        /**
         * {@link endStroke}的简短写法。
         * @returns 返回Graphics实例（用于链式调用）
         */
        es(): Graphics;
        /**
         * {@link lineTo}的简短写法。
         * @param x 
         * @param y 
         * @returns 返回Graphics实例（用于链式调用）
         */
        lt(x: number, y: number): Graphics;
        /**
         * {@link moveTo}的简短写法。
         * @param x 
         * @param y 
         * @returns 返回Graphics实例（用于链式调用）
         */
        mt(x: number, y: number): Graphics;
        /**
         * {@link quadraticCurveTo}的简短写法。
         * @param cpx 
         * @param cpy 
         * @param x 
         * @param y 
         * @returns 返回Graphics实例（用于链式调用）
         */
        qt(cpx: number, cpy: number, x: number, y: number): Graphics;
        /**
         * {@link rect}的简短写法。
         * @param x 
         * @param y 
         * @param w 
         * @param h 
         * @returns 返回Graphics实例（用于链式调用）
         */
        r(x: number, y: number, w: number, h: number): Graphics;
        /**
         * {@link setStrokeStyle}的简短写法。
         * @param thickness 笔划的宽度。
         * @param caps 指示线条末端收尾类型。"butt"、"round"或"square"。默认为"butt"。还接受数值0(butt)、1(round)和2(square)一起使用。
         * @param joints 指定两条线相交处应使用的接头类型。"bevel"、"round"或"miter"中的一种。默认为"miter"。还接受值0(bevel)、1(round)和2(miter)一起使用。
         * @param miterLimit 如果将接头设置为斜接("miter")，则可以指定斜接限制比率，该比率控制斜接接头将被剪裁的点。
         * @param ignoreScale 如果为真，则无论活动变换如何，笔划都将以指定的厚度绘制。
         * @returns 返回Graphics实例（用于链式调用）
         */
        ss(thickness: number, caps?: string | number, joints?: string | number, miterLimit?: number, ignoreScale?: boolean): Graphics;
        /**
         * {@link setStrokeDash}的简短写法。
         * @param segments 指定虚线图案的数组，在直线和间隙之间交替。例如，[20,10]将创建一个20像素线的图案，它们之间有10个像素的间隙。传递null或空数组将清除现有的笔划破折号。
         * @param offset 虚线图案的偏移。例如，您可以增加此值以创建"行进的蚂蚁"效果。
         * @returns 返回Graphics实例（用于链式调用）
         */
        sd(segments?: number[], offset?: number): Graphics;
    }


    namespace Graphics
    {
        /**
         * 图形命令对象。有关更多信息，请参见{@link Graphics.arc | arc}和{@link Graphics.append | append}。
         */
        class Arc
        {
            constructor(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: number);

            // properties
            anticlockwise: number;
            endAngle: number;
            radius: number;
            startAngle: number;
            x: number;
            y: number;
        }
        /**
         * 图形命令对象。有关更多信息，请参见{@link Graphics.arcTo | arcTo}和{@link Graphics.append | append}。
         */
        class ArcTo
        {
            constructor(x1: number, y1: number, x2: number, y2: number, radius: number);

            // properties
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            radius: number;
        }
        /**
         * 图形命令对象开始新路径。有关更多信息，请参见{@link Graphics}和{@link Graphics.append | append}。
         */
        class BeginPath
        {
            /**
             * 在提供的Canvas上下文中执行Graphics命令。
             * @param ctx canvas渲染上下文
             */
            exec(ctx:CanvasRenderingContext2D): void;
        }
        /**
         * 图形命令对象开始新路径。有关更多信息，请参见{@link Graphics.bezierCurveTo | bezierCurveTo}和{@link Graphics.append | append}。
         */
        class BezierCurveTo
        {
            constructor(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number);

            // properties
            cp1x: number;
            cp1y: number;
            cp2x: number;
            cp2y: number;
            x: number;
            y: number;
            /**
             * 在提供的Canvas上下文中执行Graphics命令。
             * @param ctx canvas渲染上下文
             */
            exec(ctx:CanvasRenderingContext2D): void;
        }
        /**
         * 图形命令对象。有关更多信息，请参见{@link Graphics.drawCircle | drawCircle}和{@link Graphics.append | append}。
         */
        class Circle
        {
            constructor(x: number, y: number, radius: number);

            // properties
            x: number;
            y: number;
            radius: number;
            /**
             * 在提供的Canvas上下文中执行Graphics命令。
             * @param ctx canvas渲染上下文
             */
            exec(ctx:CanvasRenderingContext2D): void;
        }
        /**
         * 图形命令对象。有关更多信息，请参见{@link Graphics.closePath | closePath}和{@link Graphics.append | append}。
         */
        class ClosePath
        {
            /**
             * 在提供的Canvas上下文中执行Graphics命令。
             * @param ctx canvas渲染上下文
             */
            exec(ctx:CanvasRenderingContext2D): void;
        }
        /**
         * 图形命令对象。有关更多信息，请参见{@link Graphics.beginFill | beginFill}和{@link Graphics.append | append}。
         */
        class Fill
        {
            /**
             * 
             * @param style 有效的Context2D填充样式。
             * @param matrix 
             */
            constructor(style: Object, matrix?: Matrix2D);

            // properties
            style: Object;
            matrix: Matrix2D;

            // methods
            /**
             * 创建位图填充样式并将其指定给Fill.style属性。有关更多信息，请参阅{@link Graphics.beginBitmapFill | beginBitmapFill}。
             * @param image 必须在创建位图填充之前完成加载，否则填充将为空。
             * @param repetition repeat、repeat-x、repeat-y或者no-repeat的其中一个。默认为repeat。
             * @returns 返回Fill实例（用于链式调用）
             */
            bitmap(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, repetition?: string): Fill;
            /**
             * 创建线性渐变样式并将其指定给Fill.style属性。有关更多信息，请参阅{@link Graphics.beginLinearGradientFill | beginLinearGradientFill}。
             * @param colors 
             * @param ratios 
             * @param x0 
             * @param y0 
             * @param x1 
             * @param y1 
             * @returns 返回Fill实例（用于链式调用）
             */
            linearGradient(colors: number[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Fill;
            /**
             * 创建径向渐变样式并将其指定给Fill.style属性。有关更多信息，请参阅{@link Graphics.beginRadialGradientFill | beginRadialGradientFill}。
             * @param colors 
             * @param ratios 
             * @param x0 
             * @param y0 
             * @param r0 
             * @param x1 
             * @param y1 
             * @param r1 
             * @returns 返回Fill实例（用于链式调用）
             */
            radialGradient(colors: number[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Fill;
            /**
             * 在提供的Canvas上下文中执行Graphics命令。
             * @param ctx canvas渲染上下文
             */
            exec(ctx:CanvasRenderingContext2D): void;
        }
        /**
         * 图形命令对象。有关详细信息，请参见{@link Graphics.lineTo | lineTo}和{@link Graphics.append | append}。有关更多信息，请参见{@link Graphics}和{@link Graphics.append | append}。
         */
        class LineTo
        {
            constructor(x: number, y: number);

            // properties
            x: number;
            y: number;
            /**
             * 在提供的Canvas上下文中执行Graphics命令。
             * @param ctx canvas渲染上下文
             */
            exec(ctx:CanvasRenderingContext2D): void;
        }
        /**
         * 图形命令对象。有关更多信息，请参阅{@link Graphics.moveTo | moveTo}和{@link Graphics.append | append}。
         */
        class MoveTo
        {
            constructor(x: number, y: number);

            x: number;
            y: number;
            /**
             * 在提供的Canvas上下文中执行Graphics命令。
             * @param ctx canvas渲染上下文
             */
            exec(ctx:CanvasRenderingContext2D): void;
        }
        /**
         * 图形命令对象。有关更多信息，请参见{@link Graphics.drawPolyStar | drawPolyStar}和{@link Graphics.append | append}。
         */
        class PolyStar
        {
            constructor(x: number, y: number, radius: number, sides: number, pointSize: number, angle: number);

            // properties
            angle: number;
            pointSize: number;
            radius: number;
            sides: number;
            x: number;
            y: number;
            /**
             * 在提供的Canvas上下文中执行Graphics命令。
             * @param ctx canvas渲染上下文
             */
            exec(ctx:CanvasRenderingContext2D): void;
        }
        /**
         * 图形命令对象。有关更多信息，请参见{@link Graphics.quadraticCurveTo | quadraticCurveTo}和{@link Graphics.append | append}。
         */
        class QuadraticCurveTo
        {
            constructor(cpx: number, cpy: number, x: number, y: number);

            // properties
            cpx: number;
            cpy: number;
            x: number;
            y: number;
            /**
             * 在提供的Canvas上下文中执行Graphics命令。
             * @param ctx canvas渲染上下文
             */
            exec(ctx:CanvasRenderingContext2D): void;
        }
        /**
         * 图形命令对象。有关更多信息，请参见{@link Graphics.rect | rect}和{@link Graphics.append | append}。
         */
        class Rect
        {
            constructor(x: number, y: number, w: number, h: number);

            // properties
            x: number;
            y: number;
            w: number;
            h: number;
            /**
             * 在提供的Canvas上下文中执行Graphics命令。
             * @param ctx canvas渲染上下文
             */
            exec(ctx:CanvasRenderingContext2D): void;
        }
        /**
         * 图形命令对象。有关更多信息，请参见{@link Graphics.drawRoundRectComplex | drawRoundRectComplex}和{@link Graphics.append | append}。
         */
        class RoundRect
        {
            constructor(x: number, y: number, w: number, h: number, radiusTL: number, radiusTR: number, radiusBR: number, radiusBL: number);

            // properties
            x: number;
            y: number;
            w: number;
            h: number;
            radiusTL: number;
            radiusTR: number;
            radiusBR: number;
            radiusBL: number;
            /**
             * 在提供的Canvas上下文中执行Graphics命令。
             * @param ctx canvas渲染上下文
             */
            exec(ctx:CanvasRenderingContext2D): void;
        }
        /**
         * 图形命令对象。有关更多信息，请参见{@link Graphics.beginStroke | beginStroke}和{@link Graphics.append | append}。
         */
        class Stroke
        {
            constructor(style: Object, ignoreScale: boolean);

            // properties
            style: Object;
            ignoreScale: boolean;

            // methods
            /**
             * 创建位图填充样式并将其指定给Stroke.style属性。有关更多信息，请参阅{@link Graphics.beginBitmapStroke | beginBitmapStroke}。
             * @param image 
             * @param repetition 
             */
            bitmap(image: HTMLImageElement, repetition?: string): Stroke;
            /**
             * 创建线性渐变样式并将其指定给Stroke.style属性。有关更多信息，请参阅{@link Graphics.beginLinearGradientStroke | beginLinearGradientStroke}。
             * @param colors 
             * @param ratios 
             * @param x0 
             * @param y0 
             * @param x1 
             * @param y1 
             */
            linearGradient(colors: number[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Stroke;
            /**
             * 创建径向渐变样式并将其指定给Stroke.style属性。有关更多信息，请参阅{@link Graphics.beginRadialGradientStroke | beginRadialGradientStroke}。
             * @param colors 
             * @param ratios 
             * @param x0 
             * @param y0 
             * @param r0 
             * @param x1 
             * @param y1 
             * @param r1 
             */
            radialGradient(colors: number[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Stroke;
            /**
             * 在提供的Canvas上下文中执行Graphics命令。
             * @param ctx canvas渲染上下文
             */
            exec(ctx:CanvasRenderingContext2D): void;
        }
        /**
         * 图形命令对象。有关更多信息，请参见{@link Graphics.setStrokeStyle | setStrokeStyle}和{@link Graphics.append | append}。
         */
        class StrokeStyle
        {
            constructor(width: number, caps: string, joints: number, miterLimit: number);

            // properties
            caps: string;
            joints: string;
            miterLimit: number;
            width: number;
            /**
             * 在提供的Canvas上下文中执行Graphics命令。
             * @param ctx canvas渲染上下文
             */
            exec(ctx:CanvasRenderingContext2D): void;
        }
        /**
         * 图形命令对象。有关更多信息，请参见{@link Graphics.setStrokeDash | setStrokeDash}和{@link Graphics.append | append}。
         */
        class StrokeDash
        {
            constructor(segments:any[], offset:number);

            // properties
            offset: number;
            segments: any[];
            /**
             * 在提供的Canvas上下文中执行Graphics命令。
             * @param ctx canvas渲染上下文
             */
            exec(ctx:CanvasRenderingContext2D): void;
        }
    }
    /**
     * 表示映射变换矩阵，并提供用于构造和连接矩阵的工具。
     * 该矩阵可以可视化为：
     * ```js
     * [ a  c  tx
     *   b  d  ty
     *   0  0  1  ]
     * ```
     * 注意b和c的位置。
     */
    class Matrix2D {
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);

        // properties
        a: number;
        b: number;
        c: number;
        d: number;
        static DEG_TO_RAD: number;
        static identity: Matrix2D;
        tx: number;
        ty: number;

        // methods
        /**
         * 将指定的矩阵属性附加到此矩阵。所有参数都是必需的。这相当于乘法`(this matrix) * (specified matrix)`。
         * @param a 
         * @param b 
         * @param c 
         * @param d 
         * @param tx 
         * @param ty 
         * @returns 返回此矩阵。可用于链式调用。
         */
        append(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix2D;
        /**
         * 将指定的矩阵附加到此矩阵。这相当于乘法`(this matrix) * (specified matrix)`。
         * @param matrix 
         * @returns 返回此矩阵。可用于链式调用。
         */
        appendMatrix(matrix: Matrix2D): Matrix2D;
        /**
         * 从指定的显示对象变换属性生成矩阵属性，并将其附加到此矩阵中。例如，您可以使用它来生成表示显示对象变换的矩阵：
         * ```js
         * var mtx = new createjs.Matrix2D();
         * mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
         * ```
         * @param x 
         * @param y 
         * @param scaleX 
         * @param scaleY 
         * @param rotation 
         * @param skewX 
         * @param skewY 
         * @param regX 
         * @param regY 
         * @returns 返回此矩阵。可用于链式调用。
         */
        appendTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX?: number, regY?: number): Matrix2D;
        /**
         * 返回Matrix2D实例的克隆。
         * @returns Matrix2D实例的克隆。
         */
        clone(): Matrix2D;
        /**
         * 将指定矩阵中的所有属性复制到此矩阵。
         * @param matrix 
         * @returns 返回此矩阵。可用于链式调用。
         */
        copy(matrix: Matrix2D): Matrix2D;
        /**
         * 将矩阵分解为变换属性（x、y、scaleX、scaleY和rotation）。请注意，这些值可能与您用于生成矩阵的变换属性不匹配，尽管它们将产生相同的视觉结果。
         * @param target 要应用转换属性的对象。如果为null，则将返回一个新对象。
         * @returns 目标，或应用了变换属性的新通用对象。
         */
        decompose(target?: Object): {x: number; y: number; scaleX: number; scaleY: number; rotation: number; skewX: number; skewY: number}|Matrix2D;
        //decompose(target: Object): Matrix2D;
        /**
         * 如果此矩阵等于指定的矩阵（所有属性值都相等），则返回true。
         * @param matrix 要比较的矩阵。
         */
        equals(matrix: Matrix2D): boolean;
        /**
         * 将矩阵的属性设置为恒等式矩阵（应用空变换的矩阵）的属性。
         * @returns 返回此矩阵。可用于链式调用。
         */
        identity(): Matrix2D;
        /**
         * 反转矩阵，使其执行相反的变换。
         * @returns 返回此矩阵。可用于链式调用。
         */
        invert(): Matrix2D;
        /**
         * 如果此矩阵等于单位矩阵，则返回true。
         * @returns 如果此矩阵等于单位矩阵，则返回true。
         */
        isIdentity(): boolean;
        /**
         * 将指定的矩阵属性前置到此矩阵。这相当于乘法`(specified matrix) * (this matrix)`。所有参数都是必需的。
         * @param a 
         * @param b 
         * @param c 
         * @param d 
         * @param tx 
         * @param ty 
         * @returns 返回此矩阵。可用于链式调用。
         */
        prepend(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix2D;
        /**
         * 将指定的矩阵前置到此矩阵。这相当于乘法`(specified matrix) * (this matrix)`。例如，您可以使用以下公式计算子对象的组合变换：
         * ```js
         * var o = myDisplayObject;
         * var mtx = o.getMatrix();
         * while (o = o.parent) {
         *     // prepend each parent's transformation in turn:
         *     o.prependMatrix(o.getMatrix());
         * }
         * ```
         * @param matrix 
         * @returns 返回此矩阵。可用于链式调用。
         */
        prependMatrix(matrix: Matrix2D): Matrix2D;
        /**
         * 从指定的显示对象变换属性生成矩阵属性，并将其添加到此矩阵之前。例如，您可以使用以下公式计算子对象的组合变换：
         * ```js
         * var o = myDisplayObject;
         * var mtx = new createjs.Matrix2D();
         * do  {
         *     // prepend each parent's transformation in turn:
         *     mtx.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);
         * } while (o = o.parent);
         * ```
         * 注意，上面的例子不会考虑{@link transformMatrix}的值。请参阅{@link prependMatrix}的示例，了解如何处理这种情况。
         * @param x 
         * @param y 
         * @param scaleX 
         * @param scaleY 
         * @param rotation 
         * @param skewX 
         * @param skewY 
         * @param regX 
         * @param regY 
         * @returns 返回此矩阵。可用于链式调用。
         */
        prependTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX?: number, regY?: number): Matrix2D;
        /**
         * 对矩阵应用顺时针旋转变换。
         * @param angle 旋转角度，单位为度。要使用以弧度为单位的值，请将其乘以`180/Math.PI`。
         * @returns 返回此矩阵。可用于链式调用。
         */
        rotate(angle: number): Matrix2D;
        /**
         * 对矩阵应用缩放变换。
         * @param x 水平缩放的比例。例如，值2将使X方向的大小加倍，值0.5将使其减半。
         * @param y 垂直缩放的比例。
         * @returns 返回此矩阵。可用于链式调用。
         */
        scale(x: number, y: number): Matrix2D;
        /**
         * 在此实例上设置指定值。
         * @param a 
         * @param b 
         * @param c 
         * @param d 
         * @param tx 
         * @param ty 
         * @returns 返回此矩阵。可用于链式调用。
         */
        setValues(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number): Matrix2D;
        /**
         * 对矩阵应用斜切变换。
         * @param skewX 水平倾斜的度数。要使用以弧度为单位的值，请将其乘以`180/Math.PI`。
         * @param skewY 垂直倾斜的度数。
         * @returns 返回此矩阵。可用于链式调用。
         */
        skew(skewX: number, skewY: number): Matrix2D;
        /**
         * 返回此对象的字符串表示形式。
         * @returns 实例的字符串表示。
         */
        toString(): string;
        /**
         * 根据此矩阵变换指定的点。
         * @param x 
         * @param y 
         * @param pt 将结果赋值到该对象。如果省略，将返回具有x/y属性的通用对象。
         * @returns 返回新的点。
         */
        transformPoint(x: number, y: number, pt?: Point | Object): Point;
        /**
         * 在x和y轴上平移矩阵。
         * @param x 
         * @param y 
         * @returns 返回此矩阵。可用于链式调用。
         */
        translate(x: number, y: number): Matrix2D;
    }
    /**
     * 作为参数传递给所有鼠标/指针/触摸相关事件。
     * 有关鼠标事件及其属性的列表，请参阅{@link DisplayObject}和{@link Stage}事件列表。
     */
    class MouseEvent extends Event {
        /**
         * 
         * @param type 事件类型。
         * @param bubbles 指示事件是否会在显示列表中冒泡。
         * @param cancelable 指示是否可以取消此事件的默认行为。
         * @param stageX 相对于舞台的x坐标。
         * @param stageY 相对于舞台的y坐标。
         * @param nativeEvent 与此鼠标事件相关的原生DOM事件。
         * @param pointerID 指针的唯一id。
         * @param primary 是否主指针，适用于多点触控环境中。
         * @param rawX 相对于舞台的原始x位置。
         * @param rawY 相对于舞台的原始y位置。
         * @param relatedTarget 鼠标事件的目标。
         */
        constructor(type: string, bubbles: boolean, cancelable: boolean, stageX: number, stageY: number, nativeEvent: NativeMouseEvent, pointerID: number, primary: boolean, rawX: number, rawY: number, relatedTarget: DisplayObject);

        // properties
        /** 指示事件是否由触摸输入（与鼠标输入相比）生成。 */
        isTouch: boolean;
        /** 返回鼠标在当前目标（即调度器）的本地坐标系中的x位置。 */
        localX: number;
        /** 返回鼠标在当前目标（即调度器）的本地坐标系中的y位置。 */
        localY: number;
        /** 浏览器生成的本地MouseEvent。此事件的属性和API可能因浏览器而异。如果EaselJS属性不是直接从本机MouseEvent生成的，则此属性将为null。 */
        nativeEvent: NativeMouseEvent;
        /** 指针（触摸点或光标）的唯一id。对于鼠标，这将是-1，或者是系统提供的id值。 */
        pointerID: number;
        /** 是否主指针，适用于多点触控环境中。这对鼠标来说永远是正确的。对于触摸指针，当前堆栈中的第一个指针将被视为主指针。 */
        primary: boolean;
        /** 相对于舞台的原始x位置。通常，这将与stageX值相同，除非stage.mouseMoveOutside为true并且指针在stage边界之外。 */
        rawX: number;
        /** 相对于舞台的原始y位置。通常，这将与stageX值相同，除非stage.mouseMoveOutside为true并且指针在stage边界之外。 */
        rawY: number;
        /**
         * 事件的次要目标（如适用）。
         * 这用于{@link mouseout}/{@link rollout}事件，以指示鼠标输入的对象，鼠标退出的对象的滚动/翻转，以及光标下对象的{@link stagemousedown}/{@link stagemouseup}事件（如果有的话）。
         */
        relatedTarget: DisplayObject;
        /** 舞台上的标准化x位置。这将始终在0到舞台宽度的范围内。 */
        stageX: number;
        /** 舞台上的标准化y位置。这将始终在0到舞台高度的范围内。 */
        stageY: number;
        mouseMoveOutside: boolean;

        // methods
        // EventDispatcher mixins
        /*addEventListener(type: string, listener: (eventObj: Object) => boolean|void, useCapture?: boolean): Function;
        //addEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): Function;
        addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean|void; }, useCapture?: boolean): Object;
        //addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): Object;
        dispatchEvent(eventObj: Object | string | Event, target?: Object): boolean;
        hasEventListener(type: string): boolean;
        off(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
        off(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        off(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
        off(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        off(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        on(type: string, listener: (eventObj: Object) => boolean, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        on(type: string, listener: (eventObj: Object) => void, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        on(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        on(type: string, listener: { handleEvent: (eventObj: Object) => void; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        removeAllEventListeners(type?: string): void;
        removeEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
        removeEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
        removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        removeEventListener(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        toString(): string;
        willTrigger(type: string): boolean;*/
    }

    /**
     * MovieClip类将TweenJS Timeline与EaselJS容器相关联。
     * 它允许您创建封装时间线动画、状态更改和同步操作的对象。
     * MovieClip类从0.7.0开始就包含在EaselJS压缩文件中。
     * 
     * 目前，MovieClip只有在基于时间（而不是基于时间）的情况下才能正常工作，尽管已经做出了一些让步，以支持未来基于时间的时间表。
     * 
     * 案例：
     * 
     * 此示例来回设置两个形状的动画。灰色形状从左侧开始，但我们使用{@link gotoAndPlay}跳到动画的中点。
     * ```js
     * var stage = new createjs.Stage("canvas");
     * createjs.Ticker.addEventListener("tick", stage);
     * 
     * var mc = new createjs.MovieClip({loop:-1, labels:{myLabel:20}});
     * stage.addChild(mc);
     * 
     * var child1 = new createjs.Shape(
     *     new createjs.Graphics().beginFill("#999999")
     *         .drawCircle(30,30,30));
     * var child2 = new createjs.Shape(
     *     new createjs.Graphics().beginFill("#5a9cfb")
     *         .drawCircle(30,30,30));
     * 
     * mc.timeline.addTween(
     *     createjs.Tween.get(child1)
     *         .to({x:0}).to({x:60}, 50).to({x:0}, 50));
     * mc.timeline.addTween(
     *     createjs.Tween.get(child2)
     *         .to({x:60}).to({x:0}, 50).to({x:60}, 50));
     * 
     * mc.gotoAndPlay("start");
     * ```
     * 建议使用tween.to()来设置动画和属性（不使用持续时间来立即设置），并使用tween.wait()方法在动画之间创建延迟。
     * 请注意，使用tween.set()方法影响属性可能无法提供所需的结果。
     */
    class MovieClip extends Container {
        /**
         * 应用于此实例的配置属性（例如{mode:MovieClip.SYNHED}）。
         * MovieClip支持的属性如下。除非指定，否则这些属性都设置在相应的实例属性上。
         * 
         * mode
         * 
         * startPosition
         * 
         * frameBounds
         * 
         * 此对象也将传递到与此MovieClip关联的Timeline实例中。有关支持的属性列表（例如paused, labels, loop, reversed等），请参阅Timeline的文档。
         * @param props 当该属性的类型是Object时，将此对象中的属性（支持的属性：mode,startPosition,loop,labels,frameBounds,paused）复制到实例中。否则，使用该值设置实例的mode属性。
         * @param startPosition 指定此影片剪辑中要播放的第一帧，或者如果模式为单帧，则指定要显示的唯一帧。
         * @param loop 指定此MovieClip应循环的次数。值-1表示它应该无限循环。值为1会导致它循环一次（即总共播放两次）。
         * @param labels 帧标签的名称。
         */
        constructor(props?: string|Object, startPosition?: number, loop?: boolean, labels?: Object);

        // properties
        /**
         * 是否执行帧代码
         * @default true
         */
        actionsEnabled: boolean;
        /**
         * 如果为true，则每当时间轴将影片剪辑添加回显示列表时，影片剪辑将自动重置为其第一帧。
         * 这仅适用于模式为"INDEPENDENT"的MovieClip实例。
         * 
         * 例如，如果你有一个角色动画，其中"body"为其子显示对象（MovieClip实例）在每一帧上都有不同的服装，
         * 你可以将body.autoReset设置为false，这样你就可以手动更改它所在的帧，而不用担心它会自动重置。
         * @default true
         */
        autoReset: boolean;
        /** 构建时间，例如：Thu, 12 Oct 2017 16:34:10 GMT */
        static buildDate: string;
        /** 返回当前帧索引。 */
        currentFrame: number;
        /** 总帧数 */
        totalFrames: number;
        /** 返回当前帧的标签名称。 */
        currentLabel: string;
        /** 每一帧的矩形边界 */
        frameBounds: Rectangle[];
        /**
         * 默认情况下，MovieClip实例每滴答前进一帧。为MovieClip指定帧率将使其根据滴答之间的经过时间适当地前进，以保持目标帧率。
         * 
         * 例如，如果将帧速率为10的MovieClip放置在以40fps更新的舞台上，则MovieClip将大约每4个滴答前进一帧。
         * 这并不准确，因为每个滴答之间的时间在帧之间会略有不同。
         * 
         * 此功能取决于传递到{@link update}中的滴答事件对象（或具有适当"delta"属性的对象）。
         */
        framerate: number;
        /**
         * MovieClip将独立于其父级前进（播放），即使其父级已暂停。这是默认模式。
         */
        static INDEPENDENT: string;
        /** 返回一个具有标签和位置（也称为帧）属性的对象数组，按位置排序。 */
        labels: Object[];
        /**
         * 指定此MovieClip应循环的次数。值-1表示它应该无限循环。值为1会导致它循环一次（即总共播放两次）。
         * @default -1
         */
        loop: number;
        /**
         * 控制此MovieClip如何推进其时间。必须是0-INDEPENDENT（独立）、1-SINGLE_FRAME（单帧）或2-SYNCHED（同步）之一。
         * 有关行为的描述，请参见每个常数。
         * @default null
         */
        mode: string;
        /**
         * 是否暂停。
         * 如果为真，则勾选后MovieClip的位置将不会前进。
         * @default false
         */
        paused: boolean;
        /**
         * MovieClip将仅显示一帧（由startPosition属性决定）。
         * @default "single"
         */
        static SINGLE_FRAME: string;
        /**
         * 指定此电影剪辑中要播放的第一帧，或者如果模式为单帧，则指定要显示的唯一帧。
         * @default 0
         */
        startPosition: number;
        /**
         * MovieClip仅在其父级前进时才会前进，并将同步到父级MovieClip的位置。
         * @default "synched"
         */
        static SYNCHED: string;
        /**
         * 与此MovieClip关联的TweenJS时间线。这是在初始化MovieClip实例时自动创建的。动画是通过将TweenJS的Tween实例添加到时间线中而创建的。
         * ### 示例
         * ```js
         * var tween = createjs.Tween.get(target).to({x:0}).to({x:100}, 30);
         * var mc = new createjs.MovieClip();
         * mc.timeline.addTween(tween);
         * ```
         * 通过使用`tweenInstance.to()`方法切换"_off"属性，可以在时间线中添加和删除元素。请注意，不建议使用`Tween.set`创建MovieClip动画。
         * 以下示例将在第1帧关闭目标，然后在第2帧重新打开。您可以使用"visible"属性来实现相同的效果。
         * ```js
         * var tween = createjs.Tween.get(target).to({_off:false})
         *     .wait(1).to({_off:true})
         *     .wait(1).to({_off:false});
         * ```
         * @default null
         */
        timeline: Timeline;
        /**
         * 返回此MovieClip的持续时间（秒或者ticks）。
         * 其实源码是返回`this.timeline.duration`
         */
        duration: number;

        static version: string;


        // methods
        /**
         * 推进时间轴（时间线）游标。默认情况下，每次tick时都会自动发生。
         * @param time 
         */
        advance(time?: number): void;
        /**
         * MovieClip实例无法克隆。
         * @deprecated - 不支持
         */
        clone(): MovieClip; // not supported
        /**
         * 将此影片剪辑前进到指定位置或标签，并将暂停设置为false。
         * @param positionOrLabel 
         */
        gotoAndPlay(positionOrLabel: string | number): void;
        /**
         * 将此影片剪辑前进到指定位置或标签，并将暂停设置为true。
         * @param positionOrLabel 
         */
        gotoAndStop(positionOrLabel: string | number): void;
        /**
         * 将暂停设置为false。
         */
        play(): void;
        /**
         * 将暂停设置为true。
         */
        stop(): void;
    }
    /**
     * 此插件与 TweenJS 配合使用，用于防止 startPosition 属性被补间动画影响。
     */
    class MovieClipPlugin {
        // methods
        tween(tween: Tween, prop: string, value: string | number | boolean, startValues: any[], endValues: any[], ratio: number, wait: Object, end: Object): void;
    }
    /**
     * 表示二维x/y坐标系上的点。
     * ### 示例
     * ```js
     * var point = new createjs.Point(0, 100);
     * ```
     */
    class Point {
        constructor(x?: number, y?: number);

        // properties
        x: number;
        y: number;

        // methods
        /**
         * 返回Point实例的克隆。
         * @returns Point实例的克隆。
         */
        clone(): Point;
        /**
         * 将所有属性从指定点复制到此点。
         * @param point 从中复制属性的点。
         * @returns 返回此Point实例。可用于链接方法调用。
         */
        copy(point: Point): Point;
        /**
         * 设置Point实例的x和y属性。
         * @param x 
         * @param y 
         * @returns 返回此Point实例。可用于链接方法调用。
         */
        setValues(x?: number, y?: number): Point;
        /**
         * 返回Point实例的字符串表示形式。
         * @returns Point实例的字符串表示形式。
         */
        toString(): string;
        /**
         * 将Point对象偏移指定的量。
         * - `dx`的值被加到`x`的原始值上，以创建新的`x`值
         * - `dy`的值被加到`y`的原始值上，以创建新的`y`值
         * @param dx 水平坐标`x`的偏移量。
         * @param dy 垂直坐标`y`的偏移量。
         * @returns 返回偏移后的Point实例。可用于链接方法调用。
         */
        offset(dx:number, dy:number):Point;
        /**
         * 确定两个指定点之间的点。在两个点之间进行插值。
         * 
         * 参数`f`确定新插值点相对于参数`pt1`和`pt2`指定的两个端点的位置：
         * - 参数`f`的值越接近1.0，插值点就越接近第一个点（参数`pt1`）。
         * - 参数`f`的值越接近0.0，插值点就越接近第二个点（参数`pt2`）。
         * 
         * @param pt1 第一个点作为点或通用对象。
         * @param pt2 第二个点作为点或通用对象。
         * @param f 两点之间的插值水平。指示新点将位于`pt1`和`pt2`之间的线上。如果`f=1`，则返回`pt1`；如果`f=0`，则返回`pt2`。
         * @param pt 将结果复制到其中的对象。如果省略，将返回一个新的点。
         * @returns 一个新的插值点，或者传入的第4个参数`pt`并带有插值后的值。
         */
        static interpolate(pt1:Point, pt2:Point, f:number, pt?:Point|Object):Point;
        /**
         * 将一对极坐标转换为笛卡尔点坐标。
         * @param len 极对的长度坐标。
         * @param angle 极对的角度，以弧度为单位。
         * @param pt 将结果复制到其中的对象。如果省略，将返回一个新点。
         * @returns 一个新的笛卡尔点，或者传入的第3个参数`pt`并带有转换后的值。
         */
        static polar(len:number, angle:number, pt?:Point|Object):Point;
    }
    /**
     * 表示由点(x,y)和(x+width,y+height)定义的矩形。
     * ### 示例
     * ```js
     * var rect = new createjs.Rectangle(0, 0, 100, 100);
     * ```
     */
    class Rectangle {
        constructor(x?: number, y?: number, width?: number, height?: number);

        // properties
        height: number;
        width: number;
        x: number;
        y: number;

        // methods
        /**
         * 返回Rectangle实例的克隆。
         * @returns Rectangle实例的克隆。
         */
        clone(): Rectangle;
        /**
         * 如果此矩形完全包围所描述的点或矩形，则返回true。
         * @param x 
         * @param y 
         * @param width 
         * @param height 
         * @returns 如果此矩形完全包围所描述的点或矩形，则返回true。
         */
        contains(x: number, y: number, width?: number, height?: number): boolean;
        /**
         * 将指定矩形的所有属性从指定矩形复制到此矩形。
         * @param rectangle 从中复制属性的矩形。
         * @returns 返回此Rectangle实例。可用于链接方法调用。
         */
        copy(rectangle: Rectangle): Rectangle;
        /**
         * 扩展此矩形的边界以包含指定点或矩形。
         * @param x 
         * @param y 
         * @param width 
         * @param height 
         * @returns 返回此Rectangle实例。可用于链接方法调用。
         */
        extend(x: number, y: number, width?: number, height?: number): Rectangle;
        /**
         * 返回一个新的矩形，描述此矩形与指定矩形的交集（重叠），如果它们不相交，则返回null。
         * @param rect 用于计算交集的矩形。
         * @returns 返回两个矩形的交集或null。
         */
        intersection(rect: Rectangle): Rectangle;
        /**
         * 如果指定的矩形与此矩形相交（有任何重叠），则返回true。
         * @param rect 用于计算相交的矩形。
         * @returns 如果指定的矩形与此矩形相交（有任何重叠），则返回true。
         */
        intersects(rect: Rectangle): boolean;
        /**
         * 如果宽度或高度等于或小于0，则返回true。
         * @returns 如果宽度或高度等于或小于0，则返回true。
         */
        isEmpty(): boolean;
        /**
         * 将指定的填充添加到矩形的边界。
         * @param top 
         * @param left 
         * @param bottom 
         * @param right 
         * @returns 返回此Rectangle实例。可用于链接方法调用。
         */
        pad(top: number, left: number, bottom: number, right: number): Rectangle;
        /**
         * 在此实例上设置指定值。
         * @param x 
         * @param y 
         * @param width 
         * @param height 
         * @returns 返回此Rectangle实例。可用于链接方法调用。
         */
        setValues(x?: number, y?: number, width?: number, height?: number): Rectangle;
        /**
         * 返回此Rectangle实例的字符串表示形式。
         * @returns 此Rectangle实例的字符串表示形式。
         */
        toString(): string;
        /**
         * 返回一个新的矩形，其中包含此矩形和指定的矩形。
         * @param rect 用于计算并集的矩形。
         * @returns 返回两个矩形的并集。
         */
        union(rect: Rectangle): Rectangle;
    }
    /**
     * 此类封装了定义阴影所需的属性，以通过`shadow`属性应用于{@link DisplayObject}。
     * ### 示例
     * ```js
     * myImage.shadow = new createjs.Shadow("#000000", 5, 5, 10);
     * ```
     */
    class Shadow {
        /**
         * 
         * @param color 阴影的颜色。这可以是任何有效的CSS颜色值。
         * @param offsetX 阴影的x偏移量（像素）。
         * @param offsetY 阴影的y偏移量（像素）。
         * @param blur 阴影的模糊量（像素）。
         */
        constructor(color: string, offsetX: number, offsetY: number, blur: number);
        // properties
        blur: number;
        /**
         * 阴影的颜色。这可以是任何有效的CSS颜色值。
         */
        color: string;
        /**
         * 标识阴影对象（所有属性都设置为0）。
         */
        static identity: Shadow;
        /**
         * 阴影的x偏移量（像素）。
         */
        offsetX: number;
        /**
         * 阴影的y偏移量（像素）。
         */
        offsetY: number;
        // methods
        clone(): Shadow;
        toString(): string;
    }
    /**
     * Shape 允许您在显示列表中显示矢量图形。它封装了一个{@link Graphics}实例，该实例提供了所有的矢量绘图方法。
     * Graphics实例可以在多个Shape实例之间共享，以显示相同的矢量图形，但具有不同的位置或变换。
     * 
     * 如果在多次绘制之间矢量图形不会发生变化，您可以使用缓存方法({@link cache})来降低渲染成本。
     * 
     * ### 示例
     * ```js
     * var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 100, 100);
     * var shape = new createjs.Shape(graphics);
     * 
     * //或者您也可以使用Shape类的graphics属性来渲染相同的图形。
     * var shape = new createjs.Shape();
     * shape.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
     * ```
     */
    class Shape extends DisplayObject {
        /**
         * 
         * @param graphics 可选参数。用于显示的 Graphics 实例。如果为 null，则会创建一个新的 Graphics 实例。
         */
        constructor(graphics?: Graphics);


        // properties
        /**
         * 用于显示的 Graphics 实例。
         */
        graphics: Graphics;
    }
    /**
     * 显示 SpriteSheet 实例中的一帧或一系列帧（例如动画）。精灵表（SpriteSheet）是将多个图像（通常是动画帧）组合成单个图像的集合。
     * 例如，一个由 8 张 100x100 图像组成的动画可以组合成一个 400x200 的精灵表（4 帧宽 x 2 帧高）。
     * 您可以显示单个帧、将帧作为动画播放，甚至可以将多个动画序列组合在一起。
     * 
     * 有关设置帧和动画的更多信息，请参阅 {@link SpriteSheet} 类。
     * 
     * ### 示例
     * ```js
     * var instance = new createjs.Sprite(spriteSheet);
     * instance.gotoAndStop("frameName");
     * ```
     * 在调用 {@link gotoAndPlay} 或 {@link gotoAndStop} 之前，只会显示精灵表中定义的第一帧。
     */
    class Sprite extends DisplayObject {
        /**
         * 
         * @param spriteSheet 用于播放的 SpriteSheet 实例。它包含源图像、帧尺寸和帧数据。有关更多信息，请参阅{@link SpriteSheet}类。
         * @param frameOrAnimation 初始播放的帧编号或动画。
         */
        constructor(spriteSheet: SpriteSheet, frameOrAnimation?: string | number);


        // properties
        /**
         * 返回当前正在播放的动画的名称。
         */
        currentAnimation: string;
        /**
         * 指定当前播放动画中的帧索引。在正常播放时，该值会从 0 增加到 n-1，其中 n 是当前动画的总帧数。
         * 
         * 如果使用基于时间的播放（见 Sprite/framerate），或者动画的速度不是整数，则该值可能为非整数。
         * @default 0
         */
        currentAnimationFrame: number;
        /**
         * 调用 draw 方法时将绘制的帧索引。请注意，对于某些{@link SpriteSheet}定义，该值可能不会按顺序递增。该值始终为整数。
         * @default 0
         */
        currentFrame: number;
        /**
         * 默认情况下，Sprite 实例每 tick 前进一帧。为 Sprite（或其相关的 SpriteSheet）指定帧率（framerate）后，它将根据 tick 之间的时间间隔来调整帧的推进，以维持目标帧率。
         * 
         * 例如，如果一个帧率为 10 的 Sprite 被放置在一个以 40fps 更新的 Stage 上，那么该 Sprite 大约每 4 个 tick 前进一帧。这并不是精确的，因为每个 tick 之间的时间间隔会略有不同。
         * 
         * 此功能依赖于将 tick 事件对象（或具有适当 "delta" 属性的对象）传递给 update 方法。
         * @default 0
         */
        framerate: number;
        /**
         * @deprecated
         */
        offset: number;
        /**
         * 阻止动画每 tick 自动推进。例如，您可以创建一个包含图标的精灵表，将 paused 设置为 true，然后通过设置`currentFrame`来显示相应的图标。
         * @default false
         */
        paused: boolean;
        /**
         * SpriteSheet 实例用于回放。它包括源图像、帧的尺寸以及帧的数据。有关更多信息，请参阅{@link SpriteSheet}。
         */
        spriteSheet: SpriteSheet;

        // methods
        /**
         * 使播放头前进。默认情况下，在每个tick都会自动发生。
         * @param time 以毫秒为单位的时间增量。仅当Sprite或其精灵表设置了帧率时适用。
         */
        advance(time?: number): void;
        /**
         * 返回一个精灵实例的克隆。请注意，克隆的实例之间共享相同的精灵表。
         * @returns 返回一个Sprite实例。
         */
        clone(): Sprite;
        /**
         * 返回一个Rectangle实例，定义Sprite实例的边界。
         */
        getBounds(): Rectangle;
        /**
         * 
         */
        gotoAndPlay(frameOrAnimation: string | number): void;
        gotoAndStop(frameOrAnimation: string | number): void;
        play(): void;

        set(props: Object): Sprite;
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): Sprite;
        stop(): void;

    }

    class SpriteContainer extends Container
    {
        constructor(spriteSheet?: SpriteSheet);

        spriteSheet: SpriteSheet;
    }

    // what is returned from SpriteSheet.getAnimation(string)
    interface SpriteSheetAnimation {
        frames: number[];
        speed: number;
        name: string;
        next: string;
    }

    // what is returned from SpriteSheet.getFrame(number)
    interface SpriteSheetFrame {
        image: HTMLImageElement;
        rect: Rectangle;
    }
    /**
     * 封装与精灵表关联的属性和方法。精灵表是一系列图像（通常是动画帧）组合成一个或多个较大的图像。例如，一个由八个100x100图像组成的动画可以组合成一个400x200的精灵表（4帧宽，2帧高）。
     * 传递给SpriteSheet构造函数的数据定义了：
     * 1.要使用的源图像。
     * 2.单个图像帧的位置。
     * 3.形成命名动画的序列帧。可选。
     * 4.目标播放帧率。可选。
     * 
     * SpriteSheet格式
     * SpriteSheets是一个具有两个必需属性（图像和帧）和两个可选属性（帧率和动画）的对象。这使得它们很容易在javascript代码或JSON中定义。
     * 
     * 图像
     * 一组源图像。图像可以是HTMlimage实例，也可以是图像的uri。建议采用前者来控制预加载。
     * 
     * 		images: [image1, "path/to/image2.png"],
     * 
     * 帧
     * 定义各个帧。帧数据支持两种格式：当所有帧的大小都相同（在网格中）时，使用具有width、height、regX、regY和count属性的对象。
     * 1.需要宽度和高度，并指定框架的尺寸
     * 2.regX和regY表示帧的注册点或"原点"
     * 3.间距表示帧之间的间距
     * 4.margin指定图像周围的边距
     * 5.count允许您指定精灵表中的总帧数；如果省略，则将基于源图像和帧的尺寸来计算。帧将根据其在源图像中的位置（从左到右，从上到下）分配索引。
     * 
     * 		frames: {width:64, height:64, count:20, regX: 32, regY:64, spacing:0, margin:0}
     * 
     * 如果帧的大小不同，请使用帧定义数组。每个定义本身都是一个数组，其中有4个必需项和3个可选项，顺序如下：
     * 1.前四个，x、y、宽度和高度是必需的，用于定义框架矩形。
     * 2.第五个参数imageIndex指定源图像的索引（默认为0）。
     * 3.最后两个regX和regY指定帧的注册点。
     * 
     * 		frames: [
     * 		    // x, y, width, height, imageIndex*, regX*, regY*
     * 		    [64, 0, 96, 64],
     * 		    [0, 0, 64, 64, 1, 32, 32]
     * 		    // etc.
     * 		]
     * 
     * 动画
     * 可选项。定义序列帧动画的名称。每个属性对应一个同名动画。每个动画必须指定要播放的帧，还可以包括相对播放速度（例如，2将以双倍速度播放，0.5以一半速度播放），以及完成后要播放的下一个动画的名称。
     * 
     * 支持三种格式来定义动画中的帧，可以根据需要进行混合和匹配：
     * 1.对于单帧动画，您可以简单地指定帧索引
     * 
     * 		animations: {
     * 		    sit: 7
     * 		}
     * 
     * 2.对于连续帧的动画，您可以使用一个数组，其中按顺序包含两个必需项和两个可选项：开始、结束、下一步和速度。这将从头到尾播放帧。
     * 
     * 		animations: {
     * 		    // start, end, next*, speed*
     * 		    run: [0, 8],
     * 		    jump: [9, 12, "run", 2]
     * 		}
     * 
     * 3.对于非连续帧，您可以使用具有frames属性的对象来定义要按顺序播放的帧索引数组。该对象还可以指定下一步和速度属性。
     * 
     * 		animations: {
     * 		    walk: {
     * 		        frames: [1,2,3,3,2,1]
     * 		    },
     * 		    shoot: {
     * 		        frames: [1,4,5,6],
     * 		        next: "walk",
     * 		        speed: 0.5
     * 		    }
     * 		}
     * 
     * 注意：速度属性是在EaselJS 0.7.0中添加的。早期版本具有频率属性，这与速度相反。例如，在早期版本中，值"4"是正常速度的1/4，但在EaselJS 0.7.0+中是正常速度的4倍。
     * 
     * 帧速率
     * 可选。指示播放此精灵表的默认帧速率，单位为每秒帧数。有关更多信息，请参阅帧率。
     * 
     * 		framerate: 20
     * 
     * 请注意，只有在Ticker生成的tick事件中提供了阶段更新方法时，Sprite帧率才有效。
     * 
     * 		createjs.Ticker.on("tick", handleTick);
     * 		function handleTick(event) {
     * 		    stage.update(event);
     * 		}
     * 
     * 案例
     * 定义一个简单的精灵表，其中一张图像"sprites.jpg"排列规格为50x50的网格中，有三个动画："站立"显示第一帧，"运行"循环第1-5帧，"跳跃"播放第6-8帧并按顺序返回运行。
     * 
     * 		var data = {
     * 		    images: ["sprites.jpg"],
     * 		    frames: {width:50, height:50},
     * 		    animations: {
     * 		        stand:0,
     * 		        run:[1,5],
     * 		        jump:[6,8,"run"]
     * 		    }
     * 		};
     * 		var spriteSheet = new createjs.SpriteSheet(data);
     * 		var animation = new createjs.Sprite(spriteSheet, "run");
     * 
     * 生成SpriteSheet图像
     * 可以通过在PhotoShop中组合图像并手动指定帧大小或坐标来手动创建Spritesheets，但是有许多工具可以帮助实现这一点。
     * 1.从Adobe Flash/Animate导出SpriteSheets或HTML5内容支持EaselJS SpriteSheet格式。
     * 2.流行的Texture Packer支持EaselJS。
     * 3.Adobe Flash/Animate中的SWF动画可以使用Zoë导出到SpriteSheets
     * 
     * 跨域问题
     * 警告：使用以下方式与交互时，跨源加载的图像将引发跨源安全错误：
     * 1.鼠标。
     * 2.如getObjectUnderPoint()方法。
     * 3.滤镜。
     * 4.缓存。
     * 
     * 在将图像传递给EaselJS之前，您可以通过在图像上设置crossOrigin属性来解决这个问题，或者在PreloadJS的LoadQueue或LoadItems上设置crossOrigin属性。
     * 
     * 		var img = new Image();
     * 		img.crossOrigin="Anonymous";
     * 		img.src = "http://server-with-CORS-support.com/path/to/image.jpg";
     * 
     * 如果将字符串路径传递给SpriteSheets，它们将无法跨域工作。存储图像的服务器必须支持跨域请求，否则将无法工作。有关更多信息，请查看MDN上的CORS概述。
     */
    class SpriteSheet extends EventDispatcher {
        /**
         * 
         * @param data 描述SpriteSheet数据的对象。
         */
        constructor(data: Object);

        // properties
        animations: string[];
        complete: boolean;
        framerate: number;

        // methods
        clone(): SpriteSheet;
        /**
         * 返回一个定义指定动画的对象。返回的对象包含：
         * @param name 
         */
        getAnimation(name: string): SpriteSheetAnimation;
        /**
         * @deprecated - 已弃用，使用'animations'属性代替
         */
        getAnimations(): string[];
        /**
         * 返回指定图像和指定帧的源矩形的对象。改对象具有如下属性：
         * 
         * 1.图像属性，保存对其中找到帧的图像对象的引用
         * 
         * 2.rect属性包含一个Rectangle实例，该实例定义了该图像中帧的边界。
         * 
         * 3.与帧的regX/Y值对应的regX和regY属性。
         * @param frameIndex 帧索引。
         */
        getFrame(frameIndex: number): SpriteSheetFrame;
        /**
         * 返回一个矩形实例，定义指定帧相对于原点的边界。例如，一个regX为50、regY为40的90 x 70帧将返回：
         * @param frameIndex 
         * @param rectangle 
         */
        getFrameBounds(frameIndex: number, rectangle?: Rectangle): Rectangle;
        getNumFrames(animation: string): number;
    }


    class SpriteSheetBuilder extends EventDispatcher {
        constructor();

        // properties
        maxHeight: number;
        maxWidth: number;
        padding: number;
        progress: number;
        scale: number;
        spriteSheet: SpriteSheet;
        timeSlice: number;

        // methods
        addAnimation(name: string, frames: number[], next?: string|boolean, frequency?: number): void;
        addFrame(source: DisplayObject, sourceRect?: Rectangle, scale?: number, setupFunction?: () => any, setupData?: Object): number;
        addMovieClip(source: MovieClip, sourceRect?: Rectangle, scale?: number, setupFunction?: () => any, setupData?: Object, labelFunction?: () => any): void;
        build(): SpriteSheet;
        buildAsync(timeSlice?: number): void;
        clone(): void; // throw error
        stopAsync(): void;
    }
    /**
     * SpriteSheetUtils类是用于处理SpriteSheets的静态方法的集合。精灵表是一系列图像（通常是动画帧）组合成规则网格上的单个图像。例如，一个由8个100x100图像组成的动画可以组合成一个400x200的精灵表（4帧宽2帧高）。SpriteSheetUtils类使用静态接口，不应实例化。
     */
    class SpriteSheetUtils {
        /**
         * @deprecated
         */
        static addFlippedFrames(spriteSheet: SpriteSheet, horizontal?: boolean, vertical?: boolean, both?: boolean): void; // deprecated
        /**
         * 将指定精灵表的一帧作为新的PNG图像返回。这可能有用的一个例子是使用spritesheet帧作为位图填充的源。
         * @param spriteSheet 从中提取帧的SpriteSheet实例。
         * @param frameOrAnimation 要提取的帧号或动画名称。如果指定了动画名称，则只会提取动画的第一帧。
         */
        static extractFrame(spriteSheet: SpriteSheet, frameOrAnimation: number | string): HTMLImageElement;
        /**
         * @deprecated
         */
        static mergeAlpha(rgbImage: HTMLImageElement, alphaImage: HTMLImageElement, canvas?: HTMLCanvasElement): HTMLCanvasElement; // deprecated
    }

    class SpriteStage extends Stage
    {
        constructor(canvas: HTMLCanvasElement | string, preserveDrawingBuffer?: boolean, antialias?: boolean);

        // properties
        static INDICES_PER_BOX: number;
        isWebGL: boolean;
        static MAX_BOXES_POINTS_INCREMENT: number;
        static MAX_INDEX_SIZE: number;
        static NUM_VERTEX_PROPERTIES: number;
        static NUM_VERTEX_PROPERTIES_PER_BOX: number;
        static POINTS_PER_BOX: number;

        // methods
        clearImageTexture(image: Object): void;
        updateViewport(width: number, height: number): void;
    }
    /**
     * Stage是显示列表的根容器。每次调用tick方法时，都会将其显示列表渲染到目标画布上。
     * 
     * #### Example
     * 这个例子创建了一个舞台，添加了一个子元素，然后使用Ticker来更新子元素并使用update重绘舞台。
     * 
     * ```js
     * var stage = new createjs.Stage("canvasElementId");
     * var image = new createjs.Bitmap("imagePath.png");
     * stage.addChild(image);
     * createjs.Ticker.addEventListener("tick", handleTick);
     * function handleTick(event) {
     *     image.x += 10;
     *     stage.update();
     * }
     * ```
     */
    class Stage extends Container {
        /**
         * 
         * @param canvas Stage将渲染到的canvas对象，或当前文档中canvas元素的字符串id。
         */
        constructor(canvas: HTMLCanvasElement | string | Object);

        // properties
        /**
         * 指示是否应在每次渲染之前自动清除画布。您可以将其设置为false以手动控制清除（例如，用于生成艺术，或当多个舞台指向同一个画布时）。
         * 
         * #### Example
         * 
         * ```js
         * var stage = new createjs.Stage("canvasId");
         * stage.autoClear = false;
         * ```
         * 
         * @default true
         */
        autoClear: boolean;
        /**
         * 舞台将渲染到的canvas对象。多个舞台可以共享一个canvas，但您必须为所有未被tick的舞台禁用autoClear（或它们将清除彼此的渲染）。
         * 
         * 当更改canvas属性时，您必须禁用旧画布上的事件，并在新画布上启用事件，否则鼠标事件将无法正常工作。例如：
         * 
         * ```js
         * myStage.enableDOMEvents(false);
         * myStage.canvas = anotherCanvas;
         * myStage.enableDOMEvents(true);
         * ```
         */
        canvas: HTMLCanvasElement | Object;
        /**
         * 指定在调用update时影响舞台的区域。这可以用于选择性地重新绘制画布的特定区域。如果为null，则绘制整个画布区域。
         */
        drawRect: Rectangle;
        /**
         * 默认事件处理程序，当收到tick事件时调用Stage update方法。这允许您直接将Stage实例注册为Ticker的事件侦听器，使用：
         * 
         * ```js
         * Ticker.addEventListener("tick", myStage);
         * ```
         * 
         * 注意：如果您使用此模式订阅tick，则tick事件对象将传递给显示对象tick处理程序，而不是delta和paused参数。
         */
        handleEvent: Function;
        /**
         * 指示鼠标是否当前位于画布的边界内。
         * @default false
         */
        mouseInBounds: boolean;
        /**
         * 如果为true，当鼠标离开目标画布时，将继续调用鼠标移动事件。请参阅mouseInBounds，以及MouseEvent x/y/rawX/rawY。
         * @default false
         */
        mouseMoveOutside: boolean;
        /**
         * 当前鼠标在画布上的x坐标。如果鼠标离开画布，这将指示画布上最近的鼠标位置，并且mouseInBounds将设置为false。
         */
        mouseX: number;
        /**
         * 当前鼠标在画布上的y坐标。如果鼠标离开画布，这将指示画布上最近的鼠标位置，并且mouseInBounds将设置为false。
         */
        mouseY: number;
        /**
         * 指定一个目标舞台，在处理鼠标/触摸交互后，将鼠标/触摸交互事件传递给它。这在您有多个分层画布并且希望用户交互事件通过时非常有用。
         * 例如，这将从topStage将鼠标事件传递给bottomStage：
         * 
         * ```js
         * topStage.nextStage = bottomStage;
         * ```
         * 
         * 要禁用传递，请将nextStage设置为null。
         * 
         * 
         * 
         * MouseOver, MouseOut, RollOver, and RollOut交互也通过使用最顶层舞台的鼠标悬停设置传递，但仅在目标舞台具有鼠标悬停交互时处理。使用relay目标时的注意事项：
         * 
         * 1.最顶层（第一个）舞台必须具有鼠标悬停交互（通过enableMouseOver）
         * 
         * 2.所有希望参与鼠标悬停交互的舞台必须通过enableMouseOver启用它们
         * 
         * 3.所有relay目标将共享最顶层舞台的频率值
         * 
         * 要说明这一点，在这个例子中，targetStage将在10hz（尽管传递30作为其期望的频率）处理鼠标悬停交互：
         * ```js
         * topStage.nextStage = targetStage;
         * topStage.enableMouseOver(10);
         * targetStage.enableMouseOver(30);
         * ```
         * 
         * 如果targetStage的canvas完全被此舞台的canvas覆盖，您可能还想通过以下方式禁用其DOM事件：
         * 
         * ```js
         * targetStage.enableDOMEvents(false);
         * ```
         */
        nextStage: Stage;
        /**
         * 如果用户点击并拖动，或双击画布，则防止选择html页面中的其他元素。通过在任何源自画布的mousedown事件（或触摸等效事件）上调用preventDefault()来实现。
         * @default true
         */
        preventSelection: boolean;
        /**
         * 指示是否应将显示对象渲染为整数像素。您可以通过将DisplayObject/snapToPixel属性设置为false来启用/禁用此行为。
         * @default false
         */
        snapToPixelEnabled: boolean;  // deprecated
        /**
         * 如果为true，则在渲染到画布之前，将在舞台上的所有显示对象上调用tick回调。
         * @default true
         */
        tickOnUpdate: boolean;

        // methods
        /**
         * 清除目标画布。如果autoClear设置为false，则非常有用。
         */
        clear(): void;
        /**
         * Stage instances cannot be cloned.
         */
        clone(): Stage;
        /**
         * 启用或禁用舞台添加到DOM元素（window，document和canvas）的事件侦听器。在处理舞台实例时，禁用事件是一个很好的实践，否则舞台将继续接收页面中的事件。

         * 当更改canvas属性时，您必须禁用旧画布上的事件，并在新画布上启用事件，否则鼠标事件将无法正常工作。例如：
         * 
         * ```js
         * myStage.enableDOMEvents(false);
         * myStage.canvas = anotherCanvas;
         * myStage.enableDOMEvents(true);
         * ```
         */
        enableDOMEvents(enable?: boolean): void;
        /**
         * 为舞台的显示列表启用或禁用（通过传递刷新频次数0）鼠标悬停（{@link mouseover}和{@link mouseout}）和滚动事件（{@link rollover}和{@link rollout}）。
         * 这些事件的性能消耗可能很高，因此在默认情况下会被禁用。可以通过可选的频率参数独立于鼠标移动事件来控制事件的频率。
         * 
         * #### Example
         * 
         * ```js
         * var stage = new createjs.Stage("canvasId");
         * stage.enableMouseOver(10); // 10 updates per second
         * ```
         * 
         * @param frequency 可选参数，指定每秒广播鼠标悬停/悬停事件的最大次数。设置为0以完全禁用鼠标悬停事件。最大值为50。较低的频率响应较慢，但使用较少的CPU。
         */
        enableMouseOver(frequency?: number): void;
        /**
         * 通过显示列表传播一个tick事件。除非tickOnUpdate设置为false，否则此方法会自动调用update。
         * 
         * 如果传递了props对象到tick()，则所有属性都将被复制到传播给侦听器的对象中。
         * 
         * 一些EaselJS中的时间相关功能（例如Sprite/framerate）需要一个tick事件对象（或具有delta属性的等效对象）作为props参数传递给tick()。例如：
         * 
         * ```js
         * Ticker.on("tick", handleTick);
         * function handleTick(evtObj) {
         *     // clone the event object from Ticker, and add some custom data to it:
         *     var evt = evtObj.clone().set({greeting:"hello", name:"world"});
         *     // pass it to stage.update():
         *     myStage.update(evt); // subsequently calls tick() with the same param
         * }

         * // ...
         * myDisplayObject.on("tick", handleDisplayObjectTick);
         * function handleDisplayObjectTick(evt) {
         *     console.log(evt.delta); // the delta property from the Ticker tick event object
         *     console.log(evt.greeting, evt.name); // custom data: "hello world"
         * }
         * ```
         * 
         * @param props 一个包含应该复制到事件对象的属性的对象。通常是一个Ticker事件对象，或者具有delta属性的类似对象。
         */
        tick(props?: Object): void;
        /**
         * Returns a data url that contains a Base64-encoded image of the contents of the stage.
         * The returned data url can be specified as the src value of an image element.
         * 
         * @param backgroundColor The background color to be used for the generated image.
         * Any valid CSS color value is allowed. The default value is a transparent background.
         * @param mimeType The MIME type of the image format to be create.
         * The default is "image/png". If an unknown MIME type is passed in,
         * or if the browser does not support the specified MIME type, the default value will be used.
         * 
         * @returns a Base64 encoded image.
         */
        toDataURL(backgroundColor?: string, mimeType?: string): string;
        /**
         * 每次调用update方法时，除非tickOnUpdate设置为false，否则舞台将调用{@link tick}，然后将显示列表渲染到画布上。
         * 
         * @param props 传递给`tick()`方法的属性对象。通常应为{@link Ticker}事件对象或包含delta属性的类似对象。
         */
        update(props?: Object): void;
    }

    interface IStageGLOptions {
        preserveBuffer?: boolean;
        antialias?: boolean;
        transparent?: boolean;
        premultiply?: boolean;
        autoPurge?: number;
    }
    /**
     * StageGL实例是WebGL优化的显示列表的根级Container，用于代替普通的Stage。
     * 这个类应该与Stage的行为相同，除了WebGL特定的功能。
     * 
     * 每次调用tick方法时，显示列表都会渲染到目标<canvas/>实例中，忽略非WebGL兼容的显示对象。
     * 在支持WebGL的设备和浏览器上，内容将自动渲染到canvas 2D上下文中。
     * 
     * #### 限制
     * 
     * - {@link Shape}、{@link Shadow} 和 {@link Text} 被添加到显示列表时不会被渲染
     * - 要显示 StageGL 无法直接渲染的内容，请使用 {@link cache} 方法缓存对象。缓存后的内容无论源内容如何都可以被渲染
     * - 图像会被包装为 WebGL 的「纹理」。每个显卡都有同时处理的纹理数量限制，过多的纹理会显著降低性能
     * - 每个缓存都算作独立纹理。因此推荐使用 SpriteSheet 和 SpriteSheetBuilder 来帮助保持较低的纹理数量
     * - 要在多个 StageGL 实例之间使用图像节点（DOM Image/Canvas 元素），必须使用克隆副本，否则 GPU 纹理加载和跟踪会出现混乱
     * - 调整画布尺寸后必须调用 updateViewport 方法，以避免缩放渲染问题。这会正确调整内存中 WebGL 上下文的尺寸
     * - 在高性能需求场景下，手动管理纹理内存可以获得最佳性能，但默认情况下会自动处理。详见 releaseTexture 方法
     * 
     * #### 示例
     * ```js
     * var stage = new createjs.StageGL("canvasElementId");
     * 
     * var image = new createjs.Bitmap("imagePath.png");
     * stage.addChild(image);
     * 
     * createjs.Ticker.on("tick", handleTick);
     * 
     * function handleTick(event) {
     *     image.x += 10;
     *     stage.update();
     * }
     * ```
     * 
     * 注意
     * - StageGL 当前未包含在 EaselJS 的压缩版本中。
     * - SpriteContainer（之前 EaselJS 中使用 WebGL 的方式）已被弃用。
     * - 早期 EaselJS 中的 WebGL 支持（如 SpriteStage 和 SpriteContainer）对每个容器中的图像数量有严格限制，这些问题现已解决。
     */
    class StageGL extends Stage {
        /**
         * 
         * @param canvas StageGL将渲染到的canvas对象，或当前DOM中canvas元素的字符串ID
         * @param options 包含所有选项参数的引用对象，部分选项可能不被某些浏览器支持
         * - [preserveBuffer=false] 布尔值 可选
         * 如果为true，WebGL不会自动清除画布（规范不建议设置为true）。这在需要保持绘制效果持久时有用
         * 
         * - [antialias=false] 布尔值 可选
         * 指定浏览器的WebGL实现是否尝试执行抗锯齿。同时会在2的幂次纹理上启用线性像素采样（使图像更平滑）
         * 
         * - [transparent=false] 布尔值 可选
         * 如果为true，画布将透明。这会显著增加性能开销，需谨慎使用
         * 
         * - [premultiply=false] 布尔值 可选
         * 改变颜色处理方式。如果为true，假设着色器必须处理预乘alpha。这有助于避免某些资源的视觉光晕效果，但也可能导致其他资源出现问题
         * 
         * - [autoPurge=1200] 整数 可选
         * 系统应自动通过purgeTextures(autoPurge)每autoPurge/2次绘制后清理未使用纹理的频率。参见purgeTextures方法获取更多信息
         */
        constructor(canvas: HTMLCanvasElement | string | Object, options?: IStageGLOptions);

        // properties
        /**
         * 每个顶点定义的属性数量（x, y, textureU, textureV, textureIndex, alpha）
         * @default 6
         */
        static VERTEX_PROPERTY_COUNT: number;
        /**
         * 形成一个Card所需的三角形索引数量。每个三角形3个索引，2个三角形。
         * @default 6
         */
        static INDICIES_PER_CARD: number;
        /**
         * 默认情况下，我们希望在一批中处理的卡牌的最大数量。参见WEBGL_MAX_INDEX_NUM获取硬限制。
         * @default 10000
         */
        static DEFAULT_MAX_BATCH_SIZE: number;
        /**
         * WebGL允许的最大元素索引数量。使用16位无符号整数。形成一个唯一的Card需要6个索引。
         * @default 65536
         */
        static WEBGL_MAX_INDEX_NUM: number;
        /**
         * 默认U/V矩形，用于处理从图像源的完全覆盖。
         * @default {t:0, l:0, b:1, r:1}
         */
        static UV_RECT: number;
        /**
         * 用于覆盖整个渲染的Card的顶点位置。主要用于渲染目标。
         */
        static COVER_VERT: Float32Array;
        /**
         * {@link COVER_VERT}的U/V。
         */
        static COVER_UV: Float32Array;
        /**
         * StageGL中COVER_VERT属性的翻转U/V坐标。
         */
        static COVER_UV_FLIP: Float32Array;
        /**
         * 包含在顶点和片段着色器中的"varying"属性。regular着色器设计为渲染所有预期的对象。着色器代码可能包含在预编译时替换的模板。
         */
        static REGULAR_VARYING_HEADER: string;
        /**
         * 顶点着色器的完整头文件。包括varying头文件。regular着色器设计为渲染所有预期的对象。着色器代码可能包含在预编译时替换的模板。
         */
        static REGULAR_VERTEX_HEADER: string;
        /**
         * 片段着色器的完整头文件。包括varying头文件。regular着色器设计为渲染所有预期的对象。着色器代码可能包含在预编译时替换的模板。
         */
        static REGULAR_FRAGMENT_HEADER: string;
        /**
         * 顶点着色器的主体部分。常规着色器设计用于渲染所有预期的对象。着色器代码可能包含在预编译时被替换的模板。
         */
        static REGULAR_VERTEX_BODY: string;
        /**
         * 片段着色器的正文。regular着色器设计为渲染所有预期的对象。着色器代码可能包含在预编译时替换的模板。
         */
        static REGULAR_FRAGMENT_BODY: string;
        static REGULAR_FRAG_COLOR_NORMAL: string;
        static REGULAR_FRAG_COLOR_PREMULTIPLY: string;
        static PARTICLE_VERTEX_BODY: string;
        static PARTICLE_FRAGMENT_BODY: string;
        /**
         * 包含在顶点和片段着色器中的"varying"属性。cover着色器设计为简单的顶点/uv仅纹理渲染，覆盖渲染表面。着色器代码可能包含在预编译时替换的模板。
         */
        static COVER_VARYING_HEADER: string;
        /**
         * 顶点着色器的完整头文件。包括varying头文件。cover着色器设计为简单的顶点/uv仅纹理渲染，覆盖渲染表面。着色器代码可能包含在预编译时替换的模板。
         */
        static COVER_VERTEX_HEADER: string;
        /**
         * 片段着色器的完整头文件。包括varying头文件。cover着色器设计为简单的顶点/uv仅纹理渲染，覆盖渲染表面。着色器代码可能包含在预编译时替换的模板。
         */
        static COVER_FRAGMENT_HEADER: string;
        /**
         * 顶点着色器的正文。cover着色器设计为简单的顶点/uv仅纹理渲染，覆盖渲染表面。着色器代码可能包含在预编译时替换的模板。
         */
        static COVER_VERTEX_BODY: string;
        /**
         * 片段着色器的正文。cover着色器设计为简单的顶点/uv仅纹理渲染，覆盖渲染表面。着色器代码可能包含在预编译时替换的模板。
         */
        static COVER_FRAGMENT_BODY: string;
        isWebGL: boolean;
        autoPurge: number;
        vocalDebug: boolean;

        // methods
        static buildUVRects(spritesheet: SpriteSheet, target?: number, onlyTarget?: boolean): Object;
        static isWebGLActive(ctx: CanvasRenderingContext2D): boolean;
        cacheDraw(target: DisplayObject, filters: Filter[], manager: BitmapCache): boolean;
        getBaseTexture(w?: number, h?: number): WebGLTexture | null;
        getFilterShader(filter: Filter | Object): WebGLProgram;
        getRenderBufferTexture (w: number, h: number): WebGLTexture;
        getTargetRenderTexture (target: DisplayObject, w: number, h: number): Object;
        protectTextureSlot(id: number, lock?: boolean): void;
        purgeTextures(count?: number): void;
        releaseTexture(item: DisplayObject | WebGLTexture | HTMLImageElement | HTMLCanvasElement): void;
        setTextureParams(gl: WebGLRenderingContext, isPOT?: boolean): void;
        updateSimultaneousTextureCount(count?: number): void;
        updateViewport(width: number, height: number): void;
        setClearColor(color:string|number):void;
    }

    /**
     * 显示一行或多行动态文本（不可由用户编辑）。
     * 支持基本的换行（使用lineWidth），仅在空格和制表符上换行。
     * 注意，您可以使用{@link DOMElement}将HTML文本显示在canvas的上方或下方，通过{@link localToGlobal}方法定位，以此作为输入文本使用。
     * 
     * **注意，Text不支持HTML文本，并且一个Text实例只能显示一种字体样式。** 要使用多种字体样式，您需要创建多个Text实例，并手动定位它们。
     * 
     * #### 示例
     * ```js
     * var text = new createjs.Text("Hello World", "20px Arial", "#ff7700");
     * text.x = 100;
     * text.textBaseline = "alphabetic";
     * ```
     * CreateJS Text支持web字体（与Canvas的规则相同）。字体必须加载并由浏览器支持才能显示。
     * 
     * **注意：** 渲染文本可能比较消耗性能，因此尽可能缓存实例。请注意，并非所有浏览器都会呈现完全相同的文本。
     */
    class Text extends DisplayObject {
        /**
         * 
         * @param text 显示的文本
         * @param font 要使用的字体样式。CSS字体属性的任何有效值都是可以接受的（例如"bold 36px Arial"）。
         * @param color 用于绘制文本的颜色。CSS颜色属性的任何有效值都是可接受的（例如"#F00"、"red"或"#FF0000"）。
         */
        constructor(text?: string, font?: string, color?: string);

        // properties
        /** 用于绘制文本的颜色。CSS颜色属性的任何有效值都是可接受的（例如"#F00"）。默认值为"#000"。它还将接受有效的canvas fillStyle值。 */
        color: string;
        /** 要使用的字体样式。CSS字体属性的任何有效值都是可以接受的（例如"bold 36px Arial"）。 */
        font: string;
        /** 指示多行文本的行高（基线之间的垂直距离）。如果为null或0，则使用getMeasuredLineHeight的值。 */
        lineHeight: number;
        /** 指示一行文本在换行为多行之前的最大宽度。如果为null，则不会对文本进行包装。 */
        lineWidth: number;
        /** 绘制文本的最大宽度。如果指定了maxWidth（非空），文本将被压缩或缩小以适应此宽度。有关详细信息，请查看[whatwg](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-styles)规范。 */
        maxWidth: number;
        /** 如果大于0，文本将绘制为指定宽度的笔划（轮廓）。 */
        outline: number;
        /** 要显示的文本。 */
        text: string;
        /** 水平文本对齐方式。"start"、"end"、"left"、"right"和"center"中的任意一个。有关详细信息，请查看whatwg规范。默认值为"left"。 */
        textAlign: string;
        /**
         * 字体上的垂直对齐点。可选值包括"top"（顶部）、"hanging"（悬挂）、"middle"（中间）、"alphabetic"（字母基线）、"ideographic"（表意基线）或"bottom"（底部）。有关详细信息请查看whatwg规范。默认值为"top"。
         */
        textBaseline: string;

        // methods
        clone(): Text;
        /**
         * 返回多行文本的近似高度，通过将行数乘以lineHeight（如果指定）或getMeasuredLineHeight。注意，此操作需要运行文本流动逻辑，这会带来相关的CPU成本。
         * @returns 未变换的多行文本的近似高度。
         */
        getMeasuredHeight(): number;
        /**
         * 返回文本的近似行高，忽略lineHeight属性。这是基于测量一个"M"字符的宽度乘以1.2，为大多数字体提供一个近似的行高。
         * @returns 返回文本的近似行高，忽略lineHeight属性。
         * 该值基于字符"M"的测量宽度乘以1.2计算得出，该计算方式可近似表示大多数字体的em单位。
         */
        getMeasuredLineHeight(): number;
        /**
         * 返回未换行的文本的测量宽度。使用getBounds获取更可靠的值。
         * @returns 未换行的文本的测量宽度。
         */
        getMeasuredWidth(): number;
        /**
         * 返回一个包含width、height和lines属性的对象。width和height是绘制文本的视觉宽度和高度。lines属性包含一个字符串数组，每个字符串代表将绘制的文本行，考虑到换行和换行。这些字符串没有尾随空白。
         * @returns 一个包含width、height和lines属性的对象。
         */
        getMetrics(): Object;
        /**
         * 提供一个链式快捷方法，用于在实例上设置多个属性。
         * 
         * #### 示例
         * ```js
         * var myGraphics = new createjs.Graphics().beginFill("#ff0000").drawCircle(0, 0, 25);
         * var shape = stage.addChild(new Shape()).set({graphics:myGraphics, x:100, y:100, alpha:0.5});
         * ```
         * @param props 一个包含要复制到DisplayObject实例的属性的通用对象。
         * @returns 返回方法调用的实例（用于链式调用）。
         */
        set(props: Object): Text;
    }
    /**
     * Ticker 提供了一个以固定间隔触发的集中化计时器或心跳广播。监听器可以订阅 tick 事件，以便在设定的时间间隔过去时接收到通知。
     * 
     * 注意，Ticker.framerate = 30; 是目标间隔，当CPU负载较高时，可能会以较慢的间隔广播。Ticker类使用静态接口（例如Ticker.framerate = 30;），不能实例化。
     * 
     * #### 案例
     * ```js
     * createjs.Ticker.addEventListener("tick", handleTick);
     * function handleTick(event) {
     *     // Actions carried out each tick (aka frame)
     *     if (!event.paused) {
     *         // Actions carried out when the Ticker is not paused.
     *     }
     * }
     * ```
     * 
     */
    class Ticker {
        // properties
        /**
         * 指示目标帧率（FPS）。实际上只是interval的快捷方式，其中framerate == 1000/interval。
         */
        static framerate: number;
        /**
         * 指示目标时间（以毫秒为单位）之间的间隔。默认值为50（20 FPS）。
         * 注意，实际的tick间隔可能会比指定的间隔更大，具体取决于CPU负载。如果ticker使用RAF计时模式，则忽略此属性。
         */
        static interval: number;
        /**
         * 指定tick事件对象中delta属性的最大值。
         * 这在构建基于时间的动画和系统时非常有用，可以防止因后台标签页、系统休眠、弹窗对话框或其他阻塞性程序导致的大时间间隔问题。
         * 通常将预期帧时长的两倍作为有效值（例如在40fps运行时设置maxDelta=50）。
         * 
         * 这不会影响其他值（如time、runTime等），因此如果在同时使用delta和其他值时启用maxDelta，可能会遇到问题。
         * 
         * 如果设为0，则表示没有最大值限制。
         * @default 0
         */
        static maxDelta: number;
        /**
         * 当ticker暂停时，所有侦听器仍会收到tick事件，但事件的paused属性为true。
         * 
         * #### 案例
         * ```js
         * createjs.Ticker.addEventListener("tick", handleTick);
         * createjs.Ticker.paused = true;
         * function handleTick(event) {
         *     console.log(event.paused,
         *         createjs.Ticker.getTime(false),
         *         createjs.Ticker.getTime(true));
         * }
         * ```
         * @default false
         */
        static paused: boolean;
        /**
         * 在这种模式下，Ticker会传递requestAnimationFrame心跳，完全忽略目标帧率。
         * 因为requestAnimationFrame的频率是不确定的，任何使用这种模式的内容都应该基于时间。
         * 您可以利用getTime和tick事件对象的"delta"属性来简化这一点。
         * 
         * 如果requestAnimationFrame API不支持，则回退到TIMEOUT。
         * @default "raf"
         */
        static RAF: string;
        /**
         * 在这种模式下，Ticker使用requestAnimationFrame API，但尝试将ticks同步到目标帧率。
         * 它使用一个简单的启发式方法，比较RAF返回的时间与当前帧的目标时间，并在时间在某个阈值内时调度tick。
         * 
         * 这种模式的时间间隔方差比TIMEOUT更高，但不需要内容基于时间，同时获得该API（屏幕同步、后台限制）的好处。
         * 
         * 通常，这种模式在RAF频率的除数时，时间间隔的方差最低。通常是60，所以10、12、15、20和30的帧率效果很好。
         * 
         * 如果requestAnimationFrame API不支持，则回退到TIMEOUT。
         * 
         * @default "synched"
         */
        static RAF_SYNCHED: string;
        /**
         * 在这种模式下，Ticker使用setTimeout API。
         * 这种模式提供可预测的、自适应的帧定时，但不会提供requestAnimationFrame的优点（屏幕同步、后台限制）。
         * 
         * @default "timeout"
         */
        static TIMEOUT: string;
        /**
         * 指定使用的计时API（setTimeout或requestAnimationFrame）和模式。
         * 请参阅TIMEOUT、RAF和RAF_SYNCHED以获取模式详细信息。
         * 
         * @default Ticker.TIMEOUT
         */
        static timingMode: string;

        // methods
        /**
         * 类似于{@link getTime}方法，但返回最近一次{@link tick}事件对象的时间。
         * @param runTime 如果为true，则返回runTime属性，否则返回time属性。
         * @returns 返回最近tick事件中的time或runTime属性，如果没有则返回-1。
         */
        static getEventTime(runTime?: boolean): number;
        /**
         * @deprecated - 请改用 {@link framerate} 属性
         */
        static getFPS(): number;
        /**
         * @deprecated - 请改用 {@link interval} 属性
         */
        static getInterval(): number;
        /**
         * 返回实际的帧/秒。
         * @param ticks 要测量的历史tick数量，用于计算实际帧数/每秒tick数。默认为每秒的tick数量。
         * @returns 实际的帧/秒。根据性能，这可能与目标帧/秒不同。
         */
        static getMeasuredFPS(ticks?: number): number;
        /**
         * 返回一个tick中花费的平均时间。这可能与{@link getMeasuredFPS}返回的值有很大差异，因为它只测量在tick执行堆栈中花费的时间。
         * 
         * 示例1：目标帧率为20，getMeasuredFPS()返回20fps，表示一个tick结束和下一个tick结束之间的平均时间为50ms。
         * 然而，getMeasuredTickTime返回15ms。这表明在tick结束和下一个tick结束之间可能存在35ms的“空闲”时间。
         * 
         * 示例2：目标帧率为30，framerate返回10fps，表示一个tick结束和下一个tick结束之间的平均时间为100ms。
         * 然而，getMeasuredTickTime返回20ms。这表明除了tick之外，还有其他东西正在使用~80ms（另一个脚本、DOM渲染等）。
         * @param ticks 用于计算单个tick平均耗时的历史tick次数。默认为每秒的tick次数。若仅需获取最后一次tick的耗时，可传入1。
         * @returns 以毫秒为单位的tick中花费的平均时间。
         */
        static getMeasuredTickTime(ticks?: number): number;
        /**
         * @deprecated - 请改用 {@link paused} 属性
         */
        static getPaused(): boolean;
        /**
         * 返回Ticker广播的tick次数。
         * @param pauseable 指示是否包括Ticker暂停期间广播的tick。如果为true，则仅返回Ticker未暂停期间广播的tick事件。如果为false，则包括Ticker暂停期间广播的tick事件。默认值为false。
         * @returns 广播的tick次数。
         */
        static getTicks(pauseable?: boolean): number;
        /**
         * 返回自Ticker初始化以来经过的毫秒数。如果Ticker未初始化，则返回-1。例如，您可以在时间同步动画中使用此方法来确定确切的时间流逝。
         * @param runTime 如果为true，则仅返回Ticker未暂停期间经过的时间。如果为false，则返回自第一个tick事件侦听器添加以来经过的总时间。
         * @returns 自Ticker初始化以来经过的毫秒数，或-1。
         */
        static getTime(runTime?: boolean): number;
        /**
         * 开始tick。当第一个侦听器添加时自动调用。
         */
        static init(): void;
        /**
         * 停止Ticker并移除所有侦听器。使用init()重新启动Ticker。
         */
        static reset(): void;
        /**
         * @deprecated - 请改用 {@link framerate} 属性
         */
        static setFPS(value: number): void;
        /**
         * @deprecated - 请改用 {@link interval} 属性
         */
        static setInterval(interval: number): void;
        /**
         * @deprecated - 请改用 {@link paused} 属性
         */
        static setPaused(value: boolean): void;

        // EventDispatcher mixins
        /*static addEventListener(type: string, listener: Stage, useCapture?: boolean): Stage;
        static addEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): Function;
        static addEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): Function;
        static addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): Object;
        static addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): Object;
        static dispatchEvent(eventObj: Object | string | Event, target?: Object): boolean;
        static hasEventListener(type: string): boolean;
        static off(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
        static off(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        static off(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
        static off(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        static off(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"

        static on(type: string, listener: (eventObj: Object) => boolean, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        static on(type: string, listener: (eventObj: Object) => void, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        static on(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        static on(type: string, listener: { handleEvent: (eventObj: Object) => void; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        static removeAllEventListeners(type?: string): void;
        static removeEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        static toString(): string;
        static willTrigger(type: string): boolean;*/
    }
    /**
     * 目前没有TickerEvent的定义
     */
    class TickerEvent {
        // properties
        target: Object;
        type: string;
        paused: boolean;
        delta: number;
        time: number;
        runTime: number;
    }
    /**
     * EaselJS中支持多点触摸设备的全局实用程序。目前支持W3C Touch API（iOS和现代Android浏览器）和Pointer API（IE），包括IE10中的ms-prefixed事件，以及IE11中的unfixed事件。
     * 
     * 在清理应用程序时确保禁用触摸。启用它前，您不必检查是否支持触摸，因为如果不支持触摸，它将失效。
     * 案例：
     * ```js
     * var stage = new createjs.Stage("canvasId");
     * createjs.Touch.enable(stage);
     * ```
     * 注意：当舞台不需要触摸功能时，禁用Touch非常重要：
     * ```js
     * createjs.Touch.disable(stage);
     * ```
     */
    class Touch {
        // methods
        /**
         * 调用该方法将会移除所有注册在canvas（stage.canvas）的触摸事件（包含touchstart、touchmove、touchend、touchcancel）侦听器。
         * @param stage 目标舞台。
         */
        static disable(stage: Stage): void;
        /**
         * 为舞台启用触摸事件交互，目前支持iOS（以及兼容的浏览器，如现代Android浏览器）和IE10/11。支持单点触控和多点触控模式。扩展了EaselJS {@link MouseEvent}模型，但不支持双击或over/out事件。有关详细信息，请参阅MouseEvent MouseEvent/pointerId:属性。
         * @param stage 启用触摸事件交互的舞台。
         * @param singleTouch 是否单点触摸模式，默认是false。
         * @param allowDefault 如果为真，则当用户与目标画布交互时，将允许默认手势操作（例如滚动、缩放），默认是false。
         * @returns 如果在目标舞台上成功启用了触摸，则返回true。
         */
        static enable(stage: Stage, singleTouch?: boolean, allowDefault?: boolean): boolean;
        /**
         * 如果当前浏览器支持触摸，则返回true。
         * @returns 指示当前浏览器是否支持触摸。
         */
        static isSupported(): boolean;
    }
    /**
     * 用于生成连续唯一ID号的全局实用程序。UID类使用静态接口（例如UID.get()），不应实例化。
     */
    class UID {
        // methods
        /**
         * 返回下一个唯一id。
         * @returns 下一个唯一id
         */
        static get(): number;
    }
    /**
     * 一个用于处理数值型CSS字符串属性（例如 top、left）的TweenJS插件。使用前只需在TweenJS加载完成后安装即可：
     * ```js
     * createjs.CSSPlugin.install();
     * ```
     * CSSPlugin几乎可以处理任何样式属性或单位。它通过在元素的style对象上查找初始值来识别CSS值。它还使用这个初始值来解析出要使用的单位。
     * 
     * 在以下示例中，top将使用em单位作为样式进行补间，但width不会作为样式进行补间（因为没有初始的内联样式值）。
     * 
     * ```js
     * myEl.style.top = "10em";
     * createjs.Tween.get(myEl).to({top:20, width:100}, 1000);
     * ```
     * CSSPlugin可以也使用计算样式。请查看AbstractTween/compute:property了解更多信息。
     * 
     * CSSPlugin对transform样式有特定的处理，只要它们的操作和单位匹配，就会补间任何变换。例如：
     * 
     * ```js
     * myEl.style.transform = "translate(20px, 30px)";
     * createjs.Tween.get(myEl)
     *     .to({transform: "translate(40px, 50px)"}, 900) // would be tweened, everything matches
     *     .to({transform: "translate(5em, 300px)"}, 900) // would NOT be tweened, different units (px vs em)
     *     .to({transform: "scaleX(2)"}, 900) // would NOT be tweened, different operations (translate vs rotate)
     * ```
     * 你也可以使用*来复制前一个变换中的操作。
     * 
     * ```js
     * myEl.style.transform = "translate(0px, 0px) rotate(0deg)";
     * createjs.Tween.get(myEl)
     *     .to({transform: "translate(50px, 50px) *"}, 900) // would copy the "rotate" operation
     *     .to({transform: "* rotate(90deg)"}, 900) // would copy the "translate" operation
     * ```
     * 
     * 请注意，CSS插件未包含在TweenJS压缩文件中。
     */
    class CSSPlugin {
        constructor();

        // properties
        /**
         * 默认情况下，CSSPlugin仅使用目标元素的内联样式（即通过style属性、`style`属性或`cssText`设置）来确定哪些属性应通过CSS进行补间动画，以及使用何种单位。
         * 
         * 设置`compute`为`true`会使CSSPlugin使用`getComputedStyle`来确定哪些属性应通过CSS进行补间动画，以及使用何种单位。
         * 
         * 使用`getComputedStyle`的优点是它包括所有影响目标元素的样式，然而也有一些重要的考虑因素：
         * 
         * - `getComputedStyle`是计算密集型的，如果同时创建大量补间动画，可能会导致性能问题。
         * - 样式被规范化。例如，指定为百分比的宽度值可能会计算为`px`，CSSPlugin将使用该值进行补间动画。不同的浏览器可能会以不同的方式规范化值。
         * - 有大量的计算样式，这增加了属性被识别为样式的机会。
         * - 不适用于IE8或更低版本。
         * 
         * 可以在每个补间的基础上通过设置`tween.pluginData.CSS_compute`来覆盖此设置。例如，要为新的补间启用计算样式，可以使用：
         * 要为新的补间启用计算样式，可以使用：
         * 
         * ```js
         * createjs.Tween.get(el, {pluginData:{CSS_compute:true}}).to({top:20}, 1000);
         * ```
         * 
         * 考虑到计算的考虑，建议您保持默认的全局设置为false，并通过pluginData覆盖特定情况。
         * @default false
         */
        static compute:boolean;
        /**
         * 只读。此插件的唯一标识字符串。TweenJS使用此属性来确保不会在补间动画上重复安装同一插件。
         */
        static readonly ID:string;
        /**
         * 只读。用于匹配CSS值的正则表达式。
         */
        static readonly VALUE_RE: RegExp;

        // methods
        /**
         * 在补间更新属性之前调用。更多信息请查看{@link change}方法。
         * @param tween 
         * @param step 
         * @param prop 
         * @param value 
         * @param ratio 
         * @param end 
         * @returns 
         */
        static change(tween:Tween, step:any, prop:string, value:any, ratio:number, end:boolean):any;
        /**
         * 当TweenJS在补间上初始化新属性时调用。更多信息请查看{@link init}方法。
         * @param tween 
         * @param prop 
         * @param value 
         * @returns 
         */
        static init(tween:Tween, prop:string, value:any):any;
        /**
         * 安装此插件以用于TweenJS。在TweenJS加载后只需调用一次即可启用此插件。
         */
        static install(): void;
        /**
         * 当补间添加新步骤时调用（例如添加新的"to"动作）。更多信息请查看{@link step}方法。
         * @param tween 
         * @param step 
         * @param props 
         */
        static step(tween:Tween, step:any, props:any):void;
    }
    /**
     * 当HTML视频进行搜索时，包括循环时，在新帧可用之前有一段不确定的时间。这可能会导致视频在绘制到画布上时闪烁或闪烁。VideoBuffer类通过将每一帧绘制到屏幕外画布并在寻道过程中保留前一帧来解决这个问题。
     * ```js
     * var myBuffer = new createjs.VideoBuffer(myVideo);
     * var myBitmap = new Bitmap(myBuffer);
     * ```
     */
    class VideoBuffer{
        /**
         * 
         * @param video 要缓冲的HTML视频元素。
         */
        constructor(video: HTMLVideoElement);
        // methods
        /**
         * 获取一个HTML画布元素，显示当前视频帧，或者在寻道/循环中显示前一帧。主要用于位图。
         * @returns 画布元素
         */
        getImage(): HTMLCanvasElement;
    }
    /**
     * Ease类提供了一组缓动函数，用于TweenJS的补间动画。
     * 它不使用标准的4参数缓动签名。
     * 相反，它使用一个参数，表示当前补间动画的线性比例（0到1）。
     * 
     * 大多数Ease类的方法可以直接作为缓动函数传递：
     * 
     * ```js
     * createjs.Tween.get(target).to({x:100}, 500, createjs.Ease.linear);
     * ```
     * 
     * 然而，以"get"开头的方法将返回一个基于参数值的缓动函数：
     * 
     * ```js
     * createjs.Tween.get(target).to({y:200}, 500, createjs.Ease.getPowIn(2.2));
     * ```
     * 
     * 请查看TweenJS.com上的spark表示例，了解不同缓动类型的概述。
     * 
     * *Equations derived from work by Robert Penner.*
     */
    class Ease {
        // methods
        static backIn: (amount: number) => number;
        static backInOut: (amount: number) => number;
        static backOut: (amount: number) => number;
        static bounceIn: (amount: number) => number;
        static bounceInOut: (amount: number) => number;
        static bounceOut: (amount: number) => number;
        static circIn: (amount: number) => number;
        static circInOut: (amount: number) => number;
        static circOut: (amount: number) => number;
        static cubicIn: (amount: number) => number;
        static cubicInOut: (amount: number) => number;
        static cubicOut: (amount: number) => number;
        static elasticIn: (amount: number) => number;
        static elasticInOut: (amount: number) => number;
        static elasticOut: (amount: number) => number;
        /**
         * 模仿Adobe Flash/Animate中的简单-100到100缓动。
         * @param amount 一个从-1（缓入）到1（缓出）的值，表示缓动的强度和方向。
         * @returns 缓动函数
         */
        static get(amount: number): (amount: number) => number;
        /**
         * 可配置的"back in"缓动。
         * @param amount 缓动的强度。
         * @returns 缓动函数
         */
        static getBackIn(amount: number): (amount: number) => number;
        /**
         * 可配置的"back in out"缓动。
         * @param amount 缓动的强度。
         * @returns 缓动函数
         */
        static getBackInOut(amount: number): (amount: number) => number;
        /**
         * 可配置的"back out"缓动。
         * @param amount 缓动的强度。
         * @returns 缓动函数
         */
        static getBackOut(amount: number): (amount: number) => number;
        /**
         * 可配置的弹性缓动。
         * @param amplitude 振幅。
         * @param period 周期。
         * @returns 缓动函数
         */
        static getElasticIn(amplitude: number, period: number): (amount: number) => number;
        /**
         * 可配置的弹性缓动。
         * @param amplitude 振幅。
         * @param period 周期。
         * @returns 缓动函数
         */
        static getElasticInOut(amplitude: number, period: number): (amount: number) => number;
        /**
         * 可配置的弹性缓动。
         * @param amplitude 振幅。
         * @param period 周期。
         * @returns 缓动函数
         */
        static getElasticOut(amplitude: number, period: number): (amount: number) => number;
        /**
         * 可配置的指数缓动。
         * @param pow The exponent to use (ex. 3 would return a cubic ease).
         * @returns 缓动函数
         */
        static getPowOut(pow: number): (amount: number) => number;
        /**
         * 可配置的指数缓动。
         * @param pow 使用的幂（例如3将返回一个立方缓动）。
         * @returns 缓动函数
         */
        static getPowInOut(pow: number): (amount: number) => number;
        /**
         * 可配置的指数缓动。
         * @param pow 使用的幂（例如3将返回一个立方缓动）。
         * @returns 缓动函数
         */
        static getPowOut(pow: number): (amount: number) => number;
        static linear: (amount: number) => number;
        /**
         * 与linear相同。
         * @param amount 
         * @returns 
         */
        static none: (amount: number) => number;    // same as linear
        static quadIn: (amount: number) => number;
        static quadInOut: (amount: number) => number;
        static quadOut: (amount: number) => number;
        static quartIn: (amount: number) => number;
        static quartInOut: (amount: number) => number;
        static quartOut: (amount: number) => number;
        static quintIn: (amount: number) => number;
        static quintInOut: (amount: number) => number;
        static quintOut: (amount: number) => number;
        static sineIn: (amount: number) => number;
        static sineInOut: (amount: number) => number;
        static sineOut: (amount: number) => number;
    }
    /**
     * TweenJS 的运动引导插件，用于定义对象可以跟随或沿其定向的路径。
     * 
     * 使用此插件前，需在TweenJS加载完成后安装。要定义路径，请添加
     * ```js
     * createjs.MotionGuidePlugin.install();
     * ```
     * 
     * #### 示例
     * ```js
     * // Using a Motion Guide
     * createjs.Tween.get(target).to({guide:{ path:[0,0, 0,200,200,200, 200,0,0,0] }},7000);
     * // Visualizing the line
     * graphics.moveTo(0,0).curveTo(0,200,200,200).curveTo(200,0,0,0);
     * ```
     * 
     * 每条路径需要预先计算，以确保有快速的性能。由于预先计算，因此没有内置支持在tween过程中更改路径。这些是Guide对象的属性：
     * - path: 必填，数组 : 用于通过moveTo和1到n次curveTo调用绘制路径的x/y坐标点。
     * - start: 可选，0-1 : 初始位置，默认0，除非沿同一路径继续。
     * - end: 可选，0-1 : 最终位置，默认1，如果没有指定。
     * - orient: 可选，字符串 : "fixed"/"auto"/"cw"/"ccw"
     *   - "fixed" 强制对象在整个移动过程中始终面向路径方向（相对于起始旋转角度），
     *   - "auto" 沿路径相对线旋转对象，
     *   - "cw"/"ccw" 强制顺时针或逆时针旋转，包括Adobe Flash/Animate-like行为。这可能会覆盖你的结束旋转值。
     * 
     * Guide对象不应在tweens之间共享，即使所有属性都相同，库在后台存储这些对象的信息，共享它们可能会导致意外行为。
     * tweens范围外的值将基于定义的曲线部分进行“最佳猜测”。
     */
    class MotionGuidePlugin {
        //properties
        /**
         * 只读属性。该插件的唯一标识字符串。被TweenJS用来确保不会在同一个补间动画上重复安装插件。
         */
        static readonly ID: string;
        //methods
        /**
         * 在补间更新属性之前调用。更多信息请查看{@link SamplePlugin.change | change}方法。
         * @param tween 
         * @param step 
         * @param prop 
         * @param value 
         * @param ratio 
         * @param end 
         */
        change(tween:Tween, step:any, prop:string, value:any, ratio:number, end:boolean):any;
        /**
         * 当TweenJS在补间上初始化新属性时调用。更多信息请查看{@link init}方法。
         * @param tween 
         * @param prop 
         * @param value 
         */
        static init(tween:Tween, prop:string, value:any):any;
        /**
         * 安装此插件以用于TweenJS。在TweenJS加载后只需调用一次即可启用此插件。
         */
        static install(): void;
        /**
         * 当补间添加新步骤时调用（即，向补间添加新的“to”操作）。更多信息请查看{@link step}方法。
         * @param tween 
         * @param step 
         * @param props 
         */
        static step(tween:Tween, step:any, props:any):void;
    }
    /**
     * PreloadJS 插件提供了一种将功能注入 PreloadJS 的方式，以加载 PreloadJS 不支持的文件类型，或者以 PreloadJS 不支持的方式进行加载。
     * 
     * #### 请注意，这个类主要用于文档说明，并不是一个真正的插件。
     * 
     * 插件是基于文件扩展名或支持的预加载类型进行注册的，这些类型在 LoadQueue 类中定义为常量。可用的加载类型包括：
     * - {@link LoadQueue.BINARY | binary} (LoadQueue/BINARY:property)
     * - {@link LoadQueue.CSS | css} (LoadQueue/CSS:property)
     * - {@link LoadQueue.IMAGE | image} (LoadQueue/IMAGE:property)
     * - {@link LoadQueue.JAVASCRIPT | javascript} (LoadQueue/JAVASCRIPT:property)
     * - {@link LoadQueue.JSON | json} (LoadQueue/JSON:property)
     * - {@link LoadQueue.JSONP | jsonp} (LoadQueue/JSONP:property)
     * - {@link LoadQueue.MANIFEST | manifest} (LoadQueue/MANIFEST:property)
     * - {@link LoadQueue.POST | post} (LoadQueue/POST:property)
     * - {@link LoadQueue.SOUND | sound} (LoadQueue/SOUND:property)
     * - {@link LoadQueue.SPRITESHEET | spritesheet} (LoadQueue/SPRITESHEET:property)
     * - {@link LoadQueue.SVG | svg} (LoadQueue/SVG:property)
     * - {@link LoadQueue.TEXT | text} (LoadQueue/TEXT:property)
     * - {@link LoadQueue.XML | xml} (LoadQueue/XML:property)
     * 
     * 插件通过{@link getPreloadHandlers}方法定义它处理的类型或扩展名，该方法在插件首次注册时被调用。
     * 
     * 要将插件注册到 PreloadJS 中，只需在文件开始加载之前使用{@link LoadQueue.installPlugin | installPlugin}方法将其安装到 LoadQueue 中：
     * ```js
     * var queue = new createjs.LoadQueue();
     * queue.installPlugin(createjs.SamplePlugin);
     * queue.loadFile("test.jpg");
     * ```
     * {@link getPreloadHandlers}方法还可以返回一个`callback`属性，这是一个函数，它会在每个文件加载之前被调用。
     * 有关 callback 如何工作的更多信息，请查看{@link preloadHandler}。例如，SoundJS 插件允许 PreloadJS 管理使用 Flash Player 的下载。
     */
    class SamplePlugin {
        constructor();
        //methods
        /**
         * 这是一个示例方法，用于展示`completeHandler`，它可以在{@link preloadHandler}的返回对象中可选地指定。
         * 这个示例为{@link LoadItem}提供了一个`completeHandler`。
         * 此方法在项目完全加载后、但在{@link LoadQueue}分发{@link LoadQueue.fileload | fileload}事件之前被调用。
         * 
         * 提供的示例还监听返回的加载器上的 complete 事件，以显示不同的用法。
         * @param event 文件加载事件。
         */
        fileLoadHandler(event:Event):void;
        /**
         * 当插件被安装时,将调用此方法以让 PreloadJS 知道何时调用该插件。
         * 
         * PreloadJS 期望此方法返回一个包含以下内容的对象:
         * 
         * - callback: 在加载项目之前在插件类上调用的函数。查看 preloadHandler 方法获取更多信息。回调函数会自动在插件的作用域内调用。
         * - types: 一个数组,包含要处理的 PreloadJS 加载类型。支持的加载类型有 "binary"、"image"、"javascript"、"json"、"jsonp"、"sound"、"svg"、"text" 和 "xml"。
         * - extensions: 一个字符串数组,包含要处理的文件扩展名,如 "jpg"、"mp3" 等。仅当插件找不到适用的类型处理程序时才会触发。
         * 
         * 注意,目前 PreloadJS 仅支持每个扩展名或文件类型一个处理程序。
         * 
         * #### 示例
         * ```js
         * // 查看 SamplePlugin 源码获取更完整的示例
         * SamplePlugin.getPreloadHandlers = function() {
         *     return {
         *         callback: SamplePlugin.preloadHandler,
         *         extensions: ["jpg", "jpeg", "png", "gif"]
         *     }
         * }
         * ```
         * 
         * 如果插件同时提供了 "type" 和 "extension" 处理程序,type 处理程序将优先,并且每个文件只会触发一次。
         * 例如,如果你有一个 type=sound 的处理程序和一个 extension=mp3 的处理程序,当匹配到类型时将触发回调。
         * 
         * @returns 
         */
        getPreloadHandlers():Object;
        /**
         * 这是一个示例方法，用于展示如何处理在 LoadQueue/getPreloadHandlers 中指定的回调。
         * 在文件加载之前，如果找到与该文件类型或扩展名对应的插件，则会调用该插件的回调函数。
         * 这为插件提供了一个机会来修改加载项，甚至取消加载。回调函数的返回值决定了 PreloadJS 将如何处理该文件：
         * - false：跳过该文件。这允许插件决定是否应加载某个文件。
         * 例如，插件可以判断当前系统是否支持某种文件类型，并跳过那些不支持的文件。
         * - true：正常继续。插件不会影响加载过程。
         * - AbstractLoader instance：用作内容的加载器。这是 0.6.0 版本中的新功能。
         * 
         * 由于{@link LoadItem}是通过引用传递的，插件可以根据需要对其进行修改，甚至可以附加额外的数据。
         * 请注意，如果修改了{@link LoadItem.src | src}，PreloadJS 会自动更新 LoadItem/ext 属性。
         * ### 示例
         * ```js
         * // 取消加载
         * SamplePlugin.preloadHandler = function(loadItem, queue) {
         *     if (loadItem.id.indexOf("thumb") { return false; } // 不加载类似 "image-thumb.png" 的文件
         *     return true;
         * }
         *
         * // 指定 completeHandler
         * SamplePlugin.preloadHandler = function(loadItem, queue) {
         *     item.completeHandler = SamplePlugin.fileLoadHandler;
         * }
         *
         * // 查看 SamplePlugin 源码，查看另一个示例。
         * ```
         * 注意：在 0.4.2 及更早版本中，不是{@link LoadItem}，而是传递参数，并返回一个修改后的对象到 PreloadJS。
         * 现在改为传递 LoadItem 的引用，可以直接修改。
         * @param loadItem PreloadJS 将要加载的文件项。这个文件项是通过引用传递的，所以可以直接修改。
         * @param queue 正在预加载该文件的{@link LoadQueue}实例。
         * @returns 如何处理加载。更多信息请查看主描述。
         */
        preloadHandler(loadItem:LoadItem|Object, queue:LoadQueue):Boolean|AbstractLoader;
    }
    /**
     * Timeline类同步多个tweens，并允许将它们作为一个组控制。
     * 请注意，如果时间轴正在循环，即使tween的"loop"属性为false，tweens也可能看起来在循环。
     * 
     * NOTE: Timeline目前也接受一个参数列表，形式为：tweens, labels, props。
     * 这只是为了向后兼容性，将来会被删除。将tweens和labels作为props对象的属性包含在内。
     */
    class Timeline extends EventDispatcher {
        /**
         * 
         * @param props 要应用于此实例的配置属性(例如 {loop:-1, paused:true})。
         * 支持的属性列在下面。除非另有说明,这些属性会设置到对应的实例属性上。
         * - useTicks
         * - ignoreGlobalPause
         * - loop
         * - reversed
         * - bounce
         * - timeScale
         * - paused
         * - position: 初始位置
         * - onChange: 添加指定函数作为change事件的监听器
         * - onComplete: 添加指定函数作为complete事件的监听器
         */
        constructor (props?: Object);

        // properties
        /**
         * 时间轴中的tweens数组。*强烈*建议你使用Tween/addTween和Tween/removeTween，而不是直接访问这个属性，但它是为高级使用而包含的。
         */
        tweens:Array<Tween>;

        // methods
        /**
         * 添加一个或多个tweens（或时间轴）到此时间轴。tweens将被暂停（从正常计时系统中移除）并由该时间轴管理。
         * 将tween添加到多个时间轴中将导致意外行为。
         * @param tween 要添加的tween或时间轴。接受多个参数。
         * @returns 传递的第一个tween。
         */
        addTween(...tween: Tween[]): Tween;
        /**
         * 从该时间轴中移除一个或多个tweens。
         * @param tween 要移除的tween或时间轴。接受多个参数。
         * @returns 如果所有tweens都成功移除，则返回true，否则返回false。
         */
        removeTween(...tween: Tween[]): Boolean;
        /**
         * 重新计算时间轴的持续时间。
         * 当tweens被添加或移除时，持续时间会自动更新，但如果你在添加到时间轴后修改tween，则此方法很有用。
         */
        updateDuration(): void;
    }
    class AbstractTween extends EventDispatcher {
        /**
         * 
         * @param props 要应用于此实例的配置属性(ex. `{loop:-1, paused:true}`)。
         * 支持的属性列在下面。这些属性设置到对应的实例属性上，除非另有说明。
         * 
         * - [useTicks=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 
         * 查看 {@link useTicks} 属性获取更多信息。
         * 
         * - [ignoreGlobalPause=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 
         * 查看 {@link ignoreGlobalPause} 属性获取更多信息。
         * 
         * - [loop=0] [Number](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number) | [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 
         * 查看 {@link loop} 属性获取更多信息。
         * 
         * - [reversed=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 
         * 查看 {@link reversed} 属性获取更多信息。
         * 
         * - [bounce=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 
         * 查看 {@link bounce} 属性获取更多信息。
         * 
         * - [timeScale=1] [Number](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number) optional
         * 
         * 查看 {@link timeScale} 属性获取更多信息。
         * 
         * - [onChange] [Function](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function) optional
         * 
         * 添加指定函数作为 {@link change} 事件的监听器。
         * 
         * - [onComplete] [Function](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function) optional
         * 
         * 添加指定函数作为 {@link complete} 事件的监听器。
         */
        constructor(props?: Object);
        // properties
        /**
         * 使tween在每个循环结束时反转方向。每个单向播放的tween计为一个反弹。
         * 例如，要向前播放一次tween，然后向后播放一次，请将{@link loop}设置为`1`。
         * @default false
         */
        bounce: boolean;
        /**
         * 返回当前位置或紧接当前位置的标签名称。
         * 例如，给定一个tween有两个标签，"first"在帧索引4，"second"在帧8，currentLabel将返回：
         * 
         * - null如果当前位置是2。
         * - "first"如果当前位置是4。
         * - "first"如果当前位置是7。
         * - "second"如果当前位置是15。
         */
        readonly currentLabel:string;
        /**
         * 指示此tween的持续时间（以毫秒为单位，或如果useTicks为true，则为ticks），不考虑循环。
         * 此值会自动更新，因为您修改tween。直接更改它可能会导致意外行为。
         * @default 0
         */
        readonly duration:number;
        /**
         * 当全局暂停时，使此tween继续播放。
         * 例如，如果TweenJS使用{@link Ticker}，则将此设置为false（默认值）将导致此tween在`Ticker.paused`设置为`true`时暂停。
         * 请参阅{@link tick}方法获取更多信息。可以通过`props`参数设置。
         * @default false
         */
        ignoreGlobalPause: boolean;
        /**
         * 指示tween的循环次数。如果设置为-1，tween将无限循环。
         * 
         * 注意，一个tween必须*至少*循环一次，才能在{@link bounce}设置为true时看到它在两个方向上播放。
         * @default 0
         */
        loop: number;
        /**
         * 暂停或恢复tween。暂停的tween从全局注册表中移除，并且如果没有其他引用，则可以进行垃圾回收。
         * @default false
         */
        paused:boolean;
        /**
         * 当前tween的归一化位置。这个值总是介于0和`duration`之间。直接更改此属性将导致意外行为，请使用{@link Tween.setPosition}。
         * @readonly
         * @default 0
         */
        readonly position:Object;
        /**
         * 原始tween位置。这个值在tween激活时介于0和`loops*duration`之间，或在激活前为-1。
         * @readonly
         * @default -1
         */
        readonly rawPosition:number;
        /**
         * 使tween反向播放。
         * @default false
         */
        reversed: boolean;
        /**
         * 更改tween的播放速率。例如，`timeScale`值为2将使tween的播放速度加倍，值为`0.5`将使其减半。
         * @default 1
         */
        timeScale:number;
        /**
         * 使用ticks来计时所有持续时间，而不是毫秒。这也改变了某些操作的行为（如call）。在运行中的tween上更改此值可能会导致意外结果。
         * @readonly
         * @default false
         */
        readonly useTicks: boolean;
        // methods
        /**
         * 添加一个标签，可以用于Timeline/gotoAndPlay/Timeline/gotoAndStop。
         * @param label 标签的名称。
         * @param position 标签的位置。
         */
        addLabel(label:string, position:number):void;
        /**
         * 前进tween指定的时间量。
         * @param delta 前进的时间量（以毫秒为单位，或如果useTicks为true，则为ticks）。负值也支持。
         * @param ignoreActions 如果为true，由于此位置变化，不会执行任何操作。
         */
        advance(delta:number, ignoreActions?:boolean):void;
        /**
         * 根据原始位置计算归一化位置。例如，给定一个持续时间为3000ms的tween，设置loop: console.log(myTween.calculatePosition(3700); // 700
         * @param rawPosition 原始位置。
         */
        calculatePosition(rawPosition:number):void;
        /**
         * 返回此tween上定义的标签列表，按位置排序。
         * @returns 一个包含标签和位置属性的对象数组。
         */
        getLabels():Array<Object>;
        /**
         * 取消暂停此时间轴并跳转到指定位置或标签。
         * @param positionOrLabel 位置（以毫秒为单位，或如果`useTicks`为`true`，则为ticks）或标签。
         */
        gotoAndPlay(positionOrLabel:string|number):void;
        /**
         * 暂停此时间轴并跳转到指定位置。
         * @param positionOrLabel 位置（以毫秒为单位，或如果`useTicks`为`true`，则为ticks）或标签。
         */
        gotoAndStop(positionOrLabel:string|number):void;
        /**
         * 如果传递一个数字位置，则返回不变。如果传递一个字符串，则返回相应帧标签的位置，或者如果没有定义匹配的标签，则返回null。
         * @param positionOrLabel 一个数字位置值或标签字符串。
         */
        resolve(positionOrLabel:string|number):void;
        /**
         * 定义用于gotoAndPlay/Stop的标签。覆盖任何先前设置的标签。
         * @param labels 一个定义用于Timeline/gotoAndPlay/Timeline/gotoAndStop的标签的对象，形式为`{myLabelName:time}`，其中time以毫秒为单位（或如果`useTicks`为`true`，则为ticks）。
         */
        setLabels(labels:Object):void;
        /**
         * 前进到指定位置。
         * @param rawPosition 要前进到的位置（以毫秒为单位，或如果`useTicks`为`true`，则为ticks）。
         * @param ignoreActions 如果为true，则不运行任何由该操作触发的事件。
         * @param jump 如果为true，则只运行新位置的操作。如果为false，则运行旧位置和新位置之间的操作。
         * @param callback 主要用于MovieClip，在属性更新后但在操作运行之前调用。
         */
        setPosition(rawPosition:number,ignoreActions?:boolean,jump?:boolean,callback?:()=>void):void;
    }
    /**
     * 为单个目标对象补间属性。可以通过链式调用方法来创建复杂的动画序列：
     * 
     * #### 示例
     * ```js
     * createjs.Tween.get(target)
     *     .wait(500)
     *     .to({alpha:0, visible:false}, 1000)
     *     .call(handleComplete);
     * ```
     * 多个补间可以共享一个目标对象，然而如果它们影响相同的属性，可能会出现意外的行为。
     * 要停止对象上的所有补间，请使用 removeTweens 或传递 override:true 作为 props 参数。
     * ```js
     * createjs.Tween.get(target, {override:true}).to({x:100});
     * ```
     * 订阅 Tween/change:event 事件以在补间位置更改时通知。
     * ```js
     * createjs.Tween.get(target, {override:true}).to({x:100}).addEventListener("change", handleChange);
     * function handleChange(event) {
     *     // 补间位置已更改。
     * }
     * ```
     * 查看 get 方法。
     */
    class Tween extends AbstractTween {
        /**
         * 
         * @param target 将要补间其属性的目标对象。
         * @param props 要应用于此实例的配置属性(ex. `{loop:-1, paused:true}`)。支持的属性列在下面。这些属性设置到对应的实例属性上，除非另有说明。
         * -[useTicks=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 请参阅 {@link useTicks} 属性获取更多信息。
         * 
         * - [ignoreGlobalPause=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 请参阅 {@link ignoreGlobalPause} 属性获取更多信息。
         * 
         * - [loop=0] [Number](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number) | [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 请参阅 {@link loop} 属性获取更多信息。

         * - [reversed=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 请参阅 {@link reversed} 属性获取更多信息。
         * 
         * - [bounce=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 请参阅 {@link bounce} 属性获取更多信息。
         * 
         * - [timeScale=1] [Number](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number) optional
         * 请参阅 {@link timeScale} 属性获取更多信息。

         * - [pluginData] [Object](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object) optional
         * 请参阅 {@link pluginData} 属性获取更多信息。
         * 
         * - [paused=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 请参阅 {@link paused} 属性获取更多信息。
         * 
         * - [position=0] [Number](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number) optional
         * 此补间的初始位置。请参阅 {@link position} 属性。
         * 
         * - [onChange] [Function](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function) optional
         * 添加指定函数作为 {@link change} 事件的监听器。
         * 
         * - [onComplete] [Function](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function) optional
         * 添加指定函数作为 {@link complete} 事件的监听器。
         * 
         * - [override=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 当设置为 `true` 时，删除目标上的所有现有补间。
         */
        constructor(target: Object, props?: Object);

        // properties
        /**
         * 常量返回给插件，告诉补间不要使用默认赋值。
         */
        static IGNORE: Object;
        /**
         * 指示补间的当前位置是否在被动等待中。
         */
        readonly passive: boolean;
        /**
         * 允许您指定将由安装的插件使用的数据。每个插件使用此数据的方式不同，但通常您通过将数据分配给与插件同名的`pluginData`属性来指定数据。
         * 请注意，在许多情况下，此数据在插件初始化补间时立即使用。因此，在大多数情况下，应在第一次to调用之前设置此数据。
         * 
         * #### 示例
         * ```js
         * myTween.pluginData.SmartRotation = data;
         * ```
         * 大多数插件也支持一个属性来禁用它们用于特定补间。这通常是插件名称后面跟着"_disabled"。
         * 
         * ```js
         * myTween.pluginData.SmartRotation_disabled = true;
         * ```
         * 
         * 一些插件也将工作数据存储在这个对象中，通常在以`_PluginClassName`命名的属性中。有关更多详细信息，请参阅各个插件的文档。
         */
        pluginData: Object;
        /**
         * 此补间的目标。这是将在其上更改补间属性的对象。
         */
        readonly target: Object;

        // methods
        /**
         * 添加一个动作来调用指定的函数。
         * 
         * #### 示例
         * ```js
         * // 在1秒后调用myFunction()。
         * createjs.Tween.get().wait(1000).call(myFunction);
         * ```
         * @param callback 要调用的函数。
         * @param params 要传递给函数的参数。
         * @param scope 要调用函数的上下文。
         * @returns 返回补间对象（用于链式调用）。
         */
        call(callback: any, params?: any[], scope?: Object): Tween;    // when 'params' isn't given, the callback receives a tweenObject
        //call(callback: (...params: any[]) => any, params?: any[], scope?: Object): Tween; // otherwise, it receives the params only
        /**
         * 返回一个新的补间实例。这是功能上等同于使用 `new Tween(...)`，但可能看起来更干净，使用 TweenJS 的链式语法。

         * #### 示例
         * ```js
         * var tween = createjs.Tween.get(target).to({x:100}, 500);
         * // 等价于：
         * var tween = new createjs.Tween(target).to({x:100}, 500);
         * ```
         * @param target 将要补间其属性的目标对象。
         * @param props 要应用于此实例的配置属性(ex. `{loop:-1, paused:true}`)。支持的属性列在下面。这些属性设置到对应的实例属性上，除非另有说明。
         * 
         * - [useTicks=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 请参阅 {@link useTicks} 属性获取更多信息。
         * 
         * - [ignoreGlobalPause=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 请参阅 {@link ignoreGlobalPause} 属性获取更多信息。
         * 
         * - [loop=0] [Number](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number) | [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 请参阅 {@link loop} 属性获取更多信息。
         * 
         * - [reversed=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 请参阅 {@link reversed} 属性获取更多信息。
         * 
         * - [bounce=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 请参阅 {@link bounce} 属性获取更多信息。
         * 
         * - [timeScale=1] [Number](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number) optional
         * 请参阅 {@link timeScale} 属性获取更多信息。
         * 
         * - [pluginData] [Object](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object) optional
         * 请参阅 {@link pluginData} 属性获取更多信息。
         * 
         * - [paused=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 请参阅 {@link paused} 属性获取更多信息。
         * 
         * - [position=0] [Number](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number) optional
         * 请参阅 {@link position} 属性获取更多信息。
         * 
         * - [onChange] [Function](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function) optional
         * 添加指定函数作为 {@link change} 事件的监听器。
         * 
         * - [onComplete] [Function](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function) optional
         * 添加指定函数作为 {@link complete} 事件的监听器。
         * 
         * - [override=false] [Boolean](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean) optional
         * 当设置为 `true` 时，删除目标上的所有现有补间。
         * 
         * @returns 返回创建的补间实例。
         */
        static get(target: Object, props?: Object): Tween;
        /**
         * 指示目标对象（如果指定）或一般是否存在任何活动补间。
         * @param target 要检查的目标对象。如果未指定，则返回值将指示是否存在任何目标的活动补间。
         * @returns 如果目标对象上存在活动补间，则返回 `true`，否则返回 `false`。
         */
        static hasActiveTweens(target?: Object): boolean;
        /**
         * 在补间当前位置添加一个标签，可以用于Tween/gotoAndPlay/Tween/gotoAndStop。
         * 
         * #### 示例
         * ```js
         * var tween = createjs.Tween.get(foo)
         *     .to({x:100}, 1000)
         *     .label("myLabel")
         *     .to({x:200}, 1000);
         * ```
         * // ... tween.gotoAndPlay("myLabel"); // would play from 1000ms in.
         * @param name 标签的名称。
         * @returns 返回补间实例（用于链式调用）。
         */
        label(name:string):Tween;
        /**
         * 添加一个动作来暂停指定的补间。
         * 
         * #### 示例
         * ```js
         * myTween.pause(otherTween).to({alpha:1}, 1000).play(otherTween);
         * ```
         * 注意：此动作在补间更新结束时执行，因此补间可能会超出插入暂停动作的时间。例如：
         * ```js
         * myTween.to({foo:0}, 1000).pause().to({foo:1}, 1000);
         * ```
         * 在60fps下，补间将每帧前进~16ms，如果上面的补间在当前帧之前处于999ms，它将前进到1015ms（第二步的15ms）并然后暂停。
         * 
         * @param tween 要暂停的补间。默认为当前补间。
         * @returns 返回补间实例（用于链式调用）
         */
        pause(tween: Tween): Tween;
        /**
         * 添加一个动作来播放（恢复）指定的补间。这使您可以顺序多个补间。

         * #### 示例
         * ```js
         * myTween.to({x:100}, 500).play(otherTween);
         * ```
         * @param tween 要播放的补间。
         * @returns 返回补间实例（用于链式调用）。
         */
        play(tween: Tween): Tween;
        /**
         * 从0.4.1版本开始可用
         * 
         * 停止并移除所有现有的补间。
         */
        static removeAllTweens(): void;
        /**
         * 移除目标对象的所有现有补间。如果`override`属性为`true`，新的补间会自动调用此方法。
         * @param target 要移除补间的目标对象。
         */
        static removeTweens(target: Object): void;
        /**
         * 添加一个动作来设置指定目标的指定属性。如果目标为null，将使用当前补间的目标。
         * 注意，对于目标对象的属性，您应该考虑使用零持续时间的操作，以便值被注册为补间属性。
         * 
         * #### 示例
         * ```js
         * myTween.wait(1000).set({visible:false}, foo);
         * ```
         * @param props 要设置的属性（ex. `{visible:false}`）。
         * @param target 要设置属性的目标对象。如果省略，将使用当前补间的目标。
         * @returns 返回补间实例（用于链式调用）。
         */
        set(props: Object, target?: Object): Tween;
        /**
         * 更新所有补间。这通常使用{@link Ticker}类，但您可以手动调用它，如果您更喜欢使用自己的"心跳"实现。
         * @param delta 自上次tick以来的时间变化（以毫秒为单位）。除非所有补间都设置为`useTicks`为true，否则需要。
         * @param paused 如果为true，则暂停所有补间。Tween/ignoreGlobalPause:property将忽略此项，但所有其他补间将暂停如果为`true`。
         */
        static tick(delta: number, paused: boolean): void;
        /**
         * 从当前值补间到指定属性。设置持续时间为0以跳转到这些值。数值属性将从补间中的当前值补间到目标值。非数值属性将在指定持续时间结束时设置。
         * 
         * #### 示例
         * ```js
         * createjs.Tween.get(target).to({alpha:0, visible:false}, 1000);
         * ```
         * @param props 指定补间属性的目标值（ex. `{x:300}`将补间目标的x属性到300）。
         * @param duration 补间持续时间（以毫秒为单位）（或以`useTicks`为true的ticks）。
         * @param ease 用于此补间的缓动函数。请参阅Ease类以获取内置缓动函数的列表。
         * @returns 返回补间实例（用于链式调用）。
         */
        to(props: Object, duration?: number, ease?: (t: number) => number): Tween;
        /**
         * 添加一个等待（本质上是一个空补间）。

         * #### 示例
         * ```js
         * //此补间将等待1秒后将alpha值渐变为0。
         * createjs.Tween.get(target).wait(1000).to({alpha:0}, 1000);
         * ```
         * @param duration 等待的持续时间（以毫秒为单位）。
         * @param passive 如果为true，则等待期间不会更新补间。
         * @returns 返回补间实例（用于链式调用）。
         */
        wait(duration: number, passive?: boolean): Tween;
    }
    /**
     * 静态类，保存库特定信息，如库的版本和buildDate。
     */
    class TweenJS {
        // properties
        /**
         * 库的构建日期，以UTC格式表示。
         */
        static buildDate: string;
        /**
         * 库的版本字符串。
         */
        static version: string;
    }
    /**
     * 所有加载器扩展的基类，包括{@link LoadQueue}。
     */
    class AbstractLoader extends EventDispatcher {
        // properties
        /**
         * 确定加载器是否被取消。取消的加载不会触发complete事件。
         * 注意，此属性是只读的，所以LoadQueue队列应该使用close而不是取消。
         * @default false
         */
        canceled: boolean;
        /**
         * 如果加载器已完成加载。这提供了一个快速检查，但也确保了不同的加载方法不会累积，导致多个`complete`事件。
         * @default false
         */
        loaded: boolean;
        /**
         * 当前加载进度（百分比）。这将是一个介于0和1之间的数字。
         * 
         * #### 示例
         * ```js
         * var queue = new createjs.LoadQueue();
         * queue.loadFile("largeImage.png");
         * queue.on("progress", function() {
         *     console.log("Progress:", queue.progress, event.progress);
         * });
         * ```
         * @default 0
         */
        progress: number;
        /**
         * 一个将加载的原始结果转换为最终结果的格式化函数。例如，JSONLoader将字符串文本转换为JavaScript对象。
         * 并非所有加载器都有resultFormatter，此属性可以重写以提供自定义格式化。
         * 
         * 可选地，resultFormatter可以返回一个回调函数，在这种情况下，格式化需要异步进行，例如创建一个新图像。
         * 回调函数传递2个参数，分别是resultFormatter的成功和错误条件。注意，resultFormatter方法在当前范围内也被调用，以及成功和错误回调。
         * 
         * #### 异步 resultFormatter 示例
         * ```js
         * function _formatResult(loader) {
         *     return function(success, error) {
         *         if (errorCondition) { error(errorDetailEvent); }
         *         success(result);
         *     }
         * }
         * ```
         * 一个自定义的结果格式化函数，在请求分派其complete事件之前被调用。
         * 大多数加载器类型已经有一个内部格式化程序，但可以被用户重写以进行自定义格式化。格式化后的结果将通过使用GetResult在加载器上可用，并传递`true`。
         * @default null
         */
        resultFormatter: () => any;
        /**
         * 此加载器将加载的项目类型。请参阅 {@link AbstractLoader} 获取支持的类型的完整列表。
         */
        type: string;

        // methods
        /**
         * 关闭项目。这将停止任何打开的请求（尽管使用HTML标签的下载可能仍在后台继续），但不再分发事件。
         */
        cancel(): void;
        /**
         * 清理加载器。
         */
        destroy(): void;
        /**
         * 从0.6.0版本开始可用
         * 
         * 获取此加载器加载的清单项的引用。在某些情况下，这将是通过{@link LoadQueue.loadFile | loadFile}或{@link LoadQueue.loadManifest | loadManifest}传递给{@link LoadQueue}的值。
         * 然而，如果只传递了一个String路径，那么它将是一个{@link LoadItem}。
         * @returns 返回此加载器负责加载的清单项。
         */
        getItem(): Object;
        /**
         * 从0.6.0版本开始可用
         * 
         * 获取加载器加载的任何内部项目。这使像{@link ManifestLoader}这样的加载器可以暴露它加载的内部项目。
         * @returns 返回加载器加载的内部项目列表。
         */
        getLoadedItems(): Object[];
        /**
         * 从0.6.0版本开始可用
         * 
         * 获取加载器加载的内容。只有在Complete:event事件分派后才可用。
         * @param raw 确定返回的结果是否是格式化的内容，还是原始加载的数据（如果存在）。
         * @returns 返回加载器加载的内容。
         */
        //getResult(raw?: boolean): Object;
        /**
         * 从0.6.0版本开始可用
         * 
         * 返回此对象创建或用于加载的标签。
         * @returns 返回标签实例
         */
        getTag(): Object;
        /**
         * 开始加载项目。当单独使用加载器时，此方法是必需的。
         * 
         * #### 示例
         * ```js
         * var queue = new createjs.LoadQueue();
         * queue.on("complete", handleComplete);
         * queue.loadManifest(fileArray, false); // 注意第二个参数告诉队列暂时不要开始加载
         * queue.load();
         * ```
         */
        load(): void;
        /**
         * 从0.6.0版本开始可用
         * 
         * 设置此项目使用的标签。
         * @param tag 标签实例。
         */
        setTag(tag: Object): void;
        // Events
        /**
         * 当整体进度变化时触发。在0.6.0版本之前，这只是{{#crossLink "Event"}}{{/crossLink}}。
         * @event progress
         * @since 0.3.0
         */
 
        /**
         * 当加载开始时触发。
         * @event loadstart
         * @param {Object} target The object that dispatched the event.
         * @param {String} type The event type.
         * @since 0.3.1
         */
 
        /**
         * 当整个队列加载完成时触发。
         * @event complete
         * @param {Object} target The object that dispatched the event.
         * @param {String} type The event type.
         * @since 0.3.0
         */
 
        /**
         * 当加载器遇到错误时触发。如果错误是由文件引起的，事件将包含导致错误的项目。在0.6.0版本之前，这只是{{#crossLink "Event"}}{{/crossLink}}。
         * @event error
         * @since 0.3.0
         */
 
        /**
         * 当加载器遇到内部文件加载错误时触发。这使加载器可以维护内部队列，并显示文件加载错误。
         * @event fileerror
         * @param {Object} target The object that dispatched the event.
         * @param {String} type The event type ("fileerror")
         * @param {LoadItem|object} The item that encountered the error
	     * @since 0.6.0
	     */
 
        /**
         * 当加载器内部加载文件时触发。这使{{#crossLink "ManifestLoader"}}{{/crossLink}}等加载器可以维护内部{{#crossLink "LoadQueue"}}{{/crossLink}}s
         * 并通知它们何时加载文件。{{#crossLink "LoadQueue"}}{{/crossLink}}类分派一个稍微不同的{{#crossLink "LoadQueue/fileload:event"}}{{/crossLink}}事件。
         * @event fileload
         * @param {Object} target The object that dispatched the event.
         * @param {String} type The event type ("fileload")
	     * @param {Object} item The file item which was specified in the {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}}
	     * or {{#crossLink "LoadQueue/loadManifest"}}{{/crossLink}} call. If only a string path or tag was specified, the
	     * object will contain that value as a `src` property.
	     * @param {Object} result The HTML tag or parsed result of the loaded item.
	     * @param {Object} rawResult The unprocessed result, usually the raw text or binary data before it is converted
	     * to a usable object.
	     * @since 0.6.0
	     */
 
        /**
         * 当内部请求被创建后，但在加载之前触发。
         * 这允许对加载器进行特定加载需求的更新，例如二进制或XHR图像加载。
         * @event initialize
         * @param {Object} target The object that dispatched the event.
         * @param {String} type The event type ("initialize")
         * @param {AbstractLoader} loader The loader that has been initialized.
	    */
    }
    /**
     * 所有媒体加载器扩展的基类，如Video和Audio。
     */
    class AbstractMediaLoader extends AbstractLoader
    {
        /**
         * 
         * @param loadItem 
         * @param preferXHR 
         * @param type The type of media to load. Usually "video" or "audio".
         */
        constructor(loadItem: LoadItem|Object, preferXHR: boolean, type: string);
    }
    /**
     * 一个实际数据请求的基类，如XHRRequest、TagRequest和MediaRequest。PreloadJS加载器通常会在底层使用数据加载器来获取数据。
     */
    class AbstractRequest
    {
        constructor(item: LoadItem);
        /**
         * 取消正在进行中的请求。
         */
        cancel(): void;
        /**
         * 清理请求。
         */
        destroy(): void;
        /**
         * 开始加载。
         */
        load(): void;
    }
    /**
     * 一个用于加载二进制文件的加载器。这对于加载Web音频或需要ArrayBuffer的内容非常有用。
     */
    class BinaryLoader extends AbstractLoader
    {
        constructor(loadItem: LoadItem|Object);

        // methods
        /**
         * 确定加载器是否可以加载特定项目。此加载器只能加载类型为BINARY的项目。
         * @param item LoadQueue尝试加载的LoadItem。
         * @returns 加载器是否可以加载该项目。
         */
        static canLoadItem(item: LoadItem|Object): boolean;
    }
    /**
     * 一个用于加载CSS文件的加载器。
     */
    class CSSLoader extends AbstractLoader
    {
        constructor(loadItem: Object, preferXHR: boolean);

        // methods
        /**
         * 确定加载器是否可以加载特定项目。此加载器只能加载类型为CSS的项目。
         * @param item LoadQueue尝试加载的LoadItem。
         * @returns 加载器是否可以加载该项目。
         */
        static canLoadItem(item: Object): boolean;
    }

    /*export module DataUtils
    {
        export function parseJSON(value: string): Object;
        export function parseXML(text: string, type: string): XMLDocument;
    }*/
    /**
     * 一些用于格式化不同数据类型的实用程序。
     */
    class DataUtils
    {
        /**
         * 将字符串解析为对象。
         * @param value 已加载的JSON字符串
         * @returns 返回JavaScript对象。
         */
        parseJSON(value: string): Object;
        /**
         * 使用DOM解析XML。这在预加载XML或SVG时是必需的。
         * @param text 由XHR加载的原始文本或XML。
         * @returns 返回解析后的XML文档。
         */
        static parseXML(text: string): XMLDocument;
    }
    /**
     * 一个通用的错误事件，描述发生的错误以及任何相关细节。
     */
    class ErrorEvent
    {
        /**
         * 
         * @param title 错误标题
         * @param message 错误描述
         * @param data 附加的错误数据
         */
        constructor(title?: string, message?: string, data?: Object);

        // properties
        /**
         * 附加到错误的数据。
         */
        data: Object;
        /**
         * 详细的错误消息，包含有关错误的详细信息。
         */
        message: string;
        /**
         * 错误标题，指示发生错误的类型。
         */
        title: string;
    }
    /**
     * 一个用于加载图像的加载器。
     */
    class ImageLoader extends AbstractLoader
    {
        constructor(loadItem: LoadItem|Object, preferXHR: boolean);
        /**
         * 确定加载器是否可以加载特定项目。此加载器只能加载类型为{@link Types.IMAGE | IMAGE}的项目。
         * @param item LoadQueue尝试加载的LoadItem。
         * @returns 加载器是否可以加载该项目。
         */
        static canLoadItem(item: Object): boolean;
    }
    /**
     * 一个用于加载JavaScript文件的加载器。
     */
    class JavaScriptLoader extends AbstractLoader
    {
        constructor(loadItem: Object, preferXHR: boolean);
        /**
         * 确定加载器是否可以加载特定项目。此加载器只能加载类型为{@link Types.JAVASCRIPT | JAVASCRIPT}的项目。
         * @param item LoadQueue尝试加载的LoadItem。
         * @returns 加载器是否可以加载该项目。
         */
        static canLoadItem(item: Object): boolean;
    }
    /**
     * 一个用于加载JSON文件的加载器。
     */
    class JSONLoader extends AbstractLoader
    {
        constructor(loadItem: Object);
        /**
         * 确定加载器是否可以加载特定项目。此加载器只能加载类型为{@link Types.JSON | JSON}的项目。
         * @param item LoadQueue尝试加载的LoadItem。
         * @returns 加载器是否可以加载该项目。
         */
        static canLoadItem(item: Object): boolean;
    }
    /**
     * 一个用于加载JSONP文件的加载器。
     */
    class JSONPLoader extends AbstractLoader
    {
        constructor(loadItem: Object);
        /**
         * 确定加载器是否可以加载特定项目。此加载器只能加载类型为{@link Types.JSONP | JSONP}的项目。
         * @param item LoadQueue尝试加载的LoadItem。
         * @returns 加载器是否可以加载该项目。
         */
        static canLoadItem(item: Object): boolean;
    }
    /**
     * 所有加载器都接受包含此类定义的属性的项目。
     * 如果传递一个原始对象而不是LoadItem，它将不会受到影响，但必须至少包含一个Src:property属性。
     * 一个字符串路径或HTML标签也是可接受的，但将自动使用{@link AbstractLoader}的Create方法转换为LoadItem。
     */
    class LoadItem
    {
        // properties
        /**
         * 一个用于JSONP请求的回调函数，定义了当JSONP内容加载时调用的全局方法。
         * @default null
         */
        callback: string;
        /**
         * 设置CORS-enabled images loading cross-domain的crossOrigin属性。
         * @default Anonymous
         */
        crossOrigin: boolean;
        /**
         * 一个任意数据对象，与加载的对象一起包含。
         * @default null
         */
        data: Object;
        /**
         * 要附加到XHR请求的头部对象。
         * PreloadJS会在需要时自动附加一些默认头部，包括"Origin"、"Content-Type"和"X-Requested-With"。
         * 您可以通过在headers对象中包含它们来覆盖默认头部。
         * @default null
         */
        headers: Object;
        /**
         * 一个字符串标识符，可以用于引用加载的对象。如果未提供，此标识符将自动设置为Src:property。
         * @default null
         */
        id: string;
        /**
         * 默认等待请求超时的时间（以毫秒为单位）。
         * 这仅适用于基于标签和XHR（级别1）的加载，因为XHR（级别2）提供了自己的超时事件。
         */
        static LOAD_TIMEOUT_DEFAULT:number;
        /**
         * 等待请求超时的时间（以毫秒为单位）。
         * 这仅适用于基于标签和XHR（级别1）的加载，因为XHR（级别2）提供了自己的超时事件。
         * @default 8000 (8 秒)
         */
        loadTimeout: number;
        /**
         * 确定一个清单是否将维护此项目的顺序，相对于清单中还设置了maintainOrder属性为true的其他项目。
         * 这仅适用于maxConnections设置为大于1（使用setMaxConnections）的情况。
         * 设置为false的项将按其加载顺序完成。
         * 当maintainScriptOrder设置为true时，有序项目将与脚本标签一起按顺序加载。
         * @default false
         */
        maintainOrder: boolean;
        /**
         * HTTP请求使用的请求方法。支持GET和POST请求类型，定义在AbstractLoader上。
         * @default GET
         */
        method: string;
        /**
         * 设置XHR请求的MIME类型。这会自动设置为"text/plain; charset=utf-8"，适用于文本文件（json, xml, text, css, js）。
         * @default null
         */
        mimeType: string;
        /**
         * 正在加载的文件的源。此属性是**必需的**。源可以是字符串（推荐），也可以是HTML标签。也可以是一个对象，但这种情况它必须包含一个类型并由插件处理。
         * @default null
         */
        src: string;
        /**
         * 正在加载的文件的类型。文件的类型通常由扩展名推断，但也可以手动设置。这在文件没有扩展名的情况下非常有用。
         * @default null
         */
        type: string;
        /**
         * 一个对象哈希，包含要发送到服务器的名称/值对。
         * @default null
         */
        values: Object;
        /**
         * 启用XHR请求的凭证。
         * @default false
         */
        withCredentials: boolean;

        // methods
        /**
         * 创建一个LoadItem。
         * - 字符串类型的项被转换为具有填充的Src:property的LoadItem。
         * - LoadItem实例按原样返回
         * - 对象返回带有任何需要的属性
         * @param value 要创建的LoadItem对象或字符串或对象。
         * @returns 返回LoadItem对象。
         */
        static create(value: LoadItem | string | Object): Object | LoadItem;
        /**
         * 提供一个链式快捷方法，用于在实例上设置多个属性。
         *
         * #### 示例
         * ```js
         * var loadItem = new createjs.LoadItem().set({src:"image.png", maintainOrder:true});
         * ```
         * @param props 一个通用对象，包含要复制到LoadItem实例的属性。
         * @returns 返回调用该方法的实例（对链式调用很有用）。
         */
        set(props: Object): LoadItem;
    }
    /**
     * 一个用于加载队列的加载器。
     */
    class LoadQueue extends AbstractLoader
    {
        constructor(preferXHR?: boolean, basePath?: string, crossOrigin?: string | boolean);

        // properties
        /**
         * 确保加载的脚本按指定顺序完成。
         * 加载的脚本一旦加载就会添加到文档头部。
         * 通过标签加载的脚本在this property为`true`时将一个接一个地加载，而通过XHR加载的脚本可以以任何顺序加载，但会在"finish"和按指定顺序添加到文档中。
         * 
         * 任何项目都可以通过在加载项上设置MaintainOrder:property属性来按顺序加载，或者通过确保一次只打开一个连接使用{@link setMaxConnections}。
         * 注意，当`maintainScriptOrder`属性设置为`true`时，脚本项目会自动设置为`maintainOrder=true`，
         * 并且在加载过程中更改`maintainScriptOrder`为`false`不会改变已经在队列中的项目。
         * 
         * #### 示例
         * ```js
         * var queue = new createjs.LoadQueue();
         * queue.setMaxConnections(3); // Set a higher number to load multiple items at once
         * queue.maintainScriptOrder = true; // 确保脚本按顺序加载
         * queue.loadManifest([
         *     "script1.js",
         *     "script2.js",
         *     "image.png", // 随时加载
         *     {src: "image2.png", maintainOrder: true} // 等待script2.js
         *     "image3.png",
         *     "script3.js" // 等待image2.png加载（或XHR加载时完成）
         * ]);
         * ```
         * @default true
         */
        maintainScriptOrder: boolean;
        /**
         * 当当前队列完成时，要处理的下一个预加载队列。如果当前队列中抛出错误，并且{@link stopOnError为true}，则下一个队列将不会被处理。
         * @default null
         */
        next: LoadQueue;
        /**
         * 确定当遇到错误时，LoadQueue是否停止处理当前队列。
         * @default false
         */
        stopOnError: boolean;

        // methods
        /**
         * 关闭当前队列。关闭队列会完全清空队列，并阻止任何剩余的项目开始下载。注意，当前任何活动的加载将继续打开，并且事件可能会被处理。
         * 
         * 要停止和重新启动队列，请使用 {@link setPaused} 方法。
         */
        close(): void;
        /**
         * 从0.6.0版本开始可用
         * 
         * 生成一个由该队列加载的项的列表。
         * @param loaded 确定是否只返回已加载的项。如果为false，则in-progress和failed load items也将被包括。
         * @returns 返回一个由该队列加载的项的列表。每个项目包括{@link LoadItem}、result和rawResult。
         */
        getItems(loaded: boolean): Object[];
        /**
         * 通过id获取资源。
         * 注意：如果加载项中没有提供"id"，则将"src"当作id使用（且不含basePath）。
         * @param value 资源id
         * @param rawResult true返回原始数据，false格式化数据，适用于通过XHR加载的内容，如脚本、XML、CSS和图像。如果没有原始数据，则将返回格式化数据。
         * @returns 返回已经加载的资源。该资源包含如下类型：
         * - 对于图像，返回HTMLImageElement。
         * - JavaScript的脚本（＜script/＞）。请注意，脚本会自动添加到HTMLDOM中。
         * - CSS的样式（＜style/＞或＜link＞）
         * - text的原始文本
         * - 对于JSON，返回Object。
         * - 对于XML，返回XMLDocument。
         * - XHR加载的二进制数组缓冲区。
         * - 对于声音，返回HTMLAudioElement。注意，建议使用SoundJS API来播放加载的音频。具体来说，Flash和WebAudio加载的音频将使用此方法返回一个加载器对象，该对象不能用于播放音频。
         * 
         * 注意：该对象也会通过fileload事件作为'item'参数返回。如果请求了原始结果但未找到，将返回处理后的结果。
         */
        getResult(value:string,rawResult?:boolean):Object;
        /**
         * 注册一个插件。插件可以映射到加载类型（sound，image等）或特定的文件扩展名（png、mp3等）。
         * 目前每种类型/扩展名只能存在一个插件。
         * 
         * 当插件安装时，会调用其上的`getPreloadHandlers()`方法。
         * 有关此方法的更多信息，请查看{@link SamplePlugin}类中的{@link SamplePlugin.getPreloadHandlers | getPreloadHandlers}方法。
         * 
         * 在文件加载之前，匹配的插件有机会修改加载过程。
         * 如果从{@link SamplePlugin.getPreloadHandlers | getPreloadHandlers}方法返回了一个`回调函数`，它将首先被调用，其结果可能会取消或修改加载项。
         * 回调方法还可以返回一个 completeHandler，该处理程序将在文件加载完成后触发，或者返回一个 tag 对象，该对象将管理实际的下载。有关这些方法的更多信息，请查看 SamplePlugin 上的 preloadHandler 和 fileLoadHandler 方法。
         * @param plugin 要安装的插件对象。
         */
        installPlugin(plugin: any): void;
        /**
         * 加载一个文件。要一次添加多个文件，请使用 {@link loadManifest} 方法。
         * 
         * 文件总是附加到当前队列中，所以这个方法可以多次使用来添加文件。要先清除队列，请使用 AbstractLoader/close 方法。
         * @param file 要加载的文件对象或路径。文件可以是以下几种类型：
         * - {@link LoadItem} 实例
         * - 包含 {@link LoadItem} 定义的属性的对象
         * - 资源路径字符串。注意，这种类型的加载项将在后台转换为 {@link LoadItem}。
         * @param loadNow 立即加载（true）或等待加载调用（false）。默认值为true。如果使用 setPaused 暂停队列，并且值为true，则队列将自动恢复。
         * @param basePath 一个基础路径，将添加到每个文件的前面。
         * 注意，如果使用类型为MANIFEST的文件加载清单，其文件将不会使用basePath参数。basePath参数已弃用。在未来的版本中，这个参数将被删除。
         * 请使用 LoadQueue 构造函数中的 basePath 参数，或者在清单定义中使用 path 属性。
         */
        loadFile(file: LoadItem | Object | string, loadNow?: boolean, basePath?: string): void;
        /**
         * 加载一个文件数组。要加载一个文件，请使用 {@link loadFile} 方法。
         * 清单中的文件按相同的顺序请求，但如果在使用 {@link setMaxConnections} 设置大于1的maxConnections，则可能以不同的顺序完成。
         * 脚本将按正确的顺序加载，只要LoadQueue/maintainScriptOrder为true（默认值）。
         * 
         * 文件总是附加到当前队列中，所以这个方法可以多次使用来添加文件。要先清除队列，请使用 AbstractLoader/close 方法。
         * @param manifest 要加载的文件列表。loadManifest调用支持四种类型的清单:
         * 1. 字符串路径，指向一个清单文件，该文件是一个JSON文件，包含一个"manifest"属性，用于定义要加载的文件列表，还可以包含一个"path"属性，该属性将添加到列表中每个文件的前面。
         * 2. 一个定义了"src"的对象，src是一个JSON或JSONP文件。对于JSONP文件可以定义"callback"。
         * JSON/JSONP文件应包含一个"manifest"属性，用于定义要加载的文件列表，还可以包含一个"path"属性，该属性将添加到列表中每个文件的前面。
         * 3. 一个包含"manifest"属性的对象，用于定义要加载的文件列表，还可以包含一个"path"属性，该属性将添加到列表中每个文件的前面。
         * 4. 要加载的文件数组。
         * 
         * 每个清单中的"file"可以是以下几种类型：
         * - {@link LoadItem} 实例
         * - 包含 {@link LoadItem} 定义的属性的对象
         * - 资源路径字符串。注意，这种类型的加载项将在后台转换为 {@link LoadItem}。
         * 
         * @param manifest 一个包含要加载的文件的清单。
         * @param loadNow 立即加载（true）或等待加载调用（false）。默认值为true。如果使用 {@link setPaused} 暂停队列，并且值为true，则队列将自动恢复。
         * @param basePath 将添加到每个文件前面的基础路径。
         * basePath参数会覆盖构造函数中指定的路径。
         * 注意，如果使用类型为LoadQueue/MANIFEST的文件加载清单，其文件将**不会**使用basePath参数。
         * **basePath参数已弃用**。在未来的版本中，这个参数将被删除。
         * 请使用LoadQueue构造函数中的basePath参数，或者在清单定义中使用path属性。
         */
        loadManifest(manifest: Object | string | any[], loadNow?: boolean, basePath?: string): void;
        /**
         * 从0.6.0版本开始可用
         * 
         * 注册一个自定义的加载器类。新的加载器将优先于较早添加的加载器和默认加载器。
         * 建议加载器扩展{@link AbstractLoader}。加载器只能添加一次，并且将添加到可用加载器的列表中。
         * @param loader 要添加的AbstractLoader类。
         */
        registerLoader(loader: AbstractLoader|Function): void;
        /**
         * 从0.3.0版本开始可用
         * 
         * 停止一个项目加载，并从队列中删除它。如果没有传递任何内容，所有项目都将被删除。这也将删除对已加载项目（s）的内部引用。
         * 
         * #### 示例
         * ```js
         * queue.loadManifest([
         *     {src:"test.png", id:"png"},
         *     {src:"test.jpg", id:"jpg"},
         *     {src:"test.mp3", id:"mp3"}
         * ]);
         * queue.remove("png"); // 单个项目按ID删除
         * queue.remove("png", "test.jpg"); // 作为参数的项。混合id和src。
         * queue.remove(["test.png", "jpg"]); // 在数组中的项。混合id和src。
         * ```
         * @param idsOrUrls 要删除的ID或URL。您可以传递一个项目、一个项目数组或多个项目作为参数。
         */
        remove(idsOrUrls: string | any[]): void;
        /**
         * 从0.3.0版本开始可用
         * 
         * 停止所有排队和加载的项目，并清除队列。这也将删除对已加载内容的所有内部引用，并允许再次使用队列。
         */
        removeAll(): void;
        /**
         * 从0.3.0版本开始可用
         * 
         * 停止所有打开的加载，销毁任何已加载的项目，并重置队列，以便所有项目可以再次通过调用{@link load}重新加载。
         * 项目不会从队列中删除。要删除项目，请使用{@link remove}或{@link removeAll}方法。
         */
        reset(): void;
        /**
         * 设置最大并发连接数。
         * 注意，浏览器和服务器可能有一个内置的最大打开连接数，所以任何额外的连接可能会在浏览器打开连接之前处于挂起状态。
         * 当使用标签加载脚本，并且{@link maintainScriptOrder}为`true`时，由于浏览器限制，一次只加载一个脚本。
         * 
         * #### 示例
         * ```js
         * var queue = new createjs.LoadQueue();
         * queue.setMaxConnections(10); // 允许10个并发加载
         * ```
         * @param value 允许的并发加载数量。默认情况下，每个LoadQueue在任何时候只打开一个连接。
         */
        setMaxConnections(value: number): void;
        /**
         * 暂停或恢复当前加载。活动加载不会被取消，但在活动加载完成后，队列中的下一个项目不会被处理。LoadQueues默认情况下不会暂停。
         * 
         * 注意，如果使用{@link loadFile}或{@link loadManifest}添加新项目，暂停的队列将恢复，除非loadNow参数为false。
         * @param value 队列是否应该暂停。
         */
        setPaused(value: boolean): void;
        /**
         * 从0.6.0版本开始可用
         * 
         * 更改PreferXHR:property的值。注意，如果设置为true，它可能会失败，或者根据浏览器的能力和加载类型被忽略。
         * @param value 如果为true，则优先使用XHR。如果为false，则优先使用标签。
         * @returns 成功设置的PreferXHR的值。
         */
        setPreferXHR(value: boolean): boolean;
        /**
         * 删除使用RegisterLoader添加的自定义加载器。只能注销自定义加载器，默认加载器将始终可用。
         * @param loader 要移除的 AbstractLoader 类
         */
        unregisterLoader(loader: AbstractLoader): void;
    }
    /**
     * JSON清单的加载器。清单内的项目会在加载器完成前加载。
     * 要使用JSONP加载清单，需要在LoadItem中指定一个回调函数。
     * 
     * 清单中的文件列表必须在顶层JSON对象的manifest属性中定义。
     * 以下示例展示了一个示例清单定义，以及如何包含子清单。
     * ```js
     * {
     *     "path": "assets/",
     *     "manifest": [
     *         "image.png",
     *         {"src": "image2.png", "id":"image2"},
     *         {"src": "sub-manifest.json", "type":"manifest", "callback":"jsonCallback"}
     *     ]
     * }
     * ```
     * 当ManifestLoader完成加载时，
     * 父加载器（通常是一个LoadQueue，但也可以是另一个ManifestLoader）将继承所有加载的项，
     * 因此可以直接访问它们。
     * 
     * 注意，JSONLoader和JSONPLoader是优先级更高的加载器，
     * 因此清单必须设置LoadItem的type属性为MANIFEST。
     * 
     * 此外，某些浏览器要求服务器提供JavaScript的mime类型用于JSONP，
     * 因此在某些条件下可能无法正常工作。
     */
    class ManifestLoader extends AbstractLoader
    {
        constructor(loadItem: LoadItem | Object);

        // methods
        /**
         * 确定加载器是否可以加载特定项目。此加载器只能加载类型为{@link MANIFEST}的项目
         * @param item LoadQueue尝试加载的LoadItem
         * @returns 加载器是否可以加载该项目
         */
        static canLoadItem(item: LoadItem | Object): boolean;
    }
    /**
     * 一个用于加载HTML标签的{@link TagRequest}，用于视频和音频。
     */
    class MediaTagRequest
    {
        /**
         * 
         * @param loadItem 
         * @param tag 
         * @param srcAttribute 指定源的标签属性,例如 "src"、"href" 等。
         */
        constructor(loadItem: LoadItem, tag: HTMLAudioElement | HTMLVideoElement, srcAttribute: string);
    }
    /**
     * 保存库特定信息(如版本和构建日期)的静态类。
     */
    class PreloadJS
    {
        /**
         * 此版本构建的UTC格式日期。
         */
        static buildDate: string;
        /**
         * 此版本的版本号字符串。
         */
        static version: string;
    }
    /**
     * 一个CreateJS事件，当进度变化时触发。
     */
    class ProgressEvent
    {
        /**
         * 
         * @param loaded 已加载的数量。这个数量可以相对于总数。
         * @param total 将要加载的总数量。这个数量默认是1，所以如果`已加载`的数量是百分比(0到1之间)，可以省略。
         */
        constructor(loaded: number, total?: number);

        // properties
        /**
         * 已加载的数量(相对于总数)。
         */
        loaded: number;
        /**
         * 加载的百分比(0到1之间)。这个百分比是使用`已加载`除以`总数`计算的。
         * @default 0
         */
        progress: number;
        /**
         * 将要加载的总数量。
         * @default 1
         */
        total: number;

        // methods
        /**
         * 返回ProgressEvent实例的副本。
         * @returns ProgressEvent实例的副本。
         */
        clone(): ProgressEvent;
    }
    /**
     * 用于解析加载项、确定文件类型等的实用程序。
     */
    class RequestUtils
    {
        // properties
        static ABSOLUTE_PATH: RegExp;
        static EXTENSION_PATT: RegExp;
        static RELATIVE_PATH: RegExp;

        // methods
        static buildPath(src: string, data?: Object): string;
        static formatQueryString(data: Object, query?: Object[]): string;
        /**
         * 使用通用扩展确定对象的类型。请注意，如果类型是不寻常的扩展，则可以将其与加载项一起传入。
         * @param extension 用于确定加载类型的文件扩展名。
         */
        static getTypeByExtension(extension: string): string;
        static isAudioTag(item: Object): boolean;
        /**
         * 确定是否应将特定类型加载为二进制文件。目前，只有专门标记为"二进制"的图像和项目才加载为二进制。请注意，音频不是二进制类型，因为如果加载为二进制，则无法使用音频标签进行回放。插件可以将项类型更改为二进制，以确保获得可使用的二进制结果。二进制文件是使用XHR2加载的。类型在AbstractLoader上定义为静态常量。
         * @param type 加载项类型
         */
        static isBinary(type: string): boolean;
        static isCrossDomain(item: Object): boolean;
        static isImageTag(item: Object): boolean;
        static isLocal(item: Object): boolean;
        /**
         * 确定特定类型是否是基于文本的资源，并且应以UTF-8加载。
         * @param type 加载项类型
         */
        static isText(type: string): boolean;
        static isVideoTag(item: Object): boolean;
        static parseURI(path: string): Object;
    }
    /**
     * 一个用于HTML音频文件的加载器。
     * PreloadJS不能加载WebAudio文件，因为需要一个WebAudio上下文，应该由一个播放声音的库(如{@link SoundJS})或一个处理音频播放的外部框架来创建。
     * 要加载可以由WebAudio播放的内容，请使用{@link BinaryLoader}，并手动处理音频上下文解码。
     */
    class SoundLoader extends AbstractMediaLoader
    {
        constructor(loadItem: LoadItem|Object, preferXHR: boolean);
        /**
         * 确定加载器是否可以加载特定项目。此加载器只能加载类型为{@link Types.SOUND | SOUND}的项目。
         * @param item LoadQueue尝试加载的LoadItem
         * @returns 加载器是否可以加载该项目
         */
        static canLoadItem(item: LoadItem|Object): boolean;
    }
    /**
     * 一个用于EaselJS SpriteSheets的加载器。SpriteSheet定义中的图像在加载器完成前加载。
     * 要使用JSONP加载SpriteSheet，请在{@link LoadItem}中指定一个{@link LoadItem.callback | 回调函数}。
     * 注意，{@link JSONLoader}和{@link JSONPLoader}是优先级更高的加载器，所以SpriteSheets**必须**设置{@link LoadItem}的{@link LoadItem.type | type}属性为{@link Types.SPRITESHEET | SPRITESHEET}。
     * 
     * 加载项的{@link LoadItem.crossOrigin | crossOrigin}属性以及{@link LoadQueue}的`basePath`参数和LoadQueue/_preferXHR属性传递给加载SpriteSheet图像的子清单。
     * 
     * 注意，SpriteSheet JSON不尊重LoadQueue/_preferXHR:property属性，应该根据SpriteSheet加载项上是否存在{@link LoadItem.callback | callback}属性来确定。
     * 这是因为JSON加载的格式会根据是否作为JSON加载而有所不同，所以只改变`preferXHR`是不够的。
     */
    class SpriteSheetLoader extends AbstractLoader
    {
        constructor(loadItem: LoadItem|Object);
        /**
         * 确定加载器是否可以加载特定项目。此加载器只能加载类型为{@link Types.SPRITESHEET | SPRITESHEET}的项目。
         * @param item LoadQueue尝试加载的LoadItem
         * @returns 加载器是否可以加载该项目
         */
        static canLoadItem(item: LoadItem|Object): boolean;
    }
    /**
     * 一个用于SVG文件的加载器。
     */
    class SVGLoader extends AbstractLoader
    {
        constructor(loadItem: LoadItem|Object, preferXHR: boolean);
        /**
         * 确定加载器是否可以加载特定项目。此加载器只能加载类型为{@link Types.SVG | SVG}的项目。
         * @param item LoadQueue尝试加载的LoadItem
         * @returns 加载器是否可以加载该项目
         */
        static canLoadItem(item: LoadItem|Object): boolean;
    }
    /**
     * 一个用于加载HTML标签的AbstractRequest，如图像和脚本。
     */
    class TagRequest
    {

    }
    /**
     * 一个用于加载文本文件的加载器。
     */
    class TextLoader extends AbstractLoader
    {
        constructor(loadItem: Object);
        /**
         * 确定加载器是否可以加载特定项目。此加载器只能加载类型为{@link Types.TEXT | TEXT}的项目。
         * @param item LoadQueue尝试加载的LoadItem
         * @returns 加载器是否可以加载该项目
         */
        static canLoadItem(item: Object): boolean;
    }
    /**
     * 一个用于视频文件的加载器。
     */
    class VideoLoader extends AbstractLoader
    {
        constructor(loadItem: Object, preferXHR: boolean);
        /**
         * 确定加载器是否可以加载特定项目。此加载器只能加载类型为{@link Types.VIDEO | VIDEO}的项目。
         * @param item LoadQueue尝试加载的LoadItem
         * @returns 加载器是否可以加载该项目
         */
        static canLoadItem(item: Object): boolean;
    }
    /**
     * 一个使用XHR请求加载项目的预加载器，通常是XMLHttpRequest。
     * 然而，如果可能的话，XDomainRequests将用于跨域请求，而较旧版本的IE在必要时会回退到ActiveX对象。
     * XHR请求将内容加载为文本或二进制数据，提供进度和一致的完成事件，并且在加载期间可以取消。
     * 注意，XHR在IE 6或更早版本中不受支持，并且不推荐用于跨域加载。
     */
    class XHRRequest extends AbstractLoader
    {
        /**
         * 
         * @param item 定义要加载的文件的对象。请参阅 {@link LoadQueue.loadFile | loadFile} 了解支持的文件属性概述。
         */
        constructor(item: Object);

        // methods
        /**
         * 从0.4.1版本开始可用
         * 
         * 获取XmlHttpRequest的所有响应头。
         * 
         * **从文档中:** 返回所有HTTP头，不包括以Set-Cookie或Set-Cookie2为不区分大小写的匹配项，作为单个字符串，每个头行用U+000D CR U+000A LF对分隔，不包括状态行，每个头名称和头值用U+003A COLON U+0020 SPACE对分隔。
         * @returns 所有响应头。
         */
        getAllResponseHeaders(): string;
        /**
         * 从0.4.1版本开始可用
         * 
         * 获取XmlHttpRequest的指定响应头。
         * 
         * **从文档中:** 返回与header匹配的响应头字段值，除非字段名称为Set-Cookie或Set-Cookie2。
         * @param header 要获取的响应头名称。
         * @returns 指定响应头的值。
         */
        getResponseHeader(header: string): string;
    }
    /**
     * 一个用于XML文件的加载器。
     */
    class XMLLoader extends AbstractLoader
    {
        constructor(loadItem: Object);
        /**
         * 确定加载器是否可以加载特定项目。此加载器只能加载类型为{@link Types.XML | XML}的项目。
         * @param item LoadQueue尝试加载的LoadItem
         * @returns 加载器是否可以加载该项目
         */
        static canLoadItem(item: Object): boolean;
    }
    /**
     * 从0.6.0版本开始可用
     * 
     * 一个用于所有其他插件的默认插件类。
     */
    class AbstractPlugin
    {
        // methods
        /**
         * 创建一个声音实例。如果声音未预加载，则在此处内部预加载。
         * @param src 要使用的声音源。
         * @param startTime 音频精灵属性,用于设置偏移量,单位为毫秒。
         * @param duration 音频精灵属性,用于设置音频片段的播放时长,单位为毫秒。
         * @returns 返回一个用于播放和控制的声音实例。
         */
        create(src: string, startTime: number, duration: number): AbstractSoundInstance;
        /**
         * 获取插件的主音量,该音量会影响所有的声音实例。
         * @returns 音量级别,介于0和1之间。
         */
        getVolume(): number;
        /**
         * 检查指定音频源的预加载是否已完成。
         * @param src 要加载的音频URI。
         */
        isPreloadComplete(src: string): boolean;
        /**
         * 检查指定音频源的预加载是否已开始。如果找到该音频源,我们可以假定它正在加载或已经完成加载。
         * @param src 要检查的音频URI。
         */
        isPreloadStarted(src: string): boolean;
        /**
         * 判断该插件是否可以在当前浏览器/操作系统中使用。
         * @returns 插件是否可以初始化。
         */
        isSupported(): boolean;
        /**
         * 内部预加载一个音频。
         * @param loader 要加载的音频URI。
         */
        preload(loader: Object): void;
        /**
         * 预先注册一个音频用于预加载和设置。这由{@link Sound}调用。
         * 注意所有插件都提供一个`Loader`实例,{@link PreloadJS}可以使用它来辅助预加载。
         * @param loadItem 包含音频源的对象。注意不是每个插件都会管理这个值。
         * @returns 一个结果对象,包含用于预加载目的的"tag"。
         */
        register(loadItem: string): Object;
        /**
         * 移除所有使用WebAudioPlugin/register添加的音频。注意这不会取消预加载。
         * @param src 要卸载的音频URI。
         */
        removeAllSounds(src: string): void;
        /**
         * 移除使用WebAudioPlugin/register添加的一个音频。注意这不会取消预加载。
         * @param src 要卸载的音频URI。
         */
        removeSound(src: string): void;
        /**
         * 通过插件静音所有音频。
         * @param value 是否应该静音所有音频。注意插件级别的静音只是查找Sound的静音值,所以这个属性在这里没有使用。
         * @returns 静音调用是否成功。
         */
        setMute(value: boolean): boolean;
        /**
         * 设置插件的主音量,该音量会影响所有的声音实例。
         * @param value 要设置的音量,介于0和1之间。
         * @returns 如果插件处理了setVolume调用则返回true。否则Sound类将手动影响所有实例。
         */
        setVolume(value: number): boolean;
    }
    /**
     * 当调用Sound API方法的{@link play}或{@link createInstance}时，会创建一个AbstractSoundInstance。AbstractSoundInstance由活动插件返回，供用户控制。
     *
     * #### 示例:
     * ```js
     * var myInstance = createjs.Sound.play("myAssetPath/mySrcFile.mp3");
     * ```
     * 可以通过多个附加参数快速确定声音的播放方式。有关参数的列表，请参阅Sound API方法的{@link play}。
     *
     * 创建AbstractSoundInstance后，可以存储一个引用，以便通过AbstractSoundInstance直接控制音频。
     * 如果不存储引用，AbstractSoundInstance将播放其音频（以及任何循环），然后从Sound类中取消引用，以便进行清理。
     * 如果音频播放已完成，只需调用{@link play}实例方法即可重新建立{@link Sound}类所需的引用以进行控制。
     * ```js
     * var myInstance = createjs.Sound.play("myAssetPath/mySrcFile.mp3", {loop:2});
     * myInstance.on("loop", handleLoop);
     * function handleLoop(event) {
     *     myInstance.volume = myInstance.volume * 0.5;
     * }
     * ```
     * 会从实例派发事件，以通知声音何时完成、循环或播放失败。
     * ```js
     * var myInstance = createjs.Sound.play("myAssetPath/mySrcFile.mp3");
     * myInstance.on("complete", handleComplete);
     * myInstance.on("loop", handleLoop);
     * myInstance.on("failed", handleFailed);
     * ```
     */
    class AbstractSoundInstance extends EventDispatcher
    {
        /**
         * 
         * @param src 音频文件的路径和名称
         * @param startTime 音频精灵属性，用于设置起始偏移量（毫秒）
         * @param duration 音频精灵属性，用于设置片段播放时长（毫秒）
         * @param playbackResource 插件支持音频播放所需的资源
         */
        constructor(src: string, startTime: number, duration: number, playbackResource: Object);

        // properties
        /** 
         * 从0.6.0版本开始可用
         * 
         * 获取或设置音频片段的长度（以毫秒为单位）
         * @default 0
         */
        duration: number;
        /** 
         * 从0.6.0版本开始可用
         * 
         * 剩余播放循环次数，负值表示无限循环
         * @default 0
         */
        loop: number;
        /** 
         * 从0.6.0版本开始可用
         * 
         * 设置或获取当前音频实例是否静音
         * @default false
         */
        muted: boolean;
        /** 
         * 从0.6.0版本开始可用
         * 
         * 声音的左右声道平衡值（-1 左声道 ~ 1 右声道），注意HTML音频不支持此属性
         * 
         * 注意：在WebAudioPlugin中这仅提供实际3D音频的"x"轴值
         * @default 0
         */
        pan: number;
        /** 
         * 从0.6.0版本开始可用
         * 
         * 获取音频是否处于暂停状态
         * @default false
         */
        paused: boolean;
        /** 
         * 保存插件特定播放资源的对象。由插件内部设置。
         * 例如：WebAudioPlugin设置数组缓冲区，HTMLAudioPlugin设置标签，FlashAudioPlugin设置Flash引用
         * @default null
         */
        playbackResource: Object;
        /** 
         * 声音的播放状态，状态常量定义在{@link Sound}中
         * @default null
         */
        playState: string;
        /** 
         * 从0.6.0版本开始可用
         * 
         * 获取或设置播放头位置（毫秒），可在播放、暂停或停止时设置
         * @default 0
         */
        position: number;
        /** 
         * 声音源文件路径
         * @default null
         */
        src: string;
        /**
         * 从0.6.1版本开始可用
         * 
         * 音频精灵属性，用于确定起始偏移量
         * @default 0
         */
        startTime:number;
        /** 
         * 实例的唯一ID，由{@link Sound}设置
         * @default -1
         */
        uniqueId: number | string;
        /** 
         * 音量值（0~1之间）
         * 
         * 实际输出音量计算公式：`myInstance.volume * createjs.Sound._getVolume();`
         * @default 1
         */
        volume: number;

        // methods
        /** 
         * 从0.6.1版本开始可用
         * 
         * 接受一个PlayPropsConfig对象或包含相同属性的普通对象，并将其设置为此实例的属性。
         * @param playProps 一个PlayPropsConfig对象或包含相同属性的普通对象
         * @returns 返回自身引用，用于链式调用
         */
        applyPlayProps(playProps:PlayPropsConfig | Object):AbstractSoundInstance;
        /** 
         * 从0.6.0版本开始可用
         * 
         * 从AbstractSoundInstance中移除所有外部引用和资源。
         * 注意：此操作是不可逆的，AbstractSoundInstance将不再工作。
         */
        destroy(): void;
        /** 
         * @param props PlayPropsConfig实例或包含播放参数的对象
         * @returns 返回自身引用用于链式调用
         * 播放声音实例（适用于已存在的SoundInstance）
         * 
         * #### 示例
         * ```js
         * var myInstance = createjs.Sound.createInstance(mySrc);
         * myInstance.play({interrupt:createjs.Sound.INTERRUPT_ANY, loop:2, pan:0.5});
         * ```
         * 注意：如果声音已在播放中，仍会设置传入参数
         * 
         * #### 参数已弃用
         * 
         * 此方法的参数已弃用，建议使用单个参数，该参数可以是Object或{@link PlayPropsConfig}。
         */
        play(props:PlayPropsConfig | Object): AbstractSoundInstance;
        /** 
         * 停止播放（会重置播放位置到0，之后无法恢复）
         * 
         * #### 示例
         * ```js
         * myInstance.stop();
         * ```
         * 提示：如需保留播放位置请使用 paused = true
         */
        stop(): AbstractSoundInstance;
    }

    /**
     * Flash音频加载器，提供通过PreloadJS预加载Flash内容的机制
     */
    class FlashAudioLoader extends AbstractLoader
    {
        // properties
        /**
         * @default null
         * 用于与Flash通信的ID（内部使用，不应修改）
         */
        flashId: string;
        // methods
        /**
         * 设置Flash实例并开始加载
         * @param flash 处理加载和播放的Flash实例
         */
        setFlash(flash: Object): void;
    }
    /**
     * 使用Flash实例播放音频。
     * 默认情况下不使用此插件，必须通过Sound的registerPlugins方法手动注册。
     * 如果需要支持旧版浏览器（如IE8）的音频功能，建议包含此插件。
     * 
     * 此插件需要FlashAudioPlugin.swf和swfObject.js，这些文件已编译到minified的FlashAudioPlugin-X.X.X.min.js文件中。
     * 使用此插件时，必须确保设置swfPath，以便脚本可以找到swf文件。
     * 
     * #### 示例
     * ```js
     * createjs.FlashAudioPlugin.swfPath = "../src/soundjs/flashaudio";
     * createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
     * // 如果WebAudio和HTMLAudio无法工作，则添加FlashAudioPlugin作为后备。
     * ```
     * #### Example
     * ```js
     * createjs.FlashAudioPlugin.swfPath = "../src/soundjs/flashaudio";
     * createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
     * // 如果WebAudio和HTMLAudio无法工作，则添加FlashAudioPlugin作为后备。
     * ```
     * 注意：SWF文件嵌入到具有id和classname为"SoundJSFlashContainer"的容器DIV中，
     * 并且将具有id为"flashAudioContainer"的DIV。
     * 容器DIV定位在屏幕左侧1像素外以避免显示1x1像素的白框。
     * 
     * #### 已知浏览器和操作系统问题
     * 
     * #### 所有浏览器
     * - 在Flash播放器开始播放音频时可能会有延迟。这在Firefox中最为明显。不幸的是，这是Flash播放器和浏览器的问题，因此无法通过SoundJS解决。
     */
    class FlashAudioPlugin extends AbstractPlugin
    {
        // properties
        /**
         * 当前版本的构建日期（UTC格式）。
         */
        static buildDate: string;
        /**
         * 标识Flash对象是否已初始化完成。
         * 需要从JavaScript调用`ExternalInterface`方法到Flash。
         * @default false
         */
        flashReady: boolean;
        /**
         * 开发者调试标志（启用后输出所有Flash事件到控制台）。
         * 
         * ```js
         * createjs.Sound.activePlugin.showOutput = true;
         * ```
         * @default false
         */
        showOutput: boolean;
        /**
         * 从0.5.2版本开始可用
         * 
         * FlashAudioPlugin.swf文件相对于HTML页面的路径。
         * 请注意，如果此路径不正确，该插件将无法工作。
         * @default src/SoundJS
         */
        static swfPath: string;
        /** 版本号 */
        static version: string;
        // methods
        /**
         * 检测当前浏览器/系统是否支持此插件
         * @returns 是否支持
         */
        static isSupported(): boolean;
    }
    /**
     * FlashAudioSoundInstance扩展了{@link AbstractSoundInstance}的基础API，并由{@link FlashAudioPlugin}使用。
     * 
     * 注意：音频控制是通过Flash实例传递的。
     */
    class FlashAudioSoundInstance extends AbstractSoundInstance
    {
        /**
         * 
         * @param src 音频文件的路径和名称
         * @param startTime 音频精灵属性，用于设置起始偏移量（毫秒）
         * @param duration 音频精灵属性，用于设置片段播放时长（毫秒）
         * @param playbackResource 插件支持音频播放所需的资源
         */
        constructor(src: string, startTime: number, duration: number, playbackResource: Object);
    }

    /**
     * @deprecated - use FlashAudioPlugin
     */
    /*class FlashPlugin {
        constructor();

        // properties
        static buildDate: string;
        flashReady: boolean;
        showOutput: boolean;
        static swfPath: string;
        static version: string;

        // methods
        create(src: string): AbstractSoundInstance;
        getVolume(): number;
        isPreloadStarted(src: string): boolean;
        static isSupported(): boolean;
        preload(src: string, instance: Object): void;
        register(src: string, instances: number): Object;
        removeAllSounds (): void;
        removeSound(src: string): void;
        setMute(value: boolean): boolean;
        setVolume(value: number): boolean;
    }*/
    /**
     * 使用HTML <audio> 标签在浏览器中播放音频。
     * 此插件是默认安装的第二个优先级插件，位于{@link WebAudioPlugin}之后。
     * 对于不支持HTML音频的旧版浏览器，请包含并安装{@link FlashAudioPlugin}。
     * 
     * #### 已知浏览器和操作系统问题
     * 
     * #### 所有浏览器
     * 
     * 测试显示，所有浏览器都有限制，允许多少个音频标签实例。
     * 如果超过此限制，您可以预期会看到不可预测的结果。请使用{@link Sound.MAX_INSTANCES}作为指南，了解可以在所有浏览器中安全使用的音频标签总数。
     * 此问题主要限于IE9。
     * 
     * #### IE html限制
     * - 在播放开始后，音频标签的音量更改会出现延迟。
     * 因此，如果您所有声音都静音，它们将在延迟期间全部播放，直到内部应用静音。
     * 无论何时或如何应用音量更改，由于标签似乎需要播放才能应用，因此都会发生这种情况。
     * - MP3编码不会总是适用于音频标签，如果它不是默认的。我们发现默认编码为64kbps时有效。
     * - 偶尔非常短的样本会被截断。
     * - 有关于可以加载或同时播放的音频标签数量的限制，似乎是由硬件和浏览器设置决定的。
     * 请参阅{@link HTMLAudioPlugin.MAX_INSTANCES}以获得安全的估计。注意，音频精灵可以作为此问题的解决方案。
     * 
     * #### Safari限制
     * - Safari 需要安装 QuickTime 才能进行音频播放。
     * 
     * #### iOS 6限制
     * - 只能有一个<audio>标签
     * - 无法预加载或自动播放音频
     * - 无法缓存音频
     * - 只能在用户触发的事件内播放音频
     * - 注意：建议iOS (6+) 使用WebAudioPlugin
     * - 使用音频精灵可以缓解部分问题，强烈建议在iOS上使用
     * 
     * #### Android原生浏览器限制
     * - 我们无法控制音频音量。只有用户可以在他们的设备上设置音量。
     * - 我们只能在用户事件（触摸/点击）内部播放音频。这目前意味着您不能循环声音或使用延迟。
     * 
     * #### Android Chrome 26.0.1410.58 特定限制
     * - 同一时间只能播放一个声音
     * - 音频不会被缓存
     * - 音频只能在用户触发的触摸/点击事件中加载
     * - 播放音频前会有延迟，推测是在加载音频源文件时产生
     *
     * 有关已知问题的通用说明，请参阅Sound类文档
     */
    class HTMLAudioPlugin extends AbstractPlugin
    {
        // properties
        /**
         * 最大实例数，此限制主要限于IE9。实际数量因浏览器而异（很大程度上取决于硬件），但这是一个安全的估计。音频精灵可以绕过此限制。
         * @default 30
         */
        static MAX_INSTANCES: number;

        // methods
        /**
         * 确定插件是否可以在当前浏览器/操作系统中使用。注意HTML音频在大多数现代浏览器中可用，但由于iOS系统的限制，该插件在iOS上被禁用。
         * @returns 插件是否可以初始化
         */
        static isSupported(): boolean;
    }
    /**
     * HTMLAudioSoundInstance 扩展了 {@link AbstractSoundInstance} 的基础 API，由 {@link HTMLAudioPlugin} 使用。
     */
    class HTMLAudioSoundInstance extends AbstractSoundInstance
    {
        /**
         * 
         * @param src 声音文件的路径和文件名
         * @param startTime 音频精灵属性，用于设置偏移量（毫秒）
         * @param duration 音频精灵属性，用于设置片段播放时长（毫秒）
         * @param playbackResource 插件支持音频播放所需的任何资源
         */
        constructor(src: string, startTime: number, duration: number, playbackResource: Object);
    }
    /**
     * HTMLAudioTagPool 是 HTML5AudioElement 实例的池。
     */
    class HTMLAudioTagPool
    {
        // methods
        /**
         * 获取具有给定源的音频标签。
         * @param src 音频标签使用的源文件。
         */
        static get(src: string): void;
        /**
         * 获取 src 音频的时长（毫秒）。
         * @param src 音频标签使用的源文件。
         * @returns src 的时长（毫秒）
         */
        static getDuration(src: string): number;
        /**
         * 删除存储的标签引用并将其返回池中。注意，如果标签引用不存在，这将失败。
         * @param src 标签的源文件。
         * @returns 如果 TagPool 被删除。
         */
        static remove(src: string): boolean;
        /**
         * 将音频标签返回池中。
         * @param src 音频标签使用的源文件。
         * @param tag 音频标签。
         */
        static set(src:string,tag:HTMLElement):void;
    }
    /**
     * 从0.6.1版本开始可用
     * 
     * 一个存储传递给 play 和 play 调用的可选播放属性的类。
     * 
     * 可选播放属性包括：
     * 
     * interrupt - 如何中断任何当前正在播放的音频实例，如果声音的最大实例数已经达到。
     * 值定义为Sound类中的INTERRUPT_TYPE常量，默认由defaultInterruptBehavior定义。
     * delay - 音频播放开始延迟的时间，以毫秒为单位。
     * offset - 从音频开始播放的偏移量，以毫秒为单位。
     * loop - 音频在到达播放结束时循环的次数。默认值为0（不循环），-1可以用于无限循环。
     * volume - 音频的音量，介于0和1之间。注意，主音量应用于单个音量。
     * pan - 音频的左右声道，介于-1（左）和1（右）之间。
     * startTime - 要创建音频精灵（带有duration），开始播放和循环的初始偏移量，以毫秒为单位。
     * duration - 要创建音频精灵（带有startTime），播放片段的时间，以毫秒为单位。
     * 
     * #### 示例
     * ```js
     * var props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5})
     * createjs.Sound.play("mySound", props);
     * // OR
     * mySoundInstance.play(props);
     * ```
     */
    class PlayPropsConfig
    {
        // properties
        /**
         * 延迟播放开始的时间，以毫秒为单位。
         * @default null
         */
        delay:number;
        /**
         * 用于创建音频精灵（带有startTime），片段播放时长，以毫秒为单位。
         * @default null
         */
        duration:number;
        /**
         * 如何中断任何正在播放的音频实例，
         * 如果声音的最大实例数已经达到。
         * 值定义为Sound类中的INTERRUPT_TYPE常量，默认由defaultInterruptBehavior定义。
         * @default null
         */
        interrupt:string;
        /**
         * 音频在到达播放结束时循环的次数。默认值为0（不循环），-1可以用于无限循环。
         * @default null
         */
        loop:number;
        /**
         * 从音频开始播放的偏移量，以毫秒为单位。
         * @default null
         */
        offset:number;
        /**
         * 音频的左右声道，介于-1（左）和1（右）之间。
         * @default null
         */
        pan:number;
        /**
         * 用于创建音频精灵（带有duration），开始播放和循环的初始偏移量，以毫秒为单位。
         * @default null
         */
        startTime:number;
        /**
         * 声音音量，取值范围0到1。注意总音量会作用于单个音量之上（总音量与单个音量相乘）。
         * @default null
         */
        volume:number;
        /**
         * 从另一个PlayPropsConfig或Object创建一个PlayPropsConfig实例。
         * @param value 播放属性
         * @returns 返回PlayPropsConfig实例
         */
        static create( value:PlayPropsConfig|any ): PlayPropsConfig;
        /**
         * 提供一个链式快捷方法，用于设置实例上的多个属性。
         * 
         * #### 示例
         * ```js
         * var PlayPropsConfig = new createjs.PlayPropsConfig().set({loop:-1, volume:0.7});
         * ```
         * @param props 一个包含播放属性的对象
         * @returns 返回实例引用，用于链式调用
         */
        set ( props:any ): PlayPropsConfig;
    }
    /**
     * Sound类是用于创建声音、控制整体音量级别以及管理插件的公共API。
     * 该类的所有Sound API都是静态方法。
     * 
     * #### 注册和预加载
     * 在播放声音之前，必须先注册它。您可以使用{@link registerSound}或使用{@link registerSounds}注册多个声音。
     * 如果您不先注册声音，请在尝试使用{@link play}或{@link createInstance}播放它之前，声音源将自动注册，但播放将失败，因为源将不会准备好。
     * 如果您使用PreloadJS，注册将在声音预加载时自动处理。建议您内部使用register函数或外部使用{@link PreloadJS}预加载声音，以便在需要时它们已经准备好。
     * 
     * #### 播放
     * 一旦声音注册和预加载，使用play方法播放声音。
     * 此方法返回一个{@link AbstractSoundInstance}，可以暂停、恢复、静音等。
     * 请参阅{@link AbstractSoundInstance}文档了解更多实例控制API。
     * 
     * #### 插件
     * 默认情况下，使用{@link WebAudioPlugin}或{@link HTMLAudioPlugin}（当可用时），尽管开发人员可以更改插件优先级或添加新插件（如提供的{@link FlashAudioPlugin}）。
     * 请参阅{@link Sound} API方法了解更多播放和插件API。要安装插件或指定不同的插件顺序，请参见Sound/installPlugins。
     * 
     * #### 示例
     * ```js
     * createjs.FlashAudioPlugin.swfPath = "../src/soundjs/flashaudio";
     * createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashAudioPlugin]);
     * createjs.Sound.alternateExtensions = ["mp3"];
     * createjs.Sound.on("fileload", this.loadHandler, this);
     * createjs.Sound.registerSound("path/to/mySound.ogg", "sound");
     * function loadHandler(event) {
     *     // This is fired for each sound that is registered.
     *     var instance = createjs.Sound.play("sound");  // play using id.  Could also use full source path or event.src.
     *     instance.on("complete", this.handleComplete, this);
     *     instance.volume = 0.5;
     * }
     * ```
     * 
     * 可以在{@link registerSound}的"data"参数中指定同一声音的并发播放实例的最大数量。
     * 注意，如果未指定，活动插件将应用默认限制。
     * 目前，{@link HTMLAudioPlugin}设置默认限制为2，{@link WebAudioPlugin}和{@link FlashAudioPlugin}设置默认限制为100。
     * ```js
     * createjs.Sound.registerSound("sound.mp3", "soundId", 4);
     * ```
     * 
     * 声音可以与PreloadJS一起用作插件，以帮助正确预加载音频。
     * 使用PreloadJS预加载的音频会自动注册到Sound类中。
     * 当音频未预加载时，Sound将自动进行内部加载。
     * 因此，如果音频未完成加载，第一次播放时可能会失败。
     * 使用{@link fileload}事件确定音频何时完成内部预加载。建议在播放之前预加载所有音频。
     * 
     * #### 示例
     * ```js
     * var queue = new createjs.LoadQueue();
     * queue.installPlugin(createjs.Sound);
     * ```
     * 
     * #### 音频精灵
     * 
     * SoundJS has added support for AudioSprite, available as of version 0.6.0. For those unfamiliar with audio sprites,
     * they are much like CSS sprites or sprite sheets: multiple audio assets grouped into a single file.
     * 
     * #### 示例
     * ```js
     * var assetsPath = "./assets/";
     * var sounds = [{
     *     src:"MyAudioSprite.ogg", data: {
     *         audioSprite: [
     *             {id:"sound1", startTime:0, duration:500},
     *             {id:"sound2", startTime:1000, duration:400},
     *             {id:"sound3", startTime:1700, duration: 1000}
     *         ]}
     *     }
     * ];
     * createjs.Sound.alternateExtensions = ["mp3"];
     * createjs.Sound.on("fileload", loadSound);
     * createjs.Sound.registerSounds(sounds, assetsPath);
     * // after load is complete
     * createjs.Sound.play("sound2");
     * ```
     * 
     * #### 移动播放
     * 
     * 运行iOS系统的设备需要通过用户主动触发的事件（如触摸/点击）播放至少一个声音来"解锁"WebAudio上下文。
     * SoundJS的早期版本包含"MobileSafe"示例，但从SoundJS 0.6.2版本开始不再需要。
     * 
     * - 在SoundJS 0.4.1及以上版本中，您可以初始化插件或使用{@link playEmptySound}方法在用户输入事件的调用栈中手动解锁音频上下文。
     * 
     * - 在SoundJS 0.6.2及以上版本中，SoundJS会自动监听第一个文档级别的"mousedown"和"touchend"事件，
     * 并解锁WebAudio。这将一直检查这些事件，直到WebAudio上下文变为"解锁"状态（从"挂起"变为"运行"）。
     * 
     * - 在iOS9及以上版本中，"mousedown"和"touchend"事件都可以用于解锁音频，
     * "touchstart"事件在iOS8及以下版本中有效，但"touchend"事件仅在iOS9中当手势被解释为"点击"时有效，
     * 如果用户长按按钮，它将不再有效。
     * 
     * - 当使用EaselJS的{@link Touch}类时，点击画布不会触发"mousedown"事件，
     * 因为MouseEvents被阻止了，以确保只有触摸事件会触发。要解决这个问题，您可以依赖"touchend"事件，或者：
     * 
     *  1.将Touch类构造函数中的`allowDefault`属性设置为`true`（默认为`false`）。
     *  2.将EaselJS `Stage`上的`preventSelection`属性设置为`false`。
     * 
     * 这些设置可能会改变应用程序的行为，因此不建议使用。
     * 
     * #### 加载备用路径和扩展名-less文件
     * 
     * SoundJS支持通过传递一个对象而不是字符串来加载备用路径和扩展名-less文件，
     * 该对象使用格式{extension:"path", extension2:"path2"}。
     * 这些标签是SoundJS确定浏览器是否支持声音的方式。
     * 这也使得多个格式可以生活在不同的文件夹中，或者在CDN上，
     * 这些文件通常具有完全不同的文件名。
     * 
     * 优先级由属性顺序决定（第一个属性先尝试）。
     * 这支持内部加载和使用PreloadJS加载。
     * 
     * 注意：播放时必须提供id。
     * 
     * #### 示例
     * ```js
     * var sounds = {path:"./audioPath/",
     *     manifest: [
     *         {id: "cool", src: {mp3:"mp3/awesome.mp3", ogg:"noExtensionOggFile"}}
     *     ]};
     * 
     * createjs.Sound.alternateExtensions = ["mp3"];
     * createjs.Sound.addEventListener("fileload", handleLoad);
     * createjs.Sound.registerSounds(sounds);
     * ```
     * 
     * ### 已知浏览器和操作系统问题
     * 
     * #### IE 9 HTML Audio限制
     * - 在播放开始后，对标签应用音量更改时会出现延迟。
     * 因此，如果您已经静音了所有声音，它们将在延迟期间全部播放，直到内部应用静音。
     * 无论何时或如何应用音量更改，由于标签似乎需要播放才能应用，因此都会发生这种情况。
     * 
     * - MP3编码不会总是适用于音频标签，特别是在Internet Explorer中。我们发现默认编码为64kbps。
     * - 偶尔非常短的样本会被截断。
     * 
     * - 有关于如何限制一次可以加载和播放的音频标签数量的限制，这似乎是由硬件和浏览器设置决定的。请参阅HTMLAudioPlugin.MAX_INSTANCES以获得安全的估计。
     * 
     * #### Firefox 25 Web Audio限制
     * 
     * - mp3音频文件在所有Windows机器上都不能正确加载，这里报告了。
     * 因此，建议在解决此问题之前，先传递另一个FF支持的类型（如ogg）。
     * 
     * #### Safari限制
     * 
     * Safari需要Quicktime安装才能播放音频。
     * 
     * #### iOS 6 Web Audio限制
     * 
     * - 音频最初被锁定，必须通过用户主动触发的事件解锁。请参阅上面的移动播放部分。
     * 
     * - 一个错误存在，当在DOM中存在具有不同sampleRate的音频的video元素时，会扭曲未缓存的web音频。
     * 
     * #### Android HTML Audio限制
     * 
     * - 我们无法控制音频音量。只有用户可以在他们的设备上设置音量。
     * - 我们只能在用户事件（触摸/点击）内部播放音频。这目前意味着您不能循环声音或使用延迟。
     * 
     * #### Web Audio和PreloadJS
     * 
     * Web Audio必须通过XHR加载，因此当与PreloadJS一起使用时，标签加载是不可能的。这意味着标签加载不能用于避免跨域问题。
     */
    class Sound extends EventDispatcher
    {
        // properties
        /**
         * 当前活动的插件。如果为null，则没有插件可以初始化。如果未指定插件，Sound尝试应用默认插件：{@link WebAudioPlugin}，然后是{@link HTMLAudioPlugin}。
         */
        static activePlugin: Object;
        /**
         * 自0.5.2版本开始可用
         * 
         * 一个用于尝试加载声音的扩展数组，如果默认扩展不被活动插件支持。这些扩展按顺序应用，因此如果您尝试在浏览器中加载Thunder.ogg，并且您的扩展数组是["mp3", "m4a", "wav"]，它将检查mp3支持，然后是m4a，然后是wav。音频文件需要位于同一位置，因为仅更改扩展名。
         * 
         * 注意，无论加载哪个文件，您都可以使用相同的id或传递给加载的相同源路径调用createInstance和play。
         * 
         * #### 示例
         * ```js
         * var sounds = [
         *     {src:"myPath/mySound.ogg", id:"example"},
         * ];
         * createjs.Sound.alternateExtensions = ["mp3"]; // 现在如果ogg格式不被支持，SoundJS将尝试加载asset0.mp3
         * createjs.Sound.on("fileload", handleLoad); // 当每个声音加载时调用handleLoad
         * createjs.Sound.registerSounds(sounds, assetPath);
         * // ...
         * createjs.Sound.play("myPath/mySound.ogg"); // 无论支持哪种格式，都可以工作。注意使用ID调用是更好的方法
         * ```
         */
        static alternateExtensions: any[];
        /**
         * 自0.4.0版本开始可用
         * 
         * 确定在达到声音的最大实例数时，默认行为是否中断其他正在播放的实例。
         * 目前默认值为INTERRUPT_NONE，但可以设置并相应地更改播放行为。这只在调用play时没有传递值时使用。
         * 
         * @default Sound.INTERRUPT_NONE 或 "none"
         */
        static defaultInterruptBehavior: string;
        /**
         * 自0.4.0版本开始可用
         * 
         * 一些扩展使用另一种类型来播放（其中之一是codex）。这允许您将该支持映射到插件，以便插件可以准确地确定是否支持扩展。
         * 添加到此列表可以帮助插件更准确地确定是否支持扩展。
         * 
         * 每个格式的扩展列表可以在这个页面找到：http://html5doctor.com/html5-audio-the-state-of-play/。
         * 
         * @default {m4a:"mp4"}
         */
        static EXTENSION_MAP: Object;
        /**
         * 中断任何正在播放的实例，如果声音的最大实例数已经播放。
         * @default "any"
         */
        static INTERRUPT_ANY: string;
        /**
         * 当该声音的实例已达到最大播放数量时，用于中断同源音频中播放进度最少的当前最早播放实例的中断值。
         * @default "early"
         */
        static INTERRUPT_EARLY: string;
        /**
         * 当该声音的实例已达到最大播放数量时，用于中断同源音频中播放进度最多的当前最早播放实例的中断值。
         * @default "late"
         */
        static INTERRUPT_LATE: string;
        /**
         * 当该声音的实例已达到最大播放数量时，用于不中断任何正在播放的实例的中断值。
         * @default "none"
         */
        static INTERRUPT_NONE: string;
        /**
         * 定义一个实例的playState，该实例无法播放。通常是由于在"INTERRUPT_NONE"中断模式下缺乏可用通道，播放停滞，或者声音无法找到。
         * @default "playFailed"
         */
        static PLAY_FAILED: string;
        /**
         * 定义已完成播放的实例的playState状态。
         * @default "playFinished"
         */
        static PLAY_FINISHED: string;
        /**
         * 定义仍处于初始化阶段的实例的playState状态。
         * @default "playInited"
         */
        static PLAY_INITED: string;
        /**
         * 定义被其他实例中断的实例的playState状态。
         * @default "playInterrupted"
         */
        static PLAY_INTERRUPTED: string;
        /**
         * 定义当前正在播放或已暂停的实例的playState状态。
         * @default "playSucceeded"
         */
        static PLAY_SUCCEEDED: string;
        /**
         * 自0.4.0版本开始可用
         * 
         * Sound将尝试播放的默认支持扩展列表。插件将检查浏览器是否可以播放这些类型，因此修改此列表之前插件初始化将允许插件尝试支持其他媒体类型。
         * 
         * 注意：此列表不适用于{@link FlashAudioPlugin}。
         * 
         * 更多关于文件格式的信息可以在这里找到：http://en.wikipedia.org/wiki/Audio_file_format。
         * 一个非常详细的文件格式列表可以在这里找到：http://www.fileinfo.com/filetypes/audio。
         * 
         * @default ["mp3", "ogg", "opus", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"]
         */
        static SUPPORTED_EXTENSIONS: string[];
        /**
         * 自0.6.1版本开始可用
         * 
         * 静音/取消静音所有音频。注意，静音的音频仍然会以0音量播放。这个全局静音值是单独维护的，当设置时会覆盖，但不会改变单个实例的静音属性。
         * 要静音单个实例，请使用AbstractSoundInstance {@link muted}代替。
         * 
         * #### 示例
         * ```js
         * createjs.Sound.muted = true;
         * ```
         * @default false
         */
        static muted: boolean;
        /**
         * 自0.6.1版本开始可用
         * 
         * 设置Sound的音量。主音量乘以每个声音的单独音量。例如，如果主音量是0.5，一个声音的音量是0.5，那么结果音量是0.25。要设置单个声音的音量，请使用AbstractSoundInstance {@link volume}代替。
         * 
         * #### 示例
         * ```js
         * createjs.Sound.volume = 0.5;
         * ```
         * 
         * @default 1
         */
        static volume: number;
        /**
         * 自0.6.1版本开始可用
         * 
         * 获取活动插件的能力，这些能力有助于确定插件是否可以在当前环境中使用，或者插件是否支持特定功能。能力包括：
         * 
         * - panning: 如果插件可以左右平移音频。
         * - volume: 如果插件可以控制音频音量。
         * - tracks: 可以同时播放的音频轨道的最大数量。如果没有已知的限制，这将返回-1。
         * 
         * 每个在SUPPORTED_EXTENSIONS中的文件类型：
         * - mp3: 如果MP3音频被支持。
         * - ogg: 如果OGG音频被支持。
         * - wav: 如果WAV音频被支持。
         * - mpeg: 如果MPEG音频被支持。
         * - m4a: 如果M4A音频被支持。
         * - mp4: 如果MP4音频被支持。
         * - aiff: 如果aiff音频被支持。
         * - wma: 如果wma音频被支持。
         * - mid: 如果mid音频被支持。
         * 
         * 您可以使用标准对象表示法获取活动插件的特定能力。
         * 
         * #### 示例
         * ```js
         * var mp3 = createjs.Sound.capabilities.mp3;
         * ```
         * 
         * 注意：此属性是只读的。
         */
        static capabilities: any;

        // methods
        /**
         * 使用传递的src创建一个AbstractSoundInstance。
         * 如果src没有支持的扩展名或没有可用的插件，将返回一个默认的AbstractSoundInstance，可以安全地调用，但不会执行任何操作。
         * 
         * #### 示例
         * ```js
         * var myInstance = null;
         * createjs.Sound.on("fileload", handleLoad);
         * createjs.Sound.registerSound("myAudioPath/mySound.mp3", "myID", 3);
         * function handleLoad(event) {
         *     myInstance = createjs.Sound.createInstance("myID");
         *     // 或者我们可以调用以下内容
         *     myInstance = createjs.Sound.createInstance("myAudioPath/mySound.mp3");
         * }
         * ```
         * 
         * 注意：要创建一个未注册的音频精灵，需要同时设置startTime和duration。
         * 这是在创建新的音频精灵时，而不是使用已经注册的音频精灵的id时。
         * 
         * @param src 音频的src或ID。
         * @param startTime 要创建音频精灵（带有duration），开始播放和循环的初始偏移量，以毫秒为单位。
         * @param duration 要创建音频精灵（带有startTime），播放片段的时间，以毫秒为单位。
         * @returns 返回一个可以控制AbstractSoundInstance实例。不支持的扩展将返回默认的AbstractSoundInstance。
         */
        static createInstance(src: string, startTime?: number, duration?: number): AbstractSoundInstance;
        /**
         * 使用capabilities属性代替。
         */
        static getCapabilities(): Object;
        /**
         * 从0.6.1版本开始可用
         * 
         * 获取传递的src或ID的默认播放属性。这些属性应用于所有新的SoundInstances。如果默认不存在，则返回null。
         * @param src 用于注册音频的src或ID。
         * @returns 返回一个PlayPropsConfig实例或null（如果不存在）。
         */
        getDefaultPlayProps(src: string): PlayPropsConfig;
        /**
         * 使用muted属性代替。
         * @returns 
         */
        getMute(): boolean;
        /**
         * 从0.4.0版本开始可用
         * 
         * 初始化默认插件。当任何音频被播放或注册之前，用户手动注册插件之前，自动调用此方法，并启用Sound在没有手动插件设置的情况下工作。
         * 目前，默认插件是WebAudioPlugin followed by HTMLAudioPlugin。
         * 
         * #### 示例
         * ```js
         * if (!createjs.initializeDefaultPlugins()) { return; }
         * ```
         * @returns 如果插件被初始化，返回true，否则返回false。
         */
        static initializeDefaultPlugins(): boolean;
        /**
         * 确定Sound是否已经初始化，并且插件是否已激活。
         * 
         * #### 示例
         * ```js
         * if (!createjs.Sound.isReady()) {
         *     createjs.FlashAudioPlugin.swfPath = "../src/soundjs/flashaudio/";
         *     createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
         * }
         * ```
         * @returns 如果Sound已初始化，并且插件已激活，返回true，否则返回false。
         */
        static isReady(): boolean;
        /**
         * 从0.4.0版本开始可用
         * 
         * 检查内部预加载器是否已加载src。这是必要的，以确保在播放之前没有完成预加载的声音不会触发新的内部预加载。
         * 
         * #### 示例
         * ```js
         * var mySound = "assetPath/asset0.ogg";
         * if(createjs.Sound.loadComplete(mySound)) {
         *     createjs.Sound.play(mySound);
         * }
         * ```
         * @param src 正在加载的src或id。
         * @returns 如果src已加载，返回true，否则返回false。
         */
        static loadComplete(src: string): boolean;
        /**
         * 播放一个声音并获取一个AbstractSoundInstance来控制。如果声音无法播放，仍然会返回一个AbstractSoundInstance，并且有一个PLAY_FAILED的playState。
         * 注意，即使声音播放失败，您仍然可以调用play方法，因为失败可能是由于缺乏可用的通道。
         * 如果src没有支持的扩展名或没有可用的插件，仍然会返回一个默认的AbstractSoundInstance，不会播放任何音频，但不会生成错误。
         * 
         * #### 示例
         * ```js
         * createjs.Sound.on("fileload", handleLoad);
         * createjs.Sound.registerSound("myAudioPath/mySound.mp3", "myID", 3);
         * function handleLoad(event) {
         *     createjs.Sound.play("myID");
         *     // store off AbstractSoundInstance for controlling
         *     var myInstance = createjs.Sound.play("myID", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
         * }
         * ```
         * 
         * 注意：要创建一个没有注册的音频精灵，需要同时设置startTime和duration。
         * 这是在创建新的音频精灵时，而不是使用已经注册的音频精灵的id时。
         * 
         * @param src 音频的src或ID。
         * @param props PlayPropsConfig实例，或包含声音播放参数的对象。详情请参见PlayPropsConfig。
         * @returns 可在创建后进行控制的AbstractSoundInstance实例。
         */
        static play(src: string, props:PlayPropsConfig|any): AbstractSoundInstance;
        /**
         * 
         */
        static registerManifest(manifest: Object[], basePath: string): Object;
        /**
         * 注册一个列表的Sound插件，按优先级顺序。要注册一个插件，在数组中传递一个元素。
         * 
         * #### 示例
         * ```js
         * createjs.FlashAudioPlugin.swfPath = "../src/soundjs/flashaudio/";
         * createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
         * ```
         * 
         * @param plugins 要安装的插件类数组。
         * @returns 是否成功初始化插件。
         */
        static registerPlugins(plugins: any[]): boolean;
        /**
         * 从0.4.0版本开始可用

         * 注册一个音频文件以在Sound中加载和将来播放。
         * 使用PreloadJS时自动调用。建议注册所有需要播放的声音，以便正确准备和预加载它们。Sound在需要时进行内部预加载。
         * 
         * #### 示例
         * ```js
         * createjs.Sound.alternateExtensions = ["mp3"];
         * createjs.Sound.on("fileload", handleLoad); // add an event listener for when load is completed
         * createjs.Sound.registerSound("myAudioPath/mySound.ogg", "myID", 3);
         * createjs.Sound.registerSound({ogg:"path1/mySound.ogg", mp3:"path2/mySoundNoExtension"}, "myID", 3);
         * ```
         * 
         * @param src 音频的src或包含"src"属性的对象或包含多个扩展标记src属性的对象。
         * @param id 用户指定的ID，用于稍后播放声音。注意，当src是多个扩展标记src属性时，id是必需的。
         * @param data 与项目关联的数据。Sound使用data参数作为音频实例的声道数，
         * 但如果data对象用于其他信息时，可以附加一个"channels"属性。
         * 如果未找到值，音频通道将根据插件设置默认值。
         * Sound还使用data属性来存储符合以下格式的{@link AudioSprite}对象数组 {id, startTime, duration}。
         * id用于后续播放声音，其方式与带有id的声音源相同。
         * startTime是开始播放和循环的初始偏移量（以毫秒为单位）。
         * duration是音频片段的播放时长（以毫秒为单位）。
         * 这使得Sound能够支持通过id播放的音频精灵。
         * @param basePath 设置一个路径，用于加载src。
         * @param defaultPlayProps 可选的播放属性，将设置为任何新的AbstractSoundInstance的默认值。详情请参见PlayPropsConfig。
         * @returns 返回一个包含修改值的对象，定义了声音。如果源无法解析或无法初始化插件，返回false。如果源已加载，返回true。
         */
        static registerSound(src: string | Object, id?: string, data?: number | Object, basePath?: string,defaultPlayProps?:PlayPropsConfig): Object;
        /**
         * 从0.6.0版本开始可用
         * 
         * 注册一个音频文件列表以在Sound中加载和将来播放。建议注册所有需要播放的声音，以便正确准备和预加载它们。Sound在需要时进行内部预加载。
         * 
         * #### 示例
         * ```js
         * var assetPath = "./myAudioPath/";
         * var sounds = [
         *     {src:"asset0.ogg", id:"example"},
         *     {src:"asset1.ogg", id:"1", data:6},
         *     {src:"asset2.mp3", id:"works"}
         *     {src:{mp3:"path1/asset3.mp3", ogg:"path2/asset3NoExtension"}, id:"better"}
         * ];
         * createjs.Sound.alternateExtensions = ["mp3"];    // if the passed extension is not supported, try this extension
         * createjs.Sound.on("fileload", handleLoad); // call handleLoad when each sound loads
         * createjs.Sound.registerSounds(sounds, assetPath);
         * ```
         * 
         * @param sounds 一个包含src和id属性的对象数组，或者一个包含src和id属性的对象，以及可选的data和basePath属性。
         * @param basePath 设置一个路径，用于加载src。当创建、播放或删除通过src加载的音频时，必须包含basePath。
         * @returns 返回一个包含修改值的对象数组，这些值定义了每个声音。像registerSound一样，当源无法解析或无法初始化插件时，返回false。当源已加载时，返回true。
         */
        static registerSounds(sounds: Object[], basePath?: string): Object[];
        /**
         * 从0.4.1版本开始可用
         * 
         * 删除所有通过{@link registerSound}或{@link registerSounds}注册的声音。
         * 注意，这将停止所有活动的声音实例的播放，然后删除它们。
         * 
         * #### 示例
         * ```js
         * createjs.Sound.removeAllSounds();
         * ```
         */
        static removeAllSounds(): void;
        /**
         * 
         */
        static removeManifest(manifest: any[], basePath: string): Object;
        /**
         * 从0.4.1版本开始可用
         * 
         * 删除通过{@link registerSound}或{@link registerSounds}注册的声音。
         * 注意，这将停止所有活动的声音实例的播放，然后删除它们。
         * 注意，如果传递了basePath，您需要在这里传递它或预先添加它到src。
         * 
         * #### 示例
         * ```js
         * createjs.Sound.removeSound("myID");
         * createjs.Sound.removeSound("myAudioBasePath/mySound.ogg");
         * createjs.Sound.removeSound("myPath/myOtherSound.mp3", "myBasePath/");
         * createjs.Sound.removeSound({mp3:"musicNoExtension", ogg:"music.ogg"}, "myBasePath/");
         * ```
         * 
         * @param src 音频的src或ID，或包含"src"属性的对象，或包含多个扩展标记src属性的对象。
         * @param basePath 设置一个路径，用于加载src。当创建、播放或删除通过src加载的音频时，必须包含basePath。
         * @returns 如果声音被删除，返回true，否则返回false。
         */
        static removeSound(src: string | Object, basePath: string): boolean;
        /**
         * 从0.4.1版本开始可用
         * 
         * 删除通过{@link registerSound}或{@link registerSounds}注册的音频文件列表。
         * 注意，这将停止所有活动的声音实例的播放，然后删除它们。
         * 注意，如果传递了basePath，您需要在这里传递它或预先添加它到src。
         * 
         * #### 示例
         * ```js
         * var assetPath = "./myPath/";
         * var sounds = [
         *     {src:"asset0.ogg", id:"example"},
         *     {src:"asset1.ogg", id:"1", data:6},
         *     {src:"asset2.mp3", id:"works"}
         * ];
         * createjs.Sound.removeSounds(sounds, assetPath);
         * ```
         * 
         * @param sounds 要删除的对象数组。
         * 对象的格式需要为removeSound: {srcOrID:srcURIorID}。
         * 您也可以传递一个包含path和manifest属性的对象，其中path是一个basePath，manifest是一个要删除的对象数组。
         * @param basePath 设置一个路径，用于加载src。当创建、播放或删除通过src加载的音频时，必须包含basePath。
         * @returns Set a path that will be prepended to each src when removing.
         */
        static removeSounds(sounds: Object[], basePath: string): any[];
        /**
         * 从0.6.1版本开始可用
         * 
         * 设置传递的src或ID的默认播放属性。请参见{@link PlayPropsConfig}以获取可用属性。
         * 
         * @param src 用于注册音频的src或ID。
         * @param playProps 您想要设置的播放属性。
         */
        setDefaultPlayProps(src:string, playProps:any|PlayPropsConfig):void;
        /**
         * 停止所有音频（全局停止）。被停止的音频会被重置而非暂停。若要播放已停止的音频，请调用AbstractSoundInstance的play方法。
         * 
         * #### 示例
         * ```js
         * createjs.Sound.stop();
         * ```
         */
        static stop(): void;

        // EventDispatcher mixins
        /*static addEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): Function;
        static addEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): Function;
        static addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): Object;
        static addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): Object;
        static dispatchEvent(eventObj: Object | string | Event, target?: Object): boolean;
        static hasEventListener(type: string): boolean;
        static off(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
        static off(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        static off(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
        static off(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        static off(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        static on(type: string, listener: (eventObj: Object) => boolean, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        static on(type: string, listener: (eventObj: Object) => void, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
        static on(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        static on(type: string, listener: { handleEvent: (eventObj: Object) => void; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
        static removeAllEventListeners(type?: string): void;
        static removeEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
        static removeEventListener(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
        static toString(): string;
        static willTrigger(type: string): boolean;*/
    }
    /**
     * 静态类，保存库特定信息，如库的版本和buildDate。SoundJS类已重命名为Sound。请参见Sound以获取有关使用声音的信息。
     */
    class SoundJS {
        /**
         * 此版本的构建日期，以UTC格式表示。
         */
        static buildDate: string;
        /**
         * 此版本的版本字符串。
         */
        static version: string;
    }
    /**
     * Loader 提供了通过 PreloadJS 或内部机制预加载 Web Audio 内容的机制。
     * 实例会被返回给预加载器，当需要请求资源时会调用 load 方法。
     */
    class WebAudioLoader
    {
        /**
         * 解码音频所需的Web音频上下文
         */
        static context: AudioContext;
    }
    /**
     * 自0.4.0版本开始可用
     * 
     * 使用Web Audio在浏览器中播放声音。WebAudioPlugin是当前的默认插件，并且将在任何支持的地方使用。
     * 要更改插件优先级，请查看Sound API的{@link registerPlugins}方法。
     * 
     * ### 已知浏览器和操作系统问题
     * 
     * #### Firefox 25
     * - 在所有Windows系统机器上，MP3音频文件无法正确加载，已在此处报告。
     * 因此，建议在解决此问题之前，传递另一个FireFox支持的类型（例如ogg）作为默认扩展名。
     * 
     * #### Webkit (Chrome 和 Safari)
     * - AudioNode.disconnect 方法似乎并不总是有效。如果播放大量音频文件，这会导致文件体积随着时间推移不断增长。
     * 
     * #### iOS 6限制
     * - 声音最初是静音的，并且只有在用户发起的事件（触摸/点击）内部调用play时才会取消静音。
     * 请阅读{@link Sound}类中的移动播放说明，以了解限制的完整概述，以及如何解决这些问题。
     * - 存在一个bug，当视频元素存在于DOM中时，未缓存的音频会被扭曲。您可以通过确保音频和视频音频共享相同的采样率来避免此问题。
     * 
     */
    class WebAudioPlugin extends AbstractPlugin
    {
        // properties
        /**
         * Web Audio上下文，WebAudio使用它来播放音频。所有与WebAudioPlugin交互的音频节点都需要在此上下文中创建。
         * 
         * 高级用户可以将其设置为现有上下文，但必须在调用{@link registerPlugins}或{@link initializeDefaultPlugins}之前这样做。
         */
        static context: AudioContext;
        /**
         * 用于播放音频的Web音频上下文。所有与WebAudioPlugin交互的节点都需要在此上下文中创建。
         */
        context: AudioContext;
        /**
         * 用于检查iOS兼容性时使用的默认采样率。请参阅{@link _createAudioContext}。
         * @default 44100
         */
        static DEFAULT_SAMPLE_RATE: number;
        /**
         * 一个DynamicsCompressorNode，用于提高声音质量并防止音频失真。它连接到context.destination。
         * 
         * 高级用户可以通过createjs.Sound.activePlugin.dynamicsCompressorNode访问。
         */
        dynamicsCompressorNode: DynamicsCompressorNode;
        /**
         * 一个GainNode，用于控制主音量。它连接到dynamicsCompressorNode。
         * 
         * 高级用户可以通过createjs.Sound.activePlugin.gainNode访问。
         */
        gainNode: GainNode;

        // methods
        /**
         * 确定插件是否可以在当前浏览器/操作系统中使用。
         * 
         * @returns 如果插件可以初始化，返回true，否则返回false。
         */
        static isSupported(): boolean;
        /**
         * 自0.4.1版本开始可用
         * 
         * 在Web音频上下文中播放一个空的声音。这是用于在iOS设备上启用Web音频，因为它们要求第一个声音在用户发起的事件（触摸/点击）内部播放。
         * 当WebAudioPlugin被初始化时（例如，通过Sound initializeDefaultPlugins），会调用此方法。
         * 
         * #### 示例
         * ```js
         * function handleTouch(event) {
         *     createjs.WebAudioPlugin.playEmptySound();
         * }
         * ```
         */
        static playEmptySound(): void;
    }
    /**
     * WebAudioSoundInstance 扩展了 AbstractSoundInstance 的基类 API，并被 WebAudioPlugin 使用。
     * 
     * WebAudioSoundInstance 为高级用户公开了 audioNodes 的访问接口。
     */
    class WebAudioSoundInstance extends AbstractSoundInstance
    {
        /**
         * 
         * @param src The path to and file name of the sound.
         * @param startTime Audio sprite property used to apply an offset, in milliseconds.
         * @param duration Audio sprite property used to set the time the clip plays for, in milliseconds.
         * @param playbackResource Any resource needed by plugin to support audio playback.
         */
        constructor(src: string, startTime: number, duration: number, playbackResource: Object);

        // properties
        /**
         * 注意，这个只用于高级用户。
         * 在关闭时，将分配给源节点的buffer属性。
         * 这个和{@link WebAudioPlugin}引用的相同。
         */
        static _scratchBuffer:AudioBufferSourceNode;
        /**
         * 自0.6.0版本开始可用
         * 
         * 注意，这个只用于高级用户。
         * 用于创建节点的音频上下文。这个和{@link WebAudioPlugin}使用的相同。
         */
        static context: AudioContext;
        /**
         * 自0.6.0版本开始可用
         * 
         * 注意，这个只用于高级用户。
         * 来自{@link WebAudioPlugin}的音频节点，连接到context.destination。
         */
        static destinationNode: AudioNode;
        /**
         * 自0.4.0版本开始可用
         * 
         * 注意，这个只用于高级用户。
         * 用于控制{@link WebAudioSoundInstance}音量的GainNode。连接到destinationNode。
         */
        gainNode: GainNode;
        /**
         * 自0.4.0版本开始可用
         * 
         * 注意，这个只用于高级用户。
         * 一个允许左右音频通道平移的panNode。连接到{@link WebAudioSoundInstance}的gainNode。
         */
        panNode: PannerNode;
        /**
         * 自0.4.0版本开始可用
         * 
         * 注意，这个只用于高级用户。
         * sourceNode是音频源。连接到{@link WebAudioSoundInstance}的panNode。
         */
        sourceNode: AudioNode;
    }
}
export default createjs;