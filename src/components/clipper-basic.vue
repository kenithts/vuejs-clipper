<template>
  <div class="clipper-basic">
    <div
      class="clip-area"
      :class="{ vertical: isVertical }"
      :style="areaStyle"
    >
      <canvas
        class="stem-canvas"
        :width="stemArea.width"
        :height="stemArea.height"
      />
      <div
        class="in-pad"
        :style="{'padding': areaStyle.padding}"
      >
        <div
          class="img-scale"
          :style="scaleStyle"
        >
          <img
            :src="src"
            class="img"
            :style="rotateStyle"
            :crossorigin="crossOrigin"
            @load="imgLoaded();emit('load',$event)"
            @error="emit('error',$event)"
          >
        </div>
      </div>
      <div
        class="zoom-area shadow"
        :style="posObj"
      >
        <div
          class="extend outer"
          :style="exOuterStyle"
        />
        <div
          class="extend inner"
          :style="exInnerStyle"
        >
          <div class="drag-inset" />
        </div>
        <div v-if="corner">
          <div
            v-for="index in 4"
            :key="'corner'+index"
            class="corner"
            :class="`corner${index}`"
          />
        </div>
        <div
          v-if="grid"
          class="grid"
        >
          <div
            v-for="index in 4"
            :key="'gridItem'+index"
            class="grid-item"
          />
        </div>
        <slot name="area" />
      </div>
    </div>
    <div
      class="placeholder"
      :style="eptStyle"
    >
      <slot name="placeholder" />
    </div>
  </div>
