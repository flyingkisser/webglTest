/**
 * Created by joe on 2018/4/8.
 */
util={
    createShader:function(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    },


    _createProgram:function(gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }

        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    },


    initProgram:function(gl,shaderName,fragmentName) {
        var vertexShaderSource = document.getElementById(shaderName).text;
        var fragmentShaderSource = document.getElementById(fragmentName).text;

        var vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        var program=this._createProgram(gl, vertexShader, fragmentShader);
        if(program)
            gl.useProgram(program);
        return program;
    }
};

