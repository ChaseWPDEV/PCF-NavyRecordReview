import {IInputs, IOutputs} from "./generated/ManifestTypes";

import * as lib from './navy_psr/src/js/lib.js';

import {
    buildElements,
    draw_legend,
    addTabs,
    addViewToggle
} from './navy_psr/src/js/view/page-components.js';

import * as d3 from 'd3';

import { appendMultiNameSelect } from './navy_psr/src/js/view/record-selector.js';
import { DataLoader } from './navy_psr/src/js/data/providers/DataLoader.js';
import { setFlatPickr } from './navy_psr/src/js/stores/view-settings.js';

import { appendPDFUploadForm } from './navy_psr/src/js/view/pdf-form.js';


export class NavyRecordReview implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _container: HTMLDivElement;
    // reference to Power Apps component framework Context object
    private nrrWrapper: HTMLDivElement;

    private _context: ComponentFramework.Context<IInputs>;
    // Event Handler 'refreshData' reference
  
    /**
     * Empty constructor.
     */
    constructor()
    {
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
     
        this._context = context;
        this._container=document.createElement('div');
        const gridElem : HTMLDivElement=document.createElement('div');
        gridElem.classList.add('grid');
        const gridD3 = d3.select(gridElem);
        
        addTabs(); //TODO: change to inject element for flexible classNames
        
        appendMultiNameSelect(gridD3);
        appendPDFUploadForm(gridD3);
        addViewToggle(); //TODO: change to inject element for flexible classNames
        
        buildElements(gridD3);

        d3.select('#start-date').on('change', function (this: any, event) {
            let instance: any = this;
            setFlatPickr(instance.flatpickr().selectedDates[0]);
        });

        draw_legend(); //TODO: change to inject element for flexible classNames
        
        let sampleData=require('./navy_psr/sample_psr.json');
        
        this._container.appendChild(gridElem);
        const dataGroup=document.createElement('g')
        dataGroup.id='original_data';
        dataGroup.setAttribute('original_data', JSON.stringify(sampleData));
        this._container.appendChild(dataGroup);
        
        container.appendChild(this._container);

        // d3.select(this._container)
        // .append('g')
        // .attr('id', 'original_data')
        // .attr('original_data', sampleData)
        // .data(sampleData);
        
        let loader= new DataLoader(sampleData);
        loader.setRecordName(lib.sample_name);
        loader.load();
        
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
