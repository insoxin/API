
BLUR = false;
PULSATION = true;
PULSATION_PERIOD = 600;
PARTICLE_RADIUS = 4;

/* disable blur before using blink */

BLINK = false;

GLOBAL_PULSATION = false;

QUALITY = 2; /* 0 - 5 */

/* set false if you prefer rectangles */
ARC = true;

/* trembling + blur = fun */
TREMBLING = 0; /* 0 - infinity */

FANCY_FONT = "Arial";

BACKGROUND = "#333";

BLENDING = true;

/* if empty the text will be a random number */
var TEXT;
num = 0;
TEXTArray = ["你", "永远", "也", "看不见", "我", "站在", "窗边", "最难过", "的样子", "因为", "你", "知道的", "在", "所有", "看不见", "你的", "时候", "才是", "最", "难", "过", "的", "我", "爱", "你"];

QUALITY_TO_FONT_SIZE = [10, 12, 40, 50, 100, 350];
QUALITY_TO_SCALE = [20, 6, 4, 2, 0.9, 0.5];
QUALITY_TO_TEXT_POS = [10, 20, 60, 100, 370, 280];


window.onload = function () {
	document.body.style.backgroundColor = BACKGROUND;

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	var W = canvas.width;
	var H = canvas.height;

	var tcanvas = document.createElement("canvas");
	var tctx = tcanvas.getContext("2d");
	tcanvas.width = W;
	tcanvas.height = H;

	total_area = W * H;
	total_particles = 928;
	single_particle_area = total_area / total_particles;
	area_length = Math.sqrt(single_particle_area);

	var particles = [];
	for (var i = 1; i <= total_particles; i++) {
		particles.push(new particle(i));
	}

	function particle(i) {
		this.r = Math.round(Math.random() * 255 | 0);
		this.g = Math.round(Math.random() * 255 | 0);
		this.b = Math.round(Math.random() * 255 | 0);
		this.alpha = 1;

		this.x = (i * area_length) % W;
		this.y = (i * area_length) / W * area_length;

		/* randomize delta to make particles sparkling */
		this.deltaOffset = Math.random() * PULSATION_PERIOD | 0;

		this.radius = 0.1 + Math.random() * 2;
	}

	var positions = [];

	function new_positions() {

		TEXT = TEXTArray[num];

		if (num < TEXTArray.length - 1) {
			num++;
		} else {
			num = 0;
		}
		//alert(TEXT);

		tctx.fillStyle = "white";
		tctx.fillRect(0, 0, W, H)
		//tctx.fill();

		tctx.font = "bold " + QUALITY_TO_FONT_SIZE[QUALITY] + "px " + FANCY_FONT;

		//tctx.textAlign='center';//文本水平对齐方式
		//tctx.textBaseline='middle';

		//tctx.strokeStyle = "black";
		tctx.fillStyle = "#f00";
		//tctx.strokeText(TEXT,30, 50);
		tctx.fillText(TEXT, 10, 60);

		image_data = tctx.getImageData(0, 0, W, H);
		pixels = image_data.data;
		positions = [];
		for (var i = 0; i < pixels.length; i = i + 2) {
			if (pixels[i] != 255) {
				position = {
					x: (i / 2 % W | 0) * QUALITY_TO_SCALE[QUALITY] | 0,
					y: (i / 2 / W | 0) * QUALITY_TO_SCALE[QUALITY] | 0
				}
				positions.push(position);
			}
		}

		get_destinations();
	}

	function draw() {

		var now = Date.now();

		ctx.globalCompositeOperation = "source-over";

		if (BLUR) ctx.globalAlpha = 0.1;
		else if (!BLUR && !BLINK) ctx.globalAlpha = 1.0;

		ctx.fillStyle = BACKGROUND;
		ctx.fillRect(0, 0, W, H)

		if (BLENDING) ctx.globalCompositeOperation = "lighter";

		for (var i = 0; i < particles.length; i++) {

			p = particles[i];

			/* in lower qualities there is not enough full pixels for all of  them - dirty hack*/

			if (isNaN(p.x)) continue

			ctx.beginPath();
			ctx.fillStyle = "rgb(" + p.r + ", " + p.g + ", " + p.b + ")";
			ctx.fillStyle = "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.alpha + ")";

			if (BLINK) ctx.globalAlpha = Math.sin(Math.PI * mod * 1.0);

			if (PULSATION) { /* this would be 0 -> 1 */
				var mod = ((GLOBAL_PULSATION ? 0 : p.deltaOffset) + now) % PULSATION_PERIOD / PULSATION_PERIOD;

				/* lets make the value bouncing with sinus */
				mod = Math.sin(mod * Math.PI);
			} else var mod = 1;

			var offset = TREMBLING ? TREMBLING * (-1 + Math.random() * 2) : 0;

			var radius = PARTICLE_RADIUS * p.radius;

			if (!ARC) {
				ctx.fillRect(offset + p.x - mod * radius / 1 | 0, offset + p.y - mod * radius / 1 | 0, radius * mod,
					radius * mod);
			} else {
				ctx.arc(offset + p.x | 0, offset + p.y | 0, radius * mod, Math.PI * 2, false);
				ctx.fill();
			}

			p.x += (p.dx - p.x) / 10;
			p.y += (p.dy - p.y) / 10;
		}
	}

	function get_destinations() {
		for (var i = 0; i < particles.length; i++) {
			pa = particles[i];
			particles[i].alpha = 1;
			var distance = [];
			nearest_position = 0;
			if (positions.length) {
				for (var n = 0; n < positions.length; n++) {
					po = positions[n];
					distance[n] = Math.sqrt((pa.x - po.x) * (pa.x - po.x) + (pa.y - po.y) * (pa.y - po.y));
					if (n > 0) {
						if (distance[n] <= distance[nearest_position]) {
							nearest_position = n;
						}
					}
				}
				particles[i].dx = positions[nearest_position].x;
				particles[i].dy = positions[nearest_position].y;
				particles[i].distance = distance[nearest_position];

				var po1 = positions[nearest_position];
				for (var n = 0; n < positions.length; n++) {
					var po2 = positions[n];
					distance = Math.sqrt((po1.x - po2.x) * (po1.x - po2.x) + (po1.y - po2.y) * (po1.y - po2.y));
					if (distance <= 5) {
						positions.splice(n, 1);
					}
				}
			} else {
				//particles[i].alpha = 0;
			}
		}
	}

	function init() {
		new_positions();
		setInterval(draw, 50);
		setInterval(new_positions, 4000);
	}

	init();
};