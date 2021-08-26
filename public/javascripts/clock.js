function Clock(el, options) {
    const wrap = document.querySelector(el);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');
    const requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            (fn => setTimeout(fn, 17));
    const cancelAnimationFrame = window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.msCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            clearTimeout;
    let cw = wrap.clientWidth;
    let ch = wrap.clientHeight;
    let animationId;   // 动画id
    let count = 0;     // 计数器
    const param = {
        positions: [
            [0, 2, 3, 4, 5, 6],
            [4, 6],
            [0, 1, 2, 4, 5],
            [0, 1, 2, 4, 6],
            [3, 4, 1, 6],
            [0, 3, 1, 2, 6],
            [0, 1, 2, 3, 5, 6],
            [0, 4, 6],
            [0, 1, 2, 3, 4, 5, 6],
            [0, 1, 2, 3, 4, 6],
        ],
        numbers: [],
        strokes: [],
        current: [],
        target: [],
        during: 20,
    }

    init();
    bindEvent();//开启监听并重置所有数据

    // 初始化
    function init() {
        wrap.append(canvas);
    }

    // 监听屏幕宽度变化
    function bindEvent() {
        const resizeObserver = new ResizeObserver(reset);
        resizeObserver.observe(wrap);
    }

    // 重置
    function reset() {
        cw = wrap.clientWidth;
        ch = wrap.clientHeight;
        canvas.width = cw;
        canvas.style.width = cw;
        canvas.height = ch;
        canvas.style.height = ch;
        Object.assign(param, {
            numbers: getNumbers(),
            strokes: getStrokes(),
            current: getCurrent('88:88:88'),
            target: [],
        })
        if (animationId) cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(loop)
    }

    // 开始事件循环
    function loop(timestamp) {
        ctx.clearRect(0, 0, cw, ch);
        render();

        animationId = requestAnimationFrame(loop)

    }

    // 销毁
    function destroy() {
        resizeObserver.disconnect();
        cancelAnimationFrame(animationId);
        wrap.remove(canvas);
    }

    // 渲染
    function render() {
        ctx.strokeRect(0, 0, cw, ch);
        let {current, target, during} = param;
        let date = getDate();
        param.target = getCurrent(date);

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, cw, ch);

        ctx.fillStyle = '#ffffff';
        target.forEach((number, nIndex) => {
            number.forEach((lines, lIndex) => {
                ctx.beginPath();
                lines.forEach((point, pIndex) => {
                    let from = current[nIndex][lIndex][pIndex];
                    let to = target[nIndex][lIndex][pIndex];
                    let value1 = animation(count, from[0], to[0] - from[0], during);
                    let value2 = animation(count, from[1], to[1] - from[1], during);
                    ctx.lineTo(value1, value2)
                })
                ctx.closePath();
                ctx.fill();
            })
        })

        count++
        if (count > during) {
            target.forEach((number, nIndex) => {
                number.forEach((lines, lIndex) => {
                    lines.forEach((point, pIndex) => {
                        current[nIndex][lIndex][pIndex] = [...point]
                    })
                })
            })
            count = 0;
        }
    }

    // 计算七个数字笔画
    function getNumbers() {
        let p1 = [];
        let {cell, long, angle, gap} = options;
        let {face, oppo} = hypotenuse(long, Math.PI / 180 * angle);
        let sw = cell + oppo * 2 + face * 2;
        let sh = cell * 2 + oppo * 2 + face * 4 + gap * 4;
        let sx = oppo + cw / 2 - sw / 2;
        let sy = oppo + ch / 2 - sh;

        let horizontal = [
            [sx, sy],
            [sx + face, sy - oppo],
            [sx + cell + face, sy - oppo],
            [sx + cell + face * 2, sy],
            [sx + cell + face, sy + oppo],
            [sx + face, sy + oppo],
        ];
        let vertical = [
            [sx, sy + gap],
            [sx - oppo, sy + gap + face],
            [sx - oppo, sy + gap + face + cell],
            [sx, sy + gap + face * 2 + cell],
            [sx + oppo, sy + gap + face + cell],
            [sx + oppo, sy + gap + face],
        ];

        // 填充横线
        let horList = [
            [0, 0],
            [0, cell * 1 + face * 2 + gap * 2],
            [0, cell * 2 + face * 4 + gap * 4],
        ];

        horList.forEach(lines => {
            p1.push(horizontal.map(item => {
                return [item[0] + lines[0], item[1] + lines[1]]
            }))
        })

        // 填充竖线
        let verList = [
            [0, 0],
            [cell + face * 2, 0],
            [0, cell + face * 2 + gap * 2],
            [cell + face * 2, cell + face * 2 + gap * 2],

        ]

        verList.forEach(lines => {
            p1.push(vertical.map(item => {
                return [item[0] + lines[0], item[1] + lines[1]]
            }))
        })
        return p1
    }

    // 计算七个排列笔画
    function getStrokes() {
        let p2 = []
        let {cell, long, angle, interval} = options;
        let {face, oppo} = hypotenuse(long, Math.PI / 180 * angle);
        let sw = oppo;
        let sh = cell + oppo * 2;

        let sx = oppo + cw / 2 - ((sw + interval) * 7 - interval) / 2;
        let sy = ch / 2 + sh;
        let vertical = [
            [sx, sy],
            [sx - oppo, sy + face],
            [sx - oppo, sy + face + cell],
            [sx, sy + face * 2 + cell],
            [sx + oppo, sy + face + cell],
            [sx + oppo, sy + face],
        ];

        for (let i = 0; i < 7; i++) {
            let spacing = (sw + interval) * i;

            p2.push(vertical.map(item => {
                return [item[0] + spacing, item[1]]
            }))
        }

        return p2;
    }

    // 计算初始坐标
    function getCurrent(str) {
        let p1 = [];
        let numbers = getNumbers();
        let strokes = getStrokes();
        let {cell, long, angle, gap, interval} = options;
        let {face, oppo} = hypotenuse(long, Math.PI / 180 * angle);
        let sw = cell + oppo * 2 + face * 2;
        let sh = cell * 2 + oppo * 2 + face * 4 + gap * 4;
        let sx = cw / 2 - sw / 2;
        let sy = ch / 2 - sh;

        for (let i = 0; i < str.length; i++) {
            let aw = (sw * str.length + interval * (str.length - 1)) / 2 - sw / 2;
            let spacing = (sw + interval) * i - aw;
            p1[i] = []
            switch (str[i]) {
                case ':': {
                    let aaa = sw / 2 - oppo;
                    let bbb = sh / 4 - face;
                    let bbb2 = sh / 4 * 3 - face;
                    let spacing2 = sx + spacing;

                    ctx.beginPath();
                    p1[i].push([
                        [aaa + spacing2 + oppo, bbb + sy],
                        [aaa + spacing2, bbb + sy + face],
                        [aaa + spacing2 + oppo, bbb + sy + face * 2],
                        [aaa + spacing2 + oppo * 2, bbb + sy + face],
                    ], [
                        [aaa + spacing2 + oppo, bbb2 + sy],
                        [aaa + spacing2, bbb2 + sy + face],
                        [aaa + spacing2 + oppo, bbb2 + sy + face * 2],
                        [aaa + spacing2 + oppo * 2, bbb2 + sy + face],
                    ])
                    break;
                }

                default: {
                    let target = Number(str[i])
                    numbers.forEach((item, index) => {
                        if (param.positions[target].includes(index)) {
                            p1[i].push(item.map(list => {
                                return [list[0] + spacing, list[1]]
                            }))
                        } else {
                            p1[i].push(strokes[index].map(list => {
                                return [list[0] + spacing, list[1]]
                            }))
                        }
                    })
                    break;
                }
            }
        }
        return p1;
    }

    // 计算年月日
    function getDate() {
        let date = new Date();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        let da = n => n > 9 ? n : `0${n}`;

        return `${da(h)}:${da(m)}:${da(s)}`
    }

    // 动画函数
    function animation(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    }

    // 通过斜边和角度计算领边和对边
    function hypotenuse(long, angle) {
        return {
            face: Math.sin(angle) * long,//邻边
            oppo: Math.cos(angle) * long//对边
        };
    }
}
