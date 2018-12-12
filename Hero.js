class Hero extends GameObject{
	constructor(id,container,x,y,width,height,velX,velY,bg,src){
		super(id,container,x,y,width,height,velX,velY,bg,src);
		this.framePath="./images/ninja/";
		this.aniInterval=0;
		this.frame=0;

		this.sensorArray=[];

		//센서 부착 
		this.turnOnSensor();
	}

	turnOnSensor(){
		this.leftSensor=new Sensor("SENSOR",this.container,getSensorSize("LEFT",this.x-50,this.y,this.width,this.height),0,0,"red","");
		this.rightSensor=new Sensor("SENSOR",this.container,getSensorSize("RIGHT",this.x,this.y,this.width,this.height),0,0,"red","");
		this.upSensor=new Sensor("SENSOR",this.container,getSensorSize("UP",this.x,this.y,this.width,this.height),0,0,"red",""); //width:10% 삭감,height:2퍼센트
		this.downSensor=new Sensor("SENSOR",this.container,getSensorSize("DOWN",this.x,this.y,this.width,this.height),0,0,"red","");

		this.sensorArray.push(this.leftSensor);
		this.sensorArray.push(this.rightSensor);
		this.sensorArray.push(this.upSensor);
		this.sensorArray.push(this.downSensor);
	}

	checkCollision(){
		var hitCount=0;

		//충돌검사
		for(var i=0;i<objectManager.objectArray.length;i++){
			var obj=objectManager.objectArray[i];
			if(obj.id=="BLOCK"){
				var result1=hitTest(this.sensorArray[1], obj, this.velX, this.velY);
				var result2=hitTest(obj, this.sensorArray[1], this.velX, this.velY);

				if(result1 && result2){
					hitCount++;
				}
			}
		}

		if(hitCount>0){
			console.log("충돌함");
			//this.velX=0;
			this.sensorArray[1].velX=0;

			return true;
		}else{
			//this.velX=5;
			this.sensorArray[1].velX=5;
			return false;
		}
		

	}

	tick(){
		this.aniInterval++;

		this.checkCollision();

		//console.log(this.frame);
		switch(key){
			case 0:this.idle();this.velX=0;break;
			case 37:this.run();this.velX=-5;break;
			case 39:this.run();this.velX=5;break;
			case 65:this.attack();break;
			case 83:this.slide();break;
		}

		//센서들의  tick 호출 
		for(var i=0;i<this.sensorArray.length;i++){
			var sensor=this.sensorArray[i];
			this.sensorArray[i].tick( sensor.x+this.velX , sensor.y+this.velY);
			this.sensorArray[i].render();
		}
		this.x+=this.velX;

	}

	idle(){
		if(this.aniInterval%10 ==0){
			this.img.src=this.framePath+frames.idle[this.frame];
			this.width=232;
			this.height=439;
			this.img.style.width=232+"px";
			this.img.style.height=439+"px";
			
			this.rightSensor.tick(this.x+this.width, this.y);

			this.frame++;
			if(this.frame >= frames.idle.length){
				this.frame=0;
			}
		}
	}
	
	run(){
		if(this.aniInterval%2==0){
			if(key==37){
				this.img.style.transform="scaleX(-1)";
			}else{
				this.img.style.transform="scaleX(1)";
			}
			//div의 크기 조정
			this.rightSensor.x=this.x+363+"px";
			this.div.style.height=458+"px";

			this.rightSensor.tick(this.x+363, this.y);

			this.img.src=this.framePath+frames.run[this.frame];
			this.img.style.width=363+"px";
			this.img.style.height=458+"px";
			
				

			this.frame++;
			if(this.frame >= frames.run.length){
				this.frame=0;
			}
		}
	}

	attack(){
		if(this.aniInterval%2==0){
			this.img.src=this.framePath+frames.attack[this.frame];
			this.img.style.width=536+"px";
			this.img.style.height=495+"px";

			this.frame++;
			if(this.frame >= frames.attack.length){
				this.frame=0;
			}
		}
	}

	slide(){
		if(this.aniInterval%2==0){
			this.img.src=this.framePath+frames.slide[this.frame];
			this.img.style.width=373+"px";
			this.img.style.height=351+"px";

			this.frame++;
			if(this.frame >= frames.slide.length){
				this.frame=0;
			}
		}
	}

}