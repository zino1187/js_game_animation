class Sensor extends GameObject{
	constructor(id,container,json,velX,velY,bg,src){
		super(id,container,json.x,json.y,json.width,json.height,velX,velY,bg,src);
	}

	tick(x, y){
		this.x=x;
		this.y=y;
	}
}