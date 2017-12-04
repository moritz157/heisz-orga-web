import { Component } from '@angular/core';

@Component({
  selector: 'mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.css']
})
export class MailsComponent{
  mails: Object[] = [
    {from:"Matthias Hansen ab cdefghijklmnop", subject: "Schülerzeitung: Terminänderung"},
    {from:"Matthias Hansen", subject: "Fwd: Druck"}
  ]

  constructor(){
    for(var i=0;i<this.mails.length;i++){
      if(this.mails[i]['from'].length>31){
        this.mails[i]['cut']=this.mails[i]['from'].substr(0, 28)+'...';
      }
    }
  }
  
  openMail(mail): void {
    console.log("Opening mail:", mail)
  }
}
