const {mat4} = glMatrix;

let cubeRotation = 0.0;

main();

function main() {
    const canvas = document.querySelector('#canvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        alert('无法初始化 WebGL。您的浏览器或机器可能不支持');
        return;
    }

    // 顶点着色器程序
    const vsSource = `
        attribute vec4 aVertexPosition;
        attribute vec3 aVertexNormal;
        attribute vec2 aTextureCoord;
        
        uniform mat4 uNormalMatrix;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        
        varying highp vec2 vTextureCoord;
        varying highp vec3 vLighting;
        
        void main(void) {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
            vTextureCoord = aTextureCoord;
            
            // Apply lighting effect
            highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
            highp vec3 directionalLightColor = vec3(1, 1, 1);
            highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));
            highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
            highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
            vLighting = ambientLight + (directionalLightColor * directional);
        }
      `;

    // 片段着色器程序
    const fsSource = `
        varying highp vec2 vTextureCoord;
        varying highp vec3 vLighting;
        
        uniform sampler2D uSampler;
        
        void main(void) {
            highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
            gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
        }
      `;

    // 初始化着色器程序；这是建立顶点等的所有照明的地方
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    // 收集使用着色器程序所需的所有信息。查找我们的着色器程序正在使用哪些属性
    // 对于 aVertexPosition, aVertexNormal, aTextureCoord,并查找统一位置。
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
            textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
            normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
            uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
        }
    };

    // 这里是我们调用构建所有- 我们将要绘制的对象。
    const buffers = initBuffers(gl);

    const texture = loadTexture(gl, '/images/cubetexture.png');

    var then = 0;

    // 重复绘制场景
    function render(now) {
        now *= 0.001;  // 转换为秒
        const deltaTime = now - then;

        then = now;
        drawScene(gl, programInfo, buffers, texture, deltaTime);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

// 初始化我们需要的缓冲区。对于这个演示，我们只有一个对象——一个简单的三维立方体
function initBuffers(gl) {

    // 为立方体的顶点位置创建一个缓冲区。
    const positionBuffer = gl.createBuffer();

    // 选择位置缓冲区作为从这里开始应用缓冲区操作的位置
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // 现在为立方体创建一个位置数组。
    const positions = [
        // Front face
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,

        // Top face
        -1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,

        // Right face
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0,
    ];

    // 现在将位置列表传递到 WebGL 以构建形状。我们通过从 JavaScript 数组创建一个 Float32Array 来实现这一点，然后使用它来填充当前缓冲区。
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // 设置顶点的法线，以便我们可以计算光照。
    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

    const vertexNormals = [
        // Front
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,

        // Back
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,

        // Top
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,

        // Bottom
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,

        // Right
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,

        // Left
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
            gl.STATIC_DRAW);

    // 现在设置面的纹理坐标。
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

    const textureCoordinates = [
        // Front
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Back
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Top
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Bottom
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Right
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Left
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
            gl.STATIC_DRAW);

    // 构建元素数组缓冲区；这指定了索引
    // 进入每个面的顶点的顶点数组。
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // 这个数组将每个面定义为两个三角形，使用索引到顶点数组以指定每个三角形的位置
    const indices = [
        0, 1, 2, 0, 2, 3,    // front
        4, 5, 6, 4, 6, 7,    // back
        8, 9, 10, 8, 10, 11,   // top
        12, 13, 14, 12, 14, 15,   // bottom
        16, 17, 18, 16, 18, 19,   // right
        20, 21, 22, 20, 22, 23,   // left
    ];

    // 现在将元素数组发送到 GL
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices), gl.STATIC_DRAW);

    return {
        position: positionBuffer,
        normal: normalBuffer,
        textureCoord: textureCoordBuffer,
        indices: indexBuffer,
    };
}

