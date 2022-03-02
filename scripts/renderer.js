class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        let left_bottom = {x:100, y:100};
        let right_top = {x:700, y:500};
        let color = [0,0,255,255];
        this.drawRectangle(left_bottom, right_top, color, ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        let center = {x:450, y:300};
        let radius = 200;
        let color = [0,0,255,255]
        this.drawCircle(center, radius, color, ctx);

        //Draw points here because if in drawCircle method,
        //it will keep calling itself.
        //Just copy and paste from drawCircle method
        if (this.show_points) {
            let x = 0;
            let y = 0;
            let degrees = 0;
            let change = (Math.PI * 2) / this.num_curve_sections;

            for (let i = 0; i < this.num_curve_sections; i++) {
                x = center.x + (radius * Math.cos(degrees));
                y = center.y + (radius * Math.sin(degrees));
                //instead of putting the points in an array,
                //just call drawCircle with the x and y coordinates
                this.drawCircle({x:x, y:y}, 5, [255,0,0,255], ctx);
                degrees = degrees + change;
            }
        }
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        let pt0 = {x:100, y:100};
        let pt1 = {x:150, y:500};
        let pt2 = {x:600, y:100};
        let pt3 = {x:650, y:500};
        let color = [0,0,255,255];
        this.drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx);
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        let blue = [0,0,255,255];
        let red = [255,0,0,255];
        //T
        this.drawLine({x:25, y:400}, {x:225, y:400}, blue, ctx);
        this.drawLine({x:125, y:400}, {x:125, y:200}, blue, ctx);

        //s
        let p1 = {x:200, y:200};
        let p2 = {x:400, y:250};
        let p3 = {x:50, y:250};
        let p4 = {x:250, y:300};
        this.drawBezierCurve(p1, p2, p3, p4, blue, ctx);

        //e
        this.drawLine({x:300, y:250}, {x:375, y:250}, blue, ctx);
        this.drawBezierCurve({x:375, y:250}, {x:375, y:325}, {x:300, y:325}, {x:300, y:250}, blue, ctx);
        this.drawBezierCurve({x:300, y:250}, {x:300, y:200}, {x:338, y:200}, {x:375, y:200}, blue, ctx);

        //n
        this.drawLine({x:425, y:200}, {x:425, y:300}, blue, ctx);
        this.drawBezierCurve({x:425, y:275}, {x:425, y:305}, {x:500, y:305}, {x:500, y:275}, blue, ctx);
        this.drawLine({x:500, y:275}, {x:500, y:200}, blue, ctx);

        //g
        this.drawCircle({x:600, y:250}, 50, blue, ctx);
        this.drawLine({x:650, y:300}, {x:650, y:250}, blue, ctx);
        this.drawBezierCurve({x:650, y:250}, {x:650, y:50}, {x:600, y:100}, {x:125, y:100}, blue, ctx);


        if (this.show_points) {
            //draw points for circle
            let center = {x:600, y:250};
            let radius = 50;
            let x = 0;
            let y = 0;
            let degrees = 0;
            let change = (Math.PI * 2) / this.num_curve_sections;

            for (let i = 0; i < this.num_curve_sections; i++) {
                x = center.x + (radius * Math.cos(degrees));
                y = center.y + (radius * Math.sin(degrees));
                //instead of putting the points in an array,
                //just call drawCircle with the x and y coordinates
                this.drawCircle({x:x, y:y}, 5, [255,0,0,255], ctx);
                degrees = degrees + change;
            }

            //T
            this.drawCircle({x:25, y:400}, 5, red, ctx);
            this.drawCircle({x:225, y:400}, 5, red, ctx);
            this.drawCircle({x:125, y:400}, 5, red, ctx);
            this.drawCircle({x:125, y:200}, 5, red, ctx);

            //n
            this.drawCircle({x:425, y:200}, 5, red, ctx);
            this.drawCircle({x:425, y:300}, 5, red, ctx);
            this.drawCircle({x:500, y:275}, 5, red, ctx);
            this.drawCircle({x:500, y:200}, 5, red, ctx);

            //g
            this.drawCircle({x:650, y:300}, 5, red, ctx);
            this.drawCircle({x:650, y:250}, 5, red, ctx);
        }
    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        let right_bottom = {x:right_top.x, y:left_bottom.y};
        let left_top = {x:left_bottom.x, y:right_top.y};

        this.drawLine(left_bottom, right_bottom, color, ctx); //bottom line
        this.drawLine(left_bottom, left_top, color, ctx); //left line
        this.drawLine(left_top, right_top, color, ctx); //top line
        this.drawLine(right_bottom, right_top, color, ctx); //right line

        if (this.show_points) {
            this.drawCircle(left_bottom, 5, [255,0,0,255], ctx);
            this.drawCircle(right_bottom, 5, [255,0,0,255], ctx);
            this.drawCircle(left_top, 5, [255,0,0,255], ctx);
            this.drawCircle(right_top, 5, [255,0,0,255], ctx);
        }
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        let points = [];
        let x = 0;
        let y =0;
        let degrees = 0;

        // change is the different degrees depending on how many sections of the circle
        // ex: a 4 section circle has degrees 0, 90, 180, and 270,
        // so the change would be 90.
        let change = (Math.PI * 2) / this.num_curve_sections;

        //iterate through each curve sections to get each points
        for (let i = 0; i < this.num_curve_sections; i++) {
            x = center.x + (radius * Math.cos(degrees));
            y = center.y + (radius * Math.sin(degrees));
            //push the coordinates to points array
            points.push({x:x, y:y});
            degrees = degrees + change; //change the degrees
        }
        //console.log(points);

        //draw from last element to first
        this.drawLine(points[0], points[points.length-1], color, ctx);
        for (let i = 0; i < points.length - 1; i++) {
            //draw from p0 to p1
            this.drawLine(points[i], points[i+1], color, ctx);
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let x = 0;
        let y = 0;
        let t = 0.0;
        let points = [];
        let counter = 1.0 / this.num_curve_sections;

        //i < this.num_curve_sections + 1 so that the last
        //point remains the same.
        for (let i = 0; i < this.num_curve_sections+1; i++) {
            x = Math.pow((1-t), 3) * pt0.x + 3 * Math.pow((1-t), 2) * t * pt1.x + 3 * (1-t) * Math.pow(t, 2) * pt2.x + Math.pow(t, 3) * pt3.x;
            y = Math.pow((1-t), 3) * pt0.y + 3 * Math.pow((1-t), 2) * t * pt1.y + 3 * (1-t) * Math.pow(t, 2) * pt2.y + Math.pow(t, 3) * pt3.y;

            points.push({x:x, y:y});

            t = t + counter;
        }

        for (let i = 0; i < points.length - 1; i++) {
            this.drawLine(points[i], points[i + 1], color, ctx);
        }

        if (this.show_points) {
            for (let i = 0; i < points.length; i++) {
                this.drawCircle(points[i], 5, [255,0,0,255], ctx);
            }
            this.drawCircle(pt1, 5, [0,255,0,255], ctx);
            this.drawCircle(pt2, 5, [0,255,0,255], ctx);
        }
        

    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
