import type { Placement } from '@popperjs/core';
export interface TooltipProps{
    content?:string;
    trigger:'hover'|'click';
    placement?:Placement;
}

export interface  TooltipEmits{
    (event:'visible-change',visible:boolean):void;
}