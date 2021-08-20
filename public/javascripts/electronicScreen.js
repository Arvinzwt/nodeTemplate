function ElectronicScreen(node, config) {
    // star_x: 'center',
    // star_y: 'center',
    // cell: 8,
    // long: 2,
    // angle: 45,
    // gap: 1,
    // interval: 10,
    var requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            (fn => setTimeout(fn, 17));
    var cancelAnimationFrame = window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.msCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            clearTimeout;

    var wrap = document.querySelector(node);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var cw = wrap.clientWidth || 300;
    var ch = wrap.clientHeight || 150;

    config.sx = config.star_x;
    config.sy = config.star_y;

    wrap.appendChild(canvas);

    init();
    bindEvent();
    loop();

    function init() {
        cw = wrap.clientWidth || 300;
        ch = wrap.clientHeight || 150;
        canvas.width = cw;
        canvas.height = ch;
        canvas.style.width = cw;
        canvas.style.height = ch;
    }

    function bindEvent() {
        window.addEventListener('resize', init, false)
    }

    function loop() {
        ctx.clearRect(0, 0, cw, cw);
        render();
        requestAnimationFrame(loop)
    }

    function render() {
        let date = new Date();
        let y = date.getFullYear();
        let mo = date.getMonth();
        let d = date.getDay();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        let da = n => n > 9 ? n : '0' + n;

        // renderNumber(`${y}-${da(mo)}-${da(d)} ${da(h)}:${da(m)}:${da(s)}`)
        renderNumber(`${da(h)}:${da(m)}:${da(s)}`)
    }

    // 计算七个笔画
    function setPoints() {
        let p1 = [];
        let {sx, sy, cell, long, angle, gap} = config;
        let {face, oppo} = hypotenuse(long, Math.PI / 180 * angle);

        sx = sx + oppo;
        sy = sy + oppo;

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

        return p1;
    }

    // 渲染
    function renderNumber(str) {
        let target = str + '';
        let {face, oppo} = hypotenuse(config.long, Math.PI / 180 * config.angle);
        let sw = config.cell + face * 2 + oppo * 2;
        let sh = config.cell * 2 + oppo * 2 + face * 4 + config.gap * 4;
        let pw = oppo * 2;

        if (config.star_x === 'center') {
            config.sx = cw / 2 - ((sw + config.interval) * target.length - config.interval) / 2;
        }

        if (config.star_y === 'center') {
            config.sy = ch / 2 - sh / 2;
        }

        let points = setPoints(config);

        let numbers = [
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

        for (let i = 0; i < target.length; i++) {
            let spacing = (sw + config.interval) * i;
            let spacing2 = config.sx + spacing;

            if (config.border) {
                // ctx.strokeStyle = 'red';
                // ctx.beginPath();
                // ctx.rect(spacing2, config.sy, sw, sh)
                // ctx.stroke();

                ctx.strokeStyle = '#cccccc'
                points.forEach(line => {
                    ctx.beginPath();
                    line.forEach(point => {
                        ctx.lineTo(point[0] + spacing, point[1])
                    })
                    ctx.closePath();
                    ctx.stroke();
                })
                ctx.strokeStyle = '#000000'
            }

            switch (target[i]) {
                case ':': {
                    let aaa = sw / 2 - oppo;
                    let bbb = sh / 4 - face;
                    let bbb2 = sh / 4 * 3 - face;
                    ctx.beginPath();
                    ctx.lineTo(aaa + spacing2 + oppo, bbb + config.sy);
                    ctx.lineTo(aaa + spacing2, bbb + config.sy + face);
                    ctx.lineTo(aaa + spacing2 + oppo, bbb + config.sy + face * 2);
                    ctx.lineTo(aaa + spacing2 + oppo * 2, bbb + config.sy + face);
                    ctx.closePath();
                    ctx.fill();

                    ctx.beginPath();
                    ctx.lineTo(aaa + spacing2 + oppo, bbb2 + config.sy);
                    ctx.lineTo(aaa + spacing2, bbb2 + config.sy + face);
                    ctx.lineTo(aaa + spacing2 + oppo, bbb2 + config.sy + face * 2);
                    ctx.lineTo(aaa + spacing2 + oppo * 2, bbb2 + config.sy + face);
                    ctx.closePath();
                    ctx.fill();
                    break;
                }

                case '/': {
                    // ctx.beginPath();
                    // points[1].forEach(item => {
                    //     ctx.lineTo(item[0] + spacing, item[1]);
                    // })
                    // ctx.closePath();
                    // ctx.fill();
                    break;
                }

                case '-': {
                    ctx.beginPath();
                    points[1].forEach(item => {
                        ctx.lineTo(item[0] + spacing, item[1]);
                    })
                    ctx.fill();
                    break;
                }

                case ' ': {
                    break;
                }

                default: {
                    let alphabet = numbers[+target[i]]
                    for (let j = 0; j < alphabet.length; j++) {
                        ctx.beginPath();
                        points[alphabet[j]].forEach(point => {
                            ctx.lineTo(point[0] + spacing, point[1]);
                        })
                        ctx.closePath();
                        ctx.fill();
                    }
                    break;
                }
            }
        }
    }
}

// 通过斜边和角度计算领边和对边
function hypotenuse(long, angle) {
    return {
        face: Math.sin(angle) * long,//邻边
        oppo: Math.cos(angle) * long//对边
    };
}
