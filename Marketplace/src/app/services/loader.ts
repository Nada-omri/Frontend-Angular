import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: boolean = false;

  constructor() { }

  setLoading(loading: boolean) {
    if (loading) {
      // Show the spinner immediately if loading is true
      this.loading = true;
    } else {
      // If loading is false, set a minimum delay of 500ms before hiding the spinner
      setTimeout(() => {
        this.loading = false;
      }, 200);
    }
  }

  getLoading(): boolean {
    return this.loading;
  }
}
