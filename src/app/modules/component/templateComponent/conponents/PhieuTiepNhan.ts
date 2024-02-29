export const phieuTiepNhan = `
  {{#DSDichVu}}
    <div class="w-250px mx-auto">
      <div class="text-align-center">
        <h5 class="text-uppercase">Bệnh Viện 199</h5>
        <h2 class="fw-bold">PHIẾU TIẾP ĐÓN</h2>
        <p class="start-date">{{thoiGianTiepNhan}}</p>
      </div>
      <div class="line"></div>
      <div>
        <h2 class="text-uppercase text-align-center">{{hoTen}}</h2>
        <div class="pt-8 px-8">
          <p class="fs-12">Mã bệnh nhân: {{mpi}}</p>
          <div class="flex space-between fs-12">
            <p>Giới tính: {{gioiTinh}}</p>
            <p>-</p>
            <p>Năm sinh: {{namSinh}}</p>
          </div>
        </div>
      </div>

      <div class="line"></div>
      <div class="flex">
        <div class="flex-1">
          <div class="flex align-items-start">
            <p class="fs-12 fw-bold pr-4 w-80px">Phòng khám:</p>
            <div class="fs-12 flex-1">{{roomName}}</div>
          </div>
          <div class="flex align-items-start">
            <p class="fs-12 fw-bold pr-4 w-80px">Dịch vụ:</p>
            <div class="fs-12 flex-1">{{conceptName}}</div>
          </div>
        </div>
        <div class="w-20px">
          <p class="text-align-center fs-12">STT</p>
          <p class="fs-12 text-align-center">{{index}}</p>
        </div>
      </div>

      <p class="fs-12 fw-bold">Đối tượng khám: {{tenDoiTuong}}</p>
      <div class="line"></div>
      <div class="text-align-center">
        <i class="fw-bold fs-12">Thời gian dự kiến vào khám bệnh là:</i>
        <p class="fw-bold fs-12">{{thoiGianDukien}}</p>
        <i class="fs-11">(Thời gian này có thể thay đổi tùy thuộc vào số lượng bệnh nhân)</i>
      </div>
    </div>
    {{^isNotLastRecord}}
      <div class="px-30 w-100">
        <hr class="border-top-2">
      </div>
    {{/isNotLastRecord}}
  {{/DSDichVu}}
`