"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CENTER_POSITION = '50%';
var PopupComponent = /** @class */ (function () {
    function PopupComponent() {
        this.size = 'content';
        this.arrowDirection = 'up';
        this.showOverlay = true;
        this.showPopup = false;
        this.topOffset = '3px'; // Left Offset in reference to the elementReference. Default: 3px
        this.leftOffset = '-19px'; // Left Offset in reference to the elementReference. Default: -19px
        this.alignRight = false;
        this.rightOffset = null; // Right Offset in reference to the elementReference.
        this.close = new core_1.EventEmitter();
        this._arrowPosition = 'auto';
        // TODO: Still need to add some logic for right and down arrow positions.
        // TODO: Implement when a use case arises.
    }
    Object.defineProperty(PopupComponent.prototype, "arrowPosition", {
        set: function (position) {
            if (position === 'middle') {
                this._arrowPosition = CENTER_POSITION;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PopupComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PopupComponent.prototype, "arrowDirection", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PopupComponent.prototype, "showOverlay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PopupComponent.prototype, "showPopup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PopupComponent.prototype, "topOffset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PopupComponent.prototype, "leftOffset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PopupComponent.prototype, "alignRight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PopupComponent.prototype, "rightOffset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PopupComponent.prototype, "swapArrowSide", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], PopupComponent.prototype, "arrowPosition", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PopupComponent.prototype, "close", void 0);
    PopupComponent = __decorate([
        core_1.Component({
            selector: 'pp-popup',
            styleUrls: [('app/shared/popup/popup.css')],
            templateUrl: 'app/shared/popup/popup.html'
        })
    ], PopupComponent);
    return PopupComponent;
}());
exports.PopupComponent = PopupComponent;
//# sourceMappingURL=popup.component.js.map