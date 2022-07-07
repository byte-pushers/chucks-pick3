import {AnimationController, Animation} from '@ionic/angular';

export const enterAnimation = (baseEl: HTMLElement, opts: any): Animation => {
  const duration = 400;


  const animationCtrl = new AnimationController();

  const rootTransition = animationCtrl
    .create()
    .duration(duration || 300)
    .easing("cubic-bezier(0.7,0,0.3,1)");

  const enterTransition = animationCtrl.create().addElement(opts.enteringEl);
  const exitTransition = animationCtrl.create().addElement(opts.leavingEl);

  if (opts.direction === "forward") {
    exitTransition.fromTo("transform", "translateX(0%)", "translateX(100%)");
    enterTransition.fromTo("transform", "translateX(-100%)", "translateX(0%)");
  } else {
    enterTransition.fromTo("transform", "translateX(-100%)", "translateX(0%)");
    exitTransition.fromTo("transform", "translateX(0%)", "translateX(-100%)");
  }
  rootTransition.addAnimation([ enterTransition, exitTransition])
  return rootTransition;
};
