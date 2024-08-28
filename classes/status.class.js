        class Statusbar extends DrawableObject{
            x = 40;
            y = 10;
            width= 140;
            height= 50;
        
            poisonImage =[
                'img/Marcadores/orange/0_poison.png',
                'img/Marcadores/orange/20_poison.png',
                'img/Marcadores/orange/40_poison.png',
                'img/Marcadores/orange/60_poison.png',
                'img/Marcadores/orange/80_poison.png',
                'img/Marcadores/orange/100_poison.png',
            ];
            heartImage =[
                'img/Marcadores/orange/0_heart.png',
                'img/Marcadores/orange/20_heart.png',
                'img/Marcadores/orange/40_heart.png',
                'img/Marcadores/orange/60_heart.png',
                'img/Marcadores/orange/80_heart.png',
                'img/Marcadores/orange/100_heart.png',
            ];
            coinsImage =[
                'img/Marcadores/orange/0_coin.png',
                'img/Marcadores/orange/20_coin.png',
                'img/Marcadores/orange/40_coin.png',
                'img/Marcadores/orange/60_coin.png',
                'img/Marcadores/orange/80_coin.png',
                'img/Marcadores/orange/100_coin.png',
            ]
        
        
            heartPercentage = 100;
            coinPercentage = 0;
            poisonPercentage = 0;
        
            constructor(){
                super();
                this.loadImages(this.poisonImage);
                this.loadImages(this.heartImage);
                this.loadImages(this.coinsImage);  
                this.setPercentage();
                this.setAmountPoison();
                this.setAmountCoins();
            }
        
            setPercentage(heartPercentage){
                this.heartPercentage = heartPercentage;
                let path = this.heartImage[this.resolveHeartImageIndex()];
                this.img = this.imageCache[path];
            }
        
            resolveHeartImageIndex(){
                if(this.heartPercentage == 100){
                    return 5;
                }else if (this.heartPercentage > 80){
                    return 4;
                }else if (this.heartPercentage > 60){
                    return 3;
                }else if (this.heartPercentage > 40){
                    return 2;
                }else if (this.heartPercentage > 20){
                    return 1;
                }else{
                    return 0;}
            }

            setAmountPoison(amount){
                this.y = 40;
                this.poisonPercentage = amount * 20;
                if(this.poisonPercentage >= 100){
                    this.poisonPercentage = 100;
                }
                let path = this.poisonImage[this.resolvePoisonImageIndex()];
                this.img = this.imageCache[path];
            }

            resolvePoisonImageIndex(){
                if(this.poisonPercentage == 100){
                    return 5;
                }else if (this.poisonPercentage > 80){
                    return 4;
                }else if (this.poisonPercentage > 60){
                    return 3;
                }else if (this.poisonPercentage > 40){
                    return 2;
                }else if (this.poisonPercentage > 20){
                    return 1;
                }else{
                    return 0;}
            }

            setAmountCoins(amount){
                this.coinPercentage = amount * 20;
                if(this.coinPercentage >= 100){
                    this.coinPercentage = 100;
                }
                let path = this.coinsImage[this.resolveCoinsImageIndex()];
                this.img = this.imageCache[path];
            }

            resolveCoinsImageIndex(){
                if(this.coinPercentage == 100){
                    return 5;
                }else if (this.coinPercentage > 80){
                    return 4;
                }else if (this.coinPercentage > 60){
                    return 3;
                }else if (this.coinPercentage > 40){
                    return 2;
                }else if (this.coinPercentage > 20){
                    return 1;
                }else{
                    return 0;}
            }
            
        }
