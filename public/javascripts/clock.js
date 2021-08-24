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
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            cw = entry.contentRect.width || 300;
            ch = entry.contentRect.height || 150;
            canvas.width = cw;
            canvas.style.width = cw;
            canvas.height = ch;
            canvas.style.height = ch;
        }
    });
    let animationId;   // 动画id
    let count = 0;     // 计数器

    let points = getPoints({
        cell: 30,
        long: 10,
        angle: 45,
        gap: 1,
        interval: 10,
    }, {
        cell: 30,
        long: 10,
        angle: 45,
        gap: 1,
        interval: 20,
    });


    created();

    // 创建
    function created() {
        resizeObserver.observe(wrap);
        animationId = requestAnimationFrame(animate);
        wrap.append(canvas);
    }

    // 销毁
    function destroy() {
        resizeObserver.disconnect();
        cancelAnimationFrame(animationId);
        wrap.remove(canvas);
    }

    // 动画
    function animate() {
        ctx.clearRect(0, 0, cw, ch);
        render();
        update();
        animationId = requestAnimationFrame(animate)
    }

    // 迭代
    function update() {
        count++
    }

    // 渲染
    function render() {
        const numbers = [
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
        ];
        const s = (new Date()).getSeconds() % 10;
        const target = numbers[s];

        points.forEach(types => {
            types.forEach(lines => {
                ctx.beginPath();
                lines.forEach(points => {
                    ctx.lineTo(points[0], points[1])
                })
                ctx.closePath();
                ctx.stroke();
            })
        })
    }

    // 计算七个笔画
    function getPoints(config, options) {
        let p1 = (() => {
            let p1 = [];
            let {cell, long, angle, gap} = config;
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
        })()
        let p2 = (() => {
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
        })();
        return [p1, p2];
    }
}

// 通过斜边和角度计算领边和对边
function hypotenuse(long, angle) {
    return {
        face: Math.sin(angle) * long,//邻边
        oppo: Math.cos(angle) * long//对边
    };
}