</template>
<script>
import { basicMethods, rxEventListeners, pluginMethods } from './extends/clippo'
import { Subject } from 'rxjs'
import {
  map,
  tap,
  filter,
  takeUntil,
  concatMap,
  startWith,
  merge
} from 'rxjs/operators'
export default {
  extends: {
    methods: basicMethods,
    mixins: [ rxEventListeners, pluginMethods ]// mousedown$,mousemove$...
  },
  subscriptions () {
    this.change$ = new Subject()
    // set value
    this.setWH$ = new Subject()
    this.setTL$ = new Subject()
    this.initWHTL$ = new Subject().pipe(map(this.initWHTL))
    // interupter
    this.stop$ = new Subject()
    /* events */
    this.mousedownDrag$ = new Subject().pipe(// moving left, top
      merge(this.mousedown$),
      filter(this.isDragElement),
      tap(this.prevent), // deal with down, we want to calc down just for once.
      map(e => this.eInZoom(e)), // 點擊時zoom的position,rect
      concatMap(// 將down (zoom rect), move交給後續
        () => this.mousemove$.pipe(takeUntil(this.mouseup$)),
        (down, move) => {
          return { down, move }
        }
      )
    )
    this.touchdownDrag$ = this.touchstart$.pipe(
      filter(this.isDragElement),
      filter(e => e.touches.length === 1), // 單指
      tap(this.prevent), // deal with down, we want to calc down just for once.
      map(e => this.eInZoom(e.touches[0])),
      concatMap(
        () =>
          this.touchmove$.pipe(
            takeUntil(this.touchend$),
            filter(e => e.touches.length === 1), // 單指
            map(e => e.touches[0])
          ),
        (down, move) => {
          return { down, move }
        }
      )
    )
    this.mousedownZoom$ = new Subject().pipe(
      merge(this.mousedown$),
      filter(this.isZoomElement),
      tap(this.prevent),
      map(this.setDownPosition),
      concatMap(
        () => this.mousemove$.pipe(takeUntil(this.mouseup$)),
        (down, move) => {
          return { down, move }
        }
      )
    )
    this.touchdownZoom$ = this.touchstart$.pipe(
      filter(this.isZoomElement),
      filter(e => e.touches.length === 1),
      tap(this.prevent),
      map(this.setDownPosition),
      concatMap(
        () =>
          this.touchmove$.pipe(
            takeUntil(this.touchend$),
            filter(e => e.touches.length === 1),
            map(e => e.touches[0])
          ),
        (down, move) => {
          return { down, move }
        }
      )
    )
    this.touchTwoFingersZoom$ = this.touchstart$.pipe(
      filter(e => {
        return e.touches.length === 2
      }),
      filter(this.isTwoPointZoomElement),
      tap(this.prevent),
      map(() => {
        this.stop$.next(0) // stop drag create event
        const freezeZoom = this.zoomPos() // get zoom position at down
        return { event, zoom: freezeZoom }
      }),
      concatMap(
        () =>
          this.touchmove$.pipe(
            filter(e => e.touches.length === 2),
            tap(this.prevent),
            takeUntil(this.touchend$)
          ),
        (down, move) => {
          return this.getTwoTouchesPos(down.event, move, down.zoom)
        }
      )
    )
    this.mousedownCreate$ = this.mousedown$.pipe(
      filter(this.isCreateElement),
      tap(this.prevent),
      map(this.getFakeDown),
      concatMap(
        () => this.mousemove$.pipe(takeUntil(this.mouseup$)),
        (down, move) => {
          return { down, move }
        }
      )
    )
    this.touchstartCreate$ = this.touchstart$.pipe(
      filter(this.isCreateElement),
      tap(this.prevent),
      map(e => e.touches[0]),
      map(this.getFakeDown),
      concatMap(
        () =>
          this.touchmove$.pipe(
            takeUntil(this.touchend$),
            takeUntil(this.stop$), // 兩指事件觸發時停止
            filter(e => e.touches.length === 1), // 單指
            filter(() => this.touchCreate)
          ),
        (down, move) => {
          // down is fake
          return { down, move: move.touches[0] }
        }
      )
    )
    /** *************MAIN SUBJECT (1)************
     position: left, top, right, bottom (2 of 4) */
    this.dragSubject$ = new Subject().pipe(
      merge(this.mousedownDrag$),
      merge(this.touchdownDrag$),
      map(this.dragMoving) /* @down: eInZoom. @move: mouse/touch move event */,
      map(this.repositionDrag), // validate & reposition @down
      merge(this.setTL$), // this must be validate pos!!!! (in range)
      startWith({ left: 0, top: 0 }) // vm view not init yet (this.zoomEl===null). To prevent "cannot read 'left' of undefined"
    )
    /** *************MAIN SUBJECT (3)************
    Subject 3, 起始event不同，處理後傳給zoomSubject$
    */
    this.dragCreateSubject$ = this.mousedownCreate$
      .pipe(
        merge(this.touchstartCreate$),
        map(({ down, move }) => {
          return { down, move }
        })
      )
    /** *************MAIN SUBJECT (2)************
     width, height */
    this.zoomSubject$ = new Subject().pipe(
      merge(this.mousedownZoom$), // mouse event
      merge(this.touchdownZoom$), // touch event 1 finger
      merge(this.dragCreateSubject$), // dragCreateSubject$
      map(this.reverseDownPos), // mode 'switch'
      map(this.getCreatePos), // 根據down, move,創造一個zoom rect (不限於一開始狀態))
      map(this.zoomingPosition), // 用創造的zoom rect去計算拖拉後的位置
      merge(this.touchTwoFingersZoom$), /* touch event 2 fingers(兩指縮放)*  和上面事件分開，算法不同 */
      // { down, move } => { width, height, maxWidth, maxHeight, left, top, right, bottom }
      map(this.setRatioWH),
      map(this.toPercentage),
      map(this.splitPos),
      map(split => {
        const position = split.tl
        const size = split.wh
        this.setTL$.next(position)
        return size
      }),
      startWith({ width: 0, height: 0 }),
      merge(this.initWHTL$),
      merge(this.setWH$)
    )
    this.onChange$ = new Subject().pipe(
      merge(this.dragSubject$),
      merge(this.change$)
    )
    return {
      // subscriptions
      zoomTL$: this.dragSubject$,
      zoomWH$: this.zoomSubject$
    }
  },
  props: {
    preview: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    border: {
      type: Number,
      default: 1
    },
    outline: {
      type: Number,
      default: 6
    },
    corner: {
      type: Boolean,
      default: true
    },
    grid: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'normal'
    },
    ratio: {
      type: Number,
      default: NaN
    },
    wrapRatio: {
      type: Number,
      default: NaN
    },
    touchCreate: {
      // enable/disable create new zoom area in touch device;
      type: Boolean,
      default: true
    },
    rotate: {
      type: Number,
      default: 0
    },
    bgColor: {
      type: String,
      default: 'white'
    },
    shadow: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    scale: {
      type: Number,
      default: 1
    },
    minWidth: {
      type: Number,
      default: 1
    },
    minHeight: {
      type: Number,
      default: 1
    },
    initWidth: {
      type: Number,
      default: 50
    },
    initHeight: {
      type: Number,
      default: 50
    },
    crossOrigin: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      imgRatio: NaN
    }
  },
  computed: {
    posObj: function () {
      let style = {
        'border-width': `${this.border}px !important`,
        'width': `${this.zoomWH$.width}% !important`,
        'height': `${this.zoomWH$.height}% !important`,
        'color': `${this.shadow} !important`,
        'box-shadow': `0 0 0 ${this._shadow} !important`
      }
      for (let k in this.zoomTL$) {
        if (typeof this.zoomTL$[k] === 'number') { style[k] = `${this.zoomTL$[k]}% !important` }
      }
      return style
    },
    scaleStyle: function () {
      return {
        transform: `scale(${this.scale}) !important`
      }
    },
    rotateStyle: function () {
      return {
        transform: `rotate(${this.rotate}deg) !important`
      }
    },
    areaStyle: function () {
      const _border = `${this.border}px !important`
      const display = `${(this.src) ? 'block' : 'none'} !important`
      const backgroundColor = `${this.bgColor} !important`
      return {
        padding: _border,
        display,
        'background-color': backgroundColor
      }
    },
    eptStyle: function () {
      const display = `${(this.src) ? 'none' : 'block'} !important`
      return { display }
    },
    exOuterStyle: function () {
      const _outline = `${this.outline + this.border}px`
      return {
        'border-width': `${_outline} !important`,
        'transform': `translate(-${_outline},-${_outline}) !important`
      }
    },
    exInnerStyle: function () {
      const _inline = `${this.outline}px !important`
      return { padding: _inline }
    },
    _shadow: function () {
      return `${(this.imgRatio >= 1 ? 100 : (100 / this.imgRatio))}vw`
    },
    stemArea: function () {
      if (this.wrapRatio) {
        return {
          width: 100 * this.wrapRatio,
          height: 100
        }
      } else if (this.imgRatio) {
        return {
          width: this.imgEl.naturalWidth,
          height: this.imgEl.naturalHeight
        }
      } else return {}
    },
    isVertical: function () {
      // Prevent img from overflowing
      const ratio = this.wrapRatio || this.ratio
      if (!ratio) return false
      return this.imgRatio < ratio
    }
  },
  watch: {
    ratio () {
      this.resetData()
    },
    wrapRatio () {
      this.resetData()
    },
    bgColor () {
      this.callPreview('setData', { bgColor: this.bgColor })
    },
    scaleStyle () {
      this.change$.next(0)
    },
    rotateStyle () {
      this.change$.next(0)
    }
  },
  mounted () {
    this.imgEl = this.$el.querySelector('.clipper-basic .img')
    this.canvasEl = document.createElement('CANVAS')
    this.areaEl = this.$el.querySelector('.clipper-basic .clip-area')
    this.zoomEl = this.$el.querySelector('.clipper-basic .zoom-area')
    this.scaleEl = this.$el.querySelector('.img-scale')
    if (this.preview) {
      this.$subscribeTo(this.onChange$, () => {
        this.$nextTick(() => {
          // wait for vue render dom.
          const result = this.getDrawPos().pos
          const rotate = this.rotate
          if (this.invalidDrawPos(result)) return
          this.callPreview('locateImage', result, rotate)
        })
      })
    }
  },
  methods: {
    imgLoaded: function () {
      // reset
      this.callPreview('setData', {
        src: this.src,
        bgColor: this.bgColor
      })
      this.imgRatio = this.imgEl.naturalWidth / this.imgEl.naturalHeight
      this.resetData()
    },
    resetData: function () {
      this.initWHTL$.next(true)
    }
  }
}
</script>
<style lang="scss" scoped>
$hover_sec: 0.5s;
$cover_color: rgba(0, 0, 0, 0.4);
$border-color: #1baae8;
$grid-width: 1px; //dive 2

