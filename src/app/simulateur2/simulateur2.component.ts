import { Component, OnInit, Inject, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import  *  as  data  from  '../../assets/cars.json'
import * as poucentage from '../../assets/pourcentage.json';
import * as conduite from '../../assets/conduite.json';
import * as frequence from '../../assets/frequence.json';



import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

export interface DialogData {
	animal: string;
	name: string;
  }


@Component({
	selector: 'app-simulateur2',
	templateUrl: './simulateur2.component.html',
	styleUrls: ['./simulateur2.component.css']
})
export class Simulateur2Component implements OnInit {

	carsOptions: any = (data as any).default;
	pourcentageOptions: any = (poucentage as any).default;
	conduiteOptions: any = (conduite as any).default;
	frequenceOptions: any = (frequence as any).default;
	carVersions;
	versionEngines;
	selectedCar;
	selectedVersion;
	selectedEngine = {
		"consomation": "0",
	};
	selectedCarName;
	selectedCarUrlmg;
	seletedEngineName;
	selectedVerisionName;
	selectedPourcentageVille;
	selectedPourcentageRoute;
	selectedPourcentageAutoRoute;
	selectedFrequenceEco;
	selectedConduite;
	selectedBagage;
	selectedPassager;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	thirdFormGroup: FormGroup;
	fourthFormGroup: FormGroup;
	fifthFormGroup: FormGroup;
	sixthFormGroup: FormGroup;
	isOptional = false;
	displayInfoCar = false;
	disablePoucentageStep = false;
	engine;
	closeResult: string;

	@Input('Langue') 
	langue: string;


	constructor(
		private _formBuilder: FormBuilder, 
		private modalService: NgbModal
	) {}

  	ngOnInit() {
		this.firstFormGroup = this._formBuilder.group({
			carRequired: ['', Validators.required],
			versionRequired: ['', Validators.required],
			engineRequired: ['', Validators.required]
		});
		this.secondFormGroup = this._formBuilder.group({
			kmRequired: ['', Validators.required],
			trjRequired: ['', Validators.required]
		});

		this.thirdFormGroup = this._formBuilder.group({
			villeRequired: ['', Validators.required],
			routeRequired: ['', Validators.required],
			autoRouteRequired: ['', Validators.required]
		});

		this.fourthFormGroup = this._formBuilder.group({
			conduiteRequired: ['', Validators.required],
		});

		this.fifthFormGroup = this._formBuilder.group({
			ecoModeRequired: ['', Validators.required],
		});

		this.sixthFormGroup = this._formBuilder.group({
			bagageRequired: ['', Validators.required],
			passagerRequired: ['', Validators.required]
		});

	} 		

	/**
	 * Récupérer les moteurs d'un véhicule
	 */
	getVersions(){
		this.carsOptions.forEach( car => {
			if( car.code.trim() == this.selectedCar.code.trim() ){
				this.carVersions = car.versions
				console.log(car.versions);
			}
		});

		// Remettre les validations des champs version et moteurs
		this.firstFormGroup.get('versionRequired').reset();
		this.firstFormGroup.get('engineRequired').reset();

		this.displayInfoCar = false;
	}

	/**
	 * Récupération des moteurs pour une version donné
	 */
	getEngines(){
		this.carsOptions.forEach( car => {
			if( car.code.trim() == this.selectedCar.code.trim() ){
				car.versions.forEach( version =>{
					if( this.selectedVersion.code== version.code ){
						this.versionEngines = version.engines;
					}
				})
			}
		});
		
	}

	/**
	 * Utilisé pour afficher le libellé du moteur 
	 */
	selectEngine(){
		this.selectedCarName = this.selectedCar != undefined ? this.selectedCar.name : "";
		this.selectedCarUrlmg = this.selectedCar != undefined ? this.selectedCar.imageURL : "";
		this.selectedVerisionName = this.selectedVersion != undefined ? this.selectedVersion.name : "";
		this.seletedEngineName = this.selectedEngine != undefined ? this.selectedEngine.name : "";
		this.displayInfoCar = true;
	}

	/**
	 * Utilisé pour 
	 */
	CalculePourCentage(){
		if( this.selectedPourcentageVille != undefined && this.selectedPourcentageRoute != undefined && this.selectedPourcentageAutoRoute != undefined){
			if( Number(this.selectedPourcentageVille.value) + Number(this.selectedPourcentageRoute.value) + Number(this.selectedPourcentageAutoRoute.value) != 100 ){
				this.disablePoucentageStep = true;
			}else {
				this.disablePoucentageStep = false;
			}
		}
	}

	open(content) {
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
		  this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
		  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	  }
	
	  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
		  return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
		  return 'by clicking on a backdrop';
		} else {
		  return  `with: ${reason}`;
		}
	  }
}

