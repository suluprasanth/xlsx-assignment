import { Component } from '@angular/core';
import { ExcelServiceService } from './services/excel-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private excelService: ExcelServiceService) {}
  title = 'xlsx-assignment';
  fileData: any;
  fileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      try {
        const cellA1 = this.excelService.readExcel(file);
        if (cellA1 instanceof Promise) {
          cellA1.then((result: any) => {
            this.fileData = result;
          });
        } else {
          console.error('Expected cellA1 to be a Promise');
        }
      } catch (error) {
        console.error('Error reading Excel:', error);
      }
    }
  }
}
