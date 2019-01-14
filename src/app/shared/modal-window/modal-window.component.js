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
var ModalWindowComponent = /** @class */ (function () {
    function ModalWindowComponent() {
        this.isEscapedDisabled = false;
        this.isModalActionsAvailable = true;
        this.styleType = 'primary';
        this.isDirty = false;
        this.showSubmit = false;
        this.showCancel = true;
        this.hideDismissal = false;
        this.dismissed = new core_1.EventEmitter();
        this.submit = new core_1.EventEmitter();
        this.discard = new core_1.EventEmitter();
        this.cancel = new core_1.EventEmitter();
        this._visible = false;
        this.showClosePopup = false;
        this.showCancelPopup = false;
    }
    Object.defineProperty(ModalWindowComponent.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (_visibility) {
            this._visible = _visibility;
            this.setBodyStyle();
        },
        enumerable: true,
        configurable: true
    });
    ModalWindowComponent.prototype.keyboardInput = function (event) {
        if (event.key === 'Escape' && !this.isEscapedDisabled) {
            this.hide();
        }
    };
    ModalWindowComponent.prototype.show = function () {
        this.visible = true;
    };
    ModalWindowComponent.prototype.hide = function () {
        this.visible = false;
        this.hideClosePopup();
        this.hideCancelPopup();
        this.dismissed.emit(false);
    };
    ModalWindowComponent.prototype.setBodyStyle = function () {
        var body = document.getElementsByTagName('body')[0];
        if (this.visible) {
            body.style.overflow = 'hidden';
        }
        else {
            body.style.overflow = 'auto';
        }
    };
    ModalWindowComponent.prototype.onClose = function () {
        if (this.isDirty) {
            this.showClosePopup = true;
        }
        else {
            this.cancel.emit();
            this.hide();
        }
    };
    ModalWindowComponent.prototype.hideClosePopup = function () {
        this.showClosePopup = false;
    };
    ModalWindowComponent.prototype.hideCancelPopup = function () {
        this.showCancelPopup = false;
    };
    ModalWindowComponent.prototype.emitSubmitEvent = function () {
        this.submit.emit();
    };
    ModalWindowComponent.prototype.onCancel = function () {
        if (this.isDirty) {
            this.showCancelPopup = true;
        }
        else {
            this.cancel.emit();
            this.hide();
        }
    };
    ModalWindowComponent.prototype.onDiscard = function () {
        this.discard.emit();
        this.hide();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ModalWindowComponent.prototype, "isEscapedDisabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalWindowComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalWindowComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalWindowComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ModalWindowComponent.prototype, "fullContentBodyHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ModalWindowComponent.prototype, "isModalActionsAvailable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalWindowComponent.prototype, "styleType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ModalWindowComponent.prototype, "isDirty", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ModalWindowComponent.prototype, "showSubmit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ModalWindowComponent.prototype, "showCancel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ModalWindowComponent.prototype, "hideDismissal", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalWindowComponent.prototype, "dismissed", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalWindowComponent.prototype, "submit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalWindowComponent.prototype, "discard", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalWindowComponent.prototype, "cancel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], ModalWindowComponent.prototype, "visible", null);
    __decorate([
        core_1.HostListener('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ModalWindowComponent.prototype, "keyboardInput", null);
    ModalWindowComponent = __decorate([
        core_1.Component({
            selector: 'pp-modal-window',
            styleUrls: [('app/shared/modal-window/modal-window.css')],
            templateUrl: 'app/shared/modal-window/modal-window.html'
        })
    ], ModalWindowComponent);
    return ModalWindowComponent;
}());
exports.ModalWindowComponent = ModalWindowComponent;
/**
 * Template directives being used inside modal window Component
 * We need to declare them to avoid Angular2 schema errors
 */
/* tslint:disable:directive-selector-name directive-selector-type */
var ModalWindowTitleDirective = /** @class */ (function () {
    function ModalWindowTitleDirective() {
    }
    ModalWindowTitleDirective = __decorate([
        core_1.Directive({
            // tslint:disable-next-line:directive-selector
            selector: 'pp-modal-window-title'
        })
    ], ModalWindowTitleDirective);
    return ModalWindowTitleDirective;
}());
exports.ModalWindowTitleDirective = ModalWindowTitleDirective;
var ModalWindowContentDirective = /** @class */ (function () {
    function ModalWindowContentDirective() {
    }
    ModalWindowContentDirective = __decorate([
        core_1.Directive({
            // tslint:disable-next-line:directive-selector
            selector: 'pp-modal-window-content'
        })
    ], ModalWindowContentDirective);
    return ModalWindowContentDirective;
}());
exports.ModalWindowContentDirective = ModalWindowContentDirective;
var ModalWindowActionsDirective = /** @class */ (function () {
    function ModalWindowActionsDirective() {
    }
    ModalWindowActionsDirective = __decorate([
        core_1.Directive({
            // tslint:disable-next-line:directive-selector
            selector: 'pp-modal-window-actions'
        })
    ], ModalWindowActionsDirective);
    return ModalWindowActionsDirective;
}());
exports.ModalWindowActionsDirective = ModalWindowActionsDirective;
//# sourceMappingURL=modal-window.component.js.map