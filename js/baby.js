var babyObj = function(){

	this.x;
	this.y;
	this.angle;
	this.babyEye = new Image();
	this.babyBody = new Image();
	this.babyTail = new Image();

	//小鱼尾巴摆动变量
	this.babyTailTimer = 0;
	this.babyTailCount = 0;
	//小鱼眼睛眨动变量
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;//表示当前图片需要持续多长时间
	//小鱼身体颜色渐变变量
	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}

babyObj.prototype.init = function(){

	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;

	// this.babyTail.src = "./src/babyTail0.png"; 定义数组以后被替换
	// this.babyBody.src = "./src/babyFade0.png"; 定义数组以后被替换
	// this.babyEye.src = "./src/babyEye0.png"; 定义数组以后被替换
}

babyObj.prototype.draw = function(){

	this.x = lerpDistance(mom.x, this.x, 0.99);
	this.y = lerpDistance(mom.y, this.y, 0.99);

	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;//-PI~PI

	this.angle = lerpAngle(beta, this.angle, 0.6);

	//小鱼尾巴的计数工作
	this.babyTailTimer += deltaTime;
	if (this.babyTailTimer > 50) {

		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}
	//小鱼眼睛的计数工作
	this.babyEyeTimer += deltaTime;
	if (this.babyEyeTimer > this.babyEyeInterval) {

		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;

		if (this.babyEyeCount == 0) {

			this.babyEyeInterval = Math.random() * 1500 + 2000;
		}else{

			this.babyEyeInterval = 200;
		}
	}

	//小鱼身体的计数工作
	this.babyBodyTimer += deltaTime;
	if (this.babyBodyTimer > 300) {

		this.babyBodyCount = this.babyBodyCount + 1;
		if (this.babyBodyCount > 19) {

			this.babyBodyCount = 19;
			// game over
			data.gameOver = true;

		}
		this.babyBodyTimer %= 300;
	}

	ctx1.save();

	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);

	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 25, -babyTail[babyTailCount].height * 0.5);
	
	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
	
	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);

	ctx1.restore();

}