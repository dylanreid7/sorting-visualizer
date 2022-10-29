"use strict";
(self["webpackChunksorting_visualizer"] = self["webpackChunksorting_visualizer"] || []).push([["main"],{

/***/ 8346:
/*!**************************************!*\
  !*** ./src/algorithms/bubbleSort.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBubbleAnimations)
/* harmony export */ });
let animations = [];
function getBubbleAnimations(numList) {
    let tempList = numList.slice();
    bubbleSort(tempList);
    addAnimation('complete', []);
    let tempAnimations = animations.slice();
    animations = [];
    return tempAnimations;
}
function bubbleSort(numList) {
    for (let i = 0; i < numList.length; i++) {
        for (let j = 0; j < numList.length - 1; j++) {
            addAnimation('compare', [j, j + 1]);
            if (numList[j] > numList[j + 1]) {
                let temp = numList[j];
                numList[j] = numList[j + 1];
                numList[j + 1] = temp;
                addAnimation('swap', [j, j + 1]);
            }
            addAnimation('returnColors', [j, j + 1]);
        }
        addAnimation('sorted', [numList.length - i - 1]);
    }
}
function addAnimation(type, elements) {
    animations.push({
        type,
        elements
    });
}


/***/ }),

/***/ 5625:
/*!*************************************!*\
  !*** ./src/algorithms/mergeSort.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMergeAnimations)
/* harmony export */ });
let animations = [];
function getMergeAnimations(numList) {
    let tempList = numList.slice();
    mergeSort(tempList, 0, tempList.length - 1);
    addAnimation('complete', []);
    let tempAnimations = animations.slice();
    animations = [];
    return tempAnimations;
}
function isSorted(numList, elementNumber) {
    if (elementNumber >= numList.length) {
        return false;
    }
    const sliced = numList.slice(0, elementNumber + 1);
    for (let i = 0; i < sliced.length - 1; i++) {
        if (sliced[i] > sliced[i + 1]) {
            return false;
        }
    }
    return true;
}
function merge(numList, left, mid, right) {
    let leftList = numList.slice(left, mid + 1);
    let rightList = numList.slice(mid + 1, right + 1);
    let index = left;
    let leftIndex = 0;
    let rightIndex = 0;
    while (index <= right) {
        if (rightIndex < rightList.length) {
            addAnimation('compare', [leftIndex + left, rightIndex + mid + 1]);
            addAnimation('returnColors', [leftIndex + left, rightIndex + mid + 1]);
        }
        let placementIndex, elements;
        if (!leftList[leftIndex]) {
            numList[index] = rightList[rightIndex];
            rightIndex++;
            placementIndex = index;
            // numElementsToShift = 0;
            elements = [placementIndex];
        }
        else if (!rightList[rightIndex]) {
            numList[index] = leftList[leftIndex];
            leftIndex++;
            placementIndex = index;
            elements = [placementIndex];
            // numElementsToShift = 0;
        }
        else if (leftList[leftIndex] < rightList[rightIndex]) {
            numList[index] = leftList[leftIndex];
            leftIndex++;
            placementIndex = index;
            elements = [placementIndex];
            // numElementsToShift = 0;
        }
        else {
            numList[index] = rightList[rightIndex];
            placementIndex = index;
            let indexFrom = right - (rightList.length - 1 - rightIndex);
            rightIndex++;
            elements = [placementIndex, indexFrom];
            // numElementsToShift = (leftList.length - leftIndex - 1) + (rightList.length - rightIndex - 1);
        }
        addAnimation('swap', elements);
        addAnimation('returnColors', elements);
        if (isSorted(numList, index)) {
            addAnimation('sorted', [index]);
        }
        index++;
    }
}
function mergeSort(numList, left, right) {
    if (left >= right) {
        return;
    }
    var mid = left + Math.floor((right - left) / 2);
    mergeSort(numList, left, mid);
    mergeSort(numList, mid + 1, right);
    merge(numList, left, mid, right);
}
function addAnimation(type, elements) {
    animations.push({
        type,
        elements
    });
}


/***/ }),

