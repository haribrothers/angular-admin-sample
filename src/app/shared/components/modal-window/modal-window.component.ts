import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {

  public parseData: any;
  public modalTemplate: TemplateRef<any>;

  constructor(public dialogRef: MatDialogRef<ModalWindowComponent>,  @Inject(MAT_DIALOG_DATA) data:any) {
    this.parseData = data;
    this.modalTemplate = this.parseData.modalTemplate
  }

  ngOnInit(): void {
  }

}
