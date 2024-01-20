import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit{
  searchTerm: string= "";

  constructor(private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchTerm'])
      this.searchTerm = params['searchTerm'];
    });
  }
  search():void{
    if(this.searchTerm)
    this.router.navigateByUrl('/search/'+ this.searchTerm)
  }

}