/***/ 7881:
/*!*************************************!*\
  !*** ./src/algorithms/quickSort.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getQuickAnimations)
/* harmony export */ });
let animations = [];
function getQuickAnimations(numList) {
    let tempList = numList.slice();
    quickSort(tempList, 0, tempList.length - 1);
    addAnimation('complete', []);
    let tempAnimations = animations.slice();
    animations = [];
    return tempAnimations;
}
function quickSort(numList, low, high) {
    if (high > low) {
        let pi = partition(numList, low, high);
        quickSort(numList, low, pi - 1);
        quickSort(numList, pi + 1, high);
    }
}
function partition(numList, low, high) {
    const pivotValue = numList[high];
    let j = low - 1;
    for (let i = low; i < high; i++) {
        addAnimation('compare', [i, high]);
        addAnimation('returnColors', [i, high]);
        if (numList[i] < pivotValue) {
            j++;
            swap(numList, i, j);
            addAnimation('swap', [i, j]);
            addAnimation('returnColors', [i, j]);
        }
    }
    swap(numList, j + 1, high);
    addAnimation('swap', [j + 1, high]);
    addAnimation('returnColors', [j + 1, high]);
    if (isSorted(numList, high)) {
        addAnimation('sorted', [high]);
    }
    return (j + 1);
}
function isSorted(numList, elementNumber) {
    if (elementNumber >= numList.length) {
        return false;
    }
    const sliced = numList.slice(0, elementNumber + 1);
    for (let i = 0; i < sliced.length - 1; i++) {
        if (sliced[i] > sliced[i + 1]) {
            return false;
        }
    }
    return true;
}
function swap(numList, firstIndex, secondIndex) {
    let temp = numList[firstIndex];
    numList[firstIndex] = numList[secondIndex];
    numList[secondIndex] = temp;
}
function addAnimation(type, elements) {
    animations.push({
        type,
        elements
    });
}


/***/ }),

/***/ 820:
/*!*****************************************!*\
  !*** ./src/algorithms/selectionSort.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSelectionAnimations)
/* harmony export */ });
let animations = [];
function getSelectionAnimations(numList) {
    let tempList = numList.slice();
    selectionSort(tempList);
    addAnimation('complete', []);
    let tempAnimations = animations.slice();
    animations = [];
    return tempAnimations;
}
function selectionSort(numList) {
    for (let i = 0; i < numList.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < numList.length; j++) {
            addAnimation('compare', [minIndex, j]);
            addAnimation('returnColors', [minIndex, j]);
            if (numList[j] < numList[minIndex]) {
                minIndex = j;
            }
        }
        let temp = numList[i];
        numList[i] = numList[minIndex];
        numList[minIndex] = temp;
        addAnimation('swap', [i, minIndex]);
        addAnimation('returnColors', [minIndex]);
        addAnimation('sorted', [i]);
    }
}
function addAnimation(type, elements) {
    animations.push({
        type,
        elements
    });
}


/***/ }),

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home/home.component */ 5067);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);




const routes = [
    {
        path: '',
        component: _home_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home/home.component */ 5067);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _bar_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bar-service.service */ 6070);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/slider */ 5682);