.vertical.clip-area {
  &, .img, .img-scale {
    width: auto !important;
    height: 100% !important;
  }
}
.clip-area {
  position: relative !important;
  width: 100% !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  cursor: crosshair;
  & .img {
    position: relative !important;
    width: 100% !important;
    display: block !important;
    pointer-events: none !important;
  }
}
.stem-canvas {
  pointer-events: none !important;
  display: block !important;
  width: 100% !important;
}
.in-pad {
  pointer-events: none !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box !important;
}
.img-scale {
  pointer-events: none !important;
  position: relative !important;
  width: 100% !important;
}
.zoom-area {
  position: absolute !important;
  box-sizing: border-box !important; //! don't change
  border-style: solid;
  border-color: $border_color;
  overflow: visible !important;
}
.corner {
  position: absolute;
  border-color: white;
  border-style: solid;
  width: 10px;
  height: 10px;
  opacity: 0.7;
}
.corner:hover {
  opacity: 1;
}
.corner1 {
  top: 0;
  left: 0;
  border-width: 3px 0px 0px 3px;
  cursor: nwse-resize;
}
.corner2 {
  top: 0;
  right: 0;
  border-width: 3px 3px 0px 0px;
  cursor: nesw-resize;
}
.corner3 {
  bottom: 0;
  right: 0;
  border-width: 0px 3px 3px 0px;
  cursor: nwse-resize;
}
.corner4 {
  bottom: 0;
  left: 0;
  border-width: 0px 0px 3px 3px;
  cursor: nesw-resize;
}
.extend {
  color: white;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: move;
  &.outer {
    width: 100%;
    height: 100%;
    position: absolute;
    border-style: solid;
    box-sizing: content-box;
    opacity: 0;
    transition: opacity $hover_sec;
    &:hover {
      opacity: 0.3;
    }
  }
  &.inner {
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    &:hover .drag-inset {
      opacity: 0.3;
    }
    &:hover .drag-inset:hover.drag-inset {
      opacity: 0;
    }
  }
}
.drag-inset {
  position: relative;
  box-shadow: 0px 0px 0px 4080px white;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: grab;
  opacity: 0;
  transition: opacity $hover_sec;
}
.grid {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
.grid-item {
  position: absolute;
  border-color: rgba(255, 255, 255, 0.7);
  border-style: dashed;
  width: 50%;
  height: 50%;
  box-sizing: border-box;
}
.grid-item:nth-child(1) {
  top: 0;
  left: 0;
  border-width: 0 $grid-width $grid-width 0;
  transform: translate($grid-width/2,$grid-width/2);
}
.grid-item:nth-child(2) {
  top: 0;
  right: 0;
  border-width: 0 0 $grid-width 0;
  transform: translate(-$grid-width/2,$grid-width/2);
}
.grid-item:nth-child(3) {
  bottom: 0;
  left: 0;
  border-width: 0 $grid-width 0 0;
  transform: translate($grid-width/2,-$grid-width/2);
}
.grid-item:nth-child(4) {
  bottom: 0;
  right: 0;
  border-width: 0;
  transform: translate(-$grid-width/2,-$grid-width/2);
}
</style>
