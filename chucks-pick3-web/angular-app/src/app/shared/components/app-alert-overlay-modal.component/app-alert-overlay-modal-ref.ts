import {OverlayRef} from "@angular/cdk/overlay";

export interface AppAlertOverlayModalConfig {
  backdropClass?: string;
  hasBackdrop: boolean;
  panelClass: string;
  scrollStrategy: any;
  positionStrategy: any;
  width: string;
  height: string;
}

export class AppAlertOverlayModalRef {
  constructor(private overlayRef: OverlayRef) {
  }

  close(): void {
    this.overlayRef.dispose();
  }
}
