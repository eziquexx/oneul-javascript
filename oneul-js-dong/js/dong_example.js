var Dong = function(){
    this.yspeed = 1;     
    this.dongW = 40;
    this.dongH = 40;
    this.x = Math.floor(Math.random() * (canvasW-this.dongW));
    this.y = Math.floor(Math.random() * canvasH/3); 
     

    this.dongImage = 0;        
    this.draw =function(){          
        var dong = new Image();
        if(this.dongImage == 0)
           dong.src = 'image/dong.png'; 
        else    
           dong.src = 'image/dongFast.png'; 

        context.drawImage(dong,this.x,this.y,this.dongW,this.dongH);    
    }

    this.move =function(){    
        this.y += this.yspeed;  
    }

    this.dongImageSel = function(selNum){
        this.dongImage = selNum;
    }

    this.checkCollision =0;  
    this.checkCollision= function(dog){    
        // Dog와의 충돌
        var centerX = this.x+this.dongW/2;
        var centerY = this.y+this.dongH/2;    
        var collideRange = 10;
        
        if(centerX >= (dog.x-collideRange) &&
           centerX <= (dog.x+dog.dogW+collideRange) &&
           centerY >= (dog.y-collideRange) && 
           centerY <= (dog.y+dog.dogH+collideRange))    
        {   
            if(this.dongImage == 0)     
               gameOver();   
            else // if(this.dongImage == 1)         
               this.collideCheck = 1;
        }
    
        // 바닥과의 충돌
        if(centerY > 450){
            this.x = Math.floor(Math.random() * (canvasW-this.dongW));
            this.y = Math.floor(Math.random() * canvasH/3);    
            score++;
            // Dong의 이미지가 1이고, Dog와 충돌하면, 
            if(this.dongImage == 1 && this.collideCheck == 1)
            {
                this.dongImage = 0; //Dong 모양을 0 --> 1 바꿈
                this.yspeed += 1;  //속도 1 증가               
                
            }
        }   
    }
}
