class ObjectManager{
	constructor(){
		this.objectArray=[];
	}
	addObject(obj){
		this.objectArray.push(obj);
	}
	removeObject(obj){
		this.objectArray.splice( objectArray.indexOf(obj),1);
	}
	tick(){
		for(var i=0;i<this.objectArray.length;i++){
			this.objectArray[i].tick();
		}
	}
	render(){
		for(var i=0;i<this.objectArray.length;i++){
			this.objectArray[i].render();
		}
	}
}