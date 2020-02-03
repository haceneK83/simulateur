import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CdkStep, CdkStepper } from '@angular/cdk/stepper';

@Component({
	selector: 'app-custom-stepper',
	templateUrl: './custom-stepper.component.html',
	styleUrls: ['./custom-stepper.component.css'],
	providers: [{ provide: CdkStepper, useExisting: CustomStepperComponent }],
})
export class CustomStepperComponent extends CdkStepper {
	constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef) {
		super(dir, changeDetectorRef);
	}

	steps;

	ngOnInit() {
		this.steps = this._steps;
	}

	onClick(index: number): void {
		this.selectedIndex = index;
		this._steps,
		console.log(index);
	}
}