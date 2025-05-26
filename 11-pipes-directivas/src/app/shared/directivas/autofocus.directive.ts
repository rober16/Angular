import { Directive, ElementRef, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective {

  private _autofocus: boolean = true;

  constructor(private _el: ElementRef, private _router: Router) { 
    this._router.events.subscribe(event => {
      if(event instanceof NavigationStart && this._autofocus) {
        this._el.nativeElement.focus();
      }      
    });
  }
  
  ngAfterViewInit(): void {
    if(this._autofocus) {
      this._el.nativeElement.focus();
    }
  }

  @Input() 
  set autofocus(autofocus: boolean) {
    this._autofocus = autofocus !== false;
  }

}
