import {Inject, Injectable} from "@angular/core";
import {Overlay, OverlayConfig} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {AppAlertOverlayModalComponent} from "./app-alert-overlay-modal.component";
import {AppAlertOverlayModalConfig, AppAlertOverlayModalRef} from "./app-alert-overlay-modal-ref";
import * as Object from 'bytepushers-js-obj-extensions';

@Injectable({
  providedIn: 'root'
})
export class AppAlertOverlayModalService {
  private dialogRef: AppAlertOverlayModalRef;
  // Inject overlay service
  constructor(private overlay: Overlay) { }

  private getOverlayConfig(config: AppAlertOverlayModalConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: (Object.isDefinedAndNotNull(config) && Object.isDefinedAndNotNull(config.hasBackdrop))? config.hasBackdrop : false,
      backdropClass: (Object.isDefinedAndNotNull(config) && Object.isDefinedAndNotNull(config.backdropClass))? config.backdropClass : null,
      panelClass: (Object.isDefinedAndNotNull(config) && Object.isDefinedAndNotNull(config.panelClass))? config.panelClass : null,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay(config: AppAlertOverlayModalConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  open(overlayConfig: AppAlertOverlayModalConfig = null): AppAlertOverlayModalRef{
    const overlayRef = this.createOverlay(overlayConfig);
    this.dialogRef = new AppAlertOverlayModalRef(overlayRef)

    return this.dialogRef;
  }

  close(): void {
    this.dialogRef.close();
  }
}
