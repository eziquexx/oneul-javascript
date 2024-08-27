var Dog ={
    x: 100, 
    y: 400, 
    dogW: 80,
    dogH: 80,
    moveSpace: 20,                  
    dogImage: 'image/dogRight.png',

    draw: function(){            
        var dog = new Image();   
        dog.src = this.dogImage;    
        context.drawImage(dog,this.x,this.y,this.dogW,this.dogH); 
        
    },

    move: function(){      
        var x = this.x;
        var y = this.y;
        var dogW = this.dogW;
        var dogH = this.dogH;        
              
        if(direction == 'right'){
            this.x = this.x+this.moveSpace;
            if(this.x > canvasW-this.dogW)
               this.x = canvasW-this.dogW;        
            this.dogImage = 'image/dogRight.png'; 
        }    

        if(direction == 'left'){        
            this.x = this.x-this.moveSpace; 
            if(this.x < 0)
               this.x = 0;                   
            this.dogImage = 'image/dogLeft.png';             
        }        
        direction = '';

    }
}

