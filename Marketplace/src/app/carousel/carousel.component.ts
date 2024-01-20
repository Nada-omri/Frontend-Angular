import { Component, OnInit,Input } from '@angular/core';
interface CarouselImage {
  imageSrc: string;
  imageAlt: string;
}
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() images: CarouselImage[] = [];
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 1500;
  selectedIndex: number = 0; 

  ngOnInit(): void {
    if(this.autoSlide){
      this.autoSlideImages();
    }
  }
  autoSlideImages():void{
    setInterval(()=>{
      this.onNextClick()
    },this.slideInterval)
  }
  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
}
