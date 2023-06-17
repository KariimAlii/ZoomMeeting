import { Component } from '@angular/core';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded'
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.13.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');


@Component({
  selector: 'app-zoom-meeting',
  templateUrl: './zoom-meeting.component.html',
  styleUrls: ['./zoom-meeting.component.css']
})



export class ZoomMeetingComponent {
  async ngAfterContentInit():Promise<any> {

    let payload = {
      meetingNumber:'87087138951',
      passWord:'123',
      sdkKey:'zntnsGLTAyvoV1zXOX7dA',
      sdkSecret:'AUbNdqhm0a4YGWegtQZgVQ2Tk3gC0Ju9',
      userName:'mohamed ahmed',
      userEmail:'',
      role:'1',
      zak:'eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6Ik1nQVhUTnc2U19HUUR4WDgxU211elEiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEsIndjZCI6InVzMDUiLCJjbHQiOjAsImV4cCI6MTY4NzAyNjA1MiwiaWF0IjoxNjg3MDE4ODUyLCJhaWQiOiI5TTRzelBvWVR3S0xNallFM0QwbGtnIiwiY2lkIjoiIn0.GjXF-VqNZNkWkrv-dU6iTfHTuvLJOSgrKT5hhLe5IwY',
      leaveUrl:'http://localhost:4200'
    }

    ZoomMtg.generateSDKSignature({
      meetingNumber : payload.meetingNumber,
      role : payload.role,
      sdkKey : payload.sdkKey,
      sdkSecret : payload.sdkSecret,
      success: function (signature: any) {
        ZoomMtg.init( {
          leaveUrl:payload.meetingNumber,
          success: function(data:any) {
            ZoomMtg.join( {
              meetingNumber : payload.meetingNumber,
              passWord : payload.passWord,
              sdkKey : payload.sdkKey,
              userName : payload.userName,
              // userEmail : payload.userEmail,
              signature : signature.result,
              // tk:'',
              zak:payload.zak,
              success:function(data:any) {
                console.log(data);
              },
              error:function(error:any) {
                console.log('--Error Join-->',error)
              }
            })
          }
        })

      },
      error: function (error:any) {
        console.log(error)
      }
    })
  }
}

// client : any;
// ngOnInit(): void {
//   this.client = ZoomMtgEmbedded.createClient()

//   let meetingSDKElement  = document.getElementById('meetingSDKElement')

//   this.client.init({ zoomAppRoot: meetingSDKElement??undefined, language: 'en-US' })
// }
// title = 'ZoomMeeting';
// startMeeting() {
//   this.client.join({

//   })
// }
