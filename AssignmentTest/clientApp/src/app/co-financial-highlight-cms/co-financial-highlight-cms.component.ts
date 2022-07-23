import { Component, OnInit } from '@angular/core';  
declare var window: any;
import { ApiAssignmentService } from 'src/app/api-assignment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-co-financial-highlight-cms',
  templateUrl: './co-financial-highlight-cms.component.html',
  styleUrls: ['./co-financial-highlight-cms.component.css']
})
export class CoFinancialHighlightCmsComponent implements OnInit {

  formModal: any;
  dataTemp: any;
  dataListTemp: any;
  dataListStatusTemp: any;
  modelInput: TbFinalcailHighlight = {};
  modelSearch: TbFinalcailHighlight = { Years:0,StatusId:99};
  checkActive?: boolean = true;
  checkVa: any;
  constructor(private ApiAssignmentService: ApiAssignmentService) { 
  }

  ngOnInit(): void {
    this.getListData();
    this.getListStatusData(); 
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  } 

  async savedata() {
    if (this.validateForm() == true ) {
      if (this.checkActive == true) {
        this.modelInput.StatusId = 1;
      } else {
        this.modelInput.StatusId = 0;
      }
      await this.ApiAssignmentService.addData(this.modelInput).subscribe(data => {
        this.dataTemp = data; 
        if (this.dataTemp.resultCode == 'SUCCESS') {
          Swal.fire(
            'Submit success.',
            this.dataTemp.resultMsg,
            'success'
          )
          this.formModal.hide();
          this.checkActive = false;
          this.getListData();
        } else {
          Swal.fire(
            'Submit error.',
            this.dataTemp.resultMsg,
            'error'
          )
        } 
      });  
    } 
  }

   validateForm (){ 
    var forms = document.querySelectorAll('.needs-validation');
    var result; 
        Array.prototype.slice.call(forms)
        .forEach(function (form) { 
          form.addEventListener('submit', function (event: Event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
            form.classList.add('was-validated') 
          }, false )
        }) 
        Array.prototype.slice.call(forms).forEach(function (form) {
          result = form.checkValidity();
        })
    return result;
  }

  async clearData() {
    this.modelInput = {};
    this.checkActive = false;
  }

  async getListData() {
    if (this.modelSearch.Years == null) {
      this.modelSearch.Years = 0;
    }
    await this.ApiAssignmentService.loadList(this.modelSearch).subscribe(data => {
      this.dataListTemp = data; 
    });
  }

  async getListStatusData() {
    await this.ApiAssignmentService.loadListStatus().subscribe(data => {
      this.dataListStatusTemp = data;
    });
  }

  async searchData() {

  }

  openFormModal() {
    this.modelInput = {}; 
    this.formModal.show();
  }

  async editData(data: any) {
    this.modelInput.Id = data.id;
    this.modelInput.Years = data.years; 
    this.modelInput.TotalAsset = data.totalAsset;
    this.modelInput.TotalLiabilities = data.totalEquities;
    this.modelInput.TotalEquities = data.totalLiabilities;
    if (data.statusId == 1) {
      this.checkActive = true ;
    } else {
      this.checkActive = false;
    }
    this.formModal.show();
  }

  async deleteData(data:any) {
    Swal.fire({
      title: 'Do you want to delete?', 
      showCancelButton: true,
      confirmButtonText: 'Delete', 
    }).then((result) => { 
      if (result.isConfirmed) {
        this.ApiAssignmentService.deleteData(data).subscribe(data => {
          this.dataTemp = data; 
          if (this.dataTemp.resultCode == 'SUCCESS') {
            Swal.fire(
              'Delete success.',
              this.dataTemp.resultMsg,
              'success'
            ) 
            this.getListData();
          } else {
            Swal.fire(
              'Submit error.',
              this.dataTemp.resultMsg,
              'error'
            )
          } 
        });
      } 
    })
  } 
}

export interface TbFinalcailHighlight {
  Id?: number,
  Years?:number,
  TotalAsset?: number,
  TotalLiabilities?: number,
  TotalEquities?: number,
  StatusId?: number,
  CreateDate?: string,
  UpdateDate?: string
}