// 初始化纹理并加载图像。当图像加载完成后，将其复制到纹理中。
function loadTexture(gl, url) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // 因为图像必须通过互联网下载- 他们可能需要一点时间才能准备好。- 在此之前，
    // 在纹理中放置一个像素，以便我们可以-立即使用。当图像下载完成时- 我们将使用图像的内容更新纹理。
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
            width, height, border, srcFormat, srcType,
            pixel);

    const image = new Image();
    image.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                srcFormat, srcType, image);

        // WebGL1对2张图片的幂有不同的要求vs 非 2 个图像的幂，因此检查图像是否为 两个维度的 2 的幂
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            // 是的，它是 2 的幂。生成 mips。
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // 不，它不是 2 的幂。转为 mips 并设置环绕以夹到边缘
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    };
    image.src = url;

    return texture;
}

function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
}

// 绘制场景。
function drawScene(gl, programInfo, buffers, texture, deltaTime) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // 在开始绘制之前清除画布。
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // 创建一个透视矩阵，一个特殊的矩阵， 用于模拟相机中透视的失真。，我们的视野是 45 度，宽度/高度，与画布显示大小相匹配的比例
    // 我们只想看到 0.1 个单位之间的对象， 距离相机 100 个单位。
    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // 注意： glmatrix.js 总是有第一个参数， 作为接收结果的目的地
    mat4.perspective(projectionMatrix,
            fieldOfView,
            aspect,
            zNear,
            zFar);

    // 设置绘制位置为“身份”点，即场景的中心
    const modelViewMatrix = mat4.create();

    // 现在将绘图位置移动到我们想要的位置，开始绘制正方形
    mat4.translate(modelViewMatrix,     // destination matrix
            modelViewMatrix,     // matrix to translate
            [-0.0, 0.0, -6.0]);  // amount to translate
    mat4.rotate(modelViewMatrix,  // destination matrix
            modelViewMatrix,  // matrix to rotate
            cubeRotation,     // amount to rotate in radians
            [0, 0, 1]);       // axis to rotate around (Z)
    mat4.rotate(modelViewMatrix,  // destination matrix
            modelViewMatrix,  // matrix to rotate
            cubeRotation * .7,// amount to rotate in radians
            [0, 1, 0]);       // axis to rotate around (X)

    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);

    // 告诉 WebGL 如何从位置拉出位置，缓冲到 vertexPosition 属性中
    {
        const numComponents = 3;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
        gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
    }

    // 告诉 WebGL 如何从中提取纹理坐标，将纹理坐标缓冲区放入textureCoord 属性中。
    {
        const numComponents = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
        gl.vertexAttribPointer(
                programInfo.attribLocations.textureCoord,
                numComponents,
                type,
                normalize,
                stride,
                offset);
        gl.enableVertexAttribArray(
                programInfo.attribLocations.textureCoord);
    }

    // 告诉 WebGL 如何从普通缓冲区放入 vertexNormal 属性。
    {
        const numComponents = 3;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
        gl.vertexAttribPointer(
                programInfo.attribLocations.vertexNormal,
                numComponents,
                type,
                normalize,
                stride,
                offset);
        gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexNormal);
    }

    // 告诉 WebGL 使用哪些索引来索引顶点
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    // 告诉 WebGL 在绘图时使用我们的程序
    gl.useProgram(programInfo.program);

    // 设置着色器制服
    gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
    gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);
    gl.uniformMatrix4fv(
            programInfo.uniformLocations.normalMatrix,
            false,
            normalMatrix);

    //指定要映射到面的纹理。告诉 WebGL 我们想要影响纹理单元
    gl.activeTexture(gl.TEXTURE0);

    // 将纹理绑定到纹理单元 0
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // 告诉着色器我们将纹理绑定到纹理单元 0
    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

    {
        const vertexCount = 36;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }

    // 更新下一次绘制的旋转
    cubeRotation += deltaTime;
}

// 初始化一个着色器程序，让 WebGL 知道如何绘制我们的数据
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // 创建着色器程序
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // 如果创建着色器程序失败，警报
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

// 创建给定类型的着色器，上传源代码并编译它
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // 将源发送到着色器对象
    gl.shaderSource(shader, source);

    // 将源发送到着色器对象
    gl.compileShader(shader);

    // 查看是否编译成功
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}
