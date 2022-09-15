// Rose Silletto, 4.23.22

class Locality {

    constructor(locality) {
        
       // console.log(locality);
        
        for(let properties in locality){

            this[properties] = locality[properties];
            
            if (Number(this[properties])) {
                this[properties] = Number(this[properties]);
            }
        }
            
            this.x = map(Number(locality.lon), -164.033, -67.629, 0, 2000);
            this.y = map(Number(locality.lat), 19.601, 69.312, 1800, 0);

            if(locality.state === "Hawaii") {

                this.x += 600;
                this.y -= 100;
            }
            
            if(locality.state === "Alaska") {

                this.x += 600;
                this.y += 60;
            }

            if(locality.state === "United States"){

                this.x -= 600;
            }

        console.log("hello!");
    }

    display(scale) {

        translate(this.x,this.y);

        console.log(UImgr.data.value());

        if(UImgr.data.value() == "percent white"){
            
            fill(255, 0, 0, 50);
            rect(0, 0, 20*scale, 40*scale);
            
            let size = map(Number((this.white)/this.population), 0, 1, 0, 40);
            
            fill(0, 255, 0, 50);
            rect(0, 0, 20*scale, size*scale);
        }
        else if (UImgr.data.value() == "percent with cancer") {

            fill(255, 0, 0, 50);
            rect(0, 0, 20*scale, 40*scale);

            let size = map(Number(this.outcomes["Cancer (except skin)"]), 0, 100, 0, 40);
            
            fill(0, 0, 255, 50);
            rect(0, 0, 20*scale, size*scale);
        }
        else if (UImgr.data.value() == "percent assisted, with high blood pressure") {

            fill(255, 0, 0, 50);
            rect(0, 0, 20*scale, 40*scale);

            let size = map(Number((this.assisted)/this.population), 0, 1, 0, 40);
            
            fill(0, 0, 255, 50);
            rect(0, 0, 10*scale, size*scale);

            let size2 = map(Number(this.outcomes["High Blood Pressure"]), 0, 100, 0, 40);

            fill(0, 255, 0, 50);
            rect(10*scale, 0, 10*scale, size2*scale);
        }
        else if (UImgr.data.value() == "percent smoking, drinking, depression") {
            
            fill(255, 0, 0, 50);
            rect(0, 0, 20*scale, 40*scale);

            let size = map(Number(this.risks["Binge Drinking"]), 0, 100, 0, 40);
            
            fill(0, 0, 255, 50);
            rect(0, 0, (20/3)*scale, size*scale);

            let size2 = map(Number(this.risks["Current Smoking"]), 0, 100, 0, 40);

            fill(0, 255, 0, 50);
            rect((20/3)*scale, 0, (20/3)*scale, size2*scale);

            let size3 = map(Number(this.outcomes["Depression"]), 0, 100, 0, 40);

            fill(0, 0, 255, 50);
            rect((20/3)*2*scale, 0, (20/3)*scale, size3*scale);
        }

        resetMatrix();
    }

}
