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
	selectedCar = {
		name: "",
		code:"",
		imageURL:""
	};
	selectedVersion = {
		name:"",
		code:"",
		imageURL:"",
		imageURL_:""
	};
	selectedEngine = {
		consomation: "0",
		name: "",
		alternatifs: [],
		alternatifs_:[],
		deal:"",
		budjet_mensuel_carburant: "0",
		budjet_mensuel_electricite: "0",
		budjet_mensuel_financement :0,
		budjet_mensuel_final:0
	};

	selectedEngineToCompare = {
		consomation: "0",
		name: "",
		alternatifs: [],
		deal:"",
		budjet_mensuel_carburant: "0",
		budjet_mensuel_electricite: "0",
		budjet_mensuel_financement: 0,
		budjet_mensuel_final:0
	};

	selectedCarName;
	selectedCarUrlmg;
	seletedEngineName;
	selectedVerisionName;
	selectedVersionToCompare = {
		name:"",
		code:"",
		imageURL:"",
		imageURL_:""
	};
	selectedPourcentageVille;
	selectedPourcentageRoute;
	selectedPourcentageAutoRoute;
	selectedFrequenceEco;
	selectedConduite;
	selectedBagage;
	selectedPassager = {  name:"", value:"" };
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	thirdFormGroup: FormGroup;
	fourthFormGroup: FormGroup;
	fifthFormGroup: FormGroup;
	sixthFormGroup: FormGroup;
	seventhFormGroup: FormGroup;
	isOptional = false;
	displayInfoCar = false;
	disablePoucentageStep = false;
	engine;
	closeResult: string;
	kmAnnuel: number;

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

		this.seventhFormGroup = this._formBuilder.group({
			kmAnnuelRequired: ['', Validators.required]
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
				car.versions.forEach( version => {
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

	/**
	 * setter le moteur à comparer
	 * @param engine 
	 */
	setEngineToCompare(engine){
		this.selectedEngineToCompare = engine;
		this.selectedVersionToCompare = this.selectedVersion;

		console.log(engine)
	}

	/**
	 * Charger les moteur alternatifs pour capture
	 */
	loadAlternatif(){

		if( this.selectedCar.code == "capture" ){
			if( this.kmAnnuel >= 20000 ){
				this.selectedEngine.alternatifs =  this.selectedEngine.alternatifs_
			}
		}
	}

}

