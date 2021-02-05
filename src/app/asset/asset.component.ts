import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService,NasaItem} from '../api.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css',
              '../style/vendor/fontawesome-free/css/all.min.css',
              '../style/css/sb-admin-2.min.css']
})
export class AssetComponent implements OnInit {

  nasa_id:string; 
  urlMedia:string;
  isImage:boolean;
  isVideo:boolean;

  constructor(public service: ApiService, private route: ActivatedRoute ) { 
    this.nasa_id= this.route.snapshot.params['nasa_id'];
    
  }

  ngOnInit() {

    this.resetVariables();
    if(this.nasa_id!=undefined){
      this.getItemDetailById(this.nasa_id);
    }
    
  }

  // function for resetting variables
  resetVariables(){
    this.isImage=false;
    this.isVideo=false;
  }


  /**
   * this function allows to get the mediaUrl and its type
   * 
   * @param nasa_id 
   * 
   */
  getItemDetailById(nasa_id:string){
    this.service.getItemDetailById(nasa_id).toPromise().then((data:any)  => {
      
      //console.log(data)
      
      if(data.collection.items!=undefined){
        
        let items=data.collection.items;
        for (let j = 0; j < Object.keys(items).length; j++) {
          
          if(items[j].href!=undefined){
            
            if(items[j].href.endsWith("~orig.jpg")){

              this.urlMedia=items[j].href;
              this.isImage=true;
              break;
              
            }

            if(items[j].href.endsWith("~orig.mp4")){

              this.urlMedia=items[j].href;
              this.isVideo=true;
              break;

            }


          }

          

        }

      }

    })
  
  }

  

}