function AppComponent_button_19_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_button_19_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.resetClick()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Reset");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
class AppComponent {
    constructor(_router, barService) {
        this._router = _router;
        this.barService = barService;
        this.barNumbers = [];
        this.sliderValue = 0.5;
        this.numElements = 100;
        this.generateDisabled = false;
        this.generatePressed = false;
        this.sortOptionsDisabled = false;
        this.sortDisabled = true;
        this.sliderDisabled = false;
        this.activeSortingMethod = '';
        this.generateColor = 'accent';
        this.bubbleColor = '';
        this.quickColor = '';
        this.mergeColor = '';
        this.selectionColor = '';
        this.sortColor = '';
        this.resetButtonActive = false;
    }
    ngOnInit() {
        this.barNumbers = this.barService.generateArray();
    }
    updateNumBars(event) {
        this.sliderValue = event.value;
        this.numElements = this.convertSliderToNumElements(this.sliderValue);
        this.barService.setNumElements(this.numElements);
        this.barService.generateArray();
    }
    convertSliderToNumElements(value) {
        if (value < 0.5) {
            let unrounded = 180 * value + 10;
            let rounded = unrounded - (unrounded % 10);
            return rounded;
        }
        else {
            let unrounded = 800 * value - 300;
            let rounded = unrounded - (unrounded % 10);
            return rounded;
        }
    }
    generate() {
        this.barNumbers = this.barService.generateArray();
    }
    bubbleClick() {
        this.activeSortingMethod = 'bubble';
        this.sortDisabled = false;
        this.bubbleColor = 'accent';
        this.quickColor = '';
        this.mergeColor = '';
        this.selectionColor = '';
    }
    quickClick() {
        this.activeSortingMethod = 'quick';
        this.sortDisabled = false;
        this.quickColor = 'accent';
        this.bubbleColor = '';
        this.mergeColor = '';
        this.selectionColor = '';
    }
    mergeClick() {
        this.activeSortingMethod = 'merge';
        this.sortDisabled = false;
        this.mergeColor = 'accent';
        this.bubbleColor = '';
        this.quickColor = '';
        this.selectionColor = '';
    }
    selectionClick() {
        this.activeSortingMethod = 'selection';
        this.sortDisabled = false;
        this.selectionColor = 'accent';
        this.mergeColor = '';
        this.bubbleColor = '';
        this.quickColor = '';
    }
    sortClick() {
        this.home.sort(this.activeSortingMethod);
        this.sortOptionsDisabled = true;
        this.generateDisabled = true;
        this.sliderDisabled = true;
    }
    resetChange(resetOn) {
        this.resetButtonActive = resetOn;
        this.sortDisabled = true;
    }
    resetClick() {
        this.generateDisabled = false;
        this.sliderDisabled = false;
        this.sortOptionsDisabled = false;
        this.selectionColor = '';
        this.mergeColor = '';
        this.bubbleColor = '';
        this.quickColor = '';
        this.activeSortingMethod = '';
        this.numElements = 100;
        this.barService.setNumElements(this.numElements);
        this.generate();
        this.sliderValue = 0.5;
        this.home.reset();
        this.resetButtonActive = false;
    }
    onActivate(componentRef) {
        componentRef.sort(this.activeSortingMethod);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_bar_service_service__WEBPACK_IMPORTED_MODULE_1__.BarServiceService)); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_home_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.home = _t.first);
    } }, decls: 21, vars: 14, consts: [["color", "primary"], ["routerLinkActive", "/"], ["mat-flat-button", "", "color", "accent", 3, "disabled", "click"], ["min", "0", "max", "1", "step", ".01", 3, "value", "disabled", "change"], ["mat-raised-button", "", 3, "color", "disabled", "click"], ["mat-raised-button", "", "color", "accent", 3, "disabled", "click"], ["mat-raised-button", "", 3, "click", 4, "ngIf"], [3, "resetEvent"], ["mat-raised-button", "", 3, "click"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p")(1, "mat-toolbar", 0)(2, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, " Sorting Algorithm Visualizer ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_button_click_4_listener() { return ctx.generate(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Generate New Array");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "mat-slider", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AppComponent_Template_mat_slider_change_6_listener($event) { return ctx.updateNumBars($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_button_click_9_listener() { return ctx.bubbleClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Bubble Sort");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_button_click_11_listener() { return ctx.quickClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Quick Sort");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_button_click_13_listener() { return ctx.mergeClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Merge Sort");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_button_click_15_listener() { return ctx.selectionClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Selection Sort");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_button_click_17_listener() { return ctx.sortClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Sort!");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, AppComponent_button_19_Template, 2, 0, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "app-home", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("resetEvent", function AppComponent_Template_app_home_resetEvent_20_listener($event) { return ctx.resetChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.generateDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx.sliderValue)("disabled", ctx.sliderDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.numElements, " Elements");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", ctx.bubbleColor)("disabled", ctx.sortOptionsDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", ctx.quickColor)("disabled", ctx.sortOptionsDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", ctx.mergeColor)("disabled", ctx.sortOptionsDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", ctx.selectionColor)("disabled", ctx.sortOptionsDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.sortDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.resetButtonActive);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLinkActive, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__.MatToolbar, _angular_material_slider__WEBPACK_IMPORTED_MODULE_7__.MatSlider, _home_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent], styles: ["button[_ngcontent-%COMP%] {\n  margin: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7QUFDSiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJidXR0b24ge1xuICAgIG1hcmdpbjogMjBweDtcbn0iXX0= */"] });


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _bar_service_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bar-service.service */ 6070);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser/animations */ 7146);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ 2681);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/slider */ 5682);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ 5067);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);











