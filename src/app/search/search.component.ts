import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService,NasaItem} from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css',
              '../style/vendor/fontawesome-free/css/all.min.css',
              '../style/css/sb-admin-2.min.css'
            ]
})
export class SearchComponent implements OnInit {

  searched:boolean;  // tell us if the user has search
  nasaItems:Array<NasaItem>;
  searchingInput:string;

  constructor(public service: ApiService, private router: Router) { }

  ngOnInit() {

    this.resetVariables();

  }


  //Reset variables
  resetVariables() {
    this.searched=false;
    this.nasaItems=[]
  }


  /**
   * This function allows to get alls items corresponding to our search
   * 
   * @param search 
   * 
   */
  getAllItems(search:string){
    this.service.getAllItemsBySearch(search).toPromise().then((data:any)  => {
        
      //console.log(data);
      if(data.collection.items!=undefined){

        let items=data.collection.items;
        for (let j = 0; j < Object.keys(items).length; j++) {
          
          let id, title, url;
          
          if(items[j].data[0].nasa_id!=undefined){
            id=items[j].data[0].nasa_id;
          }

          if(items[j].data[0].title!=undefined){
            title=items[j].data[0].title;
          }

          if(items[j].links!=undefined){
            url=items[j].links[0].href;
          }

          if(id!=undefined && title!=undefined && url!=undefined){
            let itemToAdd = new NasaItem(id,title,url);
            this.nasaItems.push(itemToAdd)

          }

        }
      }
      


    })
    this.searched=true;
  
  }


  /**
   * this function is executed when user click on the search button or press enter
   * 
   */
  onButtonSearchClick(){
    if (this.searchingInput!=null && this.searchingInput!=""){
      this.nasaItems=[];
      this.getAllItems(this.searchingInput);
    }
  }

  /**
   * this function is set to Navigate to the asset component if user clicks on an item
   * 
   * @param nasa_id 
   */
  onItemClick(nasa_id:string){
    if (nasa_id!=null){
      this.router.navigate([`/asset/${ nasa_id }`]);
    }
  }



}