class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [_bar_service_service__WEBPACK_IMPORTED_MODULE_0__.BarServiceService], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule,
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__.FlexLayoutModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbarModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__.BrowserAnimationsModule,
        _angular_material_slider__WEBPACK_IMPORTED_MODULE_10__.MatSliderModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent,
        _home_home_component__WEBPACK_IMPORTED_MODULE_3__.HomeComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule,
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__.FlexLayoutModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbarModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__.BrowserAnimationsModule,
        _angular_material_slider__WEBPACK_IMPORTED_MODULE_10__.MatSliderModule] }); })();


/***/ }),

/***/ 6070:
/*!****************************************!*\
  !*** ./src/app/bar-service.service.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BarServiceService": () => (/* binding */ BarServiceService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);

class BarServiceService {
    constructor() {
        this.barNumbers = [];
        this.numElements = 100;
    }
    setNumElements(num) {
        this.numElements = num;
    }
    generateArray() {
        this.barNumbers = [];
        for (let i = 0; i < this.numElements; i++) {
            this.barNumbers.push(this.randomNumber());
        }
        return this.barNumbers;
    }
    randomNumber() {
        return Math.floor(Math.random() * 995) + 5;
    }
    getBars() {
        return this.barNumbers;
    }
    barHeight(elementValue) {
        // 60% of 100 vh times elementValue
        const numHeight = 0.6 * 0.1 * elementValue;
        const height = `${numHeight}vh`;
        return height;
    }
    barWidth() {
        const numWidth = 70 * 0.8 / this.numElements;
        const width = `${numWidth}vw`;
        return width;
    }
    barMargin() {
        const numWidth = 70 * 0.8 / this.numElements;
        const numMargin = numWidth * 0.25;
        const marginLeft = `${numMargin}vw`;
        return marginLeft;
    }
    get barStyles() {
        const barStyles = {
            'width': this.barWidth(),
            'margin-left': this.barMargin(),
        };
        return barStyles;
    }
    get timeDelay() {
        return 100 / this.numElements;
    }
}
BarServiceService.ɵfac = function BarServiceService_Factory(t) { return new (t || BarServiceService)(); };
BarServiceService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: BarServiceService, factory: BarServiceService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 5067:
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeComponent": () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_algorithms_selectionSort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/algorithms/selectionSort */ 820);
/* harmony import */ var src_algorithms_bubbleSort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/algorithms/bubbleSort */ 8346);
/* harmony import */ var src_algorithms_mergeSort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/algorithms/mergeSort */ 5625);
/* harmony import */ var src_algorithms_quickSort__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/algorithms/quickSort */ 7881);
/* harmony import */ var _bar_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../bar-service.service */ 6070);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/flex-layout/flex */ 6722);
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/flex-layout/extended */ 3704);










function HomeComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const num_r1 = ctx.$implicit;
    const indexOfElement_r2 = ctx.index;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("height", ctx_r0.barHeight(num_r1))("color", ctx_r0.colors[indexOfElement_r2]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngStyle", ctx_r0.barStyles);
} }
const MAIN_COLOR = 'turquoise';
const FRONT_COLOR = 'green';
const BACK_COLOR = 'blue';
const SWAP_COLOR = 'red';
const SORTED_COLOR = 'purple';
const FINISHED_COLOR = 'orange';
class HomeComponent {
    constructor(barService) {
        this.barService = barService;
        this.numElements = 100;
        this.colors = [];
        this.timeDelay = 10;
        this.sorted = [];
        this.bars = null;
        this.resetEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
    }
    ngOnInit() {
        for (let i = 0; i < this.numElements; i++) {
            this.colors[i] = MAIN_COLOR;
        }
    }
    barHeight(elementValue) {
        const numHeight = 0.7 * 0.1 * elementValue;
        const height = `${numHeight}vh`;
        return height;
    }
    get barNumbers() {
        return this.barService.barNumbers;
    }
    get barStyles() {
        return this.barService.barStyles;
    }
    sort(sortingMethod) {
        if (sortingMethod === 'bubble') {
            this.bubbleSort();
        }
        else if (sortingMethod === 'quick') {
            this.quickSort();
        }
        else if (sortingMethod === 'merge') {
            this.mergeSort();
        }
        else if (sortingMethod === 'selection') {
            this.selectionSort();
        }
    }
    isAlreadySorted(elementNum) {
        let bars = document.getElementsByClassName('bar');
        let element = bars[elementNum];
        let elementColor = element.style.color;
        return elementColor === SORTED_COLOR;
    }
    bubbleSort() {
        let animations = (0,src_algorithms_bubbleSort__WEBPACK_IMPORTED_MODULE_1__["default"])(this.barNumbers);
        this.bars = document.getElementsByClassName('bar');
        this.timeDelay = this.barService.timeDelay;
        this.sorted = Array(this.bars.length).fill(false);
        for (let i = 0; i < animations.length; i++) {
            let type = animations[i].type;
            let elements = animations[i].elements;
            if (type === 'compare') {
                this.compareElements(elements, i);
            }
            if (type === 'swap') {
                this.swapElements(elements, i);
            }
            if (type === 'returnColors') {
                this.returnElementColors(elements, i);
            }
            if (type === 'sorted') {
                this.sortElements(elements, i);
            }
            if (type === 'complete') {
                this.complete(i);
            }
        }
        setTimeout(() => {
            this.resetEvent.emit(true);
        }, this.timeDelay * animations.length);
    }
    quickSort() {
        let animations = (0,src_algorithms_quickSort__WEBPACK_IMPORTED_MODULE_3__["default"])(this.barNumbers);
        this.bars = document.getElementsByClassName('bar');
        this.timeDelay = this.barService.timeDelay;
        this.sorted = Array(this.bars.length).fill(false);
        let sortedTracker = 0;
        for (let i = 0; i < animations.length; i++) {
            let type = animations[i].type;
            let elements = animations[i].elements;
            if (type === 'compare') {
                this.compareElements(elements, i);
            }
            else if (type === 'swap') {
                this.swapElements(elements, i);
            }
            else if (type === 'returnColors') {
                this.returnElementColors(elements, i);
            }
            else if (type === 'sorted') {
                if (sortedTracker < elements[0]) {
                    sortedTracker = elements[0];
                }
                else {
                    continue;
                }
                let sortedElements = [];
                for (let i = 0; i <= elements[0]; i++) {
                    sortedElements.push(i);
                }
                this.sortElements(sortedElements, i);
            }
            else if (type === 'complete') {
                this.complete(i);
            }
        }
        setTimeout(() => {
            this.resetEvent.emit(true);
        }, this.timeDelay * animations.length);
    }
    mergeSort() {
        let animations = (0,src_algorithms_mergeSort__WEBPACK_IMPORTED_MODULE_2__["default"])(this.barNumbers);
        this.bars = document.getElementsByClassName('bar');
        this.timeDelay = this.barService.timeDelay;
        this.sorted = Array(this.bars.length).fill(false);
        for (let i = 0; i < animations.length; i++) {
            let type = animations[i].type;
            let elements = animations[i].elements;
            if (type === 'compare') {
                this.compareElements(elements, i);
            }
            else if (type === 'swap') {
                this.mergeSwapElements(elements, i);
            }
            else if (type === 'returnColors') {
                this.returnElementColors(elements, i);
            }
            else if (type === 'sorted') {
                this.sortElements(elements, i);
            }
            else if (type === 'complete') {
                this.complete(i);
            }
        }
        setTimeout(() => {
            this.resetEvent.emit(true);
        }, this.timeDelay * animations.length);
    }
    selectionSort() {
        let animations = (0,src_algorithms_selectionSort__WEBPACK_IMPORTED_MODULE_0__["default"])(this.barNumbers);
        this.bars = document.getElementsByClassName('bar');
        this.timeDelay = this.barService.timeDelay;
        this.sorted = Array(this.bars.length).fill(false);
        for (let i = 0; i < animations.length; i++) {
            let type = animations[i].type;
            let elements = animations[i].elements;
            if (type === 'compare') {
                this.compareElements(elements, i);
            }
            if (type === 'swap') {
                this.swapElements(elements, i);
            }
            if (type === 'returnColors') {
                this.returnElementColors(elements, i);
            }
            if (type === 'sorted') {
                this.sortElements(elements, i);
            }
            if (type === 'complete') {
                this.complete(i);
            }
        }
        setTimeout(() => {
            this.resetEvent.emit(true);
        }, this.timeDelay * animations.length);
    }
    compareElements(elements, iteration) {
        const firstElementInvalid = !elements[0] || this.sorted[elements[0]];
        const secondElementInvalid = !elements[1] || this.sorted[elements[1]];
        if (firstElementInvalid && secondElementInvalid) {
            return;
        }
        setTimeout(() => {
            if (!firstElementInvalid) {
                let elementOne = this.bars[elements[0]];
                elementOne.style.backgroundColor = FRONT_COLOR;
            }
            if (!secondElementInvalid) {
                let elementTwo = this.bars[elements[1]];
                elementTwo.style.backgroundColor = BACK_COLOR;
            }
        }, this.timeDelay * iteration);
    }
    swapElements(elements, iteration) {
        let elementsToColor = [];
        elements.forEach((element) => {
            if (!this.sorted[element]) {
                elementsToColor.push(element);
            }
        });
        let elementOne = this.bars[elements[0]];
        let elementTwo = this.bars[elements[1]];
        setTimeout(() => {
            elementsToColor.forEach((element) => {
                let currentElement = this.bars[element];
                currentElement.style.backgroundColor = SWAP_COLOR;
            });
            let tempHeight = elementOne.style.height;
            elementOne.style.height = elementTwo.style.height;
            elementTwo.style.height = tempHeight;
        }, this.timeDelay * iteration);
    }
    mergeSwapElements(elements, iteration) {
        let elementOne = this.bars[elements[0]];
        if (elements.length < 2) {
            if (!this.sorted[elements[0]]) {
                setTimeout(() => {
                    elementOne.style.backgroundColor = SWAP_COLOR;
                }, this.timeDelay * iteration);
            }
        }
        else {
            let elementTwo = this.bars[elements[1]];
            let colorsToSort = [];
            elements.forEach((element) => {
                if (!this.sorted[element]) {
                    colorsToSort.push(element);
                }
            });
            setTimeout(() => {
                let tempHeight = elementOne.style.height;
                elementOne.style.height = elementTwo.style.height;
                for (let j = elements[0]; j < elements[1]; j++) {
                    let nextEl = this.bars[j + 1];
                    let nextTempHeight = nextEl.style.height;
                    nextEl.style.height = tempHeight;
                    tempHeight = nextTempHeight;
                }
                colorsToSort.forEach((element) => {
                    let currentElement = this.bars[element];
                    currentElement.style.backgroundColor = SWAP_COLOR;
                });
            }, this.timeDelay * iteration);
        }
    }
    returnElementColors(elements, iteration) {
        let elementsToColor = [];
        elements.forEach((element) => {
            if (!this.sorted[element]) {
                elementsToColor.push(element);
            }
        });
        setTimeout(() => {
            elementsToColor.forEach((element) => {
                let currentElement = this.bars[element];
                currentElement.style.backgroundColor = MAIN_COLOR;
            });
        }, this.timeDelay * iteration);
    }
    sortElements(elements, iteration) {
        elements.forEach((num) => { this.sorted[num] = true; });
        setTimeout(() => {
            elements.forEach((num) => {
                let currentElement = this.bars[num];
                currentElement.style.backgroundColor = SORTED_COLOR;
            });
        }, this.timeDelay * iteration);
    }
    complete(iteration) {
        setTimeout(() => {
            for (let i = 0; i < this.bars.length; i++) {
                let element = this.bars[i];
                element.style.backgroundColor = FINISHED_COLOR;
            }
        }, this.timeDelay * iteration);
    }
    reset() {
        this.bars = document.getElementsByClassName('bar');
        for (let i = 0; i < this.bars.length; i++) {
            let currentBar = this.bars[i];
            currentBar.style.backgroundColor = 'turquoise';
        }
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_bar_service_service__WEBPACK_IMPORTED_MODULE_4__.BarServiceService)); };
HomeComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], outputs: { resetEvent: "resetEvent" }, decls: 2, vars: 1, consts: [["fxLayout", "row", "fxLayoutAlign", "center start"], [4, "ngFor", "ngForOf"], [1, "bar", 3, "ngStyle"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, HomeComponent_div_1_Template, 2, 5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.barNumbers);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgStyle, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_7__.DefaultLayoutDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_7__.DefaultLayoutAlignDirective, _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_8__.DefaultStyleDirective], styles: [".bar[_ngcontent-%COMP%] {\n  background: turquoise;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxxQkFBQTtBQUNKIiwiZmlsZSI6ImhvbWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYmFyIHtcbiAgICBiYWNrZ3JvdW5kOiB0dXJxdW9pc2U7XG59Il19 */"] });


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map